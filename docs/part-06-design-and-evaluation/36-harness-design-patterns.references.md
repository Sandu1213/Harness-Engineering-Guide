---
title: "第 36 章候选参考资料：Harness Design Patterns"
chapter: "36"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 36 章候选参考资料：Harness Design Patterns

> 本清单为 Chapter Outline 与后续事实核验保留证据边界，不是正文或产品操作指南。REF-029 至 REF-031 已存在于全书引用表；CH36-REF-04 与 CH36-REF-05 已登记为 REF-114、REF-115。动态资料在每个后续写作日都必须重新读取。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 可支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH36-REF-01 | REF-029 | [Anthropic：Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方工程文章 | 2026-07-16 | 文章在其工程建议语境中区分预定义代码路径的 workflow 与模型动态控制过程/工具使用的 agent；说明串联、路由、并行、编排者—工作者、评估—优化等结构，并建议仅在复杂度能够改善结果时增加结构。 | 通用模式标准、量化性能、成本/延迟结论、生产安全、默认架构、任何真实 Agent 或工具运行。 |
| CH36-REF-02 | REF-030 | [OpenAI Agents SDK：Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 官方 SDK 文档 | 2026-07-16 | 该 Python SDK 区分 LLM 决策和代码编排；其 manager 的 `Agent.as_tool()`、handoff、串联、评估循环和独立任务并行是该 SDK 的结构选择。 | 其他 SDK、任意多 Agent 产品、handoff 的权限/安全、并发无竞争、真实任务完成或性能保证。 |
| CH36-REF-03 | REF-031 | [AWS Step Functions：Learn about state machines](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-statemachines.html) | 官方产品文档 | 2026-07-16 | 该产品把 workflow 描述为事件驱动步骤的状态机，说明 Choice、Wait、Map、Parallel 等流控制状态，以及执行、数据传递和错误处理概念。 | 本书模式卡 schema、ASL/JSON 字段作为通用协议、redrive/恢复/持久化保证、任意并行或事件系统语义。 |
| CH36-REF-04 | REF-114 | [CloudEvents Specification（canonical）](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md)；[写作日读取的原始规范](https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md) | 开放规范 | 2026-07-16 | 当前读取页面标示为 `1.0.3-wip`；其将 event 定义为发生事实与上下文的数据记录，并区分 producer、consumer、intermediary 与可互操作的事件格式。 | 投递顺序、至少一次/恰好一次、去重、重试、访问控制、事件总线可用性、任何具体协议绑定或生产实现。 |
| CH36-REF-05 | REF-115 | [Node.js：Events](https://nodejs.org/api/events.html) | 官方运行时文档 | 2026-07-16 | Node.js `EventEmitter` 使用命名事件与监听器；该实现按注册顺序同步调用监听器。 | 消息队列、浏览器事件、CloudEvents、云服务或任何其他运行时的监听顺序、异步、可靠性与错误传播行为。 |

## 写作日核验记录

- CH36-REF-01：已读取官方文章，确认其 workflow/agent 区分、常见组合结构、从简单方案起步与复杂度取舍属于作者工程建议；不提取其客户案例、模型型号或性能叙述作为本章事实。
- CH36-REF-02：已读取官方 Python SDK 页面，确认 manager/`Agent.as_tool()` 与 handoff 的角色分工，以及代码串联、评估循环、独立任务并行的限定描述；不写入未复核的 SDK API 细节。
- CH36-REF-03：已读取 AWS 官方页面，确认该产品的状态机、事件驱动步骤、流控制状态、执行和状态数据语境；不把其产品字段带入本书模型。
- CH36-REF-04：canonical GitHub 页面在读取时受匿名访问限制；通过同一规范的 `raw.githubusercontent.com` 原始文件读取到 `1.0.3-wip` 内容。后续正文必须重新确认正式版本和 canonical 页面可访问性；无法确认时仅保留 `TODO(verify)：`，不把草案细节写成事实。
- CH36-REF-05：已读取 Node.js v26.5.0 官方 API 页面；该版本和运行时语义只用来说明“必须核验具体事件运行时”，不构成模式选择的性能或可靠性证据。

## 引用使用约束

- 受控单循环、计划—执行、监督者—工作者、流水线、事件驱动、Pattern Card、选择顺序、模式组合、反模式和演进触发器均为本书工程模型。
- “监督者”只说明本书中拥有最终结果、合并和升级责任的角色；它不等同于 OpenAI Agents SDK 的 manager、Anthropic 的 orchestrator，或任何产品级 API。
- “事件驱动”只表示本书模式卡中的触发与责任结构；它不暗示 CloudEvents 合规、消息投递、顺序、重试、去重或事件总线。
- “并行”只在独立子任务、结果聚合、状态隔离、预算和失败责任均已定义时才可作为候选设计；本研究没有真实并行运行记录。
- 后续正文若出现动态产品/规范细节、版本、字段、权限、成本、延迟或性能，必须在当日重新读取官方资料，并把未核验项保留为 `TODO(verify)：`。

## 主线程登记提示

- 可复用全局引用：CH36-REF-01 → REF-029，CH36-REF-02 → REF-030，CH36-REF-03 → REF-031。
- CH36-REF-04（CloudEvents 规范）与 CH36-REF-05（Node.js Events）已分别登记为 REF-114、REF-115，并在“第 36 章已分配引用”表保留受限用途与访问日期。
- 不需要为本章登记框架实现、真实队列、云账户、性能测试或工具调用记录；这些均未发生。

## 候选资料完成检查

- [x] 每条资料包含 URL、来源类型、写作日访问、允许用途和外推禁区。
- [x] 已标出可复用引用与完成登记的引用；主线程已将新来源写入全局引用表。
- [x] 已记录 CloudEvents canonical 页面受限与原始规范读取路径。
- [x] 未将动态资料、产品文档或规范写成跨系统保证。
