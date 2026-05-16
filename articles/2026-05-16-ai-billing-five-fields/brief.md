# Brief: 看懂 AI 账单的 5 个字段

Date: 2026-05-16

## Working Title

```text
看懂 AI 账单的 5 个字段：别再只盯 output tokens
```

## Audience

AI agent users who have started using Codex, Claude Code, OpenAI-compatible
gateways, Anthropic-compatible gateways, or model dashboards, but still read
cost as "the model wrote a lot" or "the model is expensive."

## Reader Problem

The reader sees a bill or usage dashboard and does not know which part actually
made the request expensive. They may blame output tokens, while the cost can be
spread across input, cache creation, cache read, provider multiplier, or
fallback behavior.

## X Promise

Give the reader a five-field checklist for reading an AI agent bill:

```text
output
input
cache creation
cache read / cached tokens
provider multiplier / fallback
```

The article should be useful even if the reader never clicks SorryCode.

## Conflict

Most people stare at output tokens because output is visible.

Agent bills are often shaped by the invisible part: the context that gets read,
whether stable context hits cache, whether new cache has to be created, and
whether the gateway adds pricing or model-routing rules the user cannot see.

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

- structural explanation of billing fields;
- anonymized operator observation that usage dashboards can expose surprising
  cost distribution;
- general due-diligence questions for gateways.

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
