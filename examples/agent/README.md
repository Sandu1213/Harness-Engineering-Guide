# Agent 示例

本目录包含随章节演进的可运行、无副作用教学示例。它们**不调用模型、网络、文件系统或真实密钥**；每个示例只证明其明确列出的确定性控制流，不能证明生产环境行为。

## 第 1 章：最小 Harness 任务闭环

第 1 章示例为 Research Brief 和第 28 章“从零搭建最小 Harness”提供最小闭环；其目的是把 Harness 的五个责任做成可观察接口：

1. **指令：** `instruction` 是任务约束的显式输入，并被记录到运行结果。
2. **状态：** `state` 只能是 `succeeded` 或 `failed`，`events` 保存已发生的步骤。
3. **工具：** `tool` 接收任务并返回成功或失败的结构化结果。
4. **验证：** `validate` 必须显式接受工具结果，成功状态才会被返回。
5. **证据：** `evidence` 和 `failure` 解释为何任务成功或失败。

### 运行前提

- 从仓库根目录运行，并已安装项目依赖。
- 本机能够执行 `node` 与 `npm`。
- 不需要网络、账户、密钥、环境变量或文件写入权限。

### 运行

在仓库根目录执行：

```bash
npm run example:harness
```

此命令应输出一个 `succeeded` 结果，其中工具输出为 `VERIFY STATE`，事件顺序为 `planned`、`tool_called`、`validated`。这只是接受路径的预期观察，不代表外部系统已经发生任何变化。

### 测试

```bash
npm run test:harness
```

测试覆盖：验证接受时的成功终态、工具失败时不声称已验证、验证拒绝时的失败终态，以及空指令在调用工具前被拒绝且不会触发工具。

### 边界与下一步

示例特意不包含模型调用、重试、持久化、并发、权限或外部 I/O；这些会在后续章节中以独立接口和验证要求加入。它证明的是最小 Harness 的控制流，不证明模型能力或生产可靠性。

关联资料：[第 1 章正文](../../docs/part-01-foundations/01-prompt-to-harness.md)、[Research Brief](../../docs/part-01-foundations/01-prompt-to-harness.research.md) 与[示例实现记录](../../docs/part-01-foundations/01-prompt-to-harness.example-plan.md)。

## 第 2 章：运行边界的最小 Harness

第 2 章示例使用注入的内存 Runtime，明确区分候选拒绝、Runtime 拒绝、验证拒绝与验证接受。它不模拟或访问真实 Sandbox；`permission denied` 只是一条确定性教学输入。

```bash
npm run test:runtime-boundaries
npm run example:runtime-boundaries
```

测试覆盖四条路径：越过允许路径的候选不会调用 Runtime；Runtime 拒绝不会调用验证器；验证可拒绝成功 Runtime 返回的观察；只有验证接受才能进入 `succeeded` / `validated`。演示入口只运行最后一条接受路径。

关联资料：[第 2 章正文](../../docs/part-01-foundations/02-agent-harness-runtime.md)、[示例实现说明](../../docs/part-01-foundations/02-agent-harness-runtime.example-plan.md) 与[示例整合记录](../../.memory/reviews/2026-07-15-chapter-02-example-integration.md)。

## 第 3 章：上下文恢复预检

第 3 章示例使用注入的内存快照，决定一项 Outline 任务能否领取。它只检查 Research 工件、当前状态、阶段表与历史摘要之间的确定性关系；不读取真实仓库、不访问网络、文件系统、进程、环境变量、账户或密钥。

```bash
npm run test:context-recovery
npm run example:context-recovery
```

测试覆盖五条路径：状态与进度一致时可领取任务；Research 工件缺失时阻塞；当前状态指向其他阶段时阻塞；状态与阶段表冲突时阻塞；历史摘要不能覆盖当前未完成状态。演示入口仅输出第一条可领取路径。

关联资料：[第 3 章正文](../../docs/part-01-foundations/03-repository-as-agent-context.md)、[示例实现说明](../../docs/part-01-foundations/03-repository-as-agent-context.example-plan.md) 与[示例整合记录](../../.memory/reviews/2026-07-15-chapter-03-example-integration.md)。

## 第 4 章：受控配置修改

第 4 章示例在内存快照中评估一项教学配置变更。它将允许键和范围、变更前值、模拟执行结果、验证、恢复建议与人工升级分开表示；不读写真实配置，不调用网络、进程、环境变量、账户或凭证。

```bash
npm run test:controlled-config-change
npm run example:controlled-config-change
```

