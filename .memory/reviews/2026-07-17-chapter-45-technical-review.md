---
title: "第 45 章 Technical Review：Codex、Claude Code 接力与长期项目上下文"
chapter: "45"
stage: "Technical Review"
status: "completed"
updated_at: "2026-07-17"
---

# 第 45 章 Technical Review：Codex、Claude Code 接力与长期项目上下文

## 审查范围

- 第 45 章 Research Brief、参考资料、详细 Outline 与 First Draft。
- `BOOK_RULES.md`、`STYLE_GUIDE.md`、Review Checklist 与审查模板。
- 写作日当前 Codex Manual 中 `AGENTS.md` 与 subagent 章节，以及 Claude Code memory、common workflows 和 subagents 官方页面。
- 本仓库实际 `AGENTS.md`、`CLAUDE.md` 与共享启动链；路径存在只用于说明仓库接口，不证明产品已读取。
- 第 21 章共享仓库契约与产品适配、第 22 章规则入口、第 26 章任务隔离与 Integration Gate、第 43 章 Book Harness、第 44 章内容角色和质量门边界。
- Shared Project Contract、Tool Adapter Profile、Context Read Protocol、Capability Difference Record、Handoff Package、State Conflict Record、Integration Gate 与 Resume Gate 的责任、状态和停止条件。

## 结论

`可继续进入 Example Implementation`。正文在最小修正后保持四层信息分离：Codex 与 Claude Code 官方资料只描述各自产品入口，本书接力工件是原创工程模型，章节案例是未运行教学输入，本仓库路径事实不表示产品、权限、Agent 或外部集成已经运行。

本轮补齐了局部交付与共享集成之间的状态断点。`delivered` 不再等于已集成，Integration Gate 与 Resume Gate 不再共用一项模糊“可继续”判断；`integration_required` 专门表示局部 Handoff Package 尚未绑定已验证的集成快照。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| “Integration Gate 与 Resume Gate” | First Draft 只在案例中描述 Integration Gate，Resume Gate 可以在局部包尚未集成时直接返回 `ready_to_resume`。 | 第 26 章把共享更新和全仓验证交给唯一 Integration Gate；Outline 要求两扇 Gate 串联。 | 新增独立职责表、`integrated_snapshot_ready` 和 `integration_required`，明确先集成后恢复。已修复。 |
| “State Conflict Record” | 单一“用户目标与实际工件优先”顺序混合了范围、目标状态、完成证据、所有权和价值取舍。 | 不同冲突需要不同事实源和决定责任；文件存在不能证明完成，验证也不能授予权限。 | 增加 `conflictType`、`authorityBasis` 和按冲突类型选择依据的表格。已修复。 |
| REF-144 产品描述 | “subagent 在独立上下文运行”没有保留 fork 继承父会话的当前官方例外。 | Claude Code subagents 官方页面明确区分非 fork 新上下文与 fork 继承。 | 同步收窄 Research、References、Outline 与正文，保留非 fork/custom/fork 的限定。已修复。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| Shared Project Contract | 缺契约版本与生效范围，输入漂移时无法判断任务依据。 | 长期接力需要把契约与输入快照绑定。 | 增加 `contractVersion` / `effectiveFrom`。已修复。 |
| Tool Adapter Profile | 只有复核日期，没有档案版本和对应输入。 | 官方页面新鲜不等于当前环境观察仍适用于目标任务。 | 增加 `profileVersion` / `inputSnapshot`。已修复。 |
| Handoff Package | 缺少包自身状态，草稿、已交付、阻塞和失效包可能被混用。 | 下一工具需要区分“可审查输入”与“已集成快照”。 | 增加 `draft`、`delivered`、`blocked`、`superseded`，并限定 `delivered` 不等于 integrated。已修复。 |
| 完成检查表 | Technical Review 完成后仍与后续 Fact Check、Language Editing 和 Validation 共用未完成项。 | 阶段时态不能把已完成审查写成未开始。 | 将 Technical Review 单列为完成，后续阶段继续保持未完成。已修复。 |

## 接力工件责任复核

