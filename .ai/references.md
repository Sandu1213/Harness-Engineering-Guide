# References

此文件登记可追溯来源。章节完成前，引用必须补足对应章节、用途、访问日期和核验状态；不能确定的信息保留 `TODO(verify):`，不得伪装成事实。

## 思想来源

| ID | 来源 | 用途与边界 | 状态 |
| --- | --- | --- | --- |
| REF-001 | [Weng, Lilian. Harness Engineering for Self-Improvement (2026-07-04)](https://lilianweng.github.io/posts/2026-07-04-harness/) | 本书的思想来源之一，用于研究 Harness、工作流、文件系统记忆和评估等问题；不作为可逐段翻译的文本。 | 已于 2026-07-15 复核原文 |
| REF-002 | [Weng, Lilian. Prompt Engineering (2023-03-15)](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) | 支持第 1 章对 Prompt Engineering 的背景定义；不转载其技巧清单、示例或实验叙述。 | 已于 2026-07-15 复核原文 |
| REF-003 | [Weng, Lilian. LLM Powered Autonomous Agents (2023-06-23)](https://lilianweng.github.io/posts/2023-06-23-agent/) | 第 1、2 章候选背景来源，用于说明作者按规划、记忆和工具使用组织 Agent 系统概览；不作为唯一架构定义。 | 已于 2026-07-15 复核原文 |
| REF-004 | [ReAct: Synergizing Reasoning and Acting in Language Models (arXiv:2210.03629)](https://arxiv.org/abs/2210.03629) | 第 1、2 章候选论文，用于限定“交错推理与任务动作”、行动访问外部来源及推理轨迹跟踪、更新行动计划和处理例外的研究背景；不在本书当前章节使用其性能数字。 | 已于 2026-07-15 增补复核摘要页 |
| REF-005 | [OpenAI Codex Manual：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) | 第 3 章候选官方来源，用于限定 Codex 的 `AGENTS.md` 项目指令发现和组合行为；不外推为其他 Agent 的加载机制或安全保证。 | 2026-07-15 通过当日更新的 Codex 官方手册复核 |
| REF-006 | [Anthropic：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | 第 3、7 章官方来源，用于限定 `CLAUDE.md` 的持久指令上下文、auto memory 与非强制配置边界；不外推为 Codex 行为、通用记忆架构或权限控制。 | 已于 2026-07-15 复核官方文档 |
| REF-007 | [NIST：Artificial Intelligence Risk Management Framework (AI RMF 1.0)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) | 第 4 章候选来源，用于可信与负责任 AI 风险管理背景；不作为 Agent 验收流程的现成处方。 | 2026-07-15 已核验原始页面 |
| REF-008 | [OpenAI：A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | 第 4 章候选官方来源，用于分层 Guardrails、工具风险与人工升级的限定建议；动态内容在正文当天重查。 | 2026-07-15 已核验官方页面 |
| REF-009 | [Google SRE：Release Engineering and Canarying](https://sre.google/workbook/canarying-releases/) | 第 4 章候选一手来源，用于小范围变更、评价、暂停与回滚的工程类比；不写成 Agent 专用方法。 | 2026-07-15 已核验原始页面 |
| REF-010 | [OpenAI Model Spec (2025-10-27)](https://model-spec.openai.com/2025-10-27) | 第 5 章已核验官方来源，用于限定公开 Spec 的指令权威链和生产模型未必完全反映该 Spec 的边界；不外推为跨产品消息优先级。 | 2026-07-15 已复核 |
| REF-011 | [Google：Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | 第 5 章已核验官方来源，用于清晰具体指令、组件化及该产品复杂 JSON Schema 的 structured output 建议；不作为跨模型保证。 | 2026-06-10 更新，2026-07-15 已复核 |
| REF-012 | [Google：Structured outputs](https://ai.google.dev/gemini-api/docs/structured-output) | 第 5 章已核验官方来源，用于“语法正确 JSON 仍须验证值和业务逻辑”的限定陈述；不外推 Schema 支持或业务正确性。 | 2026-07-07 更新，2026-07-15 已复核 |
| REF-013 | [Anthropic：Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) | 第 5 章已核验官方来源，用于清晰明确指令与以标签分隔复杂 Prompt 内容的建议；不将标签写成安全或性能保证。 | 2026-07-15 已复核；页面未显示稳定发布日期 |
| REF-014 | [OpenAI：API Overview — Backwards compatibility](https://platform.openai.com/docs/api-reference/backward-compatibility) | 第 5 章已核验官方来源，用于模型快照间 Prompt 行为可能变化、固定版本和 evals 的建议；不保证稳定输出。 | 2026-07-15 已复核；页面未显示稳定发布日期 |
| REF-015 | [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 第 6 章已核验官方来源，用于 Context Engineering、有限上下文、高信号选择、按需加载与循环整理的限定工程观点；不作为通用性能或安全保证。 | 2026-07-15 已复核；正文当天需重查动态建议 |
| REF-016 | [OpenAI Agents SDK：Context management](https://openai.github.io/openai-agents-python/context/) | 第 6 章已核验官方来源，用于本地代码 context 与模型可见 context、以及向模型提供信息方式的限定区别；只适用于该 SDK。 | 2026-07-15 已复核 |
| REF-017 | [OpenAI Agents SDK：Running agents](https://openai.github.io/openai-agents-python/running_agents/) | 第 6 章已核验官方来源，用于客户端与服务端跨轮状态承载和混用可能重复上下文的限定说明；只适用于该 SDK。 | 2026-07-15 已复核；正文当天需重查 |
| REF-018 | [Gemini API：Long context](https://ai.google.dev/gemini-api/docs/long-context) | 第 6 章已核验官方来源，用于无用 token、查询位置和 context caching 的产品限定建议；不写入动态阈值、成本或性能承诺。 | 2026-07-15 已复核；正文当天需重查 |
| REF-019 | [Anthropic：Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) | 第 6 章已核验官方来源，用于切块检索可能丢失必要上下文的工程背景；不复刻其方法、指标或成本主张。 | 2026-07-15 已复核 |
| REF-020 | [OpenAI Agents SDK：Sessions](https://openai.github.io/openai-agents-python/sessions/) | 第 7 章已核验官方来源，用于特定 Session 的跨 run 消息历史、运行前读取/运行后写入与不能叠加服务端延续机制的限定说明；不等同于长期记忆。 | 2026-07-15 已读取官方 SDK 文档；动态接口与默认值正文当天重查 |
| REF-021 | [OpenAI Agents SDK：Agent memory](https://openai.github.io/openai-agents-python/sandbox/memory/) | 第 7 章已核验官方来源，用于 sandbox-agent 的 run 间经验文件、与 Session 消息历史的区别、渐进读取、过时风险与 beta 边界；不外推为通用 memory。 | 2026-07-15 已读取官方 SDK 文档；beta 能力正文当天重查 |
| REF-022 | [LangChain：Memory overview](https://docs.langchain.com/oss/python/concepts/memory) | 第 7 章已核验官方来源，用于 LangChain/LangGraph 的 thread-scoped 短期记忆、跨 thread 长期数据、namespace 与同步/后台写入取舍；不作为统一术语标准。 | 2026-07-15 已读取官方文档 |
| REF-023 | [Packer et al.：MemGPT: Towards LLMs as Operating Systems (arXiv:2310.08560)](https://arxiv.org/abs/2310.08560) | 第 7 章已核验论文，用于分层记忆、有限上下文与控制流的研究背景；不使用性能结果或将其系统作为默认架构。 | 2026-07-15 已核验 arXiv v2 摘要页 |
| REF-024 | [Agent Skills Specification](https://agentskills.io/specification) | 第 8 章候选规范，用于 Skill 的 `SKILL.md` 最小目录、必填元数据、可选资源、渐进加载和实验性 `allowed-tools` 声明；不宣称所有产品实现，也不将声明写成授权。 | 2026-07-15 已核验规范页面 |
| REF-025 | [Claude Code：Extend Claude with skills](https://code.claude.com/docs/en/skills) | 第 8、37 章官方来源，用于 Claude Code 的 Skill 入口、按需加载、路径、覆盖和调用控制的产品特有边界；不外推为其他 Agent。 | 2026-07-16 已重读官方文档并刷新 URL；动态产品行为正文当天重查 |
| REF-026 | [OpenAI：Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) | 第 8 章候选官方来源，用于 ChatGPT 的可复用工作流、支持资源、上传扫描与工作区管理边界；不将扫描或工作区设置写成安全保证或 Codex 权限。 | 2026-07-15 已核验官方帮助页；动态产品行为正文当天重查 |
| REF-027 | [OpenAI：Plugins in ChatGPT and Codex](https://help.openai.com/en/articles/20001256-plugins-in-codex) | 第 8 章候选官方来源，用于 Plugin 对 Skills、Apps、App templates 的打包与 App/源系统权限仍适用的限定说明；不外推所有 Plugin 实现。 | 2026-07-15 已核验官方帮助页；动态产品行为正文当天重查 |
| REF-028 | [Wang et al.：Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models](https://aclanthology.org/2023.acl-long.147/) | 第 9 章候选原始论文，用于其“先制定计划、将整体问题分成更小子任务、再按计划求解”的方法定义；不作为生产任务图、真实执行、性能或治理规则。 | 2026-07-15 已核验 ACL 原始论文页面 |
| REF-029 | [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 第 9、29 章候选官方工程文章，用于 workflow 与 agent 的限定区分、复杂度取舍、环境反馈、停止条件、测试与人类审查的工程建议；不作为行业标准或跨系统保证。 | 2026-07-16 已重读官方工程文章；动态工程建议后续改写时重查 |
| REF-030 | [OpenAI Agents SDK：Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/) | 第 9 章候选官方 SDK 文档，用于该 Python SDK 中 LLM 决策、代码编排、分类、串联、评估循环与独立任务并行的限定说明；不外推其他 SDK 或默认并行安全。 | 2026-07-15 已核验官方 SDK 文档；动态行为正文当天重查 |

| REF-031 | [AWS Step Functions：Learn about state machines](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-statemachines.html) | 第 10 章候选官方产品文档，用于该产品的事件驱动步骤、状态、执行、输入输出、错误处理和 redrive 概念；不外推为通用协议或恢复保证。 | 2026-07-16 已在正文写作日、Technical Review 与 Fact Check 重读官方文档；动态产品行为后续阶段仍须重查 |
| REF-032 | [AWS Step Functions：Handling errors in Step Functions workflows](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html) | 第 10 章候选官方产品文档，用于该产品中 Retry、Catch、错误输出和 redrive 的限定行为；不外推为跨系统重试顺序、参数或保证。 | 2026-07-16 已在正文写作日、Technical Review 与 Fact Check 重读官方文档；动态产品行为后续阶段仍须重查 |
| REF-033 | [LangGraph：Persistence](https://docs.langchain.com/oss/python/langgraph/persistence) | 第 10 章候选官方框架文档，用于该框架的 thread、checkpoint、恢复、人工中断、历史和 replay 范围；不外推存储、版本或安全行为。 | 2026-07-16 已在正文写作日、Technical Review 与 Fact Check 重读官方文档；动态框架行为后续阶段仍须重查 |
| REF-034 | [LangGraph：Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api) | 第 10 章候选官方框架文档，用于持久化任务结果、重入和副作用幂等性的限定建议；不外推 exactly-once 或任意副作用安全。 | 2026-07-16 已在正文写作日、Technical Review 与 Fact Check 重读官方文档；动态框架行为后续阶段仍须重查 |
| REF-035 | [Temporal：Architecture overview](https://github.com/temporalio/temporal/blob/main/docs/architecture/README.md) | 第 10 章候选官方项目架构文档，用于 Temporal 实现中的追加式历史、确定性 Workflow 代码及 Activity 幂等/非重试边界；不作为本书通用实现处方。 | 2026-07-16 已在正文写作日、Technical Review 与 Fact Check 重读官方仓库文档；后续阶段仍须按当日版本重查 |
| REF-036 | [Model Context Protocol：Tools（当前草案）](https://modelcontextprotocol.io/specification/draft/server/tools)；[Schema Reference（2025-11-25）](https://modelcontextprotocol.io/specification/2025-11-25/schema) | 第 11 章候选官方协议资料：Tools 草案用于 `tools/list`、`tools/call`、工具描述、输入/输出 Schema、工具结果错误和协议异常；版本化 Schema 用于 Tool Annotations 的字段与不受信任服务器边界。不将草案字段、授权或兼容性外推为通用保证。 | 2026-07-16 已在 Fact Check 重读；协议资料与实现行为后续阶段仍须重查 |
| REF-037 | [OpenAI：Function calling](https://developers.openai.com/api/docs/guides/function-calling) | 第 11 章候选官方产品文档，用于该产品的工具调用多步流程、应用侧执行、结果回传和调用关联标识的限定说明；不外推为跨产品接口或安全保证。 | 2026-07-16 已在 Fact Check 重读官方页面；动态产品行为、SDK 与模型选项后续阶段仍须重查 |
| REF-038 | [Anthropic：Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) | 第 11 章候选官方产品文档，用于该产品客户端工具的名称、说明、`input_schema`、输入样例和工具选择选项；不外推为通用工具规范或授权机制。 | 2026-07-16 已在 Fact Check 重读官方页面；动态产品行为后续阶段仍须重查 |
| REF-039 | [JSON Schema：Specification](https://json-schema.org/specification) | 第 11 章候选官方规范，用于 JSON Schema 的 Core、Validation 与纯验证 dialect 定位；不将形状验证写成业务、权限、效果或任务验证。 | 2026-07-16 已在 Fact Check 重读规范页；具体 draft 与实现后续阶段仍须按需核验 |
| REF-040 | [OpenAI：GPT-5.2-Codex cybersecurity](https://deploymentsafety.openai.com/gpt-5-2-codex/cybersecurity) | 第 12 章候选官方产品安全说明，用于该产品云端隔离容器、默认网络限制、工作区文件编辑限制和非沙箱命令用户批准的限定描述；不外推为本仓库、其他 Agent 或任何部署的默认安全行为。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态产品行为后续阶段仍须重查 |
| REF-041 | [Docker Engine security](https://docs.docker.com/engine/security/) | 第 12 章候选官方文档，用于 Docker 容器中 namespace、cgroup、capability 和移除未明确需要 capability 的限定建议；不将容器写为绝对隔离。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读官方文档 |
| REF-042 | [Kubernetes RBAC API reference](https://kubernetes.io/docs/reference/kubernetes-api/rbac/) | 第 12 章候选官方 API 参考，用于 Role、RoleBinding、ClusterRole、ClusterRoleBinding 及 namespace 内 RoleBinding 作用范围的限定例子；不外推其他 RBAC 或业务授权规则。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读官方文档 |
| REF-043 | [GitHub Actions workflow syntax：permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?apiVersion=2022-11-28) | 第 12 章候选官方文档，用于 workflow/job 层 `GITHUB_TOKEN` 权限与指定权限时未声明范围为 `none` 的产品语义；不外推仓库默认值、触发器或第三方 Action 安全性。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读官方文档；动态产品行为后续阶段仍须重查 |
| REF-044 | [GitHub Actions secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) | 第 12 章候选官方安全建议，用于默认限制 `GITHUB_TOKEN`、再按 job 增加最小必要访问的限定实践；不宣称该建议能单独消除供应链或 secret 风险。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读官方文档；动态产品行为后续阶段仍须重查 |
| REF-045 | [Lewis et al.：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) | 第 13 章候选论文，用于参数化模型、可检索非参数稠密索引以及 provenance/知识更新开放问题的研究背景；不作为本书 Evidence Card 或任意 RAG 质量的保证。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读 arXiv 页面 |
| REF-046 | [Anthropic：Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) | 第 13 章候选工程文章，用于切分可能损失语境、嵌入/词法信号可分别考虑的限定背景；不复制其性能、成本、Top-K、模型或供应商组合结论。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读官方工程文章 |
| REF-047 | [OpenAI API：Vector stores](https://developers.openai.com/api/reference/resources/vector_stores) | 第 13 章候选官方 API 参考，用于该产品语义搜索、切块策略、查询和文件属性筛选的接口例子；不外推默认参数、限额、价格、保留、安全性或其他平台行为。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态接口后续阶段仍须重查 |
| REF-048 | [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | 第 14 章候选原始框架，用于人类角色、责任与监督属于 Human-AI Interaction 风险管理议题的限定背景；不写成法律义务、固定审批流程或 Agent API。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读原始框架 |
| REF-049 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | 第 14 章候选在线核心资源，用于定义、评估和记录人机配置/监督过程以及角色责任的结果项；行动卡、矩阵和审批记录均为本书工程扩展。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；在线资源后续阶段仍须重查 |
| REF-050 | [OpenAI Agents SDK：Human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/) | 第 14 章候选官方 SDK 文档，用于该 Python SDK 对敏感工具调用暂停、对具体调用批准/拒绝并恢复的限定流程；不外推到其他 SDK、MCP 或通用 Agent。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态 SDK 内容后续阶段仍须重查 |
| REF-051 | [OpenAI：A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | 第 14 章候选官方工程指南，用于超过失败阈值以及敏感、不可逆或高风险动作可考虑人工介入的限定触发例子；不提供统一阈值或跨产品保证。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；链接检查按精确 URL 忽略 HTTP 403，后续改写仍须重查 |
| REF-052 | [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) | 第 14 章候选欧盟官方法规文本，仅用于提示其第 14 条处于适用范围明确的高风险 AI 系统人类监督语境；不构成法律意见、系统分级或合规结论。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读原文；法规结论必须以当日文本和具备权限的专业人员核验 |
| REF-053 | [OpenTelemetry：Signals](https://opentelemetry.io/docs/concepts/signals/) | 第 15 章候选官方概念文档，用于该文档对 traces、metrics、logs、baggage 与 profiles 等信号类别的限定呈现；不将类别、字段、采样、保留或可靠性外推为所有 Agent 的默认实现。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；在线内容后续改写时重查 |
| REF-054 | [W3C：Trace Context](https://www.w3.org/TR/trace-context/) | 第 15 章候选 W3C Recommendation，用于跨服务追踪上下文的 HTTP 头和值格式，以及 `traceparent` 描述追踪图位置的限定实例；不将本书关联标识外推为协议实现、身份、授权或审计机制。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读 Recommendation |
| REF-055 | [Playwright：Auto-waiting](https://playwright.dev/docs/actionability) | 第 15 章候选官方文档，用于该产品在点击等操作前检查 actionability 条件的限定行为；不将动作前检查写成业务成功、统一浏览器规则或外部结果证明。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态产品行为后续改写时重查 |
| REF-056 | [Playwright：Assertions](https://playwright.dev/docs/test-assertions) | 第 15 章候选官方文档，用于 web-first 异步断言重复读取直至满足或超时的限定行为；不将默认超时、断言 API 或一次通过外推为本书策略、生产 SLA 或业务验收。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态产品行为后续改写时重查 |
| REF-057 | [Shinn et al.：Reflexion: Language Agents with Verbal Reinforcement Learning（arXiv v4）](https://arxiv.org/abs/2303.11366v4) | 第 16 章候选原始论文，用于语言反馈与情景记忆可影响后续尝试的研究背景；不使用性能数字，不将论文方法、记忆结构或任务结果写成本书实现。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读 arXiv v4 摘要页 |
| REF-058 | [Madaan et al.：Self-Refine: Iterative Refinement with Self-Feedback（arXiv v2）](https://arxiv.org/abs/2303.17651v2) | 第 16 章候选原始论文，用于初始输出、反馈与精炼构成迭代过程的研究背景；不将自反馈等同外部验证，不使用平均改善或跨任务有效性数字。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读 arXiv v2 摘要页 |
| REF-059 | [Google SRE Book：Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) | 第 16 章候选官方工程实践，用于事件、影响、处置、成因与预防行动的复盘记录背景；不外推为 Agent 自动根因分析或组织流程保证。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读原始页面 |
| REF-060 | [Anthropic：Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) | 第 16 章候选官方工程文章，用于 evaluator-optimizer 在评估标准清晰、迭代精炼具有可测价值时的限定建议；不作为跨产品标准或模型自评可靠性保证。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态文章后续改写时重查 |
| REF-061 | [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 第 17 章候选官方工程文章，用于 task、trial、grader、transcript、outcome、evaluation harness 与 agent harness 的限定工程定义，以及评分器取舍背景；不将术语、案例、指标或建议写成跨产品标准。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；动态文章后续改写时重查 |
| REF-062 | [NIST AI RMF Core：Measure](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | 第 17 章候选 NIST 在线核心资源，用于选择、应用和记录测量方法，以及测试、评估、验证和确认过程支持有效性与可靠性的限定背景；不作为 Agent 固定测试框架、认证或合规结论。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；在线资源处于修订语境，后续改写时重查 |
| REF-063 | [NIST：Artificial Intelligence Risk Management Framework (AI RMF 1.0)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) | 第 17 章候选 NIST 原始框架，用于自愿风险管理、有效性、可靠性、持续测试和风险测量背景；不推导适用性、法规义务、具体阈值或产品质量结论。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读原始 PDF |
| REF-064 | [Zheng et al.：Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) | 第 17 章候选原始论文，用于 position、verbosity 与 self-enhancement 等 LLM 评判器偏差风险的研究背景；不引用排行榜、百分比或模型比较来证明本书评分器可靠。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读 arXiv 摘要页 |
| REF-065 | [RFC 9110：HTTP Semantics，第 9.2.2 节](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods) | 第 18 章候选 IETF 标准，用于 HTTP 幂等方法、通信失败且尚未读到响应时受限自动重试，以及非幂等请求的限制；不将 HTTP 语义外推为 Tool、RPC、数据库、浏览器或 Agent 的重试许可。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读规范章节 |
| REF-066 | [Google SRE Book：Addressing Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/) | 第 18 章候选官方工程书，用于重试可能放大负载、随机化指数退避、单请求上限、全局重试预算、避免多层同时重试和错误分类的限定建议；不采用其参数、容量或服务架构作为本书默认值。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读原始章节 |
| REF-067 | [Microsoft Azure：Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction) | 第 18 章候选官方架构模式，用于最终一致、多步骤操作的补偿记录、可失败性、可恢复进度、幂等、关联、审计和人工介入边界；不写成原子回滚、通用 Saga 或默认一致性保证。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读官方页面；动态内容后续改写时重查 |
| REF-068 | [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 第 19 章候选官方工程文章，用于 Context Engineering 管理推理时 token 集合、长时程任务的 compaction、结构化笔记、按需恢复与取舍的限定讨论；不将 Claude Code 或平台特性、默认压缩或性能结论外推为通用行为。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；页面未见稳定发布日期，后续改写时重查 |
| REF-069 | [Liu et al.：Lost in the Middle: How Language Models Use Long Contexts（arXiv v3）](https://arxiv.org/abs/2307.03172v3) | 第 19 章候选原始论文，用于多文档问答与键值检索实验中相关信息位置影响所测模型表现的限定背景；不泛化为所有模型、任务、上下文长度或固定衰减。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读 arXiv v3 摘要页 |
| REF-070 | [NIST AI RMF Core：Govern、Manage](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | 第 20 章候选 NIST 在线核心资源，用于自愿风险管理语境中的持续风险管理、角色责任、上线后监控、事件响应、恢复、变更管理和可测量持续改进背景；不写成固定 Agent 流程、认证或法律结论。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读；在线资源处于修订语境，后续改写时重查 |
| REF-071 | [Google SRE Workbook：Configuration Design and Best Practices](https://sre.google/workbook/configuration-design/) | 第 20 章候选官方工程实践，用于配置与结果数据分离、所有权、变更追踪、渐进应用和回滚能力的工程背景；不将配置案例写成 Prompt、Skill、模型或 Agent 变更的充分安全方案。 | 2026-07-16 已在 Research、Technical Review 与 Fact Check 重读原始章节；动态内容后续改写时重查 |
| REF-072 | [OpenAI Codex Manual：AGENTS.md 与项目指导](https://developers.openai.com/codex/codex-manual.md) | 第 21 章官方资料，用于 Codex 的仓库指导、全局/仓库/更具体目录层级与相邻指导优先的受限陈述；不证明任一会话、版本或路径实际加载，也不把指导写成权限或强制执行。 | 2026-07-16 通过 official Codex manual helper 刷新并重读 |
| REF-073 | [OpenAI Codex Manual：Project config files](https://developers.openai.com/codex/codex-manual.md) | 第 21 章官方资料，用于受信任项目的项目配置、项目 hooks 与项目 rules 加载边界；不表示本仓库存在项目配置，也不推导安全、网络或账户授权。 | 2026-07-16 通过 official Codex manual helper 刷新并重读 |
| REF-074 | [Anthropic Claude Code：How Claude remembers your project](https://docs.anthropic.com/en/docs/claude-code/memory) | 第 21 章官方资料，用于 CLAUDE.md 的持久指令上下文、目录层级、AGENTS.md import，以及与 settings、sandbox、拒绝权限和 hook 的控制边界；不证明真实会话加载或配置。 | 2026-07-16 已重读官方文档；动态内容后续改写时重查 |
| REF-075 | [OpenAI Codex Manual：Customization overview](https://learn.chatgpt.com/docs/customization/overview) | 第 22 章官方资料，用于 AGENTS.md 的持久仓库指导、层级、相邻指导优先和根入口应简短具体的受限陈述；不外推为 Claude Code 行为、实际加载、权限、Sandbox 或强制执行。 | 2026-07-16 通过 official Codex manual helper 刷新并重读 |
| REF-076 | [Claude Code Docs：How Claude remembers your project](https://code.claude.com/docs/en/memory) | 第 22 章官方资料，用于 CLAUDE.md 持久指令上下文、非强制配置边界、简洁常驻说明、局部 rules 或 skills，以及 AGENTS.md import 的受限陈述；不保证任意版本、平台或设置。 | 2026-07-16 已重读官方文档；动态内容后续改写时重查 |
| REF-077 | [OpenAI Codex：Build skills](https://learn.chatgpt.com/docs/build-skills.md) | 第 23 章官方资料，用于 Codex Skill 的 SKILL.md、名称/描述、显式或隐式激活与渐进加载；不外推为其他 Agent 的加载、权限、成功率或安全保证。 | 2026-07-16 通过 current Codex Manual 重读；动态内容后续改写时重查 |
| REF-078 | [OpenAI Codex：Hooks](https://learn.chatgpt.com/docs/hooks.md) | 第 23 章官方资料，用于 Codex Hook 的事件、匹配命令的并发、非受管 Hook 信任审查和项目层信任边界；不推导顺序保证、脚本安全、权限或跨产品实现。 | 2026-07-16 通过 current Codex Manual 重读；动态内容后续改写时重查 |
| REF-079 | [OpenAI Codex：Build plugins](https://learn.chatgpt.com/docs/build-plugins) | 第 23 章官方资料，用于 .codex-plugin/plugin.json 入口及 Plugin 可分发 Skill、Hook、MCP 配置、应用映射与资产；不证明插件已安装、启用、受信任、获授权或可跨产品运行。 | 2026-07-16 通过 current Codex Manual 重读；动态内容后续改写时重查 |
| REF-080 | [W3C WebDriver](https://www.w3.org/TR/webdriver2/) | 第 25 章 W3C 标准资料，用于远程检查和控制用户代理的、平台与语言无关协议这一受限背景；不将其写成所有 Agent 的工具接口、权限模型或业务验收。 | 2026-07-16 已重读原始规范；具体实现行为后续改写时重查 |
| REF-081 | [Playwright：Auto-waiting](https://playwright.dev/docs/actionability) | 第 25 章官方产品资料，用于 `locator.click()` 等动作的 actionability 检查与超时失败边界；不外推为业务成功、页面状态、跨工具行为或安全保证。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-082 | [Playwright：Assertions](https://playwright.dev/docs/test-assertions) | 第 25 章官方产品资料，用于 Web-first 异步断言会反复获取并检查目标直至满足或超时的限定陈述；不把单个断言视为完整用户流程、外部效果或发布验收。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-083 | [Playwright：Locators](https://playwright.dev/docs/locators) | 第 25 章官方产品资料，用于用户可见属性或显式测试契约的定位建议，以及动作时定位当前 DOM 的限定陈述；不保证任何站点的定位、可访问性或语义正确。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-084 | [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) | 第 25 章官方协议资料，用于 Chromium 系浏览器的 domain、command、event 组织与 tip-of-tree 无向后兼容保证；不当作跨浏览器标准、稳定 API、授权机制或观察完成证明。 | 2026-07-16 已重读官方协议文档；动态协议后续改写时重查 |
| REF-085 | [OpenAI Agents SDK：Handoffs](https://openai.github.io/openai-agents-python/handoffs/) | 第 26 章官方 SDK 资料，用于将任务交给指定 Agent、可提供输入 schema/input filter 且 handoff 位于一次 run 内的限定陈述；不外推为跨会话、跨产品交接、消息系统、权限或历史传递保证。 | 2026-07-16 已重读官方 SDK 文档；动态 SDK 行为后续改写时重查 |
| REF-086 | [MCP：Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | 第 24 章官方安全资料，用于本地 Server、OAuth URL、SSRF、scope 最小化、同意与传输风险的限定背景；不当作本章或任意部署已经实施的控制、合规结论或完整威胁模型。 | 2026-07-16 已重读官方资料；具体实现与部署后续改写时重查 |
| REF-087 | [Git：git-worktree](https://git-scm.com/docs/git-worktree) | 第 27 章 Git 官方参考，用于同一仓库附着多个工作树、可同时检出多个分支，以及 linked worktree 共享和区分部分仓库数据的限定陈述；不当作沙箱、权限隔离、无冲突并发或真实 worktree 证据。 | 2026-07-16 已重读官方参考；Git 版本和命令行为后续改写时重查 |
| REF-088 | [Git：git-diff](https://git-scm.com/docs/git-diff) | 第 27、29 章 Git 官方参考，用于工作树、索引、提交、树对象或磁盘路径的比较，以及默认与 `--cached` 比较对象的限定区别；不把 diff 当作测试、事实、语义、权限、审查或合并正确性。 | 2026-07-16 已重读官方参考；命令与版本行为后续改写时重查 |
| REF-089 | [GitHub Docs：About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | 第 27、29 章 GitHub 官方资料，用于 Comment、Approve、Request changes 审查状态，以及批准和阻断效果依赖仓库规则的限定陈述；不推断任何仓库的计划、权限、规则或合并结果。 | 2026-07-16 已重读官方文档；动态平台行为后续改写时重查 |
| REF-090 | [Node.js：Test runner](https://nodejs.org/api/test.html)；[Node.js CLI](https://nodejs.org/api/cli.html) | 第 28、29、30 章官方资料，用于 `node:test` 定义测试与 `node --test` 启动命令行测试运行器的限定说明；不外推生产 Harness 可靠性、外部 I/O、端到端流程或 Agent 产品能力。 | 2026-07-16 已重读官方文档；Node 版本行为后续改写时重查 |
| REF-091 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | 第 28 章 NIST 在线资源，用于 AI RMF Core 为自愿性、按组织和场景使用且非固定顺序行动清单的限定提醒；不构成最小 Harness 规范、认证、法律意见或风险分级。 | 2026-07-16 已重读页面；页面处于修订语境，后续改写时重查 |
| REF-092 | [Flutter：Testing Flutter apps](https://docs.flutter.dev/testing/overview) | 第 30 章 Flutter 官方资料，用于 unit、widget 与 integration 测试的范围和取舍背景；不证明任何 Flutter 项目已运行、通过或达到质量目标。 | 2026-07-16 写作日重读；动态文档后续改写时重查 |
| REF-093 | [Flutter：Build a form with validation](https://docs.flutter.dev/cookbook/forms/validation) | 第 30 章 Flutter 官方 Cookbook，用于 `Form`、`GlobalKey` 与 `validate()` 的表单输入校验示例；不外推后端认证、账号存在性、密码安全或网络请求。 | 2026-07-16 写作日重读；页面标注 Flutter 3.44.0、2026-05-05 更新 |
| REF-094 | [Flutter：Check app functionality with an integration test](https://docs.flutter.dev/testing/integration-tests) | 第 30 章 Flutter 官方资料，用于 `integration_test`、`WidgetTester`、`IntegrationTestWidgetsFlutterBinding` 与物理设备/模拟器测试语境；不证明本章或任何项目已构建、安装、运行、通过或生成报告。 | 2026-07-16 写作日重读；动态文档后续改写时重查 |
| REF-095 | [pytest：How to use fixtures](https://docs.pytest.org/en/stable/how-to/fixtures.html) | 第 31 章 pytest 官方资料，用于测试函数请求 fixture、fixture 作用域及 setup/teardown 的限定背景；不将 fixture 写成 API、浏览器或环境隔离的充分保证。 | 2026-07-16 写作日重读；动态文档后续改写时重查 |
| REF-096 | [pytest：How to monkeypatch/mock modules and environments](https://docs.pytest.org/en/stable/how-to/monkeypatch.html) | 第 31 章 pytest 官方资料，用于 `monkeypatch` 安全修改属性、字典项或环境变量且在请求它的测试或 fixture 结束后撤销的限定行为；不证明替身与真实依赖等价。 | 2026-07-16 写作日重读；动态文档后续改写时重查 |
| REF-097 | [Playwright：Isolation](https://playwright.dev/docs/browser-contexts) | 第 31 章 Playwright 官方资料，用于每项测试的 Browser Context、独立 storage/cookies 及 clean-slate 隔离语境；不证明真实账户、浏览器、并行运行或业务流程已经验证。 | 2026-07-16 写作日重读；动态文档后续改写时重查 |
| REF-098 | [Zeller、Hildebrandt：Simplifying and Isolating Failure-Inducing Input](https://www.st.cs.uni-saarland.de/publications/files/zeller-tse-2002.pdf) | 第 32 章原始论文，用于 Delta Debugging 对失败样例最小化及通过／失败样例差异隔离的研究语境；不外推自动最小化可用性、根因证明、案例成本或成功率。 | 2026-07-16 已重读原文 PDF；研究论文的案例与运行次数不作为本章事实 |
| REF-099 | [Google SRE Book：Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) | 第 32 章 Google SRE 原始工程书，用于观察、候选原因、支持／反证检查、受控改变、有效问题报告和调查笔记的限定排障语境；不作为固定流程、权限或严重性标准。 | 2026-07-16 已重读原始章节；动态网页后续改写时重查 |
| REF-100 | [Git：git-bisect](https://git-scm.com/docs/git-bisect) | 第 32 章 Git 官方参考，用于以 good/bad 提交为边界、在历史中点测试并报告第一个 bad 提交的 Git 特定行为；不将二分结果外推为根因、权限或工作树操作许可。 | 2026-07-16 已重读官方参考；命令与版本行为后续改写时重查 |
| REF-101 | [Obsidian：How Obsidian stores data](https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data) | 第 33 章 Obsidian 官方资料，用于 vault 中 Markdown 纯文本笔记、本地文件夹与外部文件变化刷新的限定背景；不证明外部编辑无冲突、Agent 已获访问权或 vault 已打开。 | 2026-07-16 已重读官方帮助；动态产品行为后续改写时重查 |
| REF-102 | [Obsidian：Properties](https://help.obsidian.md/Properties) | 第 33 章 Obsidian 官方资料，用于顶部 YAML 中的结构化属性和同名属性类型一致的限定背景；不把本书字段写成强制 schema 或内容正确性保证。 | 2026-07-16 已重读官方帮助；动态产品行为后续改写时重查 |
| REF-103 | [Obsidian：Internal links](https://help.obsidian.md/Linking+notes+and+files/Internal+links) | 第 33 章 Obsidian 官方资料，用于 Wikilink、Markdown 内部链接、重命名时 vault 内链接更新和可关闭 Wikilink 的限定行为；不保证跨工具兼容或语义正确。 | 2026-07-16 已重读官方帮助；动态产品行为后续改写时重查 |
| REF-104 | [Obsidian：Tags](https://help.obsidian.md/Editing+and+formatting/Tags) | 第 33 章 Obsidian 官方资料，用于标签检索、YAML 标签列表和嵌套标签筛选的限定背景；不把标签当作权威目录、权限或事实核验。 | 2026-07-16 已重读官方帮助；动态产品行为后续改写时重查 |
| REF-105 | [Obsidian：Introduction to Obsidian Sync](https://help.obsidian.md/Obsidian+Sync/Introduction+to+Obsidian+Sync) | 第 33 章 Obsidian 官方资料，用于私有跨设备同步服务及与其他云存储同时使用前应备份以防冲突的限定提醒；不证明本仓已启用、已备份或冲突会自动解决。 | 2026-07-16 已重读官方帮助；动态产品行为后续改写时重查 |
| REF-106 | [OpenAI Codex：Build skills](https://developers.openai.com/codex/skills/) | 第 34 章 Codex 官方资料，用于仓库、用户、管理员和系统位置的 Skill 发现、`description` 对隐式触发的影响，以及直接 Skill 与可分发 plugin 的限定区别；不外推其他产品的扫描路径、插件格式或预算。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-107 | [Anthropic：Agent Skills overview](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview) | 第 34 章 Anthropic 官方资料，用于含指令、元数据和可选资源的 Skill 目录、不同产品表面的共享范围和未知来源需审计的限定背景；不保证跨表面同步或集中管理。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-108 | [Anthropic：Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise) | 第 34 章 Anthropic 官方治理指南，用于风险审查、触发／隔离／共存／输出质量评估、所有者、版本、监测和弃用的组织建议；不作为跨供应商合规标准或能力保证。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-109 | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) | 第 34 章版本规范，用于先声明 public API、不兼容改动／兼容新增／兼容修复的版本语义及已发布版本不可原地修改的受限类比；不把自然语言 Skill 行为写成自动兼容保证。 | 2026-07-16 已重读规范；后续类比须保持受限范围 |
| REF-110 | [NIST SP 800-207：Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) | 第 35 章 NIST 最终出版物，用于资源会话前不依网络位置授予隐式信任、主体与设备认证／授权的限定背景；不证明本书系统已部署零信任或合规。 | 2026-07-16 已重读原始页面；具体实现后续改写时重查 |
| REF-111 | [Kubernetes：Multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/) | 第 35 章 Kubernetes 官方资料，用于共享集群的安全、公平性、noisy-neighbor 挑战及 RBAC、配额、网络策略语境；不将 Kubernetes 或其机制写成任意 Harness 的充分隔离。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-112 | [Open Policy Agent：Philosophy](https://www.openpolicyagent.org/docs/latest/philosophy/) | 第 35 章 OPA 官方资料，用于策略与受约束服务可解耦、服务查询策略和数据以求值的限定背景；不推导 Rego、部署、授权、安全或合规结论。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-113 | [OpenTelemetry：Traces](https://opentelemetry.io/docs/concepts/signals/traces/) | 第 35 章 OpenTelemetry 官方资料，用于 span、trace ID、span ID 与上下文传播关联不同位置 span 的限定背景；不把 trace 写成完整日志、审计或遥测已采集的证明。 | 2026-07-16 已重读官方文档；动态产品行为后续改写时重查 |
| REF-114 | [CloudEvents Specification](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md) | 第 36 章开放规范，用于 event 作为发生事实及上下文的数据记录、producer／consumer／intermediary 和可互操作格式的限定背景；不证明投递顺序、重试、去重、授权或事件总线存在。 | 2026-07-16 通过同一规范的原始文件读取 1.0.3-wip；正式版本后续改写时重查 |
| REF-115 | [Node.js：Events](https://nodejs.org/api/events.html) | 第 36 章 Node.js 官方资料，用于 `EventEmitter` 的命名事件、监听器和按注册顺序同步调用的实现特定语境；不外推消息队列、浏览器、CloudEvents 或其他运行时。 | 2026-07-16 已重读官方 API；Node 版本行为后续改写时重查 |
| REF-116 | [Microsoft Research：Trustworthy analysis of online A/B tests](https://www.microsoft.com/en-us/research/publication/trustworthy-analysis-of-online-a-b-tests-pitfalls-challenges-and-solutions/) | 第 42 章原始研究论文页面，用于随机化单位、独立同分布假设、复杂随机机制和不可信分析风险的限定背景；不提供 Agent 通用实验算法、阈值或样本量。 | 2026-07-17 已重读原始研究页面；统计细节后续改写时重查论文 |
| REF-117 | [OpenAI API：Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices) | 第 39 章官方动态指南，用于任务特定、贴近真实分布、持续评估、自动评分与人工校准的受限建议；不证明产品长期可用、评分器可靠或跨供应商行为。 | 2026-07-17 已重读官方页面；动态产品内容后续阶段重查 |
| REF-118 | [Raji et al.：AI and the Everything in the Whole Wide World Benchmark](https://arxiv.org/abs/2111.15366) | 第 39 章原始立场论文，用于少数高影响 Benchmark 被写成广泛进步替代指标时的构念效度讨论；不推出所有 Benchmark 无效或具体系统能力。 | 2026-07-17 已重读 arXiv 原始页面；后续引用保持论文范围 |
| REF-119 | [Liang et al.：Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110) | 第 39 章原始论文，用于场景与指标空间、多指标评估、代表不足项和透明度设计背景；不把 HELM 指标、数值或语言模型结论外推为 Harness 默认 Benchmark。 | 2026-07-17 已重读 arXiv 原始页面；后续引用保持论文范围 |
| REF-120 | [OpenAI API：Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization) | 第 40 章官方工程指南，用于把延迟拆为生成、输入、请求、依赖并行和用户感知路径的受限背景；不复用页面数值、模型经验或跨供应商性能。 | 2026-07-17 已重读官方页面；动态产品内容后续阶段重查 |
| REF-121 | [OpenAI API：Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) | 第 40 章官方产品文档，用于相同 Prompt 前缀、稳定内容前置和缓存用量观察的产品特定语境；不记录或保证当前阈值、保留期、价格或其他供应商行为。 | 2026-07-17 已重读官方页面；动态产品内容后续阶段重查 |
| REF-122 | [Anthropic：Token counting](https://docs.anthropic.com/en/docs/build-with-claude/token-counting) | 第 40 章官方产品文档，用于发送前结构化输入 Token 估算及估算与实际使用量可能略有差异的受限语境；不推出计费、窗口、精度或跨供应商比较。 | 2026-07-17 已重读官方页面；动态产品内容后续阶段重查 |
| REF-123 | [OpenAI API：Batch API](https://developers.openai.com/api/docs/guides/batch) | 第 40 章官方产品文档，用于非即时任务的异步批处理、状态与结果取回语境；不登记当前折扣、完成窗口、限额、格式或性能。 | 2026-07-17 已重读官方页面；动态产品内容后续阶段重查 |
| REF-124 | [OpenAI API：Pricing](https://developers.openai.com/api/docs/pricing) | 第 40 章官方动态价格入口，仅用于正文、事实核验与出版前按日期读取费率；当前研究不摘录任何价格。 | 2026-07-17 已重读入口；每次使用数值前必须重新核验 |
| REF-125 | [OWASP：LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | 第 41 章安全工程指南，用于直接/间接提示注入、不可信内容、指令与数据分离、最小权限和高风险人工监督背景；不证明单一控制能消除风险。 | 2026-07-17 已重读动态页面；后续阶段重查 |
| REF-126 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | 第 41 章 NIST 最终出版物，用于 AC-6 最小权限和 AU-3 审计事件字段的限定背景；不证明本书实施控制、通过评估或满足法规。 | 2026-07-17 已按 Rev. 5 页面重读；发布修订后重查 |
| REF-127 | [OWASP：Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | 第 41 章安全工程指南，用于秘密细粒度访问、创建、轮换、撤销、过期、访问审计与事件响应背景；不规定固定周期、产品或真实运行状态。 | 2026-07-17 已重读动态页面；后续阶段重查 |
| REF-128 | [OWASP：Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) | 第 41 章安全工程指南，用于 when/where/who/what、交互关联、结果/理由、敏感数据排除和日志防护背景；不推出固定字段、留存期或合规结论。 | 2026-07-17 已重读动态页面；后续阶段重查 |
| REF-129 | [SLSA v1.2：Supply chain threats](https://slsa.dev/spec/v1.2/threats-overview) | 第 41 章 OpenSSF SLSA 规范资料，用于生产者、源码、构建、发布、分发、包选择和依赖环节的完整性威胁及 SLSA 未覆盖全部威胁的边界；不证明安全或 provenance 已实施。 | 2026-07-17 已按 v1.2 重读；规范版本变化时重查 |
| REF-130 | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | 第 41 章 NIST 最终出版物，用于事件响应贯穿风险管理并连接准备、检测、响应和恢复的框架背景；不规定本书的固定步骤、角色、时限或监管义务。 | 2026-07-17 已按 Rev. 3 重读；后续发布时重查 |
| REF-131 | [Write the Docs：Docs as Code](https://www.writethedocs.org/guide/docs-as-code/) | 第 43 章社区工程指南，用于文档采用版本控制、问题跟踪、代码审查和自动化测试等软件开发实践的背景；不证明这些实践足以保证内容正确、可发布或适合所有写作团队。 | 2026-07-17 已重读当前页面；社区建议后续改写时重查 |
| REF-132 | [Diátaxis documentation framework](https://diataxis.fr/) | 第 43 章文档框架资料，用于教程、操作指南、参考和解释四类读者需求及其不同写作目的的背景；不把框架写成本书固定目录、完整质量标准或唯一内容分类。 | 2026-07-17 已重读当前页面；后续使用保持受限范围 |
| REF-133 | [Reproducible Builds：Definitions](https://reproducible-builds.org/docs/definition/) | 第 43 章可复现构建定义，用于相同来源、构建环境和构建指令产生逐位一致工件的限定背景；不证明本书当前已实现可复现 PDF/EPUB、供应链安全或跨平台一致。 | 2026-07-17 已重读定义页面；发布管线变化时重查 |
| REF-134 | [NISO CRediT：Contributor roles defined](https://credit.niso.org/contributor-roles-defined/) | 第 44 章贡献角色标准资料，用于 Investigation、Validation、Writing – original draft、Writing – review & editing、Supervision 等责任名称，以及 CRediT 描述贡献但不决定 authorship 的限定背景；不把角色名称写成 Agent 协议、权限或作者身份。 | 2026-07-17 已重读标准页面；后续使用保持研究贡献语境 |
| REF-135 | [W3C Recommendation：PROV-DM](https://www.w3.org/TR/prov-dm/) | 第 44 章溯源数据模型资料，用于 Entity、Activity、Agent 及 generation、usage、derivation、attribution、association 等通用概念；不证明本书证据包兼容 PROV、来源真实、事实正确或责任充分。 | 2026-07-17 已重读 W3C Recommendation；规范使用保持受限范围 |
| REF-136 | [WAME：Chatbots, Generative AI, and Scholarly Manuscripts](https://wame.org/page3.php?id=106) | 第 44 章学术出版伦理资料，用于人类作者身份、生成式 AI 使用披露及作者对内容、准确性和来源归属负责的限定背景；不外推所有图书、合同、司法辖区、版权或法律结论。 | 2026-07-17 已重读组织页面；后续使用保持学术出版语境 |
| REF-140 | [OpenAI Codex：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) | 第 45 章 Codex 官方资料，用于 `AGENTS.md` 自动进入上下文、可覆盖仓库布局/命令/约束/完成定义，以及更接近当前目录的文件优先等产品语境；不外推 Claude Code 行为或保证 Agent 遵守。 | 2026-07-17 通过最新 Codex Manual 重读；动态产品行为后续阶段重查 |
| REF-141 | [OpenAI Codex：Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) | 第 45 章 Codex 官方资料，用于独立子任务可并行交给 subagent、主线程收集结果及局部线程可检查的产品语境；不证明任务自动正确拆分、文件隔离或跨会话持久。 | 2026-07-17 通过最新 Codex Manual 重读；动态产品行为后续阶段重查 |
| REF-142 | [Claude Code：How Claude remembers your project](https://code.claude.com/docs/en/memory) | 第 45 章 Anthropic 官方资料，用于 `CLAUDE.md`、导入、作用域规则和 auto memory 等产品特定持久指令/记忆入口；不外推 Codex 行为或证明项目状态已同步。 | 2026-07-17 已重读官方页面；动态产品行为后续阶段重查 |
| REF-143 | [Claude Code：Common workflows](https://code.claude.com/docs/en/common-workflows) | 第 45 章 Anthropic 官方资料，用于恢复既有会话、worktree 并行和委派研究等当前工作流入口的产品语境；不把会话恢复写成完整项目交接、无冲突并行或永久存档。 | 2026-07-17 已重读官方页面；动态产品行为后续阶段重查 |
| REF-144 | [Claude Code：Create custom subagents](https://code.claude.com/docs/en/sub-agents) | 第 45 章 Anthropic 官方资料，用于 subagent 独立上下文、受限工具/权限和摘要返回主会话的产品语境；不证明跨会话协作、共享状态一致或结果已集成。 | 2026-07-17 已重读官方页面；动态产品行为后续阶段重查 |
| REF-145 | [OASIS DITA 1.3：Introduction to DITA](https://docs.oasis-open.org/dita/dita/v1.3/os/part1-base/archSpec/base/introduction-to-dita.html) | 第 46 章 OASIS 标准资料，用于 topic-oriented、information-typed、可复用和 single-source 内容的 DITA 特定背景；不要求本书采用 XML、DITA 工具、specialization 或其信息架构。 | 2026-07-17 已重读 OASIS 规范页面；后续使用保持 DITA 语境 |
| REF-146 | [Carnegie Mellon Eberly Center：Learning Objectives](https://www.cmu.edu/teaching/designteach/design/learningobjectives.html) | 第 46 章课程设计资料，用于学习目标、评估与教学策略对齐，以及可观察、可测学习目标的背景；不把页面写成本书唯一课程方法或学习效果证明。 | 2026-07-17 已重读大学教学中心页面；课程设计变化时重查 |
| REF-147 | [Schema.org：LearningResource](https://schema.org/LearningResource) | 第 46 章学习资源元数据资料，用于 `teaches`、`assesses`、`competencyRequired`、`educationalLevel`、`learningResourceType` 等属性的候选背景；不把开发版类型写成强制 Schema、互操作保证或本仓库已实现的元数据。 | 2026-07-17 已重读开发版页面并记录其 new-area 状态；采用前重查 |

## 正式章节引用登记模板

| ID | 章节 | 具体来源 | 支持的陈述 | 来源类型 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- | --- | --- |
| TODO | `NN` | URL、论文 DOI 或文档章节 | 需支持的可归因事实 | 官方文档、论文或仓库 | `YYYY-MM-DD` | 待核验 |

## 第 1 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-001 | 01 | Harness 作为围绕基础模型、协调执行、工具、上下文、工件和评估的工作性描述。 | 2026-07-15 | 已核验原文。 |
| REF-002 | 01 | Prompt Engineering 作为不更新模型权重时通过输入引导语言模型行为的背景定义。 | 2026-07-15 | 已核验原文。 |
| REF-003 | 01 | Agent 系统概览中的规划、记忆和工具使用背景。 | 2026-07-15 | 已核验原文；正文按需使用。 |
| REF-004 | 01 | 交错推理轨迹与任务动作的研究背景。 | 2026-07-15 | 已核验摘要页；正文按需使用。 |

## 第 2 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- |
| REF-001 | 02 | Harness 围绕基础模型协调执行，并涉及规划、工具、上下文、工件和评估的作者工作描述。 | 2026-07-15 | 已核验原文。 |
| REF-003 | 02 | 规划、记忆和工具使用的 LLM Agent 系统概览。 | 2026-07-15 | 已核验原文；仅作一种概览。 |
| REF-004 | 02 | 交错推理轨迹与任务动作、行动连接外部来源或环境，以及推理轨迹跟踪、更新行动计划和处理例外的研究背景。 | 2026-07-15 | 已增补复核摘要页；不使用性能数据，也不将本书诊断框架归因给论文。 |

## 第 3 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- |
| REF-005 | 03 | Codex 使用 `AGENTS.md` 承载项目指令，并按全局与项目目录层级发现、组合指导。 | 2026-07-15 | 已核验当日 Codex 官方手册；正式正文前需重查动态行为。 |
| REF-006 | 03 | Claude Code 使用 `CLAUDE.md` 承载项目持久指令，且指令属于上下文而非强制配置。 | 2026-07-15 | 已核验官方文档；正式正文前需重查动态行为。 |
| REF-001 | 03 | Harness 与上下文、工件、评估相关的思想背景。 | 2026-07-15 | 已核验原文；目录模型是本书工程扩展。 |

## 第 4 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-007 | 04 | AI 风险管理与可信、负责任开发的背景；不作为 Agent 验收流程的现成处方。 | 2026-07-15 | 已核验 NIST 原始页面。 |
| REF-008 | 04 | 分层 Guardrails、工具风险与高风险人工升级的限定建议。 | 2026-07-15 | 已在正文写作当天核验官方页面；链接检查器的 HTTP 403 已按精确 URL 忽略。 |
| REF-009 | 04 | 小范围变更、评价、暂停与回滚的工程类比；不写成 Agent 专用方法。 | 2026-07-15 | 已核验 Google SRE 原始页面。 |
| REF-001 | 04 | Harness 与执行、上下文、工件和评估相关的思想背景。 | 2026-07-15 | 已核验原文；可靠性原则是本书工程扩展。 |

## 第 5 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-010 | 05 | OpenAI 公开 Model Spec 的权威链，以及生产模型未必完全反映该 Spec 的边界。 | 2026-07-15 | 已访问版本为 2025-10-27 的页面；不外推为通用层级。 |
| REF-005 | 05 | Codex 的 `AGENTS.md` 发现、组合与目录邻近覆盖行为。 | 2026-07-15 | 已重新访问官方手册；只适用于 Codex。 |
| REF-006 | 05 | Claude Code 的 `CLAUDE.md` 持久指令上下文和自动记忆区分。 | 2026-07-15 | 已重新访问官方文档；只适用于 Claude Code。 |
| REF-011 | 05 | Gemini API 的清晰具体指令、组件化和复杂 Schema structured output 建议。 | 2026-07-15 | 已访问 2026-06-10 更新页面；不保证跨产品行为。 |
| REF-012 | 05 | Gemini structured output 的 JSON 语法与业务语义验证边界。 | 2026-07-15 | 已访问 2026-07-07 更新页面；不外推 Schema 支持。 |
| REF-013 | 05 | Anthropic 的清晰明确指令、格式约束和标签分隔复杂 Prompt 建议。 | 2026-07-15 | 已访问官方页面；页面未显示稳定发布日期。 |
| REF-014 | 05 | OpenAI API 关于 Prompt 行为可在模型快照间变化、固定版本和 evals 的建议。 | 2026-07-15 | 已访问官方页面；不保证稳定输出。 |

## 第 6 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- |
| REF-015 | 06 | Anthropic 对 Context Engineering、有限上下文、高信号选择、按需加载与循环整理的限定工程观点。 | 2026-07-15 | 已访问官方工程文章；不作为通用性能或安全保证。 |
| REF-016 | 06 | OpenAI Agents SDK 对本地代码 context、模型可见 context 与向模型提供信息方式的限定区别。 | 2026-07-15 | 已访问官方 SDK 文档；只适用于该 SDK。 |
| REF-017 | 06 | OpenAI Agents SDK 对客户端与服务端跨轮状态承载和无协调混用可能重复上下文的限定说明。 | 2026-07-15 | 已访问官方 SDK 文档；正文当天需重查。 |
| REF-018 | 06 | Gemini API 对无用 token、查询位置和 context caching 的产品限定建议。 | 2026-07-15 | 已访问官方文档；不写入动态阈值、成本或性能承诺。 |
| REF-019 | 06 | Anthropic 对切块检索可能丢失必要上下文的工程背景。 | 2026-07-15 | 已访问官方工程文章；不复刻方法、指标或成本主张。 |

## 第 7 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-006 | 07 | Claude Code 的新会话、`CLAUDE.md`、auto memory 与“上下文而非强制配置”的限定区别。 | 2026-07-15 | 已重新访问官方文档；只适用于 Claude Code。 |
| REF-020 | 07 | OpenAI Agents SDK 中特定 Session 的跨 run 消息历史、运行前读取、运行后写入及与服务端延续机制不可叠加的限定说明。 | 2026-07-15 | 已访问官方 SDK 文档；正文当天重查接口与默认值。 |
| REF-021 | 07 | OpenAI Agents SDK sandbox memory 与 Session 消息历史的区别、run 间经验文件、渐进读取、过时风险与 beta 边界。 | 2026-07-15 | 已访问官方 SDK 文档；只适用于 sandbox-agent beta。 |
| REF-022 | 07 | LangChain/LangGraph 的 thread-scoped 短期记忆、跨 thread 长期数据、namespace 与同步/后台写入取舍。 | 2026-07-15 | 已访问官方文档；不作统一术语标准。 |
| REF-023 | 07 | MemGPT 的分层记忆、有限上下文与控制流研究背景。 | 2026-07-15 | 已核验 arXiv v2 摘要；不使用性能结果。 |

## 第 8 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-024 | 08 | Agent Skills 的最小目录、必填元数据、可选资源、渐进加载与实验性 `allowed-tools` 声明。 | 2026-07-15 | 已核验规范；不作为跨产品实现或授权证明。 |
| REF-025 | 08 | Claude Code 的 Skill 入口、按需正文加载、目录位置与产品特有发现/优先级。 | 2026-07-15 | 已核验官方文档；只适用于 Claude Code。 |
| REF-026 | 08 | ChatGPT 的可复用 Skill、支持资源、上传扫描与工作区管理边界。 | 2026-07-15 | 已核验官方帮助页；扫描不替代人工或组织审查。 |
| REF-027 | 08 | OpenAI Plugin 打包 Skills、Apps 与 App templates，以及 App 和源系统权限仍适用。 | 2026-07-15 | 已核验官方帮助页；不外推 Plugin 结构。 |

## 第 9 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-028 | 09 | Plan-and-Solve 的“先计划、再将整体问题划分为子任务并求解”的研究方法。 | 2026-07-15 | 已在正文写作日重读 ACL 原始论文页面；不使用性能数字。 |
| REF-004 | 09 | ReAct 的交错推理/行动与推理轨迹跟踪、更新计划和处理例外的研究背景。 | 2026-07-15 | 已在正文写作日重读 arXiv 原始论文；不将本书 Plan Brief 归因给论文。 |
| REF-029 | 09 | Anthropic 对预定义 workflow、动态 agent 与复杂度取舍的限定工程建议。 | 2026-07-15 | 已在正文写作日重读官方工程文章；不作为行业标准。 |
| REF-030 | 09 | OpenAI Agents SDK 的 LLM 决策与代码编排区别，以及分类、串联、评估循环和独立任务并行的 SDK 限定示例。 | 2026-07-15 | 已在正文写作日与 Fact Check 阶段重读官方文档；动态行为未来更新当天仍需重查。 |

## 第 10 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-031 | 10 | AWS Step Functions 中工作流、状态、执行、输入输出、错误处理和 redrive 的产品特有概念。 | 2026-07-16 | 已在 Fact Check 重读官方文档；不外推为通用协议。 |
| REF-032 | 10 | AWS Step Functions 中 Retry、Catch、错误输出和 redrive 的产品特有错误处理行为。 | 2026-07-16 | 已在 Fact Check 重读官方文档；不外推固定顺序、参数或保证。 |
| REF-033 | 10 | LangGraph 的 thread、checkpoint、恢复、人工中断、历史和 replay 范围。 | 2026-07-16 | 已在 Fact Check 重读官方文档；不外推存储、版本或安全行为。 |
| REF-034 | 10 | LangGraph 对持久化任务结果、重入和副作用幂等性的限定建议。 | 2026-07-16 | 已在 Fact Check 重读官方文档；不外推 exactly-once。 |
| REF-035 | 10 | Temporal 实现中的追加式历史、确定性 Workflow 代码和 Activity 幂等/非重试边界。 | 2026-07-16 | 已在 Fact Check 重读官方仓库文档；不作为通用实现处方。 |

## 第 11 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-036 | 11 | MCP Tools 草案中的发现、调用、Schema、结果错误与协议异常，以及 Schema Reference（2025-11-25）中 Tool Annotations 的不可信提示边界。 | 2026-07-16 | 已在 Fact Check 重读；草案/版本状态与字段后续阶段重查。 |
| REF-037 | 11 | OpenAI Function Calling 的应用侧执行、结果回传和调用关联标识。 | 2026-07-16 | 已在 Fact Check 重读；只适用于该产品文档。 |
| REF-038 | 11 | Anthropic 客户端工具的名称、说明、输入 Schema、有效样例和工具选择选项。 | 2026-07-16 | 已在 Fact Check 重读；只适用于该产品文档。 |
| REF-039 | 11 | JSON Schema Core、Validation 和纯验证 dialect 的规范定位。 | 2026-07-16 | 已在 Fact Check 重读；不外推为业务或权限验证。 |

## 第 12 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-040 | 12 | GPT-5.2-Codex 产品语境中的云端隔离、网络、工作区与非沙箱命令批准边界。 | 2026-07-16 | 已在 Fact Check 重读；不外推为本书实现。 |
| REF-041 | 12 | Docker 容器安全语境中的 namespace、cgroup、capability 与收紧能力建议。 | 2026-07-16 | 已在 Fact Check 重读；不把容器写为绝对隔离。 |
| REF-042 | 12 | Kubernetes RoleBinding 的 namespace 作用范围与引用 Role/ClusterRole 的限定例子。 | 2026-07-16 | 已在 Fact Check 重读；不外推通用 RBAC 规则。 |
| REF-043 | 12 | GitHub Actions workflow/job 层 `GITHUB_TOKEN` 权限和未声明范围为 `none` 的产品语义。 | 2026-07-16 | 已在 Fact Check 重读；动态行为后续阶段重查。 |
| REF-044 | 12 | GitHub Actions 默认限制 token、按 job 增加最小必要访问的安全建议。 | 2026-07-16 | 已在 Fact Check 重读；不作为完整风险控制。 |

## 第 13 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-045 | 13 | RAG 的参数化/可检索非参数记忆背景及 provenance、知识更新问题。 | 2026-07-16 | 已在 Fact Check 重读；不保证任意检索结果可归因。 |
| REF-046 | 13 | 切分边界影响语境，以及语义与词法信号可分开考虑的工程背景。 | 2026-07-16 | 已在 Fact Check 重读；不使用其性能或成本结论。 |
| REF-047 | 13 | OpenAI Vector Stores 的切块、查询、结果内容与文件属性产品接口例子。 | 2026-07-16 | 已在 Fact Check 重读；动态接口后续阶段重查。 |

## 第 14 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-048 | 14 | NIST AI RMF 人类角色、责任和监督的自愿风险管理背景。 | 2026-07-16 | 已在 Fact Check 重读；不写成固定审批流程。 |
| REF-049 | 14 | NIST AI RMF Core 对角色责任与人类监督过程的定义、评估和记录结果项。 | 2026-07-16 | 已在 Fact Check 重读；字段是本书工程扩展。 |
| REF-050 | 14 | OpenAI Agents SDK Python 对敏感工具调用暂停、批准/拒绝和恢复的限定流程。 | 2026-07-16 | 已在 Fact Check 重读；只适用于该 SDK。 |
| REF-051 | 14 | OpenAI 工程指南中失败阈值、高风险、敏感或不可逆动作的人工介入触发例子。 | 2026-07-16 | 已在 Fact Check 重读；动态网页后续阶段重查。 |
| REF-052 | 14 | Regulation (EU) 2024/1689 第 14 条的高风险 AI 系统人类监督法规语境。 | 2026-07-16 | 已在 Fact Check 重读；不构成法律意见。 |

## 第 15 至 17 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-053 至 REF-056 | 15 | 可观察信号、追踪关联和 Playwright actionability/assertion 的限定背景。 | 2026-07-16 | 已在 Fact Check 重读；本书快照模型不外推为产品实现。 |
| REF-057 至 REF-060 | 16 | 语言反馈、迭代精炼、复盘记录和 evaluator-optimizer 的限定研究/工程背景。 | 2026-07-16 | 已在 Fact Check 重读；反思候选与经验准入是本书模型。 |
| REF-061 至 REF-064 | 17 | Agent 评估、风险测量、可靠性背景和 LLM-as-a-judge 偏差的限定资料。 | 2026-07-16 | 已在 Fact Check 重读；质量门不是认证或产品评估平台。 |

## 第 18 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-065 | 18 | HTTP 幂等方法在通信失败时受限自动重试，以及非幂等请求的限制。 | 2026-07-16 | 已在 Fact Check 重读；仅限 HTTP 语境。 |
| REF-066 | 18 | 重试放大风险、退避、上限、预算、单层控制和错误分类的 SRE 工程背景。 | 2026-07-16 | 已在 Fact Check 重读；不设本书默认参数。 |
| REF-067 | 18 | 补偿的进度、可失败性、幂等、关联、审计和人工介入边界。 | 2026-07-16 | 已在 Fact Check 重读；不构成通用回滚保证。 |

## 第 19 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-068 | 19 | 长任务的 token 策展、compaction、结构化笔记和按需恢复的限定工程讨论。 | 2026-07-16 | 已在 Fact Check 重读；不外推平台行为。 |
| REF-023 | 19 | 分层记忆与有限上下文之间数据移动的研究背景。 | 2026-07-16 | 已在本章 Fact Check 重读 arXiv v2；不外推研究原型实现。 |
| REF-069 | 19 | 相关信息位置影响所测长上下文实验表现的限定背景。 | 2026-07-16 | 已在 Fact Check 重读；不使用固定性能结论。 |

## 第 20 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-001 | 20 | Harness 与提出、评估、接受的自改进研究组织背景。 | 2026-07-16 | 已在本章 Fact Check 重读；不推导本书已实现自改进。 |
| REF-009 | 20 | 小范围、限时变更、可归因监控和回滚成本的 Canary 工程类比。 | 2026-07-16 | 已在本章 Fact Check 重读；不作为 Agent 发布算法。 |
| REF-070 | 20 | 持续风险管理、角色责任、监控、恢复和变更管理的 NIST 背景。 | 2026-07-16 | 已在 Fact Check 重读；不构成合规或固定协议。 |
| REF-071 | 20 | 变更追踪、所有权、渐进应用和回滚能力的配置工程背景。 | 2026-07-16 | 已在 Fact Check 重读；不作为充分安全证明。 |

## 第 21 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-072 | 21 | Codex 的 AGENTS.md 仓库指导、层级、相邻指导优先和短入口建议。 | 2026-07-16 | 仅限官方手册语境；不证明实际加载或强制执行。 |
| REF-073 | 21 | 受信任项目与项目配置、项目 hooks、项目 rules 加载的限定边界。 | 2026-07-16 | 不表示本仓库配置、受信任或获授权。 |
| REF-074 | 21 | Claude Code 的 CLAUDE.md 上下文、目录层级、AGENTS.md import 与技术控制分层。 | 2026-07-16 | 不证明真实会话、配置、权限或 hook 行为。 |

## 第 22 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-075 | 22 | Codex 的 AGENTS.md 作为仓库指导、层级与短入口建议。 | 2026-07-16 | 仅限官方手册；不外推产品行为或技术控制。 |
| REF-076 | 22 | Claude Code 的 CLAUDE.md 持久上下文、非强制配置和 AGENTS.md import。 | 2026-07-16 | 仅限官方文档；不保证版本、平台或加载结果。 |

## 第 23 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-077 | 23 | Codex Skill 的工件、激活与渐进加载。 | 2026-07-16 | 仅限 Codex 当前官方资料；不授予权限。 |
| REF-078 | 23 | Codex Hook 的事件、并发匹配和信任边界。 | 2026-07-16 | 不推导顺序、安全、权限或跨产品行为。 |
| REF-079 | 23 | Codex Plugin 的 manifest 与可分发组件。 | 2026-07-16 | 不证明安装、启用、信任或权限。 |

## 第 24 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-036 | 24 | MCP Tools 的发现、调用、schema、结果/错误与 annotations 的限定协议背景。 | 2026-07-16 | 仅限当前规范资料；不外推具体实现、权限或结果语义。 |
| REF-086 | 24 | MCP 本地 Server、OAuth URL、SSRF、scope、同意与传输的风险及缓解方向。 | 2026-07-16 | 仅作安全背景；不证明本章或部署已实施防护。 |

## 第 25 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-080 | 25 | WebDriver 是远程控制用户代理的、平台与语言无关的协议背景。 | 2026-07-16 | 仅限 W3C 规范；不外推为 Agent 或验收模型。 |
| REF-081 | 25 | Playwright 动作的 actionability 检查与超时失败边界。 | 2026-07-16 | 仅限 Playwright；不证明业务成功。 |
| REF-082 | 25 | Playwright Web-first 异步断言会反复检查目标直至满足或超时。 | 2026-07-16 | 仅限所声明条件；不替代完整 E2E 验收。 |
| REF-083 | 25 | Playwright 对定位器的可见属性/测试契约建议与动作时当前 DOM 定位。 | 2026-07-16 | 仅限产品资料；不保证定位正确。 |
| REF-084 | 25 | CDP 的 domain、command、event 组织与版本漂移边界。 | 2026-07-16 | 仅限 Chromium 协议；不作跨浏览器或授权结论。 |

## 第 26 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-030 | 26 | OpenAI Agents SDK 对由 LLM 决策、代码编排、manager、handoff 与独立任务并行的限定说明。 | 2026-07-16 | 仅限该 Python SDK；不证明实际隔离、并发安全、权限或恢复。 |
| REF-085 | 26 | OpenAI Agents SDK handoff 的指定 Agent、输入 schema/input filter 与单次 run 边界。 | 2026-07-16 | 不外推为本书交付包、跨会话交接或消息协议。 |
| REF-001 | 26 | Harness 协调 prompts、tool calls、subagents、control flow、memory 与 workflow logic 的作者问题背景。 | 2026-07-16 | Task Contract、Ownership Claim 与 Integration Gate 是本书工程模型。 |

## 第 27 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-087 | 27 | Git worktree 的多个附着工作树、分支检出及共享/区分数据。 | 2026-07-16 | 仅限 Git 参考；不证明隔离、安全或无冲突。 |
| REF-088 | 27 | Git diff 比较对象及默认和 `--cached` 的限定区别。 | 2026-07-16 | 不把 diff 写成语义、测试、审查或可合并证明。 |
| REF-089 | 27 | GitHub PR review 状态与阻断效果依赖规则的限定背景。 | 2026-07-16 | 不推断本仓库或其他仓库的审查规则、权限和结果。 |

## 第 28 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-001 | 28 | Harness 围绕基础模型组织执行、工具、上下文、工件和评估的工作性背景。 | 2026-07-16 | 最小 Harness 字段和教学示例是本书工程模型。 |
| REF-090 | 28 | Node `node:test` 与 `node --test` 的限定测试运行器背景。 | 2026-07-16 | 实际测试结果以命令输出为准，不由文档替代。 |
| REF-091 | 28 | NIST AI RMF Core 的自愿、场景化和非固定顺序提醒。 | 2026-07-16 | 不构成最小 Harness 的合规或安全结论。 |

## 第 29 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-029 | 29 | Anthropic 对 workflow 与 Agent 的限定区分，以及环境反馈、停止条件、测试和人类审查的工程建议。 | 2026-07-16 | 仅限该工程文章；六类交付工件和案例是本书模型。 |
| REF-088 | 29 | Git `git diff` 对不同对象之间变化的比较语义。 | 2026-07-16 | 不把比较工件写成真实执行、测试、审查或合并证明。 |
| REF-089 | 29 | GitHub PR review 的 Comment、Approve、Request changes 状态与合并前协作语境。 | 2026-07-16 | 仅限 GitHub；不推断任何真实 PR、权限、规则或合并结果。 |
| REF-090 | 29 | Node `node:test` 与 `node --test` 的限定测试运行器背景。 | 2026-07-16 | 实际测试结果以本地命令输出为准。 |

## 第 30 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-092 | 30 | Flutter 将自动测试区分为 unit、widget 与 integration，并限定其逻辑、单 widget、完整应用或大部分应用的测试范围。 | 2026-07-16 | 仅限 Flutter 文档；不证明项目测试执行或质量。 |
| REF-093 | 30 | Flutter 表单示例使用带 `GlobalKey` 的 `Form` 与 `validate()` 检查输入。 | 2026-07-16 | 仅限示例机制；不推断认证、账号、密码或网络行为。 |
| REF-094 | 30 | Flutter 集成测试文档中的 `integration_test`、`WidgetTester`、绑定初始化与设备/模拟器运行语境。 | 2026-07-16 | 仅限文档所述流程；不证明本章已运行任何环境。 |
| REF-090 | 30 | Node `node:test` 与 `node --test` 的限定测试运行器背景。 | 2026-07-16 | 实际 Node 结果以本地命令输出为准，不由文档替代。 |

## 第 31 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-095 | 31 | pytest fixture 的请求、共享范围与 setup/teardown 语境。 | 2026-07-16 | 仅限 pytest 文档；不把 fixture 视作真实服务或浏览器隔离证明。 |
| REF-096 | 31 | pytest `monkeypatch` 对测试替身的安全修改及请求方结束后的撤销。 | 2026-07-16 | 不把替身等同真实网络、数据库或配置。 |
| REF-097 | 31 | Playwright Browser Context 的每测试 clean-slate 隔离、独立存储与 cookies 语境。 | 2026-07-16 | 仅限 Playwright；不证明任何环境或用户流程。 |
| REF-083 | 31 | Playwright 对用户可见属性／显式测试契约定位与动作时当前 DOM 定位的建议。 | 2026-07-16 | 复用第 25 章资料；不保证定位或业务语义正确。 |
| REF-082 | 31 | Playwright Web-first 异步断言重试至满足或超时的限定行为。 | 2026-07-16 | 复用第 25 章资料；不替代完整用户流程或外部效果验证。 |

## 第 32 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-098 | 32 | Delta Debugging 对失败样例最小化以及通过／失败样例差异隔离的研究语境。 | 2026-07-16 | 原始论文；不外推自动最小化、根因证明、案例成本或成功率。 |
| REF-099 | 32 | Google SRE 对观察、候选原因、支持／反证检查、受控改变、问题报告和调查笔记的排障语境。 | 2026-07-16 | 仅限工程书；不作为固定流程、权限或严重性标准。 |
| REF-100 | 32 | Git `bisect` 以 good/bad 提交为边界、在历史中点测试并报告第一个 bad 提交的 Git 特定行为。 | 2026-07-16 | 不将二分结果外推为根因、工作树许可或无历史的调查方法。 |
| REF-081 | 32 | Playwright locator 动作的 actionability 条件与自动重试断言语境。 | 2026-07-16 | 复用第 25 章资料；不作为通用等待或业务／发布结论。 |

## 第 33 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-101 | 33 | Obsidian vault 的 Markdown 纯文本、本地文件夹与外部变化刷新。 | 2026-07-16 | 仅限产品资料；不证明访问权、冲突处理或 vault 已打开。 |
| REF-102 | 33 | Obsidian 顶部 YAML Properties 的结构化数据与同名类型语境。 | 2026-07-16 | 不把本书字段写成强制 schema 或内容正确性保证。 |
| REF-103 | 33 | Obsidian Wikilink／Markdown 内部链接及 vault 内重命名更新。 | 2026-07-16 | 不保证跨工具兼容或链接语义正确。 |
| REF-104 | 33 | Obsidian 标签、YAML 列表和嵌套标签筛选。 | 2026-07-16 | 标签不是目录、权限或事实核验。 |
| REF-105 | 33 | Obsidian Sync 的私有跨设备同步与备份防冲突提醒。 | 2026-07-16 | 不证明本仓已启用、备份或可自动合并。 |

## 第 34 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-024 | 34 | Agent Skills 的最小目录、frontmatter 与渐进加载规范背景。 | 2026-07-16 | 复用第 8 章规范；格式不等于团队治理。 |
| REF-106 | 34 | Codex 的 Skill 发现范围、触发描述与直接 Skill／plugin 区别。 | 2026-07-16 | 仅限 Codex 当前文档；不外推其他产品。 |
| REF-107 | 34 | Anthropic Agent Skills 的目录、产品表面和未知来源审计边界。 | 2026-07-16 | 不保证跨表面同步或集中管理。 |
| REF-108 | 34 | 企业 Skill 的风险审查、评估、所有者、版本与弃用建议。 | 2026-07-16 | 不作为合规标准或自动能力保证。 |
| REF-109 | 34 | SemVer 的 public API 和主／次／补丁版本语义。 | 2026-07-16 | 仅作受限类比；不保证自然语言 Skill 兼容。 |

## 第 35 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-110 | 35 | NIST 零信任的资源级判断与会话前认证／授权背景。 | 2026-07-16 | 不证明部署、合规或具体控制。 |
| REF-111 | 35 | Kubernetes 共享集群多租户的安全、公平性和资源竞争语境。 | 2026-07-16 | Kubernetes 不是本书必选运行时或充分隔离。 |
| REF-112 | 35 | OPA 将策略与服务解耦、服务查询策略和数据的背景。 | 2026-07-16 | 不证明策略正确、安全或已部署。 |
| REF-113 | 35 | OpenTelemetry trace、span 与上下文关联的背景。 | 2026-07-16 | trace 不是审计、日志或数据采集证明。 |

## 第 36 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-029 | 36 | workflow／agent 区分及常见组合结构的工程建议。 | 2026-07-16 | 复用第 9、29 章资料；不作为模式标准或性能结论。 |
| REF-030 | 36 | OpenAI Agents SDK 中代码编排、handoff、循环和独立任务并行的限定例子。 | 2026-07-16 | 仅限该 SDK；不证明并发安全。 |
| REF-031 | 36 | AWS Step Functions 的事件驱动状态机和流控制状态背景。 | 2026-07-16 | 仅限产品文档；不成为通用协议。 |
| REF-114 | 36 | CloudEvents 的 event、producer、consumer 与 intermediary 规范背景。 | 2026-07-16 | 不证明投递、重试、授权或事件总线。 |
| REF-115 | 36 | Node.js EventEmitter 的命名事件及同步监听器顺序。 | 2026-07-16 | 仅限 Node.js；不外推其他事件系统。 |
| REF-116 | 42 | 在线 A/B 分析的随机化单位、统计假设和复杂分配风险。 | 2026-07-17 | 不提供 Agent 通用实验算法、阈值或样本量。 |
| REF-117 | 39 | 任务特定、贴近真实分布、持续评估与人工校准建议。 | 2026-07-17 | 不证明评分器可靠或平台长期行为。 |
| REF-118 | 39 | Benchmark 构念效度与通用进步替代指标的风险讨论。 | 2026-07-17 | 不推出所有 Benchmark 无效。 |
| REF-119 | 39 | 场景/指标空间、多指标评估和透明度设计背景。 | 2026-07-17 | 不外推 HELM 数值或默认指标。 |
| REF-120 | 40 | 延迟路径分解与顺序/并行取舍的产品工程背景。 | 2026-07-17 | 不复用动态数值或跨供应商性能。 |
| REF-121 | 40 | Prompt 前缀缓存和用量观察的产品特定语境。 | 2026-07-17 | 不保证阈值、价格、保留期或他厂行为。 |
| REF-122 | 40 | 发送前 Token 估算及估算与实际使用量差异。 | 2026-07-17 | 不推出计费、窗口或精度保证。 |
| REF-123 | 40 | 非即时任务的异步批处理与结果取回语境。 | 2026-07-17 | 不登记动态折扣、窗口、限额或性能。 |
| REF-124 | 40 | 正式价格的动态核验入口。 | 2026-07-17 | 不把当前价格写成长期事实。 |
| REF-125 | 41 | 提示注入、不可信内容与纵深防御背景。 | 2026-07-17 | 单一控制不能证明风险消除。 |
| REF-126 | 41 | NIST AC-6 最小权限与 AU-3 审计字段背景。 | 2026-07-17 | 不证明实施、评估或合规。 |
| REF-127 | 41 | 秘密生命周期、访问审计和事件响应背景。 | 2026-07-17 | 不规定周期、产品或运行状态。 |
| REF-128 | 41 | 安全日志字段、敏感数据排除和日志防护背景。 | 2026-07-17 | 不推出固定 schema、留存期或合规。 |
| REF-129 | 41 | 软件供应链完整性威胁及 SLSA 覆盖边界。 | 2026-07-17 | 不证明安全或 provenance 已实施。 |
| REF-130 | 41 | 事件响应连接准备、检测、响应和恢复的框架背景。 | 2026-07-17 | 不规定本书固定步骤、角色或时限。 |

## 第 43 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-131 | 43 | Docs as Code 对版本控制、问题跟踪、代码审查和自动化测试的社区实践背景。 | 2026-07-17 | 不证明内容正确、流程充分或适合所有团队。 |
| REF-132 | 43 | Diátaxis 对教程、操作指南、参考和解释四类读者需求的内容设计背景。 | 2026-07-17 | 不作为本书固定目录或完整质量标准。 |
| REF-133 | 43 | 可复现构建对相同来源、环境和指令产生逐位一致工件的定义。 | 2026-07-17 | 不证明本书 PDF/EPUB 已可复现或跨平台一致。 |
| REF-117 | 43 | 任务特定、贴近真实分布、持续评估与人工校准建议。 | 2026-07-17 | 复用第 39 章资料；不证明内容评分器可靠。 |
| REF-109 | 43 | public API 与已发布版本不可原地修改的规范背景。 | 2026-07-17 | 复用第 34/42 章资料；只作发布身份类比。 |

## 第 44 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-029 | 44 | workflow／agent 区分及 prompt chaining、parallelization、orchestrator-workers、evaluator-optimizer 的限定模式背景。 | 2026-07-17 | 复用第 9、29、36、38 章资料；不规定本章角色、状态机、循环次数或质量保证。 |
| REF-134 | 44 | Investigation、Validation、Writing 与 Supervision 等贡献责任及 CRediT 不决定 authorship 的背景。 | 2026-07-17 | 不把贡献角色写成 Agent 协议、权限或作者身份。 |
| REF-061 | 44 | task、trial、grader、transcript、outcome、evaluation harness 与 agent harness 的文章内区分。 | 2026-07-17 | 复用第 17 章资料；不证明评分器可靠或章节事实正确。 |
| REF-135 | 44 | Entity、Activity、Agent 及生成、使用、派生、归属、关联等 provenance 概念。 | 2026-07-17 | 不证明本书证据包兼容 PROV 或来源、事实、责任充分。 |
| REF-136 | 44 | 学术出版语境中的人类作者身份、生成式 AI 使用披露与作者责任背景。 | 2026-07-17 | 不外推所有图书、合同、司法辖区、版权或法律结论。 |

## 第 45 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-140 | 45 | Codex `AGENTS.md` 的仓库指导、命令、约束、完成定义和层级语境。 | 2026-07-17 | 仅限当前 Codex Manual；不保证遵守或跨工具兼容。 |
| REF-141 | 45 | Codex subagent 并行独立任务与主线程收集结果的产品语境。 | 2026-07-17 | 不证明拆分正确、文件隔离或跨会话持久。 |
| REF-142 | 45 | Claude Code `CLAUDE.md`、规则与 auto memory 的产品特定入口。 | 2026-07-17 | 不外推 Codex 行为或项目状态同步。 |
| REF-143 | 45 | Claude Code 会话恢复、worktree 并行和研究委派的工作流入口。 | 2026-07-17 | 不等同完整交接、无冲突并行或永久存档。 |
| REF-144 | 45 | Claude Code subagent 独立上下文、受限工具/权限和摘要返回。 | 2026-07-17 | 不证明跨会话协作、共享状态一致或自动集成。 |

## 第 46 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-132 | 46 | 教程、操作指南、参考和解释服务不同读者需求的内容设计背景。 | 2026-07-17 | 复用第 43 章资料；不规定派生物结构、学习路径或质量保证。 |
| REF-145 | 46 | DITA 中 topic-oriented、information-typed、可复用和 single-source 内容的标准语境。 | 2026-07-17 | 不要求采用 XML、DITA 工具、specialization 或其信息架构。 |
| REF-146 | 46 | 学习目标、评估与教学策略对齐，以及可观察、可测目标的课程设计背景。 | 2026-07-17 | 不作为唯一课程方法或学习效果证明。 |
| REF-147 | 46 | LearningResource 的教学、评估、前置能力、层级和资源类型元数据候选。 | 2026-07-17 | 开发版 new-area 类型；不作为强制 Schema 或互操作保证。 |
| REF-135 | 46 | Entity、Activity、Agent 与 derivation 等 provenance 概念。 | 2026-07-17 | 复用第 44 章资料；不证明派生链完整、事实同步或责任充分。 |

## 第 47 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-014 | 47 | 模型 Prompt 行为可能在快照间变化，固定模型版本并运行 evals 的产品特定建议。 | 2026-07-17 | 已重读当前 API Overview；不保证固定版本输出确定或其他供应商行为。 |
| REF-029 | 47 | 从最简单方案开始、按需要增加复杂度，以及 workflow／agent 的文章内区分。 | 2026-07-17 | 已重读动态工程文章；不作为行业定义、未来预测或性能保证。 |
| REF-117 | 47 | 生成式系统可变、评估应围绕具体任务并持续更新和人工校准的当前指南。 | 2026-07-17 | 已重读动态页面及其平台停用提示；不依赖产品操作、固定阈值或跨供应商保证。 |
| REF-063 | 47 | NIST AI RMF 1.0 的自愿、跨生命周期、GOVERN/MAP/MEASURE/MANAGE 风险管理背景。 | 2026-07-17 | 已重读原始 NIST PDF；不构成认证、法规、固定门禁或产品质量结论。 |
| REF-125 | 47 | 直接/间接 Prompt Injection、不可信内容、工具越权和纵深防御背景。 | 2026-07-17 | 已重读动态 OWASP 页面；不证明单一控制能消除风险。 |
| REF-129 | 47 | 软件供应链从生产者、源码、构建、发布、分发到依赖的完整性威胁及 SLSA 覆盖边界。 | 2026-07-17 | 已按 v1.2 重读；不证明 SLSA 覆盖全部威胁或本书已实施 provenance。 |

## 第 37 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-020 | 37 | OpenAI Agents SDK session 的跨 run 历史读写及服务端延续边界。 | 2026-07-16 | 复用第 7 章资料；不等同长期项目记忆。 |
| REF-022 | 37 | LangChain 的 thread 内短期记忆、跨 session 长期数据与 namespace／key 语境。 | 2026-07-16 | 不保证权限、隔离、正确性或删除。 |
| REF-024 | 37 | Agent Skills 目录、frontmatter、指令和按需资源的规范背景。 | 2026-07-16 | 不外推发现、授权或安全。 |
| REF-025 | 37 | Claude Code 按需加载 Skill 与常驻项目指令的产品特定区别。 | 2026-07-16 | 不外推路径、优先级或调用行为。 |

## 第 38 章已分配引用

| ID | 章节 | 支持的陈述 | 访问日期 | 核验状态 |
| --- | --- | --- | --- | --- |
| REF-029 | 38 | evaluator-optimizer、环境证据、检查点与停止条件的工程建议。 | 2026-07-16 | 复用第 9、29、36 章资料；不成为默认流程。 |
| REF-062 | 38 | NIST AI RMF Core 的治理、评估、记录和独立审查风险管理背景。 | 2026-07-16 | 不导出固定审批门、阈值或组织责任。 |
| REF-063 | 38 | NIST AI RMF 1.0 的人机监督角色、记录和管理决策背景。 | 2026-07-16 | 不构成权限、合规或组织设计。 |
| REF-059 | 38 | Google SRE 复盘记录、行动项审查与无责学习语境。 | 2026-07-16 | 不外推事故流程或文化保证。 |

## 引用规则速记

- 观点不等于事实：写明“来源指出”或“本书扩展”。
- 产品能力、版本、价格与策略在写作当日以官方资料核验。
- 直接引文短且必要；长段引用、拼接改写和无来源数字一律拒绝。
