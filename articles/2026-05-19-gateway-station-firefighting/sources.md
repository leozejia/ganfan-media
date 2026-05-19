# Sources: 重生之我开中转站

Date: 2026-05-19

Status: architecture / operations source pack filled from local SorryCode
maintenance docs, recent local commits, and implementation signals. X draft v1
created from this source pack.

This file is source material, not publish copy. The final article should not read
like a technical postmortem. Use the angle:

```text
营销号说中转站是躺赚。
真正开过才知道，每天不是在收钱，是在替用户挡住上游、协议、账单、安装环境、文档和半夜事故。
```

## Public / Private Boundary

Allowed in public copy:

- anonymized operational categories;
- safe concrete examples, such as "compact 大请求撞 Cloudflare 524", "Windows 启动器因为 batch 变量展开闪退", "支付成功页不代表 webhook 已到账";
- local engineering work categories, such as tests, CI, deploy guardrails, cache, docs, backup, support runbooks;
- qualitative workload framing, such as "要持续跟上游", "要维护账单明细", "要写小白文档".

Do not publish:

- upstream account names, account pools, provider credentials, API keys, OAuth tokens, private route logic, supplier secrets;
- user prompts, customer logs, request IDs, raw request bodies, full CF-Ray mappings, private spend by customer;
- exact server login details, private config file contents, security or anti-abuse details;
- claims that name a third-party as "偷换模型 / 乱扣费 / 诈骗" without public evidence;
- exact incident counts or sleepless timelines unless separately approved.

Recommended public tone:

```text
不是说中转站不能做。
是说如果你以为它只是买上游、卖余额、收差价，你还没看到真正的成本。
```

## Local Source Inventory

Primary current-state docs:

- `sorrycode/docs/handoffs/current.md`
  - Current deployment truth, active priorities, deploy branch, Redis state, docs state, compact 524 state, payment state.
  - Useful facts: production deploy uses `deploy/sorrycode-main`; manual deployment; docs remote content; `gateway.openai_compact_timeout_seconds=110`; Redis password enabled; public docs machine entries live.

Compact / Codex client docs:

- `sorrycode/docs/handoffs/codex-app-compact-524-upstream-first-v1.md`
  - Compact 524 strategy: upstream-first, local minimal guardrails, active 504 before Cloudflare, logging without leaking prompts.
- `sorrycode/docs/architecture/openai-codex-compact.md`
  - Long-term compact model: compact is context compression, not "换小模型省钱"; App payload can be much larger; mapping is only an ops variable.

Production / ops docs:

- `sorrycode/docs/operations/production-compose-guardrails.md`
  - Concrete incident class: wrong compose file recreated same-name containers with different storage identity, making the DB appear empty.
- `sorrycode/docs/operations/deploy-jakarta-workflow.md`
  - Deployment script reads private config, pins deploy branch, runs health checks, verifies storage mounts.
- `sorrycode/docs/operations/release-workflow.md`
  - `study -> deploy -> CI -> deploy script -> health verification`, with deploy tree generated from study by rules.
- `sorrycode/docs/operations/release-gates.md`
  - Deploy gate: tests, migrations, content purity, no handoffs/prototypes in deploy.
- `sorrycode/docs/operations/production-hardening.md`
  - Backup, images timeout, Redis password, log retention, password length, Caddy template hygiene.
- `sorrycode/docs/operations/postgres-backup-runbook.md`
  - Production backup reality: `pg_dump -> gzip -> object storage -> restore drill`; ops logs inflated backups from about 57MB to about 117MB before cleanup, then probe backup dropped to about 29MB after cleanup/VACUUM.
- `sorrycode/docs/operations/redis-cache-guardrails.md`
  - Redis memory cap, `volatile-ttl`, key TTL discipline, no `FLUSHALL`.

Images docs:

- `sorrycode/docs/operations/openai-images-usage.md`
  - Explicit Images API vs Responses image tool vs Codex App natural-language image bridge; user-facing docs must hide OAuth bridge and account routing.
