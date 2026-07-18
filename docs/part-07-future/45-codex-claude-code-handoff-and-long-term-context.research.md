---
title: "第 45 章 Research Brief：Codex、Claude Code 接力与长期项目上下文"
chapter: "45"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章 Research Brief：Codex、Claude Code 接力与长期项目上下文

## 要解决的读者问题

同一个长期项目可能在不同日期由 Codex、Claude Code、人类作者或其他 Agent 接续。真正的风险不是工具名称不同，而是每个工具读取的指令入口、会话历史、权限、配置、可用能力和运行证据不同。如果交接只说“继续上一轮”，下一位执行者无法知道目标是否变化、哪些文件是事实来源、哪些命令真正运行过、共享状态是否已经同步，以及前一工具的产品特定能力能否复现。

本章研究一种仓库优先的跨工具接力模型：把稳定目标、规则、状态、证据和下一任务保存为共享项目工件；再为 Codex 与 Claude Code 分别维护受限适配声明。会话恢复、auto memory 或 subagent 可以帮助当前产品工作，但不能替代仓库中的 Handoff Package，也不能被写成跨产品一致性保证。

## 研究范围与非范围

| 读者问题 | 本章研究的回答 | 本章不回答 |
| --- | --- | --- |
| 哪些上下文应跨工具共享？ | 共享目标、规则、当前状态、任务契约、证据、未知项、下一步和完成定义；产品配置与个人偏好保持在适配层。 | 把整个聊天、隐藏系统指令、模型内部状态或所有个人配置复制给另一工具。 |
| 怎样开始一次接力？ | 先读取 Shared Project Contract 与 Handoff Package，再声明工具/能力/权限差异和输入快照，最后领取专属路径。 | 假定“打开同一目录”就表示两工具拥有同样上下文或权限。 |
| 怎样结束局部工作？ | 返回实际产物、命令、退出码、未覆盖范围、共享写入请求和下一状态，由唯一集成者复核。 | 把局部测试、subagent 摘要或会话恢复当作全仓通过。 |
| 状态冲突如何处理？ | 比较输入版本、阶段记录、文件事实与新鲜验证，形成 Conflict Record；无法判定时停止并交给具名责任者。 | 以最后写入时间、最长回答或某个工具的自信程度自动覆盖。 |
| 长期上下文如何保持可维护？ | 将稳定信息放进仓库规则/状态/决策/交接，把产品记忆视为可审计但不可唯一依赖的辅助层。 | 保证任何模型长期记忆完整、无漂移、永久可用或跨产品同步。 |

## 已核验的官方资料与受限用途

| 本地键 | 来源明确表达的内容 | 允许用于本章的范围 | 不可外推 |
| --- | --- | --- | --- |
| CH45-REF-01 | Codex 官方手册将 `AGENTS.md` 描述为会自动进入上下文的开放格式仓库指导入口，可记录布局、运行方式、构建/测试/lint、约束和完成定义；更具体目录中的指导可覆盖上层。 | 支持 Codex Adapter Profile 指向仓库规则入口和路径作用域。 | Claude Code 的加载行为、规则一定被遵守、权限已授予或本仓库已正确配置。 |
| CH45-REF-02 | Codex 当前资料说明可将独立工作交给 subagent 并由主线程收集结果；局部线程可被检查。 | 支持把并行探索/测试和主线程集成责任分开。 | 自动正确拆分、文件隔离、冲突消除、跨会话持久或结果已验收。 |
| CH45-REF-03 | Claude Code 官方资料列出 `CLAUDE.md`、导入、作用域规则和 auto memory 等项目持久指令/记忆入口。 | 支持 Claude Code Adapter Profile 需要明确其产品特定上下文入口。 | Codex 行为、共享项目状态已同步、记忆事实正确或规则必然执行。 |
| CH45-REF-04 | Claude Code Common workflows 当前包含恢复既有会话、用 worktree 并行以及委派研究等入口。 | 支持“会话恢复”和“仓库接力”是不同层；worktree 可作为产品工作流背景。 | 会话是永久存档、恢复包含全部外部状态、并行无冲突或工作已集成。 |
| CH45-REF-05 | Claude Code subagent 资料说明非 fork subagent 从隔离上下文开始，custom subagent 可配置提示、工具和权限，并把结果返回主会话；fork 会继承父会话上下文。 | 支持局部任务契约、上下文差异和摘要返回的产品背景。 | 跨会话 Agent 团队、共享状态一致、自动事实核验或最终结果正确。 |

访问日期均为 2026-07-17。CH45-REF-01 至 CH45-REF-05 分别映射 REF-140 至 REF-144。Codex 部分通过当天刷新并验证的官方 Codex Manual 定位；Claude Code 部分重读当前官方页面。动态产品行为在 First Draft、Technical Review 和 Fact Check 阶段仍需重查。

