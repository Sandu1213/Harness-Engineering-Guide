---
title: "第 38 章参考资料：Reflection、Evaluation 与 Approval Patterns"
chapter: "38"
status: "completed"
updated_at: "2026-07-16"
---

# 第 38 章参考资料：Reflection、Evaluation 与 Approval Patterns

> 本文件保留 `CH38-REF-*` 作为第 38 章的局部追溯键。它们复用现有全局引用；正式正文阶段须以全局编号和当日重读结果为准。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH38-REF-01 | REF-029 | [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方工程文章 | 2026-07-16 | evaluator-optimizer 的生成—评价反馈循环、清晰评估条件与可测迭代价值的适用语境；工具/代码结果、检查点、阻塞与停止条件的工程建议。 | 任意产品、模型或任务的默认流程、可靠性保证、循环次数、性能结论或人类审查充分性。动态文章后续改写时必须重读。 |
| CH38-REF-02 | REF-062 | [NIST AI RMF Core：Govern、Map、Measure、Manage](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST 在线核心资源 | 2026-07-16 | 四项功能可按组织环境组合而非作为有序检查表；govern 的跨功能语境；measure 中测试、评估、验证、确认、记录与独立审查的风险管理背景。 | 法规/认证结论、固定门禁、审批人数、阈值、组织责任或 Agent 产品行为。在线资源与配套内容更新时必须重读。 |
| CH38-REF-03 | REF-063 | [NIST：Artificial Intelligence Risk Management Framework (AI RMF 1.0)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | NIST 原始框架 PDF | 2026-07-16 | 人机配置和 AI 系统监督的角色/责任区分、监督过程的定义和记录，以及测量结果为管理决策提供依据的框架背景。 | 人类总能纠正模型、任一审批设计的正确性、具体权限/风险阈值或合规适用性。 |
| CH38-REF-04 | REF-059 | [Google SRE Book：Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) | 官方工程实践 | 2026-07-16 | 事件、影响、处置、成因和预防行动的书面复盘记录；行动项审查与无责、建设性学习的组织实践。 | Agent 自动根因分析、跨组织的复盘阈值、事故流程、效果数据或文化保证。动态页面后续改写时必须重读。 |

## 使用规则

- 本章的 Evidence-first Retry、Reflection-to-Candidate、Separated Evaluation、Approval Gate 与 Escalate-and-Replay 都是本书工程模式，不是上述来源的接口、部署方案或默认控制流。
- 本章不从任何来源推导“低风险”“高置信度”“双人复核”“最大重试次数”或“自动回滚”的默认数值；它们若出现，只能作为教学输入，并说明来源或组织策略。
- 现实批准、执行、回滚、审计和事故响应需要独立的工具权限、组织制度与证据核验。本地来源表不能作为这些能力已经存在或已经运行的证明。

## 候选资料完成检查

- [x] 每条资料都有稳定 URL、类型、访问日期、局部键与正式引用映射。
- [x] 每条资料均记录了可支持的受限陈述与不可外推范围。
- [x] 动态工程/在线资料已标记为 First Draft、Technical Review 与 Fact Check 的当日重读对象。
- [x] 未把来源背景、模式模型、虚构案例或未执行行动混为同一类事实。
