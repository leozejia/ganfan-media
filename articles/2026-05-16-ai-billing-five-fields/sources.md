# Sources: 看懂 AI 账单的 5 个字段

Date: 2026-05-16

Status: source research needed before drafting.

## Source Research Checklist

Official sources to collect before writing `x.md`:

- OpenAI usage / token categories.
- OpenAI prompt caching docs and cached-token pricing wording.
- Anthropic usage fields, including input, output, cache creation/write, and
  cache read wording.
- Anthropic prompt caching docs and pricing wording.
- Any SorryCode public docs currently explaining tools, models, runtimes,
  gateways, or usage breakdowns.

## Internal Observations

Internal observations can shape the hook, but must stay anonymized unless the
operator explicitly approves a concrete public claim.

Potential public-safe observation:

```text
When you start reading usage breakdowns, the expensive part is not always the
visible output. Agent work can spend heavily on repeated context, cache writes,
or gateway-level pricing rules.
```

## Claims To Avoid

- Do not say output is never expensive.
- Do not say cached tokens are free.
- Do not say cache hit rate means a session is healthy.
- Do not say a named gateway hides model substitution unless there is public
  proof.
- Do not publish private dashboard screenshots.

## Draft Direction

The article should produce a practical checklist:

```text
1. output: what the model wrote
2. input: what the model had to read
3. cache creation: what had to be stored for reuse
4. cache read / cached tokens: what was reused, often cheaper but not free
5. multiplier / fallback: what the platform or gateway may add on top
```

Verify the exact naming against official docs before using these terms as
public facts.
