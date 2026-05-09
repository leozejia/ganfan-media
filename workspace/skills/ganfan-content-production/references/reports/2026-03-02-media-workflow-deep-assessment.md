# Media Workflow 深度评估与调整方案（2026-03-02）

## 范围
- 工作流定义: `org/agent-core/marketing/workspace/skills/ganfan-content-production/SKILL.md`
- 编排 Skill: `org/agent-core/marketing/workspace/skills/ganfan-content-production/SKILL.md`
- 写作 Skill: `org/agent-core/marketing/workspace/skills/ganfan-the-marveling-explorer/SKILL.md`
- 审核 Skill: `content-reviewer/SKILL.md`（历史路径，当前仓库未保留）
- 样本产出: 外部 Obsidian 项目《2026-02-15-阿里开源战略全栈野心》

## 结论摘要
当前问题不是“模型能力不够”，而是“风格模板被写死并被审核放大”。  
工作流在“可执行”上已经成型，但在“自然表达”和“反模板门禁”上缺少硬约束。

## 主要发现

### F1（P0）风格词库硬注入，导致句式复读
- 表现:
  - 写作 Skill 明确给出固定生理词库与固定口头禅替换方式。
  - 生成结果出现“深夜/咖啡/发凉”等高复用开场元素。
- 影响:
  - 文本读感趋同，个人表达被模板覆盖。

### F2（P0）审核标准缺少“反模板”维度
- 表现:
  - 审核表关注“情绪高点”和“镜头语言”，但未对固定模板复用设置否决项。
- 影响:
  - 质量门禁会把“像风格”误判为“有风格”。

### F3（P1）工作流命名与版本语义混乱
- 表现:
  - 历史命名与当前版本语义曾经混杂，影响真源识别。
- 影响:
  - 新成员难以判断当前真源，迭代记录与执行入口分裂。

### F4（P1）引用完整性不足
- 表现:
  - 写作 Skill 曾引用不存在的 `style-guide-v33.md`。
- 影响:
  - 训练和对齐基准不稳定。

### F5（P1）“单一真源”缺少“去模板复审”缓冲层
- 表现:
  - Stage 2 完成后直达配图/分发。
- 影响:
  - 一旦首稿模板化，后续阶段只能放大问题。

## 已落地调整（本轮）

### A1 写作 Skill 去模板化
- 文件:
  - `org/agent-core/marketing/workspace/skills/ganfan-the-marveling-explorer/SKILL.md`
  - `org/agent-core/marketing/workspace/skills/ganfan-the-marveling-explorer/references/style-guide-v34.md`
- 变更:
  - 新增反模板硬约束（固定开场、固定口头禅、通感频率上限）。
  - 规则改为“证据优先，情绪后置”。

### A2 创作与审核双门禁
- 文件:
  - `content-engine/SKILL.md`（历史路径，当前仓库未保留）
  - `content-reviewer/SKILL.md`（历史路径，当前仓库未保留）
- 变更:
  - 生成端增加反模板要求。
  - 审核端加入一票否决项（模板复读、口头禅机械替换、情绪先于事实）。

### A3 工作流新增 Stage 2.5
- 文件: `org/agent-core/marketing/workspace/skills/ganfan-content-production/SKILL.md`
- 变更:
  - 新增“去模板审查”阶段，未通过不得进入配图。

### A4 工作流真源收敛
- 文件: `org/agent-core/marketing/workspace/skills/ganfan-content-production/SKILL.md`
- 说明:
  - 已收敛为单一 canonical 入口文件。
  - 中间入口文档已删除，避免并行版本。

## 建议下一步（系统迭代项）

1. 做一次“样本复写对照实验”
   - 同课题产出 A/B 两版（旧规则 vs 新规则）。
   - 人审指标只看三项: 自然度、可信度、可读完成率。

2. 引入跨文去重记录
   - 建立“最近 5 篇禁用开场/禁用句式”清单。
   - 在 Stage 2.5 自动检查是否撞模板。

3. 分离“人设”与“文风动作”
   - 人设保留（价值观、判断框架）。
   - 文风动作降权（镜头词、体感词、口头禅）。

## 验收标准
- 模板化开场命中数: 0。
- 固定口头禅命中数: 0。
- 每篇至少 3 个可回查证据锚点。
- 人工盲评自然度 >= 8/10（3 篇滚动均值）。
