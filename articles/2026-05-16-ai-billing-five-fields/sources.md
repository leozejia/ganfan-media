# Sources: AI 明明没写几个字，为什么账单这么贵？

Date: 2026-05-16
Source check updated: 2026-05-18

Status: official OpenAI / Anthropic billing and usage facts verified. X draft is
source-reviewed for preview / manual publishing.

## Publication Review 2026-05-18

Reviewed current `x.md` against the source boundary.

Result:

- keeps the public model to `input / output / cache`;
- explains reasoning / thinking tokens under output, not as a fourth pricing
  bucket;
- says cache is cheaper / reusable, not free;
- separates product billing / gateway transparency from this article;
- uses a light SorryCode CTA after the standalone lesson.

No factual blocker found for manual X Article publishing from the existing
preview, assuming the operator approves the preview UI and cover.

## Hook Judgment

`output tokens` is an official and common API/pricing term, but it is not the
best beginner hook in Chinese. The stronger hook is visible-output surprise:

For developer audiences, "output tokens" is recognizable. For broader agent
users, the more natural pain is:

```text
它明明没写多少字，为什么账单这么贵？
```

Working title:

```text
AI 明明没写几个字，为什么账单这么贵？
```

Reason: it states the visible contradiction in beginner language. The article
should explain the three objective model-consumption categories instead of
splitting model pricing into non-standard buckets.

## Official Sources

### Tokenization basics

Sources:

```text
https://platform.openai.com/docs/introduction
https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
https://platform.claude.com/docs/en/api/messages-count-tokens
https://docs.anthropic.com/en/docs/build-with-claude/token-counting
```

Accessed: 2026-05-17.

Verified facts:

- Models process text in chunks called tokens.
- Tokens are not identical to words or characters.
- OpenAI's rough English rule of thumb is `1 token ~= 4 characters` or about
  `0.75 words`.
- Spaces, punctuation, partial words, code symbols, and non-English text can
  change token counts.
- Both input and output tokens affect API cost and limits.
- Chat / agent calls can include behind-the-scenes structure beyond the visible
  user text.
- Anthropic provides a token counting endpoint that can count messages,
  including system prompts, tools, images, and documents, without generating a
  response.

Public-safe wording:

```text
token 不是字数，也不是词数。它是模型内部处理文本的小片段；你看到的回复只是 output tokens，账单还会看输入、缓存和工具等隐藏部分。
```

### OpenAI prompt caching

Source:

```text
https://developers.openai.com/api/docs/guides/prompt-caching
```

Accessed: 2026-05-17.

Verified facts:

- Prompt caching is automatic on recent OpenAI models that support it.
- Cache hits are represented in API usage under
  `usage.prompt_tokens_details.cached_tokens`.
- Requests below the caching threshold still show `cached_tokens`, but the value
  is zero.
- Caching can reduce input-token cost and latency, but it does not change output
  generation.
- Cache hits require repeated / matching prompt prefixes. Stable prompt material
  should come before changing user-specific material.
- Cached tokens are not free. They are a discounted input category.

Public-safe wording:

```text
在 OpenAI 的账单里，cached input / cached tokens 不是免费额度，而是命中缓存后的输入计费层。
```

Avoid:

```text
OpenAI 缓存命中就不用付钱。
```

### OpenAI pricing

Source:

```text
https://openai.com/api/pricing/
```

Accessed: 2026-05-17.

Verified facts from the current public pricing page:

- GPT-5.5 standard text price is:
  - input: `$5.00 / 1M tokens`
  - cached input: `$0.50 / 1M tokens`
  - output: `$30.00 / 1M tokens`
- GPT-5.4 standard text price is:
  - input: `$2.50 / 1M tokens`
  - cached input: `$0.25 / 1M tokens`
  - output: `$15.00 / 1M tokens`
- Output is more expensive per token than input for these models.
- A bill can still be shaped heavily by input or cached input if the volume is
  large enough.

Public-safe wording:

```text
output 单价通常更贵，但 agent 工作流里，真正吓人的可能是输入和缓存读写的体量。
```

Avoid:

```text
AI 贵不是贵在 output。
```

That sentence is too broad. A safer version is:

```text
别只按输出长短判断成本。output 单价贵，但账单总额还取决于输入、缓存和调用方式。
```

### OpenAI organization usage / costs API

Source:

```text
https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/usage
```

Accessed: 2026-05-17.

Verified facts:

- OpenAI has organization usage endpoints for completions and a costs endpoint.
- The completions usage object includes aggregated text input tokens and output
  tokens.
- The input-token field includes cached tokens in the aggregate.
- The costs endpoint returns monetary cost objects.

Draft implication:

OpenAI dashboards / API usage views may expose aggregates and cost objects, but
article wording should not imply every user sees the same detailed breakdown in
every UI.

### Anthropic prompt caching

Source:

```text
https://platform.claude.com/docs/en/build-with-claude/prompt-caching
```

Accessed: 2026-05-17.

Verified facts:

- Anthropic exposes cache performance fields in the response `usage` object:
  - `cache_creation_input_tokens`
  - `cache_read_input_tokens`
  - `input_tokens`
  - `output_tokens`