- `sorrycode/docs/archive/handoffs/openai-images-stream-stabilization-v1.md`
  - Stable public image path is `stream:true + partial_images:2`; sync JSON can still hit 524 on slow/large images.
- `sorrycode/docs/handoffs/openai-images-size-tier-and-4k-v1.md`
  - Correct 4K dimensions, size-tier mapping, APIKey 4K base64 body limit, why not globally raise response size limit.
- `sorrycode/docs/archive/handoffs/openai-compatible-images-v1.md`
  - Unified OpenAI-compatible Images endpoint for `gpt-image-2` and Gemini image models; Gemini native image path archived.

Upstream sync docs:

- `sorrycode/docs/architecture/upstream-sync-strategy.md`
  - Core principle: `upstream first, local truth only`.
- `sorrycode/docs/archive/handoffs/upstream-v0.1.125-follow-up-v1.md`
  - Many upstream changes are not simple merges: raw Chat Completions fallback, stream usage drain, zero-usage logs, WS metadata, image accounting, unknown model behavior.
- `sorrycode/docs/archive/handoffs/upstream-v0.1.126-follow-up-v1.md`
  - OpenAI / Codex continuation, unpriced usage logs, 429 plan type sync, Anthropic tool rewrite, cache-control default behavior.
- `sorrycode/docs/archive/handoffs/upstream-residual-candidates-v1.md`
  - Residual items sorted into absorb / defer / pass; examples include payment display fixes, admin UX, compact bulk edit, Codex session import, risk control pass.

Payments / billing docs:

- `sorrycode/docs/operations/payment/troubleshooting-cn.md`
  - Payment troubleshooting logic: paid vs not paid, webhook, signature verification, Stripe API version mismatch, minimum charge amount, manual补单.
- `sorrycode/docs/operations/payment/configuration-cn.md`
  - Payment providers, webhooks, load balancing, limits, cancellation controls.
- `sorrycode/docs/operations/openai-gpt55-usage-reconciliation-2026-05-07.md`
  - Concrete billing reconciliation: cache read cost explained most GPT-5.5 cost gap between SorryCode and `cc usage`.
- `sorrycode/docs/archive/handoffs/frontend-payment-audit-ready-v1.md`
  - Payment page was not "美化", but an audit-ready recharge flow for real user and platform review.

Docs / SEO / GEO docs:

- `sorrycode/docs/archive/handoffs/public-docs-content-migration-v1.md`
  - Public docs moved to `sorrycode-content`; main repo only handles proxy, cache, sanitizer, renderer, routing.
- `sorrycode/docs/archive/handoffs/docs-content-load-performance-v1.md`
  - Docs felt 10s slow because GitHub Raw cold miss and serial section index loads; fixed by stale cache, singleflight, parallel section fetch, localStorage hydrate.
- `sorrycode/docs/archive/handoffs/frontend-docs-shell-redesign-v1.md`
  - Docs had to split out of admin shell because the old layout showed double sidebars and squeezed reading width.
- `sorrycode/docs/archive/handoffs/public-agent-visibility-baseline-v1.md`
  - `/robots.txt` and `/sitemap.xml` were SPA fallback HTML before fix; first GEO baseline required real robots, sitemap, llms.txt, and `.md` docs.

Installer / beginner environment docs:

- `sorrycode/AGENTS.md`
  - Windows console encoding rules: avoid inline multiline JSON, preserve UTF-8, don't mix shell syntaxes.
- `sorrycode/docs/operations/windows-runtime-launchers.md`
  - Windows launchers need delayed expansion, logs, pause, recoverable reinstall, and non-admin default path.

Implementation signals:

- `sorrycode/scripts/deploy-jakarta.sh`
  - Production storage identity is verified before git sync, before compose up, and after compose up.
- `sorrycode/scripts/ops-log-cleanup.sh`
  - Ops log retention and VACUUM are operationalized, not left as a manual SQL memory.
