# Pattern Reference Candidates

Date: 2026-05-16

Purpose: prepare operator review for which generated images should become
public-safe Open Visual Grammar `refs/` or pattern-local examples.

Do not copy images into `open-visual-grammar` until the operator selects them.
Temporary test outputs stay in article `_work/visual-runs/`.

## Selection Rule

Promote only images that satisfy all of these:

- shows the pattern's visual identity clearly;
- is useful as a reference for future agents;
- is public-safe and does not expose private data;
- does not rely on prompt text to understand the style;
- is not from a rejected pattern.

## Current Stable / Passed Patterns

### `big-character-poster`

Existing OVG refs:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/big-character-poster/refs/agent-runtime-cost-x-cover.png
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/big-character-poster/refs/context-token-economics-x-cover.png
```

Candidate review entries:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-15-design-language-v2-subagent/review.html
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-15-big-character-stability/review.html
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-15-big-character-stability/review.html
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-15-big-character-stability/review.html
```

Recommendation: do not add more refs yet unless a candidate is clearly stronger
than the two existing refs. The pattern already has public anchors.

### `narrative-journal-infographic`

Candidate review entry:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-16-pattern-seed-test-narrative-journal-infographic/review.html
```

Operator already judged the group stable. Select 1-2 candidates that best show:

- handdrawn information structure;
- comparison or workflow;
- short readable notes;
- soft color;
- manually reasoned layout.

### `flowing-gaze-minimal-cover`

Candidate review entry:

```text
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-pattern-seed-test-flowing-gaze-minimal-cover/review.html
```

Operator already judged the group stable. Select 1-2 candidates that best show:

- one subject or viewpoint;
- strong negative space;
- quiet narrative tension;
- pen or etching texture;
- restrained palette.

### `pixel-retro`

Candidate review entry:

```text
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-16-pattern-seed-test-pixel-retro/review.html
```

Operator already judged the group stable. Select 1-2 candidates that best show:

- visible pixel blocks;
- game-system logic;
- clear silhouettes;
- tool/geek atmosphere;
- readable cost/path metaphor.

### `eastern-texture-handdrawn`

Candidate review entries:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-16-pattern-seed-test-eastern-texture-handdrawn/review.html
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-random-mechanism-test-eastern-texture-handdrawn/review.html
```

Operator judged the random mechanism test passed. Select 1-2 candidates that
best show:

- paper texture;
- loose ink line;
- low saturation;
- whitespace;
- reflective metaphor.

## Awaiting Explicit Operator Judgment

These groups have been generated but not explicitly marked stable yet.

### `whimsical-journal-sketch`

Review entry:

```text
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-pattern-seed-test-whimsical-journal-sketch/review.html
```

Ask the operator whether it passes before promoting refs.

### `minimal-handdrawn-linework`

Review entry:

```text
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-16-pattern-seed-test-minimal-handdrawn-linework/review.html
```

Ask the operator whether it passes before promoting refs.

## Rejected

### `elegant-minimal-art`

Review entry:

```text
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-16-pattern-seed-test-elegant-minimal-art/review.html
```

Do not promote. The operator rejected this pattern because it is visually
acceptable but too generic to stand as an independent reusable pattern.

## Operator Decision Needed

For each passed pattern without refs, pick candidates by number:

```text
narrative-journal-infographic: candidate-?
flowing-gaze-minimal-cover: candidate-?
pixel-retro: candidate-?
eastern-texture-handdrawn: candidate-?
whimsical-journal-sketch: pass/reject, candidate-?
minimal-handdrawn-linework: pass/reject, candidate-?
```
