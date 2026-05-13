# Brief

## Audience

Chinese AI tool users who use Codex, Claude Code, OpenAI-compatible endpoints, Anthropic-compatible endpoints, or reseller / proxy API services, but do not yet understand runtime / protocol / model / cache / billing boundaries.

## Reader Problem

The user sees that Claude Code can call a GPT model through an Anthropic-compatible proxy and assumes that "it works" means "it is a good default setup." They may later see high spend, poor cache efficiency, or opaque usage records without understanding where the cost came from.

## Core Conflict

Claude Code can run GPT through a proxy bridge, but "can run" is not the same as "cost-efficient." Protocol bridging can hide model mapping, cache behavior, and billing structure.

## X Promise

Teach readers to separate five layers:

1. runtime;
2. protocol;
3. model;
4. cache;
5. billing / proxy pricing.

Give one practical rule: if you run GPT inside a Claude-oriented runtime through a bridge, treat it as an advanced setup and watch usage breakdown, especially input/cache fields, not only output tokens.

## SorryCode Action

Create a long-form explainer that can later inform a rewrite or extension of:

```text
/docs/platform/tools-and-models
```

Do not edit `sorrycode-content` in this media task unless explicitly requested.

## Factual Boundary

Verified from official docs on 2026-05-11:

- OpenAI prompt caching works automatically for supported models and exposes `cached_tokens` in `usage.prompt_tokens_details`.
- OpenAI cache hits require exact prefix matches. Static content should be placed before dynamic content.
- OpenAI caching is available for prompts containing 1024 tokens or more.
- Anthropic prompt caching can be enabled with `cache_control`.
- Anthropic usage exposes `cache_creation_input_tokens`, `cache_read_input_tokens`, `input_tokens`, and `output_tokens`.
- Anthropic documents cache write, cache read, base input, and output token pricing categories.

## Internal Observation Boundary

The user provided an internal anecdote: a user routed GPT through Claude Code via a proxy bridge and reportedly spent about USD 70 in one day with limited visible progress. This can shape the hook, but public drafts should anonymize it:

```text
我见过有人一天烧掉几十美刀，产出却不多。
```

Do not publish account details, provider name, request IDs, exact logs, screenshots, or private usage records.

## Public Boundary

Safe to say:

- compatible protocol does not guarantee official upstream model;
- proxies can map model aliases, change price multipliers, or hide usage details;
- users should ask for usage breakdown and model mapping transparency.

Do not say:

- any named provider is substituting models without public proof;
- all protocol bridging is bad;
- Claude Code cannot run GPT;
- OpenAI or Anthropic caching always applies through third-party bridges.

## Channels

- X article / long post.
- SorryCode-compatible long-form explainer or rewrite note.

## Image Decision

X Article cover generated for publishing review:

```text
能跑 GPT
不等于划算
```

Delivery asset: `assets/cover.png` at `1500x600`.
