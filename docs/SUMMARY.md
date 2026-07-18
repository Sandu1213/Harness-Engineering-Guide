# Summary

本目录是出版侧的详细导航；每章的完整研究规划和原 58 题目合并映射见 [../.ai/outline.md](../.ai/outline.md)。章节文件在开始写作时按本目录的编号和 stable slug 创建。

## P0 目录审查

2026-07-14 的目录审查确认 47 章保留完整覆盖，不再继续合并。阅读依赖遵循“基础思想 → 核心组件 → 智能闭环 → 工程实践与案例 → 模式与评估 → Book Factory”；跨部分的最小依赖和容易混淆的章节边界记录在 [详细大纲](../.ai/outline.md) 的 P0 审查结论中。

## Part 1：基础思想

### 01. 从 Prompt Engineering 到 Harness Engineering

正文（已完成）：[从 Prompt Engineering 到 Harness Engineering](part-01-foundations/01-prompt-to-harness.md)。相关工件：[Research Brief](part-01-foundations/01-prompt-to-harness.research.md)、[Chapter Outline](part-01-foundations/01-prompt-to-harness.outline.md)、[事实核验清单](part-01-foundations/01-prompt-to-harness.fact-check.md)、[示例计划](part-01-foundations/01-prompt-to-harness.example-plan.md) 和 [候选参考资料](part-01-foundations/01-prompt-to-harness.references.md)。

- **目标：** 建立从 Prompt 优化到系统工程的视角。
- **核心问题：** 为什么 Prompt 不能独自解决状态、工具、权限和评估？
- **主要小节：** Prompt 边界、Harness 定义、可观察结果、全书地图。
- **计划图示：** 单次 Prompt 与 Harness 系统边界对比。
- **计划案例：** 把测试修复提示升级为任务循环。
- **前后关系：** 全书入口，连接第 2 章系统角色。
- **预计交付物：** 概念图、Research Brief、术语和最小循环。

### 02. Agent、Harness 与运行环境

正文（已完成）：[Agent、Harness 与运行环境](part-01-foundations/02-agent-harness-runtime.md)。相关工件：[Research Brief](part-01-foundations/02-agent-harness-runtime.research.md)、[Chapter Outline](part-01-foundations/02-agent-harness-runtime.outline.md)、[事实核验清单](part-01-foundations/02-agent-harness-runtime.fact-check.md)、[示例实现说明](part-01-foundations/02-agent-harness-runtime.example-plan.md) 和 [候选参考资料](part-01-foundations/02-agent-harness-runtime.references.md)。

- **目标：** 区分模型、Agent、Harness、Runtime 的职责。
- **核心问题：** 失败应归因于模型、编排、工具还是环境？
- **主要小节：** 模型边界、执行循环、编排、Sandbox、外部系统。
- **计划图示：** 四层责任与错误传播图。
- **计划案例：** 只读与可写环境中的同一任务诊断。
- **前后关系：** 承接第 1 章，为组件篇提供坐标。
- **预计交付物：** 层次图、故障归因表、诊断卡、Attempt Trace、责任接口清单与渐进增强边界。

### 03. 仓库即 Agent 上下文

正文（已完成）：[仓库即 Agent 上下文](part-01-foundations/03-repository-as-agent-context.md)。相关工件：[Research Brief](part-01-foundations/03-repository-as-agent-context.research.md)、[Chapter Outline](part-01-foundations/03-repository-as-agent-context.outline.md)、[事实核验清单](part-01-foundations/03-repository-as-agent-context.fact-check.md)、[示例计划](part-01-foundations/03-repository-as-agent-context.example-plan.md) 和 [候选参考资料](part-01-foundations/03-repository-as-agent-context.references.md)。

- **目标：** 用版本控制文件承载可审查长期上下文。
- **核心问题：** 新 AI 如何不靠聊天记录恢复项目？
- **主要小节：** 易失性、目录职责、读取顺序、同步风险。
- **计划图示：** 规则、状态、记忆、书稿与校验数据流。
- **计划案例：** 跨会话章节任务的恢复。
- **前后关系：** 承接系统边界，连接上下文、记忆和状态管理。
- **预计交付物：** 目录模式、交接样例、一致性检查表。

### 04. 构建可靠 Agent 的工程原则

正文：[构建可靠 Agent 的工程原则](part-01-foundations/04-reliable-agent-engineering-principles.md)。相关工件：[Research Brief](part-01-foundations/04-reliable-agent-engineering-principles.research.md)、[Chapter Outline](part-01-foundations/04-reliable-agent-engineering-principles.outline.md)、[事实核验清单](part-01-foundations/04-reliable-agent-engineering-principles.fact-check.md)、[示例实现说明](part-01-foundations/04-reliable-agent-engineering-principles.example-plan.md) 和 [候选参考资料](part-01-foundations/04-reliable-agent-engineering-principles.references.md)。

- **目标：** 建立可靠性和验收的共同基线。
- **核心问题：** 怎样用证据替代“看似完成”？
- **主要小节：** 可验证闭环、状态、最小权限、失败可见、责任。
- **计划图示：** 目标到记录的可靠性闭环。
- **计划案例：** 配置修改的预览、备份、验证与审批。
- **前后关系：** 汇总 Part 1，约束全部组件设计。
- **预计交付物：** 原则清单、DoD、风险矩阵。

## Part 2：Harness 核心组件

### 05. Instructions 与 Prompt

正文：[Instructions 与 Prompt](part-02-components/05-instructions-and-prompt.md)（已完成）。相关工件：[Research Brief](part-02-components/05-instructions-and-prompt.research.md)、[Chapter Outline](part-02-components/05-instructions-and-prompt.outline.md)、[事实核验清单](part-02-components/05-instructions-and-prompt.fact-check.md)、[示例实现说明](part-02-components/05-instructions-and-prompt.example-plan.md) 和 [候选参考资料](part-02-components/05-instructions-and-prompt.references.md)。

- **目标：** 设计可维护指令层。
- **核心问题：** 怎样分离稳定规则、任务输入和输出约束？
- **主要小节：** 分层、优先级、冲突、结构化输出、测试。
- **计划图示：** 指令装配顺序图。
- **计划案例：** 代码审查 Prompt 的规则化重构。
- **前后关系：** 从基础思想进入组件，连接 Context Engineering。
- **预计交付物：** 分层模板、冲突矩阵、检查样例。

### 06. Context Engineering

