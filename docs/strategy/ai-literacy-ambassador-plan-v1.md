# AI Literacy Ambassador Plan v1

Updated: 2026-05-20

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

## Next Narrative Layer

Status: entered on 2026-05-20 after the gateway transparency arc.

The gateway series answered:

```text
你怎么知道自己没有被黑箱骗？
```

The next agent series should answer a larger beginner question before it talks
about `AGENTS.md`, `CLAUDE.md`, cache, or token efficiency:

```text
你烧 token 到底是为了什么？
```

Most beginner users do not have a token-efficiency problem first. They have an
imagination problem. They do not know what AI can do for them, so they reduce AI
to a chat box:

```text
问一个问题 -> 等一个回答 -> 不满意 -> 再问一次
```

This is a very expensive and very narrow way to use AI. It burns token, but it
does not necessarily create leverage.

The next content arc should therefore start one layer above token economics:

```text
AI 不是更会聊天的搜索框。
AI 是把想法、资料、规则、流程、文件、代码、设计、检查、交接和执行串起来的工作界面。
```

The hard public question is not "which model is best" or "how do I save token".
It is:

```text
你到底想让 AI 帮你改变哪一段工作？
```

If the user cannot answer that, more token only makes the confusion more
expensive.

### Operating Thesis

Use this as the bridge from beginner imagination to agent infrastructure:

```text
Token 不是战力值。Token 是把上下文搬进模型的成本。
真正值得烧 token 的地方，是把一个模糊想法变成更清楚的判断、更稳定的文件、更少重复解释的流程，或者一个能交付的结果。
```

This gives the series a sharper order:

1. Why use AI at all: what can it do beyond chatting?
2. What counts as useful output: not a longer answer, but a decision, artifact,
   workflow, diagnosis, file, test, plan, or handoff.
3. Why token gets wasted: repeated context moving, vague goals, no durable
   project memory, no acceptance criteria.
4. How agent work becomes efficient: `AGENTS.md`, `CLAUDE.md`, handoffs, briefs,
   cache, reusable workflows, and project files.

### Demand Description Is The New Bottleneck

The beginner bottleneck is not only lack of programming skill. It is often the
ability to notice, summarize, and describe a real problem.

Many users can mechanically execute instructions, but they cannot yet say:

```text
我身边有什么问题？
这个问题卡在哪里？
我想让 AI 交付什么结果？
什么算做完？
有哪些环境限制？
```

This is why "AI can do anything" is not a helpful public explanation. The user
does not need infinite possibility first. They need a small, concrete problem
that already exists in their life or work.

Use the product-manager case as an internal anchor:

```text
Non-technical operator, no programming background.
Real workplace problem: multiple headless Windows PCs in stores needed central
view/control because existing remote tools were either single-screen, paid, or
fragile under poor network verification.
Action: used SorryCode to connect Codex, described the concrete workflow, and
iterated a small custom tool in three versions over about three hours.
Lesson: the important leap was not "learn programming"; it was finding a real
workflow pain, describing constraints, and letting the agent turn that into a
small tool.
```

Public version should avoid internal store details unless approved. The safe
teaching version:

```text
一个不会编程的人，发现身边有一个重复、具体、现成工具又不好用的问题。
他没有先学编程，而是把场景、限制、想要的界面和验收标准说清楚，让 AI 做了一个小工具。
```

This should shape the entrance article:

```text
AI 的门槛正在从「会不会写代码」，变成「会不会描述问题」。
```

The best beginner call-to-action is not "go build an app". It is:

```text
先找一个你每天都在忍的小问题。
写清楚：现在怎么做、哪里难受、你希望它变成什么样、什么算成功。
```

This also gives SorryCode a more concrete public explanation:

```text
SorryCode 不是让每个人变成程序员。
它是让不会编程的人，也能把自己说得清楚的问题，交给 agent 做成一个小工具、小流程或小文档。
```

### Beginner Translation

When a beginner asks "SorryCode 是干什么的", do not start from API, model,
gateway, token, cache, or agent runtime.

Start from capability:

```text
它帮你把 AI 从聊天窗口，变成能做事的工作台。
```

Then make it concrete:

```text
你可以让 AI 读项目、改文件、写文档、生成图片、排查问题、整理资料、搭工作流。
关键不是它能不能回答你一句话，而是它能不能接住一件事，并把结果留在你的文件里。
```

Avoid calling beginners stupid in public copy. The private diagnosis is that
beginners lack imagination and project context. The public framing should be:

```text
不是你不会用 AI，是大多数 AI 产品把它包装成了聊天框，所以你很难想象它还能做什么。
```

### Candidate Entrance Piece

Working title:

```text
你烧那么多 token，到底想让 AI 替你做什么？
```

Alternative hooks:

```text
你以为在和 AI 聊天，其实是在替它反复搬家
AI 不是聊天框，是工作台
别把 AI 用成一个昂贵的问答窗口
```

Core public promise:

```text
先别急着省 token。先想清楚：你用 AI 是为了得到一个回答，还是为了推进一件事？
```

This piece should precede the more tactical articles about `AGENTS.md`,
`CLAUDE.md`, cache, and context management.

## Traffic Reality

Current observation:

- `Codex API mode plugins` got the strongest traffic because it solved a visible
  tool problem: the plugin entry looked grey / missing, and the article gave a
  direct configuration path.
- Later mechanism-heavy pieces were stronger as education, but weaker as
  traffic assets. They taught useful concepts, yet the reader did not instantly
  know what they would get by reading.

Current adjustment:

- Lead with a concrete result, then explain the mechanism.
- Prefer titles that promise a usable artifact: checklist, command, decision
  tree, field guide, template, diagnostic flow, or before/after fix.
- Keep the contradiction sharp and visible. The reader should see what belief is
  being corrected before they click.
- Educational value still matters, but it should be packaged as something the
  reader can use immediately.

Bad direction:

```text
LLM 账单不是只有输入和输出
```

Better traffic direction:

```text
AI 明明没写几个字，为什么账单这么贵？
```

The second version starts from a visible contradiction: users judge cost by the
reply length, while model consumption is better understood through three
objective categories: input, output, and cache. It also leaves gateway
transparency for the next piece instead of mixing product billing with model
pricing.

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

3. `AI 明明没写几个字，为什么账单这么贵？` (next)
   - Conflict: users look at visible reply length, but model consumption comes from what the model reads, generates, and reuses.
   - Public lesson: model consumption maps back to input, output, and cache across web chat, API calls, and agent runtimes.
   - Reader takeaway: a three-part mental model for reading AI usage without confusing product billing, subscriptions, or gateways with model pricing.
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
