---
title: "第 20 章事实核验：自改进的工程边界与长期运行 Agent"
chapter: "20"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 20 章事实核验：自改进的工程边界与长期运行 Agent

## 核验范围

本次核验覆盖正文、Research Brief、提纲、局部候选来源、图示和纯内存示例的事实边界。它不验证任何模型训练、模型权重更新、外部 Agent、发布、真实 Canary、监控、回滚、权限、数据、网络、后台作业或长期运行系统。

## 来源级核验

| 引用键 | 2026-07-16 实际读取的来源 | 正文允许陈述 | 外推禁区 |
| --- | --- | --- | --- |
| REF-001 | [Lilian Weng：Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) | Harness 围绕模型协调执行、工具、上下文、工件和评估；文章以候选提出、评估和接受等循环组织自改进研究。 | 不使用实验数字、预测、产品例子或论文结果证明本书/任意 Agent 已具备自改进能力。 |
| REF-009 | [Google SRE Workbook：Canarying Releases](https://sre.google/workbook/canarying-releases/) | canary 是部分、限时变更及其评估，可用于决定是否继续；资料讨论小变更、可归因监控和回滚背景。 | 不写出实际流量比例、SLO、Google 运行环境、发布算法或跨系统保证。 |
| REF-070 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | 自愿风险管理语境中包含持续风险管理、角色责任、上线后监控、事件响应、恢复、变更管理与可测量持续改进。 | 不导出法规义务、认证、固定 Agent 协议或具体部署结论；AI RMF 1.0 正在修订。 |
| REF-071 | [Google SRE Workbook：Configuration Design and Best Practices](https://sre.google/workbook/configuration-design/) | 资料讨论变更追踪、所有权、渐进应用和回滚能力。 | 不把配置实践写成 Prompt、Skill、模型或 Agent 变更的充分安全证明。 |

## 本书模型与事实的分界

| 内容 | 分类 | 核验结论 |
| --- | --- | --- |
| Candidate Change Protocol、Change Gate、长期健康检查 | 本书工程模型 | 字段、门序、状态名和停止条件均为原创教学设计。 |
| `needs_spec`、`needs_evidence`、`needs_approval`、`rejected`、`ready_for_controlled_release` | 纯内存教学状态 | 未被写成 SDK、CI、发布平台或真实外部状态。 |
| 重试策略候选案例 | 教学案例 | 不请求网络、不变更本仓库、不发布、不回滚。 |
| Canary、NIST、配置变更的叙述 | 受限工程背景 | 仅支持文中明确限定的类比，未外推为 Agent 默认机制。 |

## 示例与图示复核

2026-07-16 实际先运行测试，得到 `ERR_MODULE_NOT_FOUND`；原因是 `self-improvement-boundary-assessment.mjs` 尚未创建。这是预期红灯，不表示候选或任何外部系统失败。

实现后实际执行：

```bash
node --test examples/agent/self-improvement-boundary-assessment.test.mjs
node examples/agent/self-improvement-boundary-assessment.mjs
```

结果为 10 项 Node 内置测试通过、0 项失败；演示输出 `ready_for_controlled_release` / `candidate_change_gate_passed`。这只验证注入对象的确定性判断。Mermaid 导出和局部 Markdown/链接检查的实际命令与结果见审查记录。

## 待核验与动态边界

- `TODO(verify)：` 若将候选用于真实 Prompt、Skill、工作流、模型或配置变更，须在执行日记录版本、数据、独立评估器、权限、批准人、监控、预算、回滚/补偿与事件响应方案。
- `TODO(verify)：` 若引用 Canary、NIST 或任何产品的具体流程、参数、指标或法规结论，须重读当日原始页面并限定适用范围。
- `TODO(verify)：` 真实长期任务必须通过外部系统观测来证明健康、漂移、资源消耗和恢复能力；本章没有这类证据。

## Fact Check 完成检查

- [x] 四项来源已于写作日读取，且每项有允许用途与外推禁区。
- [x] 未把来源背景、本书协议和教学示例混写成真实运行时事实。
- [x] 已记录示例红绿验证的真实结果和无外部副作用范围。
- [x] 已为动态资料和真实部署保留重新核验要求。
