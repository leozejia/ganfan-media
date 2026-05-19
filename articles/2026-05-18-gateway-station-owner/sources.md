# Sources: 重生之我当中转站站长

Date: 2026-05-18

Status: engineering input received. Needs public/private boundary review before
final drafting.

## Engineering Input Request

Send this to the SorryCode engineer:

```text
请从中转站 / compatible gateway 的工程实现角度，列出 5-8 个“用户以为自己知道、但平台其实可以不透明处理”的环节，每个环节说明：内部术语是什么、黑心站长可以怎么藏、用户表面会看到什么、用户应该问什么问题识别、哪些说法没有证据不能公开写死；重点看 model alias / 分组名与真实上游不一致、protocol compatible 不等于官方、fallback / retry / 降级路由、cache 透传与计费、usage breakdown、失败请求扣费、余额倍率这些点。
```

## Raw Engineering Notes

Paste engineer response here.

```text
1. Model Alias / Model Mapping

内部术语：
- model alias
- model mapping
- canonical model
- upstream model
- request rewrite
- route policy
- model compatibility shim

可以怎么藏：
- 前台只展示用户请求的模型名，例如 gpt-x、claude-x、codex-x。
- 网关收到请求后，在真正转发到上游前把 model 字段改写成另一个上游模型。
- usage 记录里只保存 requested_model，不保存 resolved_model / upstream_model。
- 账单 SKU 绑定展示名，而不是绑定真实上游模型。
- 后台只给用户看“分组 / 模型别名”，不展示 alias table。
- 多个真实上游模型共用一个展示名，让用户无法从名称判断实际路由。

用户表面会看到什么：
- 同一个模型名，不同时间输出风格、速度、工具调用能力、上下文表现不稳定。
- 某些官方模型才支持的参数、reasoning、tool schema、cache 语义表现不一致。
- 报错信息像官方兼容，但细节和官方文档不完全一致。
- 价格按“高端模型”收，但行为像更便宜或不同供应商的模型。

用户该问什么：
- 这个展示模型名是否 1:1 对应真实上游 model id？
- 能否返回 requested_model、resolved_model、provider、upstream_model？
- model alias / mapping 是固定的，还是会按负载、失败率、成本动态切换？
- 如果发生 model rewrite，会不会在响应、日志、账单里标出来？

哪些不能公开写死：
- 没有抓包、日志、响应差异和上游账单证据，不能说某个平台“偷换模型”。
- 不能把模型表现变差直接等同于降级，可能是上游版本、系统提示词、temperature、负载或网络问题。
- 不能说 compatible gateway 一定会改写模型；只能说技术上可以这样做，透明平台应该主动披露。

2. Group Name vs Real Upstream

内部术语：
- group
- channel
- provider
- account pool
- routing group
- upstream account
- pool selector
- sticky session

可以怎么藏：
- 分组名写成 OpenAI / Claude / Codex / 官方高速组，但真实路由可以是任意 provider 或账号池。
- 一个 group 下面挂多个 channel，channel 再各自绑定不同 provider、账号类型、代理出口。
- 用户只看见 group name，看不见 channel list、account pool、provider type。
- 同一个 group 内部可按余额、并发、失败率、地区、模型名做动态选择。
- 对外宣称“官方协议”，实际只是统一转成某个 compatible endpoint。

用户表面会看到什么：
- 同一个 key 切不同 group 后质量、速度、报错格式明显变化。
- group 名像官方，但 headers、错误码、usage 字段不像官方。
- 某些 group 在高峰期突然慢、突然 429、突然输出质量下降。
- 用户以为是在选“供应商”，实际是在选平台自定义路由池。

用户该问什么：
- group 是展示名，还是严格绑定 provider？
- 每个 group 下有哪些真实 provider / account type？
- 是否存在跨 provider fallback？
- 是否能查看请求最终命中的 channel / account pool 类型？
- 分组路由变更是否有变更记录或公告？

哪些不能公开写死：
- 没有后台配置、响应证据或平台披露，不能说某个 group 一定不是官方。
- 不能把 group 名不等于 provider 名直接说成欺诈；关键在于是否清楚披露。

3. Protocol Compatible Does Not Mean Official

内部术语：
- OpenAI-compatible
- Anthropic-compatible
- protocol bridge
- request transform
- response transform
- schema adapter
- error adapter
- SDK compatibility

可以怎么藏：
- 对外说“支持 OpenAI SDK / Anthropic SDK”，但只保证请求格式相似。
- 网关把 OpenAI-style 请求转换成另一个供应商或内部接口，再把响应转回 OpenAI-style。
- 错误码、usage、tool call、stream event、cache 字段可被适配层重新包装。
- 响应里保留 object / choices / usage 等字段，让普通用户误以为就是官方。
- 文案只写 compatible，不主动解释 compatible 不是 official。

用户表面会看到什么：
- SDK 能跑，curl 能通，但边界行为和官方不一致。
- 官方支持的某些参数被忽略、降级或静默改写。
- stream chunk 顺序、tool call id、error type、retry 语义和官方不同。
- 账单字段不等于官方 usage 字段。

用户该问什么：
- compatible 是协议兼容，还是官方 endpoint 直连？
- 上游 base URL / provider 是否可披露？
- 哪些字段会被 transform，哪些字段会被透传？
- 官方不支持或平台不支持的参数，是报错、忽略还是改写？
- 是否能给出和官方接口差异表？

哪些不能公开写死：
- 不能说 compatible 就是假官方；compatible 是正常工程模式。
- 不能说所有 transform 都是恶意；很多 transform 是为了 SDK 兼容。
- 可以公开强调：compatible 不是 provenance guarantee。

4. Fallback / Retry / Degraded Routing

内部术语：
- fallback
- retry
- failover
- degraded route
- shadow retry
- hedged request
- circuit breaker
- rate-limit backoff
- account rotation

可以怎么藏：
- 第一次上游失败后，平台自动换账号、换 channel、换 provider 再试。
- 对用户只返回最后一次结果，不展示中间失败和重试次数。
- 某些失败场景自动降到便宜模型或低优先级池，但响应仍沿用原展示模型名。
- 多路并发 hedged request，谁先返回用谁，其他请求取消或继续消耗上游资源。
- retry 产生的上游成本被折进最终扣费，用户只看到一次请求扣费。
- fallback 失败后统一包装成 502 / 504 / timeout，不展示真实失败链路。

用户表面会看到什么：
- 偶发一次请求耗时很长，但最后成功。
- 失败请求也扣了部分费用，或者余额变化与成功请求数对不上。
- 同一请求有时质量像 A 模型，有时像 B 模型。
- 报错只有“upstream error”，不知道是哪个上游、重试几次、是否降级。

用户该问什么：
- 一次请求最多会 retry 几次？
- retry / fallback 是否会改变 provider 或 model？
- 失败、超时、用户取消时如何计费？
- 是否能在 usage 里看到 retry_count、fallback_chain、final_provider？
- 是否存在降级路由？如果有，是否会显式标记？

哪些不能公开写死：
- 没有逐请求日志和余额流水，不能说平台“失败也乱扣费”。
- 不能把一次长耗时直接归因于 fallback；也可能是上游慢、网络慢或队列慢。
- 不能说 fallback 本身不合理；不透明 fallback 才是问题。

5. Cache Pass-Through and Cache Billing

内部术语：
- prompt cache
- cache read
- cache write
- cache creation
- cache hit
- cache passthrough
- cached input tokens
- ephemeral cache
- context reuse

可以怎么藏：
- 上游返回 input / output / cache_read / cache_write，但平台只展示总 token 或总扣费。
- 平台把 cache read 成本折算进 input token，让用户看不出 cache 是否命中。
- 平台不透传 cache-control / cache usage 字段，用户无法判断缓存是否生效。
- 对不同 provider 的 cache 字段做统一折算，隐藏真实上游口径差异。
- dashboard 只显示“本次消耗”，不显示 cache write 何时产生、cache read 何时节省。

用户表面会看到什么：
- prompt 很短但扣费高，或者同样上下文多次请求扣费不一致。
- 官方说 cache read 便宜，但平台余额下降看不出便宜在哪里。
- usage 只有 input/output，没有 cache breakdown。
- 长上下文首次请求和后续请求成本差异不透明。

用户该问什么：
- 是否展示 cache_creation / cache_read / cached_tokens？
- cache 成本按官方字段计，还是平台自行折算？
- cache miss / hit 是否可见？
- 是否能导出逐请求 usage breakdown？
- 如果上游没有 cache 字段，平台是否会自己估算？

哪些不能公开写死：
- 没有上游原始 usage 和平台账单对照，不能说平台“吞掉 cache 优惠”。
- 不能把高扣费直接说成 cache 黑箱，长上下文、reasoning、tool 或图片也可能导致高费用。

6. Usage Breakdown and Billing Ledger

内部术语：
- usage breakdown
- billing ledger
- token accounting
- input tokens
- output tokens
- reasoning tokens
- cache tokens
- tool usage
- image usage
- balance transaction

可以怎么藏：
- 响应 usage 字段、后台 usage 表、余额流水三套账不完全对齐。
- 用户页面只显示余额扣减，不显示官方 usage 原始字段。
- 把 reasoning tokens、tool 调用、image 生成、重试成本统一折成“余额消耗”。
- 账单聚合按分钟/小时/天显示，隐藏单请求明细。
- 错误请求、取消请求、流式中断请求只在 ledger 扣费，不在前台 usage 里展示。
- 不给用户导出 request id 维度明细，导致用户无法复盘。

用户表面会看到什么：
- dashboard 数字和余额变化对不上。
- 响应里的 usage 和后台账单不一致。
- 流式中断、工具调用、图片请求后的扣费看不懂。
- 客服只能说“系统按规则扣费”，但用户看不到规则。

用户该问什么：
- 是否有 request_id 维度的 usage 和 balance ledger？
- usage 是否区分 input/output/cache/reasoning/tool/image/retry？
- 余额扣费公式是否公开？
- 响应 usage、后台统计、余额流水以哪一个为准？
- 用户取消或网络断开后，已产生的上游消耗如何处理？

哪些不能公开写死：
- 没有账单明细，不能说平台做了假账。
- usage 口径不一致不必然是恶意，也可能是上游字段差异、异步聚合或汇率/倍率折算。
- 可以说“不提供 request-level ledger 的平台，很难让用户自证成本”。

7. Failed Request Charging

内部术语：
- charge on failure
- partial billing
- upstream charge
- client cancel
- timeout billing
- stream interruption
- billable attempt
- idempotency key

可以怎么藏：
- 上游已经开始生成或返回部分数据，客户端看到失败，但上游仍产生 billable usage。
- 平台对 timeout / client cancel / upstream 5xx 统一记一笔 partial charge。
- 重试链路中前几次失败也消耗上游 token，但用户只看到最后失败。
- 没有 idempotency key，用户重试同一请求会被当成多次独立扣费。
- 错误响应里不返回 billable_usage，用户无法判断失败是否应扣。

用户表面会看到什么：
- 请求失败但余额减少。
- 网络断开、Cloudflare 524、客户端取消后仍有扣费。
- 重试几次后余额下降比预期多。
- 客服解释“上游已经扣了”，但用户看不到上游扣费证据。

用户该问什么：
- 哪些失败类型会扣费，哪些不会？
- timeout / 524 / client cancel 是否扣费？
- 是否支持 idempotency key 避免重复扣费？
- 错误响应是否返回 billable_usage？
- 是否能查看失败请求的 upstream_status、upstream_usage、refund_status？

哪些不能公开写死：
- 不能说失败扣费一定不合理；如果上游已产生 token，平台可能确实有成本。
- 不能在无证据时说“故意失败扣费”。
- 可以要求平台公开失败扣费规则和可审计流水。

8. Price Multiplier / Balance Deduction

内部术语：
- rate multiplier
- group multiplier
- user multiplier
- model multiplier
- balance rate
- cost multiplier
- markup
- provider cost
- exchange rate

可以怎么藏：
- 官方 token price 先换算成平台内部 cost，再乘 group/user/model multiplier。
- 同一模型在不同 group、不同用户、不同账号池倍率不同。
- 前台只写“余额消耗”，不写官方价格、平台倍率、供应商成本、利润率。
- 对 cache、reasoning、tool、image、retry 分别设置不同倍率，但页面只显示总扣费。
- 使用“点数 / 余额 / 倍率”替代真实货币单价，降低用户理解成本的同时也降低透明度。

用户表面会看到什么：
- 同样模型、同样 prompt，不同 key 或不同 group 扣费不同。
- 官方降价后，平台扣费不一定同步下降。
- 余额倍率变化后，历史账单难以复算。
- 用户只知道“花了多少余额”，不知道贵在哪里。

用户该问什么：
- 官方单价到余额扣减的公式是什么？
- 倍率按 user、group、model、provider 哪一层生效？
- cache / reasoning / retry / image 是否有单独倍率？
- 官方调价后平台多久同步？
- 是否能导出可复算的 billing ledger？

哪些不能公开写死：
- 不能说有 markup 就是黑箱；中转站有运维、账号、风控、支付和坏账成本。
- 不能说倍率高就一定欺诈；问题在于是否明示和可复算。
- 没有同请求对照，不能说平台“余额倍率造假”。
```

