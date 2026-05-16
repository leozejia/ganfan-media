# AI Literacy Ambassador Plan v1

Updated: 2026-05-11

## Role

GanFan / SorryCode should publish as an AI literacy ambassador, not as a product account.

The job is to explain how AI tools actually work: runtimes, protocols, models, billing, caches, skills, local environment, and agent workflows. Each piece should make one hidden mechanism legible to beginners and give them one practical thing to do next.

SorryCode can be the low-friction next step, but it should not be the main character of most posts.

## Publishing Thesis

Good X posts come from a real contradiction:

- a tool appears to work, but the cost is wrong;
- a setup looks broken, but the failure is one layer below;
- a model name looks familiar, but the upstream may be different;
- an agent seems careless, but the project gave it no stable context;
- a command was copied correctly, but run in the wrong shell;
- a feature is technically possible, but not the default beginner path.

The public lesson should be independent. The SorryCode link is only a path to a cleaner, complete guide.

## Editorial Standard

Every candidate must pass these checks before it becomes an article package:

1. **Independent pain**: the topic matters even if the reader never clicks SorryCode.
2. **One teachable mechanism**: the post explains one hidden layer, not a product catalog.
3. **Beginner language**: avoid protocol jargon until the user has a concrete problem.
4. **Actionable body**: the X post gives a usable rule, command, checklist, or mental model.
5. **Light CTA**: one quiet link to a SorryCode guide, after the reader has learned something.
6. **Fact boundary**: official docs, public repos, or internal observations are separated.
7. **No unverifiable accusations**: discuss possible dark patterns without naming actors unless public evidence exists.

## Voice

Use a calm, slightly sharp teaching voice.

Good:

- "能跑不等于划算。"
- "compatible 只是协议兼容，不代表背后一定是官方模型。"
- "账单贵，常常不是输出多，而是每轮都在重新读上下文。"
- "先分清是哪一层坏了，再重装工具。"

Avoid:

- product bragging;
- scarebait without a useful diagnostic;
- generic AI summary language;
- saying "黑心站长" as a direct accusation without evidence.

Use "中转站可以暗箱操作的地方" or "用户看不见的定价/映射层" instead.

## Core Series

### 1. Runtime, Model, Protocol, Billing

Purpose: explain why AI coding tools can appear interchangeable but behave differently in cost, cache, and quality.

Candidate posts:

- `Claude Code 里能跑 GPT，但不一定该这么跑`
- `工具不是模型：Codex / Claude Code / GPT / Claude 到底怎么分`
- `OpenAI-compatible / Anthropic-compatible 只是协议，不是官方保证`
- `为什么同样一句话，在不同 agent 里成本可能差很多`

Likely SorryCode anchors:

- `/docs/platform/tools-and-models`
- `/docs/runtime/codex`
- `/docs/runtime/claude-code`

### 2. LLM Billing Literacy

Purpose: teach users how to read cost beyond "input + output".

Candidate posts:

- `LLM 账单不是只有输入和输出`
- `cached tokens / cache read / cache creation 到底是什么`
- `为什么 agent 没输出多少，也能烧很多钱`
- `怎么看一次请求到底贵在哪里`

Facts to verify before publishing:

- OpenAI usage and prompt caching fields.
- Anthropic usage fields, including input/output/cache write/cache read terms.
- Current public pricing language for cached tokens when a specific model is mentioned.

Public boundary:

- Internal user anecdotes can shape the hook, but do not publish exact spend, account data, request IDs, or private usage logs unless the operator explicitly approves an anonymized version.

### 3. Proxy and Gateway Transparency

Purpose: teach users where compatible gateways and reseller platforms can hide complexity.

Candidate posts:

- `中转站最容易暗箱操作的 4 个地方`
- `模型名不等于真实上游：别只看下拉框`
- `为什么一个站点能把 GPT 包成 Claude 协议`
- `选择中转站前，先问它能不能展示 usage breakdown`

Teach:

- model alias mapping;
- protocol bridging;
- price multiplier;
- hidden upstream choice;
- missing cache breakdown;
- fallback to another model;
- ambiguous "compatible" wording.

Safe language:

- Discuss as structural risks and due-diligence checks.
- Do not claim a provider is substituting models without public proof.

### 4. Agent Project Context

Purpose: show that agent quality often depends on stable project instructions, not just model strength.

Candidate posts:

- `上下文不是越多越好：Agent 时代的 Token 经济学`
- `每次都给 Codex 解释项目规则？写 AGENTS.md`
- `CLAUDE.md 和 AGENTS.md 不要互相打架`
- `AI 改项目之前，先让它读哪几个文件`
- `为什么 agent 总改太多：你的约束没有落到文件里`

Likely SorryCode anchors:

- `/docs/agent-infra/agents-md`
- `/docs/agent-infra/claude-md`
- `/docs/agent-infra/design-md`
- `/docs/village/read-project`
- `/docs/village/edit-first-file`

### 5. Design and Creation Workflow

Purpose: teach agent-first creative production without making it a tool advertisement.

Candidate posts:

