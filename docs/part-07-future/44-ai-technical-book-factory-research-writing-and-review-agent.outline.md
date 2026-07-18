---
title: "第 44 章详细 Outline：AI Technical Book Factory"
chapter: "44"
status: "completed"
updated_at: "2026-07-17"
---

# 第 44 章详细 Outline：AI Technical Book Factory

## 写作契约

### 本章要完成的学习目标

读者完成本章后应能：

1. 为 Research、Outline、Writing、Review、Fact Check 与 Human Author/Editor 分别写出目标、允许输入、专属输出、禁止动作和停止条件，而不是用角色名称替代责任边界。
2. 设计 Content Evidence Package，将输入版本、输出工件、claim 与来源、运行证据、review finding、事实判定、冲突和人工决定连接为可回放交接。
3. 为固定阶段、并行只读任务、Review/Fact Check 双门、输入失效和最大返工次数选择保守路由，并说明何时必须停止自动循环。
4. 区分角色输出、审查意见、事实判定、质量指标和人类接受决定，防止任一分数或 Agent “通过”冒充出版责任。
5. 用三条教学案例、纯内存准入器和一张生产回流图解释本书模型，同时明确没有真实 Agent、模型、队列、文件写入、外部审查或出版发生。

### 读者、前置与相邻章节边界

- **读者：** 需要组织技术书、课程或大型知识内容生产的技术作者、编辑、工程师和 AI 工作流设计者。
- **前置：** 第 13 章来源检索、第 14 章人工责任、第 17 章可验证结果、第 26 章多 Agent 隔离、第 38/39 章反馈审批与评估、第 43 章 Book Harness。
- **本章负责：** 内容角色契约、claim 级证据交接、Review/Fact Check 双门、版本化队列、有界返工、质量指标和作者最终责任。
- **本章不负责：** 重新定义 Book Contract、Chapter DoD 或 Publication Candidate（第 43 章）；通用任务/路径隔离（第 26 章）；一般评估/审批 Pattern（第 38/39 章）；Codex/Claude Code 产品适配和跨工具恢复（第 45 章）。
- **外部边界：** 不启动真实 Agent、模型调用、子进程、队列、浏览器、网络写入、Git、文件自动修改、编辑批准、版权判断或出版分发。

### 来源、仓库工件与本书模型分层

| 使用位置 | 来源或证据 | 允许的有限陈述 | 本书原创内容 |
| --- | --- | --- | --- |
| 第 1、3、5、7 节 | CH44-REF-01 | 预定义 workflow 与动态 agent 的文章内区分；prompt chaining、parallelization、orchestrator-workers、evaluator-optimizer 的适用背景。 | 内容工厂阶段、队列项、版本失效、回流状态和循环上限。 |
| 第 1、2 节 | CH44-REF-02 | Investigation、Validation、Writing – original draft、Writing – review & editing、Supervision 可作为不同贡献责任描述，且 CRediT 不决定 authorship。 | 六类角色契约、权限/禁止动作和交接责任。 |
| 第 4、6、8、10 节 | CH44-REF-03 | task、trial、grader、transcript、outcome 与两类 harness 的文章内区分。 | claim ledger、finding/verdict、质量指标、纯内存准入器的字段和路由。 |
| 第 4、5、9 节 | CH44-REF-04 | Entity、Activity、Agent 及 usage、generation、derivation、attribution、association 等 provenance 概念。 | Content Evidence Package、版本摘要、派生链和受影响范围重开规则。 |
| 第 2、8、9 节 | CH44-REF-05 | 在学术出版语境中，只有人类可作为作者，使用生成式 AI 应透明说明，人类对相关材料、准确性和来源归属负责。 | Human Decision Record、章节集成门和本书的人工最终责任规则。 |
| 第 2、9 节 | 当前仓库 `.ai/prompts/*` 与第 1 章阶段工件 | 仓库存在分开的研究、写作、审查、事实核验、交接入口和可检查章节文件。 | 把现有文件组装成教学交接；不声称多角色生产线曾实际运行。 |

全局 REF 编号仍待主线程分配。Outline 和后续草稿在正式映射前只使用 `CH44-REF-*` 本地键，不虚构编号。正文必须用“来源明确表达”“仓库当前存在”“本书建议”和“虚构教学输入”区分证据层次。

### 三条贯穿案例

