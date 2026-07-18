---
title: "第 41 章候选参考资料：安全、权限与审计"
chapter: "41"
status: "candidate"
updated_at: "2026-07-17"
---

# 第 41 章候选参考资料：安全、权限与审计

> 本文件以 `CH41-REF-*` 保留章节内追溯键。除已复用的 `REF-086` 外，其余全局 `REF-*` 编号由主线程统一分配；候选状态不表示正文已完成，也不表示任何权限、秘密、日志、安全控制或事件响应系统已经部署或运行。

| 本地键 | 全局引用 | 来源 | 类型与版本 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH41-REF-01 | REF-125 | [OWASP Cheat Sheet Series：LLM Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | OWASP 安全工程指南，动态在线页 | 2026-07-17 | 直接/间接提示注入、不可信网页/文档/工具内容、指令与数据分离、输入/输出检查、最小权限和高风险人工监督的纵深防御背景。 | 任何单一控制可消除提示注入；页面示例代码、阈值、模型清单与研究数字成为本书默认值或运行证据。 |
| CH41-REF-02 | REF-126 | [NIST SP 800-53 Rev. 5：Security and Privacy Controls for Information Systems and Organizations](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | NIST 最终出版物，Rev. 5；页面将 Release 5.2.0 列为补充材料 | 2026-07-17 | Rev. 5 原始 PDF 中 AC-6 对完成任务所需已授权访问的最小权限要求；AU-3 的事件类型、时间、位置、来源、结果、关联主体/对象字段及隐私风险提醒。 | 已实施 NIST 控制、已通过评估、满足法规/认证，或本书字段能证明身份、完整性与不可抵赖性。后续发布须按明确版本重读。 |
| CH41-REF-03 | REF-127 | [OWASP Cheat Sheet Series：Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | OWASP 安全工程指南，动态在线页 | 2026-07-17 | 细粒度访问、秘密创建/轮换/撤销/过期、秘密访问审计、事件响应与避免在日志中记录明文秘密的背景。 | 固定轮换周期、特定云产品、集中架构、算法、可用性或自动化流程已适用于本仓并真实运行。 |
| CH41-REF-04 | REF-128 | [OWASP Cheat Sheet Series：Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) | OWASP 安全工程指南，动态在线页 | 2026-07-17 | when/where/who/what、交互关联、动作/对象/结果/理由字段；敏感数据排除/脱敏；日志注入防护和日志访问、修改、删除保护。 | 全量记录原始内容、集中存储、某字段集或某保留期自动满足安全、隐私、审计、取证与法律要求。 |
| CH41-REF-05 | REF-086 | [MCP：Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | MCP 官方安全资料，动态在线页 | 2026-07-17 | token passthrough、confused deputy、SSRF、本地 Server、scope 最小化与提升事件关联信息的协议特定风险/缓解背景。 | 所有 Harness 使用 MCP；该页替代 OAuth、源系统授权、网络隔离、供应链审查或完整威胁模型；本仓已实施任何控制。 |
| CH41-REF-06 | REF-129 | [SLSA v1.2：Supply chain threats](https://slsa.dev/spec/v1.2/threats-overview) | OpenSSF SLSA 规范 v1.2 的威胁概览 | 2026-07-17 | 软件供应链在生产者、编写/审查、源码、构建、发布、分发、包选择与依赖环节的完整性风险，以及 SLSA 未覆盖全部威胁的明示边界。 | 某级别保证软件安全、生产者可信、依赖无漏洞，或本仓已生成/验证 provenance、采用受保护构建平台。 |
| CH41-REF-07 | REF-130 | [NIST SP 800-61 Rev. 3：Incident Response Recommendations and Considerations for Cybersecurity Risk Management](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | NIST 最终出版物，2025 年 4 月 | 2026-07-17 | 将事件响应建议贯穿 CSF 2.0 风险管理活动，并连接准备、检测、响应和恢复的框架背景。 | 固定响应步骤、通知时限、角色、取证、监管义务，或本书案例已完成真实遏制与恢复。 |

## 来源使用规则

- CH41-REF-01、03 与 04 是 OWASP 的安全工程指南，不是标准、认证或针对本仓的安全测试结果；只采用与本章问题直接相关的原则，不复制其长段文本、示例实现、产品列表和数值。
- CH41-REF-02 必须以明确版本和控制编号使用。正文可以说明 AC-6 与 AU-3 的限定语义，但不得把 NIST 控制目录改写成 Harness 的固定 schema 或合规清单。
- CH41-REF-05 只用于 MCP 特定案例。正文若讨论其他工具协议、身份或授权系统，需要各自的一手资料，不能从 MCP 外推。
- CH41-REF-06 明确承认 SLSA 未覆盖全部列出威胁。正文不得把 provenance、级别或构建控制写成恶意生产者、漏洞、运行时配置或 Agent 工具安全的充分条件。
- CH41-REF-07 只提供持续风险管理中的事件响应背景；实际角色、时限、证据保全、通知与恢复方案必须由适用组织和专业人员确定。
- 所有访问日期只证明研究日读取了来源，不证明来源控制已经实现，也不证明本仓、任何 Agent 或外部系统通过了安全测试。

## 交由主线程的集成提示

- CH41-REF-01、02、03、04、06、07 已由主线程分别登记为 REF-125 至 REF-130；CH41-REF-05 继续复用 REF-086。
- 按需评估是否将 Harness 威胁模型（Harness Threat Model）、不可信内容信封（Untrusted Content Envelope）、能力授予记录（Capability Grant Record）、安全决定记录（Security Decision Record）、审计事件信封（Audit Event Envelope）和安全事件交接包（Security Incident Handoff）加入全局术语表。它们均为本书工程模型。
- First Draft、Technical Review 与 Fact Check 应在对应写作日重读动态在线来源，并记录 NIST/SLSA 的明确版本；若来源发生实质变化，更新允许陈述与外推禁区，而不是静默沿用本表。

## 候选资料完成检查

- [x] 每条资料都有稳定 URL、来源类型、版本或动态性、访问日期和局部追溯键。
- [x] 每条资料均记录允许支持的限定陈述与不可外推范围。
- [x] 来源事实、本书模型、教学案例和未运行的真实安全系统已分开。
- [x] 本阶段未创建正文、Chapter Outline、图示、示例、测试、npm 入口或真实安全控制。
