# Brief: 重生之我开中转站

Date: 2026-05-19

## Working Title

```text
重生之我开中转站：钱还没赚到，先学会通宵救火
```

## Audience

People who recently saw social posts claiming AI gateway / API reseller stations
are easy money, especially non-technical operators who may think this is a
simple arbitrage business: buy upstream, sell balance, collect spread.

Secondary audience: AI users who do not see the hidden maintenance work behind
a stable gateway, one-click install, beginner docs, and smooth model access.

## Reader Problem

The reader sees the outside story:

```text
中转站很赚钱
API 转发很简单
搭个站就能收钱
```

They do not see the inside work:

```text
upstream changes, model compatibility, SDK quirks, retries, billing, user
support, install environments, docs, monitoring, incidents, and all-night fixes.
```

## X Promise

Use a reverse reality-check:

```text
If you think opening an AI gateway is a money printer, first see what you will
be maintaining at 3 a.m.
```

The post should be useful even if the reader never clicks SorryCode:

- it should puncture the "easy gateway money" narrative;
- it should show concrete hidden work;
- it should warn non-technical people against being sold a fake-simple business;
- it should make users understand why stable gateways and beginner docs are real
  operational work.

## Conflict

Marketing says:

```text
开中转站 = 低成本收差价
```

Operator reality:

```text
开中转站 = 维护上游、协议、模型、账单、安装环境、用户支持和事故响应。
```

## SorryCode Action

Light CTA only after the public lesson. Possible anchors:

```text
https://sorrycode.com/docs/platform/tools-and-models
https://sorrycode.com/docs/start/first-step
```

Use a SorryCode link only if it naturally supports the article. This piece
should not sound like a product defense.

## Factual Boundary

Need SorryCode architecture / operations input before drafting final copy.

Use internal material as operational experience. Do not expose:

- upstream account names, keys, credentials, private routing, provider secrets;
- customer logs, request IDs, spend, or private usage;
- unreleased incident details that identify a provider or user;
- internal security or anti-abuse details that should not be public.

Allowed:

- anonymized operational categories;
- count-level or qualitative descriptions if approved;
- concrete but safe examples: "model schema changed", "install environment
  failed", "upstream response field changed", "users could not tell shell paths
  apart";
- public repository facts if independently verifiable.

## Public / Private Boundary

Allowed tone:

```text
营销号说它是收钱按钮，真正做过才知道它是一台 24 小时救火机器。
```

Avoid:

- naming specific marketing accounts;
- claiming all gateway operators are scammers;
- revealing SorryCode upstream details;
- making private workload numbers public without approval;
- turning the article into "SorryCode works hard" self-praise.

## Channels

- X Article / long post first.
- SorryCode doc only if it becomes a durable "what a gateway actually has to
  maintain" explainer.

## Image Need

Likely yes, but decide after draft.

Possible visual:

```text
Public side: money printer / easy dashboard.
Back side: incident board, logs, docs, install scripts, user support, model
changes, 3 a.m. deploy.
```

Avoid fake provider logos, fake dashboards, and private operational screenshots.
