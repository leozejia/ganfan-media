---
name: ganfan-info-aggregator
version: 1.1.0
description: GanFan / SorryCode 信息源聚合技能。当文章包需要补充事实来源时使用。调用 agent-browser 做来源检索，输出可溯源的事实信息包；严禁输出角度建议、选题建议和倾向性结论。
author: GanFan Media
dependencies:
  - agent-browser
---

# GanFan Info Aggregator v1.0.0

## 职责边界

- 仅负责事实信息收集。
- 输出是事实信息包，不是选题提案。
- 所有结论性动作留给 `brief.md` 和 `drafts/`。

## 输入 / 输出合同

- **输入**: `topic`、关键词、探索目标、publication 路径。
- **输出**: `sources/source-notes.md` 或 `sources/fact-pack.md`。
- **来源要求**: 每条关键事实必须可追溯到公开来源。

## 执行步骤（最小）

1. 用 `agent-browser` 执行主动检索（官网/代码仓库/权威媒体/高质量社区）。  
2. 采集可验证事实，记录来源链接与采集时间。  
3. 按 `references/fact-pack-template.md` 组织输出结构。  
4. 用 `references/source-quality-checklist.md` 做一次自检。  
5. 写入当前 publication 的 `sources/`。

## 强制禁止

- 禁止输出“角度A/角度B”。
- 禁止输出“建议写什么”或“建议立场”。
- 禁止无来源断言。
- 禁止情绪化标签和倾向性总结。

## 何时读 Reference

- **需要统一输出格式** → `references/fact-pack-template.md`
- **需要核对来源质量** → `references/source-quality-checklist.md`

## 完成定义

- 文件存在：`sources/source-notes.md` 或 `sources/fact-pack.md`
- 结构符合模板
- 关键事实全部可回溯
- 不含建议型内容