测试覆盖五条路径：允许的可逆变更接受；不允许的键在预检时阻塞；观察值不匹配时给出恢复建议；不可逆动作未获批准时升级；模拟执行拒绝时不声称已经验证。演示入口只运行接受路径。

关联资料：[第 4 章正文](../../docs/part-01-foundations/04-reliable-agent-engineering-principles.md)、[示例实现说明](../../docs/part-01-foundations/04-reliable-agent-engineering-principles.example-plan.md) 与[示例整合记录](../../.memory/reviews/2026-07-15-chapter-04-example-integration.md)。

## 第 5 章：指令装配预检

第 5 章示例把项目规则、任务 Brief、数据上下文、输出契约和冲突策略建模为测试注入的内存对象。它只决定教学对象能否进入 `ready` / `assembled`，或因范围、输出契约、未知冲突而 `blocked`；不读取 `AGENTS.md`、`CLAUDE.md`、真实文件、环境变量、网络、账户、凭证或工具。

```bash
npm run test:instruction-packet
npm run example:instruction-packet
```

测试覆盖五条路径：正常装配；指令样式的数据仍保持数据身份；任务范围冲突；输出契约缺失；未知冲突策略。演示入口只运行第一条接受路径。它不模拟任何模型服从、供应商消息优先级、Prompt injection 防护、权限控制或真实代码审查。

关联资料：[第 5 章正文](../../docs/part-02-components/05-instructions-and-prompt.md)、[示例实现说明](../../docs/part-02-components/05-instructions-and-prompt.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-15-chapter-05-example-integration.md)。

## 第 7 章：Memory Record 决策

第 7 章示例只对测试注入的一条候选记录作确定性分类。`decideMemoryRecord` 输出工作记忆、长期候选、阻塞或刷新请求；它不读取或写入真实仓库、会话、数据库、网络、模型、时钟、账户、凭证或权限系统。

```bash
npm run test:memory-record-decision
npm run example:memory-record-decision
```

测试覆盖六条路径：当前观察进入工作记忆、跨任务经验仅成为候选、缺来源或观察时间阻塞、过期记录刷新、主体不匹配阻塞、跨任务候选缺少修订或撤销路径时阻塞。演示入口只输出第一条接受路径。它不能证明任何记录已经持久化、对模型可见、获授权共享、被检索或完成删除。

关联资料：[第 7 章正文](../../docs/part-02-components/07-working-memory-and-long-term-memory.md)、[示例实现记录](../../docs/part-02-components/07-working-memory-and-long-term-memory.example-plan.md) 与 [示例整合审查](../../.memory/reviews/2026-07-15-chapter-07-example-integration.md)。

## 第 8 章：Skill 选择

第 8 章示例只对测试注入的 Skill Contract、任务摘要、前置条件和选择证据做确定性判断。`evaluateSkillSelection` 输出 `selected`、`blocked`、`requires_approval` 或 `not_applicable`；不读取真实 Markdown 章节、规则或引用登记，不安装或发现真实 Skill，也不调用模型、Tool、Plugin、Hook、网络、文件、环境变量、时钟、账户、凭证或权限系统。

```bash
npm run test:skill-selection
npm run example:skill-selection
```

测试覆盖六条路径：只读选择、缺输入、缺前置条件、范围不匹配、写入请求升级和缺选择证据。演示入口只运行第一条接受路径。它不能证明真实审查已执行、文件可读、权限已获批、Skill 被发现或任何外部系统状态。

## 第 9 章：任务计划检查

第 9 章示例只对测试注入的 Plan Brief、任务卡与依赖快照做确定性判断。`assessTaskPlan` 输出 `ready`、`blocked`、`requires_approval` 或 `not_ready`；不生成计划、不安排任务，也不读取真实 API、文件、环境、凭证、网络、模型、Tool、账户或权限系统。

```bash
npm run test:task-plan-assessment
npm run example:task-plan-assessment
```

测试覆盖六条路径：独立只读任务与并行候选可准备、任务卡缺验收证据、任务依赖未完成、写入效果未获注入批准、并行任务共享资源，以及 Plan Brief 缺完成证据。演示入口只运行第一条没有并行候选的接受路径。它不能证明真实计划、授权、调度、API 测试或任何外部动作已经发生。

关联资料：[第 9 章正文](../../docs/part-02-components/09-planning-and-task-decomposition.md)、[示例实现记录](../../docs/part-02-components/09-planning-and-task-decomposition.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-15-chapter-09-example-integration.md)。

