# Recovered Pattern Seed Stability Eval

Date: 2026-05-16

## Purpose

Test whether recovered historical GanFan image-generation flavors can behave as
stable Open Visual Grammar pattern seeds.

This was not a model benchmark and not a one-off cover selection. It tested
whether a pattern can produce three visually consistent candidates for one real
article without collapsing into generic AI imagery.

## Test Contract

- one pattern per run;
- one real article/source per pattern;
- exactly three cards per pattern;
- judge final images, not runtime prompt text;
- store all generated results in `_work/visual-runs/`;
- do not replace `assets/cover.png` during the test.

## Runs

### `narrative-journal-infographic`

Article:

```text
articles/2026-05-12-agent-context-token-economics/x.md
```

Review entry:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-16-pattern-seed-test-narrative-journal-infographic/review.html
```

### `flowing-gaze-minimal-cover`

Article:

```text
articles/2026-05-10-codex-history-sessions/x.md
```

Review entry:

```text
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-pattern-seed-test-flowing-gaze-minimal-cover/review.html
```

### `pixel-retro`

Article:

```text
articles/2026-05-11-claude-code-gpt-cost/x.md
```

Review entry:

```text
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-16-pattern-seed-test-pixel-retro/review.html
```

## Operator Judgment

The operator judged all three groups positively:

- all generated images were satisfactory;
- each group showed a clearly distinct visual style;
- candidates inside each group stayed recognizably in the same style;
- the three tested seed patterns were stable enough to preserve as-is.

## Result

Pass.

Treat these three pattern seeds as stable baselines for current GanFan visual
work:

```text
narrative-journal-infographic
flowing-gaze-minimal-cover
pixel-retro
```

Do not keep editing their core pattern descriptions after this pass. Future work
should add references, examples, boundaries, or adapter notes only when real
production usage reveals a repeatable need.

## Notes

One generated image returned a nonstandard source size:

```text
narrative-journal-infographic/candidate-01: 1942x809
```

The remaining eight images returned:

```text
1536x1024
```

This is a runtime/export issue, not a pattern-stability issue. Formal channel
assets still need explicit final export before publishing.
