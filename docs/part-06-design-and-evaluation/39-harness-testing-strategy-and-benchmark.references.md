---
title: "第 39 章候选参考资料：Harness 测试策略与 Benchmark"
chapter: "39"
status: "research-complete"
updated_at: "2026-07-17"
---

# 第 39 章候选参考资料：Harness 测试策略与 Benchmark

> 本文件保留 `CH39-REF-*` 作为第 39 章的局部追溯键。主线程将在共享引用表中复用已有编号或为新来源分配正式编号；本文件不提前修改 `.ai/references.md`。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH39-REF-01 | REF-061 | [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 官方工程文章 | 2026-07-17 | task、trial、grader、transcript、outcome、evaluation harness、agent harness、evaluation suite 的文章内定义；多个 trial、评分器取舍，以及 capability eval 与 regression eval 的限定讨论。 | 跨产品标准、固定试次数/阈值、评分器可靠性、公开排名、模型能力或客户效果。动态文章在 First Draft、Technical Review 与 Fact Check 必须重读。 |
| CH39-REF-02 | REF-117 | [OpenAI API：Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices) | 官方动态指南 | 2026-07-17 | 任务特定且贴近真实分布的评估、开发期日志、可自动评分、持续评估和人工校准的高层建议；通用指标、主观感觉和失真数据集的反模式。 | OpenAI Evals API、模型选择、示例数字、其他厂商行为或平台长期可用性。访问时页面已公告旧 Evals 平台停用时间线，产品操作内容后续必须重查。 |
| CH39-REF-03 | REF-062 | [NIST AI RMF Core：Map、Measure 与 Manage](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST 在线核心资源 | 2026-07-17 | Measure 对量化/质化/混合测量、Benchmark、监测、部署前测试、运行期定期评估、测试集/指标/工具记录、不确定性、适用条件和独立审查的风险管理背景。 | Agent 固定测试框架、认证、法规义务、具体门槛、组织角色、产品安全或合规结论。在线资源后续阶段必须重读。 |
| CH39-REF-04 | REF-118 | [Raji et al.：AI and the Everything in the Whole Wide World Benchmark（arXiv:2111.15366）](https://arxiv.org/abs/2111.15366) | NeurIPS 2021 Benchmarks and Datasets 立场论文 | 2026-07-17 | 论文对少数高影响 Benchmark 被框定为广泛、通用进步替代指标时的构念效度问题所作讨论。 | 所有 Benchmark 都无效、任何具体系统的能力结论，或本书 Harness 的测试算法和数据方案。 |
| CH39-REF-05 | REF-119 | [Liang et al.：Holistic Evaluation of Language Models（arXiv:2211.09110v2）](https://arxiv.org/abs/2211.09110) | TMLR 2023 原始论文 | 2026-07-17 | HELM 对场景与指标空间的分类、多指标评估、缺失/代表不足项和公开原始输入输出的透明度设计。 | 把 HELM 的场景、指标、数值、模型比较、覆盖率或语言模型结论外推为 Agent/Harness 的默认 Benchmark。 |

## 使用规则

- 测试五层模型、评估套件（Eval Suite）、基准卡（Benchmark Card）、回归测试矩阵及四类教学任务均为本书工程扩展。
- Anthropic 与 OpenAI 的术语和建议只在各自页面语境中使用；不把 evaluation harness 与本书 Harness 视为同一产品或规范。
- NIST AI RMF 是自愿风险管理框架语境，不能作为测试通过、部署许可、安全认证或合规结论。
- 两篇论文提供 Benchmark 构念与多指标透明度背景，不证明本书计划的套件具有代表性、无污染或统计有效。
- 任何模型、工具、平台、Benchmark 的版本、分数、成本、时延和线上效果，若未来需要写入正文，必须在写作当天重新核验并说明条件。

## 正式映射状态

- `CH39-REF-01` 复用 `REF-061`；`CH39-REF-03` 复用 `REF-062`。
- `CH39-REF-02`、`CH39-REF-04`、`CH39-REF-05` 已由主线程分别登记为 `REF-117`、`REF-118`、`REF-119`。
- 局部键只用于 Research Brief、后续 Outline 和审查历史追溯，不能替代全局引用登记。

## 候选资料完成检查

- [x] 每条资料都有固定 URL、来源类型、访问日期、允许用途与外推禁区。
- [x] 动态官方页面已标记为后续阶段的当日重读对象。
- [x] 已区分 Agent 评估工程建议、风险管理框架、Benchmark 批判论文和多指标评估论文。
- [x] 未伪造测试、分数、试次数、成本、线上数据、产品能力或全局引用编号。
