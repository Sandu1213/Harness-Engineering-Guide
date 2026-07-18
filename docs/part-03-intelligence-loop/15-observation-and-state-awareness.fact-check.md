---
title: "第 15 章事实核验：Observation 与状态感知"
chapter: "15"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 15 章事实核验：Observation 与状态感知

## 核验范围

本次核验覆盖正文、Research Brief、局部来源、Outline、图示计划与纯内存示例的归因和边界。它不核验真实 UI、DOM、截图、页面、网络、日志、追踪系统、模型、Tool、环境、用户输入、外部副作用、业务完成或安全合规。

## 来源级核验

| 引用键 | 2026-07-16 实际读取的来源 | 正文允许陈述 | 复核结论与外推禁区 |
| --- | --- | --- | --- |
| CH15-REF-01 | [OpenTelemetry Signals](https://opentelemetry.io/docs/concepts/signals/) | 官方 Signals 页面将 traces、metrics、logs、baggage、profiles 列作不同类别。 | 正文只用其说明“可观察信号有不同类别”；Observation Record 和快照字段均未归因给 OpenTelemetry。 |
| CH15-REF-02 | [W3C Trace Context](https://www.w3.org/TR/trace-context/) | 该 Recommendation 定义传播分布式追踪上下文的标准 HTTP 头和值格式；`traceparent` 描述入站请求在追踪图中的位置。 | 正文将其限定为关联传播实例，并保留敏感信息与安全注意；不把 `correlationId` 写成协议实现、身份、授权或审计保证。 |
| CH15-REF-03 | [Playwright Auto-waiting](https://playwright.dev/docs/actionability) | 文档说明 `locator.click()` 等操作前会检查 actionability 条件，例如唯一元素、可见、稳定、接收事件和启用。 | 正文只据此分开“动作前可执行条件”与“动作后业务状态”；没有写成业务成功、统一浏览器规则或固定超时。 |
| CH15-REF-04 | [Playwright Assertions](https://playwright.dev/docs/test-assertions) | web-first 异步断言会重复获取元素、检查条件直至满足或超时；页面当前文档写明默认断言超时为 5 秒。 | 正文只将其作为有条件重新读取的产品例子；没有采用 5 秒为本书策略，也不把断言通过等同于任务验收。 |

## 本书模型与事实的分界

| 内容 | 分类 | 处理结果 |
| --- | --- | --- |
| Observation Record、Snapshot Contract、`freshness`、`fingerprint` | 本书工程模型 | 不归因给 W3C、OpenTelemetry 或 Playwright。 |
| `observed`、`not_observed`、`needs_evidence`、`blocked` | 纯内存示例状态 | 不写成真实系统状态、SDK 返回值、权限或验收结论。 |
| 点击提交后的 UI 场景 | 教学案例 | 不含真实页面、DOM、用户、网络、截图、测试结果或业务数据。 |
| 关联、新鲜度、推进性检查顺序 | 本书的保守判断模型 | 只解释减少错误推断的作用，不声称能消除竞态、观察遗漏或所有噪声。 |

## 可运行示例复核

2026-07-16 已实际运行：

```bash
node --test examples/agent/observation-snapshot-assessment.test.mjs
node examples/agent/observation-snapshot-assessment.mjs
```

前者退出码 `0`。交叉审查补齐前一快照跨行动、跨目标同指纹的两个边界后，共 12 项 Node 内置测试通过、0 项失败；后者退出码 `0`，输出 `observed` / `expected_state_observed` / `ui-click-demo` / `submit-status`。这些结果只验证注入教学对象上的确定性判断，不证明真实浏览器、页面状态、日志、追踪、点击、网络、外部效果或业务完成。

## 待核验与动态边界

- `TODO(verify)：` 未来若指定 Playwright 版本、配置、浏览器、超时、截图、断言 API 或运行结果，必须于写作日重读对应官方文档并实际执行相关 E2E 验证。
- `TODO(verify)：` 未来若接入 OpenTelemetry 的 SDK、语义约定、采样、导出、保留或安全配置，必须登记精确版本、语言与部署环境；本章没有这些事实。
- `TODO(verify)：` 未来若传播或存储关联标识、追踪头、页面内容或日志，需要核验隐私、数据最小化、脱敏、保留期限和访问控制；本章不提供法律或合规结论。
- `TODO(verify)：` 将本地 `CH15-REF-*` 整合为全局 `REF-053` 至 `REF-056` 后，需在正式引用表复查 URL、访问日期和动态资料标记。

## Fact Check 完成检查

- [x] 四项局部来源均在写作日实际读取，并记录允许用途与外推禁区。
- [x] 规范、产品资料、本书模型和纯内存示例未被混为同一层级。
- [x] 没有把 UI 场景或 Node 测试描述为真实外部系统事实。
- [x] 动态产品资料与共享引用集成仍保留明确重新核验要求。
