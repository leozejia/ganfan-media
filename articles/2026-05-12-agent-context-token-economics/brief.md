# Brief

## Audience

Chinese users who are starting to use Codex, Claude Code, OpenClaw, Hermes Agent, ChatGPT, Claude, and other agent-style tools for long tasks: coding, writing, research, PPT, design, data cleanup, website edits, and document work.

This piece should not be framed as "ordinary people versus programmers." The shared problem is broader: anyone who lets an agent work across multiple turns now needs a basic sense of context economics.

## Reader Problem

Readers often treat context like free memory:

- paste every material into one session;
- keep a long thread running after the task direction changes;
- ask the agent to remember every failed attempt;
- assume high cache hit rate means the session is healthy;
- blame the model when the agent becomes expensive, slow, or confused.

## Core Conflict

Long context feels powerful, but every extra token competes for attention and can add cost. Useful context helps the agent continue. Stale context makes the agent drag old assumptions forward.

The core line:

```text
便宜，不等于划算。
```

Secondary line:

```text
上下文是资产，也是负债。
```

## X Promise

Teach one practical mental model:

- stable context should live in files;
- temporary context should be distilled or discarded;
- cache only makes repeated context cheaper, not cleaner;
- high cache hit rate is not the same as a healthy or economical session;
- long sessions should be managed by checkpoints, not blindly "养会话";
- when the task changes, start a clean session with a short handoff.

## SorryCode Action

Light CTA to SorryCode docs that help users move context out of chat history and into reusable files. Use the new context-management page as the public landing page for this X article because the article is cross-runtime, not Codex-only:

```text
https://sorrycode.com/docs/agent-infra/context-management
https://sorrycode.com/docs/agent-infra/overview
https://sorrycode.com/docs/agent-infra/agents-md
https://sorrycode.com/docs/agent-infra/design-md
https://sorrycode.com/docs/agent-infra/claude-md
https://sorrycode.com/docs/village/read-project
```

`AGENTS.md` and `CLAUDE.md` are relevant supporting docs, but the main CTA should stay on `context-management`; otherwise the article looks Codex-only or Claude-only.

## Factual Boundary

Verified from official / high-confidence sources on 2026-05-12:

- OpenAI prompt caching reuses exact prompt prefixes, starts at supported prompt lengths, and is designed to lower latency and input cost for repeated stable prefixes.
- OpenAI public pricing lists GPT-5.5 cached input at `$0.50 / 1M tokens` as of 2026-05-13.
- OpenAI conversation state docs say previous input tokens in a response chain are still billed as input tokens.
- OpenAI compaction docs present compaction as a way to reduce context size while preserving state needed for future turns.
- Codex reads layered `AGENTS.md` files and applies directory-specific instructions.
- Anthropic prompt caching distinguishes cache writes, cache reads, regular input, and output.
- Anthropic context engineering article explicitly treats context as a finite resource and discusses compaction, structured note-taking, and sub-agent architectures.
- Claude Code memory docs describe `CLAUDE.md` memory files and recommend reviewing memory as projects evolve.
- Chroma's context-rot report evaluates long-context behavior and finds performance can become less reliable as input length grows.

## Public Boundary

Safe to say:

- long context can improve continuity, but it is not free;
- cache hit rate is not a quality signal by itself;
- cached input can still create a large bill at high volume;
- prompt caching is a cost / latency optimization, not a semantic cleaning mechanism;
- stale context and dirty session state are context-management problems;
- stable instructions belong in durable project files more than chat history.

Avoid:

- saying longer context is always bad;
- saying cache causes dirty state;
- publishing billing screenshots, account-level logs, exact cost breakdowns, or private usage logs;
- publishing exact private SorryCode usage share, token totals, account logs, or screenshots;
- turning this article into proxy / model-mapping criticism;
- making unsupported claims about a specific provider or runtime.

## Channels

- X article / long post first.
- SorryCode-compatible long-form guide or future doc proposal second.

## Image Decision

No image required for first draft. If publishing as an X Article later, a big-character cover can work:

```text
上下文不是越多越好
```

Use `ganfan-article-illustrator` before generating any cover.