- `AI 做设计总跑偏？把风格写进 DESIGN.md`
- `Skill 管流程，DESIGN.md 管风格`
- `第一次让 agent 生成图片，别只保存最后一张图`
- `做 PPT 前，先让 agent 问 6 个问题`

Likely SorryCode anchors:

- `/docs/agent-infra/design-md`
- `/docs/skills/kami`
- `/docs/skills/magazine-web-ppt`
- `/docs/skills/sorrycode-image2`
- `/docs/village/first-image`

### 6. Local Environment and Shell Pitfalls

Purpose: reduce beginner installation failures by explaining the layer below the AI tool.

Candidate posts:

- `node/npm 找不到，不一定是 API 坏了`
- `Windows 命令别混用 PowerShell / Git Bash / WSL`
- `一键安装失败，先判断是环境、网络、Key 还是模型`
- `macOS 终端输入密码不显示字符，是正常的`

Likely SorryCode anchors:

- `/docs/environment/nodejs`
- `/docs/environment/windows-powershell`
- `/docs/platform/first-request`
- `/docs/troubleshoot/common-errors`

## Priority Queue

Status updated: 2026-05-16

### P0: Produce Next

1. `Claude Code 里能跑 GPT，但不一定该这么跑` (published)
   - Conflict: protocol bridges make it possible, but cache and billing can make it expensive.
   - Public lesson: runtime, protocol, model, and billing are four different layers.
   - Needs sources: OpenAI and Anthropic usage / caching docs.

2. `上下文不是越多越好：Agent 时代的 Token 经济学` (published)
   - Conflict: long context feels powerful, but stale context becomes cost and attention debt.
   - Public lesson: stable context goes into files; temporary context gets distilled or discarded.
   - Needs sources: OpenAI / Anthropic context, caching, compaction, and AGENTS.md docs.

3. `LLM 账单不是只有输入和输出` (next)
   - Conflict: users look at output length, but cost may come from repeated input, cache creation, or cache misses.
   - Public lesson: read usage breakdown before blaming the model.
   - Needs sources: official billing / usage docs.

4. `中转站最容易暗箱操作的 4 个地方`
   - Conflict: a compatible endpoint can hide model mapping and pricing rules.
   - Public lesson: ask for model mapping, usage breakdown, and pricing transparency.
   - Needs careful legal/factual framing.

### P1: Next Evergreen Pieces

4. `每次都给 Codex 解释项目规则？写 AGENTS.md`
5. `AI 做设计总跑偏？把风格写进 DESIGN.md`
6. `Windows 命令别混用 PowerShell / Git Bash / WSL`
7. `node/npm 找不到，不一定是 API 坏了`

### P2: Requires Refactor First

8. `常见问题` split into one-problem posts:
   - `401 是 Key 问题还是协议头问题`
   - `404 多半是 Base URL 或路径拼错`
   - `429 不只代表没钱，也可能是限频`
9. `首条请求` rewrite as a general smoke-test tutorial, not a SorryCode API tutorial.
10. `第一次生成图片` rewrite as artifact hygiene: save prompt, response, and output, not as "use SorryCode Image2".

## Package Rules

Create one package per public campaign:

```text
articles/YYYY-MM-DD-topic-slug/
├── brief.md
├── sources.md
├── x.md
├── sorrycode.md
├── assets/
├── outputs/
└── publish.md
```

For this series:

- `brief.md` must include the conflict, beginner lesson, CTA target, and private/public boundary.
- `sources.md` must separate official sources, internal observations, and claims to avoid.
- `x.md` must teach the core point before linking.
- `sorrycode.md` can either be a standalone long guide or a proposed rewrite note for the SorryCode content team.
- If the SorryCode engineering team is migrating docs to `sorrycode-content`, do not edit that repo from media ops unless explicitly asked. Maintain source drafts and strategy in `ganfan-media`.

## Refactor Rules

It is acceptable to restructure, prune, or delete distracting media files inside `ganfan-media` when they block operations.

Before deleting:

- confirm the file is process-only, duplicate, or obsolete;
- do not delete source notes, published assets, or publish logs;
- do not touch secrets, runtime browser profiles, or unrelated project files;
- record major cleanup in `docs/handoffs/current-operations-handoff.md` if it changes how future agents work.

## Operating Rhythm

Default weekly target:

- 2 X tutorial posts;
- 1 deeper SorryCode-compatible article package;
- 1 doc-refactor recommendation for the engineering/content migration track.

Daily operating loop:

1. Pick one P0/P1 candidate.
2. Check whether official sources are needed.
3. Create or update an article package.
4. Draft X first.
5. Draft SorryCode long-form or rewrite note second.
6. Decide if a cover helps; if yes, use `ganfan-article-illustrator`.
7. Publish via `ganfan-distribution-agent` when ready.
8. Update `publish.md` and this plan if the lesson changes the strategy.

## Current Constraints

- The SorryCode engineering team is migrating docs into `sorrycode-content`.
- Media ops should maintain strategy, source packages, drafts, assets, and publish records in `ganfan-media`.
- Do not edit `sorrycode-content` unless the user explicitly asks for content migration work.
- Do not use `ganfan-nexus` as the media entry point.