正文：[Context Engineering](part-02-components/06-context-engineering.md)（已完成）。相关工件：[Research Brief](part-02-components/06-context-engineering.research.md)、[Chapter Outline](part-02-components/06-context-engineering.outline.md)、[事实核验清单](part-02-components/06-context-engineering.fact-check.md)、[示例实现说明](part-02-components/06-context-engineering.example-plan.md) 与 [候选参考资料](part-02-components/06-context-engineering.references.md)。

- **目标：** 在上下文预算内装配高价值证据。
- **核心问题：** 如何降低噪声、过期信息和上下文污染？
- **主要小节：** 预算、相关性、筛选、摘要、刷新。
- **计划图示：** 资料筛选、压缩与装配流程。
- **计划案例：** Bug 修复的最小上下文包。
- **前后关系：** 承接指令，为记忆、检索和压缩奠基。
- **预计交付物：** Context Brief、预算表、污染诊断表。

### 07. Working Memory 与 Long-term Memory

正文：[Working Memory 与 Long-term Memory](part-02-components/07-working-memory-and-long-term-memory.md)（已完成）。相关工件：[Research Brief](part-02-components/07-working-memory-and-long-term-memory.research.md)、[候选参考资料](part-02-components/07-working-memory-and-long-term-memory.references.md)、[Chapter Outline](part-02-components/07-working-memory-and-long-term-memory.outline.md)、[事实核验清单](part-02-components/07-working-memory-and-long-term-memory.fact-check.md) 与 [示例实现记录](part-02-components/07-working-memory-and-long-term-memory.example-plan.md)。图源已导出 [SVG](../diagrams/exported/chapter-07-memory-record-lifecycle.svg) 与 [PNG](../diagrams/exported/chapter-07-memory-record-lifecycle.png) 并完成视觉审查；纯内存示例已实现并实际运行 6 项测试与演示。

- **目标：** 设计短期状态和长期记忆的边界。
- **核心问题：** 什么应保留在任务内，什么应跨任务保存？
- **主要小节：** 分类、写入门槛、过期、冲突、检索。
- **计划图示：** 状态、总结、决策、知识库读写图。
- **计划案例：** 将部署失败变成受控经验记录。
- **前后关系：** 承接 Context，连接反思、压缩和 Obsidian。
- **预计交付物：** 分类表、决策树、失效处理策略。

### 08. Skills 与可复用能力

正文：[Skills 与可复用能力](part-02-components/08-skills-and-reusable-capabilities.md)（已完成）。相关工件：[Research Brief](part-02-components/08-skills-and-reusable-capabilities.research.md)、[候选参考资料](part-02-components/08-skills-and-reusable-capabilities.references.md)、[Chapter Outline](part-02-components/08-skills-and-reusable-capabilities.outline.md)、[事实核验清单](part-02-components/08-skills-and-reusable-capabilities.fact-check.md) 和 [示例实现记录](part-02-components/08-skills-and-reusable-capabilities.example-plan.md)。

图源已导出 [SVG](../diagrams/exported/chapter-08-skill-lifecycle.svg) 与 [PNG](../diagrams/exported/chapter-08-skill-lifecycle.png) 并完成视觉审查；纯内存选择示例已实际运行 6 项测试与演示。

- **目标：** 将重复工作封装为可测试 Skill。
- **核心问题：** 怎样避免万能 Agent 和提示词碎片？
- **主要小节：** 接口、权限、输出契约、选择、版本、测试。
- **计划图示：** Skill 生命周期。
- **计划案例：** Markdown 章节审查 Skill。
- **前后关系：** 使用指令与工具，连接自动化和团队库。
- **预计交付物：** Skill 模板、契约、测试清单。

### 09. Planning 与任务拆解

正文：[Planning 与任务拆解](part-02-components/09-planning-and-task-decomposition.md)（已完成）。相关工件：[Research Brief](part-02-components/09-planning-and-task-decomposition.research.md)、[候选资料](part-02-components/09-planning-and-task-decomposition.references.md)、[Chapter Outline](part-02-components/09-planning-and-task-decomposition.outline.md)、[事实核验清单](part-02-components/09-planning-and-task-decomposition.fact-check.md) 与 [示例实现记录](part-02-components/09-planning-and-task-decomposition.example-plan.md)。纯内存示例已实际运行 6 项测试与演示；图源已导出 [SVG](../diagrams/exported/chapter-09-plan-to-task-graph.svg) 与 [PNG](../diagrams/exported/chapter-09-plan-to-task-graph.png) 并完成视觉审查和 Final Review。

- **目标：** 把目标拆成可验收子任务。
- **核心问题：** 怎样表达输入、依赖、风险和停止条件？
- **主要小节：** 澄清、任务图、依赖、并发、更新、反模式。
- **计划图示：** 需求到任务 DAG。
- **计划案例：** API 认证测试任务拆解。
- **前后关系：** 连接 Skill 和状态工作流。
- **预计交付物：** Plan Brief、验收字段、依赖规则。

### 10. Workflow 与状态管理

正文：[Workflow 与状态管理](part-02-components/10-workflow-and-state-management.md)（已完成）。相关工件：[Research Brief](part-02-components/10-workflow-and-state-management.research.md)、[候选资料](part-02-components/10-workflow-and-state-management.references.md)、[Chapter Outline](part-02-components/10-workflow-and-state-management.outline.md)、[Technical Review](../.memory/reviews/2026-07-16-chapter-10-technical-review.md)、[示例实现记录](part-02-components/10-workflow-and-state-management.example-plan.md)、[图示审查](../.memory/reviews/2026-07-16-chapter-10-diagram-review.md)、[事实核验](part-02-components/10-workflow-and-state-management.fact-check.md)、[语言编辑](../.memory/reviews/2026-07-16-chapter-10-language-edit.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-10-final-review.md)。纯内存状态迁移评估示例已实际运行 8 项测试和演示；状态图已导出 [SVG](../diagrams/exported/chapter-10-workflow-state-machine.svg) 与 [PNG](../diagrams/exported/chapter-10-workflow-state-machine.png) 并完成视觉检查。正文只在 AWS Step Functions、LangGraph 与 Temporal 的限定范围内使用来源，并将工作流契约、状态记录、交接包和教学案例标为本书模型；图和示例只表达本书模型。