- `sorrycode/backend/ent/schema/usage_log.go`
  - Usage stores input/output/cache/image/billing fields, not just "tokens".
- `sorrycode/frontend/src/views/user/UsageView.vue`
  - User-facing usage UI exposes billing mode, image count, cache tokens, and costs.
- `sorrycode/backend/internal/handler/admin/idempotency_helper.go`
  - Admin mutations use idempotency controls; failure / retry is not treated as a casual re-click.
- `sorrycode/backend/internal/pkg/openai/request.go`
  - Codex official client detection uses User-Agent and originator, which matters for client-specific behavior.

Recent local commit signals:

```text
960c016a docs: record latest production deploy
50871286 fix: refine docs reading layout
7cb34c6b fix: satisfy public content buffer lint
3f7ece0e chore: guard production compose storage identity
093508d7 chore: align compact timeout default to 110
5247f445 feat: expose public llms and markdown docs
462055c1 fix: expose public robots and sitemap
622f0ae6 fix: add OpenAI compact timeout guardrails
40908944 fix: record and retain faster docs content loading
66f8e820 feat: publish docs reading shell
20e24a47 fix: flush OpenAI image stream preamble for Codex
6beaf694 fix: absorb upstream openai v0.1.126 fixes
20a289ec fix: absorb upstream anthropic mimic cache fixes
```

These commits are useful as operational evidence, but do not publish exact
"we pushed X commits at night" claims unless approved.

## Raw Architecture / Operations Notes

Use these 12 cards as source material. Each card follows the requested shape:

```text
表面看起来是什么
真实复杂点是什么
我们踩过什么具体问题
为了让小白无感我们做了什么隐藏工作
哪些细节不能公开
```

### 1. 上游更新：外人以为是点一下升级

表面看起来：

```text
上游发新版了，合并一下，发版一下，最多跑个测试。
```

真实复杂点：

```text
上游每次变化都可能同时碰协议转换、请求体字段、stream 事件、usage 计费、模型映射、后台 UI、迁移、测试和部署模板。
```

我们踩过的具体问题：

- `v0.1.125` / `v0.1.126` 不是一条线能合的东西，要拆成 OpenAI continuation、raw Chat Completions fallback、stream usage drain、zero usage logs、WS metadata、Anthropic tool rewrite、cache-control 默认行为、provider import 等多个批次。
- 有些上游能力看起来很诱人，但和当前产品真相冲突，例如 Airwallex / 多币种、社交登录、risk control、affiliate ledger、markdown pages，不适合顺手合进生产。
- 上游修复可能是真修复，也可能带来不该进入当前产品的功能膨胀。

我们做的隐藏工作：

- 维护 `upstream first, local truth only` 的同步策略。
- 每次先分文件类型：回归上游优先、桥接复核、本地真相保护。
- 用 handoff 把吸收范围、pass/defer 项、风险和验证命令写清楚。
- 拆多个小提交和 focused tests，而不是整块覆盖本地代码。

不能公开的细节：

- 具体上游账号、供应商、路由策略和账号池能力。
- 哪些供应商或账号在什么模型上有问题。
- 内部选择某个上游 patch 的商业原因。

可写成文章句子：

```text
外面看是「跟一下上游」，里面其实是拆弹：这段能合，那段要改，那段必须 pass，因为它会把你自己的产品真相炸掉。
```

### 2. 模型兼容：外人以为是把模型名映射一下

表面看起来：

```text
用户请求 gpt-xxx，网关把 model 字段转给上游就完了。
```

真实复杂点：

```text
OpenAI-compatible / Anthropic-compatible 只是协议形状相似，不代表所有字段、错误、stream、tool、cache、usage 都和官方完全一样。
```

我们踩过的具体问题：

- OpenAI Messages continuation 曾经会保留 `function_call_output`，但裁掉对应 `function_call`，导致上游无法解析 `call_id`。
- WS replay / preflight recovery 场景里，`function_call_output` 和 `previous_response_id` 不能随便丢。
- Anthropic mimic 工具名重写不能只改 `tools[]` / `tool_choice`，还要同步改历史消息里的 `tool_use.name`。
- 默认改写 `cache_control` 看似能优化缓存，实际可能改变用户请求语义，所以后来改成默认关闭。

