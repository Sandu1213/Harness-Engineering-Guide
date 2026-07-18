---
title: "第 40 章事实核验：成本、延迟与 Token 管理"
chapter: "40"
status: "completed"
updated_at: "2026-07-17"
---

# 第 40 章事实核验：成本、延迟与 Token 管理

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-40-01 | OpenAI 的延迟优化指南将生成 Token、输入、请求次数、独立步骤并行、用户感知等待和非 LLM 路径列为不同优化方向，并区分严格顺序与可并行步骤。 | REF-120，2026-07-17 重读 OpenAI API 官方指南。 | 可支持 Latency Path 不应只看单次推理，以及独立步骤才可成为并行候选；不采用页面百分比、模型经验、产品功能、跨供应商性能或业务 SLA。 |
| FC-40-02 | OpenAI Prompt Caching 文档说明该产品的命中依赖相同 Prompt 前缀，建议稳定内容前置、动态内容后置，并提供缓存相关用量字段。 | REF-121，2026-07-17 重读 OpenAI API 官方文档。 | 可支持 Cache Identity 需要对象身份和命中观察；不采用当前模型、费用、阈值、保留期、路由、命中率、安全保证或其他供应商语义。 |
| FC-40-03 | Anthropic Token counting 文档说明计数端点接受与消息创建相同类型的结构化输入，返回发送前的输入 Token 估算，并明确实际消息输入量可能略有差异。 | REF-122，2026-07-17 重读 Anthropic 官方产品文档。 | 可支持 `estimated` 与 `observed` 分开；不推出当前模型/Tokenizer、系统附加量、计费、上下文窗口、精度保证或跨供应商比较。 |
| FC-40-04 | OpenAI Batch API 文档把不要求即时响应的任务置于异步批处理语境，并描述提交、查询状态和完成后取回结果的产品流程。 | REF-123，2026-07-17 重读 OpenAI API 官方文档。 | 可支持把非即时工作视为移出交互关键路径的候选；不采用当前折扣、完成窗口、限额、端点、文件格式、性能或任务适用性结论。 |
| FC-40-05 | Anthropic 的 Context Engineering 文章以最小高信号 Token 集、按需检索和压缩时保留关键内容为工程背景，并提醒过度压缩可能丢失细微但重要的信息。 | REF-068，2026-07-17 重读 Anthropic 官方工程文章。 | 可支持结构化摘要、指针化和按需加载作为候选；不证明自动压缩、任一产品实现、上下文能力、成本改善、质量结果或所有 Agent 的共同规律。 |
| FC-40-06 | Anthropic 的 Agent evals 文章区分 task、trial、grader、transcript 与 outcome，并在静态任务集上讨论跟踪延迟、Token 用量、单任务成本和错误率。 | REF-061，2026-07-17 重读 Anthropic 官方工程文章。 | 可支持资源记录必须关联任务、试次与结果，并在固定任务语境中比较；不采用客户案例、模型表现、阈值、指标优先级、跨产品标准或评估器可靠性。 |
| FC-40-07 | OpenAI API Pricing 是写作日可访问的官方动态价格入口。 | REF-124，2026-07-17 重读页面标题与入口。 | 只作为需要数值时重新核验产品费率的入口；本章不摘录价格，也不把公开价写成合同结算、长期费率、折扣、税费或汇率事实。 |

CH40-REF-01 至 CH40-REF-07 分别映射 REF-120、REF-121、REF-122、REF-123、REF-068、REF-061 与 REF-124；映射只支持本表中的受限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-40-01 | Resource Budget、Resource Record、Latency Path、Rate Snapshot、Optimization Candidate、Quality Non-regression Gate 与 Cache Identity。 | 是本书用于分离预算、观察、依赖、费率适用、候选和质量责任的工程工件，不称为 OpenAI 或 Anthropic 的 API、计费对象、缓存实现或默认策略。 |
| EM-40-02 | `needs_spec`、`needs_measurement`、`rate_stale`、`unit_mismatch`、`cache_evidence_missing`、`dependency_conflict`、`requires_approval`、`quality_regression` 与 `ready_for_comparison`。 | 是纯内存教学状态；不表示已经补测、刷新费率、命中缓存、启动并行、获得批准、拒绝真实请求或部署候选。 |
| EM-40-03 | 虚构研究 Agent、重复来源元数据、结构化摘要、教学 `teaching_units`、试次和资源数量。 | 是注入对象，不代表真实 Prompt、来源读取、Token、延迟、金额、账单、缓存命中率、模型或供应商测量。 |
| EM-40-04 | Mermaid 图中的 Task Contract、预算、观察、金额可选分支、候选证据门、质量门和 `blocked`。 | 只表达本书责任链；没有估算即观察、缓存候选即命中、资源减少即质量通过或候选接受即部署的箭头。 |

## 实际纯内存运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-40-08 | `node --test examples/agent/resource-optimization-assessment.test.mjs` | 退出码 0；8 项通过、0 项失败。 | `assessResourceOptimization` 在测试构造的纯内存对象上按契约给出保守路由。 |
| FC-40-09 | `node examples/agent/resource-optimization-assessment.mjs` | 退出码 0；输出 `ready_for_comparison`、`comparable_evidence_ready`、`compare_without_deployment` 与 `executionPerformed: false`。 | 演示对象最多进入教学比较；没有运行模型、计费、缓存、批处理、并发、网络、文件、时钟、批准或部署。 |

## 最小事实修订

- 正文 front matter 已登记 REF-120 至 REF-124，并保留 REF-068 与 REF-061；局部 `CH40-REF-*` 只留在参考资料映射中。
- 正文已链接本 Fact Check，删除“全局编号仍待分配”的过期表述，并把已完成的 Technical Review、Example Implementation、Diagram Review 与 Fact Check 分开记录。
- 本轮没有引入价格、模型上下文窗口、缓存阈值、保留时间、批处理完成窗口、Token 换算、延迟百分比、模型排行或性能结果。

## 明确未核验或不覆盖的范围

- 未运行真实模型、供应商 API、用量读取、账单、费率计算、缓存、摘要服务、并发、批处理、性能测量、网络、文件、时钟、账户、凭证、审批、发布或外部系统。
- 未验证真实系统中的成本、延迟、Token、缓存命中率、并行安全、批处理适用性、模型路由、容量、SLA、合同结算、质量改善或业务效果。
- 未把 OpenAI 与 Anthropic 的不同产品资料拼接成跨供应商规范、统一预算公式、自动优化算法或真实效果保证。
