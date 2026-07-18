---
title: "附录 K：Glossary"
slug: "k-glossary"
status: "draft"
updated_at: "2026-07-17"
---

# 附录 K：术语表

> 本附录是面向读者的术语导航层。全书术语的权威定义保存在[共享术语表](../../.ai/glossary.md)；本页不复制全部定义，避免维护两份互相漂移的事实源。

## 怎样使用本附录

1. 先在下方主题索引中找到概念族和中英文搜索词。
2. 在[共享术语表](../../.ai/glossary.md)中搜索中文或英文精确名称，读取完整定义与“不等于什么”的边界。
3. 回到正文首次出现处，结合该章场景、来源和示例理解术语。
4. 若正文、本页和共享术语表不一致，以共享术语表为项目登记入口，并把冲突报告给维护者；不要直接复制一个定义覆盖另一个文件。

共享术语表中的多数 `Contract`、`Record`、`Package`、`Gate`、`Profile` 和 `Manifest` 是本书工程模型。名称相似不表示某个产品、SDK、协议或组织已经原生实现它们。

## 核心概念索引

下表只提供搜索键和阅读路线，不替代权威定义。

| 主题 | 建议先查的术语 | 用来回答什么问题 |
| --- | --- | --- |
| 基础角色 | Harness、Agent、上下文工程（Context Engineering） | 模型之外还有哪些运行责任，Agent 在哪里行动？ |
| 记忆与上下文 | 工作记忆（Working Memory）、长期记忆（Long-term Memory）、状态记录（State Record）、检查点（Checkpoint）、压缩记录（Compaction Record）、再水化（Rehydration） | 当前会话、可恢复状态和长期知识怎样区分？ |
| 可复用能力 | 技能（Skill）、技能契约（Skill Contract）、技能注册记录（Skill Registry Record）、质量等级（Quality Tier） | 一项能力怎样被发现、约束、测试和维护？ |
| 工具与效果 | 工具协议（Tool Protocol）、工具契约（Tool Contract）、调用请求（Invocation Request）、调用记录（Invocation Record）、结果信封（Result Envelope）、效果不确定性（Effect Uncertainty） | “请求已发送”“工具有返回”和“业务效果已验证”为什么不同？ |
| 环境与权限 | 环境契约（Environment Contract）、沙箱（Sandbox）、凭证（Credential）、最小权限（Least Privilege）、环境准入记录（Environment Admission Record） | 文件、命令、网络、身份、批准和结果验收各由谁约束？ |
| 证据与观察 | 证据单元（Evidence Unit）、证据卡（Evidence Card）、观察记录（Observation Record）、状态快照（State Snapshot）、新鲜度（Freshness）、推进性（Advancement） | 一条结论怎样回到来源、时间、范围和观察？ |
| 规划与执行 | 工作流契约（Workflow Contract）、任务契约（Task Contract）、所有权声明（Ownership Claim）、实现计划（Implementation Plan）、验证计划（Verification Plan） | 谁基于什么输入修改哪些路径，怎样停止和验收？ |
| 交付与集成 | 交付包（Delivery Package）、交接包（Handoff Package）、证据包（Evidence Package）、集成门（Integration Gate）、恢复门（Resume Gate） | 局部结果怎样交付，何时可进入共享状态，何时只允许领取下一任务？ |
| 评估与质量 | 评估规格（Evaluation Spec）、评分器（Grader）、证据矩阵（Evidence Matrix）、质量门（Quality Gate）、评估套件（Eval Suite）、回归测试矩阵（Regression Test Matrix） | 成功标准怎样绑定证据，什么缺口不能被平均分掩盖？ |
| 反思与恢复 | 反思记录（Reflection Record）、可证伪检查（Falsifiable Check）、恢复契约（Recovery Contract）、重试预算（Retry Budget）、补偿（Compensation）、升级记录（Escalation Record） | 失败后怎样补证、重试、补偿或交给人类，而不是盲目循环？ |
| 安全与治理 | Harness 威胁模型（Harness Threat Model）、不可信内容信封（Untrusted Content Envelope）、能力授予记录（Capability Grant Record）、工具安全门（Tool Security Gate）、审计事件信封（Audit Event Envelope） | 输入、能力、秘密、审计和事件响应如何保持不同责任？ |
| 版本与发布 | Harness 版本清单（Harness Version Manifest）、兼容性矩阵（Compatibility Matrix）、发布实验（Release Experiment）、发布决定记录（Release Decision Record）、回滚运行手册（Rollback Runbook） | 版本号之外还需要哪些兼容、实验、决定和恢复证据？ |
| 书籍生产 | 书籍契约（Book Contract）、章节契约（Chapter Contract）、阶段记录（Stage Record）、章节证据包（Chapter Evidence Package）、章节完成定义（Chapter DoD）、出版候选清单（Publication Candidate Manifest） | 一章从研究到完成需要哪些硬证据，出版决定又多了什么？ |
| 多角色内容工厂 | 角色契约（Role Contract）、内容证据包（Content Evidence Package）、版本化队列（Versioned Queue）、审查门（Review Gate）、事实核验门（Fact Check Gate）、返工信封（Rework Envelope） | Research、Draft、Review、Fact Check 与 Integration 怎样分工和回流？ |
| 跨工具接力 | 共享项目核心（Shared Project Core）、工具适配层（Tool Adapter Layer）、共享项目契约（Shared Project Contract）、工具适配档案（Tool Adapter Profile）、上下文读取协议（Context Read Protocol）、能力差异记录（Capability Difference Record）、状态冲突记录（State Conflict Record） | Codex、Claude Code 与人工接力时，哪些事实共享，哪些能力必须独立核验？ |
| 内容派生 | 内容原子（Content Atom）、来源锚点（Source Anchor）、学习路径契约（Learning Path Contract）、派生内容清单（Derivative Content Manifest）、发布适配档案（Publication Adapter Profile）、一致性门（Consistency Gate） | 书稿怎样派生为课程、博客或知识库，同时保留来源和版本身份？ |

