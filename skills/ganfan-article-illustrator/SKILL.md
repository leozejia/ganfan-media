---
name: ganfan-article-illustrator
description: Plan, generate, and export article visuals for GanFan / SorryCode article packages. Use whenever an article needs an X cover, WeChat cover, SorryCode docs hero, tutorial screenshot, generated poster, or image asset. This skill owns visual.md decisions, channel sizes, pattern selection, calling sorrycode-image2, and exporting cropped delivery images.
---

# GanFan Article Illustrator

## Role

Use this skill as the image director for an article package.

This is an execution skill. It owns GanFan article asset paths, `visual.md`,
channel sizes, image generation calls, and final exports. Reusable visual
patterns belong to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar
```

It decides:

1. whether an image is worth making;
2. which channel sizes are required;
3. which Open Visual Grammar pattern fits the job;
4. which source material is relevant to this asset job;
5. what visual argument the cover must make;
6. what visual score and runtime run should be used;
7. how to call `sorrycode-image2`;
8. how to export final channel-ready files.

`distribution-agent` publishes. `sorrycode-image2` executes image requests. This skill coordinates the visual workflow between them.

## Default output paths

For an article package, write assets under:

```text
assets/
├── cover.png
└── inline-01.png

_work/
└── visual-runs/
    └── YYYY-MM-DD-NNN/
        ├── runtime-prompt.md
        ├── selected-source.png
        ├── diagnostics.md
        ├── critique.md
        └── rejected/
```

Use only the files that are needed. `visual.md` is the decision surface,
`assets/` is the delivery surface, and `_work/visual-runs/` is the process
surface.

Default to one `assets/cover.png`. Add channel-specific names only when one package needs multiple different cover crops.

Keep `assets/` limited to selected delivery files. Do not route a new article
from an old runtime prompt.

## Workflow

### 1. Decide whether image is needed

Generate an image only when it helps one of these jobs:

- make an X post/article stop the scroll;
- make a SorryCode tutorial easier to follow;
- provide a required WeChat/X cover;
- explain a visual/design/PPT/video topic;
- satisfy an explicit user request for an asset.

If not needed, record `Image decision: no image needed` in `visual.md` and stop.

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

### 3. Read only the relevant asset context

Define the asset job before reading source material:

```text
Asset job:
Target channel:
Target file:
Target size:
Primary draft:
Supporting sources:
Source inclusion rule:
```

The asset job defines the context unit. One package can produce X, SorryCode,
XHS, WeChat, and other outputs from the same core thesis. Each output has a
different reader promise and a different cover job.

Use the smallest source set that can make the current image specific:

| Asset job | Primary source | Supporting sources |
| --- | --- | --- |
| X cover for `x.md` | `x.md`; existing `visual.md` if present | `brief.md` for audience/funnel; `sources.md` only for factual or private/public boundaries |
| SorryCode docs hero | `sorrycode.md`; existing `visual.md` if present | `brief.md`; `sources.md` for verified steps, links, and forbidden internal details |
| WeChat cover | WeChat draft or render source; existing `visual.md` if present | `brief.md`; `sources.md` for factual boundaries |
| XHS card | XHS draft or outline; existing `visual.md` if present | `brief.md`; `sources.md` for claim boundaries |
| Pattern reproduction test | the exact channel draft being tested | historical selected cover only if the test asks for reproduction |

Start from the primary source. Add a supporting source only when it changes the
audience, factual boundary, visual claim, delivery constraint, or reuse target
for this asset. Record why the source was included.

If required context is missing, record the missing file and continue with the
available target-channel material. If factual uncertainty affects the cover
claim, stop and request source research instead of guessing.

### 4. Choose the visual pattern

Use progressive disclosure. Read the Open Visual Grammar entry point only when
an image is needed:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/README.md
```

Then load exactly one stable pattern when the job matches it:

- `patterns/big-character-poster/PATTERN.md` for X hooks where one dominant title and one sharp conflict should carry the first read.

