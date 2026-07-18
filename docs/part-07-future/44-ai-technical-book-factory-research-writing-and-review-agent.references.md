---
title: "第 44 章参考资料：AI Technical Book Factory"
chapter: "44"
status: "completed"
updated_at: "2026-07-17"
---

# 第 44 章参考资料：AI Technical Book Factory

> `CH44-REF-*` 是本章局部追溯键，并映射到 `.ai/references.md` 中的全局引用。来源只支持表中限定陈述，角色契约、Content Evidence Package、冲突路由、质量门和人工决定记录均为本书工程模型。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH44-REF-01 | REF-029 | [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方动态工程文章 | 2026-07-17 | workflow/agent 的文章内区分；prompt chaining、parallelization、orchestrator-workers、evaluator-optimizer 的限定模式；评价标准清晰且改进可测时的反馈循环背景。 | 本章角色、状态机、Agent 数量、并发安全、循环次数、成本/性能、模型自评或质量保证。 |
| CH44-REF-02 | REF-134 | [NISO CRediT：Contributor roles defined](https://credit.niso.org/contributor-roles-defined/) | 官方贡献角色标准页面 | 2026-07-17 | Investigation、Validation、Writing – original draft、Writing – review & editing、Supervision 等不同贡献责任；CRediT 描述贡献但不决定 authorship。 | Agent 协议、权限、出版流程、作者身份、质量保证，或任意技术书必须采用全部 14 个角色。 |
| CH44-REF-03 | REF-061 | [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 官方动态工程文章 | 2026-07-17 | task、trial、grader、transcript、outcome、evaluation harness 与 agent harness 的文章内定义；过程、结果和评价需分开的受限背景。 | 内容工厂标准、固定指标/阈值、评分器可靠性、单次高分、模型能力或章节事实正确。 |
| CH44-REF-04 | REF-135 | [W3C Recommendation：PROV-DM](https://www.w3.org/TR/prov-dm/) | W3C Recommendation | 2026-07-17 | Entity、Activity、Agent 与 generation、usage、derivation、attribution、association 等 provenance 概念。 | 本章已实现 PROV、来源真实、事实正确、授权/责任充分、审查独立、内容合规或可发布。 |
| CH44-REF-05 | REF-136 | [WAME：Chatbots, Generative AI, and Scholarly Manuscripts](https://wame.org/page3.php?id=106) | 学术出版组织建议 | 2026-07-17 | 在学术出版语境中，只有人类可作为作者；作者应说明生成式 AI 的使用并对相关材料、准确性和来源归属负责。 | 所有图书、组织、合同或司法辖区的法律规则；AI 使用披露格式、审批流程、版权结论或本章工作流。 |

## 来源到章节问题的映射

| 章节问题 | 主要来源 | 本书需要自行设计的部分 |
| --- | --- | --- |
| 固定流程还是动态 Agent？ | CH44-REF-01 | 各角色是否独立、哪些阶段可并行、版本失效和权限边界。 |
| 为什么研究、初稿、审阅、验证要分开？ | CH44-REF-02 | Research/Outline/Writing/Review/Fact Check 的输入、输出、禁止动作和停止条件。 |
| 怎样保存过程、结果与评价？ | CH44-REF-03 | Content Evidence Package、claim ledger、finding 与质量指标。 |
| 怎样表达输入、输出、派生与责任链？ | CH44-REF-04 | 章节专用字段、摘要策略、更新规则和与仓库文件的映射。 |
| 最终责任为何不能交给 Agent？ | CH44-REF-05 | 人工接受、退回、删减、披露、刷新和出版候选决定的记录格式。 |

## 仓库内案例来源

- 角色入口：`.ai/prompts/research.prompt.md`、`.ai/prompts/writing.prompt.md`、`.ai/prompts/review.prompt.md`、`.ai/prompts/fact-check.prompt.md`。
- 交接入口：`.ai/prompts/handoff.prompt.md`、`.context/HANDOFF.md`。
- 角色检查与事实边界：`.ai/review-checklist.md`、`.ai/research-policy.md`、`.ai/glossary.md`、`.ai/references.md`。
- 第 1 章教学输入：`docs/part-01-foundations/01-prompt-to-harness.research.md`、`.references.md`、`.outline.md`、`.md` 和 `.fact-check.md`。

这些路径只证明仓库存在可检查工件。文件存在不证明相应 Agent、模型、队列、权限、自动回流、独立审查、发布或外部效果已经发生。

## 全局引用映射

CH44-REF-01 至 CH44-REF-05 已分别映射 REF-029、REF-134、REF-061、REF-135 与 REF-136。复用条目保持原有产品或工程语境；新增条目不把贡献、溯源或学术出版建议扩写成 Agent 协议、事实保证或法律结论。

## 使用规则

- 不逐段翻译或拼接来源；只保留支撑角色、编排、评价、provenance 和责任边界所需的最小结论。
- CRediT 与 WAME 处于研究贡献/出版语境，只提供受限背景，不规定本书的 Agent 架构或法律责任。
- Anthropic 两篇文章是动态工程资料；First Draft、Technical Review 与 Fact Check 当天必须重读。
- PROV-DM 提供通用数据模型；除非后续确实实现并验证，不得把 Content Evidence Package 称为 PROV 兼容实现。
- 任何运行、Agent 调用、队列、并行、自动返工、审查、文件修改或出版结果只能由后续阶段的新鲜执行证据支持。

## 完成检查

- [x] 五项来源均为官方、标准或原始组织页面，并记录 2026-07-17 访问日期。
- [x] 每项来源均有允许用途和不可外推范围。
- [x] 角色标签、Agent 权限、内容工厂状态机和最终人类决定保持分层。
- [x] CH44-REF-01 至 CH44-REF-05 已映射到 REF-029、REF-134、REF-061、REF-135 与 REF-136，并与共享引用表一致。
- [x] 未引用客户案例、性能数字、固定阈值、模型排名或虚构运行结果。
