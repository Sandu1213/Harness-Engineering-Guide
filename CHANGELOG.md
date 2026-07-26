# Changelog

本项目采用 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 的结构记录面向读者和贡献者的变化。

## [Unreleased]

### Fixed

- 修复 Release 附件上传 Job 在未检出仓库时无法推断目标仓库的问题；上传命令现在显式使用当前 GitHub 仓库。

## [0.1.0] - 2026-07-26

### Added

- 新增 GitHub Pages 与 Release 自动化：`main` 更新后构建并部署带仓库子路径的 VitePress 站点；GitHub Release 发布后从对应标签提交生成、校验并上传 PDF 与 EPUB。Linux 发行构建配置为使用固定 Pandoc/Typst 版本和 Noto CJK 字体，不改变本地默认字体。
- 新增统一出版管线：以共享清单驱动 VitePress 网站、Typst PDF 与 EPUB 3；网站具备全文导航、本地搜索、读者首页和出版边界说明，PDF/EPUB 均包含 47 张章节主图。本地生产构建、浏览器点击链、PDF 渲染抽检和 EPUBCheck 已通过；尚未执行正式部署或版本发布。
- 完成全书内容生产候选：第 1 至 47 章均具备 Research、Outline、原创正文、Technical Review、Example、Diagram、Fact Check、Language Editing 与 Final Review；新增附录 A 至 L 及三组独立终审，47 组 Node.js 教学示例、47 组 Mermaid/SVG/PNG 与共享导航已统一收口。所有示例、图示和模板仍只证明书稿与注入对象，不代表真实外部系统、权限、审批、发布或业务效果。
- 完成第 24 至 28 章并行交付与主线程收口：新增 MCP 外部工具接入、浏览器 E2E 证据链、多 Agent 任务隔离、Git/worktree/代码审查与最小 Harness 的原创正文、研究/核验/审查工件、Mermaid 图与 47 项纯内存断言；登记 REF-086 至 REF-091，并复用 REF-001、REF-030、REF-036。所有示例、图示与质量门仍不代表真实 MCP、浏览器、Git、worktree、PR、CI、权限、工具或外部系统验证。
- 完成第 21 至 23 章并行交付与主线程收口：新增跨工具项目 Harness、仓库级规则、Skills/Hooks/Automation 的原创正文、研究/核验/审查工件、Mermaid 图与 22 项纯内存断言；登记 REF-072 至 REF-079，统一产品资料的动态复核边界。所有示例、图示与质量门仍不代表真实 Codex、Claude Code、Hook、CI、权限、工具或外部系统验证。
- 完成第 18 至 20 章并行交付与主线程收口：新增 Recovery Contract、Compaction Record、Candidate Change Protocol 的原创正文、研究/核验/审查工件、Mermaid 图与 32 项纯内存断言；登记 REF-065 至 REF-071，并复用 REF-001、REF-009 与 REF-023。第 19 章发布图改为纵向布局以保证节点可读；所有示例、图示与质量门仍不代表真实恢复、压缩、发布、监控或外部系统验证。
- 完成第 15 至 17 章并行交付与交叉审查收口：新增 Observation、Reflection 与 Evaluation 的原创正文、研究/核验/审查工件、Mermaid 图与 34 项纯内存断言；REF-053 至 REF-064、术语、npm 入口、目录与状态同步更新。修复无关快照推进误判、未知证据误拒绝、证据范围/新鲜度缺失与可选项静默接受；不把任何教学判断写成真实外部系统验证。
- 完成第 11 章 Final Review，并将第 11 至 14 章的并行交付统一收口：新增第 11 章终审记录，完成第 12 章目标范围准入断言、第 13 章 RAG 术语与正式引用映射、第 14 章批准证据状态断言；REF-040 至 REF-052、npm 入口、示例说明、出版导航与状态工件同步更新。所有示例仍是纯内存教学判断，不验证真实外部系统。
- 完成第 11 章 Diagram Review：新增工具调用准入与证据边界 Mermaid 图，导出白色背景、两倍缩放的 SVG/PNG，完成视觉检查和正文图源一致性比较；图只表达本书模型，不表示真实 Tool、MCP、SDK、权限、批准、外部目标、回读、验收或外部效果。
- 完成第 11 章 Fact Check：重读 MCP Tools 草案、版本化 Schema、OpenAI、Anthropic 与 JSON Schema 的一手资料，逐项记录允许陈述、外推禁区、动态复核条件与纯内存示例/图示边界。
- 完成第 11 章 Language Editing：收束候选—请求—结果—观察—验收的中文表达、图示替代描述与示例说明，未改变来源范围、示例接口或 Mermaid 语义。
- 完成第 11 章 Example Implementation：新增纯内存 `assessToolInvocation`、7 项 Node 内置测试、演示和红绿整合记录；示例只判断注入的教学对象，不调用真实 Tool、权限或外部系统。
- 完成第 11 章 Technical Review：重读 MCP Tools 草案、版本化 Schema、OpenAI、Anthropic 与 JSON Schema 资料，修正行为提示的版本化出处、应用侧校验的归因、Outline 状态与全局术语；图示、示例和真实工具运行时仍未实施。
- 完成第 11 章原创 First Draft：写作日重新限定 MCP 当前 Tools 草案、OpenAI Function Calling、Anthropic 工具定义与 JSON Schema 的来源范围，以工具描述、Schema 准入、调用关联、结果信封、错误层次、效果不确定性和书稿元数据教学案例组织正文；图示、示例、真实工具运行时与后续审查仍未实施。
- 完成第 11 章 Chapter Outline：以工具描述、调用请求、结果关联、错误层次、效果不确定性和书稿元数据教学案例组织逐节蓝图；未提前实现正文、图示、示例或真实工具运行时。
- 完成第 11 章 Research Brief 与候选资料：限定 MCP 当前 Tools 草案、OpenAI Function Calling、Anthropic 工具定义与 JSON Schema 的可用陈述；工具契约、调用记录、结果信封与效果不确定性均保持为本书模型，未提前实现正文或真实工具运行时。
- 完成第 10 章 Final Review：重跑 8 项纯内存测试、演示、Mermaid SVG/PNG 导出、PNG 视觉检查和正文图源一致性检查，并同步出版导航与项目状态；真实运行时、持久化、Tool、权限、批准、审计和外部效果仍未实现或验证。
- 完成第 10 章 Language Editing：统一术语首现、来源段落主语和图示导语，未扩大 REF-031 至 REF-035 的限定范围，也未改变示例接口或 Mermaid 语义。
- 完成第 10 章 Fact Check：重读 REF-031 至 REF-035，逐项登记 AWS Step Functions、LangGraph 与 Temporal 的限定陈述、外推禁区与动态复核条件，并重跑 8 项纯内存状态迁移测试与演示。
- 第 10 章新增可审查 Mermaid 状态图，已导出 SVG/PNG 并完成视觉检查；图只表达本书状态、证据和保守出口模型。
- 第 10 章新增纯内存 `assessWorkflowTransition` 示例、8 项 Node 内置测试、npm 运行入口与示例实现记录；示例只评估注入的工作流教学对象。
- 新增第 10 章 Research Brief 与候选参考资料：限定 AWS Step Functions、LangGraph 与 Temporal 的状态、错误处理、检查点、重入和幂等性陈述，并将 Workflow Contract、State Record、交接包、恢复与停止规则保留为本书工程模型。
- 新增第 10 章详细 Chapter Outline：以执行与尝试、状态迁移、Workflow Contract、State Record、Checkpoint、重入、错误路径、交接和章节生产案例组织可审查蓝图，并保持图示、示例和正文的未实施边界。
- 新增第 10 章原创 First Draft：写作日复核 REF-031 至 REF-035，以工作流定义/执行/尝试、状态记录与检查点、重入与幂等性、错误路径和章节生产交接案例组织正文；图示、示例和真实运行时仍明确未实施。

