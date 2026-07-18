---
title: "第 38 章事实核验：反思、评估与批准模式"
chapter: "38"
status: "completed"
updated_at: "2026-07-16"
---

# 第 38 章事实核验：反思、评估与批准模式

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-38-01 | Anthropic 将 evaluator-optimizer 描述为生成与评价/反馈的循环；清晰评价条件和可测的迭代价值是其适用语境。其 Agent 段落还将环境中的工具或代码结果、人工检查点、阻塞和最大迭代等作为受控推进的工程背景。 | REF-029，2026-07-16 重读 Anthropic《Building effective agents》。 | 可作为本章“反馈不等于修复、需保留证据与停止边界”的背景；不提供本章状态机、默认循环次数、可靠性保证、产品 API 或人类审查充分性。 |
| FC-38-02 | NIST AI RMF Core 将 govern、map、measure、manage 组织为可按组织需要组合、可跨生命周期迭代的功能；govern 是跨功能的，measure 覆盖测试、评估、验证、确认、记录，且独立审查可缓解内部偏差和利益冲突。 | REF-062，2026-07-16 重读 NIST AI RMF Core 在线资源。 | 可作为 Separated Evaluation、记录未覆盖项和风险响应需要治理背景的依据；不构成法规、认证、固定门禁、阈值、审批人数、组织责任或 Agent 产品行为。 |
| FC-38-03 | NIST AI RMF 1.0 要求为人机配置与 AI 系统监督定义并区分角色和责任；测量形成可追溯依据以支持管理决定。 | REF-063，2026-07-16 重读 NIST AI 100-1 原始 PDF。 | 可支持 Approval Gate 需要明确决定责任、证据与记录；不说明任何人的身份、权限、法律授权、组织审批矩阵或具体风险阈值。 |
| FC-38-04 | Google SRE 将 postmortem 说明为事件、影响、处置、成因与预防行动的书面记录，并在无责、建设性的复盘语境中要求审查行动项。 | REF-059，2026-07-16 重读 Google SRE Book《Postmortem Culture》。 | 可支持 Reflection-to-Candidate 与 Decision Package 保留影响、处置、未知项和后续行动；不证明自动根因分析、真实事故流程、任何组织文化或效果结论。 |

CH38-REF-01 至 CH38-REF-04 分别映射 REF-029、REF-062、REF-063、REF-059；这些映射只支持本表中的受限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型或教学输入 | 写作限制 |
| --- | --- | --- |
| EM-38-01 | Observation、Evaluation Evidence、Reflection Record、Candidate Change、Decision Record、五张 Pattern Card、Approval Card 与 Decision Package。 | 是本书的责任路由模型，不称为 Anthropic、NIST 或 Google SRE 的 API、部署方案、组织流程或默认控制流。 |
| EM-38-02 | `collect_more_evidence`、`retry_limited`、`needs_independent_review`、`ready_for_approval`、`rejected`、`escalated` 与 `blocked`。 | 是纯内存教学路由；不表示证据已采集、重试已执行、批准已取得、人工已通知、文件已写入或外部效果已验证。 |
| EM-38-03 | 虚构的相对链接候选和来源事实候选。 | 是注入教学对象，不代表真实 Markdown、链接检查、URL、文件、网络、Git、CI、账户、凭证、审批或回滚。 |
| EM-38-04 | Mermaid 责任图的证据门、反思、候选、分离评估、批准和只读 Decision Package。 | 只表达本书模型；没有“评估通过即批准”“批准即执行”或“回放即回滚”的外部动作结论。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- |
| FC-38-05 | `node --test examples/agent/feedback-approval-route-assessment.test.mjs` | 退出码 0；8 项通过、0 项失败。 | `assessFeedbackApprovalRoute` 在测试构造的纯内存对象上按合同给出保守路由。 |
| FC-38-06 | `node examples/agent/feedback-approval-route-assessment.mjs` | 退出码 0；输出 `ready_for_approval`、`read_only_candidate_ready`、`continue_to_decision` 与 `executionPerformed: false`。 | 演示对象可继续到教学决定；没有执行检查、写入、审批、回滚或其他外部行动。 |

## 最小事实修订

- 正文 front matter 已登记实际示例入口。
- 正文示例说明改为与实现一致的七个注入对象：`candidate`、`evidence`、`reflection`、`evaluation`、`approval`、`escalation` 与 `execution`。
- “本章当前没有可运行实现”已改为实际的纯内存实现状态；该实现不读取或写入外部系统。

## 明确未核验或不覆盖的范围

- 未运行真实 Agent、模型、评估器、浏览器、网络、链接检查、文件读写、Git、CI、部署、账户、凭证、人工审批、回滚、审计或外部系统。
- 未验证真实系统中的独立性、人员资格、组织授权、合规义务、审批有效性、重试安全性、回滚可行性、事故管理、数据保留、性能、安全性或业务效果。
- 未把 Anthropic 的工程建议、NIST 的风险管理框架与 Google SRE 的复盘实践拼接成自动执行、跨组织流程或真实效果保证。