- **目标：** 建立可恢复的任务状态机。
- **核心问题：** 中断、重试和交接后如何继续？
- **主要小节：** 状态机、持久化、幂等、检查点、恢复。
- **计划图示：** 章节生产状态机。
- **计划案例：** 本书 Research 到 Validate 流程。
- **前后关系：** 承接计划，服务恢复、长任务与协作。
- **预计交付物：** 工作流模板、迁移表、恢复演练。

### 11. Tool Use 与工具协议

正文：[Tool Use 与工具协议](part-02-components/11-tool-use-and-tool-protocols.md)（已完成）。相关工件：[Research Brief](part-02-components/11-tool-use-and-tool-protocols.research.md)、[候选资料](part-02-components/11-tool-use-and-tool-protocols.references.md)、[Chapter Outline](part-02-components/11-tool-use-and-tool-protocols.outline.md)、[Technical Review](../.memory/reviews/2026-07-16-chapter-11-technical-review.md)、[Example Plan](part-02-components/11-tool-use-and-tool-protocols.example-plan.md)、[示例整合记录](../.memory/reviews/2026-07-16-chapter-11-example-integration.md)、[Diagram Review](../.memory/reviews/2026-07-16-chapter-11-diagram-review.md)、[事实核验清单](part-02-components/11-tool-use-and-tool-protocols.fact-check.md)、[Language Editing](../.memory/reviews/2026-07-16-chapter-11-language-edit.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-11-final-review.md)。资料只限定 MCP Tools 草案、版本化 Schema、OpenAI、Anthropic 与 JSON Schema 的各自范围；工具契约、调用记录、结果信封与效果不确定性是本书模型。纯内存示例只处理注入对象，图源已导出 [SVG](../diagrams/exported/chapter-11-tool-invocation-sequence.svg) 与 [PNG](../diagrams/exported/chapter-11-tool-invocation-sequence.png) 并完成视觉审查；真实工具运行时未在本章实施或验证。

- **目标：** 把工具调用设计为可验证接口。
- **核心问题：** 工具的输入、结果、错误和副作用如何被理解？
- **主要小节：** 模式、错误、超时、幂等、证据、审计。
- **计划图示：** Agent 到外部系统的调用序列。
- **计划案例：** 文件修改的预览与回读验证。
- **前后关系：** 连接 Skill、权限、MCP 和案例。
- **预计交付物：** 工具契约、错误表、审计示例。

### 12. Environment、Sandbox 与权限

正文：[Environment、Sandbox 与权限](part-02-components/12-environment-sandbox-and-permissions.md)（已完成）。相关工件：[Research Brief](part-02-components/12-environment-sandbox-and-permissions.research.md)、[候选资料与正式引用映射](part-02-components/12-environment-sandbox-and-permissions.references.md)、[Chapter Outline](part-02-components/12-environment-sandbox-and-permissions.outline.md)、[示例计划](part-02-components/12-environment-sandbox-and-permissions.example-plan.md)、[事实核验](part-02-components/12-environment-sandbox-and-permissions.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-12-final-review.md)。环境准入图已导出 [SVG](../diagrams/exported/chapter-12-environment-permission-ladder.svg) 与 [PNG](../diagrams/exported/chapter-12-environment-permission-ladder.png)；纯内存示例覆盖 8 条路径。

- **目标：** 将执行能力限制到任务所需范围。
- **核心问题：** 如何不让“可用工具”变成“默认可执行”？
- **主要小节：** 环境、最小权限、凭证、网络、审批、审计。
- **计划图示：** 权限阶梯。
- **计划案例：** 部署在三种环境的授权路径。
- **前后关系：** 承接工具，连接审批、安全和回滚。
- **预计交付物：** 权限矩阵、环境清单、审批模板。

### 13. Knowledge Base 与检索

正文：[Knowledge Base 与检索](part-02-components/13-knowledge-base-and-retrieval.md)（已完成）。相关工件：[Research Brief](part-02-components/13-knowledge-base-and-retrieval.research.md)、[候选资料与正式引用映射](part-02-components/13-knowledge-base-and-retrieval.references.md)、[Chapter Outline](part-02-components/13-knowledge-base-and-retrieval.outline.md)、[示例计划](part-02-components/13-knowledge-base-and-retrieval.example-plan.md)、[事实核验](part-02-components/13-knowledge-base-and-retrieval.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-13-final-review.md)。证据流水线图已导出 [SVG](../diagrams/exported/chapter-13-retrieval-evidence-pipeline.svg) 与 [PNG](../diagrams/exported/chapter-13-retrieval-evidence-pipeline.png)；纯内存示例覆盖 7 条路径。

- **目标：** 建立带来源和新鲜度的证据层。
- **核心问题：** 何时检索、怎样排序、如何引用回链？
- **主要小节：** 索引、查询、排序、引用、过期、失败。
- **计划图示：** 检索到引用输出的流水线。
- **计划案例：** 只用官方资料核验 API 鉴权。
- **前后关系：** 承接 Context，服务事实核验和研究 Agent。
- **预计交付物：** 证据卡、来源规则、过期策略。

### 14. Human-in-the-loop

正文：[Human-in-the-loop](part-02-components/14-human-in-the-loop.md)（已完成）。相关工件：[Research Brief](part-02-components/14-human-in-the-loop.research.md)、[候选资料与正式引用映射](part-02-components/14-human-in-the-loop.references.md)、[Chapter Outline](part-02-components/14-human-in-the-loop.outline.md)、[示例计划](part-02-components/14-human-in-the-loop.example-plan.md)、[事实核验](part-02-components/14-human-in-the-loop.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-14-final-review.md)。人工审批路由图已导出 [SVG](../diagrams/exported/chapter-14-human-approval-routing.svg) 与 [PNG](../diagrams/exported/chapter-14-human-approval-routing.png)；纯内存示例覆盖 10 条路径。

- **目标：** 在自主性与责任之间安放人工节点。
- **核心问题：** 哪些决定可自动执行，哪些必须审批？
- **主要小节：** 阈值、可逆性、升级、反馈、责任。
- **计划图示：** 审批决策树。
- **计划案例：** 漏洞修复建议与人工发布门。
- **前后关系：** 完成组件篇，连接反馈、审批与治理。
- **预计交付物：** 审批矩阵、升级模板、边界表。

## Part 3：智能闭环

### 15. Observation 与状态感知