| 案例 | 教学输入 | 要验证的机制 | 禁止结论 |
| --- | --- | --- | --- |
| **CASE-44-A：正常交接** | 第 1 章现有 Research、References、Outline、Draft 和 Fact Check 路径的只读摘要。 | claim 从 Source Card 经 Outline/Writing 到 Review/Fact Check，并形成 `ready_for_human_review`。 | 第 1 章曾由本章工厂重跑、Agent 实际执行或人工重新批准。 |
| **CASE-44-B：来源越界** | 写作者把“评价标准清晰时可使用反馈循环”的来源边界扩写为“多 Agent 审稿能保证事实正确”的虚构候选句。 | Review 创建 must-fix；Fact Check 返回 `reject`；Writing 删除或缩小 claim，旧判定不得静默覆盖。 | 该错误真实出现在某章，或 Fact Check 自动修复并批准了正文。 |
| **CASE-44-C：过期输入** | Review 正在检查 Draft v1，但 Research/Outline 变化后 Writing 已形成 Draft v2 的虚构版本记录。 | v1 finding 标记 `stale_input`，只重开受影响链；影响范围不明时转人工决定。 | 真实并发、文件锁、消息队列、Git 合并或审查者会话已经发生。 |

## 章节叙事与逐节蓝图

### 1. 多一个 Agent 为什么不等于多一份证据

- **要回答的问题：** 将研究、写作和审查分成多次模型调用后，为什么仍可能共享同一错误假设并放大幻觉？
- **开场场景：** 同一来源摘要依次被三个“角色”复述，最终得到三份相互同意却无法回到原始来源的文本。
- **来源边界：** CH44-REF-01 只提供编排模式和先采用简单方案的工程背景；CH44-REF-02 只支持贡献责任可分开描述，不证明 Agent 独立或更可靠。
- **本书模型：** 以“不同角色名、不同输入版本、不同评价标准、不同证据来源、不同决定责任”五列检查角色分离是否真实。提出 `more_agents ≠ independent_evidence`。
- **案例路由：** CASE-44-A 展示有证据交接；CASE-44-B 展示多个角色若都依赖同一越界摘要仍会共同出错。
- **预期验证：** 读者能指出什么时候单一 workflow 已足够，什么时候拆角色才增加可检查责任；本节不提供性能或质量数字。
- **过渡：** 只有先定义角色能读什么、写什么和何时停止，后续证据包才有可信生产者。

### 2. Role Contract：把贡献角色变成受限工作接口

- **要回答的问题：** Research、Outline、Writing、Review、Fact Check 和 Human Author/Editor 各自应负责什么，又必须拒绝什么？
- **来源边界：** CH44-REF-02 只提供调查、验证、初稿、审阅和监督等贡献分类背景，且明确不决定 authorship；CH44-REF-05 只提供学术出版中的人类作者责任背景。
- **本书工件：** Role Contract 字段为 `roleId`、`objective`、`inputVersion`、`allowedInputs`、`ownedOutputs`、`forbiddenActions`、`acceptanceChecks`、`stopConditions`、`handoffTarget`。
- **角色断点：** Research 不写完整正文；Outline 不新增事实；Writing 不扩大来源结论；Review 不把偏好冒充事实错误；Fact Check 不优化文风；Human Author 不把 Agent 通过当作责任转移。
- **仓库案例：** 将 `.ai/prompts/research.prompt.md`、`writing.prompt.md`、`review.prompt.md`、`fact-check.prompt.md` 和 `handoff.prompt.md` 只作为现有入口映射，不声称它们是权限系统或已被执行。
- **三案例检查：** CASE-44-A 验证每个输出有 owner；CASE-44-B 验证 Writing 无权自行关闭越界；CASE-44-C 验证 Review 输入版本属于契约。
- **预期验证：** 给定一个角色输出，读者能定位其允许输入、禁止声明和下一责任人；缺任何关键字段即 `needs_role_contract`。

### 3. 固定 workflow、并行任务与动态调度如何选