If the operator asks for an older GanFan image-generation flavor, load the
matching recovered pattern seed from:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/
```

Historical seeds still need references and evals before becoming canonical.
Use one pattern at a time.

Use local incubation notes for candidate patterns that are not yet public stable:

```text
docs/visual-incubation/pattern-candidates.md
```

Docs heroes, proof screenshots, editorial illustrations, and other visual jobs
are not public stable Open Visual Grammar patterns yet. Use local incubation
notes for those jobs and do not promote them to `open-visual-grammar` until the
operator has approved real production examples.

If real UI proof matters, use a real screenshot and follow the screenshot notes
there. Do not ask an image model to fabricate UI screenshots.

### 5. Write `visual.md`

Include:

- article title;
- asset job and primary draft used;
- target reader;
- channel targets and output sizes;
- click reason;
- selected Open Visual Grammar pattern;
- visual score;
- selected assets;
- run policy;
- forbidden elements.

Do not write runtime prompts into `visual.md`. Runtime prompts belong only inside
one run directory:

```text
_work/visual-runs/YYYY-MM-DD-NNN/runtime-prompt.md
```

Do not copy one-off runtime prompts back into Open Visual Grammar. Promote only
stable, reviewed patterns or pattern-local examples.

### 6. Compile the visual argument

Before writing any runtime prompt for a public cover, extract the argument from
the target-channel context and fill the argument stack:

```text
Reader pain:
False belief:
Correction:
Stakes:
Cover sentence:
Concrete evidence:
Visual action:
Why it bites:
Primary content used:
```

This is required for `big-character-poster`.

For an X-cover test, extract from `x.md`. Use `brief.md` or `sources.md` only to
support the audience, factual boundary, visual claim, delivery constraint, or
reuse target when those fields affect the asset.

Use the Open Visual Grammar pattern as design language, not as a prompt
template. The agent writes the final image prompt for the current article,
model, and channel.

If the idea could fit ten unrelated AI posts, revise the visual judgment before
prompting. A stronger candidate usually needs a more concrete evidence object
from the article.

`Visual action` should describe what happens in the image, for example:

```text
bridge bends under cost
empty surface peels back to local record
grey mask is cut open by live cursor
context stack becomes weight
```

Then write the visual score and compile it into:

```text
_work/visual-runs/YYYY-MM-DD-NNN/runtime-prompt.md
```

For a three-candidate test, keep the same article argument and source contract.
Let the candidates vary by evidence object, title relationship, poster
temperament, metaphor distance, or material language. Do not force a fixed
composition-label set when it weakens the visual idea.

### 7. Generate source image

Use `sorrycode-image2` for generation.

When the run already has:

```text
_work/visual-runs/YYYY-MM-DD-NNN/runtime-prompt.md
```

call `sorrycode-image2` with `--prompt-file` and `--no-prompt-log`. The runtime
prompt is already the workflow source of truth, so the image runtime should not
create a duplicate `prompt.txt`.

Default source sizes:

- X Article covers: request `1500x600` first and verify returned dimensions;
- normal horizontal covers: `1536x1024`;
- square thumbnails: `1024x1024`.

Do not silently use experimental high-resolution sizes. If high-res is required, follow the `sorrycode-image2` size guide and document the risk in `visual.md`.

Save diagnostics in a numbered attempt folder when retrying:

```text
_work/visual-runs/YYYY-MM-DD-NNN/
```

### 8. Export delivery images

After downloading or saving the source image, export exact channel sizes.

On macOS, use the bundled script:

```bash
skills/ganfan-article-illustrator/scripts/resize_cover.sh \
  _work/visual-runs/YYYY-MM-DD-NNN/selected-source.png \
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

### 9. Inspect before handoff

Open the final image locally when possible. Reject the asset if:

- the final delivery file is not the exact target size for the channel preset;
- the main Chinese text is unreadable or wrong;
- the image has style but no visible correction;
- the metaphor sits beside the title instead of performing the visual action;
- the image violates the selected pattern's anti-patterns;
- key text is outside the target safe area;
- the output includes fake logos, QR codes, random text, watermarks, or signatures.

## Boundaries

- Do not publish images; publishing belongs to `distribution-agent`.
- Do not write the article; article workflow lives in `docs/workflows/media-operations-workflow.md`.
- Do not expose API keys or provider internals.
- Do not keep generating variants by default. One strong attempt, inspect, then revise only if there is a clear defect.