## Candidate Hidden Layers

Use these as intake buckets. Do not publish them as facts until supported by
engineering input or public sources.

### 1. Model Alias / Model Mapping

Internal question:

```text
Does the product-facing model or group name map one-to-one to the upstream model?
```

Possible user-facing question:

```text
你能不能展示这个模型名背后的真实上游和版本？
```

### 2. Group Name vs Real Upstream

Internal question:

```text
Can a "Claude group" or "GPT group" route to a different upstream family,
fallback pool, or compatible bridge?
```

Safe public wording:

```text
分组名可能只是入口名。用户真正需要看的是 model mapping 和 fallback 说明。
```

### 3. Protocol Compatible vs Official

Internal question:

```text
Is "OpenAI-compatible" / "Anthropic-compatible" only an API-shape promise?
```

Safe public wording:

```text
compatible 是协议层，不是官方来源保证。
```

### 4. Fallback / Retry / Downgrade Route

Internal question:

```text
When upstream fails, times out, or rate-limits, does the gateway retry, switch
route, downgrade model, or charge failed attempts?
```

Possible user-facing question:

```text
失败、重试、fallback 会不会展示？会不会扣费？
```

### 5. Cache Pass-Through and Billing

Internal question:

```text
Does the gateway preserve upstream cache semantics, expose cache reads/writes,
or collapse everything into one balance deduction?
```

