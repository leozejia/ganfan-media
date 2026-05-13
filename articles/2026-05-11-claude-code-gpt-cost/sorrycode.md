# Claude Code 里能跑 GPT，但不一定该这么跑

很多人第一次接触 AI coding 工具，会把几件事混在一起：

```text
Claude Code
Codex
GPT
Claude
OpenAI-compatible
Anthropic-compatible
中转站
账单
缓存
```

混在一起之后，最容易出现一个判断错误：

```text
只要能返回内容，就说明这个配置没问题。
```

这个判断不够。

Claude Code 里可以跑 GPT。只要中转站支持协议桥接，它就可以接收 Claude Code 发出的 Anthropic-compatible 请求，再把请求转成 OpenAI 模型能理解的形态，最后把结果包装回 Claude Code 能读的格式。

但能跑不等于划算。

## 先把五层分开

看一个 AI coding 配置时，先分清五层：

| 层 | 它是什么 | 小白先这样理解 |
| --- | --- | --- |
| runtime | `Codex`、`Claude Code` 这类工具 | 你打开的 AI 工作台 |
| protocol | OpenAI-compatible、Anthropic-compatible | 请求格式 |
| model | GPT、Claude、Gemini 等 | 真正生成内容的模型 |
| cache | prompt cache / context cache | 重复上下文有没有复用 |
| billing | 官方价格、中转倍率、token 分类 | 钱怎么算 |

你在 Claude Code 里填一个 GPT 模型名时，改的不是一层，而是至少三层：

- Claude Code 仍然按自己的 runtime 方式组织任务；
- 中间的 endpoint 需要做协议桥接；
- 背后模型变成 GPT 或一个被命名成 GPT 的模型。

如果再加上中转站自己的价格和模型映射，账单就更复杂。

## 账单不只是输入和输出

很多人看 LLM 账单，只看输出长不长。

这对 agent 任务不够。

代码 agent 每轮请求里可能包含：

- 系统提示；
- 工具定义；
- 历史对话；
- 文件内容；
- diff；
- 工具调用结果；
- 压缩后的上下文；
- 当前用户问题。

你看到的输出可能只有几百字，但输入上下文可能很长。

更关键的是缓存。

常见账单结构至少包括：

```text
input tokens
output tokens
cache read / cached tokens
cache creation / cache write
reasoning tokens
中转站倍率
```

小白可以这样理解：

- `input tokens`：这次模型需要看的内容。
- `output tokens`：模型写出来的内容。
- `cache read`：以前已经处理过、这次复用上的上下文。
- `cache creation`：这次新写进缓存的上下文。
- `cache miss`：你以为会复用，实际没有复用，只能重新处理。

OpenAI 的官方用法里，缓存命中会出现在：

```text
usage.prompt_tokens_details.cached_tokens
```

Anthropic 的官方用法里，缓存字段会拆成：

```text
cache_creation_input_tokens
cache_read_input_tokens
input_tokens
output_tokens
```

这就是为什么只看总扣费不够。你要知道钱花在了哪类 token 上。

## 为什么 Claude Code 跑 GPT 可能变贵

不是因为 Claude Code 不能跑 GPT。

真正的问题是：runtime、协议桥接和缓存不一定对齐。

Claude Code 会按自己的方式组织上下文。中转站收到请求后，如果要把它转给 GPT，通常需要做一层转换：

```text
Anthropic-compatible request
-> bridge / transform
-> OpenAI model request
-> bridge / transform
-> Claude Code response
```

这层转换可能影响：

- system 信息怎么放；
- tools 怎么表达；
- message history 怎么排列；
- tool result 怎么回填；
- thinking / reasoning 信息怎么处理；
- cache breakpoint 或 prompt prefix 是否稳定。

缓存依赖稳定的重复前缀。OpenAI 文档明确说，缓存命中需要 exact prefix match。Anthropic 文档也强调缓存看的是指定 breakpoint 之前的 prompt prefix。

如果桥接层每轮都改写了顺序、工具定义、系统提示、历史结构，缓存命中就可能变差。

命中差时，长上下文会反复计费。你肉眼看到的输出不多，账单却可能很高。

## 中转站可以藏住哪些东西

这里不讨论具体哪一家。

只讲结构上容易看不见的地方。

### 1. 模型名

界面上写 `gpt-xxx`，不代表背后一定是官方同名模型。

它可能是别名，可能有 fallback，也可能是站长自己做的映射。没有公开模型映射表时，用户只能相信平台。

### 2. 价格倍率

官方价格是一回事，中转站卖给你的价格是另一回事。

它可以加倍率，可以把不同 token 类型按自己的方式折算，也可以只给你看余额变化，不给你看真实 usage breakdown。

### 3. Usage 明细

如果平台只显示“本次扣费 0.3 美元”，但不显示：

```text
input
output
cache read
cache write
reasoning
```

你就很难判断贵在哪里。

### 4. 协议桥接

OpenAI-compatible 和 Anthropic-compatible 只是接口形态兼容。

它不等于官方模型保证，也不等于缓存行为保证，更不等于成本结构透明。

## 怎么判断一个配置值不值得用

不要只问：

```text
能不能返回？
```

更应该问：

```text
背后真实模型是什么？
请求走的是什么协议？
runtime 和模型是不是默认匹配？
usage 能不能拆到 input / output / cache？
缓存命中率能不能看？
模型价格和中转倍率怎么算？
```

如果这些都看不到，至少不要把它当成默认省钱方案。

## 给新手的默认规则

如果你不确定，先按这个来：

```text
GPT 模型，优先用 Codex。
Claude 模型，优先用 Claude Code。
```

这不是说技术上不能跨接。

而是第一天不要把跨接当默认路径。等你能看懂 usage、cache 和模型映射，再去尝试进阶玩法。

## 什么时候可以跨接

可以跨接，但最好满足几个条件：

- 你知道当前 runtime 会怎么组织上下文；
- 你知道中转站是否公开模型映射；
- 你能看到 usage breakdown；
- 你能看出缓存是否命中；
- 你接受桥接带来的成本和行为差异；
- 你不是只靠余额减少来判断问题。

## 最小自查清单

看到一个“Claude Code 跑 GPT”的配置，先问 6 个问题：

```text
1. 这个模型名背后映射到什么？
2. 请求实际走 OpenAI 还是 Anthropic 协议？
3. 中转站有没有公开价格倍率？
4. usage 里有没有 input / output / cache 字段？
5. 连续几轮代码任务后，cache read 有没有上来？
6. 如果模型不可用，会不会 fallback 到别的模型？
```

答不上来，就先别拿它跑长任务。

## 下一步

如果你只是想少踩坑，先回到默认路径：

- GPT / Codex 路径：`/docs/runtime/codex`
- Claude / Claude Code 路径：`/docs/runtime/claude-code`
- 工具不是模型：`/docs/platform/tools-and-models`

这篇后续可以并入或扩展 `Platform / 工具不是模型`，重点补充协议桥接、缓存命中和中转透明度。
