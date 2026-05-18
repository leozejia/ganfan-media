# Current Operations Handoff

Updated: 2026-05-18

One-line alignment for the next agent:

```text
Start from ganfan-media, preserve the user's current edits, keep every public piece beginner-first and independently useful, and never let temporary visual experiments become the workflow source of truth.
```

## Start Here

Primary workspace:

```text
/Users/zejiawu/Projects/Project-Atlas/ganfan-media
```

Read first:

```text
AGENTS.md
docs/workflows/media-operations-workflow.md
docs/strategy/ai-literacy-ambassador-plan-v1.md
```

This repo is the operating workspace for GanFan / SorryCode media operations.
Do not start new media workflows from `ganfan-nexus`.

## Current Repo State

At handoff time, temporary local noise was removed from `ganfan-media`:

- `.DS_Store`
- Chrome headless profile cache under visual runs
- a wrong-path HTML composite experiment for the context-management cover
- a failed direct image retry directory that only contained 524 diagnostics

Remaining `ganfan-media` changes are real operating work and should not be
reverted casually:

```text
articles/2026-05-16-ai-billing-five-fields/
docs/strategy/ai-literacy-ambassador-plan-v1.md
docs/handoffs/current-operations-handoff.md
```

`articles/2026-05-16-ai-billing-five-fields/assets/cover.png` is an intended
selected cover asset.

Before committing or publishing, run:

```text
git status --short
scripts/validate-visual-structure.sh
```

## Operating Rules

- One article teaches one problem. Do not combine model billing, gateway trust,
  runtime behavior, and product sales into one post.
- X posts must be independently useful before the SorryCode CTA.
- SorryCode docs must be beginner-first, agent-first, concrete, and operational.
- Keep source notes, drafts, assets, outputs, and publish logs separated.
- Do not publish to X with `--submit` unless the user explicitly asks for direct
  publishing. Default is preview / draft.
- For visuals, generate three candidates when the user is choosing a direction.
- Runtime prompts and failed generations belong under `_work/visual-runs/`.
  Selected delivery files belong under `assets/`.
- Do not turn a one-off prompt into a public workflow rule. The user dislikes
  patchy anti-rules and over-designed guardrail files.

## Current Media Strategy

The current strategy is `AI literacy ambassador`.

Traffic lesson:

```text
Visible tool problem + direct result > pure mechanism explanation.
```

The best-performing piece was `Codex API mode plugins` because it solved a
visible problem: grey / missing plugin entries. Future pieces can still explain
mechanisms, but they need a concrete result: checklist, diagnostic path,
command, template, decision tree, or before/after fix.

Current priority article title:

```text
AI 明明没写几个字，为什么账单这么贵？
```

Core teaching model:

```text
input  = what the model read
output = what the model generated
cache  = what was reused or written for reuse
```

Keep the article objective. Do not invent a five-field pricing model. For public
teaching, treat input / output / cache as the stable billing-language layer, then
explain how web chat, API usage, and agent runtimes can trigger those categories.

Gateway dark-pattern content is a separate later article:

```text
中转站最容易暗箱操作的 4 个地方
```

## Article Packages

### Codex API Mode Plugins

Path:

```text
articles/2026-05-09-codex-api-mode-plugins/
```

Public SorryCode URL:

```text
https://sorrycode.com/docs/runtime/codex-plugins
```

The user confirmed this URL is correct. X was already sent by the operator, but
the X URL may still be missing from `publish.md`.

### Codex History Sessions

Path:

```text
articles/2026-05-10-codex-history-sessions/
```

Public SorryCode URL:

```text
https://sorrycode.com/docs/tools/codex-history
```

The user confirmed this URL is correct. X was already sent by the operator, but
the X URL may still be missing from `publish.md`.

### Claude Code GPT Cost

Path:

```text
articles/2026-05-11-claude-code-gpt-cost/
```

Core thesis:

```text
Claude Code can call GPT through compatible routing, but cost and quality depend
on the runtime/model/cache fit, not only on the model name.
```

Important nuance:

- Do not frame this as "can Claude Code run GPT?" The issue is not whether it
  can run.
- The observed problem was low cache efficiency / poor runtime fit in that path.
- GPT models currently fit Codex better as the mainstream path; Codex has become
  the stronger default GPT agent runtime in our narrative.

The user indicated this piece was pushed out. Verify and update `publish.md`
only when the actual URL is available.

### Agent Context Token Economics

Path:

```text
articles/2026-05-12-agent-context-token-economics/
```

Core thesis:

```text
Context is both asset and liability. A long session with high cache hit can still
cost money and can also create stale state. Stable truth belongs in durable files;
temporary conversation should be distilled, handed off, or discarded.
```

Current SorryCode anchor:

```text
https://sorrycode.com/docs/agent-infra/context-management
```

Related docs in `sorrycode-content`:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/context-management/
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/agents-md/
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/claude-md/
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/design-md/
```

Do not say "sessions should be kept forever." The correct management pattern is:

```text
work in a session -> distill stable truth -> write handoff/context files -> release old session
```

User's preferred handoff prompt:

```text
我准备释放这个会话了，请你复核一下当前文档的健康程度，准备一份 handoff 给你的继任者，并给他一句话，让他能够拉齐项目情况。
```

### AI Billing Five Fields / Cost Basics

Path:

```text
articles/2026-05-16-ai-billing-five-fields/
```

Current public title:

```text
AI 明明没写几个字，为什么账单这么贵？
```

Current status in `publish.md`:

```text
preview ready; source review passed on 2026-05-18
```

Preview URL recorded:

```text
https://x.com/compose/articles/edit/2055991046774169600/preview
```

Selected cover:

```text
articles/2026-05-16-ai-billing-five-fields/assets/cover.png
```

Important:

- Do not publish without user confirmation.
- The X draft has been reviewed against official OpenAI / Anthropic usage and
  billing notes; no factual blocker found for manual preview publishing.
- This piece should stay short, sharp, and practical for X.
- The long-lived SorryCode version can be broader and more beginner-friendly.
- The corresponding SorryCode docs have been restructured around platform cost
  literacy; check `sorrycode-content` before editing.

## Visual Workflow State

Use `ganfan-article-illustrator` through the media workflow. The visual method
lives in Open Visual Grammar:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar
```

