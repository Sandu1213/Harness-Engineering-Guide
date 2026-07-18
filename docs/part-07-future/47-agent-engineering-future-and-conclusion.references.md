---
title: "第 47 章参考资料：Agent Engineering 的未来与结语"
chapter: "47"
status: "completed"
updated_at: "2026-07-17"
---

# 第 47 章参考资料：Agent Engineering 的未来与结语

> 本章不以来源预测未来模型、厂商、价格、标准胜负或时间线。六项资料只支持“哪些变化需要版本、评估、风险、安全与供应链治理”的受限背景；稳定原则、开放问题和读者路线图是对全书工件的工程综合。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH47-REF-01 | REF-014 | [OpenAI API Overview：Backwards compatibility](https://platform.openai.com/docs/api-reference/backward-compatibility) | 官方动态产品文档 | 2026-07-17 | OpenAI 当前说明模型 Prompt 行为可能在快照间变化，并建议固定模型版本和运行 evals。 | 固定版本保证确定输出、任意模型/供应商行为相同、API 永久兼容或某个未来快照能力。 |
| CH47-REF-02 | REF-029 | [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 官方动态工程文章 | 2026-07-17 | 从最简单可行方案开始、按需要增加复杂度；文章内 workflow 采用预定义路径、agent 动态决定过程与工具使用。 | 行业统一定义、自治必然优于 workflow、固定架构/框架、性能结论或未来产品路线。 |
| CH47-REF-03 | REF-117 | [OpenAI API：Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices) | 官方动态指南 | 2026-07-17 | 生成式系统输出可变；评估应围绕具体应用目标、典型/边缘/对抗样例、持续运行与人工校准。 | 自动评分可靠、固定阈值适用、单次通过代表稳定、当前 Evals 产品平台长期存在或跨供应商行为。 |
| CH47-REF-04 | REF-063 | [NIST：Artificial Intelligence Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | NIST 原始框架 | 2026-07-17 | AI RMF 1.0 是自愿、非行业特定、跨生命周期的风险管理框架，Core 包含 GOVERN、MAP、MEASURE、MANAGE。 | 法规或认证要求、固定控制/门禁、Agent 专属框架、组织已合规或系统值得信任。 |
| CH47-REF-05 | REF-125 | [OWASP：LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | 动态安全工程指南 | 2026-07-17 | Prompt Injection 可来自直接或外部内容，并影响数据、工具、记忆与行为；安全需要多层边界。 | 列表覆盖全部攻击、过滤/标签/单一模型能消除风险、本章执行了安全测试或符合标准。 |
| CH47-REF-06 | REF-129 | [SLSA v1.2：Supply chain threats](https://slsa.dev/spec/v1.2/threats-overview) | OpenSSF 规范资料 | 2026-07-17 | 完整性威胁可出现在生产者、创作/审查、源码、构建、发布、分发、包选择和依赖等环节；SLSA 明确不覆盖列出的全部威胁。 | Agent 供应链等同软件包供应链、采用 SLSA 就安全、所有 Skill/Prompt/模型风险都由 provenance 解决。 |

## 来源到章节问题的映射

| 章节问题 | 主要来源 | 本书自行综合的部分 |
| --- | --- | --- |
| 为什么不能把模型行为当稳定接口？ | CH47-REF-01 | Model/Harness/Policy/Evidence 版本矩阵与刷新触发。 |
| 何时增加自治与复杂度？ | CH47-REF-02 | “先契约、再状态、后能力”的渐进路线。 |
| 怎样在能力变化中维持证据？ | CH47-REF-03 | Evaluation Spec、硬门、观察回流与证据有效期。 |
| 为什么组织责任不能交给模型？ | CH47-REF-04 | Human Responsibility Map、风险所有者和决定记录。 |
| 工具更多后最先放大的风险是什么？ | CH47-REF-05 | 不可信内容信封、能力授予、效果观察和停止升级。 |
| Skill、模型、依赖和发布如何进入供应链视角？ | CH47-REF-06 | Agent Asset Register、来源/版本/审查/撤销与未覆盖项。 |

## 使用规则

- 不写“未来一定”“很快”“全面取代”或没有证据的市场时间线。
- 产品页面只描述 2026-07-17 当前行为；出版前重新读取。
- OpenAI 评估页面包含产品平台停用时间线，本章只使用与平台无关的评估设计背景。
- NIST、OWASP 与 SLSA 提供风险背景，不构成法规、认证、固定控制或本仓运行证据。
- 开放问题必须表述为待测假设、设计决策或研究问题，而不是已经成立的事实。
- 全书原则由前 46 章工件与证据综合，不能冒充六项来源的原话或标准。

## 完成检查

- [x] 六项资料均为官方、标准或原始框架页面，并记录写作日访问。
- [x] 每项来源都有允许用途、不可外推与全局 REF 映射。
- [x] 动态产品事实、风险框架与本书工程综合保持分层。
- [x] 未引用预测数字、市场份额、模型排名、价格或未经核验时间线。
- [x] 未声称真实 Agent、模型、工具、安全控制、供应链或组织流程已经运行。
