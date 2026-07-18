---
title: "第 14 章事实核验：Human-in-the-loop"
chapter: "14"
status: "fact-check-complete"
updated_at: "2026-07-16"
---

# 第 14 章事实核验：Human-in-the-loop

## 核验范围

本次核验覆盖正文、Research Brief、Chapter Outline、局部候选资料和纯内存示例的边界。它不验证真实审批系统、身份、权限、漏洞、依赖、发布、法规适用性或人类决定质量。

## 来源级核验

| 引用键 | 2026-07-16 实际读取的来源 | 正文允许陈述 | 复核结论与外推禁区 |
| --- | --- | --- | --- |
| REF-048 | [NIST AI RMF 1.0 PDF，Appendix C](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | AI RMF 在人机交互语境中讨论定义和区分人类角色、责任及监督，且并非所有 AI 系统都需要同样的人类监督。 | 正文将其表述为自愿风险管理背景；没有写成固定审批工作流、法律要求或字段规范。 |
| REF-049 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Govern 3.2 涉及定义和区分人机配置/监督的角色责任；Map 3.5 涉及定义、评估和记录人类监督过程。 | 行动卡、矩阵和审批记录是本书扩展，未归因给 NIST。在线资源说明 AI RMF 1.0 正在修订，后续改写需再次核验。 |
| REF-050 | [OpenAI Agents SDK Python: Human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/) | 在该 SDK 中，需审批的敏感 Tool 调用可使运行中断；决定能按具体调用处理后再恢复。 | 正文每次使用都标为 Python SDK 的限定流程；未把 `needs_approval`、中断、序列化或 MCP 支持外推到其他运行时。 |
| REF-051 | [OpenAI: A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | 该指南将超过失败阈值和敏感、不可逆或高风险动作列为考虑人工介入的两类触发器。 | 本章没有写入默认阈值、重试次数、风险分数或跨产品保证。该网页是动态内容，未来修改时重读。 |
| REF-052 | [Regulation (EU) 2024/1689，Article 14](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) | 第 14 条位于高风险 AI 系统的专门要求语境，并涉及有效人类监督、与风险/自主程度/使用语境相称的监督措施。 | 正文只用它提示法规语境与一般工程建议不同；不判断适用性、合规、地域或时间表。 |

## 本书模型与事实的分界

| 内容 | 分类 | 处理结果 |
| --- | --- | --- |
| 批准、复核、共同决策、接管、事后纠错五分法 | 本书工程模型 | 未归因给任何标准或产品。 |
| Action Card、Approval Matrix、Approval Record、Refresh Condition | 本书工程模型 | 说明其审查目的和不具备的身份/权限/审计能力。 |
| `allowed`、`requires_approval`、`needs_evidence`、`rejected`、`blocked` | 纯内存教学示例状态 | 未写成真实工作流、SDK 类型或外部事件。 |
| 依赖漏洞修复建议与发布门 | 教学案例 | 不包含真实 CVE、版本、严重性、测试、发布或修复结论。 |

## 可运行示例复核

2026-07-16 已实际重新运行：

```bash
node --test examples/agent/human-approval-routing.test.mjs
node examples/agent/human-approval-routing.mjs
```

前者退出 0，交叉审查补齐两条行为断言后共 10 项 Node 内置测试通过、0 项失败；后者退出 0，输出 `allowed` / `auto_candidate` / `dependency-update-plan`。这只验证注入教学对象的确定性路由，不验证真实审批、人类身份、权限、执行、外部效果或法规合规。

## 待核验与动态边界

- `TODO(verify)：` 接入任何实际审批、代码托管、工单、漏洞、发布或云服务前，需以写作当日的官方文档核验具体 API、权限、持久化与安全行为。
- `TODO(verify)：` 若正文将引用 EU AI Act 的适用范围、实施日期、义务或具体系统分类，必须使用当日官方法规文本和授权的法律审查；本章当前不作这些陈述。
- `TODO(verify)：` 任何人工审批效率、误判率、延迟、成本或可靠性数字都需要新增来源和适用条件；本章没有使用此类数字。

## Fact Check 完成检查

- [x] 五项局部来源均于写作日实际读取，并记录允许用途与外推禁区。
- [x] 产品、框架、法规和本书模型未混为同一层级。
- [x] 示例、图示与案例没有被描述为真实外部系统事实。
- [x] 动态资料和法律边界仍保留重新核验要求。