我们做的隐藏工作：

- 局部移植上游修复，补 focused tests，避免整文件覆盖。
- 区分普通 `/responses`、compact、Chat Completions fallback、WS passthrough、Messages compatibility。
- 保留 error passthrough、usage logging、model mapping、account capability gate 等桥接层。

不能公开的细节：

- 真实 model mapping、渠道模型名、账号能力探测结果。
- 上游 internal endpoint、OAuth token、具体账号状态。

可写成文章句子：

```text
「兼容」不是复制一个 URL。兼容到最后，你维护的是一堆边界行为：工具调用、流式事件、缓存字段、错误语义，任何一个错了，用户只会觉得模型坏了。
```

### 3. Compact / 长上下文：外人以为超时就调大 timeout

表面看起来：

```text
Codex compact 卡住了，把超时时间调大，或者换个模型。
```

真实复杂点：

```text
Compact 是长上下文压缩，不是普通聊天；请求体可能很大，等待是非流式 JSON，Cloudflare、源站、上游、客户端都有自己的窗口。
```

我们踩过的具体问题：

- Codex App 自动 compact 比 CLI 更容易撞 Cloudflare `524`，历史样本里 App payload 可到数 MB 级。
- CLI 也低概率触发，所以不能把锅简单甩给 App。
- `gpt-5.5 -> gpt-5.4` mapping 不能稳定消除问题，只能当账号级测试变量。
- 用户本机 VPN / 出口网络可能放大上传和连接问题，但 `524` 的定义不能让我们直接把根因归到 VPN。

我们做的隐藏工作：

- 记录 compact 请求的 body bytes、headers、User-Agent、originator、模型映射、CF-Ray、上游耗时和最终状态。
- 加主动结构化 `504`，尽量不要让用户先看到裸 Cloudflare `524`。
- 把通用诊断和 timeout 补丁整理成可上游 PR，而不是做 App 专属大分叉。
- 在长期文档里明确 compact 不是省钱小模型机制。

不能公开的细节：

- 原始 prompt、完整 compact body、用户日志、request id 映射、账号池、ChatGPT internal endpoint 细节。
- 具体账号的 compact mode / mapping 配置。

可写成文章句子：

```text
用户看到的是「怎么又卡了」。站长看到的是：几 MB 的上下文、非流式等待、Cloudflare 窗口、上游耗时、客户端断连，全挤在一次 compact 里。
```

### 4. 图片接口：外人以为图片就是另一个模型

表面看起来：

```text
支持图片模型，加一个 model 名就行。
```

真实复杂点：

```text
图片有显式 Images API、Responses image tool、Codex App 口述生图、OAuth bridge、APIKey path，不同模型对 stream、size、response_format 和 usage 的支持不一样。
```

我们踩过的具体问题：

- `/v1/images/generations`、`/v1/images/edits` 和 `/v1/responses + image_generation` 是不同路径，不能混为一谈。
- Codex App 口述生图如果长时间没有 SSE preamble flush，客户端会报 idle timeout。
- 慢图 / 大图同步 JSON 更容易撞公网窗口；稳定方案收敛为 `stream:true + partial_images:2`。
- `3840x2160` 这类 4K base64 可能撞 8MB 上游响应体读取上限，不能为了一个场景全局放大安全护栏。
- Gemini image 不能直接套 OpenAI 2K / 4K 尺寸口径，必须逐项验证。

我们做的隐藏工作：

- 统一公开入口到 OpenAI-compatible Images，但内部仍分模型族和路径处理。
- 图片权限改为 group / channel / account 多层 gate。
- 记录 image_count、image_size、billing_mode，避免图片成功但账单漏记。
- 公开文档只教新手走稳定参数，不暴露 OAuth bridge 和账号路由。

不能公开的细节：

