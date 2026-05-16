# Remaining Pattern Seed Review

Date: 2026-05-16

## Purpose

Test the remaining recovered GanFan historical pattern seeds that were not in
the first stability pass.

This run is for operator visual review. Do not mark these patterns stable until
the operator has judged the final images.

## Test Contract

- one pattern per run;
- one real article/source per pattern;
- exactly three cards per pattern;
- judge final images, not runtime prompt text;
- store generated results in `_work/visual-runs/`;
- do not replace `assets/cover.png` during the test.

## Runs

### `eastern-texture-handdrawn`

Article:

```text
articles/2026-05-12-agent-context-token-economics/x.md
```

Review entry:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-16-pattern-seed-test-eastern-texture-handdrawn/review.html
```

### `whimsical-journal-sketch`

Article:

```text
articles/2026-05-10-codex-history-sessions/x.md
```

Review entry:

```text
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-pattern-seed-test-whimsical-journal-sketch/review.html
```

### `elegant-minimal-art` rejected

Article:

```text
articles/2026-05-09-codex-api-mode-plugins/x.md
```

Review entry:

```text
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-16-pattern-seed-test-elegant-minimal-art/review.html
```

Runtime note:

```text
candidate-03 retried once after HTTP 524 and returned 1024x1024.
```

Operator judgment:

```text
Rejected.
```

Reason:

```text
The output is not bad, but the pattern does not have enough independent visual
identity. It reads like a safe, warm, generic article illustration and overlaps
with other calmer handdrawn patterns.
```

Decision:

```text
Remove `elegant-minimal-art` from active Open Visual Grammar patterns. Keep this
eval entry as a rejection record so future agents do not reintroduce it as a
default safe option.
```

### `minimal-handdrawn-linework`

Article:

```text
articles/2026-05-11-claude-code-gpt-cost/x.md
```

Review entry:

```text
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-16-pattern-seed-test-minimal-handdrawn-linework/review.html
```

## Current Status

Awaiting operator judgment.

Rejected:

```text
elegant-minimal-art
```

Judge the same three questions:

- Does the style stand up as a reusable pattern?
- Does the image connect to the article without needing prompt explanation?
- Are the three candidates in the same group recognizably stable?

## Runtime Boundary Note

During this run, `sorrycode-image2` was adjusted to support:

```bash
--no-prompt-log
```

Future GanFan visual runs should use this flag whenever the run already has
`runtime-prompt.md`, so the API runtime does not create duplicate `prompt.txt`
files.
