# Sources

## Official Sources

### OpenAI Prompt Caching

- URL: `https://platform.openai.com/docs/guides/prompt-caching`
- Access date: 2026-05-11
- Supports:
  - Prompt caching works automatically for supported recent models.
  - Cache hits require exact prefix matches.
  - Static content should be placed before dynamic content.
  - Caching is available for prompts containing 1024 tokens or more.
  - Usage exposes `cached_tokens` under `usage.prompt_tokens_details`.
  - Messages, images, tools, and structured output schemas can be part of cached content when they are identical.
  - Prompt caching does not influence output token generation or the final API response. The same prompt produces the same response whether cached or processed from scratch.

### OpenAI API Pricing

- URL: `https://openai.com/api/pricing/`
- Access date: 2026-05-11
- Supports:
  - Current public pricing separates input, cached input, and output tokens.
  - For current flagship text models, output token unit price is higher than input token unit price, while cached input is cheaper than base input.

### OpenAI Prompt vs Completion Tokens

- URL: `https://help.openai.com/en/articles/7127987-what-is-the-difference-between-prompt-tokens-and-completion-tokens`
- Access date: 2026-05-11
- Supports:
  - Prompt tokens are input tokens.
  - Completion tokens are generated output tokens.

### Anthropic Prompt Caching

- URL: `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching`
- Access date: 2026-05-11
- Supports:
  - Prompt caching reduces processing time and cost for repetitive tasks or prompts with consistent elements.
  - Anthropic prompt caching can use `cache_control`.
  - Default cache lifetime is 5 minutes; 1-hour cache exists with additional cost.
  - Usage fields include `cache_creation_input_tokens`, `cache_read_input_tokens`, `input_tokens`, and `output_tokens`.
  - Total input tokens can be understood as cache read + cache creation + regular input tokens.
  - Pricing distinguishes base input tokens, cache writes, cache hits / reads, and output tokens.
  - Prompt caching has no effect on output token generation; responses are identical to non-cached processing.
  - Cache invalidation can happen when tools, system messages, message blocks, images, tool choice, or thinking parameters change.
  - Anthropic recommends caching stable reusable content and analyzing cache hit rates.

### Anthropic API Pricing

- URL: `https://platform.claude.com/docs/en/about-claude/pricing`
- Access date: 2026-05-11
- Supports:
  - Current public pricing separates base input tokens, cache writes, cache hits / refreshes, and output tokens.
  - Output token unit price is higher than base input token unit price for listed Claude models.
  - Cache reads are much cheaper than base input, while cache writes cost more than base input.

## Local Sources

- `/Users/zejiawu/Projects/Project-Atlas/labs/sorrycode-content/articles/platform/tools-and-models/zh.md`
- Access date: 2026-05-11
- Supports:
  - Current SorryCode docs already teach the difference between model, agent runtime, skills, MCP, and SorryCode.
  - Existing docs already warn that `Codex + GPT` and `Claude Code + Claude` are the safer beginner defaults.
  - Existing docs mention cache and API usage can become inefficient when models are routed through unsuitable runtimes.

## Public Context Checks

- OpenAI Codex docs: `https://developers.openai.com/codex/`
- OpenAI Codex app docs: `https://developers.openai.com/codex/app/`
- Anthropic Claude Code docs: `https://docs.claude.com/en/docs/claude-code/overview`
- Access date: 2026-05-11
- Supports:
  - Codex is an active OpenAI agent coding product with CLI, IDE extension, desktop app, and cloud task paths.
  - Claude Code is also an active agent coding product.
  - Public drafts can recommend `GPT + Codex` as the default GPT path, but should not claim as a hard public fact that Codex has definitively surpassed Claude Code in adoption unless a cited metric is provided.

## Internal Observations

- User-provided observation: a user routed GPT through Claude Code via a proxy / bridge and reportedly spent about USD 70 in one day while visible progress and output were limited.
- Public use: anonymized hook only.
- Do not publish exact amount as a measured benchmark. Use "几十美刀" if needed.
- Do not publish provider name, account, request logs, screenshots, or private usage details.

## Verified Facts

- Runtime, protocol, model, cache, and billing are separate layers.
- A protocol-compatible endpoint can accept one API shape and route to another upstream or model.
- "The model returned text" only proves the request path can produce a response. It does not prove model authenticity, cache efficiency, or fair pricing.
- Cache efficiency depends on stable reusable prompt prefixes and provider-specific implementation details.
- Usage breakdown is essential for diagnosing high cost.
- Output tokens often have a higher unit price than input tokens, but total request cost depends on both unit price and token volume.
- Agent workflows can become expensive when large input context is repeatedly sent without effective cache hits.
- The media recommendation can say "GPT models should default to Codex for beginner coding workflows" as an editorial stance grounded in product fit, not as a measured adoption claim.
- Prompt caching is a cost/latency optimization for repeated prompt prefixes. It does not make poor or stale context semantically better.
- Dirty session state is a context-management problem, not a prompt-cache side effect. Long sessions can preserve both valuable stable context and stale or misleading history.

## Unverified / Avoid

- Do not claim a specific provider substituted a model unless public evidence is available.
- Do not claim all Claude-Code-to-GPT setups are bad.
- Do not claim all proxy bridges destroy caching.
- Do not claim a specific user cost came solely from cache misses without logs.
- Do not claim OpenAI or Anthropic pricing terms automatically apply unchanged to third-party proxy billing.
