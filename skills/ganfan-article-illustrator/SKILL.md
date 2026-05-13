---
name: ganfan-article-illustrator
description: Plan, generate, and export article visuals for GanFan / SorryCode article packages. Use whenever a article needs an X cover, WeChat cover, SorryCode docs hero, tutorial screenshot, generated poster, or image asset. This skill owns channel size decisions, cover briefs, style selection, calling sorrycode-image2, and exporting cropped delivery images.
---

# GanFan Article Illustrator

## Role

Use this skill as the image director for a article package.

It decides:

1. whether an image is worth making;
2. which channel sizes are required;
3. which visual style fits the job;
4. what prompt/brief should be used;
5. how to call `sorrycode-image2`;
6. how to export final channel-ready files.

`distribution-agent` publishes. `sorrycode-image2` executes image requests. This skill coordinates the visual workflow between them.

## Default output paths

For a article package, write assets under:

```text
assets/
├── cover.png
└── inline-01.png

_work/images/
├── cover-brief.md
├── prompt.txt
├── selected-source.png
├── rejected/
└── sorrycode-image2-attempt-N/
```

Use only the files that are needed. `assets/` is the asset surface; `_work/` is the process surface.

Default to one `assets/cover.png`. Add channel-specific names only when one package needs multiple different cover crops.

## Workflow

### 1. Decide whether image is needed

Generate an image only when it helps one of these jobs:

- make an X post/article stop the scroll;
- make a SorryCode tutorial easier to follow;
- provide a required WeChat/X cover;
- explain a visual/design/PPT/video topic;
- satisfy an explicit user request for an asset.

If not needed, record `Image decision: no image needed` in `brief.md` and stop.

### 2. Choose delivery targets before prompting

Read `references/channel-image-sizes.md` before choosing a size.

Common targets:

- Single default cover: `assets/cover.png`.
- X Article cover: `assets/cover.png` at `1500x600`.
- X single-image post cover: `assets/cover.png` at `1200x675`.
- WeChat cover: `assets/cover.png` at `900x383`.
- WeChat share thumbnail: `assets/share.png` at `500x500`.
- SorryCode docs hero: `assets/cover.png` at `1200x675`.

Use channel-specific names such as `assets/cover-wechat.png` only when one package publishes to multiple channels with different crops.

Do not invent ratios from memory. If the target is unclear, write the brief with `target: undecided` and ask the operator before generating.

### 3. Choose the visual route

Read `styles/index.md` first. Then load exactly one active style file:

- `styles/big-character-poster.md` for the default X/SorryCode hook cover.
- `styles/screenshot-led-tutorial.md` when real UI proof matters.
- `styles/editorial-illustration.md` for personal essays and abstract narratives.
- `styles/minimal-poster.md` for restrained premium covers.

Use screenshot-led visuals only when real screenshots are available or explicitly requested. Do not ask an image model to fabricate UI screenshots.

### 4. Write `cover-brief.md`

Include:

- article title;
- target reader;
- channel targets and output sizes;
- click reason;
- main title text;
- optional supporting text;
- visual metaphor;
- style route and style file used;
- safe-area notes;
- forbidden elements;
- prompt block.

Also write the final prompt to `_work/images/prompt.txt` before generation.

### 5. Generate source image

Use `sorrycode-image2` for generation.

Default source sizes:

- X Article covers: request `1500x600` first and verify returned dimensions;
- normal horizontal covers: `1536x1024`;
- square thumbnails: `1024x1024`.

Do not silently use experimental high-resolution sizes. If high-res is required, follow the `sorrycode-image2` size guide and document the risk in `cover-brief.md`.

Save diagnostics in a numbered attempt folder when retrying:

```text
_work/images/sorrycode-image2-attempt-1/
_work/images/sorrycode-image2-attempt-2/
```

### 6. Export delivery images

After downloading or saving the source image, export exact channel sizes.

On macOS, use the bundled script:

```bash
skills/ganfan-article-illustrator/scripts/resize_cover.sh \
  _work/images/selected-source.png \
  assets/cover.png \
  x-article-cover
```

Supported presets:

- `x-article-cover` -> `1500x600`
- `x-article-card` -> `1200x675`
- `x-single-image` -> `1200x675`
- `wechat-cover` -> `900x383`
- `wechat-share` -> `500x500`

If the script cannot run, preserve the source image and record the missing export step in `publish.md`.

### 7. Inspect before handoff

Open the final image locally when possible. Reject the asset if:

- the main Chinese text is unreadable or wrong;
- the image looks like generic SaaS UI collage when the route was big-character poster;
- key text is outside the target safe area;
- the output includes fake logos, QR codes, random text, watermarks, or signatures.

## Boundaries

- Do not publish images; publishing belongs to `distribution-agent`.
- Do not write the article; article workflow lives in `docs/workflows/media-operations-workflow.md`.
- Do not expose API keys or provider internals.
- Do not keep generating variants by default. One strong attempt, inspect, then revise only if there is a clear defect.
