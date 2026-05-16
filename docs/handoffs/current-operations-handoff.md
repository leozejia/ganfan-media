# Current Operations Handoff

Updated: 2026-05-16

This handoff is for the next COO / media-ops agent session. Start future operations work from `ganfan-media`, not `ganfan-nexus`.

## Role

The agent acts as chief operating officer for GanFan / SorryCode content operations.

Default responsibilities:

- plan and produce public-facing SorryCode tutorials;
- prepare X / WeChat / SorryCode article packages;
- maintain article assets, covers, source notes, and publish records;
- keep beginner-first public docs aligned with SorryCode architecture;
- avoid leaking internal account, provider, routing, key, cookie, or token details.

Current media strategy source:

```text
docs/strategy/ai-literacy-ambassador-plan-v1.md
```

Use this as the operating plan for the AI literacy ambassador series: independent X tutorials first, light SorryCode CTA second.

Latest working article package:

```text
articles/2026-05-12-agent-context-token-economics/
```

Purpose: teach context economics for agent users beyond coding. Core thesis: context is both asset and liability; stable context belongs in files, temporary context should be distilled or discarded, and cache hit rate is not a session-health signal.

Next AI literacy article in the current P0 queue:

```text
看懂 AI 账单的 5 个字段：别再只盯 output tokens
```

This should come before:

```text
中转站最容易暗箱操作的 4 个地方
```

Reason: the first two published pieces already covered runtime/protocol/model
cost and agent context economics. The next clean educational step is a broader
billing-literacy article that explains usage breakdowns without making the
piece about any specific gateway. The gateway-transparency article should
follow after readers understand billing fields.

Current traffic lesson:

```text
Visible tool problem + direct result > pure mechanism explanation.
```

The strongest previous post was `Codex API mode plugins` because it gave users a
clear outcome: fix a grey / missing plugin entry. Future AI-literacy pieces
should still teach real mechanisms, but the package must give the reader a
takeaway artifact first: checklist, command, diagnostic flow, template, decision
tree, or before/after fix.

New article package:

```text
articles/2026-05-16-ai-billing-five-fields/
```

This package is prepared only to the brief/source-boundary stage. Do not draft
or publish until official OpenAI and Anthropic billing / usage docs are checked.

## Repositories

### `ganfan-media`

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/ganfan-media
```

This is the primary operations workspace.

Use it for:

- article packages under `articles/`;
- covers and article assets;
- X / WeChat publishing workflow;
- source notes and public/private boundaries;
- media workflow skills.

Entry files:

```text
AGENTS.md
docs/workflows/media-operations-workflow.md
```

Current simplified structure:

```text
articles/      article packages
channels/      X / WeChat publishing profiles
skills/        active media workflow skills
docs/          workflows, strategy, handoffs
assets/        reusable media assets
```

### `sorrycode`

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode
```

Use as product-site and historical public-docs source until content migration completes.

Important architecture reference:

```text
docs/architecture/public-docs-architecture.md
```

Core public-docs model from that file:

```text
ganfan-media        选题、草稿、素材生产、渠道分发
sorrycode-content   已审核、可公开、可热更新的内容源
sorrycode           产品站、渲染器、导航、缓存和权限边界
```

Long-term public docs IA:

```text
开始使用
Platform
Runtime
Skills
新手村
工具
Agent 基建
环境准备
排障
```

### `sorrycode-content`

Expected future path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content
```

This will gradually receive public, reviewed, hot-updatable SorryCode content. Treat `sorrycode` docs as history/reference when rewriting or migrating into `sorrycode-content`.

If the repo does not exist or lacks instructions in a future session, inspect it first and follow its own `AGENTS.md` if present.

### `codex-history`

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/codex-history
```

Our own open-source tool used in the latest article.

Public repo:

```text
https://github.com/leozejia/codex-history
```

README was rewritten and pushed:

```text
1ca0c6d docs: clarify session recovery workflow
```

Do not commit existing unrelated untracked JS files unless the user explicitly asks.

