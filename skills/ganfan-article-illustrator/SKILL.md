---
name: ganfan-article-illustrator
version: 3.0.0
description: GanFan Media 轻量封面与文章视觉编排。默认只判断是否需要图片；需要封面、海报、文章图或教程截图时，优先调用 sorrycode-image2。普通 X 线程默认不配图，不再强制为每篇文章生成正文插图。
author: GanFan Media
---

# GanFan Article Illustrator v3

## 定位

这个 Skill 只负责内容视觉判断和封面 brief，不再默认给文章生成一组正文插图。

默认判断：这篇内容是否真的需要图片。

## 图片使用原则

图片只服务两个目标：

1. 提高点击。
2. 帮助理解或操作。

不为了显得完整而插图。

## 默认结论

普通 X 线程默认不需要图片。

只有这些情况才建议生成图片：

- 标题需要一个强封面来提高打开率。
- 文章主题是视觉、设计、图片、PPT、视频。
- SorryCode 站内教程需要截图帮助小白操作。
- 用户明确要求封面、海报、插图或截图。

## 输出结构

如果需要图片，输出到：

```text
assets/cover/
├── cover-brief.md
├── prompt.txt
└── sorrycode-image2/
```

如果不需要图片，在 `brief.md` 里记录：

```text
Image decision: no image needed.
Reason: ...
```

## 封面 brief

生成图片前先写 `cover-brief.md`。

必须包含：

- 文章标题
- 目标读者
- 点击理由
- 主视觉隐喻
- 画面主体
- 色彩和气质
- 禁止出现的内容

## 封面风格

参考方向：高完成度商业 Banner，而不是文章插画。需要写封面 prompt 时，读取 `references/x-cover-banner-patterns.md` 和 `prompts/cover-prompt-template.md`。

优先特征：

- 一个主视觉，不堆元素。
- 一个强标题，不写满屏字。
- 高对比、强留白、手机端可读。
- 画面表达问题或结果，不解释细节。
- 质感干净，像认真设计过的产品广告。

## SorryCode Image2

生成图片时调用 `sorrycode-image2`。

默认参数由 `sorrycode-image2` 决定。不要在这里重复 API 细节。

默认只生成 1 张封面图。除非用户明确要求，不生成多张变体。

## Do / Don't

**Do**

- 先判断是否需要图。
- 只做对点击或理解有帮助的图。
- 用 `sorrycode-image2` 保存 prompt、请求和响应诊断。
- 保持封面像广告 Banner，有明确主视觉。

**Don't**

- 不要为每篇文章强制配图。
- 不要默认生成多张正文插图。
- 不要继续使用旧 Tuzi 链路。
- 不要把低层 API 参数写进这个 Skill。
- 不要在 X 文章里堆多张图。
- 不要照搬外部作者提示词；只吸收其广告 Banner 方法和构图原则。
