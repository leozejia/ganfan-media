# Legacy Cover Prompt Template

Updated: 2026-05-14

This file is legacy reference material. Do not use it as the source of truth for
new cover planning.

New workflow:

1. choose a pattern from `/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/patterns`;
2. write `_work/images/score.md`;
3. compile the score through the relevant runtime note;
4. save the one-off runtime prompt as `_work/images/runtime-prompt.txt`.

Do not copy one-off prompts back into this skill or into Open Visual Grammar.

适用于 X / SorryCode 文章封面。默认生成一张高点击大字报封面，不默认生成正文插图。

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

## 大字报 Prompt

```text
你是一位中文传播海报设计师。为一篇 X / SorryCode 文章设计一张横版大字报封面。

目标读者：{audience}
文章主题：{topic}
读者痛点：{pain}
点击理由：{click_reason}
核心标题：{short_title}
语义重点：先理解核心标题中最有力量的字词，再决定画面隐喻、字形重量和空间关系
主视觉：{single_visual_metaphor}
图文关系：巨大中文标题必须成为画面骨架；图形元素要与字发生关系，可以穿过字、贴着字、压在字前、藏入字内，不能只是图一块字一块
构图：{channel_preset}，按目标渠道安全区组织画面；大标题占画面 55%-70%，一个强隐喻，少量辅助文字，手机端缩小后仍清晰
风格：大字报海报、强排版、强隐喻、克制、传播感强
色彩：{color_direction}
细节：{detail_texture}
不要：SaaS UI 拼贴、密集截图、完整代码、真实品牌 logo、水印、二维码、过多小元素、廉价科技感、随机英文乱码、分栏信息图、艺术家签名、版权信息
```

## 使用原则

- 一个封面只服务一个点击理由。
- 主视觉必须服务文章核心问题，不做字面复述。
- 标题要短，像广告语，不像论文题目。
- 标题本身有冲击力时，优先让标题成为画面主体。
- 图形元素必须和字共生，不要做成界面卡片拼贴。
- 不把文章全部信息塞进图里。
- 需要生成时调用 `sorrycode-image2`，诊断和候选图输出到当前 article 的 `_work/images/`。
- X Article cover 属于超宽幅封面。X UI 要求 `5:2`；Prompt 必须明确 `5:2` 和中央宽幅安全区；生成后必须检查实际返回尺寸，不能只看请求参数。
- 宽幅请求如果返回比例不稳定，优先多生成几版筛选；比例不合格但视觉强的图可以插入正文。