正文：[Observation 与状态感知](part-03-intelligence-loop/15-observation-and-state-awareness.md)（已完成）。相关工件：[Research Brief](part-03-intelligence-loop/15-observation-and-state-awareness.research.md)、[候选资料](part-03-intelligence-loop/15-observation-and-state-awareness.references.md)、[Chapter Outline](part-03-intelligence-loop/15-observation-and-state-awareness.outline.md)、[示例计划](part-03-intelligence-loop/15-observation-and-state-awareness.example-plan.md)、[事实核验](part-03-intelligence-loop/15-observation-and-state-awareness.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-15-final-review.md)。观察反馈图已导出 [SVG](../diagrams/exported/chapter-15-observation-feedback-loop.svg) 与 [PNG](../diagrams/exported/chapter-15-observation-feedback-loop.png)；纯内存示例覆盖 12 条路径。

- **目标：** 定义可信的执行状态信号。
- **核心问题：** 成功、失败与副作用如何被观察？
- **主要小节：** 日志、事件、快照、新鲜度、噪声。
- **计划图示：** 行动到观察再决策回路。
- **计划案例：** UI 点击后重新快照确认状态。
- **前后关系：** 为评估、重试和浏览器案例提供输入。
- **预计交付物：** 观察点清单、快照规范、证据等级。

### 16. Reflection 与经验提炼

正文：[Reflection 与经验提炼](part-03-intelligence-loop/16-reflection-and-learning.md)（已完成）。相关工件：[Research Brief](part-03-intelligence-loop/16-reflection-and-learning.research.md)、[候选资料](part-03-intelligence-loop/16-reflection-and-learning.references.md)、[Chapter Outline](part-03-intelligence-loop/16-reflection-and-learning.outline.md)、[示例计划](part-03-intelligence-loop/16-reflection-and-learning.example-plan.md)、[事实核验](part-03-intelligence-loop/16-reflection-and-learning.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-16-final-review.md)。反思候选图已导出 [SVG](../diagrams/exported/chapter-16-reflection-candidate-loop.svg) 与 [PNG](../diagrams/exported/chapter-16-reflection-candidate-loop.png)；纯内存示例覆盖 8 条路径。

- **目标：** 将失败轨迹转成经验证的经验。
- **核心问题：** 如何区分噪声、缺陷与系统性问题？
- **主要小节：** 摘要、根因假设、反事实、经验候选准入、过拟合。
- **计划图示：** 轨迹到改进的闭环。
- **计划案例：** 链接失败的原因辨别。
- **前后关系：** 使用观察与记忆，连接自改进和修复案例。
- **预计交付物：** Reflection Record、根因表、准入规则。

### 17. Evaluation 与可验证结果

正文：[Evaluation 与可验证结果](part-03-intelligence-loop/17-evaluation-and-verifiable-results.md)（已完成）。相关工件：[Research Brief](part-03-intelligence-loop/17-evaluation-and-verifiable-results.research.md)、[候选资料](part-03-intelligence-loop/17-evaluation-and-verifiable-results.references.md)、[Chapter Outline](part-03-intelligence-loop/17-evaluation-and-verifiable-results.outline.md)、[示例计划](part-03-intelligence-loop/17-evaluation-and-verifiable-results.example-plan.md)、[事实核验](part-03-intelligence-loop/17-evaluation-and-verifiable-results.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-17-final-review.md)。评估证据图已导出 [SVG](../diagrams/exported/chapter-17-evaluation-evidence-pipeline.svg) 与 [PNG](../diagrams/exported/chapter-17-evaluation-evidence-pipeline.png)；纯内存示例覆盖 14 条路径。

- **目标：** 为完成定义可执行评估。
- **核心问题：** 如何避免模型自评替代真实验证？
- **主要小节：** 结果、过程、E2E、判定器、证据、误判。
- **计划图示：** 目标到反馈的评估管线。
- **计划案例：** 文档任务的格式、链接、事实联合检查。
- **前后关系：** 连接观察、重试、测试和基准。
- **预计交付物：** Evaluation Spec、证据矩阵、质量门。

### 18. Retry、Recovery 与容错

正文：[Retry、Recovery 与容错](part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.md)（已完成）。相关工件：[Research Brief](part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.research.md)、[候选资料](part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.references.md)、[Chapter Outline](part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.outline.md)、[示例计划](part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.example-plan.md)、[事实核验](part-03-intelligence-loop/18-retry-recovery-and-fault-tolerance.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-18-final-review.md)。恢复状态机已导出 [SVG](../diagrams/exported/chapter-18-retry-recovery-state-machine.svg) 与 [PNG](../diagrams/exported/chapter-18-retry-recovery-state-machine.png)；纯内存示例覆盖 13 条路径。

- **目标：** 区分可重试、需补偿、需补证、停止和人工升级的失败出口。
- **核心问题：** 怎样不把未知外部效果、非安全重复或已应用效果误路由为自动重试？
- **主要小节：** 恢复契约、失败/效果分类、重试预算、检查点、补偿、停止与升级。
- **图示与案例：** 资料获取教学案例的恢复状态机和纯内存决策函数。
- **前后关系：** 消费第 17 章的评估结论，为第 19 至 20 章的长任务与受控改进提供失败边界。

### 19. Context Compaction 与长任务

正文：[Context Compaction 与长任务](part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.md)（已完成）。相关工件：[Research Brief](part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.research.md)、[候选资料](part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.references.md)、[Chapter Outline](part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.outline.md)、[示例计划](part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.example-plan.md)、[事实核验](part-03-intelligence-loop/19-context-compaction-and-long-running-tasks.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-19-final-review.md)。压缩恢复图已导出 [SVG](../diagrams/exported/chapter-19-context-compaction-recovery.svg) 与 [PNG](../diagrams/exported/chapter-19-context-compaction-recovery.png)；纯内存示例覆盖 9 条路径。

- **目标：** 在压缩长任务上下文时保留可恢复的目标、事实锚点、证据指针、未决项与检查条件。
- **核心问题：** 怎样在减少 token 的同时，避免摘要掩盖不确定性、版本错配或恢复所需证据？
- **主要小节：** 压缩记录、稳定事实锚点、证据指针、保留/丢弃理由、再水化与损失检测。
- **图示与案例：** 多日书稿审查的结构化压缩记录和纯内存恢复预检。
- **前后关系：** 综合第 6、7、10、15 至 18 章，为第 20 章长期运行治理提供上下文边界。

### 20. 自改进的工程边界与长期运行 Agent

