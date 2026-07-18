---
title: "第 17 章事实核验：Evaluation 与可验证结果"
chapter: "17"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 17 章事实核验：Evaluation 与可验证结果

## 核验范围

本次核验覆盖第 17 章正文、Research Brief、Chapter Outline、候选资料和纯内存示例的来源边界。它不验证真实 Agent、模型、评估平台、CI、外部链接、真实文档、用户理解、性能指标、生产权限或任何 Benchmark 成绩。

## 来源级核验

| 引用键 | 2026-07-16 实际读取的来源 | 正文允许陈述 | 复核结论与外推禁区 |
| --- | --- | --- | --- |
| C17-REF-01 | [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 文章对 task、trial、grader、transcript、outcome、evaluation harness 与 agent harness 的限定定义；讨论代码、模型、人工评分器，能力/回归评估、环境隔离、轨迹复核和评分器公平性。 | 正文没有使用其客户案例、产品分数、具体 YAML、模型能力或规模数字；其术语和建议不被写成行业标准。网页为动态资料，后续改写需重读。 |
| C17-REF-02 | [NIST AI RMF Core：Measure](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Measure 语境涉及选用、应用、记录测量方法，以及客观、可重复或可扩展的测试、评估、验证和确认过程。 | 四类标准、Evidence Matrix、Quality Gate 和状态名是本书模型；正文未将 AI RMF 写成固定 Agent 测试、认证或合规保证。页面指出 AI RMF 1.0 正在修订。 |
| C17-REF-03 | [NIST AI RMF 1.0 PDF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | 该框架是自愿风险管理框架，并在可信特征和 Measure 相关语境中讨论有效性、可靠性与持续测试背景。 | 正文不推导法规义务、具体阈值、产品能力、真实风险结论或部署适用性。 |
| C17-REF-04 | [Zheng et al.：Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) | 论文把位置、冗长和自我增强列为 LLM 评判器的限制/偏差来源。 | 正文不引用排行榜、百分比、模型胜负或该论文结果来证明本书任何评判器可靠；只用它支持“模型评分应有独立校准与限制”的研究背景。 |

## 本书模型与事实的分界

| 内容 | 分类 | 核验结果 |
| --- | --- | --- |
| Evaluation Spec、Evidence Matrix、Quality Gate 和四类标准 | 本书工程模型 | 字段、名称、顺序和出口均未归因给厂商、NIST 或论文。 |
| `accepted`、`rejected`、`needs_evidence`、`needs_review`、`needs_spec` | 纯内存教学状态 | 未描述为真实 CI、SDK、模型或外部状态。 |
| 文档更新联合质量门案例 | 教学案例 | 不涉及本仓库或外部项目的真实文件、命令、链接、引用、读者或发布结果。 |
| “先看规格与评分器，再解释分数变化” | 本书工程建议 | 与来源的评估维护讨论一致，但表述与流程为本书原创扩展。 |

## 示例与图示复核

2026-07-16 已实际执行：

```bash
node --test examples/agent/evaluation-spec-assessment.test.mjs
node examples/agent/evaluation-spec-assessment.mjs
```

首轮新增冲突证据测试按预期失败：函数把同一标准的相互冲突记录错误地接受为 `evaluation_accepted`。修正冲突处理后，9 项 Node 内置测试通过、0 项失败。交叉审查随后发现未知/缺失状态、范围与新鲜度守卫、可选项缺证的契约缺口；为这些路径补充测试和实现后，14 项 Node 内置测试通过、0 项失败；演示输出 `accepted` / `evaluation_accepted` / `docs-update-evaluation`。这些结果只验证注入对象的确定性判断，不验证真实 Markdown、链接、模型评判、人工校准、外部状态或任务完成。

同日还实际运行 Mermaid CLI 导出 SVG/PNG，并比较正文 Mermaid 块与源文件；命令与结果见[图示审查](../../.memory/reviews/2026-07-16-chapter-17-diagram-review.md)。图只表达本书的评估管线。

## 待核验与动态边界

- `TODO(verify)：` 若接入具体模型评判器，必须在写作/实现当日记录模型与版本、Rubric、提示词、校准样本、人工抽检方法和数据处理边界；本章没有这些生产证据。
- `TODO(verify)：` 若引用任何模型、Agent、Benchmark、评估平台或具体得分，必须复核原始论文或当日官方资料，并说明任务、环境和评分器。
- `TODO(verify)：` 若以 NIST AI RMF 作为合规或法律依据，必须使用当日官方文本和适用领域的专业审查；本章只使用风险管理背景。
- `TODO(verify)：` 外部链接可达性、真实文档事实与用户体验需通过本章之外的实际检查和人工评估证明。

## Fact Check 完成检查

- [x] 四项来源均已在写作日实际读取，并逐项限定用途与外推禁区。
- [x] 产品/工程文章、NIST 框架、论文与本书模型没有混成单一事实层。
- [x] 示例和图示没有被描述为真实外部评估系统或真实任务结论。
- [x] 动态资料、模型评判、法规语境和生产验证仍保留重新核验要求。