- **要回答的问题：** 章节阶段已知时，为什么不应默认使用动态 orchestrator；哪些工作可安全并行？
- **来源边界：** CH44-REF-01 支持固定 prompt chaining、并行 sectioning、orchestrator-workers 与 evaluator-optimizer 的有限模式背景，不规定本章架构。
- **本书路由：** 已知 Research → Outline → Writing → Review/Fact Check 顺序使用显式 workflow；独立 Source Card 或对固定 Draft 的不同只读检查可并行；无法预知子任务且收益可验证时才形成动态调度候选。
- **并行条件：** 输入版本固定、专属输出不重叠、共享工件只读、结果有集中集成者、失败不隐藏、失效条件明确。
- **与第 26 章边界：** 本节只把通用 Task Contract/Integration Gate 应用于内容角色，不重复 worktree、路径锁或协作协议设计。
- **案例路由：** CASE-44-C 说明“可并行”不等于旧 Draft 的 Review 可继续；上游变化会使队列项失效。
- **预期验证：** 读者能把一个候选步骤路由为 `sequential_stage`、`parallel_read_only`、`dynamic_candidate` 或 `blocked`，且不推断真实并发安全。

### 4. Content Evidence Package：交接 claim、版本和未决项

- **要回答的问题：** 角色交接为什么不能只给下一角色一份 Markdown 或一句“已完成”？
- **来源边界：** CH44-REF-04 只提供 provenance 的通用实体、活动、Agent 和派生关系；CH44-REF-03 只用于说明任务、轨迹、结果和评价应分开保存。
- **本书工件：** Package 包含 `packageId/taskContractVersion`、`inputArtifacts`、`outputArtifacts`、`claimLedger`、`executionEvidence`、`reviewFindings`、`factVerdicts`、`conflictsAndUnknowns` 与 `humanDecision`。
- **派生链：** Source Card → Outline section → Draft claim → Review finding / Fact verdict → Revision → Human decision；每个箭头保存输入/输出版本和允许用途。
- **证据强度：** 路径存在只证明工件可检查；摘要不证明来源；lint 不证明事实；grader 不证明作者接受；provenance 不证明内容正确。
- **三案例检查：** CASE-44-A 形成完整 claim 链；CASE-44-B 把来源允许范围带到事实判定；CASE-44-C 通过摘要识别 v1/v2 派生分叉。
- **预期验证：** 读者可以从任一 Draft claim 回到来源、生成活动、审查状态和未决项；断链输出 `needs_evidence`。

### 5. Versioned Queue：让排队、并行和失效可见

- **要回答的问题：** 上游研究或提纲改变后，排队中的写作和审查怎样避免继续处理旧输入？
- **来源边界：** CH44-REF-01 只提供并行与工作流背景；CH44-REF-04 只提供实体派生和活动关联语义。Queue Item、失效和重开规则是本书模型。
- **Queue Item：** `itemId`、`role`、`inputArtifactVersion`、`ownedOutput`、`dependsOn`、`invalidationCondition`、`attempt`、`status`、`integrationOwner`。
- **状态：** `queued`、`in_progress`、`delivered`、`stale_input`、`needs_rework`、`needs_human_decision`；这些是教学状态，不表示真实队列实现。
- **失效规则：** 上游语义变化使相关下游项失效；仅格式变化且派生摘要未变时可以保留，但影响无法可靠界定则重审整个工件。
- **案例路由：** CASE-44-C 将 v1 Review 产物标记为 `stale_input`，保留其历史但禁止合并到 v2；CASE-44-A 展示固定输入上的正常交付。
- **预期验证：** 读者能根据版本和派生关系决定局部重开或全量重审，不以最后修改时间或 Agent 自信替代影响判断。

### 6. Review Gate 与 Fact Check Gate：两种问题、两份判定

- **要回答的问题：** 技术审查和事实核验为什么不能合并成一个“质量分”或同一角色的一句通过？
- **来源边界：** CH44-REF-01 的 evaluator-optimizer 只提供生成—反馈循环背景；CH44-REF-03 的 grader/transcript/outcome 区分只支持分开记录评价、过程和最终状态。
- **Review Gate：** 检查目标、结构、读者路径、工程边界、示例/图示计划和来源使用方式，输出带位置、严重度、理由、责任角色和关闭证据的 finding。
- **Fact Check Gate：** 对每个可归因 claim 返回 `supported`、`narrow`、`reject` 或 `unknown`，记录直接支持程度、访问日期和来源版本；链接可访问不是 `supported`。
- **独立性问题：** 是否固定 Draft 版本、是否使用明确 checklist、是否复用了候选的未核验假设、是否保留未覆盖范围。同一模型可分时承担角色，但“换 Prompt”不能自动证明独立性。
- **案例路由：** CASE-44-B 的 Review finding 和 Fact verdict 分开保存；Writing 只能根据明确路由缩小或删除，不能把修辞优化当作事实关闭。
- **预期验证：** `review_passed ≠ facts_verified`，且两门都通过仍只进入证据包，不等于人工接受或发布。

