---
title: "第 10 章事实核验：Workflow 与状态管理"
chapter: "10"
status: "fact-check-complete"
sources:
  - "REF-031"
  - "REF-032"
  - "REF-033"
  - "REF-034"
  - "REF-035"
updated_at: "2026-07-16"
---

# 第 10 章事实核验：Workflow 与状态管理

## 核验范围

本清单核验 `10-workflow-and-state-management.md`、`.research.md`、`.references.md`、`.outline.md`、`.example-plan.md`、纯内存示例和 Mermaid 图中可归因的 AWS Step Functions、LangGraph 与 Temporal 陈述。工作流契约（Workflow Contract）、状态记录（State Record）、检查点的判断规则、教学状态名、交接包、迁移表、恢复/停止规则、纯内存函数和图示均为本书工程模型或教学工件；它们不作为产品接口、实际工作流、持久化、重放、Tool、权限、批准、审计或外部效果的证据。

## 来源级核验

| ID | 写作日复核的来源陈述 | 正文允许用途 | 禁止外推 | 状态 |
| --- | --- | --- | --- | --- |
| REF-031 | AWS Step Functions 说明其基于状态机（也称 workflow），workflow 由事件驱动步骤组成；运行会创建称为 execution 的实例，步骤之间可传递输入、输出和状态数据。 | 以该产品为例说明：步骤列表之外还可区分状态机定义、执行实例和数据流。 | 本书 Workflow Contract 字段、状态名、终态语义、Amazon States Language、产品以外的迁移/恢复/持久化保证。 | 2026-07-16 已重读 [AWS 状态机文档](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-statemachines.html)。 |
| REF-032 | AWS Step Functions 在有 `Retry` 时按列表顺序扫描 retrier；当没有 Retry 或重试未解决错误时，才按顺序扫描 Catch，并转到 Catch 的 `Next` 状态。 | 以该产品为例说明：重试与错误分支是需要明确设计的路径。 | 本书或其他系统的重试顺序、错误名、次数、退避、超时、Catch 行为或成功保证。 | 2026-07-16 已重读 [AWS 错误处理文档](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html)。 |
| REF-033 | LangGraph Persistence 文档将 checkpointer 描述为保存单一 thread 的图状态快照，将 store 描述为跨 thread 的应用定义数据；二者服务不同范围。 | 限定说明该框架中“当前 thread 的图状态”与“跨 thread 数据”的区别。 | 本书 State Record 字段、检查频率、存储后端、保留期、版本兼容、安全属性，或任何其他 Agent 的行为。 | 2026-07-16 已重读 [LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)。 |
| REF-034 | LangGraph Functional API 文档说明：恢复特定 thread 时会复用检查点中已完成 task 的结果；已开始但未完成的 task 可能再次运行，并建议将 API 调用置于 task 中且设计幂等性。 | 限定说明该框架的恢复/重执行语境，以及副作用需被单独设计的理由。 | 跨框架 replay、任意副作用安全、自动去重、具体幂等键或 exactly-once 保证。 | 2026-07-16 已重读 [LangGraph Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api)。 |
| REF-035 | Temporal 官方架构文档把每个 workflow execution 的追加式事件历史、可由历史重建状态、确定性且无副作用的 Workflow 代码，以及幂等或非重试的 Activity 代码列为其架构设计决策。 | 作为一种实现背景，提醒读者共同审查历史、重放与副作用边界。 | 本书通用状态格式、任意平台的事件溯源/确定性要求、持久化能力、重试行为或结果保证。 | 2026-07-16 已重读 [Temporal Architecture](https://github.com/temporalio/temporal/blob/main/docs/architecture/README.md)。 |

## 本书模型与非事实边界

| 工件或术语 | 事实状态 | 核验结论 |
| --- | --- | --- |
| Workflow Contract、State Record、Checkpoint 判断、迁移表与交接包 | 本书工程模型。 | 这些字段、状态和停止规则不是 AWS、LangGraph 或 Temporal 的共同 schema 或 API。 |
| `ready`、`in_progress`、`blocked`、`requires_approval`、`ready_for_validation`、`validated`、`stopped` | 本书教学状态。 | 不代表真实工作流状态、产品返回值、权限、批准结果或审计结论。 |
| `assessWorkflowTransition` | 纯内存教学函数。 | 只评估调用者注入的 Contract、State Record、观察和批准快照；不调度、持久化、重放或调用模型、网络、文件、Git、Tool、权限或外部系统。 |
| Workflow 状态图与 SVG/PNG 导出 | 本书工程模型的发布图。 | 可读渲染不证明真实运行时、状态存储、重入、批准、外部效果或恢复结果。 |
| 章节生产场景 | 原创教学案例。 | 不表示本仓库受某个工作流引擎驱动，也不构成真实写入、发布、审批或审核记录。 |

## 事实陈述核对

| 正文主题 | 归因来源 | 核验结果 | 写作限制 |
| --- | --- | --- | --- |
| 状态机、事件驱动步骤、execution 与状态数据流。 | REF-031 | 与当前 AWS 产品文档一致。 | 保留产品主语；不引入 ASL 字段、服务集成或产品运行保证。 |
| retrier 扫描、重试未解决后进入 Catch。 | REF-032 | 与当前 AWS 错误处理文档一致。 | 仅作为该产品的错误路径示例；不写成“先重试再捕获”的通用算法。 |
| 单 thread 图状态快照与跨 thread store 的区别。 | REF-033 | 与当前 LangGraph Persistence 文档一致。 | 不把框架的 checkpointer/store 名称或存储细节移植为本书模型。 |
| 已完成 task 结果恢复、未完成 task 可能重跑与幂等性建议。 | REF-034 | 与当前 LangGraph Functional API 文档一致。 | 保留“该框架”的限定；不推导恰好一次或跨系统安全。 |
| Temporal 的追加式历史、状态重建、Workflow/Activity 责任边界。 | REF-035 | 与当前官方仓库架构文档一致。 | 说明为 Temporal 的设计决策，不作为通用实现处方。 |
| Contract、Record、检查点新鲜度、效果身份、升级与停止规则。 | 本书模型。 | 正文、图示与示例均明确标注。 | 不归因给五项来源，也不表示真实平台已实现这些规则。 |

## 示例与图示复核

2026-07-16 实际运行：

```bash
npm run test:workflow-transition-assessment
npm run example:workflow-transition-assessment
```

测试结果为 8 项通过、0 项失败；演示输出为 `allowed / legal_transition / ready → in_progress`。这些结果只说明 `assessWorkflowTransition` 对注入的教学对象产生预期的确定性判断；它们不验证真实工作流、状态存储、检查点、重放、Tool、权限、批准、审计、网络、文件、模型调用或外部效果。

Mermaid 图已由 Mermaid CLI 11.16.0 导出 SVG/PNG，并在 Diagram Review 中查看 PNG。渲染和查看只说明本书图源可生成可读图；它不验证图中任何来源行为、状态迁移、批准、恢复或实际结果。

## 动态信息与待复核项

- AWS Step Functions、LangGraph 和 Temporal 的产品/框架/仓库文档会演进。下一次修改正文中的可归因陈述时，必须重新访问对应 REF-031 至 REF-035，并以当日页面的限定语境为准。
- `TODO(verify)：` 若未来接入真实状态机、队列、数据库、文件、API、Tool、浏览器、Git、权限、人工批准、审计或外部服务，须为具体实现补充一手文档、环境前提、批准边界和运行证据；不得复用本章纯内存示例、图示或来源背景作为执行证明。
- 未核验的产品参数、价格、配额、性能、存储保证、加密/安全属性、版本兼容性和 API 字段不得写入正文，更不得通过本书状态名推断。

## Fact Check 完成检查

- [x] REF-031 至 REF-035 已于 2026-07-16 重新读取，并写明可用的限定陈述与禁止外推。
- [x] 正文将产品/框架事实、本书工程模型、章节生产案例、图示和纯内存示例分开。
- [x] 已重跑第 10 章 8 项纯内存测试与演示，且记录了它们只验证注入教学对象。
- [x] 已为动态资料和未来真实集成记录重新取证条件。
- [x] 未将图示、测试、来源或本书模型表述为真实工作流、重放、持久化、Tool、权限、批准、审计或外部效果证明。
