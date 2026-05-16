# Pattern Reference Candidates

Date: 2026-05-16

Purpose: record operator review for which generated images should become
public-safe Open Visual Grammar `refs/`.

Temporary test outputs stay in article `_work/visual-runs/`. Selected reference
images can be copied into `open-visual-grammar/patterns/<pattern>/refs/`.
Runtime prompts remain in GanFan `_work` as run provenance and should not be
copied into Open Visual Grammar as stable method.

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

Operator already judged the group stable.

Selected reference:

```text
candidate-03
```

Promoted to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/narrative-journal-infographic/refs/token-economics-journal-infographic-01.png
```

Selected because it best shows:

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

Operator already judged the group stable.

Selected reference:

```text
candidate-02
```

Promoted to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/flowing-gaze-minimal-cover/refs/codex-history-flowing-gaze-01.png
```

Selected because it best shows:

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

Operator already judged the group stable.

Selected references:

```text
candidate-01
candidate-03
```

Promoted to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/pixel-retro/refs/agent-runtime-cost-pixel-01.png
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/pixel-retro/refs/agent-runtime-cost-pixel-02.png
```

Selected because they best show:

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

Operator judged the main run and random mechanism test passed.

Selected references:

```text
candidate-01 from main pattern-seed test
candidate-03 from random mechanism test
```

Promoted to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/eastern-texture-handdrawn/refs/token-economics-eastern-texture-01.png
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/eastern-texture-handdrawn/refs/codex-history-eastern-texture-02.png
```

Selected because they best show:

- paper texture;
- loose ink line;
- low saturation;
- whitespace;
- reflective metaphor.

## Additional Operator Judgment

### `whimsical-journal-sketch`

Review entry:

```text
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-pattern-seed-test-whimsical-journal-sketch/review.html
```

Operator judgment:

```text
Passed.
```

Selected reference:

```text
candidate-03
```

Promoted to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/whimsical-journal-sketch/refs/codex-history-whimsical-journal-01.png
```

Reason:

```text
The group showed stable visual identity, and candidate-03 is strong enough to
serve as the first public reference.
```

### `minimal-handdrawn-linework`

Review entry:

```text
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-16-pattern-seed-test-minimal-handdrawn-linework/review.html
```

Operator judgment:

```text
Passed as a seed pattern.
```

Selected reference:

```text
candidate-01
```

Promoted to:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/minimal-handdrawn-linework/refs/agent-runtime-cost-minimal-linework-01.png
```

Reason:

```text
candidate-01 is good enough to act as the first reference. The style should
remain tentative in production, but it now has a visual anchor.
```

## Rejected

### `elegant-minimal-art`

Review entry:

```text
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-16-pattern-seed-test-elegant-minimal-art/review.html
```

Do not promote. The operator rejected this pattern because it is visually
acceptable but too generic to stand as an independent reusable pattern.

## Operator Selection Summary

```text
narrative-journal-infographic: candidate-03
flowing-gaze-minimal-cover: candidate-02
pixel-retro: candidate-01, candidate-03
eastern-texture-handdrawn: candidate-01 from main, candidate-03 from random
whimsical-journal-sketch: passed, candidate-03
minimal-handdrawn-linework: passed as seed, candidate-01
```