## 容易混淆时查什么

| 读者疑问 | 在共享术语表中并排搜索 |
| --- | --- |
| “Agent 就是模型吗？” | `Agent`、`Harness` |
| “工作记忆和长期记忆谁更权威？” | `工作记忆`、`长期记忆`、`状态记录`、`新鲜度` |
| “工具返回成功，任务就完成了吗？” | `工具调用`、`结果信封`、`观察记录`、`质量门` |
| “沙箱、凭证和批准是不是同一层？” | `沙箱`、`凭证`、`最小权限`、`审批记录`、`环境准入记录` |
| “测试通过为什么还不能发布？” | `验证计划`、`证据包`、`集成门`、`发布决定记录` |
| “交付包与交接包有什么关系？” | `交付包`、`交接包`、`内容证据包`、`安全事件交接包` |
| “Integration Gate 与 Resume Gate 谁先？” | `集成门`、`恢复门`、`共享项目契约` |
| “章节完成和出版完成相同吗？” | `章节完成定义`、`章节证据包`、`出版候选清单` |
| “回归矩阵与回归测试矩阵相同吗？” | `回归矩阵`、`回归测试矩阵`、`兼容性矩阵` |

## 缩略词与书写约定

本表只给出展开形式。具体产品行为和本书边界仍以正文、来源及共享术语表为准。

| 缩略词 | 展开 | 本书中的使用提示 |
| --- | --- | --- |
| AI | Artificial Intelligence | 首次出现宜给出中文语境；不把 AI 当作单一产品或责任主体。 |
| API | Application Programming Interface | API 可用不等于调用已授权、已发送或效果已验收。 |
| CLI | Command-Line Interface | 命令名称、参数和版本必须按当前环境核验。 |
| E2E | End-to-End | 端到端证据必须说明真实起点、动作、观察和未覆盖范围。 |
| MCP | Model Context Protocol | 只在具体规范或产品来源支持的范围内描述，不把 Server 可见写成已授权。 |
| SDK | Software Development Kit | SDK 示例只代表对应版本和语言语境，不自动成为跨产品协议。 |
| UI | User Interface | UI 存在不等于用户路径已经交互验证。 |
| REF-NNN | Reference identifier | 本仓库的引用登记编号；不是来源自身编号或权威等级。 |

正文首次出现的中英文、缩略词、大小写和半角空格遵循 [STYLE_GUIDE.md](../../STYLE_GUIDE.md)。交接模板中的状态和字段名为接口值时保持代码样式，不自行翻译成新的状态。

## 术语维护边界

- 新术语或定义变更先进入[共享术语表](../../.ai/glossary.md)，同时记录理由并检查正文、图示、模板和示例。
- 本附录只在主题导航、搜索键或读者常见混淆发生变化时更新，不复制整张权威表。
- 章节中的局部解释可以更具体，但不得改变共享定义的责任边界。
- 产品、协议和标准采用其官方名称；本书工程模型必须明确标注，不能伪装成厂商原生对象。

来源编号和事实追溯方式见[附录 L](l-references.md)。