## Current article package

### Codex API mode plugins

Path:

```text
articles/2026-05-09-codex-api-mode-plugins/
```

Purpose: teach Codex App users why plugin entries can appear grey / missing when API mode and plugin configuration are not aligned.

Public SorryCode URL is live:

```text
https://sorrycode.com/docs/runtime/codex-plugins
```

This URL was confirmed correct by the operator on 2026-05-11.

X Article was manually published by the operator on 2026-05-11. The X URL is still missing from `publish.md`; ask the user for the X URL and update it when available.

### Codex History Sessions

Path:

```text
articles/2026-05-10-codex-history-sessions/
```

Purpose: teach users how to recover local Codex sessions after switching provider / base URL / config.

Files:

```text
brief.md
sources.md
x.md
sorrycode.md
visual.md
assets/cover.png
outputs/wechat/article.html
publish.md
```

Public SorryCode URL is live:

```text
https://sorrycode.com/docs/tools/codex-history
```

This URL was confirmed correct by the operator on 2026-05-11.

X Article was manually published by the operator on 2026-05-11 after automation filled the editor but readiness detection lagged. The X URL is still missing from `publish.md`; ask the user for the X URL and update it when available.

Current formal cover:

```text
articles/2026-05-10-codex-history-sessions/assets/cover.png
```

It is exact X Article size:

```text
1500x600, 5:2
```

### Agent Context Token Economics

Path:

```text
articles/2026-05-12-agent-context-token-economics/
```

Files:

```text
brief.md
sources.md
x.md
sorrycode.md
visual.md
publish.md
assets/cover.png
outputs/.gitkeep
```

Current X title:

```text
上下文不是越多越好：Agent 时代的 Token 经济学
```

Important boundaries:

- This is not a proxy / middleman transparency article.
- Do not make it only about AI programming.
- Do not say cache causes dirty state.
- Do not say high cache hit rate means a session is healthy.
- Keep the CTA light. The current draft links to `https://sorrycode.com/docs/agent-infra/agents-md`.

Primary sources:

- OpenAI prompt caching, conversation state, compaction, and Codex AGENTS.md docs.
- Anthropic prompt caching, Claude Code memory, and effective context engineering article.
- Chroma context-rot technical report.
- X discussion was used only as field signal, not as factual authority.

## Important lessons from latest work

### Open Visual Grammar correction

The first visual-grammar benchmark drifted in the wrong direction: it tested
whether image models could handle many visual jobs, not whether a reusable
visual design method could be reproduced.

That benchmark package was removed from `ganfan-media`.

Current direction:

- Open Visual Grammar should first stabilize the proven big-character poster
  method used by recent GanFan / SorryCode X covers.
- The public stable pattern is now:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/big-character-poster/PATTERN.md
```

- Broader jobs such as docs hero, proof screenshot, and non-coding agent visuals
  should stay in GanFan incubation until they have operator-approved production
  references.
- Benchmarking should test method reproduction across topics, not general image
  model capability.

When testing visuals, use:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/evals/cases/big-character-poster-reproduction.md
```

Each topic still needs three cards, but the three cards should be different
visual-language solutions for the same article argument. They can vary evidence
object, title relationship, poster temperament, metaphor distance, and material
language. Do not force fixed composition labels when they weaken the idea.

The first clean reproduction run completed 12 cards across four historical
articles. Operator judgment: the style direction was close, but the content
expression did not reach the best historical covers. The strongest group was
`Claude Code GPT Cost` because its argument was naturally sharp: "can run" vs
"cost-efficient".

The durable lesson is that `big-character-poster` needs visual judgment before
prompting:

```text
reader pain -> false belief -> correction -> concrete evidence -> visual action
```

Do not generate from topic + style alone. The poster needs article-specific
evidence and a visual action that makes the correction visible.

Important correction from the operator: source selection should be a positive
inclusion protocol. One package can produce X, SorryCode, WeChat, XHS, and other
publication assets. The current asset job defines the image context unit. For
an X-cover test, start from the X draft as the primary source. Add supporting
sources only when they change the audience, factual boundary, visual claim,
delivery constraint, or reuse target.