正文：[自改进的工程边界与长期运行 Agent](part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.md)（已完成）。相关工件：[Research Brief](part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.research.md)、[候选资料](part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.references.md)、[Chapter Outline](part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.outline.md)、[示例计划](part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.example-plan.md)、[事实核验](part-03-intelligence-loop/20-self-improvement-boundaries-and-long-running-agents.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-20-final-review.md)。改进变更门图已导出 [SVG](../diagrams/exported/chapter-20-improvement-change-gate.svg) 与 [PNG](../diagrams/exported/chapter-20-improvement-change-gate.png)；纯内存示例覆盖 10 条路径。

- **目标：** 把自改进限定为候选变更、独立验证、范围批准、监控和回滚准备均可审查的受控流程。
- **核心问题：** 何时应拒绝把一次反思或局部指标变化当作发布许可？
- **主要小节：** 候选改进协议、变更门、独立验证、范围批准、监控、回滚和长期健康检查。
- **图示与案例：** 不扩大权限的重试策略候选和纯内存受控发布准备判断。
- **前后关系：** 汇总智能闭环，为第 21 章工程实践、模式与企业治理提供变更边界。

## Part 4：主流工程实践

### 21. Claude Code 与 Codex 的项目 Harness

正文：[Claude Code 与 Codex 的项目 Harness](part-04-engineering-practice/21-claude-code-and-codex-project-harness.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/21-claude-code-and-codex-project-harness.research.md)、[候选资料](part-04-engineering-practice/21-claude-code-and-codex-project-harness.references.md)、[Chapter Outline](part-04-engineering-practice/21-claude-code-and-codex-project-harness.outline.md)、[示例计划](part-04-engineering-practice/21-claude-code-and-codex-project-harness.example-plan.md)、[事实核验](part-04-engineering-practice/21-claude-code-and-codex-project-harness.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-21-final-review.md)。项目 Harness 可移植性图已导出 [SVG](../diagrams/exported/chapter-21-project-harness-portability.svg) 与 [PNG](../diagrams/exported/chapter-21-project-harness-portability.png)；纯内存示例覆盖 6 条路径。

- **目标：** 把共享仓库契约与产品适配声明分开，使 Codex、Claude Code 或其他 Agent 可以接力而不假定产品行为一致。
- **核心问题：** 如何用同一套规则、状态、验证和交接工件承接不同工具，同时保留产品事实的复核边界？
- **主要小节：** Shared Repository Contract、Product Adapter Declaration、接力工作流、权限与验证边界、可移植性预检。
- **图示与案例：** 两个产品适配器共享仓库工件的教学模型，以及跨工具研究与审查接力案例。
- **前后关系：** 承接第 03、05、08、10 至 12、20 章，并为第 22、23、45 章保留规则、自动化和长期交接边界。

### 22. AGENTS.md、CLAUDE.md 与仓库级规则

正文：[AGENTS.md、CLAUDE.md 与仓库级规则](part-04-engineering-practice/22-agents-claude-and-repository-rules.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/22-agents-claude-and-repository-rules.research.md)、[候选资料](part-04-engineering-practice/22-agents-claude-and-repository-rules.references.md)、[Chapter Outline](part-04-engineering-practice/22-agents-claude-and-repository-rules.outline.md)、[示例计划](part-04-engineering-practice/22-agents-claude-and-repository-rules.example-plan.md)、[事实核验](part-04-engineering-practice/22-agents-claude-and-repository-rules.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-22-final-review.md)。规则包加载图已导出 [SVG](../diagrams/exported/chapter-22-repository-rule-loading.svg) 与 [PNG](../diagrams/exported/chapter-22-repository-rule-loading.png)；纯内存示例覆盖 7 条路径。

- **目标：** 设计短入口、稳定规则、可变状态与任务局部材料，并在修改前发现冲突、范围泄漏与陈旧状态。
- **核心问题：** 如何让入口导航到正确上下文，而不把规则堆叠、当前事实和技术控制混为一份 Markdown？
- **主要小节：** 根入口、稳定规则、项目上下文、可变状态、Rule Record、Rule Packet、冲突与保守出口。
- **图示与案例：** 本书的规则读取与停止边界，以及第 22 章书稿任务的 Rule Packet 教学判断。
- **前后关系：** 细化第 21 章的产品适配层，并为第 23、26、27、45 章服务。

### 23. Skills、Hooks 与自动化工作流

正文：[Skills、Hooks 与自动化工作流](part-04-engineering-practice/23-skills-hooks-and-automation-workflows.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/23-skills-hooks-and-automation-workflows.research.md)、[候选资料](part-04-engineering-practice/23-skills-hooks-and-automation-workflows.references.md)、[Chapter Outline](part-04-engineering-practice/23-skills-hooks-and-automation-workflows.outline.md)、[示例计划](part-04-engineering-practice/23-skills-hooks-and-automation-workflows.example-plan.md)、[事实核验](part-04-engineering-practice/23-skills-hooks-and-automation-workflows.fact-check.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-23-final-review.md)。自动化责任边界图已导出 [SVG](../diagrams/exported/chapter-23-skill-hook-workflow-boundary.svg) 与 [PNG](../diagrams/exported/chapter-23-skill-hook-workflow-boundary.png)；纯内存示例覆盖 9 条路径。

- **目标：** 将可复用能力、生命周期约束、状态编排与事件检查分开设计，让失败可见而不把自动化误写成授权或验收。
- **核心问题：** 什么应属于 Skill、Hook、Workflow 或事件驱动 Automation，它们各自如何暴露失败并交给独立的权限与验证边界？
- **主要小节：** Skill、Hook、Workflow、Automation、Plugin、失败策略、退出与所有者。
- **图示与案例：** 书稿变更或任务请求的责任选择图，以及自动化提案的纯内存准入判断。
- **前后关系：** 承接第 08、10、12、14、21、22 章，为第 27、34 章的审查与团队能力库提供边界。

### 24. MCP 与外部工具集成

正文：[MCP 与外部工具集成](part-04-engineering-practice/24-mcp-and-external-tool-integration.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/24-mcp-and-external-tool-integration.research.md)、[候选资料](part-04-engineering-practice/24-mcp-and-external-tool-integration.references.md)、[Chapter Outline](part-04-engineering-practice/24-mcp-and-external-tool-integration.outline.md)、[事实核验](part-04-engineering-practice/24-mcp-and-external-tool-integration.fact-check.md)、[示例计划](part-04-engineering-practice/24-mcp-and-external-tool-integration.example-plan.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-24-final-review.md)。纯内存准入示例已实际运行 8 项测试；图源已导出 [SVG](../diagrams/exported/chapter-24-mcp-integration-boundary.svg) 与 [PNG](../diagrams/exported/chapter-24-mcp-integration-boundary.png)。协议事实只限定 MCP Tools 与安全资料，接入工件均为本书模型。