Stable / useful patterns:

```text
patterns/big-character-poster/
patterns/narrative-journal-infographic/
patterns/flowing-gaze-minimal-cover/
patterns/pixel-retro/
patterns/eastern-texture-handdrawn/
patterns/whimsical-journal-sketch/
patterns/minimal-handdrawn-linework/
```

`elegant-minimal-art` was judged too generic and should not be revived as a
default direction.

Key OVG design decision:

```text
patterns are reusable visual abstraction styles, not fixed scenes.
```

They can recommend scenarios, but should not lock the agent into one use case.
Agents should route through the registry first, then load only the relevant
pattern and runtime docs.

## Context-Management Docs Cover

Current visual task:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/context-management/
```

The user reviewed the direct image redraw candidates from:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-18-context-management-docs-redraw/
```

User selected `candidate-01`.

Selected delivery file:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/context-management/cover.png
```

It was resized to the SorryCode docs hero preset:

```text
1200x675
```

`sorrycode-content/index.json` now points both zh/en context-management entries
to:

```text
articles/agent-infra/context-management/cover.png
```

Keep the earlier correction in force for future cover work:

- the problem was not "no text"; the problem was "no fake logo";
- direct image generation remains the main path;
- allow a large readable Chinese title and a few labels;
- forbid fake logos, random seals, watermarks, QR codes, and random emblems;
- if SorryCode branding is needed, use the official asset as reference or add it
  after generation;
- do not make HTML the default creative path.

Official SorryCode logo assets:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode/frontend/public/logo.svg
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode/frontend/public/logo.png
```

HTML/CSS overlays may be used only as final deterministic cleanup for text or
brand placement, not as the main image-generation strategy.

## Related Repositories

### sorrycode-content

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content
```

Purpose:

```text
Public, reviewed, hot-updatable SorryCode article content.
```

Current known dirty state at handoff time:

```text
M index.json
?? articles/agent-infra/context-management/cover-option-1.png
?? articles/agent-infra/context-management/cover-option-2.png
?? articles/agent-infra/context-management/cover-option-3.png
?? articles/agent-infra/context-management/cover.png
?? articles/platform/ai-cost-basics/cover.png
```

Do not clean this repo from `ganfan-media` without first reviewing what should
be published or discarded.

### sorrycode

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode
```

Purpose:

```text
Product site, docs renderer, navigation, cache and permission boundary, current
logo/brand assets, historical docs references.
```

Useful architecture reference:

```text
docs/architecture/public-docs-architecture.md
```

### open-visual-grammar

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar
```

Purpose:

```text
Agent-first visual methodology: registry, patterns, grammar, and runtimes for
image covers, deterministic layout, shader/video directions, and future visual
systems.
```

Current status: clean at handoff time.

### sorrycode-image2

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-image2
```

Purpose:

```text
Public skill that teaches agents how to call SorryCode Images API.
```

Important boundary:

```text
sorrycode-image2 is a runtime driver. It should not teach visual style or prompt
methodology. OVG owns visual method; sorrycode-image2 owns API execution.
```

### mypromptist

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/mypromptist
```

Purpose:

```text
Consumer product/workflow that needs OVG for deterministic HTML design delivery.
```

Related handoff:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/docs/typography-contract-handoff.md
```

Font discussion state:

- MP needs user-selectable font combinations, not one fixed answer.
- OVG should preserve design methodology and font taste, but deterministic
  product decisions belong in MP.
- The user selected several promising directions during visual review, but MP's
  agent should continue the product-specific implementation.

### codex-history

Path:

```text
/Users/zejiawu/Projects/Project-Atlas/labs/codex-history
```

Public repo:

```text
https://github.com/leozejia/codex-history
```

Purpose:

```text
Open-source tool for listing, searching, resuming, and forking local Codex
sessions.
```

Do not commit unrelated untracked files there unless the user explicitly asks.

## User Preferences To Preserve

- The user strongly dislikes generic AI prose. Drafts need stance, compression,
  conflict, and real operational examples.
- Do not dump all discussion details into the public article. Keep the public
  piece focused on the one useful point.
- Avoid "not X but Y" filler. State the precise rule directly.
- Avoid patch-like anti-rules unless a stable pattern clearly needs them.
- Do not over-design repository structures before the user agrees.
- For visuals, the user judges by both design quality and content expression.
  Stable style is not enough; the cover must carry the article's argument.
- For image covers, show results, not long prompt explanations, unless the user
  asks for prompt/method analysis.
- For X Article automation, preview first. Direct submit only when explicitly
  requested.

## Next Best Actions

1. If continuing media operations, confirm whether `AI 明明没写几个字，为什么账单这么贵？` should be published from preview or revised first.
2. If continuing visuals, redo the `context-management` SorryCode docs cover by
   direct generation, with text allowed and fake logos forbidden.
3. If cleaning publishing records, ask the user for missing X URLs for already
   published articles and update each `publish.md`.
4. If committing, keep coherent units separate:
   - media strategy + AI billing package;
   - SorryCode content docs / covers;
   - OVG workflow updates;
   - image2 runtime-skill updates.
