---
title: "第 42 章详细 Outline：Harness 的版本化、回滚和 A/B 测试"
chapter: "42"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章详细 Outline：Harness 的版本化、回滚和 A/B 测试

## 写作契约

### 本章要完成的学习目标

读者完成本章后应能：

1. 为 Prompt、Skill、工作流、模型/快照选择和评估规格建立不可变的 Harness Version Manifest，并说明版本号不能单独证明行为兼容。
2. 用 Compatibility Matrix 区分输入、输出、状态、工具、副作用和评价契约的兼容变化、迁移要求与停止条件。
3. 把固定任务集离线对照、有限灰度和线上 A/B 实验拆成证据强度不同的阶段，记录分配单位、干扰、指标和未覆盖项。
4. 设计 Release Decision Record 与 Rollback Runbook，区分“候选通过”“批准暴露”“实际生效”“触发回滚”和“验证恢复”。
5. 在虚构的上下文压缩策略案例中给出纯内存准入接口、图示断点和保守出口，而不声称模型调用、流量切分、监控或回滚已经发生。

### 读者、前置与明确边界

- **读者：** 已理解评估规格、受控自改进、安全门和成本/延迟指标，需要为 Harness 变更建立可比较发布机制的工程、测试和技术管理读者。
- **前置：** 第 17 章的 Evaluation Spec，第 20 章的 Candidate Change Protocol，第 34 章的 Skill 版本/弃用，第 39 章的测试与 Benchmark，第 40 章的资源记录，第 41 章的权限与审计。
- **本章负责：** 版本身份、兼容性、实验设计记录、有限暴露决定、守护指标、回滚计划与验证状态的责任边界。
- **本章不负责：** 真实模型调用、特征开关、流量分配、统计平台、监控、生产部署、权限授予、文件/Git/CI 修改、外部副作用回退或组织审批。所有 `ready`、`winner`、`rollback_requested` 都只是教学记录。

### 来源与本书模型的分层

| 使用位置 | 可归因材料 | 本章允许的有限陈述 | 本书原创内容 |
| --- | --- | --- | --- |
| 第 1、4 至 6 节 | CH42-REF-01 / REF-009 | Google SRE 的 canary 是部分、限时的变更暴露与评价，需要子集、评价流程和发布集成，并讨论分版本指标、隔离、暂停和回滚。 | Release Experiment、暴露阶段、守护指标表、状态和回滚路由。 |
| 第 1、2、7 节 | CH42-REF-02 / REF-014 | OpenAI 官方资料说明模型提示行为可能在快照间变化，并建议固定版本与运行应用 evals。 | Model Selection Record、快照字段、刷新条件和跨工件身份。 |
| 第 2、3 节 | CH42-REF-03 / REF-109 | SemVer 要求先声明 public API，并以主/次/补丁版本表达限定变化；已发布版本不可原地修改。 | Harness Version Manifest、Compatibility Matrix 及对自然语言契约的受限类比。 |
| 第 4、5、7 节 | CH42-REF-04 / REF-116 | Microsoft Research 论文讨论随机化单位、独立同分布假设和复杂随机机制造成的不可信分析风险。 | 实验单位记录、干扰检查、`not_comparable` 和本章案例的保守停止。 |

正文必须使用“Google SRE 的工程实践”“OpenAI 产品文档”“SemVer 规范”“Microsoft Research 论文”或“本书工程模型／虚构教学输入”标记层次。不得将来源写成 Agent 专用发布算法、固定阈值、跨产品兼容保证、真实权限或效果证明。

## 章节叙事与逐节蓝图

### 1. 为什么 Harness 变更比“改一个配置”更难回退

- **读者问题：** Prompt、Skill、工作流、模型和评估规则同时改变时，为什么一个提交 ID 或版本号不足以支持比较？
- **场景输入：** 虚构团队准备比较两种上下文压缩策略；任务集、模型快照、评估规格和成本口径都可能漂移。
- **来源边界：** REF-014 只说明模型快照行为可能变化与固定版本/evals 建议；REF-009 只提供小范围暴露与评价背景。
- **本书模型：** 以“变更身份、契约、评价、暴露、效果”五列展示每列的证据与禁止推论，标出 `versioned ≠ compatible`、`evaluated ≠ deployed`。
- **停止条件：** 无法识别基线、候选、任务集或模型/评估版本时，返回 `needs_version_evidence`，不比较分数。

### 2. Harness Version Manifest：版本身份必须覆盖所有会改变行为的输入