- **目标：** 以协议和权限治理外部工具。
- **核心问题：** 如何让工具结果成为可靠证据？
- **主要小节：** 能力、认证、模式、超时、数据边界、审计。
- **计划图示：** Agent 到 MCP 服务交互图。
- **计划案例：** 文档查询回写 Research Brief。
- **前后关系：** 深化工具与权限，服务研究和企业集成。
- **预计交付物：** 接入表、能力记录、审计格式。

### 25. 浏览器自动化 Agent

正文：[浏览器自动化 Agent](part-04-engineering-practice/25-browser-automation-agent.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/25-browser-automation-agent.research.md)、[候选资料](part-04-engineering-practice/25-browser-automation-agent.references.md)、[Chapter Outline](part-04-engineering-practice/25-browser-automation-agent.outline.md)、[事实核验](part-04-engineering-practice/25-browser-automation-agent.fact-check.md)、[示例计划](part-04-engineering-practice/25-browser-automation-agent.example-plan.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-25-final-review.md)。纯内存证据链示例已实际运行 10 项测试；图源已导出 [SVG](../diagrams/exported/chapter-25-browser-e2e-evidence-loop.svg) 与 [PNG](../diagrams/exported/chapter-25-browser-e2e-evidence-loop.png)。本章没有启动浏览器或宣称真实 UI/E2E 已验证。

- **目标：** 以交互和重新快照验证 UI。
- **核心问题：** 如何不以 API 成功冒充 UI 成功？
- **主要小节：** E2E、会话、快照、操作、等待、证据。
- **计划图示：** 浏览器验证循环。
- **计划案例：** 登录提交后的成功状态验证。
- **前后关系：** 连接工具、观察、评估和测试案例。
- **预计交付物：** E2E 清单、隔离示例、证据模板。

### 26. 多 Agent 协作与任务隔离

正文：[多 Agent 协作与任务隔离](part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.research.md)、[候选资料](part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.references.md)、[Chapter Outline](part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.outline.md)、[事实核验](part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.fact-check.md)、[示例计划](part-04-engineering-practice/26-multi-agent-collaboration-and-task-isolation.example-plan.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-26-final-review.md)。纯内存任务隔离示例已实际运行 10 项测试；图源已导出 [SVG](../diagrams/exported/chapter-26-multi-agent-ownership-swimlane.svg) 与 [PNG](../diagrams/exported/chapter-26-multi-agent-ownership-swimlane.png)。本章不表示真实 Agent、进程、worktree、锁或消息系统。

- **目标：** 在并发下维护所有权与状态一致性。
- **核心问题：** 如何避免共享文件、环境和会话冲突？
- **主要小节：** 任务边界、所有权、消息、隔离、汇总、冲突。
- **计划图示：** 协调者和角色泳道图。
- **计划案例：** 研究与大纲审查的并行协作。
- **前后关系：** 连接工作流、权限和 Book Factory。
- **预计交付物：** 任务契约、所有权规则、恢复 Runbook。

### 27. Git、Worktree 与代码审查

正文：[Git、Worktree 与代码审查](part-04-engineering-practice/27-git-worktree-and-code-review.md)（已完成）。相关工件：[Research Brief](part-04-engineering-practice/27-git-worktree-and-code-review.research.md)、[候选资料](part-04-engineering-practice/27-git-worktree-and-code-review.references.md)、[Chapter Outline](part-04-engineering-practice/27-git-worktree-and-code-review.outline.md)、[事实核验](part-04-engineering-practice/27-git-worktree-and-code-review.fact-check.md)、[示例计划](part-04-engineering-practice/27-git-worktree-and-code-review.example-plan.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-27-final-review.md)。纯内存变更准入示例已实际运行 12 项测试；图源已导出 [SVG](../diagrams/exported/chapter-27-git-change-admission.svg) 与 [PNG](../diagrams/exported/chapter-27-git-change-admission.png)。本章不运行 Git、worktree、PR、审查、CI、merge 或回滚。

- **目标：** 将 Agent 变更置于可审查、可回滚控制下。
- **核心问题：** 如何隔离并行改动并保留人类控制？
- **主要小节：** 范围、Worktree、diff、审查、冲突、回滚。
- **计划图示：** 变更生命周期。
- **计划案例：** 章节草稿与示例修复的隔离审查。
- **前后关系：** 完成实践篇，连接案例和版本化。
- **预计交付物：** Git 边界、审查证据、选型表。

## Part 5：真实案例

### 28. 从零搭建最小 Harness

正文：[从零搭建最小 Harness](part-05-case-studies/28-minimal-harness-from-scratch.md)（已完成）。相关工件：[Research Brief](part-05-case-studies/28-minimal-harness-from-scratch.research.md)、[候选资料](part-05-case-studies/28-minimal-harness-from-scratch.references.md)、[Chapter Outline](part-05-case-studies/28-minimal-harness-from-scratch.outline.md)、[事实核验](part-05-case-studies/28-minimal-harness-from-scratch.fact-check.md)、[示例计划](part-05-case-studies/28-minimal-harness-from-scratch.example-plan.md) 与 [Final Review](../.memory/reviews/2026-07-16-chapter-28-final-review.md)。纯内存最小 Harness 准入示例已实际运行 7 项测试；图源已导出 [SVG](../diagrams/exported/chapter-28-minimal-harness-loop.svg) 与 [PNG](../diagrams/exported/chapter-28-minimal-harness-loop.png)。`ready` 不代表模型、工具或外部动作已经执行。

- **目标：** 以最少组件实现可验证 Harness。
- **核心问题：** 最小系统怎样不退化为 Prompt 脚本？
- **主要小节：** 目标、状态、工具、循环、验证、日志。
- **计划图示：** 组件图与执行序列。
- **计划案例：** 受控文件检查/修复。
- **前后关系：** 汇聚前半书，作为案例基线。
- **预计交付物：** 可运行示例、README、测试、演进路线。

### 29. AI 软件工程师工作流

正文（已完成）：[AI 软件工程师工作流](part-05-case-studies/29-ai-software-engineer-workflow.md)。