Public-safe eval record:

```text
docs/visual-incubation/evals/2026-05-15-big-character-reproduction.md
```

Important correction after the v1 stability pass: older GanFan image-generation
flavors from `ganfan-article-illustrator/styles/archive/*.yaml` are reusable
visual pattern seeds. Treating them as legacy prompt noise was wrong.

They have been recovered into:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/
```

Extract them one at a time into proper patterns through references, boundaries,
three-card tests, and operator judgment.

Current recovered seed patterns:

```text
eastern-texture-handdrawn
pixel-retro
narrative-journal-infographic
whimsical-journal-sketch
flowing-gaze-minimal-cover
minimal-handdrawn-linework
```

Do not recreate a separate `styles/` layer. In this project, `patterns` are
reusable visual abstractions. A pattern is defined by stable visual invariants
and transfer boundaries. Recommended scenes help selection but do not lock the
pattern to one channel.

Next test plan:

1. Static check:
   - no `styles/` entry point;
   - each seed has invariants, recommended cases, weak-fit cases, and avoid
     rules;
   - `ganfan-article-illustrator` points agents to `patterns/`.
2. Single-pattern three-card test:
   - start with `narrative-journal-infographic`,
     `flowing-gaze-minimal-cover`, and `pixel-retro`;
   - one real article/source per pattern;
   - generate exactly three candidates;
   - operator judges final images only.
3. Cross-topic stability test:
   - only after the single-pattern test works;
   - one pattern, three topics, three cards each;
   - pass only if the visual invariants survive topic changes and at least one
     candidate per topic is close to usable.

Record failed runs as pattern boundaries or anti-patterns. Do not turn runtime
prompts into the source of truth.

2026-05-16 recovered pattern seed stability result:

```text
docs/visual-incubation/evals/2026-05-16-recovered-pattern-seed-stability.md
```

Patterns tested:

```text
narrative-journal-infographic
flowing-gaze-minimal-cover
pixel-retro
```

Operator judgment: all three groups passed. The groups are visually distinct,
and each group stayed stable across three generated candidates. Preserve these
three pattern seeds as current stable baselines. Do not keep editing their core
descriptions unless repeated production failures show the same root cause.

Remaining pattern seed review generated on 2026-05-16:

```text
docs/visual-incubation/evals/2026-05-16-remaining-pattern-seed-review.md
```

Pattern seed status after operator review:

```text
passed: eastern-texture-handdrawn
passed: whimsical-journal-sketch
passed as seed: minimal-handdrawn-linework
rejected: elegant-minimal-art
```

Random mechanism test:

```text
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-16-random-mechanism-test-eastern-texture-handdrawn/review.html
```

Operator judgment: passed. The mechanism used the bilingual
`eastern-texture-handdrawn` pattern with a randomly selected `codex-history`
tool tutorial source. The result satisfied the baseline requirement. Keep the
pattern in its current state; future work can polish references/examples without
editing the core pattern text.

Rejected on 2026-05-16: `elegant-minimal-art`. Reason: it was visually
acceptable but too generic to stand as an independent pattern. It overlaps with
other calm handdrawn illustration seeds and risks becoming a safe default
instead of a reusable visual abstraction.

Operator-selected Open Visual Grammar refs promoted on 2026-05-16:

```text
narrative-journal-infographic: candidate-03
flowing-gaze-minimal-cover: candidate-02
pixel-retro: candidate-01, candidate-03
eastern-texture-handdrawn: candidate-01 from main, candidate-03 from random
whimsical-journal-sketch: candidate-03
minimal-handdrawn-linework: candidate-01
```

The generated PNGs were copied into:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns/*/refs/
```

The corresponding runtime prompts remain only in:

```text
articles/*/_work/visual-runs/*/candidate-*/runtime-prompt.md
```

