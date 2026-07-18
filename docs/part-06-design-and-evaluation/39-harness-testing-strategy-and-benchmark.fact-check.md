---
title: "第 39 章事实核验：Harness 测试策略与 Benchmark"
chapter: "39"
status: "completed"
updated_at: "2026-07-17"
---

# 第 39 章事实核验：Harness 测试策略与 Benchmark

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-39-01 | Anthropic 将 task、trial、grader、transcript、outcome、evaluation harness、agent harness 与 evaluation suite 分开；文章还说明评估“一个 Agent”涉及 Harness 与模型的组合，并区分 capability eval 和 regression eval。 | REF-061，2026-07-17 重读 Anthropic《Demystifying evals for AI agents》。 | 可支持正文中的术语断点、多个试次、轨迹／结果分离和能力／回归用途区分；不构成行业标准、固定试次数、评分器保证、统一通过率、模型能力或产品效果。 |
| FC-39-02 | OpenAI 动态指南建议面向具体任务和真实分布设计评估，记录开发日志，尽可能自动评分，持续评估，并用人工反馈校准自动评分；它将只依赖通用指标或主观感觉列为反模式。 | REF-117，2026-07-17 重读 OpenAI《Evaluation best practices》。页面仍含 Evals 平台过渡与停用时间线。 | 可支持任务特定、持续评估、日志案例和人工校准的高层建议；正文未引用产品操作、模型建议、示例数字或停用日期，这些内容不能作为稳定接口。 |
| FC-39-03 | NIST AI RMF Core 的 Measure 功能讨论量化、质化或混合测量，部署前及运行期评估，并要求记录测试集、指标、工具、相近部署条件、生产监测和超出开发条件的泛化限制。 | REF-062，2026-07-17 重读 NIST AI RMF Core 的 Measure 及相关子类。 | 可支持把环境条件、工具、指标、限制和运行期监测写入证据；不构成本章固定测试流程、认证、法规义务、组织阈值、部署许可或安全结论。 |
| FC-39-04 | Raji 等讨论少数高影响 Benchmark 被框定为广泛、通用进步替代指标时的构念效度问题。 | REF-118，2026-07-17 重读 arXiv:2111.15366 摘要与版本信息。 | 可支持 Benchmark 结论必须受任务、数据、指标和适用语境限制；不证明所有 Benchmark 无效，也不提供本书的 Harness 测试或污染检测算法。 |
| FC-39-05 | HELM 以场景和指标分类、多指标评估、缺失／代表不足项及公开原始输入输出提升语言模型评估透明度。 | REF-119，2026-07-17 重读 arXiv:2211.09110 摘要。 | 可作为多维结果、权衡和缺口透明度的研究背景；正文没有移植 HELM 的具体场景、指标、数值、排名或语言模型结论。 |

CH39-REF-01 至 CH39-REF-05 分别映射 REF-061、REF-117、REF-062、REF-118、REF-119；这些映射只支持本表中的受限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型 | 写作限制 |
| --- | --- | --- |
| EM-39-01 | 组件与契约、边界与集成、完整任务、离线 Benchmark、线上观察五层测试模型。 | 是本书按证据职责组织的模型，不称为行业测试金字塔、Anthropic 产品架构、OpenAI 工作流或 NIST 固定流程。 |
| EM-39-02 | 评估套件（Eval Suite）、基准卡（Benchmark Card）和回归测试矩阵（Regression Test Matrix）的字段与责任。 | Eval Suite 名称有来源背景，但三类工件的组合、字段、硬性门和停止路由属于本书工程扩展。 |
| EM-39-03 | 总分不能覆盖结果或权限硬性失败；关键版本未对齐时输出 `not_comparable`。 | 是本书的保守聚合规则，不声称来自论文中的统计阈值、显著性方法或发布标准。 |
| EM-39-04 | 线上信号先形成候选卡，经过授权、隐私、代表性和可复现性审查后才可进入套件。 | 是本书的候选准入模型；来源不授予数据收集权，也不规定本章字段或真实组织流程。 |
| EM-39-05 | Mermaid 图中的五层主链、候选准入、`ready_for_review` 和第 38／42 章交接。 | 只表达本书教学责任；没有从测试结果直接进入发布、灰度、回滚或线上执行的箭头。 |

## 虚构案例与教学对象

| 编号 | 虚构内容 | 不能推出的事实 |
| --- | --- | --- |
| FI-39-01 | 受控成功、工具失败、权限拒绝和上下文缺失四类任务。 | 不代表真实 Agent、模型、工具、权限系统、文件、网络、用户或线上流量已经运行。 |
| FI-39-02 | `suite-v1`、`offline-fixture-v1`、`model-fixture-v1`、`tool-fixture-v1`、`grader-v1`、`harness-v1` 与 `harness-v2`。 | 都是测试构造的教学标识，不是产品版本、外部 ID、公开 Benchmark 或生产配置。 |
| FI-39-03 | 局部工具错误改善但权限硬性门回归的工程案例。 | 只说明矩阵如何同时保留改善与回归；不代表真实缺陷、事故、评分、权限越界、发布或回滚。 |

## 实际纯内存运行证据

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-39-06 | `node --test examples/agent/harness-evaluation-plan-assessment.test.mjs` | 退出码 0；8 项通过、0 项失败。 | `assessHarnessEvaluationPlan` 在测试构造的普通 JavaScript 对象上按合同给出保守路由。 |
| FC-39-07 | `node examples/agent/harness-evaluation-plan-assessment.mjs` | 退出码 0；输出 `ready_for_benchmark`、`evaluation_plan_ready`、`continue_to_offline_review` 与 `executionPerformed: false`。 | 演示对象具备进入教学离线复核的条件；没有运行 Benchmark、模型、工具、评分器、权限、文件、网络或外部操作。 |

Mermaid CLI 的 SVG／PNG 导出和正文—图源逐字比对只证明图示工件可生成且一致，不证明图中测试层、线上观察、准入、发布或回滚已经运行。

## 最小事实修订

- 正文已在延伸阅读中将五项来源的用途限制在术语、评估建议、风险管理背景、构念效度和多指标透明度。
- OpenAI 页面当前仍含 Evals 平台的过渡和停用提示；正文只记录存在动态提示，不写入具体产品日期。
- 正文中的五层模型、三类工件、硬性门、候选准入、状态代码、图示和四类案例均保持为本书模型或教学输入。
- Fact Check 未发现需要改变章节核心论证的来源冲突。

## 明确未核验或不覆盖的范围

- 未运行真实 Agent、模型、工具、评分器、Benchmark、多试次统计、线上监测、用户反馈、文件、网络、权限、账户、凭证、CI、发布、灰度或回滚。
- 未核验任何真实系统的成功率、成本、token、时延、鲁棒性、安全性、权限正确性、代表性、污染程度、统计显著性或业务效果。
- 未把 Anthropic 与 OpenAI 的工程建议、NIST 风险管理框架及两篇论文拼接成跨产品标准、自动发布流程、认证或效果保证。