- **目标：** 串起需求、改动、测试、审查和文档。
- **核心问题：** 如何交付变更而非代码建议？
- **主要小节：** 澄清、探索、计划、TDD、验证、文档。
- **计划图示：** Issue 到 diff 的端到端流程。
- **计划案例：** 小功能的验收与回归链。
- **前后关系：** 通用案例流程，服务 Flutter 与测试案例。
- **预计交付物：** 任务模板、证据包、失败表。

### 30. 应用交付 Harness：Flutter 登录到测试报告

正文（已完成）：[应用交付 Harness：Flutter 登录到测试报告](part-05-case-studies/30-application-delivery-harness-flutter-login-to-test-report.md)。

- **目标：** 展示移动功能的交付闭环。
- **核心问题：** 如何覆盖实现、设备验证和报告？
- **主要小节：** 需求、状态、安全、UI、设备、诊断、报告。
- **计划图示：** Flutter 交付链。
- **计划案例：** 成功、校验错误、网络失败登录。
- **前后关系：** 具体化工程工作流，连接 UI 与 API 测试。
- **预计交付物：** 示例结构、测试矩阵、报告模板。

### 31. 测试自动化 Harness：pytest 与 Playwright

正文（已完成）：[测试自动化 Harness：pytest 与 Playwright](part-05-case-studies/31-test-automation-harness-pytest-and-playwright.md)。

- **目标：** 组织 API 与 UI 的分层测试。
- **核心问题：** 如何让两层证据互补而不互相冒充？
- **主要小节：** 分层、pytest、Playwright、夹具、隔离、报告。
- **计划图示：** 测试金字塔与数据流。
- **计划案例：** 同一登录场景的 API 与 UI 验证。
- **前后关系：** 连接浏览器自动化和测试策略。
- **预计交付物：** 示例、运行说明、隔离规则、报告格式。

### 32. 自动分析失败并修复 Bug

正文（已完成）：[自动分析失败并修复 Bug](part-05-case-studies/32-automated-failure-analysis-and-bug-fixing.md)。

- **目标：** 用最小复现与可证伪假设调试。
- **核心问题：** 如何避免立即猜测补丁？
- **主要小节：** 收集、复现、搜索、假设、测试、修复、复盘。
- **计划图示：** 症状到回归验证闭环。
- **计划案例：** 偶发测试失败定位等待条件。
- **前后关系：** 应用观察、反思、评估与恢复。
- **预计交付物：** 调查模板、假设表、回归样例。

### 33. Obsidian 项目记忆系统

正文（已完成）：[Obsidian 项目记忆系统](part-05-case-studies/33-obsidian-project-memory-system.md)。

- **目标：** 建立人类与 Agent 共读的知识层。
- **核心问题：** 如何让 Markdown 记忆可浏览而不堆积？
- **主要小节：** Vault、链接、状态、标签、生命周期、同步。
- **计划图示：** 书稿和知识网关系图。
- **计划案例：** 章节证据与审查结论组织。
- **前后关系：** 深化仓库和记忆，服务 Book Factory。
- **预计交付物：** 目录约定、链接规则、健康检查。

### 34. 团队级 Skill Library

正文（已完成）：[团队级 Skill Library](part-05-case-studies/34-team-skill-library.md)。

- **目标：** 把个人技巧治理为团队资产。
- **核心问题：** 如何处理所有权、质量、版本和弃用？
- **主要小节：** 分类、注册、契约、测试、审核、废弃。
- **计划图示：** Skill 治理生命周期。
- **计划案例：** 三个团队 Skill 的注册。
- **前后关系：** 从单一 Skill 扩展至组织治理。
- **预计交付物：** Registry、质量等级、责任模型。

### 35. 企业级 Harness 架构

正文（已完成）：[企业级 Harness 架构](part-05-case-studies/35-enterprise-harness-architecture.md)。

- **目标：** 设计规模化运行控制平面。
- **核心问题：** 如何同时处理隔离、审计、成本和合规？
- **主要小节：** 控制平面、执行平面、身份、策略、观测、合规。
- **计划图示：** 企业架构图。
- **计划案例：** 内部知识助手的受控扩展。
- **前后关系：** 汇总案例，连接安全和版本化。
- **预计交付物：** 参考图、治理清单、上线策略。

## Part 6：设计模式与评估

### 36. Harness Design Patterns

正文（已完成）：[Harness Design Patterns](part-06-design-and-evaluation/36-harness-design-patterns.md)。

- **目标：** 用模式支持控制流选型。
- **核心问题：** 何时使用单循环、监督者或流水线？
- **主要小节：** 分类、条件、接口、失败、组合、反模式。
- **计划图示：** 控制流模式比较。
- **计划案例：** 文件修复的两种结构对比。
- **前后关系：** 从案例抽象，服务架构选型。
- **预计交付物：** Pattern Card、决策树、反模式表。

### 37. Memory 与 Skill Design Patterns

正文（已完成）：[Memory 与 Skill Design Patterns](part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md)。

- **目标：** 提炼记忆与 Skill 的可组合接口。
- **核心问题：** 如何避免污染与过度耦合？
- **主要小节：** 记忆、检索、Skill 组合、版本、隔离、弃用。
- **计划图示：** 读写责任边界。
- **计划案例：** 事实核验 Skill 的证据读取。
- **前后关系：** 深化组件与团队库，连接长期上下文。
- **预计交付物：** Pattern Card、反例、迁移表。

### 38. Reflection、Evaluation 与 Approval Patterns

正文（已完成）：[Reflection、Evaluation 与 Approval Patterns](part-06-design-and-evaluation/38-reflection-evaluation-and-approval-patterns.md)。

- **目标：** 组合自动反馈与人工责任。
- **核心问题：** 评估后何时重试、何时批准或回滚？
- **主要小节：** 判定器、触发、阈值、门禁、升级、回放。
- **计划图示：** 候选改进审批流程。
- **计划案例：** 自动修链接与人工核验事实。
- **前后关系：** 汇总反馈组件，服务安全与发布。
- **预计交付物：** Approval Card、阈值表、升级策略。

### 39. Harness 测试策略与 Benchmark

正文（已完成）：[Harness 测试策略与 Benchmark](part-06-design-and-evaluation/39-harness-testing-strategy-and-benchmark.md)。

