---
title: "第 42 章参考资料：Harness 的版本化、回滚和 A/B 测试"
chapter: "42"
status: "completed"
updated_at: "2026-07-26"
---

# 第 42 章参考资料：Harness 的版本化、回滚和 A/B 测试

> 本文件保留 `CH42-REF-*` 作为第 42 章的局部追溯键。正式正文阶段须使用全局编号，并以写作当日重读结果为准。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH42-REF-01 | REF-009 | [Google SRE Workbook：Canarying Releases](https://sre.google/workbook/canarying-releases/) | 官方工程实践 | 2026-07-17 | Canary 是部分、限时的变更部署与评价；需要子集暴露、评价流程和发布集成，并应按候选/对照观察指标、处理隔离污染及保留暂停/回滚出口。 | 固定流量比例、时长、指标、SLO、自动算法、Agent 专用实现或真实部署能力。动态页面后续改写时重读。 |
| CH42-REF-02 | REF-014 | [OpenAI API Reference：Backwards compatibility](https://developers.openai.com/api/reference/overview#backwards-compatibility) | 官方产品文档 | 2026-07-17 | 模型提示行为可能在快照间变化；固定模型版本并为应用运行 evals 的官方建议，以及 API、SDK、模型家族的分层兼容语境。 | 输出确定性、永久可用性、跨模型/供应商兼容、固定质量或任一应用已完成评估。动态页面后续改写时重读。 |
| CH42-REF-03 | REF-109 | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) | 开放版本规范 | 2026-07-17 | 先声明 public API；主／次／补丁版本表达不兼容变化、兼容新增与兼容修复；已发布版本不可原地修改。 | Prompt、模型输出、Skill 或整个 Harness 自动兼容，或版本号能替代行为测试。 |
| CH42-REF-04 | REF-116 | [Microsoft Research：Trustworthy analysis of online A/B tests](https://www.microsoft.com/en-us/research/publication/trustworthy-analysis-of-online-a-b-tests-pitfalls-challenges-and-solutions/) | 原始研究论文页面 | 2026-07-17 | 在线 A/B 分析依赖随机化单位及其统计假设；复杂随机化可能破坏独立同分布近似并导致不可信结论。 | 论文方法适合所有 Agent 任务、固定显著性阈值/样本量，或离线任务集等同线上用户实验。 |
| CH42-REF-05 | REF-148 | [pi 仓库 README](https://github.com/earendil-works/pi) | 开源项目 README | 2026-07-26 | pi 的开源项目背景，以及稳定 Prompt 与可替换系统提示词的项目文档入口。 | 行为可复现保证、长期产品结构、动态统计或本章已运行 pi。 |
| CH42-REF-06 | REF-149 | [Zechner：What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) | 作者构建札记 | 2026-07-26 | 作者对系统提示词变化影响工作流的观察、cchistory 追踪、稳定 Prompt 目标及每任务五次的可复现评测方法。 | Terminal-Bench 具体名次或分数、跨模型保证、行为确定性或本章独立复核过的产品事实。 |

## 使用规则

- Harness Version Manifest、Release Experiment、Compatibility Matrix、Release Decision Record 与 Rollback Runbook 均为本书工程工件，不是来源中的现成产品配置或发布平台。
- 不从来源中推导统一流量比例、实验时长、显著性阈值、成本/延迟界限、自动回滚次数或批准人数；这些若出现，只能是已标明的教学输入或项目策略。
- 真实发布、流量切分、模型调用、监控、特征开关、回滚和外部效果需要独立权限、执行与观察证据。本地来源表不能证明这些能力存在或已经运行。
- 已于 2026-07-26 通读 REF-148 与 REF-149；新增正文只使用计划核定的提示词版本语义与评测方法，不采用排名或动态统计。

## 候选资料完成检查

- [x] 每条资料都有稳定 URL、类型、访问日期、局部键与全局映射状态。
- [x] 每条资料均记录允许陈述与不可外推范围。
- [x] 动态工程、产品和研究页面已标记为 First Draft、Technical Review 与 Fact Check 的重读对象。
- [x] 来源背景、本书工件、虚构案例和未执行行动保持分层。
