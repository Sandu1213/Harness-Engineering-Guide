---
title: "第 20 章候选参考资料：自改进的工程边界与长期运行 Agent"
chapter: "20"
status: "global-references-registered"
updated_at: "2026-07-16"
---

# 第 20 章候选参考资料：自改进的工程边界与长期运行 Agent

> 全书引用已经登记；原局部键映射为 `CH20-REF-01 → REF-001`、`CH20-REF-02 → REF-009`、`CH20-REF-03 → REF-070`、`CH20-REF-04 → REF-071`。

| 本地键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- |
| REF-001 | [Lilian Weng：Harness Engineering for Self-Improvement（2026-07-04）](https://lilianweng.github.io/posts/2026-07-04-harness/) | 作者原始文章 | 2026-07-16 | 文章把 Harness 描述为围绕基础模型协调执行、工具、上下文、工件和评估的系统；并把“提出—评估—接受”的循环作为自改进 Harness 的研究组织方式之一。 | 不把文章的预测、产品举例、论文实验、架构图或“自改进”概念写成已在本书、任何 Agent 或任何生产环境中实现的事实。 |
| REF-009 | [Google SRE Workbook：Canarying Releases](https://sre.google/workbook/canarying-releases/) | 官方工程实践 | 2026-07-16 | 该章把 canary 描述为对部分、限时变更进行评估，以决定是否继续发布；讨论小而自包含的变更、可归因监控信号与回滚成本。 | 不将服务发布、流量比例、SLO、监控指标或 Google 的组织实践移植为 Agent 的默认实现或性能承诺。在线内容后续改写须重读。 |
| REF-070 | [NIST AI RMF Core：Govern、Manage](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST 在线框架 | 2026-07-16 | Core 在自愿风险管理语境中讨论持续风险管理、明确角色与责任、上线后监控、事件响应、恢复、变更管理与可测量的持续改进。 | 不将其写成固定 Agent 发布流程、认证、法律意见、合规结论或本书候选协议的来源格式。该页面标注 AI RMF 1.0 正在修订。 |
| REF-071 | [Google SRE Workbook：Configuration Design and Best Practices](https://sre.google/workbook/configuration-design/) | 官方工程实践 | 2026-07-16 | 该章讨论配置与结果数据分离、所有权和变更追踪、渐进应用以及配置回滚能力的重要性。 | 不把配置案例直接当作模型、Prompt、Skill 或 Agent 工作流变更的完整安全方案；正文不引用其中的规模或组织经验来证明普适性。 |

## 使用规则

- 候选改进协议（Candidate Change Protocol）、独立验证、范围批准、监控计划、回滚就绪与长期健康检查均是本书工程模型。
- `ready_for_controlled_release` 是纯内存示例状态，不等于候选已经发布、运行、被监控、可回滚，或对任何真实系统有权限。
- 动态文章与在线框架再次用于正式修订时，必须以当日原始页面重新核验。

## 候选资料完成检查

- [x] 每条资料都记录固定 URL、来源类型、访问日期、允许用途与外推禁区。
- [x] 已标出本地临时键需由主线程登记到全局引用表。
- [x] 未将工程类比写成真实 Agent 或生产系统的验证结论。