- OAuth image bridge、Responses bridge 内部转换、账号选择、上游 failover。
- 具体 provider base URL、token、图片 canary 账号配置。

可写成文章句子：

```text
图片不是「加个模型名」。它会把协议、流式、超时、尺寸、计费、客户端 idle timeout 一起拖进来。
```

### 5. 账单明细：外人以为就是上游价格乘倍率

表面看起来：

```text
调用一次，算 input/output token，扣余额。
```

真实复杂点：

```text
真实账单要处理 input、output、cache creation、cache read、reasoning、tool、image、零用量、未定价模型、分组倍率和上游 usage 字段差异。
```

我们踩过的具体问题：

- GPT-5.5 对账时，`cc usage` 和 SorryCode 后台成本差距主要来自 cache read cost。`cc usage` 可能展示 cache read tokens，但成本估算没有按同一口径计入。
- 未定价 OpenAI 模型如果直接报错，会导致请求成功但 usage log 不落；后来吸收了零成本 usage 记录逻辑。
- 上游 stream 如果只给 `[DONE]`，没有 terminal event，可能导致 usage 丢失；后来要求 drain 到 terminal event。
- 图片和 Responses image output 必须走 image billing，不能按普通文本 token 糊过去。

我们做的隐藏工作：

- usage log 记录 cache、image、billing_mode、upstream_model、cost breakdown。
- 用户用量页展示 cache tokens、image_count、billing mode 和成本细节。
- 对账文档明确服务端 usage_logs 是最终账单口径。
- 成功但 usage=0 的请求也写审计日志，方便客服和调度复盘。

不能公开的细节：

- 具体用户 API key、客户用量、账号成本、供应商结算价、毛利结构。
- 单个用户的对账截图或后台原始 SQL。

可写成文章句子：

```text
账单最难的不是扣钱，是让用户看懂为什么扣。长上下文、缓存、图片、工具调用、失败中断，任何一个不透明，最后都会变成客服工单。
```

### 6. 失败重试：外人以为失败了就再试一次

表面看起来：

```text
请求失败就 retry，成功了返回，失败了报错。
```

真实复杂点：

```text
失败有很多阶段：上传慢、上游 first byte 慢、流式半途断、客户端取消、Cloudflare 断、上游已计费但用户没收到完整结果。
```

我们踩过的具体问题：

- Compact 里 Cloudflare 先断，源站后看到 `context canceled` / `502`，用户只看到 524。
- OpenAI-compatible stream 如果没有 terminal usage，就不能假装成功。
- 后台有些变更不能因为用户重复点按钮就重复执行，所以需要 idempotency。
- Payment / admin / data management 等 mutation 需要区分可重试、不可重试、幂等重放。

我们做的隐藏工作：

- 增加结构化错误，带 stage、elapsed、retryable 等诊断字段。
- 用 idempotency key / scope / fingerprint 防止重复副作用。
- 对 stream 做 drain 和 terminal event 校验。
- 对错误 passthrough 和上游状态做清洗，不把内部细节直接甩给用户。

不能公开的细节：

- retry / fallback 阈值、账号切换规则、风控策略、失败链路的完整日志。
- 用户请求内容和上游原始错误体。

可写成文章句子：

```text
「重试一下」听起来很轻。真正做网关，你要先判断：这次失败到底有没有花钱、有没有副作用、能不能重放、该不该让用户知道。
```

### 7. 支付和余额：外人以为收款接上就行

表面看起来：

```text
接支付宝、Stripe，用户付款后余额加上。
```

真实复杂点：

```text
支付链路要分清收银台、商户后台、webhook、验签、订单状态、余额到账、补单、最小金额和支付平台风控。
```

我们踩过的具体问题：

- 支付宝验签要用支付宝公钥，不是应用公钥。
- 商户自付 / 同主体账号测试会触发风控，不能当主链路坏的证据。
- Stripe success page 成功不代表 webhook 已成功回写；API version mismatch 会让订单卡在 `PENDING`。
- Stripe 官方最低收款额会让小额充值建不起来，这不是简单 rounding bug。
- 充值页不是美化页面，而是要能给真实用户和审核方看的站内闭环。

