# Image Runtime Reference

Updated: 2026-05-09

GanFan Media image generation now uses `sorrycode-image2` by default.

Do not duplicate HTTP details here. The active runtime truth is the installed `sorrycode-image2` skill:

```text
/Users/zejiawu/.codex/skills/sorrycode-image2/SKILL.md
```

Use this reference only to remember the workflow-level boundary:

- This skill decides whether an image is needed.
- `sorrycode-image2` owns API key checks, request execution, streaming diagnostics, and output saving.
- Old Tuzi notes are archived under `archive/tuzi-runtime.md` and should not be used for new SorryCode operations.

## Wide-cover stability

`gpt-image-2` may accept community reference sizes such as `1500x600`, but the returned file is not guaranteed to match that exact size. Treat the request as successful only after checking the actual output dimensions.

For X Article covers:

1. Prompt for `5:2` composition and central safe area.
2. Request `1500x600` first when experimenting with X Article covers.
3. Read the returned image dimensions with `sips -g pixelWidth -g pixelHeight`.
4. Accept the source only if the returned ratio is close to `5:2` or if the crop to `1500x600` preserves the main title.
5. If the source comes back near `16:9`, `3:2`, or another ratio that breaks the composition, do not force-crop it as the cover. Either regenerate or reuse it as a body image.

Good fallback: keep visually strong but ratio-mismatched images as article body illustrations instead of discarding them.
