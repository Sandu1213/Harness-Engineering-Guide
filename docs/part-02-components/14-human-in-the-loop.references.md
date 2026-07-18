---
title: "第 14 章候选参考资料：Human-in-the-loop"
chapter: "14"
status: "research-complete"
updated_at: "2026-07-16"
---

# 第 14 章候选参考资料：Human-in-the-loop

> 本文件保留第 14 章的局部来源登记。正式条目已经并入全局 `.ai/references.md`；`CH14-REF-*` 仅用于历史追溯，正文和发布工件使用对应 `REF-*` 编号。

| 本地键 | 正式引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH14-REF-01 | REF-048 | [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | NIST 原始框架 | 2026-07-16 | AI RMF 1.0 将人类角色、责任与监督列为 Human-AI Interaction 的风险管理议题，并说明有些系统未必需要人类监督。 | 不把自愿框架写成法律义务、固定审批流程或 Agent API。 |
| CH14-REF-02 | REF-049 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | NIST 在线核心资源 | 2026-07-16 | AI RMF 1.0 的 Govern 3.2、Map 3.5 分别涉及人机配置/监督的角色责任，以及定义、评估和记录人类监督过程。 | 不把结果项解释为某产品功能、阈值、人员配置或自动化规则。 |
| CH14-REF-03 | REF-050 | [OpenAI Agents SDK: Human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/) | 官方 SDK 文档 | 2026-07-16 | 该 Python SDK 可让受审批的敏感工具调用中断运行，批准或拒绝后恢复；审批可按具体调用标识限定。 | 不外推到 Responses API、其他 SDK、MCP 服务或通用 Agent 的默认行为、安全性和持久化属性。动态 SDK 内容需在后续改写时重查。 |
| CH14-REF-04 | REF-051 | [OpenAI: A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | 官方工程指南 | 2026-07-16 | 该指南将超过失败阈值与敏感、不可逆或高风险动作列为应考虑人工介入的两类触发器。 | 不将其示例写成强制法规、统一阈值、完备风险模型或跨产品保证。动态网页需在后续改写时重查。 |
| CH14-REF-05 | REF-052 | [EU AI Act: Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) | 欧盟官方法规文本 | 2026-07-16 | 仅在讨论适用范围明确的高风险 AI 系统时，用于定位其第 14 条关于人类监督的专门规定。 | 不在本章提供法律意见，不判断具体系统是否属于高风险，不陈述生效时间、地域适用或合规结论。 |

## 使用规则

- 来源明确表达的内容只用于其限定语境；人工批准矩阵（Approval Matrix）、行动卡（Action Card）、审批记录（Approval Record）、刷新条件与教学示例均为本书工程模型。
- REF-050 与 REF-051 是持续演进的产品资料。后续修改正文时必须重新读取官方页面，不能仅凭本文件的摘要继续写作。
- REF-052 只帮助读者识别“法规语境与一般工程建议不同”；涉及法律义务、部署地区或系统分级时必须由具备相应权限的专业人员和当日法规文本核验。
- 没有为本章记录性能数字、成功率、人工审核时间或成本数据；若未来需要此类结论，必须新增可复查来源与具体条件。

## 候选资料完成检查

- [x] 每条资料均给出固定 URL、来源类型与写作日访问日期。
- [x] 每条资料均说明允许使用范围与禁止外推范围。
- [x] 没有复制来源段落，也没有把产品文档改写成通用保证。
- [x] 本地键已映射到全局正式引用；正文和发布工件应使用 `REF-*`。
