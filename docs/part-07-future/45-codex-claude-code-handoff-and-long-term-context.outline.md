---
title: "第 45 章详细 Outline：Codex、Claude Code 接力与长期项目上下文"
chapter: "45"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章详细 Outline：Codex、Claude Code 接力与长期项目上下文

## 写作契约

### 本章要完成的学习目标

读者完成本章后应能：

1. 把长期项目上下文拆成 Shared Project Core 与 Tool Adapter Layer，避免让关键状态只存在于聊天、auto memory 或某一工具配置中。
2. 为 Codex 与 Claude Code 分别记录官方指令入口、subagent/会话能力、权限、配置和未知项，而不虚构共同产品协议。
3. 使用 Context Read Protocol、Task Contract、Handoff Package、Capability Difference Record、State Conflict Record 和 Resume Gate 完成可审查接力。
4. 区分会话恢复、subagent 完成、局部测试、集中集成、全仓验证和外部效果，不让局部状态冒充全局完成。
5. 在虚构章节接力案例和纯内存准入器中给出状态冲突、能力差异、输入漂移与人工决定出口。

### 读者、前置与明确边界

- **读者：** 使用多种 AI 编程/写作工具维护长期仓库，需要跨会话、跨人员或跨工具接力的工程与技术内容团队。
- **前置：** 第 21/22 章项目 Harness 与仓库规则，第 26 章任务隔离，第 43/44 章 Book Harness 与多角色工厂。
- **本章负责：** 共享项目核心、产品适配声明、读取顺序、局部所有权、验证证据、交接、冲突和恢复准入。
- **本章不负责：** 启动真实 Codex/Claude Code、迁移账户、同步隐藏上下文、创建 worktree、安装工具、授予权限、自动合并或发布。

### 产品来源与本书模型分层

| 使用位置 | 来源 | 允许的有限陈述 | 本书原创内容 |
| --- | --- | --- | --- |
| 第 2、4 节 | REF-140 | Codex `AGENTS.md` 的仓库指导、常见内容和层级语境。 | Codex Adapter Profile 与 Shared Project Contract 映射。 |
| 第 5、8 节 | REF-141 | Codex subagent 可并行独立工作、主线程收集结果的当前产品语境。 | Task Contract、局部交付包和集中 Integration Gate。 |
| 第 2、3 节 | REF-142 | Claude Code `CLAUDE.md`、规则与 auto memory 的产品特定入口。 | Claude Code Adapter Profile 和仓库事实优先规则。 |
| 第 3、5 节 | REF-143 | Claude Code 会话恢复、worktree 并行和委派研究的当前工作流入口。 | 会话恢复与项目恢复的证据断点。 |
| 第 5、8 节 | REF-144 | Claude Code 非 fork subagent 的隔离上下文、custom subagent 的受限能力、fork 继承例外和摘要返回。 | Capability Difference Record 与主线程验证责任。 |

正文不得用 Codex 资料描述 Claude Code，也不得用 Claude Code 资料推断 Codex。Shared Project Contract、Context Read Protocol、Handoff Package、Conflict Record 和 Resume Gate 必须明确标为本书工程模型。

## 章节叙事与逐节蓝图

### 1. 为什么“打开同一个仓库”仍不足以接力

- **读者问题：** 两个工具指向同一目录时，为什么目标、权限和完成状态仍可能不同？
- **场景：** Codex 完成章节研究，Claude Code 接手技术审查；上一轮聊天含有来源决定，但进度表、正文和真实测试状态并不一致。
- **本书模型：** 对比共享文件、产品指令、会话历史、工具权限、外部状态和验证证据六层。
- **禁止推论：** 同一仓库不等于同一上下文、同一能力、同一权限或同一外部状态。
- **停止条件：** 找不到权威目标、状态和验证入口时，先建立 Handoff Package，不继续修改。

### 2. Shared Project Core 与 Tool Adapter Layer