Possible user-facing question:

```text
你能不能返回 input / output / cache read / cache write 明细？
```

### 6. Usage Breakdown

Internal question:

```text
Does the response or dashboard expose input, output, cache, reasoning/thinking,
tool, retry, or image usage details?
```

Possible user-facing question:

```text
我能不能看到每次请求贵在哪里，而不只是看到余额少了？
```

### 7. Price Multiplier / Balance Deduction

Internal question:

```text
How does official upstream token price become the user-facing balance deduction?
```

Possible user-facing question:

```text
你的单价、倍率、失败扣费、重试扣费、缓存扣费规则能不能公开？
```

## Public Source Checklist

Collect only if needed before drafting:

- OpenAI official docs on usage fields and prompt caching.
- Anthropic official docs on usage fields and prompt caching.
- OpenAI / Anthropic API compatibility wording if available.
- Public docs from gateway-style platforms only for wording patterns, not as
  accusations.

## Claims To Avoid

- Do not say every gateway is dishonest.
- Do not say any named provider substituted models without proof.
- Do not frame GLM, MiniMax, Claude, GPT, or any model family as inherently fake.
- Do not reveal private SorryCode implementation details.
- Do not confuse product billing with official upstream model pricing.
- Do not say compatible equals official.

## Draft Standard

Each section should produce:

```text
villain line -> what it means technically -> what the user should ask
```

The post should be provocative in framing and conservative in claims.
