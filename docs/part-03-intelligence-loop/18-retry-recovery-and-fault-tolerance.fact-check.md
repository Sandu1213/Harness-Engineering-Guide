---
title: "第 18 章事实核验：Retry、Recovery 与容错"
chapter: "18-retry-recovery-and-fault-tolerance"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 18 章事实核验：Retry、Recovery 与容错

## 核验范围

本次核验覆盖第 18 章中可归因的协议、工程建议和架构模式陈述。`Recovery Contract`、状态名称、教学案例、纯内存判断器、测试输入、图示和所有策略字段均是本书工程模型，不属于外部事实。

## 已实际重读的一手来源

| 局部键 | 已核对的内容 | 正文允许写法 | 禁止外推 |
| --- | --- | --- | --- |
| [REF-065](18-retry-recovery-and-fault-tolerance.references.md) | RFC 9110 9.2.2 对幂等方法、通信失败、未读到响应时自动重试与非幂等请求限制的描述。 | “RFC 9110 在 HTTP 语境中限定……”“这不是任意 Tool 的自动重试许可。” | 不把 HTTP 方法语义写成 Agent、数据库、浏览器、消息队列或任意 API 的幂等保证。 |
| [REF-066](18-retry-recovery-and-fault-tolerance.references.md) | Google SRE 对重试放大、随机化指数退避、单请求上限、预算、多层重试和错误分类的讨论。 | “Google SRE 的章节建议……”“团队仍需按系统策略决定参数。” | 不引用示例负载、次数、预算、延迟或服务架构为默认配置、基准或保证。 |
| [REF-067](18-retry-recovery-and-fault-tolerance.references.md) | Microsoft 对补偿事务的应用特定性、进度记录、可失败、幂等、关联、审计、不可逆点和人工介入的说明。 | “该模式指出……”“本章只提出补偿候选。” | 不称补偿为原子回滚、严格逆序、通用 Saga 实现或自动恢复承诺。 |

## 事实与本书模型的分层

| 内容 | 分类 | 核验结论 |
| --- | --- | --- |
| HTTP 幂等方法的受限重试语义 | 来源事实 | 仅按 REF-065 的 HTTP 限定陈述。 |
| 重试会放大负载，以及退避/预算/单层控制建议 | 来源级工程建议 | 仅按 REF-066 的章节范围陈述。 |
| 补偿可能失败、需要进度、关联和人工边界 | 来源级架构模式背景 | 仅按 REF-067 的最终一致多步骤操作语境陈述。 |
| `Recovery Contract`、`needs_observation`、`retry`、`compensate`、`stop`、`escalate` | 本书工程模型 | 用于教学判断，不表示现有产品协议或运行时。 |
| 资料获取失败案例、操作标识、尝试次数和测试数据 | 教学假设 | 不对应真实资料、请求、网络或组织策略。 |

## 外推禁区与未来复核

- HTTP、RPC、浏览器、Tool、数据库和消息系统的可重复性不能互相推断；必须针对真实接口重新核验。
- 重试时间、次数、预算、熔断阈值、队列行为、事务和补偿能力均依赖系统版本、流量、权限和业务规则；本章没有提供默认值。
- 对外部写入、支付、发布、删除、凭证、法律效力或生产事故的恢复，必须另行进行权限、安全、业务和人工审批设计。
- 全局正式引用已登记：REF-065 至 REF-067；正文与本章工件已同步采用正式编号。

## 示例与验证声明核验

- `assessRecoveryDecision` 只对显式对象作判断；它没有网络、文件、时钟、浏览器、模型、Tool、队列或数据库 I/O。
- `retry`、`compensate`、`stop` 与 `escalate` 都是返回值，不是已执行操作、日志、告警或人工处理证据。
- 已实际运行 `node --test examples/agent/retry-recovery-assessment.test.mjs`，13 项通过、0 项失败；演示退出码为 0，输出 `retry` / `retry_allowed` / `source-fetch-demo`。这些只证明注入对象上的教学判断。
- Mermaid SVG/PNG 已实际渲染并查看 PNG；六份章节 Markdown 的局部 lint 为 0 错误，正文 10 条、Research Brief 1 条、候选资料 3 条、Outline 0 条、Example Plan 0 条、Fact Check 1 条链接均通过。审查记录加入后的最终计数见 Final Review。

## 核验完成检查

- [x] 三项资料均为写作日实际读取的一手标准、官方工程书或官方架构模式。
- [x] 每条来源都写明允许用途与外推禁区。
- [x] 本书模型和教学假设未包装为来源事实。
- [x] 已将真实的专用测试、演示、图示和首轮局部文档检查结果如实写入；最终局部复核见 Final Review。
