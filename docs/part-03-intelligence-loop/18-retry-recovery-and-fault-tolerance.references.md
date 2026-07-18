---
title: "第 18 章候选资料：Retry、Recovery 与容错"
chapter: "18-retry-recovery-and-fault-tolerance"
status: "global-references-registered"
updated_at: "2026-07-16"
---

# 第 18 章候选资料：Retry、Recovery 与容错

本文件保留第 18 章在写作日实际读取的一手资料。全书引用已登记到 `.ai/references.md`；原局部键的映射为 `CH18-REF-01 → REF-065`、`CH18-REF-02 → REF-066`、`CH18-REF-03 → REF-067`。

| 本地键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- |
| REF-065 | [RFC 9110：HTTP Semantics，第 9.2.2 节](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods) | IETF 标准 | 2026-07-16 | HTTP 对幂等方法的语义，以及通信失败、尚未读到响应时可以自动重试幂等请求的限定例子；非幂等方法不应自动重试，除非客户端能确认其语义幂等或确认原请求未被应用。 | 不把 HTTP 方法名、状态码或客户端行为写成任意 Tool、RPC、数据库、浏览器或 Agent 操作的重试许可。 |
| REF-066 | [Google SRE Book：Addressing Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/) | 官方工程书 | 2026-07-16 | 重试可放大负载并使故障不稳定；该章节建议随机化指数退避、限制每个请求的重试次数、考虑全局重试预算、避免多层同时重试，并区分可重试与不可重试错误。 | 不采用其示例中的 QPS、时间、预算或服务架构作为本书默认值、容量结论或任何产品承诺。 |
| REF-067 | [Microsoft Azure：Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction) | 官方架构模式 | 2026-07-16 | 对最终一致、多步骤操作，补偿需要记录完成步骤及对应撤销信息；补偿可能失败、需要可恢复进度、幂等命令、端到端关联与审计；某些高影响决策需要人工介入。 | 不把 Azure 的模式写成原子回滚、严格逆序、通用 Saga 实现、默认一致性保证或适用于每个 Harness 的恢复方案。 |

## 使用规则

- 本章的 `Recovery Contract`、状态名称、分类表、检查点字段、恢复 Runbook 和教学案例都是本书工程模型。
- 已核验来源只支撑表中逐项限定的陈述；示例中的 `retry`、`recover`、`compensate` 与 `escalate` 是纯内存判定结果，不是外部动作。
- 任何真实 API、工作流、队列、浏览器、数据库、SaaS 或 Agent 产品的重试参数、超时、熔断、恢复或补偿行为，正式写作时必须按当日官方资料重新核验。

## 主线程整合待办

- [x] 已将原局部键登记为 REF-065 至 REF-067。
- [x] 已用正式编号更新 Front matter、行内资料与事实核验清单。
- [x] 已登记重试预算（Retry Budget）、补偿（Compensation）和恢复 Runbook。