## 第 10 章：工作流状态迁移评估

第 10 章示例只对测试注入的 Workflow Contract、State Record、交接状态、观察和批准快照作确定性判断。`assessWorkflowTransition` 返回 `allowed`、`needs_evidence`、`blocked` 或 `requires_approval`；不保存状态、不调度任务、不重放检查点，也不调用模型、网络、文件、Git、CI、Tool、数据库、环境变量、凭证或权限系统。

```bash
npm run test:workflow-transition-assessment
npm run example:workflow-transition-assessment
```

测试覆盖合法迁移、终态重入、缺少 checkpoint、未知写入效果、过期批准、冲突交接、验证拒绝后的恢复与验证证据不足。演示入口只输出一条合法只读迁移的判断。它不证明真实工作流、审批、重试、恢复、审计、持久化或外部效果。

关联资料：[第 10 章正文](../../docs/part-02-components/10-workflow-and-state-management.md)、[示例实现记录](../../docs/part-02-components/10-workflow-and-state-management.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-10-example-integration.md)。

## 第 11 章：工具调用准入判断

第 11 章示例只对注入的 Tool Contract、Invocation Request、环境摘要、批准摘要和可选 Invocation Record 做确定性判断。`assessToolInvocation` 返回 `allowed`、`rejected`、`requires_approval`、`needs_evidence`、`blocked` 或 `effect_unknown`；不发现或调用真实工具，不执行 Schema 引擎、权限检查、批准流程、读写、回读或验收。

```bash
npm run test:tool-invocation-assessment
npm run example:tool-invocation-assessment
```

测试覆盖未知工具、缺必填参数、已知只读候选、写入缺批准、关联标识冲突、超时后的效果未知，以及工具成功但未验证。演示入口只输出一个已知只读候选的允许判断。它不证明真实 Tool、环境、批准、外部效果或任务验收。

关联资料：[第 11 章正文](../../docs/part-02-components/11-tool-use-and-tool-protocols.md)、[示例计划](../../docs/part-02-components/11-tool-use-and-tool-protocols.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-11-example-integration.md)。

关联资料：[第 8 章正文](../../docs/part-02-components/08-skills-and-reusable-capabilities.md) 与 [示例实现记录](../../docs/part-02-components/08-skills-and-reusable-capabilities.example-plan.md)。

## 第 12 章：环境准入判断

第 12 章示例以 `assessEnvironmentAccess` 评估注入的教学任务、Environment Contract、policy 与批准快照。它区分效果类别、目标范围、文件/网络边界、凭证作用域与批准要求，并返回准入候选、阻塞或需要批准；不读取真实环境、文件、网络、身份或密钥，也不执行任何动作。

```bash
npm run test:environment-sandbox-assessment
npm run example:environment-sandbox-assessment
```

测试覆盖允许的 dry-run、环境不允许写入、目标范围不匹配、测试写入候选、缺批准、批准环境不符、网络边界不符和凭证范围缺失八条路径。演示仅输出一项 `allowed` / `environment_admission_allowed` 教学判断。

关联资料：[第 12 章正文](../../docs/part-02-components/12-environment-sandbox-and-permissions.md)、[示例计划](../../docs/part-02-components/12-environment-sandbox-and-permissions.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-12-example-integration.md)。

## 第 13 章：检索证据筛选

第 13 章示例以 `assessRetrievalEvidence` 对注入的查询范围、候选证据和检索策略作确定性判断。它只证明候选能否进入教学 Evidence Card，不访问真实索引、网页、向量数据库、模型或企业知识库。

```bash
npm run test:retrieval-evidence-assessment
npm run example:retrieval-evidence-assessment
```

测试覆盖来源优先级、范围、新鲜度、稳定位置、引用回链和保守拒绝的七条非重复路径；演示输出 `allowed` / `evidence_selection_allowed`。

关联资料：[第 13 章正文](../../docs/part-02-components/13-knowledge-base-and-retrieval.md)、[示例计划](../../docs/part-02-components/13-knowledge-base-and-retrieval.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-13-example-integration.md)。

## 第 14 章：人工审批路由

第 14 章示例以 `assessHumanApprovalRoute` 对注入的行动卡、策略、审批快照和观察结果作路由判断。它将行动卡完整性、证据、效果未知、范围、批准与拒绝分开处理；不访问身份、审批服务、Tool、环境、时钟或外部系统。

```bash
npm run test:human-approval-routing
npm run example:human-approval-routing
```

