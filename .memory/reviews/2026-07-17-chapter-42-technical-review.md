---
title: "第 42 章 Technical Review：Harness 的版本化、回滚和 A/B 测试"
chapter: "42"
stage: "Technical Review"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章 Technical Review：Harness 的版本化、回滚和 A/B 测试

## 审查范围

- Research Brief、候选参考资料、详细 Outline 与 First Draft。
- REF-009、REF-014、REF-109、REF-116 的原始/官方页面及各自外推禁区。
- 与第 17、20、34、39、40、41 章的责任边界，以及第 43、45 章已在相邻正式章节使用的稳定关联标识。
- Harness Version Manifest、Compatibility Matrix、Release Experiment、Release Decision Record 与 Rollback Runbook 的术语、状态和未执行边界。

## 结论

`通过并做最小修正`。正文将版本身份、消费方兼容、离线对照、有限灰度、线上 A/B、发布决定、回滚请求、实际应用和恢复验证分开，没有把版本号、离线分数或批准记录写成真实外部效果。四项来源只支撑其明确范围；固定流量比例、实验时长、统计阈值、价格和自动回滚算法均未写入。

## 发现与修正

1. **未验证的第 44 章 slug：** 草稿 front matter 曾使用尚无正式章节文件支撑的 `44-ai-technical-book-factory`。本轮删除该关联，只保留已在当前正式章节中复用的第 43、45 章标识；第 44 章创建正式文件后再登记其稳定 slug。
2. **全局术语缺口：** 五类核心工件尚未登记到 `.ai/glossary.md`。主线程已补入受限定义，并明确它们不执行发布、实验或回滚。
3. **阶段状态：** 完成检查表已将 Technical Review 标为已完成，图示、示例、事实核验、语言和终审仍保持未完成。

## 来源复核

| 引用 | 复核结果 | 正文允许使用的范围 |
| --- | --- | --- |
| REF-009 | 写作日重读 Google SRE Canarying Releases。 | 部分/限时暴露、子集、评价、分版本指标、隔离污染、暂停与回滚的工程语境；不提供 Agent 算法或统一参数。 |
| REF-014 | 写作日重读 OpenAI API Backwards Compatibility。 | 模型提示行为可能在快照间变化，固定版本与应用 evals 的产品限定建议；不保证确定性或永久可用。 |
| REF-109 | 写作日重读 SemVer 2.0.0。 | public API、主/次/补丁语义和已发布版本不可原地修改；只作 Harness 契约沟通的受限类比。 |
| REF-116 | 写作日重读 Microsoft Research 原始论文页面。 | 随机化单位、独立同分布假设和复杂随机机制可能导致不可信分析；不提供本章统计算法、阈值或样本量。 |

## 未覆盖范围与下一步

- 本轮未创建或运行纯内存示例、Node 测试、Mermaid 图源、SVG/PNG、模型调用、Benchmark、特征开关、流量、监控、发布或回滚。
- Example Implementation 只能实现纯内存 `assessHarnessReleaseExperiment`，并保留 `executionPerformed: false`。
- Diagram Review 必须让“候选接受不等于发布”“A/B 差异不等于因果证明”“回滚请求不等于恢复”可见；导出物只在实际生成后登记。
