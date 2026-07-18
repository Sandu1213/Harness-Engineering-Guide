---
title: "第 17 章候选参考资料：Evaluation 与可验证结果"
chapter: "17"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 17 章候选参考资料：Evaluation 与可验证结果

> 本文件保留第 17 章的局部来源登记；`C17-REF-*` 已映射为正式 REF-061 至 REF-064，正文和全局引用表使用正式编号。

| 本地键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- |
| C17-REF-01 | [Anthropic：Demystifying evals for AI agents（2026-01-09）](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 官方工程文章 | 2026-07-16 | 文章对 task、trial、grader、transcript、outcome、evaluation harness 和 agent harness 给出其工程定义；并讨论代码、模型、人工评分器和回归/能力评估的取舍。 | 不把 Anthropic 的术语、产品案例、示例 YAML、指标、规模或建议写成跨产品标准或保证。动态文章后续改写必须重读。 |
| C17-REF-02 | [NIST AI RMF Core：Measure](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST 在线核心资源 | 2026-07-16 | Measure 语境涉及选择、应用并记录测量方法，以及通过客观、可重复或可扩展的测试、评估、验证和确认过程支持有效性与可靠性。 | 不把 AI RMF 写成 Agent 的固定测试框架、认证、法规义务或任何产品的运行时行为。该资源标注 AI RMF 1.0 正在修订。 |
| C17-REF-03 | [NIST：Artificial Intelligence Risk Management Framework (AI RMF 1.0)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | NIST 原始框架 PDF | 2026-07-16 | 用于该自愿框架中的有效性、可靠性、持续测试和风险测量背景。 | 不推导适用性、合规结论、具体阈值、模型质量或法律义务。 |
| C17-REF-04 | [Zheng et al.：Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena（arXiv:2306.05685）](https://arxiv.org/abs/2306.05685) | 原始论文 | 2026-07-16 | 论文讨论 LLM 评判器的 position、verbosity、self-enhancement 等偏差与局限。 | 不引用其排行榜、百分比、模型比较或结论来断言任何当前模型、评判器或本书 Rubric 的可靠性。 |

## 使用规则

- 本章的 Evaluation Spec、证据矩阵、质量门、四层评估和教学案例均是本书工程模型。
- 任何真实 Agent、模型、平台或基准的版本、分数、价格、时延和能力，若未来需要写入正文，必须在写作当日另行核验官方资料或原始论文。
- 任何 LLM-as-a-judge 生产部署都需要对任务、Rubric、提示词、数据、人工校准和误判后果做独立设计；本章不提供默认参数。

## 正式映射（已完成）

- `C17-REF-01` → `REF-061`，`C17-REF-02` → `REF-062`，`C17-REF-03` → `REF-063`，`C17-REF-04` → `REF-064`。
- 正式条目已登记到 `.ai/references.md`；局部键只用于研究与审查历史追溯。

## 候选资料完成检查

- [x] 每条资料都有固定 URL、来源类型、访问日期、允许用途与外推禁区。
- [x] 动态工程文章和在线框架已标明后续需重新核验。
- [x] 没有把本地键写成全局引用编号。
