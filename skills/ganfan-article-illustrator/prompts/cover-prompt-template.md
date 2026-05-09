# Cover Prompt Template

适用于 X / SorryCode 文章封面。默认生成一张高点击商业 Banner，不默认生成正文插图。

## 先写 Brief

```text
目标读者：{audience}
文章主题：{topic}
读者痛点：{pain}
点击理由：{click_reason}
主视觉隐喻：{single_visual_metaphor}
画面标题：{short_title}
禁止出现：{negative}
```

## Banner Prompt

```text
你是一位资深商业广告视觉设计师。为一篇 X / SorryCode 文章设计一张高点击封面 Banner。

目标读者：{audience}
文章主题：{topic}
读者痛点：{pain}
点击理由：{click_reason}
主视觉：{single_visual_metaphor}
画面标题：{short_title}
构图：一个主视觉，强留白，高对比，中心安全区，手机端缩小后仍清晰
风格：高级商业 Banner，干净、利落、有产品广告质感
色彩：{color_direction}
细节：{detail_texture}
不要：密集文字、品牌 logo、水印、二维码、过多小元素、廉价科技感、乱码文字、艺术家签名、版权信息
```

## 使用原则

- 一个封面只服务一个点击理由。
- 主视觉必须服务文章核心问题，不做字面复述。
- 标题要短，像广告语，不像论文题目。
- 不把文章全部信息塞进图里。
- 需要生成时调用 `sorrycode-image2`，输出到当前 publication 的 `assets/cover/sorrycode-image2/`。
