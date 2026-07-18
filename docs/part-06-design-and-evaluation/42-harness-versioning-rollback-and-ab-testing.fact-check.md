---
title: "第 42 章事实核验：Harness 的版本化、回滚和 A/B 测试"
chapter: "42"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章事实核验：Harness 的版本化、回滚和 A/B 测试

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-42-01 | Google SRE 将 canary 置于对变更进行部分、限时部署与评价的工程语境中，并讨论子集暴露、候选/对照指标、隔离污染、暂停和回滚。 | REF-009，2026-07-17 重读 Google SRE Workbook《Canarying Releases》。 | 可支持有限暴露、分版本观察和保留回滚出口；不提供固定流量、时长、指标、阈值、Agent 算法或真实发布能力。 |
| FC-42-02 | OpenAI API 资料说明模型提示行为可能在快照间变化，并建议固定模型版本、为应用运行 evals。 | REF-014，2026-07-17 重读 OpenAI API Reference 的 backwards compatibility 段落。 | 可支持把模型选择写入 Manifest 并要求应用级评估；不保证输出确定、快照永久可用、跨供应商兼容或本章案例已经评估。 |
| FC-42-03 | Semantic Versioning 2.0.0 要求先声明 public API，再以主、次、补丁版本表达不兼容变化、兼容新增和兼容修复；已发布版本不得原地修改。 | REF-109，2026-07-17 重读 SemVer 2.0.0 规范。 | 可作为“先声明消费方契约”和“证据身份不可原地改写”的受限类比；不证明自然语言 Prompt、Skill、模型输出或整个 Harness 自动兼容。 |
| FC-42-04 | Microsoft Research 的在线 A/B 测试论文讨论随机化单位与独立同分布假设，复杂随机化可能使分析假设失效。 | REF-116，2026-07-17 重读 Microsoft Research 论文页面。 | 可支持显式记录分配单位、共享状态、干扰和分析限制；不提供通用样本量、显著性阈值、实验时长、发布算法或离线任务的线上因果结论。 |

CH42-REF-01 至 CH42-REF-04 分别映射 REF-009、REF-014、REF-109、REF-116；这些映射只支持本表中的受限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-42-01 | Harness Version Manifest、Compatibility Matrix、Release Experiment、Release Decision Record 与 Rollback Runbook。 | 是本书用于分离身份、兼容、比较、决定与恢复验证的工程工件，不称为任一来源的产品配置、发布系统、统计方法或权限机制。 |
| EM-42-02 | `identity_incomplete`、`compatibility_unknown`、`not_comparable`、`ready_for_review`、`rollback_requested` 与 `rollback_verified`。 | 是教学状态；没有对应执行和观察证据时，不表示发布、暴露、回滚、恢复或外部效果已发生。 |
| EM-42-03 | 两种虚构上下文压缩策略、固定教学任务集与注入的版本/比较记录。 | 不代表真实 Prompt、模型、用户、Token、成本、延迟、流量、监控、缓存、记忆或生产数据。 |
| EM-42-04 | Mermaid 图中的 Manifest、兼容性检查、离线比较、人工决定、有限暴露、守护观察和回滚验证链。 | 图只表达本书责任断点，不执行随机分配、模型调用、发布、监控、回滚或统计分析。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-42-05 | `node --test examples/agent/harness-release-experiment-assessment.test.mjs` | 退出码 0；11 项通过、0 项失败。 | `assessHarnessReleaseExperiment` 在测试构造的纯内存对象上按契约给出保守路由。 |
| FC-42-06 | `node examples/agent/harness-release-experiment-assessment.mjs` | 退出码 0；输出 `ready_for_review`、`offline_candidate_ready`、`review_limited_exposure` 与 `executionPerformed: false`。 | 演示对象只可进入人工审查；没有运行 Benchmark、模型、流量、监控、发布或回滚。 |

## 最小事实修订

- 正文已使用正式全局引用 REF-009、REF-014、REF-109 与 REF-116，并将各来源的允许用途和外推禁区写入本章参考资料。
- 正文已登记实际纯内存示例与 Mermaid 导出工件；完成状态没有扩大为真实产品或外部系统结论。
- 本轮未增加价格、流量比例、时长、样本量、显著性阈值、自动回滚次数或批准人数等未经来源和项目策略支持的数字。

## 明确未核验或不覆盖的范围

- 未运行真实模型、Harness、任务集、Benchmark、A/B 平台、流量分配、特征开关、缓存、共享记忆、监控、发布、回滚、网络、文件、Git、CI、账户、凭证或人工审批。
- 未验证真实系统中的实验随机化、样本代表性、统计功效、显著性、多重比较、因果效应、生产安全、兼容性、回滚可行性或残留副作用。
- 未把 Google SRE、OpenAI、SemVer 与 Microsoft Research 的材料拼接成自动发布算法、统一版本规范或跨产品效果保证。
