---
title: "第 9 章候选参考资料：Planning 与任务拆解"
chapter: "09"
status: "research-complete"
updated_at: "2026-07-15"
---

# 第 9 章候选参考资料：Planning 与任务拆解

> 本清单是研究导航，不是可复制正文。正式写作只可使用已限定的陈述；动态产品文档必须在写作当天重新核验。

| ID | 来源 | 类型 | 可支持的限定陈述 | 不能支持的陈述 | 访问日期 |
| --- | --- | --- | --- | --- | --- |
| REF-028 | [Wang et al.，Plan-and-Solve Prompting](https://aclanthology.org/2023.acl-long.147/) | ACL 原始论文 | 该方法先产生计划，把问题分为子任务，再依计划求解；研究面向多步推理。 | 生产任务图、真实工具调用、通用性能或治理规则。 | 2026-07-15 |
| REF-004 | [Yao et al.，ReAct](https://arxiv.org/abs/2210.03629) | 原始论文 | 交错推理与行动，推理轨迹可帮助跟踪、更新计划和处理例外。 | 本书任务卡字段、任意产品的规划器或执行保证。 | 2026-07-15 |
| REF-029 | [Anthropic，Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方工程文章 | workflow 与 agent 的限定区分、复杂度取舍和简单可组合模式的工程建议。 | 强制架构标准、跨系统性能、安全或成本保证。 | 2026-07-15 |
| REF-030 | [OpenAI Agents SDK，Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 官方 SDK 文档 | 该 Python SDK 中 LLM 决策与代码编排的区别，以及分类、串联、评估循环和独立任务并行的例子。 | 跨 SDK API、默认并行安全或所有 Agent 的规划机制。 | 2026-07-15 |

## 写作前复核事项

- `TODO(verify)：` 重新访问 REF-030，确认 SDK 页面、术语和模式仍存在；不要引用未复核的 API 参数、版本或默认值。
- `TODO(verify)：` 若正文使用 REF-028 或 REF-004 的实验细节或数字，回到原始论文核对具体任务、设置和指标；本 Brief 不预先批准任何数字。
- `TODO(verify)：` 若案例接入真实 API 认证、测试框架、并发或任务系统，为它们分别建立官方来源和运行证据。