### Changed

- 完成第 10 章 Technical Review：重读 REF-031 至 REF-035，修正统一词表、全局引用登记与 Outline 阶段状态漂移；正文的产品/框架限定范围、工程模型、未实施图示与示例边界保持不变。
- 建立书籍工程骨架、项目上下文、AI 协作规则和 47 章规划。
- 建立 Markdown lint、链接检查和 GitHub Actions 基础校验。
- 完成 47 章 P0 目录依赖审查、第 1 章准备包和可运行最小 Harness 示例。
- 完成初始任务差距分析，修正进度状态语义，并把任务状态检查加入总校验。
- 新增第 1 章原创正文初稿，并在正文起草当天复核其四项候选来源。
- 新增第 2 章原创正文初稿、研究与核验工件，涵盖模型、Agent、Harness 与运行环境的责任边界和故障归因。
- 完成第 1 章 Technical Review，修正研究状态、示例路径与空指令边界的测试断言。
- 完成第 2 章 Technical Review，补充概念示例的假设与预期观察，并对齐全局引用登记。
- 完成第 1 章最小 Harness 示例整合，补齐运行前提、验收边界与实际执行记录。
- 完成第 2 章运行边界示例整合，以确定性内存 Runtime 区分候选拒绝、Runtime 拒绝、验证拒绝和验证接受，并补齐实际执行记录。
- 完成第 1 章 Mermaid 图示审查，新增 SVG/PNG 导出产物，且修正拒绝路径先记录证据再回写状态的图文一致性。
- 完成第 2 章 Mermaid 图示审查，新增 SVG/PNG 导出产物及正文替代描述，并确认四层责任与反馈闭环的图文一致性。
- 完成第 1 章正文级 Fact Check，重新核验四项来源和示例执行事实，并修正 ReAct 的可追溯版本日期。
- 完成第 2 章正文级 Fact Check，重新核验三项来源和运行边界示例执行事实，并保留教学模型与真实产品行为的边界。
- 完成第 1 章 Language Editing，收束提议、行动与验证的叙述，统一证据路径表述，且未扩大已核验事实范围。
- 完成第 2 章 Language Editing，收束四层责任、候选与观察的叙述，且未扩大已核验事实范围。
- 完成第 1 章 Final Review，修正 Outline 状态漂移，并重新验证示例、图示与完整 Markdown 工具链。
- 完成第 2 章 Final Review，修正 Outline 状态漂移，并重新验证运行边界示例、图示与完整 Markdown 工具链。
- 补强第 2 章的结论状态语义：区分未证实、候选拒绝、运行环境阻塞、验证拒绝与验证接受，明确记录缺失不能被叙述为成功或失败；未新增来源事实或改变示例、图示接口。
- 补强第 2 章的 Attempt Trace：用尝试标识与候选、决策、执行请求、观察、验证之间的最小关联关系支持可复查交接；该框架明确为本书工程模型，未改变示例或图示接口。
- 新增第 3 章 Research Brief 与候选参考资料，限定 Codex 和 Claude Code 的项目指令事实，并将仓库上下文目录模式标注为本书工程扩展。
- 新增第 3 章 Chapter Outline，以恢复性、目录职责、阅读顺序、状态冲突和跨会话交接组织可审查写作蓝图。
- 新增第 3 章事实核验清单，重新限定 Codex、Claude Code 与 Harness 来源陈述，并登记动态产品行为的正文当天复核要求。
- 新增第 3 章恢复工作流 Mermaid 图源与无副作用的上下文恢复预检示例计划；两者均明确不代表权限控制或已执行结果。
- 新增第 3 章原创正文初稿，说明仓库上下文的职责分层、产品指令边界、可恢复交接与状态冲突处理。
- 完成第 3 章 Technical Review，修正 Draft 校验状态与 Fact Check 历史范围的状态漂移，并保留示例和图示的未实现边界。
- 完成第 3 章纯内存上下文恢复预检示例，实现 5 条确定性路径并将其测试纳入总校验。
- 完成第 3 章 Mermaid 图示审查，新增 SVG/PNG 导出产物，并确认仓库上下文恢复工作流的图文一致性与非权限控制边界。
- 完成第 3 章 Language Editing，统一章节编号、交接术语、图示导语和初稿阶段验证记录，且未扩大已核验范围。
- 完成第 3 章 Final Review，修正示例说明与实际接口的字段漂移，并重新验证示例、Mermaid 图示和完整 Markdown 工具链。
- 新增第 4 章原创正文初稿，以可验证目标、状态与失败可见、最小权限、人工升级、渐进变更和受控配置修改案例组织可靠性工程原则。
- 完成第 4 章 Technical Review，重新限定来源范围，并修正第 11 章 stable slug、原则数量、Outline 阶段与项目上下文的状态漂移。
- 完成第 4 章纯内存受控配置修改示例：以 5 项 Node 内置测试覆盖受控成功、预检拒绝、验证失败、高风险升级和执行拒绝，并纳入总校验。
- 完成第 4 章 Mermaid 图示审查，新增 SVG/PNG 导出产物，修正预检节点的自动断词，并确认可靠性闭环的图文一致性。
- 完成第 4 章 Language Editing，收束任务判定、图文术语、示例阶段语义、渐进验证和总结表达，未扩大已核验范围。
- 完成第 4 章 Final Review，修正已实现示例仍标为“计划”的跨工件漂移，并重新验证示例、图示和 Markdown 工具链。
- 新增第 5 章 Research Brief 与候选参考资料，限定产品指令层级、项目指令文件、Prompt 清晰性、结构化输出和 Prompt 版本化建议的使用范围，并将指令分层标为本书工程扩展。
- 新增第 5 章详细 Chapter Outline，将 Prompt 碎片化、内容分类、产品指令边界、冲突装配、输出契约、回归检查和代码审查教学案例组织为可审查蓝图。
- 新增第 5 章事实核验清单与 Mermaid 装配图源，重新限定七项官方来源的可用陈述，并将装配、冲突、验证与升级流程保持为本书工程模型。
- 新增第 5 章纯内存指令装配示例计划，定义输入、输出、五条确定性测试路径、未来命令和无副作用边界，尚未实施或运行。
- 新增第 5 章原创正文初稿，说明指令分层、项目文件边界、冲突装配、输出契约、Prompt 回归与代码审查教学案例，并显式保留图示和示例的未完成状态。
- 完成第 5 章 Technical Review，修正 Outline 状态漂移、Mermaid 源与正文注释不一致，以及已使用引用仍标为候选的登记问题。
- 完成第 5 章纯内存指令装配示例：以 5 项 Node 内置测试覆盖正常装配、数据保留、范围冲突、输出契约缺失与未知冲突策略，并纳入总校验。
- 完成第 5 章 Mermaid 图示审查：新增 SVG/PNG 导出产物，确认组件装配、冲突、独立验证、交付、升级和反馈路径的图文一致性。
- 完成第 5 章 Language Editing：收束中文主语、因果、责任分层、渐进增强边界和阶段记录，未扩大已核验范围。
- 完成第 5 章 Final Review：重新验证示例、图示、正文 Mermaid 源一致性、链接与完整 Markdown 工具链，并确认状态工件一致。
- 新增第 6 章 Research Brief 与候选参考资料：限定 Context Engineering、本地与模型可见 context、跨轮状态、长上下文、缓存和检索切块的来源范围，并将 Context Packet 模型保留为本书工程扩展。
- 新增第 6 章详细 Chapter Outline：以资料选择、Context Brief、预算、按需加载、跨轮去重、刷新与污染诊断、测试失败案例组织可审查蓝图，并保持产品事实、教学案例与本书工程模型分层。
- 新增第 6 章事实核验清单：逐项限定五项一手来源的可用范围、外推禁区和正文当天复核要求，并将 Context Packet、预算、污染诊断与教学案例保留为原创工程模型。
- 新增第 6 章 Mermaid 图源：以候选资料、元数据检查、预算、按需引用、模型可见输入、观察、刷新与记录表现本书工程闭环；图源已通过语法渲染，尚未进行发布导出或视觉审查。
- 新增第 6 章原创正文初稿与纯内存示例计划：正文以 Context Brief、三面检查、预算、按需引用、跨轮状态、刷新诊断和失败测试案例组织原创叙述；示例仍未实现，图示仍未完成视觉审查。
- 完成第 6 章 Technical Review：核对来源限制、本书模型、相邻章节、图文一致性、示例阶段和验证记录，并修正初稿的验证状态与安全措辞漂移。
- 完成第 6 章纯内存示例与图示审查：`buildContextPacket` 的 5 项测试和演示已运行；Mermaid CLI 11.16.0 已导出 SVG/PNG 并完成视觉检查。
- 完成第 6 章 Language Editing 与 Final Review：统一术语首次出现，重新验证示例、图示、图源一致性、链接与完整工具链，并确认跨工件状态一致。
- 新增第 7 章 Research Brief 与候选参考资料：限定会话历史、sandbox memory、thread-scoped 状态、跨任务记录和分层记忆的来源范围，并将 Memory Record、写入/读取门槛和生命周期保留为本书工程模型。
- 新增第 7 章详细 Chapter Outline：以资料分类、工作与长期边界、Memory Record、写入/读取门槛、生命周期冲突和接手案例组织可审查蓝图，并保持来源事实、本书工程模型与教学案例分层。
- 新增第 7 章事实核验清单、Memory Record 生命周期 Mermaid 图源与纯内存示例计划；在该阶段，图源已完成语法渲染，尚未导出或视觉审查，示例尚未实施或运行。
- 新增第 7 章原创正文初稿：以会话历史、工作记忆、长期记录、Memory Record、写入/读取闸门、生命周期与接手案例组织叙述，并明确来源事实、本书模型、教学案例和未验证实现的边界。
- 新增第 7 章事实核验清单：逐项限定 Claude Code、OpenAI Agents SDK、LangChain/LangGraph 与 MemGPT 的记忆相关陈述、外推禁区和正文当天复核要求，并将 Memory Record 与教学案例保留为本书工程模型。
- 完成第 7 章纯内存 Memory Record 示例：`decideMemoryRecord` 以模块缺失建立红灯，再通过 6 项 Node 内置测试与演示验证分类契约；示例不访问真实记忆、文件、网络、模型、时钟、检索、权限或持久化系统。
- 完成第 7 章 Memory Record 生命周期图示审查：Mermaid CLI 11.16.0 导出 SVG/PNG 并查看 PNG；阻塞分支改为补证或人工裁决后重新检查，跨任务分支明确为长期候选。
- 完成第 7 章 Language Editing：统一作用范围、长期记忆与长期候选的术语，说明概念字段与 JavaScript 命名差异，并收束长句；未扩大来源或运行结论。
- 完成第 7 章 Final Review：重新运行纯内存示例、Mermaid SVG/PNG 渲染、视觉检查、图源一致性检查和全仓校验，确认正文、来源、示例、图示和状态工件一致。
- 新增第 8 章 Research Brief 与候选参考资料：限定 Agent Skills 规范、Claude Code、ChatGPT Skills 与 OpenAI Plugin 的可用陈述，并将 Skill Contract、生命周期、Markdown 审查案例和权限分层保留为本书工程模型。
- 新增第 8 章详细 Chapter Outline：以最小工件、渐进加载、Skill Contract、发现与前置检查、概念与权限边界、测试版本弃用和 Markdown 审查案例组织可审查蓝图。
- 新增第 8 章原创 First Draft：以重复 Prompt 的维护缺口、Skill Contract、选择、权限边界、测试版本弃用和只读 Markdown 审查案例组织正文，并将动态产品事实、本书模型与未实施工件分开。
- 完成第 8 章 Technical Review：重新核对一手来源、产品范围、权限边界、计划工件状态与相邻章节责任，并修正技能契约（Skill Contract）的首次术语呈现。
- 完成第 8 章纯内存 Example Implementation：新增 `evaluateSkillSelection`、6 项 Node 内置测试、演示与示例实现记录；模块只判断注入的 Contract、任务、前置条件和证据，不访问真实外部系统。
- 完成第 8 章 Diagram Review：新增 Skill 生命周期与权限边界 Mermaid 源、SVG/PNG 导出与视觉审查，明确发现、Contract、授权与结果验证是不同阶段。
- 完成第 8 章 Fact Check：重新限定 Agent Skills Specification、Claude Code、ChatGPT Skills 与 OpenAI Plugin 的各自可用陈述和外推禁区，并重跑 6 项纯内存选择测试与演示；不将其表述为真实权限或产品验证。
- 完成第 8 章 Language Editing：统一中英文术语的首次呈现、来源段落和授权证据的主语，并修正测试小节中已完成图示仍被写为未创建的状态漂移；未扩大已核验范围。
- 完成第 8 章 Final Review：重新验证 6 项纯内存选择测试、演示、Mermaid SVG/PNG 渲染、正文图源一致性和完整 Markdown 工具链，确认正文、来源、示例、图示、审查记录和状态工件一致。
- 新增第 9 章 Research Brief 与候选参考资料：限定 Plan-and-Solve、ReAct、Anthropic workflow/agent 建议与 OpenAI Agents SDK orchestration 的可用陈述，并将 Plan Brief、任务卡、依赖图、停止条件和案例保留为本书工程模型。
- 新增第 9 章详细 Chapter Outline：以 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例组织可审查蓝图，并保留论文、产品与本书模型的边界。
- 新增第 9 章原创 First Draft：以 Plan Brief、任务卡、依赖与并行候选、计划修订、停止升级和 API 认证测试教学案例组织正文，并明确图示、纯内存示例和后续审查尚未实施。
- 完成第 9 章 Technical Review：重新限定来源范围、相邻章节责任和未实施工件状态，并修正计划摘要（Plan Brief）、任务卡（Task Card）、应用程序接口（Application Programming Interface，API）与技能契约（Skill Contract）的术语首现。
- 完成第 9 章纯内存 Example Implementation：新增 `assessTaskPlan`、6 项 Node 内置测试、演示与示例整合记录；模块只检查注入的 Plan Brief、任务卡、依赖、效果批准快照与资源标签，不访问真实外部系统。
- 完成第 9 章 Diagram Review：新增 Plan Brief 到任务图的 Mermaid 源、SVG/PNG 导出与视觉审查；图中将并行标为候选，将写入和环境条件导向独立批准，并把新观察导向记录、局部修订、阻塞或升级，不表示真实调度、授权或测试结果。
- 完成第 9 章 Fact Check：重新限定 Plan-and-Solve、ReAct、Anthropic 工程文章与 OpenAI Agents SDK 文档的允许用途，重跑纯内存示例测试与演示，并将真实产品或运行结论排除在教学模型之外。
- 完成第 9 章 Language Editing：统一术语首现、主语、段落节奏和阶段时态；未改变来源范围、示例接口、Mermaid 图源或导出图。
- 完成第 9 章 Final Review：重新运行纯内存示例、Mermaid SVG/PNG 导出、PNG 视觉检查、正文图源一致性、完整 Markdown 工具链和 diff 检查，确认正文、来源、示例、图示、审查记录和状态工件一致。
