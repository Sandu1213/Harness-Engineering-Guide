# 第 47 章 Technical Review

- 日期：2026-07-17
- 章节：`docs/part-07-future/47-agent-engineering-future-and-conclusion.md`
- 结论：可继续进入 Example Implementation；本结论不表示示例、图示、事实核验、语言编辑、最终审查、真实 Agent 运行或全书出版已完成。

## 审查输入

- 第 47 章 Research Brief、References、Outline 与 First Draft。
- CH47-REF-01 至 CH47-REF-06，对应 REF-014、REF-029、REF-117、REF-063、REF-125、REF-129。
- 第 1、17、26、35、38、41、42、43 至 46 章的当前工程工件与责任边界。
- `.ai/glossary.md` 中既有的 Task Contract、Tool Contract、Evaluation Spec、Capability Grant Record、Evidence Card、Decision Record 等术语。

## 来源与事实核对

| 来源 | 正文使用 | 结论 |
| --- | --- | --- |
| REF-014 | OpenAI 当前提示模型 Prompt 行为可能跨快照变化，并建议固定模型版本和运行 evals。 | 保持产品特定与写作日限定；未外推到所有供应商或确定输出。 |
| REF-029 | 从最简单可行方案开始，并在文章语境中区分 workflow 与 agent。 | 只支持渐进增强方向；七阶段路线与状态均标为本书综合。 |
| REF-117 | 生成式系统评估需任务特定、包含典型／边缘／对抗样例、持续运行并结合人工校准。 | 未依赖当前产品操作、停用时间或固定阈值。 |
| REF-063 | NIST AI RMF 1.0 的自愿、非行业特定、跨生命周期定位，以及 GOVERN、MAP、MEASURE、MANAGE。 | 未写成法规、认证、Agent 专属控制或组织合规证明。 |
| REF-125 | Prompt Injection 可来自直接或间接内容，并影响数据、工具、记忆和行为。 | 只支持纵深防御背景；未宣称单一控制能消除风险。 |
| REF-129 | SLSA v1.2 的软件供应链完整性威胁与覆盖边界。 | 只作 Agent Asset Register 的受限类比；未把 provenance 等同安全。 |

## 关键技术审查

1. **稳定责任不是未来预测。** 任务、上下文、能力、状态、观察、评估与人类责任被写成持续需要回答的问题，没有预测模型、厂商、协议胜负或时间线。
2. **开放问题保持开放。** 模型行为、长期记忆、多 Agent、评估效度、安全生态、资产供应链和组织责任均以待测问题表达，没有伪装成已解决方案。
3. **标准化分层保留断点。** 语法、契约、状态、证据和治理逐层增加责任；协议连通、同名 `success` 或共享 Schema 不会自动得到语义和治理互操作。
4. **渐进路线不越过批准。** Stage 0 至 7 只从可重复样例增加契约、状态、能力、观察、评估、接力和受限自治，终点保持 `ready_for_bounded_pilot_review`。
5. **状态与证据不互相替代。** Tool Result、Observation、验收、Attempt Trace、Checkpoint、Handoff Package 与 Decision Record 各自承担不同结论。
6. **当前仓库状态没有提前宣告完成。** 结语明确写出第 43 至 47 章仍在后续流程、最终全仓校验未运行，不能声称全书已完成、可出版或已交付。
7. **示例与图示仍是计划。** `assessAgentEngineeringReadiness`、测试和演进地图尚未创建或运行，正文没有伪造输出、渲染或外部系统行为。

## 本轮修正

- 将新出现的 `Eval Contract` 统一回全书既有 `Evaluation Spec`，避免与第 17 章评估规格形成同义工件。
- 将 `Capability Grant` 统一回第 41 章与词表既有的 `Capability Grant Record`，保持“记录不发放真实权限”的边界。
- 同步修正 Research Brief、Outline、References 和正文，并将 Technical Review 检查项切换为完成。
- 未改变六项来源的允许用途、七项责任、七类开放问题、五层阶梯、计划示例接口或未运行范围。

## 验证要求

- 定向 Markdown lint 必须覆盖正文、Research Brief、Outline、References 与本记录。
- 正文链接、本地路径和全局引用映射必须可定位。
- `git diff --check` 与尾随空白检查必须通过。
- 本阶段不运行尚不存在的 `assessAgentEngineeringReadiness`，也不声称模型、Tool、权限、安全、供应链、部署、发布或长期自治已经发生。

## 后续共享术语请求

主线程后续评估是否集中登记 Human Responsibility Map、Agent Asset Register 与 Regression Matrix；若登记，定义必须保持它们是本书责任／资产／比较工件，不是组织授权、供应链认证或统计有效性证明。
