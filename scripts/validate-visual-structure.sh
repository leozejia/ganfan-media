#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

failed=0

report() {
  printf 'visual-structure violation: %s\n' "$1" >&2
  failed=1
}

while IFS= read -r -d '' child; do
  if [ "$(basename "$child")" != "visual-runs" ] || [ ! -d "$child" ]; then
    report "$child is not an allowed article work surface"
  fi
done < <(find articles -path '*/_work/*' -mindepth 3 -maxdepth 3 -print0)

while IFS= read -r -d '' asset; do
  name="$(basename "$asset")"
  case "$name" in
    .gitkeep|cover.png|share.png|inline-[0-9][0-9].png|cover-x-article.png|cover-x-card.png|cover-x-single.png|cover-wechat.png|cover-docs.png|cover-sorrycode.png)
      ;;
    *)
      report "$asset is not a selected delivery asset name"
      ;;
  esac
done < <(find articles -path '*/assets/*' -type f -print0)

while IFS= read -r -d '' prompt_file; do
  [ "$(basename "$prompt_file")" = "runtime-prompt.md" ] || \
    report "$prompt_file must be named runtime-prompt.md"
done < <(find articles -path '*/_work/visual-runs/*' -type f -iname '*prompt*' -print0)

while IFS= read -r -d '' skill_dir; do
  name="$(basename "$skill_dir")"
  case "$name" in
    agents|references|scripts)
      ;;
    *)
      report "$skill_dir is not an allowed illustrator skill surface"
      ;;
  esac
done < <(find skills/ganfan-article-illustrator -mindepth 1 -maxdepth 1 -type d -print0)

while IFS= read -r -d '' article_dir; do
  [ -f "$article_dir/visual.md" ] || report "$article_dir is missing visual.md"
done < <(find articles -mindepth 1 -maxdepth 1 -type d -print0)

while IFS= read -r -d '' cover; do
  article_dir="$(dirname "$(dirname "$cover")")"
  [ -f "$article_dir/visual.md" ] || report "$cover exists without $article_dir/visual.md"
done < <(find articles -path '*/assets/cover.png' -type f -print0)

if [ "$failed" -ne 0 ]; then
  exit 1
fi

printf 'visual-structure ok\n'
