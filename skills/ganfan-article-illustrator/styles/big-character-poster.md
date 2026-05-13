# Big-Character Poster

Use this as the default cover style for X hooks, SorryCode tutorials, hot-tool posts, and failure-fix articles.

## Core idea

A cover is not a SaaS UI collage. It is a visual translation of one phrase.

The headline becomes the structure of the image. Graphic elements attach to the characters, pass through them, hide inside them, press against them, or grow from their negative space. The image should not feel like text and graphics pasted into separate boxes.

## Best for

- 2-6 strong Chinese characters.
- Tool or plugin topics with high search/click intent.
- A visible conflict: grey button vs enabled ability, broken flow vs fixed path, chaos vs one route.
- Tutorial covers where the image should make people stop scrolling, not explain every step.

## Prompt skeleton

```text
你是一位中文传播海报设计师。为一篇 X / SorryCode 文章设计一张封面。

目标读者：{audience}
文章主题：{topic}
核心标题：{short_title}
辅助文字：{supporting_text}
语义重点：先理解标题里最有力量的字词，再决定画面隐喻、字形重量和空间关系
主视觉隐喻：{single_visual_metaphor}
图文关系：巨大中文标题必须成为画面骨架；图形元素要与字发生关系，可以穿过字、贴着字、压在字前、藏入字内，不能只是图一块字一块
构图：{channel_preset}，按目标渠道安全区组织画面；大标题占画面 55%-70%，一个强隐喻，少量辅助文字，手机端缩小后仍清晰
质感：大字报、丝网印刷、纸张颗粒、克制高对比、强传播感
色彩：{color_direction}
不要：SaaS UI 拼贴、密集截图、完整代码、真实品牌 logo、二维码、水印、随机英文小字、分栏信息图、廉价科技感
```

## Rules

- Start from the phrase, not from screenshots.
- Use one strong metaphor, not many small icons.
- Keep auxiliary text short: product label, hot terms, or context only.
- Keep Chinese characters clear and readable.
- Avoid real logos unless approved assets are provided.
- If generated Chinese text is wrong, generate a clean background and overlay typography manually.
