# Claude Code 里跑 GPT，最危险的是能跑

很多 AI 工具的坑，不是报错。

是它不报错。

你把 GPT 接进 Claude Code。

它回了。

你就以为配置对了。

然后一天几十美刀没了，项目没怎么动，输出也没多少。

这时候骂模型贵，只骂到表面。

你以为自己换的是模型。

实际上你换了五层东西：

```text
runtime
protocol
model
cache
billing
```

Claude Code 是 runtime。

GPT 是 model。

Anthropic-compatible / OpenAI-compatible 是 protocol。

中转站是 bridge。

账单是另一套游戏。

这几层一混，普通用户就基本看不懂自己在为什么付钱。

Claude Code 当然能跑 GPT。

中转站收 Anthropic 形态的请求，改写一下，转给 OpenAI 形态的模型，再把结果包回来。

技术上没什么神秘。

但能跑，不代表应该跑。

因为 Claude Code 不是聊天框。

它会带系统提示。

会带工具定义。

会带历史。

会带文件片段。

会带 diff。

会带工具结果。

你看到的是几段输出。

账单看到的是一整车上下文。

代码 agent 贵，很多时候不是贵在输出。

是贵在每一轮都把上下文重新喂进去。

这里就轮到缓存登场。

缓存命中，重复上下文便宜。

缓存不命中，重复上下文照样收钱。

OpenAI 的 usage 里有 `cached_tokens`。

Anthropic 会拆 `cache_creation_input_tokens` 和 `cache_read_input_tokens`。

字段名不用背。

要记住的是：如果看不到 cache breakdown，你就不知道钱烧在哪里。

这就是中转站最有意思的地方。

它可以让你用。

但不一定让你看清楚。

模型名可以包装。

价格可以加倍率。

usage 可以只给总价。

协议可以桥接。

fallback 可以藏起来。

用户看到的是：

```text
gpt-xxx
请求成功
余额减少
```

站长看到的是：

```text
实际模型是谁
倍率怎么算
cache 有没有命中
fallback 到哪里
哪些字段给用户看
```

这就是信息差。

所以我不喜欢把中转讲成“便宜平替”。

真正的问题不是便宜不便宜。

是你有没有资格看账本。

一个站点如果只能告诉你扣了多少钱，却不能告诉你：

```text
input 多少
output 多少
cache read 多少
cache write 多少
reasoning 多少
倍率多少
```

那它不是在帮你理解成本。

它是在让你习惯扣费。

Claude Code 跑 GPT 也是这个逻辑。

它不是禁区。

但它不应该是小白默认路径。

小白默认就两条：

```text
GPT 走 Codex。
Claude 走 Claude Code。
```

先别急着追“我能不能在 A 里面跑 B”。

能跑太容易了。

能解释账单才难。

以后看到任何“兼容”两个字，都先冷静一下。

compatible 不是 official。

compatible 不是透明。

compatible 也不是省钱。

它只代表接口能对上。

至于背后怎么转、谁在算钱、缓存有没有命中，要你自己问。

问不出来，就别跑长任务。

尤其别拿一个代码 agent 去闭眼跑长任务。

因为 agent 最擅长的事情之一，就是很认真地把你的钱花掉。

不是它坏。

是你没看账本。

我把 runtime、model、protocol 的默认关系整理在这里：

https://sorrycode.com/docs/platform/tools-and-models