| 工件或 Gate | 本章保留的责任 | 状态或出口 | 明确排除 |
| --- | --- | --- | --- |
| Shared Project Contract | 固定目标、范围、规则入口、事实源、完成定义、禁止项与决定责任。 | 契约版本和生效范围由输入快照引用。 | 不加载产品指令，不授予权限，不证明项目状态。 |
| Tool Adapter Profile | 保存工具表面、官方来源、环境观察、配置/权限、能力和限制。 | 版本、输入快照、`reviewedAt` 与未知项。 | 不覆盖项目契约，不复制另一工具能力。 |
| Context Read Protocol | 规定入口、契约、状态、决定、交接、任务材料、快照和新鲜验证顺序。 | 缺输入、冲突、能力未知或路径重叠时停止。 | 不读取文件，不恢复会话，不验证外部状态。 |
| Capability Difference Record | 比较来源工具和目标工具的同一具体能力及替代路径。 | `available_and_verified`、`unavailable`、`unknown`、`requires_authorization`、`alternative_required`。 | 不安装工具，不授权连接器，不证明两产品等价。 |
| Handoff Package | 交付局部目标、输入、工件、命令、有限结论、未运行项、冲突和共享写入请求。 | `draft`、`delivered`、`blocked`、`superseded`。 | 不等于 Integration Gate 接受、全仓通过或发布。 |
| State Conflict Record | 按冲突类型保存各自主张、证据、版本、新鲜度、影响和决定责任。 | `resolved_from_evidence`、`needs_refresh`、`human_decision_required`、`blocked`。 | 不按时间戳、工具身份或自信度自动裁决。 |
| Integration Gate | 接受局部包，核对输入/所有权/证据/冲突，集中同步共享工件并触发全仓验证。 | `needs_rework`、`state_conflict`、`repository_validation_required`、`integrated_snapshot_ready`。 | 不恢复目标会话，不授予权限，不批准出版。 |
| Resume Gate | 基于已集成快照和目标工具档案判断下一任务能否领取。 | `needs_context`、`capability_review_required`、`state_conflict`、`integration_required`、`validation_required`、`ready_to_resume`、`human_decision_required`。 | 不写共享状态，不执行命令，不自动开始任务。 |

## 冲突优先级复核

正文已从“一条固定优先级”改为按冲突类型选依据：

- 范围和允许动作回到当前适用目标、Shared Project Contract 与更高层规则；这些输入不能证明动作已执行。
- 目标状态回到声明事实源上的新鲜直接观察，并记录环境、身份、时间和输入版本。
- 完成证据回到 Definition of Done 和绑定当前输入的验证；文件存在或局部绿色结果不能抵消硬缺口。
- 所有权冲突回到 Task Contract、Ownership Claim 与输入快照；最后写入时间没有裁决权。
- 价值、风险或取舍由具名 decision owner 显式决定；模型、工具或更长回答没有固定优先级。

这套顺序只选择“哪类证据可以回答当前问题”，不宣称任一文件永远高于其他文件。

## 产品来源复核

| 引用 | 本轮允许的限定陈述 | 保留的不可外推范围 |
| --- | --- | --- |
| REF-140 | Codex `AGENTS.md` 可保存仓库布局、命令、约束和完成定义，并存在层级语境。 | 不证明本仓库指导已加载、规则已遵守或权限已授予。 |
| REF-141 | Codex 可以把独立工作交给 subagent，主线程收集结果并可检查局部线程。 | 不证明自动拆分正确、文件隔离、跨会话持久或结果已集成。 |
| REF-142 | Claude Code `CLAUDE.md` 与 auto memory 是跨会话上下文机制，且不是强制配置。 | 不推断 Codex 行为，不把记忆当共享事实源。 |
| REF-143 | Claude Code 当前提供会话恢复、worktree 并行和委派研究入口。 | 不证明工作树外状态隔离、会话永久或项目状态新鲜。 |
| REF-144 | Claude Code 非 fork subagent 从隔离上下文开始，custom subagent 可配置提示/工具/权限；fork 继承父上下文。 | 不证明跨会话团队、共享状态一致、事实正确或结果已验收。 |

## 相邻章节分工

