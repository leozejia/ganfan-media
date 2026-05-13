#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 3 ]]; then
  cat >&2 <<USAGE
Usage: resize_cover.sh <input-image> <output-image> <preset|WIDTHxHEIGHT>

Presets:
  x-article-cover   1500x600
  x-article-card    1200x675
  x-single-image    1200x675
  wechat-cover      900x383
  wechat-share      500x500
USAGE
  exit 2
fi

input=$1
output=$2
preset=$3

case "$preset" in
  x-article-cover) target_w=1500; target_h=600 ;;
  x-article-card|x-single-image) target_w=1200; target_h=675 ;;
  wechat-cover) target_w=900; target_h=383 ;;
  wechat-share) target_w=500; target_h=500 ;;
  *x*) target_w=${preset%x*}; target_h=${preset#*x} ;;
  *) echo "Unknown preset: $preset" >&2; exit 2 ;;
esac

if [[ ! -f "$input" ]]; then
  echo "Input image not found: $input" >&2
  exit 1
fi

mkdir -p "$(dirname "$output")"

read -r src_w src_h < <(sips -g pixelWidth -g pixelHeight "$input" \
  | awk '/pixelWidth/ {w=$2} /pixelHeight/ {h=$2} END {print w, h}')

if [[ -z "${src_w:-}" || -z "${src_h:-}" ]]; then
  echo "Unable to read image dimensions: $input" >&2
  exit 1
fi

# Cover-fit: resize so the image fully covers target, then center crop.
# Use Python only for integer arithmetic; image operations stay in macOS sips.
read -r resize_w resize_h crop_x crop_y < <(python3 - <<PY
src_w=$src_w
src_h=$src_h
target_w=$target_w
target_h=$target_h
scale=max(target_w/src_w, target_h/src_h)
resize_w=round(src_w*scale)
resize_h=round(src_h*scale)
crop_x=max(0, round((resize_w-target_w)/2))
crop_y=max(0, round((resize_h-target_h)/2))
print(resize_w, resize_h, crop_x, crop_y)
PY
)

tmp=$(mktemp -t ganfan-cover.XXXXXX).png
trap 'rm -f "$tmp"' EXIT

sips -z "$resize_h" "$resize_w" "$input" --out "$tmp" >/dev/null
sips --cropOffset "$crop_y" "$crop_x" -c "$target_h" "$target_w" "$tmp" --out "$output" >/dev/null

echo "$output"