测试覆盖自动候选、缺批准、缺行动卡字段、过期证据、效果未知、过期批准、范围不符、证据状态不符、匹配批准与明确拒绝十条路径。演示只输出 `allowed` / `auto_candidate`，不代表真实批准或执行。

关联资料：[第 14 章正文](../../docs/part-02-components/14-human-in-the-loop.md)、[示例计划](../../docs/part-02-components/14-human-in-the-loop.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-14-example-integration.md)。

## 第 15 章：观察快照评估

第 15 章示例以 `assessObservationSnapshot` 检查注入的行动、观察契约、当前快照与同一关联对象的前一快照。它只有在关联标识、目标、字段、新鲜度、效果状态和预期状态都符合教学契约时才返回 `observed`；不会启动浏览器、读取 DOM、调用日志或追踪服务。

```bash
npm run test:observation-snapshot-assessment
npm run example:observation-snapshot-assessment
```

测试覆盖字段缺失、关联或目标错配、不新鲜、未知效果、同一对象未推进、无关对象同指纹、未观察到预期状态与观察到预期状态。演示只输出 `observed` / `expected_state_observed` 教学判断，不代表真实 UI、点击、浏览器 E2E、外部效果或任务验收。

关联资料：[第 15 章正文](../../docs/part-03-intelligence-loop/15-observation-and-state-awareness.md)、[示例计划](../../docs/part-03-intelligence-loop/15-observation-and-state-awareness.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-15-example-integration.md)。

## 第 16 章：反思记录评估

第 16 章示例以 `assessReflectionRecord` 审查注入的失败轨迹、反思记录与候选检查状态。它将缺证、过期观察、范围扩大、检查失败和候选通过分开路由；它不执行真实根因分析、链接检查、长期记忆写入、规则修改或自动改进。

```bash
npm run test:reflection-record-assessment
npm run example:reflection-record-assessment
```

测试覆盖不完整轨迹、非失败轨迹、陈旧观察、不可证伪假设、范围扩大、未知检查、检查失败和检查通过。演示只输出 `candidate_for_validation` / `reflection_candidate_ready`，不代表根因已确认、经验已写入或 Harness 已改进。

关联资料：[第 16 章正文](../../docs/part-03-intelligence-loop/16-reflection-and-learning.md)、[示例计划](../../docs/part-03-intelligence-loop/16-reflection-and-learning.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-16-example-integration.md)。

## 第 17 章：评估规格质量门

第 17 章示例以 `assessEvaluationSpec` 对注入的任务、成功标准、证据和策略作质量门判断。必需标准的未知、缺失、范围不匹配或不新鲜证据只会要求补证；只有明确失败才会拒绝，可选项缺证或失败会要求复核。示例不运行真实 lint、链接检查、模型评分、CI、文件、网络或外部服务。

```bash
npm run test:evaluation-spec-assessment
npm run example:evaluation-spec-assessment
```

测试覆盖不完整规格、缺证、未知或缺失状态、范围或新鲜度不足、未校准模型评分、冲突记录及可选项分支。演示只输出 `accepted` / `evaluation_accepted`，表示注入教学记录满足质量门，不能证明真实文档、CI、模型校准、链接、用户路径或外部任务已完成。

关联资料：[第 17 章正文](../../docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md)、[示例计划](../../docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-17-example-integration.md)。

## 第 18 章：恢复决策评估

第 18 章示例以 `assessRecoveryDecision` 对注入的操作、失败、检查点和恢复策略作确定性路由。它会把未知失败或效果、已应用效果、补偿路径、重试预算和人工升级分开处理；不等待、不重试、不补偿、不调用网络，也不访问真实工作流、队列、数据库或 Tool。

```bash
npm run test:retry-recovery-assessment
npm run example:retry-recovery-assessment
```

测试覆盖不完整契约、未知观察、未知/非法/不可逆效果、不可重试失败、预算耗尽、安全重复、补偿与缺检查点等 13 条路径。演示仅输出 `retry` / `retry_allowed` 教学判断，不代表实际请求可安全重试或任何外部恢复已经发生。

关联资料：[第 18 章正文](../../docs/part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.md)、[示例计划](../../docs/part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-18-example-integration.md)。

## 第 19 章：压缩记录恢复预检

第 19 章示例以 `assessCompactionRecord` 审查注入的运行信息、压缩记录和保留策略。它检查目标与版本关联、稳定事实锚点、证据指针、丢弃理由和不确定项的损失检测；不读取真实对话、模型、文件、网络、时钟、外部记忆或工具结果。