Do not copy these one-off prompts into Open Visual Grammar. They are provenance
for the selected images, not the stable visual method.

`ganfan-article-illustrator` now consumes Open Visual Grammar directly:

```text
skills/ganfan-article-illustrator/SKILL.md
```

For future article visuals, choose exactly one OVG pattern, read that pattern's
`PATTERN.md`, then read `refs/README.md` and inspect reference images only when
visual calibration matters. Do not default every X cover to
`big-character-poster`; use it when the article needs a dominant headline and
sharp conflict. Seed patterns with operator-selected refs are allowed in
production when they fit the article, but record the choice in `visual.md` and
inspect results carefully.

Open Visual Grammar now uses an agent-first harness:

```text
CATALOG.md -> registry/<artifact-kind>.md -> patterns/<pattern>/PATTERN.md -> adapter/runtime/grammar as needed
```

For GanFan article covers, route through:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/CATALOG.md
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/registry/image-cover.md
```

Do not ask agents to browse all of `patterns/`, `grammar/`, or `runtimes/`.
The registry owns routing; the pattern owns visual method; runtimes own
execution contracts; grammar owns shared vocabulary.

Typography / deterministic HTML note:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/docs/typography-contract-handoff.md
```

This handoff is a real next architecture topic from MyPromptist. It should not
be treated as dirty worktree noise. The issue is that font is part of visual
identity and deterministic delivery, especially for HTML / Typst / PDF outputs.
Do not solve this inside GanFan media ops. OVG now has the architecture pieces:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/grammar/typography.md
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/runtimes/font-packaging.md
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/registry/deterministic-layout.md
```

MP should not treat the current `print-menu-layout` font-family candidates as
approved production assets. The operator has not reviewed typography samples
yet. MP may use the deterministic-layout registry to understand the route, but
real consumption needs a font review pass first: render PNG/PDF samples for
each style direction, review visual taste and readability, then approve or
replace the font families. OVG should not vendor font files; consuming projects
own actual font packages, license files, hashes, and runtime paths after
approval.

Small regression pass:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-15-design-language-v2-subagent/review.html
```

Operator judgment: this batch was clearly better. The correction worked because
`big-character-poster` was reframed as a design language and meta-prompt
protocol, not a production SOP. The next visual test should expand cautiously
to two or three historical topics, while preserving the source-contract rule
and allowing the agent to choose evidence object, title relationship, poster
temperament, metaphor distance, and material language.

Second stability pass:

```text
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-15-big-character-stability/review.html
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-15-big-character-stability/review.html
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-15-big-character-stability/review.html
```

Operator judgment: the framework is stable enough to treat
`big-character-poster` as v1 for GanFan / SorryCode X covers. Keep improving
examples and adapter notes through real production, but do not redesign the
architecture unless repeated production failures show the same root cause.

Known issue from the second pass: one `codex-history-sessions` candidate needed
cropping / size correction. Treat this as a runtime/export quality-gate issue,
not a visual grammar failure.

### X Article cover ratio

X Article cover requires `5:2`. Use exact final export:

```text
1500x600
```

Do not generate a `1536x1024` source and crop it for big-character posters. That causes severe text cropping. The media skill and size table were updated to request `1500x600` first for X Article covers.

Relevant files:

```text
skills/ganfan-article-illustrator/references/channel-image-sizes.md
skills/ganfan-article-illustrator/SKILL.md
```

### Cover asset policy

Keep the publish-facing asset surface simple:

```text
assets/cover.png
assets/inline-01.png
```

Use `visual.md` as the visual decision source of truth. Put runtime prompts,
diagnostics, rejected images, and temporary work under:

```text
_work/visual-runs/<run-id>/
```

`articles/**/_work/` is ignored by git.

Run `scripts/validate-visual-structure.sh` before committing visual workflow or
article asset changes.

### `sorrycode-image2` runtime boundary