### 7. Conflict Router：冲突分类、有界返工与停止

- **要回答的问题：** 来源、角色意见或版本冲突出现时，应该回到哪里，何时必须停止自动循环？
- **来源边界：** CH44-REF-01 只提供反馈循环适用条件和停止边界背景；具体冲突类别、次数上限和路由均为本书设计。
- **冲突类别：** `source_conflict` 回 Research；`scope_overreach` 回 Writing/Fact Check；`structure_conflict` 回 Outline/Human Author；`stale_input` 回版本准入；`review_fact_disagreement` 保存双方标准与证据；`cycle_exhausted` 转人工。
- **返工信封：** finding/conflict ID、目标角色、允许修改范围、固定输入版本、预期关闭证据、剩余循环预算和升级对象。
- **停止条件：** 来源权威性无法判断、事实解释/伦理/版权争议、影响面未知、最大循环耗尽、自动角色要求扩大范围或删除异议记录时，输出 `needs_human_decision`。
- **案例路由：** CASE-44-B 最多经过 Fact Check → Writing → 重审；CASE-44-C 不把旧 finding 自动迁移到新 Draft；无法判定影响时直接升级。
- **预期验证：** 任何回流都有明确问题和关闭证据；不存在“再生成一次看看”的无界箭头。

### 8. Quality Signals 与 Human Decision：指标不能承担作者责任

- **要回答的问题：** claim 覆盖率、finding 重开率、返工次数和 grader 结果能说明什么，为什么不能合成自动出版分？
- **来源边界：** CH44-REF-03 只支持任务、试次、轨迹、结果与评分器分层的工程背景；CH44-REF-05 只支持学术出版中人类作者责任和透明说明的有限背景。
- **诊断指标：** claim 来源覆盖、stale-input、finding 重开、`reject/unknown` claim、返工停留和人工退回原因；每项旁边写出不能证明的结论。
- **硬性门：** 来源缺失/越界、版本漂移、must-fix 未关闭、`reject/unknown` 未处理、真实运行证据缺失、具名责任人缺失不能被平均值抵消。
- **Human Decision Record：** 决定者、接受范围、已读证据、保留问题、披露、决定、理由和刷新条件。它可输出 `accepted_for_integration`、`returned_for_rework`、`deferred` 或 `rejected`，不授予发布权限。
- **三案例检查：** CASE-44-A 也必须等待人类决定；CASE-44-B 不能因其他指标好而保留越界 claim；CASE-44-C 不能用新 Draft 的分数挽救旧 Review。
- **预期验证：** `facts_verified ≠ publication_approved`，章节集成仍需第 43 章的 Chapter DoD 和全仓质量门。

### 9. 三案例合流：同一生产线的成功、退回与失效路径

- **要回答的问题：** 正常交接、来源越界和过期输入如何使用同一组工件，却得到不同的保守出口？
- **CASE-44-A：** 只读第 1 章阶段工件 → 生成教学 Source Card/Claim Candidate → 映射 Outline/Draft → 两门无阻塞 → Content Evidence Package 完整 → `ready_for_human_review`。不声称工件被真实 Agent 生成或重新审查。
- **CASE-44-B：** 候选句越过 CH44-REF-01 的允许范围 → Review must-fix + Fact `reject` → 返工信封限定修改 claim → 删除/缩小后重开两门 → 仍由人类选择接受或延期。
- **CASE-44-C：** v1 Review 与 v2 Draft 摘要不一致 → Queue Item `stale_input` → 计算受影响 claim/finding → 无法确定影响则 `needs_human_decision`，不执行自动合并。
- **案例对照表：** 为三案列出输入版本、角色、来源、finding/verdict、回流、停止条件、人工责任和不能主张的事实。
- **来源边界：** CH44-REF-04 只用于解释派生/关联记录；CH44-REF-05 只用于解释人类责任背景。案例状态和结果均为本书模拟。
- **预期验证：** 读者能对每案指出“模型记录”“模拟判定”和“真实执行证据”分别在哪里，且不会把教学路径写成仓库历史。

### 10. 最小纯内存示例、图示和渐进增强

