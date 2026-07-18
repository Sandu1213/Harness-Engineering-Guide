# 第 10 章 Technical Review

## 审查范围

- 工件：`10-workflow-and-state-management.md`、`.research.md`、`.references.md`、`.outline.md`、`.ai/references.md`、`.ai/glossary.md`，以及第 7、9、11、12、14、17、18、19、26、27 章的责任边界。
- 审查类型：技术边界、来源归因、术语、阶段语义与跨章节责任。
- 使用的规则与来源：`BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/review-checklist.md`，以及于 2026-07-16 重新读取的 REF-031 至 REF-035。

## 结论

`可进入 Example Implementation`。正文的学习目标保持单一：让读者为已获准任务区分计划、工作流定义、执行、尝试、观察和验证结论，并据此设计状态、恢复与交接判断。AWS Step Functions、LangGraph 与 Temporal 的内容只保留在各自产品、框架或实现语境；Workflow Contract、State Record、状态名称、交接包、恢复顺序和章节生产案例均明确为本书工程模型。

本次复读确认：AWS 将 workflow 组织为 state machine 的事件驱动步骤并把一次运行称为 execution；其 Retry/Catch 行为是产品特有错误处理。LangGraph Persistence 区分 thread-scoped checkpoint 与跨 thread store；Functional API 说明恢复回到 checkpoint 边界，未完成 task 可能重跑，副作用需要幂等设计。Temporal 架构文档将追加式事件历史、确定性 Workflow 代码和 Activity 的幂等/非重试边界列为其实现选择。正文没有把这些陈述外推为通用保证。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| `10-workflow-and-state-management.outline.md` 的“章节工件状态” | First Draft 与 Technical Review 已完成，却仍被列为未开始。 | `BOOK_RULES.md` 要求进度与状态持续更新；Outline 不能与 `.ai/progress.md` 的真实阶段冲突。 | 分开记录已完成的 Draft、Technical Review 和仍未开始的 Example Plan、示例、图示及后续阶段。 |
| `.ai/references.md` 的 REF-031 至 REF-035 候选条目 | 初次登记仍显示 2026-07-15，已与 2026-07-16 的正文写作日复读和本次复读不一致。 | `BOOK_RULES.md` 的动态资料写作日核验要求；引用登记必须可追溯。 | 统一为 2026-07-16，并说明后续动态资料阶段仍要重读。 |
| `.ai/glossary.md` | Workflow Contract、State Record、Checkpoint、re-entry 和 Idempotency 已是第 10 章核心术语，却未进入全局词表。 | `STYLE_GUIDE.md` 与 `BOOK_RULES.md` 要求术语以词表为准。 | 登记五个术语，并明确它们是本书模型或工程目标，不是产品 schema、授权或 exactly-once 保证。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| `10-workflow-and-state-management.md` 的“章节完成检查表” | Technical Review 已完成，但检查表尚未反映该事实。 | 章节正文、Review 记录和项目状态应使用相同的阶段语义。 | 将 Technical Review 标为完成，并保留 Fact Check、Language Editing、Final Review 与图示/示例未开始的边界。 |

## 建议

| 位置 | 建议 | 预期收益 |
| --- | --- | --- |
| 第 10 章 Example Implementation | 先建立 Example Plan 和缺失模块的红灯，再实现仅处理注入 Workflow Contract、State Record、观察与批准快照的 `assessWorkflowTransition`。 | 让合法迁移、终态重入、缺 checkpoint、未知写入、过期批准、冲突交接与验证拒绝路径都有可重复的教学证据。 |
| 第 10 章 Diagram Review | 图源创建后，逐箭头核对它只表示本书状态模型；把 checkpoint 画为恢复判断线索，避免把状态箭头画成真实持久化、授权、Tool 调用或正确性证明。 | 防止读者把教学状态图误读为运行时或审计实现。 |

## 已执行验证与未验证范围

- 2026-07-16：重新读取 AWS Step Functions 的 state machine 与 error handling 文档，确认工作流/执行、Retry 与 Catch 的正文表述保持在该产品范围内。
- 2026-07-16：重新读取 LangGraph Persistence 与 Functional API，确认 checkpoint/store 作用范围、checkpoint-boundary resume、完成任务结果恢复、未完成任务可能重跑与副作用幂等建议的正文表述保持在该框架范围内。
- 2026-07-16：重新读取 Temporal 的 Architecture overview，确认追加式事件历史、确定性 Workflow 代码和 Activity 幂等/非重试边界只被写作其实现选择。
- 已逐项核查第 7 章记忆、第 9 章计划、第 11/12 章 Tool/环境权限、第 14 章批准、第 17 章验证、第 18 章容错、第 19 章长任务、第 26 章隔离和第 27 章版本控制的责任边界；正文没有提前声明这些机制已实现。
- 2026-07-16：状态同步后实际运行 `npm run validate`，退出码为 0：Markdown lint 检查 179 个文件、0 个错误；链接检查通过；九组既有纯内存示例共 46 项 Node 内置测试通过；章节状态检查为 9 章完成、1 章进行中、37 章未开始。
- 未验证：本次审查没有创建 Mermaid 图源、SVG/PNG、Example Plan、示例实现、测试或演示，也不证明真实工作流、重放、持久化、幂等性、Tool、权限或外部效果。