- **读者问题：** 哪些信息应该共享，哪些必须保留为产品适配？
- **共享核心：** 目标、范围、规则、架构决定、当前状态、下一任务、术语/引用、验收、交接和未覆盖项。
- **Codex 适配：** REF-140 限定 `AGENTS.md` 的产品入口与作用域；配置、权限和能力另行记录。
- **Claude Code 适配：** REF-142 限定 `CLAUDE.md`/规则/auto memory 的入口；不能把记忆当共享事实源。
- **停止条件：** 适配层覆盖项目目标、隐式加入权限或没有动态复核日期时，输出 `adapter_review_required`。

### 3. Context Read Protocol：恢复项目，不只是恢复会话

- **读者问题：** 新执行者应按什么顺序读取，怎样处理历史聊天和产品记忆？
- **来源边界：** REF-143 只证明 Claude Code 当前提供会话恢复入口；不证明工作树和外部状态仍新鲜。
- **本书协议：** 入口规则 → Project Contract → Current State → Next Task → Progress → Decisions → Handoff → 任务文件 → 新鲜验证。
- **证据规则：** 聊天/记忆是定位线索；仓库工件和实际状态是可审查来源；动态外部事实需重新查询。
- **停止条件：** 状态文件互相冲突、输入版本不明、关键路径缺失或旧结论无证据时，建立 State Conflict Record。

### 4. Tool Adapter Profile 与 Capability Difference Record

- **读者问题：** 如何在不追求“完全一致”的前提下安全使用不同工具？
- **字段：** 工具、官方来源、复核日期、指令入口、配置层、sandbox/approval、可用工具、subagent、浏览器/MCP、命令映射、已知缺口。
- **来源边界：** REF-140/141 仅支持 Codex 当前入口；REF-142 至 144 仅支持 Claude Code 当前入口。
- **路由：** `available_and_verified`、`unavailable`、`unknown`、`requires_authorization`、`alternative_required`。
- **停止条件：** 计划依赖一个未验证或未授权能力时，不以另一产品能力代填，返回 `capability_review_required`。

### 5. 任务所有权、subagent 和 worktree 的不同隔离范围

- **读者问题：** subagent、会话和 worktree 分别隔离了什么，又没有隔离什么？
- **来源边界：** REF-141 支持 Codex 结果汇总的产品背景；REF-144 支持 Claude Code 非 fork subagent 的隔离上下文、fork 例外与结果返回；REF-143 支持 worktree 并行入口的产品背景。
- **本书任务契约：** owner、输入快照、专属路径、共享写入请求、验收、停止条件和交付包。
- **关键边界：** subagent 上下文隔离不等于文件/权限隔离；worktree 文件隔离不等于浏览器、账户、数据库、缓存或凭证隔离。
- **停止条件：** 路径重叠、共享外部状态未知或多个工作者写共享状态时，先重新分配所有权。

### 6. Handoff Package：交付证据，不交付“相信我”

- **读者问题：** 一次局部工作结束时，下一工具真正需要什么？
- **字段：** 目标、输入基线、专属产物、实际命令与退出码、有限结论、未覆盖范围、冲突、共享写入请求、风险和下一任务。
- **断点：** subagent summary ≠ verified result；local tests passed ≠ repository validated；file changed ≠ user goal achieved。
- **最小证据：** 路径存在、命令新鲜、输出可回放、边界明确、共享写入未越权。
- **停止条件：** 只有自然语言完成声明、命令无结果、输入已漂移或产物越界时，退回补证。

### 7. State Conflict Record：不要让最后写入者决定真相

- **读者问题：** 进度表、正文状态、Handoff 和测试结果不一致时怎样处理？
- **工件字段：** 冲突对象、各自值、证据路径、输入版本、更新时间、新鲜度、影响、临时停止和具名决定者。
- **判定顺序：** 实际目标状态/文件 → 新鲜验证 → 阶段工件 → 状态汇总；聊天与旧摘要只作线索。
- **禁止策略：** 按文件修改时间、工具优先级、回答长度或自信程度自动覆盖。
- **出口：** `resolved_from_evidence`、`needs_refresh`、`human_decision_required`、`blocked`。

### 8. 完整案例：Codex Research → Claude Code Review → 集中集成