- **要回答的问题：** 如何把本章硬门和回流做成可测试接口，而不模拟真实 Agent、编辑或出版系统？
- **计划函数：** `assessContentProductionHandoff(input)` 只读取注入的 `roleContracts`、`artifactVersions`、`claimLedger`、`reviewFindings`、`factVerdicts`、`conflicts`、`cycleState` 和 `humanDecision`。
- **计划输出：** `not_applicable`、`needs_role_contract`、`needs_evidence`、`stale_input`、`needs_revision`、`needs_fact_resolution`、`needs_human_decision`、`ready_for_human_review` 或 `ready_for_chapter_integration`。最后一项仍不表示 Chapter DoD、出版批准或外部效果。
- **计划测试：** 非法输入；缺角色契约；claim 无来源；版本漂移；must-fix 未关闭；Fact `reject/unknown`；循环耗尽；证据完整但无人类决定；具名决定接受后进入章节集成。只断言公开输出，不检查私有实现。
- **计划演示：** 使用 CASE-44-A/B/C 的最小注入对象各运行一次；预期分别路由到人工审查、事实/写作返工和过期输入。Example 阶段才创建文件、测试和 npm 入口并记录真实结果。
- **计划图示：** 后续 Mermaid 源暂定 `diagrams/mermaid/chapter-44-ai-book-factory-flow.mmd`，表达 Chapter Contract → Research → Outline → Writing → Frozen Draft → Review/Fact Check → Conflict Router → Content Evidence Package → Human Decision → Chapter Integration；各失败分支回到负责角色。
- **图示断点：** `role_output_exists ≠ accepted`、`review_passed ≠ facts_verified`、`facts_verified ≠ publication_approved`、`more_agents ≠ independent_evidence`。Diagram Review 阶段才创建、导出、查看并比较图源。
- **渐进增强：** 纯内存准入器之后，真实工厂还需身份/权限、持久队列、锁与幂等、隐私/版权、模型与来源版本、可观测性、人工编辑工作台、构建/发布回读；本章不实施。

## 模型、模拟与真实执行证据的分界

| 层次 | 本 Outline 可以提供 | 进入正文后仍不能声称 |
| --- | --- | --- |
| **来源背景** | 五项来源的限定命题和外推禁区。 | 来源规定本书角色、状态、质量阈值或出版流程。 |
| **本书模型** | Role Contract、Content Evidence Package、Queue Item、Conflict Router、Human Decision Record。 | 这些工件已被某产品实现、授权或运行。 |
| **纯内存模拟** | 后续用注入对象测试保守路由的计划。 | Agent、模型、文件、网络、队列、审批或出版实际发生。 |
| **真实执行证据** | 仅能由后续阶段实际命令、退出码、工件 diff、来源复读和人工记录提供。 | 历史校验、计划结果或示例名称可以替代当轮证据。 |

## 后续阶段交付与验证契约

| 阶段 | 计划产物 | 不应提前声称的事实 |
| --- | --- | --- |
| First Draft | 原创正文、六角色契约、证据包、队列/双门/冲突、三案例和责任边界。 | Agent、模型、自动返工、真实审查或出版已运行。 |
| Technical Review | 重读五项来源，核对第 26、38、39、43、45 章边界和仓库路径。 | 来源提供本章完整工厂设计或动态页面永久稳定。 |
| Example Implementation | 纯内存 `assessContentProductionHandoff`、最小测试与无副作用演示。 | 真实角色被调度、文件被修改、人工决定或 Chapter DoD 已发生。 |
| Diagram Review | Mermaid 源、导出图、视觉检查和正文一致性。 | 图中队列、回流、Agent 或 Gate 是运行系统。 |
| Fact/Language/Final | claim 级来源复核、术语/时态、运行证据和主线程共享状态收口。 | 局部通过等于全仓通过、章节完成或全书出版。 |

## Outline 完成检查

- [x] 逐节按读者问题组织，并为每节标出来源边界、本书模型、案例、失败出口和预期验证。
- [x] 覆盖 Research、Outline、Writing、Review、Fact Check 与 Human Author/Editor 六类角色契约。
- [x] 覆盖 Content Evidence Package、版本化队列、双审查门、Conflict Router、质量指标和人工决定。
- [x] CASE-44-A/B/C 分别验证正常交接、来源越界和过期输入，且不冒充仓库历史或真实执行。
- [x] 为纯内存示例与 Mermaid 图定义输入、输出、测试、断点和未运行范围。
- [x] 与第 26、38、39、43、45 章责任边界清晰，全局引用仍待主线程分配。
- [x] 只建立写作蓝图；正文、示例、测试、图源、导出图、Agent、模型、队列、审查和出版均未实施。
