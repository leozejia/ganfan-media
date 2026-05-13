# Sources

Access date unless noted: 2026-05-12.

## Official / High-Confidence Sources

### OpenAI Prompt Caching

- URL: `https://platform.openai.com/docs/guides/prompt-caching`
- Current canonical URL redirects to: `https://developers.openai.com/api/docs/guides/prompt-caching`
- Supports:
  - Prompt caching reduces latency and input-token cost for repeated prompt prefixes.
  - Cache hits require exact prefix matches.
  - Static content should be placed before dynamic content.
  - Caching is automatic for supported recent models and prompts at the documented threshold.
  - Cache hit information is visible through usage fields such as cached input tokens.
- Public-use boundary:
  - Use to explain "cache makes repeated stable context cheaper."
  - Do not claim cache improves semantic quality.

### OpenAI API Pricing

- URL: `https://openai.com/api/pricing/`
- Access date: 2026-05-13
- Supports:
  - GPT-5.5 cached input is listed at `$0.50 / 1M tokens`.
  - Cached input is cheaper than regular input, but not free.
- Public-use boundary:
  - Use only as current pricing context for the article's "cheap still costs money at scale" point.
  - If publishing later, re-check pricing because model prices can change.

### OpenAI Conversation State

- URL: `https://developers.openai.com/api/docs/guides/conversation-state`
- Supports:
  - API requests can manage conversation state manually by sending prior messages.
  - Responses API supports stateful patterns such as conversation objects and `previous_response_id`.
  - The docs state that even with `previous_response_id`, previous input tokens in the chain are billed as input tokens.
  - Context windows include input, output, and reasoning tokens.
- Public-use boundary:
  - Use to support "long-running agent sessions are not free just because the UI hides the transcript."

### OpenAI Compaction

- URL: `https://developers.openai.com/api/docs/guides/compaction`
- Supports:
  - Compaction reduces context size while preserving state needed for future turns.
  - Server-side and standalone compaction are both documented.
  - Compaction is presented as a way to balance quality, cost, and latency as conversations grow.
- Public-use boundary:
  - Use to support "distill checkpoints rather than carrying the whole history forever."

### OpenAI Codex AGENTS.md

- URL: `https://developers.openai.com/codex/guides/agents-md`
- Supports:
  - Codex reads `AGENTS.md` before work.
  - Codex layers global guidance, repository guidance, and nested directory guidance.
  - Files closer to the current directory override broader guidance.
  - Codex skips empty files and has a project instruction byte limit with configuration knobs.
- Public-use boundary:
  - Use to support "stable project context belongs in files, not repeated chat prompts."

### Anthropic Prompt Caching

- URL: `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching`
- Current canonical URL redirects to: `https://platform.claude.com/docs/en/build-with-claude/prompt-caching`
- Supports:
  - Prompt caching reduces processing time and costs for repetitive tasks or prompts with consistent elements.
  - Anthropic supports automatic caching and explicit cache breakpoints.
  - Prompt caching references prompt prefixes including tools, system, and messages.
  - Pricing distinguishes cache writes, cache reads / hits, base input, and output.
  - Static content should be placed before dynamic content.
  - Changing content before a cache breakpoint changes the hash and can miss cache.
- Public-use boundary:
  - Use to explain why "stable prefix" and "moving dynamic content later" matter.

### Anthropic Effective Context Engineering for AI Agents

- URL: `https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents`
- Published: 2025-09-29
- Supports:
  - Context is a finite resource for AI agents.
  - Agent work has moved from prompt engineering toward context engineering.
  - The useful engineering goal is the smallest high-signal set of tokens for the desired outcome.
  - Long-horizon tasks need techniques such as compaction, structured note-taking, and sub-agent architectures.
  - Just-in-time context retrieval can be better than loading everything up front.
- Public-use boundary:
  - Strong source for the article's central frame.
  - Avoid overclaiming that every model fails the same way.

### Claude Code Memory

- URL: `https://docs.claude.com/en/docs/claude-code/memory`
- Current canonical URL redirects to: `https://code.claude.com/docs/en/memory`
- Supports:
  - Claude Code uses memory files such as `CLAUDE.md` at enterprise, project, user, and local project levels.
  - Memory files are hierarchical and can be loaded into context.
  - Project memories can record architecture, coding standards, and common workflows.
  - Anthropic recommends specificity, structure, and periodic review.
- Public-use boundary:
  - Use to support "persistent context needs maintenance, not endless accumulation."

### Chroma Context Rot

- URL: `https://www.trychroma.com/research/context-rot`
- Published: 2025-07-14
- Supports:
  - The report evaluates 18 LLMs and finds model behavior can become less reliable as input length grows.
  - The report distinguishes focused prompts from full prompts containing large amounts of irrelevant context.
  - In LongMemEval-style tests, adding irrelevant history forces the model to retrieve and reason at the same time, hurting reliability.
- Public-use boundary:
  - Use as research support for "more context can reduce focus."
  - Present as one research report, not as universal law.

## Local Sources

### Operator Observation: SorryCode Usage

- Source: user-provided operating note on 2026-05-13.
- Supports:
  - The author used Codex heavily while building and operating SorryCode.
  - Long Codex sessions can preserve enough detail to make "just keep the session alive" feel attractive.
  - The author's own usage showed very high cache hit rates, but the bill still became meaningful because cached input still has a price at scale.
  - The author now asks agents to produce a handoff before releasing a long session.