我们做的隐藏工作：

- 支付排障手册按“钱是否真的付出 -> 订单状态 -> 余额到账 -> webhook/验签/补单”排序。
- 页面做了充值主路径、支付中、结果态、审核截图友好但不写内部术语。
- 后台和 runbook 区分真实支付、前端展示、本地开发、线上回调。

不能公开的细节：

- 商户号、密钥、webhook secret、支付后台截图、用户订单详情、补单记录。
- 具体服务商风控参数。

可写成文章句子：

```text
用户说「我付了怎么没到账」，你不能只看前端成功页。你要查商户、webhook、验签、订单状态、余额流水，最后还要能解释给他听。
```

### 8. 一键安装：外人以为复制一条命令就完事

表面看起来：

```text
给用户一个 curl / PowerShell 命令，装好 Codex 或 Claude Code。
```

真实复杂点：

```text
小白机器上的 shell、编码、PATH、Node、权限、管理员窗口、拖拽路径、代理、杀软、桌面启动器都会出问题。
```

我们踩过的具体问题：

- Windows 控制台编码和 PowerShell 5.1 很容易把中文、JSON、prompt 搞坏。
- Inline multiline JSON 在 Windows 上不可靠。
- Windows `.cmd` 如果不用 delayed expansion，拖拽路径和 `ERRORLEVEL` 会读到旧值或空值，表现像闪退。
- 管理员窗口不能作为默认路径，因为 Explorer 拖拽进管理员窗口会被 Windows 阻止。

我们做的隐藏工作：

- 写了 Windows shell encoding rules：先写 UTF-8 文件，再 `--data-binary @file.json`。
- 一键安装生成 `.cmd` 日常启动器，不让用户每天打开 `.bat` 或 `.ps1`。
- 启动器写 `%TEMP%` 日志并 `pause`，用户反馈闪退时能拿日志排查。
- 重跑安装器只重建启动器，不强迫用户重填 API key。

不能公开的细节：

- 用户本机路径、日志、API key、auth.json 内容。
- 支持过程中看到的个人目录或截图。

可写成文章句子：

```text
一键安装最难的不是安装，是让一个完全不懂 shell 的人，在 Windows 上出错时还能留下你看得懂的日志。
```

### 9. 文档教程：外人以为用户会自己看说明

表面看起来：

```text
写个 README，用户自己会配置 API key 和 Base URL。
```

真实复杂点：

```text
小白不知道工具、模型、API key、Base URL、余额、group、Codex、Claude Code、Skills 是不同东西。文档本身还要能被搜索引擎和 agent 读到。
```

我们踩过的具体问题：

- 公开 docs 原来继承后台 shell，登录后有后台 sidebar + docs catalog + TOC，阅读区域被挤窄。
- `/docs` 首次进入体感慢，根因是 GitHub Raw 冷缓存和串行 section index。
- `/robots.txt` / `/sitemap.xml` 一开始被 SPA fallback 接管，HTTP 200 但其实是 HTML。
- Agent 读取 SPA URL 只看到空壳，所以需要 `.md` 直出和 `llms.txt`。
- `.md` 路由真实 GET 可用，但 HEAD / `curl -I` 可能误报 404，验证方式也要记录。

我们做的隐藏工作：

- 公开正文迁到 `sorrycode-content`，主仓只做代理、缓存、安全校验、渲染。
- 后端加 fresh/stale cache、singleflight、并发 section fetch、Cache-Control。
- 前端加 localStorage hydrate，让刷新先显示旧内容再后台更新。
- 做了独立 DocsLayout，避免 docs 像后台子页面。
- 做 robots、sitemap、llms.txt、Markdown 直出，给搜索和 agent 用。

不能公开的细节：

- 未发布内容规划、内部素材仓、不可公开排障记录、账号/供应商/私有路由文档。

可写成文章句子：

