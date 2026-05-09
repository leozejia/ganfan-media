# Lightweight Article Workflow

Updated: 2026-05-09

## 为什么重构

旧内容 workflow 按 Stage 0 到 Stage 5 设计，适合深度长文和完整分发链路。现在 SorryCode 的运营节奏更需要轻量：快速捕捉真实问题，写出 X 版本，再把完整步骤沉淀到站内。

新规则：默认轻量，只有深度长文才进入完整阶段制。

## 默认目录

```text
publications/YYYY-MM-DD-topic-slug/
├── 00-source/
│   └── source-notes.md
├── 01-brief/
│   └── brief.md
├── 02-draft/
│   └── article.md
├── 03-channels/
│   ├── x-thread.md
│   └── sorrycode.md
├── 04-assets/
│   └── cover/
└── 05-publish/
    └── publish-log.md
```

## 五步流程

### 1. Source

收集事实，不急着写观点。

必须记录：

- 原始链接或截图来源。
- 发生时间。
- 问题现象。
- 已验证和未验证的部分。

### 2. Brief

用一页 brief 定方向。

必须写清：

- 这篇给谁看。
- 读者看完能解决什么。
- X 上只讲哪一个核心点。
- SorryCode 承接哪个动作。
- 是否需要封面图。

### 3. Draft

先写完整稿，再拆渠道。

要求：

- 直接讲问题，不用宏大开头。
- 事实和判断分开。
- 不强行升华。
- 不把 SorryCode 写成广告主体。

### 4. Channel

X 和 SorryCode 分工明确。

X 版本：

- 开头 1 到 2 句必须有钩子。
- 每条只讲一个信息点。
- 默认不放多图。
- 结尾只给一个 SorryCode 入口。

SorryCode 版本：

- 保留完整步骤。
- 补命令、截图、排障。
- 给下一步路径。
- 适合小白照着操作。

### 5. Publish

发布前记录状态。

`publish-log.md` 至少包含：

- 渠道
- 状态
- 发布时间
- 发布链接
- 后续反馈

## 图片决策

默认不生成图片。只有满足以下任一条件才做图：

- X 封面能明显提高点击。
- 站内教程需要截图解释步骤。
- 文章主题本身是视觉、设计、图片、PPT 或视频。

封面生成优先走 `sorrycode-image2`，不再使用旧 Tuzi 链路。

## 何时升级为完整流程

只有这些情况使用完整 Stage workflow：

- 深度行业分析。
- 需要大量事实源。
- 需要多轮配图和公众号排版。
- 需要自动发布到微信或 X Article。

普通 SorryCode 运营文章不默认进入完整流程。
