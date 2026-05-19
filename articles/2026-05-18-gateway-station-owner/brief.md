# Brief: 重生之我当中转站站长

Date: 2026-05-18

## Working Title

```text
重生之我当中转站站长：我会这样赚你的糊涂钱
```

Backup title:

```text
如果我是中转站站长，我会在哪 5 个地方赚你的糊涂钱
```

## Audience

AI agent users who use OpenAI-compatible / Anthropic-compatible gateways,
model groups, reseller platforms, or shared-balance API platforms, but cannot
tell what upstream model, route, cache behavior, retry policy, or usage
breakdown they are actually paying for.

## Reader Problem

The reader sees a familiar model name, a Claude / GPT group, or a compatible API
endpoint and assumes the platform is transparent.

The invisible problem is that model aliases, routing, fallback, cache behavior,
and billing breakdown can be hidden behind a friendly product label.

## X Promise

Use a reverse-angle story:

```text
If I were a bad gateway operator, where would I hide the money?
```

Then start from what the user sees: familiar model name, official-looking group,
compatible endpoint, balance decrease, failed request, changing speed/quality.
Only after that, explain what might be hidden underneath.

The post should be sharp enough to travel, but still independently useful:
readers should leave with a checklist for judging any gateway before charging
more balance.

## Conflict

Users think they bought a model.

Often they bought access to a routing layer.

That routing layer may be honest and useful, but if it does not show model
mapping, usage breakdown, cache behavior, retry/fallback policy, and pricing
logic, the user cannot audit cost or quality.

## Frame

Use a villain confession style, but keep the public claim structural.

Allowed style:

```text
我不会告诉你 “Claude 分组”只是入口名。
我也不会告诉你这次到底走了哪个上游。
反正你看到的是一个熟悉的名字，扣的是你的余额。
```

Boundary:

```text
This is a structural risk map, not an accusation against a named provider.
```

## SorryCode Action

Light CTA to a beginner-first guide about separating tool, model, runtime,
gateway, and billing layers.

Current anchor:

```text
https://sorrycode.com/docs/platform/tools-and-models
```

If a more specific gateway-transparency page is created later, prefer that.

## Factual Boundary

Need engineer input before drafting final claims.

Use official docs / public evidence for:

- OpenAI-compatible and Anthropic-compatible protocol language;
- provider usage fields where relevant;
- prompt caching and usage breakdown terms;
- any named model or provider behavior.

Internal engineer input may explain possible architecture, but must be recorded
as internal implementation perspective unless it is independently public.

The public article should not use backend terms as the main section titles.
Terms such as `model alias`, `routing group`, `fallback`, `cache passthrough`,
and `billing ledger` are support material. The visible structure should be user
symptoms and user questions.

Do not claim a named platform substitutes models, hides fallback, or overcharges
unless public evidence exists.

## Public / Private Boundary

Allowed:

- structural explanation of model alias, model mapping, routing, fallback,
  cache, usage breakdown, retry, and pricing multipliers;
- anonymized engineering perspective on what a gateway can technically hide;
- user checklist language: "ask whether they show X."

Avoid:

- naming GLM / MiniMax / Claude / GPT as if one is "fake" or inferior;
- saying a named provider used one model to impersonate another without proof;
- exposing internal SorryCode routing, private group names, account state,
  upstream credentials, customer usage, or unpublished incident details;
- turning the article into product sales copy.

## Channels

- X Article / long post first.
- SorryCode standalone doc only if this becomes a durable gateway-transparency
  checklist.

## Image Need

Likely yes.

The cover should carry the reverse-angle premise:

```text
用户看到模型名；站长看到路由、倍率、缓存、重试、fallback。
```

Do not use named provider logos or fake dashboards. If visualized, use a
fictional switchboard / receipt / mask metaphor.