## 稳定核心与产品适配层

跨工具项目不应追求把所有配置压成一个最小公分母。更稳妥的做法是分两层：

| 层 | 典型内容 | 变更责任 | 不应包含 |
| --- | --- | --- | --- |
| **共享项目核心（Shared Project Core）** | 目标、读者/用户、项目规则、架构决定、当前状态、下一任务、术语/引用、验收命令、Handoff Package。 | 项目共同维护；由事实和新鲜验证驱动。 | 产品私有设置、隐藏提示、个人令牌、未经审查的会话摘要。 |
| **工具适配层（Tool Adapter Layer）** | Codex `AGENTS.md`/配置入口，Claude Code `CLAUDE.md`/规则入口，能力差异、权限、命令映射和已知限制。 | 对应工具使用者；动态行为按官方资料复核。 | 自称跨产品通用、覆盖共享事实或偷偷改变项目目标。 |

共享核心必须可以由人类直接读取。工具适配层可以引用共享文件，但不能让唯一关键状态只存在于某个产品的记忆或会话中。

## 本书的跨工具接力工件

| 工件 | 最小字段 | 主要责任 | 不承担的责任 |
| --- | --- | --- | --- |
| **共享项目契约（Shared Project Contract）** | 目标、范围、规则入口、事实来源、完成定义、禁止项和责任人。 | 让所有工具读取同一稳定项目边界。 | 不保证产品加载或执行规则。 |
| **工具适配档案（Tool Adapter Profile）** | 工具/版本来源、指令入口、配置/权限、可用能力、命令映射、动态复核日期和未知项。 | 显式记录工具差异。 | 不证明能力可用、权限已授予或跨工具等价。 |
| **上下文读取协议（Context Read Protocol）** | 必读顺序、输入快照、按需文件、冲突处理和停止条件。 | 防止新工具从随机文件或旧聊天开始。 | 不读取文件或验证内容新鲜度。 |
| **交接包（Handoff Package）** | 目标、基线、专属路径、已完成、实际命令/结果、未覆盖范围、共享写入请求、风险和下一任务。 | 把局部结果作为可审查接口返回。 | 不等同于全仓通过、批准、合并或发布。 |
| **能力差异记录（Capability Difference Record）** | 能力、来源、工具 A/B 状态、替代路径、验证和阻塞。 | 防止用一个工具的能力冒充另一个工具能力。 | 不安装工具、授权连接器或改变系统设置。 |
| **状态冲突记录（State Conflict Record）** | 冲突字段、各自证据、输入版本、新鲜度、影响、临时停止和决定责任。 | 在共享状态不一致时保留证据。 | 不按时间戳或工具优先级自动决定真相。 |
| **恢复准入（Resume Gate）** | 契约匹配、输入未漂移、证据可读、权限/能力已声明、专属路径无冲突和下一任务可验收。 | 决定是否能安全继续。 | 不恢复会话、运行命令或修改仓库。 |

## 接力工作流

### 1. 冻结交接输入

上一执行者记录当前目标、输入版本、工作树状态、已完成工件和新鲜验证。聊天摘要只能作为定位线索；没有仓库证据的结论保持未知。

### 2. 按协议读取共享核心

下一执行者依次读取入口规则、项目契约、当前状态、下一任务、进度、相关决策、章节/代码和 Handoff Package。若这些文件互相矛盾，停止并建立 State Conflict Record。

### 3. 声明工具适配和能力差异

记录当前是 Codex、Claude Code 还是人工流程；确认实际可调用工具、权限、沙箱、网络、subagent、浏览器、MCP/连接器和验证命令。没有验证的能力写为 `unknown`，而不是从另一工具推断。

### 4. 领取专属工作面

任务契约给出 owner、输入快照、允许路径、共享写入请求、验收和停止条件。并行工作只能修改互不重叠路径；共享状态由唯一集成者更新。

### 5. 执行与本地验证

执行者记录实际命令、退出码和有限结论。产品会话、subagent 总结和工具返回只是证据候选，仍需与目标文件或运行状态核对。

### 6. 生成交接包

局部完成后返回工件清单、验证、未覆盖项、输入漂移、冲突和下一步；不把“我已完成”写成证据。

### 7. 集中集成与恢复准入

集成者处理共享引用、目录、脚本和状态，运行全仓验证，再决定下一工具是否可从新快照继续。若验证失败或状态冲突未解决，Resume Gate 保持关闭。

## 产品能力不能替代仓库状态

