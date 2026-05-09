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