- Public-use boundary:
  - Safe to use as first-person anecdote.
  - Avoid publishing precise private platform usage shares, exact internal token totals, account IDs, provider logs, screenshots, or full billing details.

### SorryCode Context Management

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/context-management/zh.md`
- Public URL target: `https://sorrycode.com/docs/agent-infra/context-management`
- Supports:
  - SorryCode docs now explain long sessions, cache, context files, and handoffs as separate things.
  - The doc gives a copy-ready handoff prompt and a default rule for stable context versus temporary evidence.
- Fit note:
  - Primary CTA for this X article because the piece is cross-runtime and not limited to Codex or Claude Code.

### SorryCode AGENTS.md

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/agents-md/zh.md`
- Public URL target: `https://sorrycode.com/docs/agent-infra/agents-md`
- Supports:
  - SorryCode docs explain `AGENTS.md` as Codex's project instruction file.
  - The doc warns not to put chat history, one-off tasks, stale paths, secrets, or abandoned conclusions into `AGENTS.md`.
- Fit note:
  - Useful supporting link for Codex users, but too narrow as the main CTA.

### SorryCode CLAUDE.md

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/claude-md/zh.md`
- Public URL target: `https://sorrycode.com/docs/agent-infra/claude-md`
- Supports:
  - SorryCode docs explain `CLAUDE.md` as Claude Code's memory / instruction file.
  - The doc says to maintain durable project facts and avoid temporary session state, one-off tasks, stale commands, long meeting notes, and secrets.
- Fit note:
  - Useful supporting link for Claude Code users, but too narrow as the main CTA.

### SorryCode Agent Infrastructure Overview

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/overview/zh.md`
- Public URL target: `https://sorrycode.com/docs/agent-infra/overview`
- Supports:
  - Overview now routes users by problem: long sessions, Codex rules, Claude Code memory, DESIGN.md, MCP, and Skills.
- Fit note:
  - Secondary landing page for readers who want the broader agent infrastructure map.

### SorryCode DESIGN.md

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/agent-infra/design-md/zh.md`
- Public URL target: `https://sorrycode.com/docs/agent-infra/design-md`
- Supports:
  - SorryCode docs position `DESIGN.md` as a reusable design context file.
  - It explains the difference between task skills and project visual context.

### SorryCode Read Project

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/village/read-project/zh.md`
- Public URL target: `https://sorrycode.com/docs/village/read-project`
- Supports:
  - Beginner path: ask an agent to read a project and identify entry points before editing.

### SorryCode Runtime Models

- Local path: `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/platform/tools-and-models/zh.md`
- Public URL target: `https://sorrycode.com/docs/platform/tools-and-models`
- Supports:
  - Existing SorryCode docs already separate models, agent runtimes, skills, MCP, and SorryCode.
  - Existing docs mention that runtime / model mismatch can affect cache and usage.

## X / Public Discussion Notes

These are discussion-context notes, not hard factual anchors.

### Tim Scullin on AGENTS.md

- URL: `https://x.com/timscullin/status/2053670331278381195`
- Observed via Chrome / Computer Use on 2026-05-12.
- Notes:
  - Public X post links to OpenAI's AGENTS.md docs.
  - The post highlights progressive context exposure through stacked `AGENTS.md` files in subdirectories.
- Use:
  - Confirms current X discussion around AGENTS.md is close to the article's "stable context in files" angle.

### Chinese X AGENTS.md discussion

- `https://x.com/IWVRsaOuHo2dFxo/status/2053515949278658610`
  - Notes: Chinese post about many users knowing `AGENTS.md` matters but not knowing how to write it.
- `https://x.com/biggor888/status/2051492827234799621`
  - Notes: Community practice of pairing `AGENTS.md / CLAUDE.md` with a task-state file such as `TASK.md`.
- `https://x.com/richardchang/status/2053706211443564923`
  - Notes: Community reply describing global and project-level `AGENTS.md` usage and periodic reflection.
- Use:
  - Topic pulse only. Do not cite as official behavior.

### X timeline signal from "中转站优质信息源"

- Observed via Chrome / Computer Use on 2026-05-12.
- Notes:
  - Current Chinese AI-tool timeline has active interest in Codex Chrome extension, AGENTS.md, Claude Code, API keys, and agent workflows.
  - This supports the distribution decision: article should be tutorial-first and beginner-readable, but can assume readers have seen agent tools named in public feeds.

## Verified Facts

- Context is not just chat text. It can include system instructions, tools, messages, files, retrieved snippets, logs, screenshots, and compacted summaries.
- Prompt caching is a cost and latency optimization for repeated prompt prefixes. It does not decide whether the repeated content is worth keeping.
- Cache hit rate is not a quality signal by itself.
- A long session can preserve useful continuity and stale assumptions at the same time.
- Stable, reusable context belongs in durable files when possible.
- Temporary evidence should either be distilled into a short checkpoint or discarded after the phase ends.
- For long tasks, compaction, structured notes, and focused sub-tasks are legitimate context-management tools.

## Claims to Avoid

- "More context is always worse."
- "Cache causes dirty sessions."
- "A 90% cache hit rate means the agent is healthy."
- "Long-context models have solved context management."
- "This only matters for coding."
- "This is only for ordinary users, not professionals."
- "X posts prove the technical facts."
