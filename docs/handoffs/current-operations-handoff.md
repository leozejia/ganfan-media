# Current Operations Handoff

Updated: 2026-05-12

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

Source candidate:

```text
articles/2026-05-10-codex-history-sessions/assets/cover-5x2-candidate-2.png
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
publish.md
assets/.gitkeep
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

Put prompts, diagnostics, rejected images, and temporary work under:

```text
_work/images/
```

`articles/**/_work/` is ignored by git.

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
