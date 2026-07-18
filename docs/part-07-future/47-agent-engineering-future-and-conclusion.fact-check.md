---
title: "第 47 章事实核验：Agent Engineering 的未来与结语"
chapter: "47"
status: "completed"
updated_at: "2026-07-17"
---

# 第 47 章事实核验：Agent Engineering 的未来与结语

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与访问日期 | 直接支持与限定结论 |
| --- | --- | --- | --- |
| FC-47-01 | OpenAI 当前提示模型 Prompt 行为可能在快照间变化，并建议固定模型版本和运行 evals。 | CH47-REF-01／REF-014；2026-07-17 重读 [OpenAI API Overview：Backwards compatibility](https://platform.openai.com/docs/api-reference/backward-compatibility)。 | 只支持当前 OpenAI 产品语境中的变化提醒；不支持固定版本产生确定输出、所有供应商行为相同、永久兼容或未来模型能力。 |
| FC-47-02 | Anthropic 的工程文章建议从最简单可行方案开始、按需要增加复杂度，并在文章内区分预定义 workflow 与动态 agent。 | CH47-REF-02／REF-029；2026-07-17 重读 [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)。 | 只支持渐进增强方向和文章内术语；Stage 0 至 7、工件、状态与门禁均为本书综合，不是文章的行业标准。 |
| FC-47-03 | OpenAI 当前评估指南强调生成式系统的可变性、任务特定评估、典型/边缘/对抗样例、持续评估和人工校准。 | CH47-REF-03／REF-117；2026-07-17 重读 [OpenAI API：Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices)。 | 只使用平台无关的设计背景；不依赖当前产品操作、平台停用信息、固定阈值，也不声称模型评分可替代人工决定。 |
| FC-47-04 | NIST AI RMF 1.0 定位为自愿、非行业特定、跨生命周期框架，Core 包含 GOVERN、MAP、MEASURE、MANAGE。 | CH47-REF-04／REF-063；2026-07-17 重读 [NIST：Artificial Intelligence Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)。 | 直接支持框架定位和四项 Core 功能；不构成法规、认证、Agent 专属控制、固定门禁或本项目合规证明。 |
| FC-47-05 | Prompt Injection 可来自直接输入或外部内容，并影响数据、工具、记忆与行为。 | CH47-REF-05／REF-125；2026-07-17 重读 [OWASP：LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)。 | 支持直接/间接注入和纵深防御背景；不支持攻击列表完整、单一过滤器有效或本章已执行安全测试。 |
| FC-47-06 | SLSA v1.2 展示从生产者、源码、构建、发布、分发、包选择到依赖的供应链完整性威胁，并明确不覆盖列出的全部威胁。 | CH47-REF-06／REF-129；2026-07-17 重读 [SLSA v1.2：Supply chain threats](https://slsa.dev/spec/v1.2/threats-overview)。 | 只支持软件供应链背景和覆盖边界；Agent Asset Register 是受限类比，不能把 Agent 风险等同软件包风险或把 provenance 写成安全。 |

六项来源均保持 Research Brief 与 references 文件中记录的允许用途。本章没有使用来源预测未来模型、供应商、价格、市场份额、标准胜负、自治时间线或组织替代。

## 本书工程模型与虚构输入

| 编号 | 工程模型或教学输入 | 事实边界 |
| --- | --- | --- |
| EM-47-01 | 七项稳定责任、七类开放问题、五层标准化阶梯、Stage 0 至 7 与读者实践路线。 | 均为全书工程综合；不称为六项来源共同定义的标准、成熟度模型或未来预测。 |
| EM-47-02 | Human Responsibility Map、Agent Asset Register、Regression Matrix、Capability Grant Record 与各类保守状态。 | 是本书责任、资产、比较或准入工件；不发放权限、不形成供应链认证、统计有效性或组织批准。 |
| EM-47-03 | 虚构脚本场景、纯内存输入和 Mermaid 演进地图。 | 不描述真实系统、团队、账户、生产环境、权限、安全控制、部署或发布行为。 |

## 当前仓库与运行证据

| 编号 | 检查 | 当前结果 | 支持的有限结论 |
| --- | --- | --- | --- |
| FC-47-07 | `node --test examples/agent/agent-engineering-readiness-assessment.test.mjs` | 退出码 0；11 项通过、0 项失败。 | 纯函数对虚构注入对象按声明顺序保守路由；不读取真实状态或运行外部系统。 |
| FC-47-08 | `node examples/agent/agent-engineering-readiness-assessment.mjs` | 退出码 0；输出 `ready_for_bounded_pilot_review`、`bounded_pilot_evidence_ready`、`request_named_human_decision` 与 `executionPerformed: false`。 | 只说明教学对象进入具名人工审查候选；不表示批准、部署、上线或长期自治。 |
| FC-47-09 | Mermaid 图源、正文图块、SVG/PNG 与视觉审查记录。 | Mermaid CLI 11.16.0 导出成功；PNG 为 1568×2972 RGB；正文图块与 `.mmd` 逐字一致并已视觉检查。 | 只证明当前图示工件一致和可读；不证明图中阶段、控制或责任真实存在。 |
| FC-47-10 | 正文外部与本地链接。 | 14 个链接全部通过。 | 只证明当前目标可定位；不证明来源完整、内容永久稳定或外部系统已经运行。 |

## 最小事实修订

- Technical Review 已将新出现的 `Eval Contract` 统一回第 17 章既有 Evaluation Spec，将 `Capability Grant` 统一回第 41 章既有 Capability Grant Record。
- 六项外部陈述均获得直接支持，无需扩大、删除或新增预测性 claim。
- 正文继续把来源事实、本书综合、虚构输入、纯内存运行证据和真实世界未验证项分开。

## 明确未核验或不覆盖的范围

- 未运行最终全仓 `npm run validate`，未证明 47 章、共享进度、Current State、Next Task、Handoff、目录、词表与引用已完成最终同步。
- 未运行真实模型、Tool、Agent、身份、权限、评估平台、安全测试、供应链验证、审批、部署、发布或长期自治。
- 未验证任何未来模型能力、产品路线、价格、协议胜负、市场规模、组织替代或时间线。
- 本轮动态来源复读只支持表中六项 claim；页面中的其他产品细节、示例、阈值或控制不能自动带入正文。