- Codex `AGENTS.md` 与 Claude Code `CLAUDE.md` 都可以承载产品相关指导，但文件名、加载范围和产品行为不同；共享规则应有明确事实来源与适配说明。
- 会话恢复可以帮助找回当前产品的对话，但不能证明工作树、外部系统、权限、动态网页或验证结果仍与当时一致。
- auto memory 可以保存产品侧信息，但不能作为唯一项目事实源；项目决定仍需写入可审查仓库工件。
- subagent 可以隔离部分上下文和并行工作，但主线程仍需验证局部结果、处理共享状态和运行全局质量门。
- worktree 可以隔离 Git 工作树，但不自动隔离外部账户、浏览器会话、数据库、缓存、凭证或共享文档。

## 本仓库案例

本仓库已经提供可检查的共享核心与适配入口：

- `AGENTS.md` 是 Codex 入口，同时指向共同的 `AI_BOOTSTRAP.md` 与 `BOOK_RULES.md`；
- `CLAUDE.md` 可作为 Claude Code 入口，但正文必须通过实际文件确认其内容和引用；
- `.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md` 和 `.context/HANDOFF.md` 保存跨会话状态；
- `.ai/progress.md`、`.ai/glossary.md` 和 `.ai/references.md` 保存共享生产接口；
- 阶段 review、示例测试、图示导出和 `npm run validate` 提供可回放证据。

这些文件存在不表示两种工具已经读取、理解或遵守，也不表示当前状态没有漂移。案例正文必须以实际文件和当轮验证为准。

## 计划教学案例

一次章节由 Codex 完成 Research Brief，Claude Code 进行 Technical Review，人工集成者处理共享引用与最终状态：

1. Codex 领取 research/references 专属路径，交付来源、访问日期和未覆盖范围。
2. 集成者登记全局引用编号并冻结正文输入快照。
3. Claude Code 按 Shared Project Contract 读取正文和来源，专门创建技术审查记录，不改共享状态。
4. 若 Claude Code 发现来源映射与正文不一致，创建 State Conflict Record 而不是覆盖原状态。
5. 人工/主线程集成修正共享工件、运行全仓验证，生成新的 Handoff Package。

案例不启动真实 Codex/Claude Code 会话，不创建 worktree，不调用模型、网络、MCP、浏览器或外部系统。

## 计划纯内存示例

Example Implementation 可实现 `assessCrossToolHandoff(input)`，只读取注入的：

- `sharedProjectContract`
- `sourceToolProfile`
- `targetToolProfile`
- `inputSnapshot`
- `taskContract`
- `handoffPackage`
- `capabilityDifferences`
- `stateConflicts`
- `validationEvidence`
- `resumeRequest`

函数返回 `needs_context`、`capability_review_required`、`state_conflict`、`integration_required`、`validation_required`、`ready_to_resume` 或 `human_decision_required`。它不读取仓库、不恢复会话、不启动工具、不调用 subagent、不修改文件、不运行 Git/测试，也不发送任何外部消息。

## 计划图示

Mermaid 图从 Shared Project Core 出发，分别进入 Codex Adapter 与 Claude Code Adapter；两条路径领取专属任务、产生局部 Handoff Package，最后汇入单一 Integration Gate。状态冲突、能力未知、输入漂移和验证失败都离开主链。

图必须保留：

- `session_resumed ≠ project_state_fresh`
- `subagent_done ≠ integrated`
- `local_validation_passed ≠ repository_validated`
- `same_repository ≠ same_capabilities`

## 主要风险与后续核验

- **隐式上下文依赖：** 关键决定只在聊天或 auto memory 中，下一工具无法审查。
- **产品语义混写：** 把 `AGENTS.md`、`CLAUDE.md`、subagent、worktree 或会话恢复写成跨产品统一行为。
- **权限漂移：** 工具能看见某能力不表示当前任务已获授权。
- **局部通过外推：** 局部任务测试通过被写成全仓或外部系统完成。
- **最后写入者获胜：** 两个状态冲突时按时间覆盖，丢失证据和责任。
- **共享外部状态：** 即使文件路径隔离，浏览器、账户、数据库、缓存和凭证仍可能互相影响。
- `TODO(verify)：` First Draft 与 Fact Check 当天重新刷新 Codex Manual，并重读 Claude Code memory、common workflows 和 subagents 页面。
- `TODO(verify)：` 正文使用本仓库 `CLAUDE.md` 前必须实际读取，不从文件名推测内容。
- `TODO(verify)：` Example Implementation 前只复用纯内存测试惯例，不自动启动 Codex、Claude Code、Git worktree 或外部工具。

## 下一阶段建议

Chapter Outline 应按“共享核心 → 工具适配 → 读取协议 → 任务所有权 → 局部验证 → Handoff Package → Integration Gate → Resume Gate”组织。每节都要指出产品事实、本书模型、仓库案例和未运行动作；结论必须强调长期项目上下文的稳定来源是可审查工件，而不是任何单一会话或模型记忆。
