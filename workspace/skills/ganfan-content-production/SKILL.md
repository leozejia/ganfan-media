---
name: ganfan-content-production
version: 2.0.0
description: GanFan / SorryCode 轻量内容生产编排。默认用于运营文章、X 线程、SorryCode 站内教程和社群问题复盘；先用五步轻流程，只有深度长文才升级到旧 Stage 0-5。图片默认不生成，封面需要时调用 sorrycode-image2。
author: GanFan Media
---

# GanFan Content Production v2

## 定位

这个 Skill 是 GanFan Media 的内容生产编排器。

默认服务三类任务：

- X / Twitter 线程
- SorryCode 站内教程
- 社群问题复盘

默认目标不是做一篇大而全的长文，而是快速把一个真实问题讲清楚，并把用户自然带到 SorryCode 的可执行路径。

## 核心原则

- X 建立信任，SorryCode 降低行动成本。
- 先教会读者一个真实东西，再给 SorryCode 入口。
- 不硬广，不重复喊口号。
- 默认不生成图片，除非图片能提高点击或帮助操作。
- 需要封面时，用 `sorrycode-image2`，不再走旧 Tuzi 链路。

## 默认轻量流程

标准目录：

```text
publications/YYYY-MM-DD-topic-slug/
├── 00-source/source-notes.md
├── 01-brief/brief.md
├── 02-draft/article.md
├── 03-channels/x-thread.md
├── 03-channels/sorrycode.md
├── 04-assets/cover/
└── 05-publish/publish-log.md
```

### 1. Source

收集事实，不急着写观点。

必须记录：

- 原始链接、截图或本地排查文件
- 问题现象
- 已验证内容
- 未验证内容
- 不能公开的内部信息

### 2. Brief

先定受众和承接动作。

`01-brief/brief.md` 必须写清：

- 这篇给谁看
- 读者看完能解决什么
- X 只讲哪一个核心点
- SorryCode 承接哪个动作
- 是否需要封面图

### 3. Draft

`02-draft/article.md` 是长稿真源。

写法要求：

- 直接讲问题，不用宏大开头。
- 事实和判断分开。
- 少用解释腔和总结腔。
- 不把 SorryCode 写成广告主体。

### 4. Channel

`03-channels/x-thread.md` 和 `03-channels/sorrycode.md` 分工不同。

X 版本：

- 开头 1 到 2 句必须有钩子。
- 每条只讲一个信息点。
- 默认不放多图。
- 结尾只给一个 SorryCode 入口。

SorryCode 版本：

- 提供完整步骤。
- 补命令、截图、排障。
- 给下一步路径。
- 适合小白照着操作。

### 5. Publish

`05-publish/publish-log.md` 记录渠道、状态、链接和反馈。

不要把草稿、预览、计划发布说成已经发布。

## 图片规则

默认不做正文配图。

只有三种情况做图：

1. X 封面能明显提高点击。
2. 站内教程需要截图解释步骤。
3. 主题本身是视觉、设计、图片、PPT 或视频。

封面生成前先写：

```text
04-assets/cover/cover-brief.md
```

内容包含：

- 文章标题
- 目标读者
- 点击理由
- 主视觉隐喻
- 禁止出现的内容

然后调用 `sorrycode-image2`。输出保存在：

```text
04-assets/cover/sorrycode-image2/
```

## 何时升级到完整 Stage workflow

只有这些任务进入完整 Stage 0-5：

- 深度行业分析
- 长篇观点文章
- 需要大量事实源
- 需要多轮配图
- 需要公众号排版或自动发布

升级后可读取旧 references：

- `references/stage-contracts.md`
- `references/project-layout.md`
- `references/acceptance-gates.md`
- `references/style-knowledge-intake.md`

普通 SorryCode 运营文章不要默认升级。

## 子技能使用

- 信息源复杂时，调用 `ganfan-info-aggregator`。
- 长文风格打磨时，调用 `ganfan-the-marveling-explorer`。
- 需要封面或图片时，调用 `sorrycode-image2`。
- 需要平台格式和自动发布时，调用 `ganfan-distribution-agent`。

## 完成定义

- Source 有来源和边界。
- Brief 明确受众和 SorryCode 承接动作。
- X 版本独立有价值，不靠诱导点击。
- SorryCode 版本能让用户少走一步弯路。
- 图片只在必要时出现，并服务点击或操作。
