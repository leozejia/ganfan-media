---
name: ganfan-content-production
version: 1.0.0
description: GanFan 内容生产编排总技能（可用基线）。当用户要从选题一路产出成稿、配图、平台终稿时必须使用。负责 Stage 0-5 编排与门禁，不直接承担风格创作或平台实现细节；Stage 1 必须是纯客观事实信息包，Stage 2 模型由运行时配置决定。
author: GanFan Nexus
---

# GanFan Content Production Orchestrator v1.0.0

## 作用边界

- 本 Skill 是总编排器，只做流程路由、输入输出契约、质量门禁。
- 细节实现由子技能负责：
  - Stage 1: `ganfan-info-aggregator`
  - Stage 2: `ganfan-the-marveling-explorer`
  - Stage 3: `ganfan-article-illustrator`
  - Stage 4/5: `ganfan-distribution-agent`
- 本 Skill 不得硬编码供应商私有模型通道；写作模型以运行时配置为准。

## 阶段总览

| 阶段 | 目标 | 标准输出 | 核心门禁 |
|---|---|---|---|
| Stage 0 | 课题与宏观方向 | `00-背景描述/background.md` | 必须明确选题边界与立场 |
| Stage 0.5 | 观点对齐 | `00-背景描述/core_views.md` | 观点必须可执行、可验证 |
| Stage 1 | 事实信息收集 | `01-信息源/direction_proposal.md` | 仅事实包，不得给方向建议 |
| Stage 2 | 写作生成 | `02-策划案/outline.md` + `03-成稿/article_source.md` | 仅 `article_source.md` 作为审核入口 |
| Stage 2.5 | 反馈迭代 | `03-成稿/_versions/*` | 反馈先入背景，再重生成 |
| Stage 3 | 配图插入 | `03-成稿/article_with_images.md` + `04-配图/` | 不改写事实结论，仅做视觉增强 |
| Stage 4/5 | 格式适配与分发 | `05-平台终稿/...` | 仅改格式，不改内容 |

## 强制规则

1. **单一真源**: 文章真源始终是 `03-成稿/article_source.md`。  
2. **Stage 1 纯客观**: 不输出角度建议、选题建议、结论判断。  
3. **反馈先入背景**: Stage 2.5 禁止直接在旧稿临改。  
4. **分发不改内容**: Stage 4/5 禁止改写观点与事实。  
5. **未完稿豁免**: 未完项目允许缺 `article_with_images.md`，不得强制补齐占位成稿。  
6. **风格资产统一管理**: 写作参考统一沉淀到 `P-内容创作中心/_style-knowledge/`，按需人工最小同步维护。

## 执行顺序（最小流程）

1. 读取 `references/stage-contracts.md`，按阶段合同执行。  
2. 读取 `references/project-layout.md`，确认项目目录结构。  
3. Stage 1 调用 `ganfan-info-aggregator` 产出事实包。  
4. Stage 2 调用写作子代理，风格规则收敛到 `ganfan-the-marveling-explorer`。  
5. 进入 Stage 2.5 前，读取 `references/acceptance-gates.md`。  
6. 需要引用历史风格时，读取 `references/style-knowledge-intake.md`。

## 何时读取哪份 Reference

- **阶段输入输出不清晰** → 读 `references/stage-contracts.md`  
- **目录落位有分歧** → 读 `references/project-layout.md`  
- **审核标准不明确** → 读 `references/acceptance-gates.md`  
- **风格蒸馏或历史样本选取** → 读 `references/style-knowledge-intake.md`  

## 交付完成定义

- 阶段产物文件齐全，且满足每阶段门禁。  
- 审核结论可追溯到具体文件路径。  
- 分发前后内容语义一致，仅格式变化。  
