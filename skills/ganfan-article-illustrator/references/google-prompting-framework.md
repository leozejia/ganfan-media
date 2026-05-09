# Google 图像生成提示词框架

> 来源：`/Users/zejiawu/Projects/promptist/docs/research/google-prompting-framework.md`
> 内收日期：2026-03-19

## 何时读取

仅在以下场景读取本文件：

- 需要为封面、截图或正文插图生成 Prompt
- 当前 Prompt 过于抽象、画面控制不足、缺少镜头语言
- 需要把用户所选风格转成更稳定的多维度提示词结构

正常只做风格选择时，不要默认展开整份文档。

## 六个核心维度

Google 官方提示词框架的六个核心维度：

| 维度 | 英文 | 说明 | 示例 |
|-----|------|------|------|
| **主体** | Subject | 你要生成什么，画面的核心对象 | `a golden retriever`, `a steaming bowl of ramen` |
| **构图** | Composition | 镜头角度、取景方式、空间关系 | `wide-angle shot`, `macro shot`, `low-angle perspective` |
| **动作** | Action | 主体正在做什么，画面中发生的事情 | `running through a field`, `steam rising` |
| **场景** | Location | 事件发生的地点和环境 | `in a cozy kitchen`, `on a rainy Tokyo street` |
| **风格** | Style | 艺术风格、渲染方式、视觉语言 | `cinematic`, `watercolor`, `Studio Ghibli style` |
| **光影** | Lighting | 光源类型、方向、氛围营造 | `dramatic lighting`, `golden hour`, `soft diffused light` |

## 对 Skill 的直接约束

在 `ganfan-article-illustrator` 中，Prompt 应优先覆盖以下 6 个槽位：

1. 主体
2. 构图
3. 动作
4. 场景
5. 风格
6. 光影

如果文章内容不适合“动作”维度，可退化为“状态 / 关系 / 张力”。

## 镜头语言

当画面需要更强控制时，优先补充摄影和电影语言：

- `wide-angle shot`
- `macro shot`
- `low-angle perspective`
- `85mm portrait lens`
- `Dutch angle`
- `bokeh background`
- `depth of field`

## Prompt 质量原则

1. 具体优于模糊
2. 多维度组合优于单一名词
3. 优先真实场景细节与镜头控制
4. 对 GanFan / SorryCode 文章配图，优先“隐喻可视化”而不是“字面插画”

## 扩展维度

必要时再补：

- 细节质感
- 技术参数
- 负面提示

## 参考链接

- `https://blog.google/products/gemini/image-generation-prompting-tips/`
- `https://blog.google/products/gemini/prompting-tips-nano-banana-pro/`
- `https://developers.googleblog.com/en/how-to-prompt-gemini-2-5-flash-image-generation-for-the-best-results/`
- `https://blog.google/products/gemini/meta-prompting-veo-gemini-tips/`