```bash
npm run test:context-compaction-assessment
npm run example:context-compaction-assessment
```

测试覆盖缺契约、关联错配、版本错配、指针/锚点缺失、不确定锚点、无理由丢弃和可恢复记录等 9 条路径。演示输出 `ready_to_resume` / `compaction_record_ready`，只说明注入教学记录满足规则，不代表真实会话已经恢复或信息没有丢失。

关联资料：[第 19 章正文](../../docs/part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.md)、[示例计划](../../docs/part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-19-example-integration.md)。

## 第 20 章：候选改进变更门

第 20 章示例以 `assessImprovementChange` 对注入的改进候选、独立验证、批准、回滚和监控计划作确定性判断。它将“候选”“受控发布准备”和“真实发布”分开；不修改配置、不部署、不监控真实系统，也不运行长期任务。

```bash
npm run test:self-improvement-boundary-assessment
npm run example:self-improvement-boundary-assessment
```

测试覆盖候选不完整、独立验证失败或未知、范围错配、缺批准、回滚未就绪、监控计划缺失与受控发布准备等 10 条路径。演示输出 `ready_for_controlled_release`，不代表已经发布、运行、被监控、可回滚或拥有任何真实权限。

关联资料：[第 20 章正文](../../docs/part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.md)、[示例计划](../../docs/part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-20-example-integration.md)。

## 第 21 章：项目 Harness 可移植性预检

第 21 章示例以 `assessProjectHarnessPortability` 审查注入的共享仓库契约和产品适配声明。它检查规则、任务状态、验证、交接、来源日期、上下文非强制性和权限边界；不读取真实仓库、产品配置、账户、网络、文件或工具。

```bash
npm run test:project-harness-portability-assessment
npm run example:project-harness-portability-assessment
```

测试覆盖两个声明适配器共享同一契约、任务状态缺失、适配来源不完整、把上下文误作强制执行和权限边界缺失六条路径。演示输出 `portable` / `shared_contract_and_adapter_boundary_present`，只说明注入教学对象满足本书模型。

关联资料：[第 21 章正文](../../docs/part-04-engineering-practice/21-claude-code-and-codex-project-harness.md)、[示例计划](../../docs/part-04-engineering-practice/21-claude-code-and-codex-project-harness.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-21-example-integration.md)。

## 第 22 章：仓库规则包预检

第 22 章示例以 `assessRepositoryRuleLoading` 对注入的任务、Rule Record、当前状态和策略作确定性判断。它检查必要层、状态新鲜度、同层冲突、路径范围、元数据和退役规则；不解析真实 Markdown、文件、目录、产品会话、Hook、Sandbox 或权限。

```bash
npm run test:repository-rule-loading-assessment
npm run example:repository-rule-loading-assessment
```

测试覆盖完整规则包、缺层、状态未知、同层冲突、范围泄漏、元数据不全与退役规则七条路径。演示输出 `ready_to_load` / `rule_packet_ready`，不表示 Codex、Claude Code 或任何 Agent 已读取、遵守或执行规则。

关联资料：[第 22 章正文](../../docs/part-04-engineering-practice/22-agents-claude-and-repository-rules.md)、[示例计划](../../docs/part-04-engineering-practice/22-agents-claude-and-repository-rules.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-22-example-integration.md)。

## 第 23 章：自动化职责准入

第 23 章示例以 `assessAutomationWorkflowAdmission` 对注入的 Skill、Hook、Workflow 或 Automation 提案分类并检查最小边界。它要求明确触发、任务、输出、状态或检查点与失败策略，并将未批准写效果路由为人工批准；不安装或运行真实 Hook、CI、调度、Git、网络、文件或外部工具。

```bash
npm run test:automation-workflow-admission-assessment
npm run example:automation-workflow-admission-assessment
```

测试覆盖可聚焦 Skill、缺生命周期事件的 Hook、错误承担状态编排的 Hook、未批准写效果、缺状态/检查点的 Workflow、缺失败策略的 Automation、超出本章范围的 Tool、完整 Workflow 与完整 Automation 九条路径。演示输出 `ready` / `event_driven_check`，只说明注入教学提案满足本书边界。

关联资料：[第 23 章正文](../../docs/part-04-engineering-practice/23-skills-hooks-and-automation-workflows.md)、[示例计划](../../docs/part-04-engineering-practice/23-skills-hooks-and-automation-workflows.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-16-chapter-23-example-integration.md)。