- **步骤：** Codex 领取 Research/References 专属路径 → 交付来源与边界 → 集成者分配全局引用并冻结 Draft 输入 → Claude Code 只写 Technical Review → 冲突进入记录 → 主线程同步共享状态并跑全仓验证。
- **来源边界：** subagent 和会话能力只作为可能的执行方式；案例不启动真实产品。
- **失败分支：** Codex 来源未登记、Claude Code 读取过期草稿、review 发现引用冲突、局部测试通过但全仓失败、共享文件被并行覆盖。
- **证据终点：** 只有 Integration Gate 处理共享工件并运行全仓验证后，才生成新的 Handoff Package。
- **禁止结论：** 不声称外部 Agent、worktree、账户、浏览器或 MCP 已运行。

### 9. Resume Gate：什么条件允许下一工具继续

- **读者问题：** 长期项目什么时候能安全恢复，而不是重新猜测？
- **输入：** Shared Project Contract、Tool Adapter Profiles、输入快照、Task Contract、Handoff Package、Capability Differences、State Conflicts 和 Validation Evidence。
- **通过条件：** 目标/范围匹配、必读工件可用、输入未漂移、专属路径无冲突、所需能力已验证、未解决冲突不影响任务、下一项可验收。
- **输出：** `needs_context`、`capability_review_required`、`state_conflict`、`integration_required`、`validation_required`、`ready_to_resume`、`human_decision_required`。
- **边界：** Gate 只判断注入记录，不恢复会话、不运行命令、不修改仓库。

### 10. 纯内存示例、图示、渐进增强与总结

- **计划函数：** `assessCrossToolHandoff(input)`；覆盖缺共享契约、适配过期、输入漂移、能力未知、路径重叠、局部交付尚未集成、验证失败、状态冲突、完整交接和外部执行请求。
- **计划图示：** Shared Core → Codex/Claude Adapter → Task Claim → Local Evidence → Handoff Package → Integration Gate → Resume Gate；能力/状态/验证失败离开主链。
- **图示断点：** `session_resumed ≠ project_state_fresh`、`subagent_done ≠ integrated`、`local_pass ≠ repository_validated`、`same_repo ≠ same_capabilities`。
- **渐进增强：** 实际跨工具自动化需身份、权限、锁/队列、工作树与外部状态隔离、审计、消息协议和人工最终责任；本章不实现。
- **总结：** 长期上下文的可移植核心是仓库中的目标、状态、证据和交接；产品记忆与会话是适配能力，不是唯一事实源。

## 后续阶段交付与验证契约

| 阶段 | 计划产物 | 不应提前声称的事实 |
| --- | --- | --- |
| First Draft | 原创正文、工件定义、产品边界、仓库案例、冲突与恢复流程。 | Codex/Claude Code 会话、subagent、worktree 或外部工具已运行。 |
| Technical Review | 刷新 Codex Manual，重读 Claude Code 三页，核对本仓库入口与跨章节责任。 | 两产品行为等价或动态能力永久稳定。 |
| Example Implementation | 纯内存接力准入器、测试和无副作用演示。 | 仓库读取、会话恢复、消息、文件、Git 或工具调用已发生。 |
| Diagram Review | Mermaid 源、导出图、图文一致性和视觉检查。 | 图中 Agent、Gate 或 Handoff 是真实运行系统。 |
| Fact/Language/Final | 来源复读、事实表、术语/时态、运行证据和共享状态收口。 | 历史验证仍新鲜或全书已发布。 |

## Outline 完成检查

- [x] 覆盖 Shared Project Core、Tool Adapter、Context Read Protocol、Task Contract、Handoff Package、Conflict Record 与 Resume Gate。
- [x] Codex 与 Claude Code 产品事实分别归因 REF-140 至 REF-144，不虚构共同协议。
- [x] 区分会话、记忆、subagent、worktree、局部证据、集中集成和全仓验证。
- [x] 为章节接力案例、纯内存示例和图示定义输入、输出、失败分支与外部动作边界。
- [x] 后续正文、示例、图示、审查和真实跨工具动作仍明确为未完成。
