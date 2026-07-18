---
title: "第 40 章候选参考资料：成本、延迟与 Token 管理"
chapter: "40"
status: "completed"
updated_at: "2026-07-17"
---

# 第 40 章候选参考资料：成本、延迟与 Token 管理

> 本文件保留 `CH40-REF-*` 作为 Research Brief 阶段的局部追溯键；主线程已为七项来源登记正式全局引用，正文只使用对应的 `REF-*` 编号。

| 本地键 | 全局引用 | 来源 | 类型 | 访问日期 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH40-REF-01 | REF-120 | [OpenAI API：Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization) | 官方产品工程指南 | 2026-07-17 | 延迟优化可从 Token 处理/生成、输入、请求次数、依赖并行、用户感知等待和非 LLM 路径等方面分解；严格顺序与独立步骤应区别对待。 | 页面百分比、模型大小经验、特定 API 功能、跨供应商性能或任意业务 SLA。页面未见稳定发布日期，后续阶段须重读。 |
| CH40-REF-02 | REF-121 | [OpenAI API：Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) | 官方产品文档 | 2026-07-17 | 该产品的缓存命中依赖相同 Prompt 前缀；稳定内容前置、动态内容后置，并可观察缓存相关用量。 | 当前模型、阈值、保留期、路由、价格、命中率、安全或其他供应商缓存语义。动态文档后续阶段须重读。 |
| CH40-REF-03 | REF-122 | [Anthropic：Token counting](https://docs.anthropic.com/en/docs/build-with-claude/token-counting) | 官方产品文档 | 2026-07-17 | 发送消息前可对结构化输入做 Token 估算；文档明确预估值与实际消息使用量可能略有差异。 | 当前模型/Tokenizer、系统附加 Token、计费、窗口、精度或跨供应商比较。动态文档后续阶段须重读。 |
| CH40-REF-04 | REF-123 | [OpenAI API：Batch API](https://developers.openai.com/api/docs/guides/batch) | 官方产品文档 | 2026-07-17 | 不要求即时响应的工作可进入该产品的异步批处理流程，并通过状态与结果取回接口管理。 | 当前折扣、完成窗口、限额、端点、文件格式、性能或任务适用性。动态文档后续阶段须重读。 |
| CH40-REF-05 | REF-068 | [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 官方工程文章 | 2026-07-17 | 在有限上下文中维护高信号 Token、按需检索和长任务压缩的取舍背景。 | 产品实现、自动压缩、上下文能力、成本、质量结果或所有 Agent 的共同规律。页面未见稳定发布日期，后续阶段须重读。 |
| CH40-REF-06 | REF-061 | [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 官方工程文章 | 2026-07-17 | task、trial、grader、transcript、outcome 的限定定义，以及在固定任务上跟踪 Token、延迟、成本与错误率的评估背景。 | 客户案例、模型表现、阈值、指标优先级、跨产品标准或评估器可靠性。动态文章后续阶段须重读。 |
| CH40-REF-07 | REF-124 | [OpenAI API：Pricing](https://developers.openai.com/api/docs/pricing) | 官方动态价格页 | 2026-07-17 | 只作为正式写作、事实核验和出版前按日期读取产品费率的入口；本阶段不摘录价格。 | 价格长期稳定、公开价等于合同结算、折扣、税费、汇率、其他平台或未来费率。每次使用数值前都须重读。 |

## 使用规则

- Resource Budget、Resource Record、Latency Path、Rate Snapshot、Optimization Candidate 与 Quality Non-regression Gate 都是本书工程模型，不是上述来源的接口或默认策略。
- 本阶段不登记任何价格、模型上下文窗口、缓存阈值、保留时间、完成窗口、Token 换算、延迟百分比或模型排行。
- 预估 Token、实际用量、缓存记录、费率快照、任务结果和质量结论是不同证据；不得互相替代。
- 产品资料的 URL、字段、模型范围、价格和行为都可能变化；First Draft、Technical Review、Fact Check 与出版前必须按写作日复核。
- 若正式正文需要任何数字，必须记录产品/合同范围、单位、币种、有效日期、来源位置和适用限制；缺一项则保留为 `TODO(verify)：` 或删除。

## 候选资料完成检查

- [x] 每条资料都有稳定 URL、来源类型、访问日期和局部追溯键。
- [x] 每条资料都记录了允许陈述与不可外推范围。
- [x] 动态产品资料已标记为后续阶段当日重读对象。
- [x] 未摘录价格、上下文窗口、缓存阈值、延迟数字或模型排行。
- [x] 已将产品行为、本书工程模型、教学案例与未运行事实分开。