## 第 24 章：MCP 接入准入

第 24 章示例以 `assessMcpIntegrationAdmission` 审查注入的 Server Profile、工具请求、环境范围、批准与观察计划。它要求来源、目标、scope 和效果验证计划完整，并把写入缺批准或不可信 annotations 路由为人工审核；不会连接 MCP、网络、进程、凭证或外部工具。

```bash
npm run test:mcp-integration-admission-assessment
npm run example:mcp-integration-admission-assessment
```

八项测试覆盖只读准备、写入缺批准、来源不明、目标或 scope 越界、缺观察、不可信 annotations 与未知效果类别。`ready` 只表示教学准入记录完整。

## 第 25 章：浏览器 E2E 证据链

第 25 章示例以 `assessBrowserE2EEvidence` 检查前快照、主点击、后快照与期望状态是否属于同一用户路径。它不启动浏览器、点击页面或验证真实 UI。

```bash
npm run test:browser-e2e-evidence-assessment
npm run example:browser-e2e-evidence-assessment
```

十项测试覆盖缺快照、未分派点击、目标错配、时序倒置、推断观察和状态不匹配。`observed` 仅表示注入的教学链完整。

## 第 26 章：任务隔离预检

第 26 章示例以 `assessTaskIsolation` 检查 owner、专属路径、验收、停止条件和共享工件请求。它不创建 Agent、进程、worktree、锁或消息。

```bash
npm run test:task-isolation-assessment
npm run example:task-isolation-assessment
```

十项测试覆盖所有者缺失、路径重叠、共享写入路由和结构不完整。`ready` 只表示教学任务契约可进入集成判断。

## 第 27 章：变更准入

第 27 章示例以 `assessGitChangeAdmission` 审查基线、路径范围、证据包、审查决定和集成条件。它不调用 Git、worktree、远端、PR、CI、merge 或回滚。

```bash
npm run test:git-change-admission-assessment
npm run example:git-change-admission-assessment
```

十二项测试只验证注入的教学变更契约，`ready` 不代表真实变更已被接受或合并。

## 第 28 章：最小 Harness 准入

第 28 章示例以 `assessMinimalHarnessAdmission` 检查任务、允许能力、停止条件和证据计划。它不调用模型、真实 Tool、文件、网络、环境变量、数据库或浏览器。

```bash
npm run test:minimal-harness-admission-assessment
npm run example:minimal-harness-admission-assessment
```

七项测试覆盖可进入内存求值器的输入与多个停止出口。`ready` 明确不等于已执行或已完成。

## 第 33 章：项目记忆健康检查

`assessProjectMemoryGraph` 检查注入的记忆节点、关系、来源、复核日期与同步边界；不会读取 Markdown、Obsidian 或同步服务。

```bash
npm run test:project-memory-health
npm run example:project-memory-health
```

七项测试覆盖完整图、缺来源、节点字段缺失、悬空关系、过期复核、未声明同步边界与外部执行请求。`ready_for_followup` 只代表教学图可进入隔离示例。

## 第 34 章：团队 Skill Library 准入

`assessTeamSkillAdmission` 评估注入的登记、契约、质量、兼容性与弃用字段；不发现、安装、发布或运行真实 Skill。

```bash
npm run test:skill-library-admission-assessment
npm run example:skill-library-admission-assessment
```

七项测试将缺所有者、缺契约、缺质量、写入、兼容性不明与弃用候选保守路由。`ready` 不表示真实 Skill 已授权或执行。

## 第 35 章：企业 Harness 准入

`assessEnterpriseHarnessAdmission` 只检查注入的控制面、租户边界、策略、预算、关联与升级字段；不会访问企业目录、策略引擎或其他外部系统。

```bash
npm run test:enterprise-harness-admission-assessment
npm run example:enterprise-harness-admission-assessment
```

九项测试覆盖边界、策略限制、预算、关联和外部执行请求。`ready` 只表示只读教学候选完整。

## 第 36 章：Harness 模式选择

`assessHarnessPatternSelection` 比较注入的 Pattern Card，只有完整的受控单循环可继续；事件、并发、写入和执行请求均要求人工批准。

```bash
npm run test:harness-pattern-selection-assessment
npm run example:harness-pattern-selection-assessment
```

八项测试不启动 Agent、工作者、队列、事件或并发。`ready` 不表示任何控制流已经运行。

## 第 37 章：Memory／Skill 边界

