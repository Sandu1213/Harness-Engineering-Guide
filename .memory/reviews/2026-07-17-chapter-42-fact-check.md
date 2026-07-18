---
title: "第 42 章 Fact Check"
chapter: "42"
stage: "Fact Check"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章 Fact Check

## 范围

- 写作日重新访问 REF-009、REF-014、REF-109 与 REF-116 的 Google SRE、OpenAI、SemVer 和 Microsoft Research 一手页面。
- 核验正文没有把 canary、模型快照建议、SemVer 或在线 A/B 分析写成固定实验参数、自动发布算法、真实授权或外部效果保证。
- 将来源级事实、本书 Release Experiment 工件、虚构压缩策略案例和纯内存运行证据分开写入本章事实核验文件。

## 来源复读结论

- REF-009 支持 canary 的有限、限时部署和评价语境，以及候选/对照观察、隔离、暂停与回滚的工程背景。
- REF-014 支持模型快照行为可能变化、固定版本和应用级 evals 的受限产品建议。
- REF-109 支持 public API、主/次/补丁语义与已发布版本不可原地修改的规范；本章只作有明确契约时的受限类比。
- REF-116 支持随机化单位、独立同分布假设和复杂随机化导致分析不可靠的研究背景。

## 实际运行

1. `node --test examples/agent/harness-release-experiment-assessment.test.mjs`
   - 退出码 0；11 项通过、0 项失败。
2. `node examples/agent/harness-release-experiment-assessment.mjs`
   - 退出码 0；输出 `ready_for_review`、`offline_candidate_ready`、`review_limited_exposure` 与 `executionPerformed: false`。

## 定向校验

- 对正文、事实核验文件和本记录运行 Markdown lint；要求 0 个错误。
- 对上述文件运行 `git diff --check`；要求退出码 0、无空白错误。
- 全仓 `npm run validate` 留给第 39 至 42 章共享状态统一收口后执行。

## 边界与下一项

- 未运行真实模型、Benchmark、A/B 平台、流量、监控、发布、回滚、网络、文件、Git 写入、CI、账户、凭证或审批。
- 纯内存测试只证明注入教学对象的确定性路由，不证明候选兼容、线上更优、发布已生效或回滚已恢复。
- 下一项为 Language Editing。