- **目标：** 用分层测试和基准证明系统行为。
- **核心问题：** 怎样评估成功、鲁棒、安全、成本与回归？
- **主要小节：** 单元、集成、E2E、固定集、在线评估、偏差。
- **计划图示：** 测试金字塔和 Benchmark 回路。
- **计划案例：** 最小 Harness 四类测试。
- **前后关系：** 深化评估，服务版本化和自改进。
- **预计交付物：** Eval Suite、基准卡、回归矩阵。

### 40. 成本、延迟与 Token 管理

正文（已完成）：[成本、延迟与 Token 管理](part-06-design-and-evaluation/40-cost-latency-and-token-management.md)。

- **目标：** 以资源约束驱动架构决策。
- **核心问题：** 如何优化成本但保留关键质量门？
- **主要小节：** 成本、预算、延迟、缓存、批处理、路由。
- **计划图示：** 任务成本瀑布图。
- **计划案例：** 摘要和缓存降低重复研究。
- **前后关系：** 连接压缩、评估和长期运营。
- **预计交付物：** 成本表、优先级框架、护栏。

### 41. 安全、权限与审计

正文（已完成）：[安全、权限与审计](part-06-design-and-evaluation/41-security-permissions-and-audit.md)。

- **目标：** 将安全贯穿 Harness 全栈。
- **核心问题：** 如何防范注入、泄露、越权与不可追责操作？
- **主要小节：** 威胁、隔离、秘密、策略、审计、响应。
- **计划图示：** 不可信输入的防御层。
- **计划案例：** 恶意网页指令的安全处理。
- **前后关系：** 深化权限与企业治理，约束发布。
- **预计交付物：** Threat Model、审计字段、安全清单。

### 42. Harness 的版本化、回滚和 A/B 测试

正文（已完成）：[Harness 的版本化、回滚和 A/B 测试](part-06-design-and-evaluation/42-harness-versioning-rollback-and-ab-testing.md)。

- **目标：** 安全比较和发布 Harness 变更。
- **核心问题：** 如何证明改进真实并能及时回退？
- **主要小节：** 版本、隔离、对照、灰度、指标、回滚、兼容。
- **计划图示：** 候选到回滚发布链。
- **计划案例：** 两种压缩策略的对照。
- **前后关系：** 汇总模式与治理，连接长期演进。
- **预计交付物：** 实验模板、回滚 Runbook、兼容矩阵。

## Part 7：Book Factory 与未来

### 43. 用 Harness 写一本技术书

正文（已完成）：[用 Harness 写一本技术书](part-07-future/43-writing-a-technical-book-with-harness.md)。

- **目标：** 将技术书生产视为工程系统。
- **核心问题：** 如何长期保持术语、事实和章节可接力？
- **主要小节：** 状态、工作流、角色、引用、图示、发布。
- **计划图示：** Book Harness 状态图。
- **计划案例：** 本仓库生产系统。
- **前后关系：** 反射全书方法，通向 Book Factory。
- **预计交付物：** 参考架构、章节 DoD、看板。

### 44. AI Technical Book Factory：Research、Writing 与 Review Agent

正文（已完成）：[AI Technical Book Factory：Research、Writing 与 Review Agent](part-07-future/44-ai-technical-book-factory-research-writing-and-review-agent.md)。

- **目标：** 分工生产内容并保持作者责任。
- **核心问题：** 如何让多角色传递证据而非幻觉？
- **主要小节：** 契约、证据包、队列、审查、冲突、质量。
- **计划图示：** 多角色生产流水线。
- **计划案例：** 第 1 章多角色交接。
- **前后关系：** 承接协作、Skill 和书籍 Harness。
- **预计交付物：** 角色提示词、交接包、质量门。

### 45. Codex、Claude Code 接力与长期项目上下文

正文（已完成）：[Codex、Claude Code 接力与长期项目上下文](part-07-future/45-codex-claude-code-handoff-and-long-term-context.md)。

- **目标：** 使不同 AI 工具在同一项目可接力。
- **核心问题：** 如何统一入口、状态、证据和交接？
- **主要小节：** 适配、读取、同步、能力差异、冲突治理。
- **计划图示：** 多工具共同状态闭环。
- **计划案例：** Codex 研究与 Claude Code 审查。
- **前后关系：** 汇总工具、规则、协作和 Book Factory。
- **预计交付物：** Handoff 模板、兼容清单、冲突策略。

### 46. 从书籍扩展到课程、博客和知识库

正文（已完成）：[从书籍扩展到课程、博客和知识库](part-07-future/46-books-to-courses-blogs-and-knowledge-bases.md)。

- **目标：** 从单一事实源派生多种学习产品。
- **核心问题：** 如何复用内容而不引入漂移？
- **主要小节：** 内容原子、路径、切片、发布、反馈。
- **计划图示：** 内容供应链。
- **计划案例：** 最小 Harness 章节派生教程与 FAQ。
- **前后关系：** 承接 Book Factory，扩展内容工程。
- **预计交付物：** 复用清单、元数据模板、一致性流程。

### 47. Agent Engineering 的未来与结语

正文（已完成）：[Agent Engineering 的未来与结语](part-07-future/47-agent-engineering-future-and-conclusion.md)。

- **目标：** 回收稳定原则和开放问题。
- **核心问题：** 哪些工程能力长期有效，哪些假设仍开放？
- **主要小节：** 原则、标准、评估、安全、组织、行动。
- **计划图示：** 模型到长期学习系统演进图。
- **计划案例：** 一次性脚本升级路径。
- **前后关系：** 总结全书并连接附录。
- **预计交付物：** 开放问题、实践路线图、结语。

## Appendices

| 附录 | 内容 |
| --- | --- |
| [A](appendices/a-prompt-library.md) | Prompt Library |
| [B](appendices/b-skill-library.md) | Skill Library |
| [C](appendices/c-workflow-library.md) | Workflow Library |
| [D](appendices/d-memory-templates.md) | Memory Templates |
| [E](appendices/e-evaluation-checklists.md) | Evaluation Checklists |
| [F](appendices/f-reflection-checklists.md) | Reflection Checklists |
| [G](appendices/g-mermaid-guide.md) | Mermaid Guide |
| [H](appendices/h-research-and-citation-guide.md) | Research and Citation Guide |
| [I](appendices/i-codex-handoff-template.md) | Codex Handoff Template |
| [J](appendices/j-claude-code-handoff-template.md) | Claude Code Handoff Template |
| [K](appendices/k-glossary.md) | Glossary |
| [L](appendices/l-references.md) | References |