`assessMemorySkillBoundary` 路由注入的任务、证据、Skill、生命周期与执行字段；它不读取或保存记忆，也不发现或调用 Skill。

```bash
npm run test:memory-skill-boundary-assessment
npm run example:memory-skill-boundary-assessment
```

八项测试覆盖补证、刷新、跨项目复核、提议写入、弃用与执行边界。`ready_for_isolated_example` 不表示记忆已更新或外部动作已发生。

## 第 38 章：反馈—批准路由

`assessFeedbackApprovalRoute` 检查注入的证据、反思、候选、评估、风险、批准与回滚准备；它不执行检查、写入、批准或回滚。

```bash
npm run test:feedback-approval-route-assessment
npm run example:feedback-approval-route-assessment
```

八项测试覆盖证据、独立性、写入、外部执行、批准新鲜度、范围与升级记录。`ready_for_approval` 不表示已经批准或执行。

## 第 39 章：Harness 评估计划准入

`assessHarnessEvaluationPlan` 检查注入的评估套件、场景、试次、版本控制、评分结果与硬性门；它不运行模型、Harness、Benchmark、网络、文件或任何外部操作。

```bash
npm run test:harness-evaluation-plan-assessment
npm run example:harness-evaluation-plan-assessment
```

八项测试覆盖计划完整性、必需场景、试次记录、受控版本、硬性回归、不确定结果与外部执行请求。`ready_for_benchmark` 只表示教学计划可进入离线复核，不代表 Benchmark 已运行或候选优于基线。

关联资料：[第 39 章正文](../../docs/part-06-design-and-evaluation/39-harness-testing-strategy-and-benchmark.md)、[示例计划](../../docs/part-06-design-and-evaluation/39-harness-testing-strategy-and-benchmark.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-39-example-integration.md)。

## 第 40 章：资源优化比较准入

`assessResourceOptimization` 检查注入的资源预算、基线/候选观察、费率快照、缓存证据、依赖路径、重试预算与质量不降级门；它不调用模型、计费、缓存、批处理、并发、网络、文件或真实时钟。

```bash
npm run test:resource-optimization-assessment
npm run example:resource-optimization-assessment
```

八项测试覆盖缺观察、过期费率、单位错配、缓存命中证据、错误并行、重试超限、质量回归与可比较记录。`ready_for_comparison` 只表示教学记录可比较，不代表真实成本或延迟已经下降。

关联资料：[第 40 章正文](../../docs/part-06-design-and-evaluation/40-cost-latency-and-token-management.md)、[示例计划](../../docs/part-06-design-and-evaluation/40-cost-latency-and-token-management.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-40-example-integration.md)。

## 第 41 章：研究安全计划准入

`assessResearchSecurityPlan` 检查注入的威胁模型、不可信内容信封、能力授予、安全决定、秘密引用、工具/MCP 边界、审计链、供应链与事件交接；它不访问网页、模型、秘密、MCP、文件、网络、身份系统或真实安全工具。

```bash
npm run test:research-security-plan-assessment
npm run example:research-security-plan-assessment
```

13 项测试覆盖受保护资产、来源、恶意控制请求、任务目标、通配/额外能力、策略版本、敏感审计值、审计关联、凭证 audience、供应链来源和事件责任。`ready_for_read_only_review` 只表示教学计划可进入事实复核，不表示安全控制、权限、审计或事件响应已经执行。

关联资料：[第 41 章正文](../../docs/part-06-design-and-evaluation/41-security-permissions-and-audit.md)、[示例计划](../../docs/part-06-design-and-evaluation/41-security-permissions-and-audit.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-41-example-integration.md)。

## 第 42 章：Harness 发布实验准入

`assessHarnessReleaseExperiment` 检查注入的版本清单、兼容性、离线比较、守护指标、有限暴露与回滚记录；它不运行 Benchmark、模型、流量、监控、发布或回滚。

```bash
npm run test:harness-release-experiment-assessment
npm run example:harness-release-experiment-assessment
```

十一项测试覆盖 Manifest、依赖、兼容迁移、任务/指标可比性、共享状态隔离、守护指标、回滚目标/回读与批准边界。`ready_for_review` 不表示候选已发布或线上更优。

## 第 43 章：书籍章节完成准入

`assessBookChapterCompletion` 检查注入的 Chapter Contract、Research 至 Completion 阶段记录、来源/示例/图示/审查证据、仓库 Validation 与状态同步；它不读取真实仓库、不运行校验、不构建或发布书籍。

