---
title: "第 10 章候选参考资料：Workflow 与状态管理"
chapter: "10"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 10 章候选参考资料：Workflow 与状态管理

> 本清单是写作前的证据导航，不是可复制正文。各来源只支持其自身产品、框架或实现的限定陈述；正文、示例和 Fact Check 阶段必须再次访问动态资料。

| ID | 来源 | 类型 | 可支持的限定陈述 | 不能支持的陈述 | 访问日期 |
| --- | --- | --- | --- | --- | --- |
| REF-031 | [AWS Step Functions：Learn about state machines](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-statemachines.html) | 官方产品文档 | 该产品把工作流组织为事件驱动步骤和状态，定义执行、状态输入输出、错误处理与 redrive 等概念。 | 通用 Workflow Contract、ASL/JSON 字段、AWS 以外的恢复或持久化保证。 | 2026-07-16 |
| REF-032 | [AWS Step Functions：Handling errors in Step Functions workflows](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html) | 官方产品文档 | 该产品中匹配的 Retry 先于 Catch，错误可携带到恢复分支。 | 任何系统的固定重试顺序、错误分类、时间参数或恢复保证。 | 2026-07-16 |
| REF-033 | [LangGraph：Persistence](https://docs.langchain.com/oss/python/langgraph/persistence) | 官方框架文档 | 该框架将图状态按 thread 保存为 checkpoint，并说明历史、恢复、人工中断与 replay 的范围。 | 所有 Agent 的 checkpoint 格式、保存频率、存储、版本或安全行为。 | 2026-07-16 |
| REF-034 | [LangGraph：Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api) | 官方框架文档 | 该框架关于持久化任务结果、重入与副作用幂等性的限定建议。 | 跨系统的 exactly-once、任意副作用安全，或不经实际验证的幂等结论。 | 2026-07-16 |
| REF-035 | [Temporal：Architecture overview](https://github.com/temporalio/temporal/blob/main/docs/architecture/README.md) | 官方项目架构文档 | Temporal 实现中的事件历史、确定性 Workflow 代码和 Activity 幂等/非重试边界。 | 本书通用状态格式、任意平台的事件溯源或确定性要求。 | 2026-07-16 |

## 写作前复核事项

- `TODO(verify)：` 重新访问 REF-031 与 REF-032，确认术语、错误处理和 redrive 的产品说明仍适用于正文拟用表述；不引用未复核的产品字段或参数。
- `TODO(verify)：` 重新访问 REF-033 与 REF-034，确认 checkpoint、thread、replay、重入和幂等性段落仍存在；框架行为不得换写为产品无关事实。
- `TODO(verify)：` 若正文使用 REF-035 的架构细节，重新定位该仓库文档的当前版本与限定语境；不要把实现选择写成行业标准。
- `TODO(verify)：` 真实案例若涉及数据库、文件、队列、Git、浏览器、审批或外部服务，分别补充对应的官方来源、环境前提与运行证据。

## 引用使用约束

- Workflow Contract、State Record、交接包、停止规则和教学状态机均为本书工程模型。
- “可恢复”“已重试”“幂等”“已提交”等词必须对应可检查的具体系统、范围与证据，不能只根据模型输出或状态文本推断。
- 会话历史与长期记忆的资料主要属于第 7 章；本章只在需要区分执行状态时交叉引用，不把它们称为可恢复工作流。
