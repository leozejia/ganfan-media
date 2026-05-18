# Brief: AI 明明没写几个字，为什么账单这么贵？

Date: 2026-05-16

## Working Title

```text
AI 明明没写几个字，为什么账单这么贵？
```

## Audience

AI agent users who have started using Codex, Claude Code, OpenAI-compatible
gateways, Anthropic-compatible gateways, or model dashboards, but still read
cost as "the model wrote a lot" or "the model is expensive."

## Reader Problem

The reader sees a bill or usage dashboard and does not know which part actually
made the request expensive. They may judge cost by visible reply length, while
model consumption is usually better understood as input, output, and cache.

## X Promise

Give the reader a simple, objective model for AI usage cost:

```text
input: what the model read
output: what the model generated
cache: what was reused or written for reuse
```

Then show how web chat, API calls, and agent runtimes trigger those three
categories differently.

The article should be useful even if the reader never clicks SorryCode.

## Conflict

Most people stare at the visible reply because output is visible.

Agent bills are often shaped by the invisible part: what the runtime reads for
the model, what it asks the model to generate, and whether stable context can be
reused through cache.

## SorryCode Action

Light CTA to a SorryCode guide that helps users understand model/runtime/cost
layers. Tentative anchor:

```text
https://sorrycode.com/docs/platform/tools-and-models
```

If a more specific billing page exists or is created later, prefer that.

## Factual Boundary

Use official docs for:

- OpenAI usage fields and prompt caching language;
- Anthropic usage fields and prompt caching language;
- current public pricing/caching wording only when a specific model is named.

Do not publish exact internal spend, account IDs, request IDs, provider secrets,
private dashboards, or unverified claims about any named provider.

## Public / Private Boundary

Allowed:

- structural explanation of input / output / cache;
- anonymized operator observation that usage dashboards can expose surprising
  cost distribution;
- short explanation that product billing may be subscription, credit, or API,
  while the underlying model resource still maps back to input / output / cache.

Avoid:

- accusing a named gateway of substitution or hidden pricing without public
  proof;
- screenshots containing private account or usage data;
- exact private spend unless the operator explicitly approves a public version.

## Channels

- X Article / long post first.
- SorryCode long-form or rewrite note second if the source research shows a
  durable public docs gap.

## Image Need

Likely yes.

The cover should make the reader see the wrong focus: a big visible `output`
token pile beside hidden cost compartments.

Use `ganfan-article-illustrator` and Open Visual Grammar. Candidate patterns:

- `big-character-poster` if the cover needs a hard public warning;
- `narrative-journal-infographic` if the cover should feel like a readable cost
  breakdown;
- `pixel-retro` if the article leans into agent/runtime cost as a game-system
  metaphor.