| 章节 | 已有责任 | 第 45 章只新增什么 |
| --- | --- | --- |
| 第 21 章 | Shared Repository Contract 与 Product Adapter Declaration 的跨产品项目 Harness。 | 在长期接力中绑定输入版本、局部证据和恢复条件。 |
| 第 22 章 | `AGENTS.md`、`CLAUDE.md`、稳定规则和可变状态的加载/组织边界。 | 使用入口定位 Context Read Protocol，不重新定义加载机制。 |
| 第 26 章 | Task Contract、Ownership Claim、Delivery Package 与 Integration Gate。 | 为跨工具包增加来源/目标档案、能力差异和集成快照断点。 |
| 第 43 章 | Book Contract、Stage Record、Chapter DoD、Production Board 与出版候选。 | 判断下一工具能否从当前书稿快照继续，不重新定义章节完成。 |
| 第 44 章 | Role Contract、Content Evidence Package、双质量门和冲突回流。 | 处理产品/会话变化后的适配、状态冲突和恢复准入。 |

## 共享术语请求

`.ai/glossary.md` 当前已有 Shared Repository Contract、Product Adapter Declaration、Task Contract、Delivery Package 与 Integration Gate，但尚未登记以下第 45 章术语。本轮禁止修改共享文件，主线程集成时应审查：

| 请求术语 | 建议定义与既有术语关系 |
| --- | --- |
| 共享项目核心（Shared Project Core） | 跨工具共享的目标、规则、决定、状态、术语、引用、验收和交接层；不包含产品私有配置或隐藏上下文。 |
| 工具适配层（Tool Adapter Layer） | 保存各产品入口、配置、权限、能力和限制的可过期层；不覆盖共享项目核心。 |
| Shared Project Contract | 在 Shared Repository Contract 之上增加目标/范围、事实源、版本、生效范围、完成定义和决定责任的长期接力契约。 |
| Tool Adapter Profile | Product Adapter Declaration 在某次接力中的带版本环境快照，增加当前能力、命令映射、未知项与输入绑定。 |
| Context Read Protocol | 新执行者按入口、契约、状态、决定、交接、任务材料和新鲜验证建立输入基线的本书协议。 |
| Handoff Package | Delivery Package 的跨工具特化，增加来源/目标档案、能力差异、状态冲突、下一任务和包状态；`delivered` 不等于 integrated。 |
| Capability Difference Record | 对来源工具和目标工具的具体能力、证据、任务影响、替代路径与授权责任进行独立比较的记录。 |
| State Conflict Record | 按冲突类型保存各自主张、版本、新鲜证据、影响、临时停止和决定责任的记录。 |
| Resume Gate | 基于已集成快照和目标工具档案判断下一项局部任务能否领取的只读准入；不恢复会话或执行动作。 |

Integration Gate、Task Contract 和 Delivery Package 已登记，不需要重复新增。若主线程希望减少近义术语，应把 Shared Project Contract、Tool Adapter Profile 与 Handoff Package 明确登记为既有术语的接力特化，而不是静默互换名称。

## 已执行验证与未验证范围

- 已重新读取第 45 章四份工件、当前 Codex Manual 的 `AGENTS.md`/subagent 章节、Claude Code 三项官方资料及第 21/22/26/43/44 章边界。
- 已执行正文、Research、References、Outline 与本记录的联合 Markdown lint：5 个文件，0 个错误。
- 已对五个 Markdown 文件执行 `markdown-link-check`；全部退出码 0。结构检查统计 13 个本地链接与 10 个外部链接，本地目标均存在。
- 已检查五个文件的行尾空白与文件尾换行；无异常。
- 已执行 `git diff --check`：退出码 0。
- 未运行全仓 `npm run validate`，因为本轮只负责章节专属 Technical Review，共享状态与全仓收口由主线程执行。
- 未创建 `assessCrossToolHandoff`、测试、示例、Mermaid 图源或导出图；没有启动 Codex/Claude Code 会话、subagent、worktree、浏览器、MCP、模型、权限、网络或外部系统。
- 未修改 `.ai/glossary.md`、`.ai/references.md`、`.ai/progress.md`、`.context/`、目录、脚本或其他共享文件，也未执行 Git 提交。