- **读者问题：** 一个可复现的 Harness 候选至少要记录什么？
- **来源边界：** REF-109 的 public API 与不可变发布只作契约沟通类比；REF-014 只支持模型/快照身份需要显式记录。
- **本书工件：** Manifest 字段包括 candidate ID、parent、Prompt/Skill/workflow 摘要、模型与快照、工具/数据依赖、Evaluation Spec、构建/生成方式、作者/所有者和不可变摘要。
- **最小证据：** 对比“只有版本号”“版本号+可变别名”“完整身份+摘要”三条输入，说明前两者为何不可回放。
- **停止条件：** 已发布身份被原地覆盖、依赖为未解析动态别名或摘要不匹配时，输出 `manifest_invalid`。

### 3. Compatibility Matrix：版本号背后的消费方契约

- **读者问题：** 自然语言与 Agent 行为难以完全枚举时，怎样仍然做有限的兼容性声明？
- **来源边界：** REF-109 只在已声明 public API 的软件范围定义 SemVer；不能直接给 Prompt 行为贴主/次/补丁标签。
- **本书工件：** 按消费者、输入、输出、状态、工具、权限/副作用、评估规格列出允许变化、破坏性变化、迁移、回退目标、验证证据与未知项。
- **最小证据：** 将“新增可选输出字段”“删除原因码”“更换模型快照”“改变工具权限”分成不同兼容类别。
- **停止条件：** 影响消费者未知、破坏性变化无迁移或回退目标不可用时，路由 `compatibility_review_required`。

### 4. Release Experiment：先固定问题，再选择离线、灰度或线上证据

- **读者问题：** 离线 Benchmark、canary 和 A/B 测试分别回答什么，为什么不能互相冒充？
- **来源边界：** REF-009 提供 canary 子集、评价与发布集成背景；REF-116 提供随机化单位和分析假设风险。
- **本书工件：** 记录基线/候选、任务集/流量范围、分配单位、指标、守护指标、样本/时段说明、干扰假设、停止条件、批准范围和证据版本。
- **证据层次：** 离线固定任务集可支持声明范围内的回归比较；有限暴露观察真实环境但可能污染；线上随机实验只有在分配与分析假设成立时才支持受限因果判断。
- **停止条件：** 前后时间比较冒充对照、分配单位不明、候选/对照共享关键状态或指标在看结果后改写时，输出 `not_comparable`。

### 5. 指标与决定：质量、安全、成本、延迟不能压成单一胜负

- **读者问题：** 候选更快或更便宜时，什么证据仍会阻止扩大暴露？
- **来源边界：** REF-009 只说明按候选/对照观察有归因价值的指标及隔离风险；REF-116 不提供本章固定统计阈值。
- **本书工件：** Release Decision Record 关联主要目标、质量/安全/成本/延迟守护指标、未覆盖项、决定、责任者、批准范围和刷新条件。
- **比较状态：** `candidate_better_on_declared_metric`、`guardrail_failed`、`not_comparable`、`needs_evidence`、`ready_for_limited_exposure`；禁止直接输出“全面更优”。
- **停止条件：** 质量门失败、安全未知、指标口径不一致、样本不足或未覆盖风险影响决定时，不进入暴露。

### 6. 有限暴露：批准、实际路由和观察是三件事

- **读者问题：** 怎样把灰度计划写成可审查入口，而不把 `approved` 当作已部署？
- **来源边界：** REF-009 的 canary 要求只提供工程背景；比例、阶段数和时长由项目策略决定，正文不造数字。
- **本书工件：** Exposure Plan 记录目标群体、隔离方式、时间/预算、可归因指标、停止条件、执行权限、观察入口和扩大/暂停/回退决定者。
- **责任断点：** `exposure_approved ≠ traffic_routed`、`traffic_routed ≠ outcome_observed`、`metric_green ≠ safe_for_all_populations`。
- **停止条件：** 无真实权限、无法区分候选指标、共享状态污染或停止动作不可用时，保持 `ready_for_review` 或 `blocked`。

### 7. 完整教学案例：两种上下文压缩策略的固定任务集对照

- **读者问题：** 如何在不调用真实模型的前提下，把版本、比较与回滚责任连起来？
- **教学输入：** `baseline-summary-v1` 与 `candidate-structured-summary-v2` 两个虚构 Manifest，共享注入的任务集、模型快照、Evaluation Spec 与费率/Token 口径快照。
- **处理路径：** 先检查 Manifest 与兼容矩阵，再检查任务集/指标口径与分配单位，形成离线对照记录。候选即使质量通过且资源改善，也只能得到 `ready_for_limited_exposure`；没有真实执行权限。
- **失败分支：** 任务集版本不同、模型别名漂移、共享记忆污染、质量守护失败、评估口径改变或回滚目标缺失分别进入补证、不可比较、拒绝或阻塞。
- **禁止推论：** 离线差异不证明线上用户效果，成本估算不等于账单，回滚字段不表示旧策略已恢复。