```bash
npm run test:book-chapter-completion-assessment
npm run example:book-chapter-completion-assessment
```

十九项测试覆盖固定阶段顺序、阶段状态、来源/示例/图示/审查硬缺口、Validation 新鲜度、状态漂移、Completion 和出版批准边界。`ready_for_completion_review` 只表示章节证据可进入终审；`chapter_complete` 也不表示整书可发布，所有路径均保持 `executionPerformed: false`。

关联资料：[第 43 章正文](../../docs/part-07-future/43-writing-a-technical-book-with-harness.md)、[示例计划](../../docs/part-07-future/43-writing-a-technical-book-with-harness.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-43-example-integration.md)。

## 第 44 章：内容生产接力审查

`assessContentProductionHandoff` 检查注入的六类 Role Contract、Versioned Queue、Content Evidence Package、Review/Fact Check 双硬门、冲突与返工、循环上限和 Human Decision；它不运行 Agent、队列、写作、审查、集成或出版。

```bash
npm run test:content-production-handoff-assessment
npm run example:content-production-handoff-assessment
```

十七项测试覆盖输入失效、来源冲突、双门、返工与人工决定。三条演示分别返回 `ready_for_human_review`、`needs_fact_resolution` 和 `stale_input`，所有路径均保持 `executionPerformed: false`。

关联资料：[第 44 章正文](../../docs/part-07-future/44-ai-technical-book-factory-research-writing-and-review-agent.md)、[示例计划](../../docs/part-07-future/44-ai-technical-book-factory-research-writing-and-review-agent.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-44-example-integration.md)。

## 第 45 章：跨工具接力恢复审查

`assessCrossToolHandoff` 检查 Shared Project Contract、Tool Adapter Profile、Context Read Protocol、Capability Difference、Handoff Package、State Conflict、Integration Gate 与 Resume Gate；它不启动 Codex、Claude Code、会话、权限、工具或外部执行。

```bash
npm run test:cross-tool-handoff-assessment
npm run example:cross-tool-handoff-assessment
```

十五项测试覆盖共享契约、适配差异、输入漂移、状态冲突、集成和恢复边界。演示返回 `ready_to_resume / cross_tool_handoff_ready / claim_next_task`，并固定 `executionPerformed: false`。

关联资料：[第 45 章正文](../../docs/part-07-future/45-codex-claude-code-handoff-and-long-term-context.md)、[示例计划](../../docs/part-07-future/45-codex-claude-code-handoff-and-long-term-context.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-45-example-integration.md)。

## 第 46 章：派生内容包审查

`assessDerivedContentPackage` 检查 Content Atom、Source Anchor、Learning Path Contract、Derivative Content Manifest、Publication Adapter Profile、Consistency Gate、Feedback Candidate Record，以及许可、版本、凭证/执行权限和出版批准边界；它不生成、预览、上传或发布真实课程、博客、FAQ 或知识库。

```bash
npm run test:derived-content-package-assessment
npm run example:derived-content-package-assessment
```

十七项测试覆盖来源、学习路径、派生清单、适配、一致性、反馈、许可、版本和批准边界。演示返回 `ready_for_preview_review / derived_content_evidence_ready / review_preview_candidate`，并固定 `executionPerformed: false`。

关联资料：[第 46 章正文](../../docs/part-07-future/46-books-to-courses-blogs-and-knowledge-bases.md)、[示例计划](../../docs/part-07-future/46-books-to-courses-blogs-and-knowledge-bases.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-46-example-integration.md)。

## 第 47 章：Agent Engineering 准备度审查

`assessAgentEngineeringReadiness` 检查任务、上下文、能力、状态、观察、评估、交接、风险责任和自治请求；它不运行模型、Tool、Agent、权限、安全控制、评估平台、批准、部署或发布。

```bash
npm run test:agent-engineering-readiness-assessment
npm run example:agent-engineering-readiness-assessment
```

十一项测试覆盖缺契约、上下文过期、能力边界、效果未知、独立观察、评估可比性、交接漂移、具名责任和自治收益。演示最多返回 `ready_for_bounded_pilot_review`，并固定 `executionPerformed: false`。

关联资料：[第 47 章正文](../../docs/part-07-future/47-agent-engineering-future-and-conclusion.md)、[示例计划](../../docs/part-07-future/47-agent-engineering-future-and-conclusion.example-plan.md) 与 [示例整合记录](../../.memory/reviews/2026-07-17-chapter-47-example-integration.md)。