`sorrycode-image2` is maintained by us at:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-image2
```

It has been adjusted into a pure SorryCode Images API runtime driver.

Current boundary:

- `open-visual-grammar` owns visual methodology, patterns, scores, adapters, and
  evals.
- `ganfan-media` owns article-specific briefs, `visual.md`, runtime run records,
  selected assets, and operator choices.
- `sorrycode-image2` owns API key checks, endpoint/model/size/stream handling,
  request execution, saved images, and diagnostics.

`sorrycode-image2` now supports:

```bash
--no-prompt-log
```

Use this flag from GanFan visual runs whenever the workflow already has:

```text
runtime-prompt.md
```

Standalone `sorrycode-image2` runs can still write `prompt.txt`; article visual
runs should not.

Do not restore prompt teaching files such as:

```text
references/prompt-patterns.md
```

The skill can document API parameters and placeholder command syntax such as
`--prompt "<image prompt>"`, but it must not teach cover styles, product hero
prompts, poster formulas, or reusable visual patterns.

Public story:

```text
Open Visual Grammar teaches agents how to think visually.
SorryCode Image2 executes the image runtime through SorryCode.
```

### Agent Tips block policy

Only add the SorryCode “copy Markdown to agent” Tips block when an agent can actually execute, configure, edit files, or inspect the local environment.

Do not add that block to tutorials where the user must manually choose from a picker, copy a session id, read a concept, or make a judgment call. The `codex-history` tutorial deliberately does not have that Tips block.

Relevant files:

```text
docs/workflows/media-operations-workflow.md
docs/strategy/sorrycode-content-funnel-v1.md
```

### X research SOP

`docs/workflows/media-operations-workflow.md` now includes an X / browser field research subsection under Sources.

Rules:

- use Chrome or Computer Use read-only for public X timeline/search/list inspection;
- do not like, repost, reply, publish, follow, DM, or change account state during research;
- do not inspect cookies, local storage, DMs, browser profiles, or private account data;
- record X posts as discussion signal in `sources.md`;
- use official docs / repos / release notes for factual claims whenever possible.

### `npx --yes` policy

For beginner-facing docs, prefer:

```bash
npx --yes package@latest command
```

`npx` temporarily runs the npm package without adding it to the user’s project. `--yes` skips npm’s confirmation prompt. For `codex-history`, use explicit `list`:

```bash
npx --yes codex-history@latest list
```

This is clearer than relying on the default command.

## Publishing automation note

`ganfan-distribution-agent` can fill X Article cover, title, and content, but preview-readiness detection can lag. If the UI visibly succeeds but automation waits, operator manual completion is acceptable. Record this in `publish.md` rather than blocking.

Default X automation uses dedicated Chrome profile:

```text
.runtime/opencli/browser-profile
```

Do not assume daily Chrome can be controlled.

## Git state warning

At handoff time, `ganfan-media` has a large uncommitted migration/refactor state. It includes:

- `publications/` renamed to `articles/`;
- `distribution/` renamed to `channels/`;
- article package layout flattened;
- media workflow refactor;
- codex-history article package and cover assets;
- distribution-agent path/profile updates;
- active skill cleanup and archived old style files.

Before committing, inspect with:

```bash
git status --short
git diff --stat
```

Commit as coherent operational units if possible. Do not commit `.runtime`, secrets, cookies, browser profiles, or process-only `_work` folders.

## Next session checklist

1. Start in `ganfan-media`.
2. Read `AGENTS.md` and `docs/workflows/media-operations-workflow.md`.
3. Read this handoff.
4. Read `docs/strategy/ai-literacy-ambassador-plan-v1.md` before selecting the next tutorial topic.
5. If X Article URLs are not provided, ask the user for them, then update:
   - `articles/2026-05-09-codex-api-mode-plugins/publish.md`
   - `articles/2026-05-10-codex-history-sessions/publish.md`
6. If preparing SorryCode content migration, inspect `labs/sorrycode-content` and `labs/sorrycode/docs/architecture/public-docs-architecture.md` first.
7. Keep public docs beginner-first, but only use agent-first instructions when agent execution genuinely helps.
