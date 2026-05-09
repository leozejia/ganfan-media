---
name: ganfan-article-illustrator
version: 2.2.0
description: 为 Nexus 内容创作中心文章执行 Stage 3 配图：读取 `03-成稿/article_source.md`，识别头图与正文插图点，在关键节点只向用户询问本次视觉风格，然后调用 Tuzi 生成图片并写回 `04-配图/` 与 `03-成稿/article_with_images.md`。用于文章头图、正文插图、配图插入与配图风格化。
author: GanFan Nexus
---

# GanFan Article Illustrator

## 定位

- 只负责 `ganfan-content-production` Stage 3：配图生成与插入
- 不负责排版、平台格式适配、分发或发布
- 风格真相源是当前目录下的 `styles/*.yaml`

## 何时使用

在以下场景触发：

- `03-成稿/article_source.md` 已经定稿，准备进入配图阶段
- 需要为文章生成头图与正文插图
- 需要把图片引用写回 `03-成稿/article_with_images.md`

## 输入

- `03-成稿/article_source.md`

## 输出

- `04-配图/_outline.md`
- `04-配图/prompts/`
- `04-配图/styles_used.yaml`
- `04-配图/*.png`
- `03-成稿/article_with_images.md`

## 运行真相

- 项目目录结构以 `ganfan-content-production` workflow 为准
- 风格库：`styles/*.yaml`
- Prompt 模板：`prompts/cover-prompt-template.md`、`prompts/inline-prompt-template.md`
- Tuzi / model / size 等低层细节：按需读取 `references/tuzi-runtime.md`
- Prompt 结构框架：按需读取 `references/google-prompting-framework.md`

## 默认规则

- 默认静默执行；常规只问一次风格选择
- 默认配图密度为 `balanced`
- 默认生成 1 张可复用头图 + 若干正文配图；不要为封面额外再生一套图，除非用户明确要求
- 头图默认采用宽幅、中心安全区、边缘不放关键信息的构图
- 所有图片默认禁止：文字、水印、logo、品牌标识、艺术家签名、版权信息
- Prompt 优先表达隐喻和概念，不做字面翻译
- 不修改 `article_source.md`

## 常规流程

1. 读取 `03-成稿/article_source.md`
2. 识别头图位与正文插图位
3. 询问用户本次使用的风格
4. 读取所选 `styles/<name>.yaml`
5. 头图优先使用 `prompts/cover-prompt-template.md`，正文图优先使用 `prompts/inline-prompt-template.md`
6. 必要时读取 `references/google-prompting-framework.md` 补足 Prompt 结构
7. 生成 `04-配图/_outline.md` 与 `04-配图/prompts/`
8. 调用 Tuzi 生成并下载图片到 `04-配图/`
9. 将图片引用插入文章，输出 `03-成稿/article_with_images.md`

## 唯一常规交互

在实际生图前，只问这一句：

`这次配图使用哪种风格？可选：叙事手账-信息可视化、流动的凝视-极简封面、简约典雅艺术、奇思妙想手账画师、简约手绘线稿。`

如果用户没有指定：

- 深度长文 / 商业分析 / 技术科普：优先推荐 `叙事手账-信息可视化`
- 头图感更强、叙事更重的文章：优先推荐 `流动的凝视-极简封面`

## 异常才问

只有以下情况再追加询问：

- 用户要求自定义新风格
- 所选风格与文章气质明显冲突
- Prompt 命中品牌名称、文字、水印、版权等风险词
- 生成结果明显失真、裁切风险过高、或无法满足正文插图需求

## 风格库

当前内置风格：

- `叙事手账-信息可视化`
- `流动的凝视-极简封面`
- `简约典雅艺术`
- `奇思妙想手账画师`
- `简约手绘线稿`

新增风格时：

- 在 `styles/` 新增一个 YAML 文件
- 只写 `name`、`description`、`keywords`、`negative`
- 不要把新风格说明堆回主 `SKILL.md`

## Do / Don't

**Do**

- 让 `article_with_images.md` 成为唯一发布输入
- 保持头图和正文插图属于同一套视觉语言
- 将风格选择留给用户，将其余实现细节留在 skill 内部

**Don't**

- 不要把密度、比例、provider、theme 当成常规询问项
- 不要把排版或发布职责塞回这个 skill
- 不要单独维护平台封面资产，除非用户明确要求
- 不要把参考资料、API 手册、历史变更堆在主 `SKILL.md`

## 资源加载

- 正常执行时，不要默认加载 `references/tuzi-runtime.md` 或 `references/google-prompting-framework.md`
- 只有在修改 provider、排查生成失败、核对模型或尺寸能力时，才加载 `references/tuzi-runtime.md`
- 只有在需要生成或修正 Prompt 结构时，才加载 `references/google-prompting-framework.md`
- 只有在用户选定或要求推荐风格后，才读取对应的 `styles/*.yaml`
- 生成头图时优先读取 `prompts/cover-prompt-template.md`；生成正文图时优先读取 `prompts/inline-prompt-template.md`
