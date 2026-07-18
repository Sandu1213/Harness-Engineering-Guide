---
title: "第 15 章候选参考资料：Observation 与状态感知"
chapter: "15"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 15 章候选参考资料：Observation 与状态感知

> 本文件保留第 15 章的局部来源登记；`CH15-REF-*` 已分别映射为正式 REF-053 至 REF-056，正文和全局引用表使用正式编号。

| 本地键 | 建议全局键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH15-REF-01 | REF-053 | [OpenTelemetry：Signals](https://opentelemetry.io/docs/concepts/signals/) | OpenTelemetry 官方概念文档 | 2026-07-16 | OpenTelemetry 将 traces、metrics、logs、baggage 与 profiles 列为其 signals 文档中的不同信号类别。 | 不将这些类别写成所有系统必须具备的字段、采集策略、保留时长、采样率或可靠性保证。在线内容后续改写时重查。 |
| CH15-REF-02 | REF-054 | [W3C Trace Context](https://www.w3.org/TR/trace-context/) | W3C Recommendation | 2026-07-16 | 该规范定义用于传播分布式追踪上下文的标准 HTTP 头和值格式；`traceparent` 用可移植格式描述入站请求在追踪图中的位置。 | 本章的 `correlationId`、快照字段和存储方式不是 W3C 协议字段；不把 HTTP 头外推为所有 Agent 的身份、授权或审计机制。 |
| CH15-REF-03 | REF-055 | [Playwright：Auto-waiting](https://playwright.dev/docs/actionability) | Playwright 官方文档 | 2026-07-16 | 对 `locator.click()` 等操作，Playwright 会在执行前检查可见、稳定、接收事件、启用等 actionability 条件；未在超时内满足会失败。 | 不将动作前检查写成业务成功、页面目标状态已出现、跨浏览器保证或所有自动化工具的行为。动态产品资料后续改写时重查。 |
| CH15-REF-04 | REF-056 | [Playwright：Assertions](https://playwright.dev/docs/test-assertions) | Playwright 官方文档 | 2026-07-16 | Playwright 的 web-first 异步断言会在预期条件满足或断言超时前重复获取元素并检查；文档给出默认断言超时为 5 秒。 | 不将默认超时当作本书推荐值、Agent 重试策略、生产 SLA 或页面业务完成的证明。动态产品资料后续改写时重查。 |

## 使用规则

- 本章的 Observation Record、Snapshot Contract、evidence quality、`observed`、`not_observed`、`needs_evidence` 与 `blocked` 都是本书工程模型，不是上述来源的统一数据结构或状态码。
- `CH15-REF-03` 与 `CH15-REF-04` 仅说明 Playwright 当前文档所描述的产品行为；本章不安装、运行或模拟 Playwright，也不使用其默认超时作为教学函数输入。
- `CH15-REF-02` 涉及追踪上下文的传播和隐私/安全注意事项。本章只借其“关联需要可传播标识”的限定思想，不把关联标识视为无敏感数据风险的通行证。
- 没有使用成功率、延迟、采样率、日志保留时长、监控成本或 UI 测试稳定性数字。未来若需要这些结论，必须新增来源、实验条件与核验记录。

## 正式映射（已完成）

1. `CH15-REF-01` → `REF-053`，`CH15-REF-02` → `REF-054`，`CH15-REF-03` → `REF-055`，`CH15-REF-04` → `REF-056`。
2. 正式条目、用途、访问日期和动态复核边界已登记到 `.ai/references.md`；观察记录、状态快照、关联标识、新鲜度和推进性已写入词表。

## 候选资料完成检查

- [x] 每条资料均为可追溯的一手规范或官方文档，并标注写作日访问日期。
- [x] 每条资料都限定了正文可使用的陈述与禁止外推范围。
- [x] 没有复制来源段落、伪造产品测试或把产品行为写成通用保证。
- [x] 已列出主线程需要完成的全局引用和术语整合工作。