```text
文档不是装饰。文档写不好，客服会爆；文档加载慢，用户会走；文档机器读不到，agent 和搜索引擎也会当你不存在。
```

### 10. 生产发布：外人以为 git pull + docker up 就行

表面看起来：

```text
代码合了，服务器上拉一下，docker compose up。
```

真实复杂点：

```text
生产发布要区分 study 分支、deploy 分支、CI、发布树裁剪、私有配置、compose 文件、数据挂载、健康检查和回滚边界。
```

我们踩过的具体问题：

- 生产误用 `deploy/docker-compose.yml` 会用同名容器但不同数据源，让 Postgres 从 bind mount 切到 named volume，表现成“数据库消失”。
- `docker compose ps` 可能看起来正常，健康检查也可能通过，但数据库其实是新空卷。
- 发布树不能把 handoff、架构草稿、prototype 混进 deploy。
- 只增量 checkout 文件会漏掉删除，不满足发布镜像闸门。

我们做的隐藏工作：

- 建立 `study -> deploy -> CI -> deploy-jakarta -> 线上验收` 总控流程。
- 部署脚本在 git sync 前、compose up 前后校验 compose label 和 mount source。
- 部署后查 health、容器状态、远端 HEAD、磁盘和数据库 sanity。
- 把完成的 handoff 归档，current.md 只留当前真相。

不能公开的细节：

- 服务器登录方式、私有配置、SSH host、环境变量值、数据库密码。
- 具体生产用户数、表内数据、内部健康检查细节。

可写成文章句子：

```text
半夜最吓人的不是服务挂了，是它看起来没挂：容器 healthy，页面能开，但数据库因为一条 compose 命令换了存储身份。
```

### 11. 备份和日志：外人以为有备份按钮就安全

表面看起来：

```text
后台有备份功能，定期备份就完事。
```

真实复杂点：

```text
备份必须能恢复；日志会把备份撑大；对象存储 lifecycle、cron、权限、恢复演练都要闭环。
```

我们踩过的具体问题：

- 项目有后台备份能力，但生产权威方案还是服务器级 cron，因为 app 容器里 `pg_dump` / `psql` 能力不一定满足。
- 备份体积从约 57MB 增长到约 117MB，主要来自 `ops_system_logs` 和 `ops_error_logs`，不是核心业务数据。
- 清理运维日志并 VACUUM 后，数据库体积和备份探针显著下降。
- R2 token 能上传对象，但设置 bucket lifecycle 可能返回 AccessDenied，远端过期删除要到 Dashboard 或换权限。

我们做的隐藏工作：

- `pg_dump -> gzip -> 对象存储 -> 临时库恢复演练`。
- 每日 cron 前先跑 ops log cleanup，避免备份长期携带过期运维日志。
- 规定 usage_logs / payment / billing 数据不能为了压缩备份随意删。
- 私有运维记录保存备份大小、SHA、恢复演练结果。

不能公开的细节：

- bucket、S3/R2 key、备份文件完整路径、数据库凭据、恢复库细节。
- 用户数据、订单数据、API key 明细。

可写成文章句子：

```text
备份不是「有个按钮」。备份是你真能在出事时拿一份文件恢复出来，而且不会发现里面一半体积都是没清理的访问日志。
```

### 12. 安全和私有边界：外人以为不公开就没事

表面看起来：

```text
服务器不开放数据库端口，密钥不发群里，就安全了。
```

真实复杂点：

```text
安全边界要覆盖 Redis、env 权限、Turnstile、URL allowlist、CSP、支付 webhook、错误透传、文档公开范围和 agent 可读入口。
```

我们踩过的具体问题：

- Redis 即使不暴露公网，同 Docker network 内也应该显式密码鉴权，防止横向移动。
- `deploy/.env` 和历史 `.env.bak*` 不能在 repo 工作目录里 644 长期躺着。
- 公开 docs 不能把内部账号池、provider credentials、私有路由、供应商秘密写进去。
- 支付和 Stripe 前端依赖需要 CSP 放行，否则用户会看到空白 Payment Element。
- 错误透传要平衡：用户要知道错在哪，但不能直接泄露上游密钥、内部 URL 或供应商细节。

