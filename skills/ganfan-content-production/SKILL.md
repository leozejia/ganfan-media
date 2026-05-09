---
name: ganfan-content-production
version: 2.0.0
description: GanFan / SorryCode 轻量内容生产编排。默认用于运营文章、X 线程、SorryCode 站内教程和社群问题复盘；使用扁平文章包，先定 brief，再写 X 和 SorryCode 双版本。图片默认不生成，封面需要时调用 sorrycode-image2。
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
├── brief.md
├── sources/source-notes.md
├── drafts/x.md
├── drafts/sorrycode.md
├── assets/cover/
├── outputs/wechat/
└── publish.md
```

### 1. Brief

先定受众、角度和承接动作。

必须记录：

- 这篇给谁看
- 读者看完能解决什么
- X 只讲哪一个核心点
- SorryCode 承接哪个动作
- 事实边界是什么
- 是否需要封面图

### 2. Sources

收集事实，不急着写观点。

`sources/source-notes.md` 必须写清：

- 原始链接、截图或本地排查文件
- 问题现象
- 已验证内容
- 未验证内容
- 不能公开的内部信息

### 3. Drafts

直接写渠道稿，不强制维护中间长稿。

写法要求：

- 直接讲问题，不用宏大开头。
- 事实和判断分开。
- 少用解释腔和总结腔。
- `drafts/x.md` 独立有价值，开头有钩子，结尾只给一个 SorryCode 入口。
- `drafts/sorrycode.md` 提供完整步骤、命令、截图、排障和下一步路径。

### 4. Assets

图片只在能提高点击或帮助操作时出现。

### 5. Publish

`publish.md` 记录渠道、状态、链接、数据和反馈。

不要把草稿、预览、计划发布说成已经发布。

## 图片规则

默认不做正文配图。

只有三种情况做图：

1. X 封面能明显提高点击。
2. 站内教程需要截图解释步骤。
3. 主题本身是视觉、设计、图片、PPT 或视频。

封面生成前先写：

```text
assets/cover/cover-brief.md
```

内容包含：

- 文章标题
- 目标读者
- 点击理由
- 主视觉隐喻
- 禁止出现的内容

然后调用 `sorrycode-image2`。输出保存在：

```text
assets/cover/sorrycode-image2/
```

## 子技能使用

- 信息源复杂时，调用 `ganfan-info-aggregator`。
- 长文风格打磨时，调用 `ganfan-the-marveling-explorer`。
- 需要封面或图片时，调用 `sorrycode-image2`。
- 需要平台格式和自动发布时，调用 `ganfan-distribution-agent`。

## 完成定义

- `brief.md` 明确受众、角度、事实边界和 SorryCode 承接动作。
- `sources/` 有来源和边界。
- X 版本独立有价值，不靠诱导点击。
- SorryCode 版本能让用户少走一步弯路。
- 图片只在必要时出现，并服务点击或操作。