### 8. Rollback Runbook：从触发到验证恢复

- **读者问题：** 为什么“切回旧版本”不能直接写成“回滚成功”？
- **本书工件：** 记录已知良好目标、触发证据、权限/范围、操作前快照、计划步骤、回读对象、残留副作用、补偿候选、升级责任与停止条件。
- **状态机：** `rollback_requested → rollback_authorized → rollback_applied → rollback_verification_required → rollback_verified`；本章示例最多返回请求或待验证状态。
- **最小证据：** 对比只切换配置指针、重新观察实际路由、重新运行关键任务并登记残留记忆三种证据强度。
- **停止条件：** 旧版本不可解析、外部副作用不可逆、回读失败或恢复指标仍异常时，输出 `rollback_incomplete` 或 `escalated`。

### 9. 最小纯内存示例与图示计划

- **读者问题：** 如何把上述门做成可反驳的输入/输出契约，并在图上保留责任断点？
- **计划函数：** `assessHarnessReleaseExperiment(input)` 只读取 manifest、compatibility、baseline、candidate、evaluation、exposure、guardrails 与 rollback，返回保守状态和原因；不做 I/O。
- **计划测试：** 覆盖 Manifest 缺失、依赖漂移、破坏性变化无迁移、可比离线候选、任务集不一致、守护指标失败、有限暴露需批准、回滚目标缺失与回读未完成。
- **计划图示：** `Manifest → Compatibility → Offline Evaluation → Release Decision → Limited Exposure → Monitoring`，证据缺口、不可比较、拒绝、回滚请求和回读失败分支离开主链。
- **图示断点：** `candidate accepted ≠ released`、`rollback requested ≠ restored`、`A/B difference ≠ causal proof`。图源、导出物和视觉检查仅在对应阶段创建。

### 10. 渐进增强、反模式、总结与后续连接

- **渐进增强：** 真实模型调用需模型/数据契约和费率快照；真实 canary 需路由、隔离、权限、监控与停止；真实 A/B 需统计设计和隐私审查；真实回滚需执行后观察、残留效果和事件响应。
- **反模式：** 原地覆盖版本；只保存“最新”别名；用前后时间差冒充对照；看到结果后改指标；只优化成本/延迟；把批准写成生效；把切换指针写成恢复完成；删掉负向或不可比较结果。
- **总结：** 版本回答身份，兼容矩阵回答消费方契约，实验回答声明范围内的差异，决定记录回答谁依据什么放行，Runbook 回答如何回到已知目标并重新观察。
- **练习：** 为 Prompt 改动写 Manifest；为原因码删除写 Compatibility Matrix；找出一个前后比较中的混杂；为不可逆消息副作用补 Rollback Runbook；解释离线候选为何不能直达生产。
- **后续连接：** 第 43 至 45 章将把这些版本、审查与回退工件用于技术书工厂和跨 Agent 接力；不得将本章教学记录倒写为真实发布系统。

## 后续阶段的交付与验证契约

| 阶段 | 计划产物 | 不应提前声称的事实 |
| --- | --- | --- |
| First Draft | 原创正文、五类核心工件、压缩策略案例、状态与跨章节过渡。 | 模型、实验平台、监控、发布或回滚已运行。 |
| Technical Review | 重读 REF-009、REF-014、REF-109、REF-116，检查来源限定、术语和相邻章节责任。 | 来源提供统一算法、阈值、权限或兼容保证。 |
| Example Implementation | 纯内存 `assessHarnessReleaseExperiment`、最小测试和无副作用演示。 | 真实流量、模型、文件、Git、特征开关或回滚已执行。 |
| Diagram Review | Mermaid 源、导出图、替代文字、图文一致性和视觉审查。 | 图中状态等同外部系统状态或效果。 |
| Fact Check / Language / Final Review | 来源复读、事实表、术语/时态、实际验证和状态收口。 | 动态页面、测试结果或案例数据无需当日核验。 |

## Outline 完成检查

- [x] 覆盖 Harness Version Manifest、Compatibility Matrix、Release Experiment、Release Decision Record 与 Rollback Runbook。
- [x] 区分离线 Benchmark、有限灰度和线上 A/B 的证据强度，并保留分配/干扰/不可比较边界。
- [x] 将版本、兼容、评价、批准、实际暴露、观察、回滚请求和恢复验证的责任分开。
- [x] 每节均说明来源范围、本书模型、虚构教学输入、最小证据与停止条件。
- [x] 只使用 REF-009、REF-014、REF-109、REF-116 的受限范围，不造比例、时长、阈值、价格或效果。
- [x] 定义后续正文、纯内存示例、图示与审查契约；本阶段未声称它们已创建或运行。