我们做的隐藏工作：

- Redis 开启密码，私有配置本地同步，权限 `600`。
- 生产 `.env` 权限收紧，备份移出 repo 工作目录。
- 文档系统明确 public/private 边界，`sorrycode-content` 只放可公开内容。
- `AGENTS.md` 明确不要暴露内部 account pools、provider credentials、private routing details、supplier secrets。

不能公开的细节：

- 所有密钥、账号池、风控规则、私有配置路径内容、供应商 SLA、完整错误体。

可写成文章句子：

```text
中转站最怕的不是只有黑客。很多时候，真正危险的是你自己把不该公开的配置、日志、账号路由写进了文档和客服话术里。
```

## Extra Material For Drafting

### Possible Opening Angles

```text
营销号说，中转站是 AI 时代的印钞机。
我看到的不是印钞机，是一台 24 小时报警的锅炉。
```

```text
外面看中转站：买上游、卖余额、收差价。
里面看中转站：上游改字段、模型不兼容、账单对不上、Windows 装不上、用户半夜问为什么扣钱。
```

```text
如果你觉得中转站很简单，先问自己一个问题：
Cloudflare 524、Stripe webhook、PowerShell 编码、Redis AOF、OpenAI stream usage，你准备谁来擦？
```

### Possible Section Frame

Use this recurring rhythm:

```text
营销号说：这里很简单。
真正维护过才知道：这里最容易炸。
我们踩过的坑是：...
所以用户无感的背后是：...
这也是为什么非技术背景不要轻易买「开站躺赚」的课。
```

### Safe Concrete Details To Include

- "compact 大请求可能卡在 Cloudflare 524 前面"
- "图片慢请求要用流式和 partial image，而不是同步等 JSON"
- "Windows 一键安装要处理 PowerShell 编码、batch delayed expansion 和日志"
- "账单要解释 cache read，而不是只看 input/output"
- "支付成功页不等于 webhook 成功入账"
- "docs 的 robots / sitemap 如果被 SPA fallback 吃掉，HTTP 200 也可能是假的"
- "备份要做恢复演练，不是只看有没有文件"
- "一次错误 compose 可以让数据库看起来消失，但真实问题是存储身份切换"

### Claims To Avoid In Final Copy

- "所有中转站都偷换模型"
- "所有营销号都是骗子"
- "某供应商不稳定"
- "某模型一定不能用"
- "Cloudflare 升级就能解决所有 524"
- "失败请求一定不该扣费"
- "有缓存就一定便宜"
- "兼容接口就是假官方"

### One-Line Thesis

```text
中转站不是不能做；但它不是套利生意，它是一个把上游、协议、账单、安装环境、文档和事故响应全部接到自己身上的运维生意。
```

## Suggested Article Skeleton

```text
1. 开头：营销号说躺赚，真实维护是擦屁股。
2. 上游更新：不是 merge，是拆弹。
3. 模型兼容：不是改名，是协议边界。
4. 超时和失败：不是重试，是判断钱、状态和责任。
5. 账单：不是扣余额，是让用户相信你没乱扣。
6. 一键安装：不是一条命令，是替小白处理本机环境。
7. 文档客服：不是装饰，是降低重复工单。
8. 半夜救火：服务器、备份、compose、Redis、Cloudflare 都会找你。
9. 结尾：能做，但别信低成本躺赚。
```

## Light SorryCode CTA If Needed

Only use after the lesson, not as the main point:

```text
如果你只是想用 Codex / Claude Code / 图片模型，不想自己维护这些坑，可以从 SorryCode 的入门文档开始：
https://sorrycode.com/docs/start/first-step
```

Alternative no-CTA ending:

```text
所以我不劝你别做中转站。
我只劝你别买「三天搭好、躺着收钱」这种梦。
```