- Anthropic explicitly states total input tokens can be understood as:

```text
cache_read_input_tokens + cache_creation_input_tokens + input_tokens
```

- In Anthropic's usage model, `input_tokens` can mean the tokens after the last
  cache breakpoint, not all input text sent by the user.
- Cache reads, cache writes, and uncached input are different billing concepts.
- Prompt caching does not change output generation.

Public-safe wording:

```text
在 Claude API 里，input_tokens 不一定等于“你发给模型的全部输入”。用了缓存后，还要看 cache_creation_input_tokens 和 cache_read_input_tokens。
```

Avoid:

```text
input_tokens 就是你这次发的全部上下文。
```

### Anthropic pricing

Source:

```text
https://platform.claude.com/docs/en/about-claude/pricing
```

Accessed: 2026-05-17.

Verified facts from the current public pricing page:

- The pricing table separates:
  - base input tokens
  - 5-minute cache writes
  - 1-hour cache writes
  - cache hits / refreshes
  - output tokens
- Anthropic's prompt caching multipliers are:
  - 5-minute cache write: `1.25x` base input price
  - 1-hour cache write: `2x` base input price
  - cache read / hit: `0.1x` base input price
- Cache write tokens are charged when content is first stored.
- Cache read tokens are charged when later requests retrieve cached content.
- Some service choices can add multipliers, such as data residency or fast mode
  where applicable.
- Tools may add token usage or extra usage-based charges.

Public-safe wording:

```text
缓存不是一个字段，而是至少两件事：写入缓存和读取缓存。写入可能比普通 input 更贵，读取通常更便宜，但仍然计费。
```

### Anthropic usage and cost API

Source:

```text
https://platform.claude.com/docs/en/manage-claude/usage-cost-api
```

Accessed: 2026-05-17.

Verified facts:

- Anthropic's Usage & Cost Admin API can report historical organization-level
  usage and costs.
- Usage tracking can measure uncached input, cached input, cache creation, and
  output tokens.
- Cost reporting can group costs by workspace or description and can include
  parsed fields such as model and inference geography.

Draft implication:

It is reasonable to tell readers to look for a usage breakdown, not just a final
bill number.

### Reasoning / thinking tokens

Sources:

```text
https://platform.openai.com/docs/guides/reasoning
https://platform.claude.com/docs/en/build-with-claude/extended-thinking
```

Accessed: 2026-05-17.

Verified facts:

- OpenAI reasoning models can use reasoning tokens that are not visible in the
  final response.
- OpenAI exposes reasoning token counts under
  `usage.output_tokens_details.reasoning_tokens`.
- OpenAI states reasoning tokens are billed as output tokens.
- Claude extended thinking can make the billed output token count differ from
  the visible token count.
- Anthropic states users are billed for the full thinking process, not only the
  visible thinking summary or final visible response.

Draft implication:

Reasoning / thinking tokens explain the title contradiction, but they should be
discussed under output. They are not a separate fourth pricing category.

Public-safe wording:

```text
如果你用推理 / thinking 模型，还要看 reasoning / thinking tokens。它们可能不完整显示在回复里，但会计入 output 侧成本。
```

## Internal Observations

Internal observations can shape the hook, but must stay anonymized unless the
operator explicitly approves a concrete public claim.

Potential public-safe observation:

```text
When you start reading usage breakdowns, the expensive part is not always the
visible output. Agent work can spend heavily on repeated context, cache reads,
cache writes, or hidden reasoning / thinking tokens.
```

Better public hook in Chinese:

```text
我以前也按“它写了多少字”判断成本。后来一看 usage breakdown，发现账单真正的大头不一定在可见回复里。
```

## Claims To Avoid

- Do not say output is never expensive.
- Do not say input is always more expensive than output.
- Do not say cached tokens are free.
- Do not say cache hit rate means a session is healthy.
- Do not say high cache read volume is automatically good or bad.
- Do not say a named gateway hides model substitution unless there is public
  proof.
- Do not publish private dashboard screenshots.
- Do not imply OpenAI and Anthropic use identical cache semantics.
- Do not present non-standard buckets as a standard pricing model.

## Draft Direction

The article should use three objective model-consumption categories:

```text
1. input: what the model had to read
2. output: what the model generated
3. cache: what was reused or written for reuse
```

Then explain how different usage environments trigger those categories:

```text
web chat: visible user message plus hidden history/files/tools/system context
API call: prompt/messages/tools/files in, response out
agent runtime: repeated model calls, file reads, command results, tool loops, context reuse
```

Reasoning / thinking tokens should be explained under output, not as a fourth
pricing category.

## Article Spine

Beginner-first flow:

1. Start with the felt contradiction: "AI 明明没写几个字，为什么账单这么贵？"
2. Explain token is not word count.
3. Explain the three objective consumption categories: input / output / cache.
4. Show how web, API, and agent runtime map to those categories.
5. Keep gateway / platform transparency out of this article:

```text
中转站、fallback、模型别名、平台加价是另一篇。这里先讲底层模型消耗如何落回 input / output / cache。
```

This can lightly point to SorryCode without making the post a SorryCode ad.
