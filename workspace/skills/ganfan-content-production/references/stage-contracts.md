# Stage Contracts

## Stage 0: 课题触发
- 输入: 用户需求、主题、初步立场
- 输出: `00-背景描述/background.md`
- 必要字段: 主题边界、目标读者、宏观情绪方向

## Stage 0.5: 观点对齐
- 输入: `background.md`
- 输出: `00-背景描述/core_views.md`
- 要求: 核心观点可执行、可反证

## Stage 1: 事实信息收集
- 执行: `ganfan-info-aggregator`
- 输出: `01-信息源/direction_proposal.md`
- 强制: 仅事实，不得建议角度/立场

## Stage 2: 写作生成
- 执行: 写作子代理 + `ganfan-the-marveling-explorer`
- 输出: `02-策划案/outline.md`、`03-成稿/article_source.md`
- 审核口: 只审 `article_source.md`

## Stage 2.5: 反馈迭代
- 输入: 审核意见 + `article_source.md`
- 输出: `03-成稿/_versions/*` + 更新后的 `article_source.md`
- 规则: 反馈先入背景，再重生成

## Stage 3: 配图
- 执行: `ganfan-article-illustrator`
- 输出: `04-配图/` + `03-成稿/article_with_images.md`
- 规则: 不改观点，只补视觉表达

## Stage 4/5: 适配与分发
- 执行: `ganfan-distribution-agent`
- 输出: `05-平台终稿/...`
- 规则: 只改格式，不改内容
