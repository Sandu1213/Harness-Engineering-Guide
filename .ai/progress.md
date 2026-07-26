# Chapter Progress

阶段值使用 `未开始`、`进行中`、`完成`、`不适用` 或 `阻塞`。`Status` 只反映该章整体状态；具体事实与阻塞写入 `.context/CURRENT_STATE.md`。

## 初始化更新

- 2026-07-15：全书 47 章已完成目录级规划和 P0 审查；第 1 至 4 章均已完成全部章节阶段。第 5 章的下一项任务为 Research Brief。
- 2026-07-16：第 30 章完成 Research Brief：重读 Flutter Testing Overview、表单校验、集成测试与 Node Test Runner/CLI 的官方资料；CH30-REF-01 至 CH30-REF-04 已分别映射 REF-092、REF-093、REF-094、REF-090，测试层次、表单校验、设备/模拟器运行语境与纯内存 Node 入口均保留不可外推边界。下一项为 Chapter Outline。
- 2026-07-16：第 30 章完成 Chapter Outline：以交付契约、状态模型、分层测试、观察/报告、准入门、纯内存示例、图示断点、三场景案例和渐进增强组织逐节蓝图；每节均写明来源范围、本书工件、最小证据与真机/模拟器/网络未运行边界。下一项为 First Draft。
- 2026-07-16：第 30 章完成 First Draft：原创正文以虚构 Flutter 登录三场景拆开交付契约、状态、分层测试计划、观察与报告结论；保留 Flutter/Node 的限定引用，并明确纯内存示例、图示与真实移动环境均尚未实施。下一项为 Technical Review。
- 2026-07-16：第 30 章完成 Technical Review：重读 Flutter Testing Overview、表单校验、集成测试与 Node CLI/Test runner，确认正文限定了测试分类、`validate()`、设备/模拟器运行语境和 Node 入口；本书模型、计划、观察、`ready` 与真实执行仍严格分层。下一项为 Example Implementation。
- 2026-07-16：第 30 章完成 Example Implementation：`assessFlutterLoginDelivery` 的模块缺失红灯记录可追溯；`npm run test:flutter-login-delivery-assessment` 重新得到 8 项通过、0 项失败，演示输出 `ready`、`flutter_login_delivery_plan_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。新增 npm 命令、总校验入口和示例清单；下一项为 Diagram Review。
- 2026-07-16：第 30 章完成 Diagram Review：Mermaid CLI 11.16.0 实际导出 SVG 与 1220×2220 PNG，PNG 已查看；正文 Mermaid 块与 `.mmd` 图源逐字一致。图明确保留 `ready`、`requires_approval`、实际 Observation Record、`planned` 报告和保守停止之间不可跳过的边界；下一项为 Fact Check。
- 2026-07-16：第 30 章完成 Fact Check：重读 Flutter Testing Overview、表单校验、集成测试与 Node Test runner/CLI 官方资料，确认 CH30-REF-01 至 CH30-REF-04 与 REF-092、REF-093、REF-094、REF-090 的限定映射；官方事实、虚构案例、本书交付工件和当前纯内存运行证据均保持分层。下一项为 Language Editing。
- 2026-07-16：第 30 章完成 Language Editing：统一场景键与状态终态的表述，明确 `success` 是场景键而 `authenticated` 是对应终态；核对术语首现、主语、时态、图示替代描述、表格和第 31/32 章衔接，未改变来源范围、示例接口、测试结果或 Mermaid 语义。下一项为 Final Review。
- 2026-07-16：第 30 章完成 Final Review：重新运行 8 项专用 Node 测试与演示，重新导出并查看 1220×2220 Mermaid PNG，确认正文图块与图源逐字一致；来源映射、事实核验、完成清单与状态工件一致。下一项为第 31 章 Research Brief。
- 2026-07-16：第 30 章 Final Review 收口后，`npm run validate` 以退出码 0 完成：409 个 Markdown 文件、0 个 lint 错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、17 章未开始）。
- 2026-07-16：第 31 章完成 Research Brief：重读 pytest fixture／monkeypatch 与 Playwright Browser Context、locator、assertion 官方资料；CH31-REF-01 至 CH31-REF-05 分别映射 REF-095、REF-096、REF-097、REF-083、REF-082。API 契约、UI 交互证据、隔离、替身和报告门均保持为受限研究框架，未创建真实服务、浏览器会话或测试运行。下一项为 Chapter Outline。
- 2026-07-16：第 31 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：411 个 Markdown 文件、0 个 lint 错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。
- 2026-07-16：第 31 章完成 Chapter Outline：以证据计划、API 契约、fixture／替身、Browser Context、locator、可重试断言、报告门、纯内存准入器、图示断点、同一登录案例和渐进增强组织逐节蓝图；每节均标明来源范围、本书模型、最小证据与未运行边界。下一项为 First Draft。
- 2026-07-16：第 31 章完成 First Draft：原创正文以虚构登录场景拆开 API Contract Check 与 UI Flow Evidence，限定 fixture／替身、Browser Context、locator 与可重试断言的机制范围，并以 Failure Record、Report Gate 和 `planned` 结论防止把 API、UI、计划与真实执行混写；图示、纯内存示例、pytest、Playwright、API、浏览器和环境动作均未实施。下一项为 Technical Review。
- 2026-07-16：第 31 章 First Draft 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 413 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该结果验证原创正文、引用映射与状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章完成 Technical Review：重读 pytest fixture／`monkeypatch` 与 Playwright Browser Context、locator、assertion 的官方资料，确认 CH31-REF-01 至 CH31-REF-05 的受限映射；补齐前置知识、工作流程、参考资料、完成检查表及空图示／示例元数据，不新增框架事实或运行结论。下一项为 Example Implementation。
- 2026-07-16：第 31 章 Technical Review 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 414 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该结果验证审查记录、结构补齐与状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章完成 Example Implementation：`assessTestEvidencePlan` 先以 `ERR_MODULE_NOT_FOUND` 记录模块缺失红灯，再以 8 项 Node 内置测试和演示检查完整双层计划、API 契约、UI 动作后观察、Browser Context 边界、Failure Record、报告限制与环境批准；实现只分类注入对象，演示固定 `executionPerformed: false`。已登记 npm 入口、总校验和示例说明；下一项为 Diagram Review。
- 2026-07-16：第 31 章 Example Implementation 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 416 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。新增组为 8 项通过、0 项失败。该结果验证纯内存示例、npm 入口、正文与状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章完成 Diagram Review：Mermaid CLI 11.16.0 实际导出 SVG 与 1568×1920 PNG，PNG 已查看；正文 Mermaid 块与 `.mmd` 图源逐字一致。图只表达 API/UI 证据、失败记录、报告门与环境批准出口，未表示真实 pytest、Playwright、API、浏览器或报告运行；下一项为 Fact Check。
- 2026-07-16：第 31 章 Diagram Review 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 417 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该结果验证 Mermaid 源、导出链接、审查记录和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章完成 Fact Check：重读 pytest fixture／`monkeypatch` 与 Playwright Browser Context、locator、assertion 官方资料，确认 CH31-REF-01 至 CH31-REF-05 分别映射 REF-095、REF-096、REF-097、REF-083、REF-082；重跑纯内存测试和演示，8 项通过、0 项失败。下一项为 Language Editing。
- 2026-07-16：第 31 章 Fact Check 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 419 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该结果验证事实核验工件、引用映射、纯内存运行记录与状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章完成 Language Editing：将 pytest fixture、Browser Context、locator、Failure Record、Report Gate 和 timeout 的首次出现统一为中文（English）形式，收束具体主语、时态和图文术语；未改变来源映射、示例接口、8 项测试结果或 Mermaid 语义。下一项为 Final Review。
- 2026-07-16：第 31 章 Language Editing 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 420 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该结果验证语言审阅、术语呈现和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章完成 Final Review：重跑 8 项专用 Node 测试与无副作用演示，重新导出并查看 1568×1920 Mermaid PNG，确认正文 Mermaid 块与 `.mmd` 图源逐字一致；来源映射、事实核验、完成检查表和状态工件已切换完成。下一项为第 32 章 Research Brief。
- 2026-07-16：第 31 章 Final Review 状态收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 421 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、0 章进行中、16 章未开始）。该结果只验证书稿工件与纯内存示例，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 32 章完成 Research Brief：重读 Delta Debugging 原始论文、Google SRE Effective Troubleshooting、Git `bisect` 与 Playwright actionability；CH32-REF-01 至 CH32-REF-04 分别映射 REF-098、REF-099、REF-100、REF-081。最小复现、假设记录、候选修复、回归门和升级记录均明确为本书工程模型；未实施或运行 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作。下一项为 Chapter Outline。
- 2026-07-16：第 32 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 423 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该结果只验证 Research Brief、引用、术语和书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 2026-07-16：第 32 章完成 Chapter Outline：把症状收集、复现契约、最小化、模式搜索、假设排序、可证伪检查、候选修复、回归门、升级、纯内存示例和图示／案例拆成逐节蓝图；每节均标出允许来源、本书模型、最小证据与不能主张的执行结论。下一项为 First Draft。
- 2026-07-16：第 32 章 Chapter Outline 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 424 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该结果只验证 Chapter Outline 与书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 2026-07-16：第 32 章完成 First Draft：原创正文以虚构 UI 等待条件失败组织症状、复现、最小化、假设、检查、候选修复、回归门与升级；已重读 CH32-REF-01 至 CH32-REF-04，严格区分来源机制、本书模型、教学输入和未运行范围。图示、纯内存示例及后续审查均未开始；下一项为 Technical Review。
- 2026-07-16：第 32 章 First Draft 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 425 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该结果只验证原创正文、引用与书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 2026-07-16：第 32 章完成 Technical Review：重读 Delta Debugging 原始论文、Google SRE Effective Troubleshooting、Git `bisect` 与 Playwright actionability，确认最小化、竞争假设、二分与 actionability 均保留在各自限定语境；补齐候选修复／升级记录词表入口及正文的首次术语呈现，不增加示例、图示或运行结论。下一项为 Example Implementation。
- 2026-07-16：第 32 章 Technical Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 426 个文件、0 个错误，链接检查、31 组既有 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该结果只验证技术审查、术语与书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 2026-07-16：第 30 章 Example Implementation 收口后，`npm run validate` 以退出码 0 完成：408 个 Markdown 文件、0 个 lint 错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。
- 2026-07-16：第 30 章 First Draft 收口后，`npm run validate` 以退出码 0 完成：408 个 Markdown 文件、0 个 lint 错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。
- 2026-07-16：第 30 章 Chapter Outline 收口后，`npm run validate` 以退出码 0 完成：408 个 Markdown 文件、0 个 lint 错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。
- 2026-07-16：第 30 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：408 个 Markdown 文件、0 个 lint 错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。
- 2026-07-16：第 29 章完成 Final Review：重新运行 10 项专用 Node 测试与演示，重新导出并查看 1568×696 Mermaid PNG，确认正文图块与图源逐字一致；最终 `npm run validate` 以退出码 0 完成（408 个 Markdown 文件、0 个 lint 错误、链接检查、29 组 Node.js 示例测试，29 章完成/0 章进行中/18 章未开始），全书状态、交接与下一任务已切换到第 30 章 Research Brief。
- 2026-07-16：第 29 章 Language Editing 收口后，`npm run validate` 以退出码 0 完成：408 个 Markdown 文件、0 个 lint 错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。下一项为 Final Review。
- 2026-07-16：第 29 章完成 Language Editing：核对术语首现、具体主语、阶段时态、表格、图示替代描述与章节衔接；未发现需要为制造差异而改写的内容，未改变来源、示例接口、测试结果或 Mermaid 语义。下一项为 Final Review。
- 2026-07-16：第 29 章完成 Fact Check：重读 Anthropic、Git、GitHub 和 Node 的官方资料，核对 CH29-REF-01 至 CH29-REF-04 分别映射 REF-029、REF-088 至 REF-090；将官方事实、本书交付包模型、虚构案例与当前运行证据分开记录。下一项为 Language Editing。
- 2026-07-16：第 29 章完成 Diagram Review：Mermaid CLI 11.16.0 实际导出 SVG 与 1568×696 PNG，PNG 已查看；正文 Mermaid 块与 `.mmd` 图源逐字一致。图只表达六类交付工件、准入/停止与后续证据边界；下一项为 Fact Check。
- 2026-07-16：第 29 章完成 Example Implementation：`assessSoftwareChangeDelivery` 的实现前红灯记录可追溯；当前 `npm run test:software-change-delivery-assessment` 重新得到 10 项通过、0 项失败，演示输出 `ready_for_review`、`software_change_package_ready`、`request_review` 与 `executionPerformed: false`。新增 npm 命令、总校验入口和示例清单；下一项为 Diagram Review。
- 2026-07-16：第 29 章完成 Technical Review：重新读取 CH29-REF-01 至 CH29-REF-04，核对 Anthropic、Git、GitHub 与 Node 的限定陈述、正式引用映射、术语、示例/测试源、Mermaid 图源和章节边界；修正正文完成检查表将未正式验收的后续阶段合并写成完成的状态漂移。下一项为 Example Implementation。
- 2026-07-15：第 2 章完成增补修订：正文新增责任接口、诊断卡与渐进增强边界；Research Brief、事实核验清单和参考资料同步收紧 REF-004 的允许用途。章节各阶段仍为完成，复核记录见 `.memory/reviews/2026-07-15-chapter-02-supplemental-revision.md`。
- 2026-07-15：第 2 章补充结论状态语义：将未证实与四类有证据终态分开，明确记录缺失不等于失败或成功；属于本书工程模型，不新增来源事实、示例接口或图示接口。章节各阶段仍为完成；完整校验为 139 个 Markdown 文件 0 错误、六套示例 28 项测试与状态检查通过，记录见 `.memory/reviews/2026-07-15-chapter-02-state-semantics-revision.md`。
- 2026-07-15：第 5 章完成全部章节阶段：`assembleInstructionPacket` 的五项测试和演示已实际运行，Mermaid 图已导出 SVG/PNG 并视觉检查，中文叙述、阶段语义和跨工件状态已复核。下一项为第 6 章 Research Brief。
- 2026-07-15：第 6 章完成 Research Brief 与候选参考资料：复核 Context Engineering、本地与模型可见 context、跨轮状态、长上下文与检索语境的五项一手来源；产品专属行为与本书 Context Packet 模型已分开。下一项为 Chapter Outline。
- 2026-07-15：第 6 章完成 Chapter Outline：以资料选择、本地与模型 context、Context Brief、预算、按需加载、跨轮去重、刷新污染诊断和测试失败案例组织逐节蓝图；下一项为 Fact Check。
- 2026-07-15：第 6 章完成 Fact Check：REF-015 至 REF-019 的产品事实、工程观点、外推禁区、当天复核要求与本书 Context Packet 模型均已分层记录；下一项为 Mermaid 图源。
- 2026-07-15：第 6 章完成 Mermaid 图源：`chapter-06-context-packet-flow.mmd` 已通过语法渲染，且只表达本书的资料选择、预算、按需引用与刷新闭环；下一项为 Example Plan。
- 2026-07-15：第 6 章完成 Example Plan 与原创正文初稿：`buildContextPacket` 的纯内存契约、五条测试路径和正文的证据边界均已建立；下一项为 Technical Review。
- 2026-07-15：第 6 章完成 Technical Review：来源范围、工程模型边界、相邻章节、图文一致性、示例阶段语义和验证状态已复核；两项表述漂移已修正。下一项为 Example Implementation。
- 2026-07-15：第 6 章完成 Example Implementation 与 Diagram Review：`buildContextPacket` 的红灯、5 项测试、演示、SVG/PNG 导出和视觉检查均已记录；下一项为 Language Editing。
- 2026-07-15：第 6 章完成全部章节阶段：Context Packet 的来源边界、原创正文、5 项纯内存测试、SVG/PNG 图示、语言编辑与最终审查均已完成；下一项为第 7 章 Research Brief。
- 2026-07-15：第 7 章完成 Research Brief 与候选参考资料：复核 Claude Code、OpenAI Agents SDK、LangChain/LangGraph 与 MemGPT 的五项来源，将会话历史、sandbox memory、thread-scoped 状态、跨任务记录和分层记忆分开；Memory Record 与生命周期保持为本书工程模型。下一项为 Chapter Outline。
- 2026-07-15：第 7 章完成 Chapter Outline：以资料分类、工作与长期边界、Memory Record、写入/读取门槛、生命周期冲突和接手案例组织逐节蓝图；来源事实、本书工程模型与教学案例保持分层。下一项为 Fact Check。
- 2026-07-15：第 7 章完成 Fact Check：REF-006、REF-020 至 REF-023 的产品、框架与论文范围、外推禁区和正文当天复核要求已逐项登记；Memory Record 与教学案例保持为本书工程模型。下一项为 Mermaid 图源。
- 2026-07-15：第 7 章完成 Mermaid 图源：`chapter-07-memory-record-lifecycle.mmd` 只表达本书的候选、检查、两类记忆、当前证据复核、保留、修订、过期与撤销闭环；已用 Mermaid CLI 11.16.0 语法渲染，尚未导出发布图或完成视觉审查。下一项为 Example Plan。
- 2026-07-15：第 7 章完成 Example Plan：为纯内存 `decideMemoryRecord` 定义输入、输出、工作/长期候选/阻塞/刷新状态、六条确定性测试路径与无外部副作用边界；尚未实现或运行。下一项为 First Draft。
- 2026-07-15：第 7 章完成原创 First Draft：以资料分类、Memory Record、写入/读取闸门、生命周期、接手案例与相邻章节边界组织正文；来源事实、本书模型、教学案例和未验证示例已分层。下一项为 Technical Review。
- 2026-07-15：第 7 章完成 Technical Review：修正 Fact Check 对后续工件“尚未发生”的时态漂移，复核来源范围、本书模型、术语、图文一致性、示例阶段与相邻章节责任。下一项为 Example Implementation。
- 2026-07-15：第 7 章完成 Example Implementation：`decideMemoryRecord` 先以模块缺失建立红灯，再以 6 项 Node 内置测试和演示验证工作记忆、长期候选、缺元数据、过期、主体不匹配与撤销路径；示例只处理注入对象，下一项为 Diagram Review。
- 2026-07-15：第 7 章完成 Diagram Review：Mermaid CLI 11.16.0 实际导出 SVG/PNG 并查看 PNG；阻塞分支改为补证或人工裁决后重新检查，跨任务分支明确为长期候选。下一项为 Language Editing。
- 2026-07-15：第 7 章完成 Language Editing：统一作用范围、长期记忆与长期候选的语义，说明概念字段与 JavaScript 命名差异，并拆分长句；未修改来源、示例、图源或导出图。下一项为 Final Review。
- 2026-07-15：第 7 章完成 Final Review：重新运行 6 项纯内存测试、演示、Mermaid SVG/PNG 渲染和视觉检查，确认正文 Mermaid 块与图源一致，并完成全仓校验。下一项为第 8 章 Research Brief。
- 2026-07-15：第 2 章完成 Attempt Trace 增补：以 `attempt_id`、候选—请求—观察—验证关联和最小顺序关系补足交接时的证据追溯；该框架仍是本书工程模型，未修改示例或图示接口。专用示例 4 项测试、演示和全仓校验均已实际运行，记录见 `.memory/reviews/2026-07-15-chapter-02-attempt-trace-revision.md`；下一项仍为第 8 章 Research Brief。
- 2026-07-15：第 8 章完成 Research Brief 与候选参考资料：复核 Agent Skills 规范、Claude Code、ChatGPT Skills 与 OpenAI Plugin 的一手资料；Skill Contract、概念边界、生命周期和 Markdown 审查案例均标为本书工程模型。下一项为 Chapter Outline。
- 2026-07-15：第 8 章完成 Chapter Outline：以 Prompt 碎片、最小工件与渐进加载、Skill Contract、发现与前置检查、概念与权限边界、测试版本弃用和 Markdown 审查案例组织逐节蓝图；来源事实、本书模型与教学设计保持分层。完整校验检查 154 个 Markdown 文件、0 个 lint 错误，链接检查和七组共 34 项 Node 内置测试均通过；下一项为 First Draft。
- 2026-07-15：第 8 章完成 First Draft：写作日重新读取 REF-024 至 REF-027，以原创叙述解释 Prompt 碎片、最小工件、Skill Contract、发现与选择、概念和权限边界、测试版本弃用与只读 Markdown 审查案例；示例、图示、技术审查和事实核验均未提前伪造为完成。完整校验检查 155 个 Markdown 文件、0 个 lint 错误，链接检查和七组共 34 项 Node 内置测试均通过；下一项为 Technical Review。
- 2026-07-15：第 8 章完成 Technical Review：重新读取 REF-024 至 REF-027，核对规范与产品范围、Skill/Tool/Workflow/Hook/Plugin/权限边界、计划工件状态和相邻章节责任；修正技能契约（Skill Contract）的首次术语写法，记录位于 `.memory/reviews/2026-07-15-chapter-08-technical-review.md`。下一项为 Example Implementation。
- 2026-07-15：第 8 章完成 Example Implementation：先以 `ERR_MODULE_NOT_FOUND` 记录模块缺失红灯，再实现纯内存 `evaluateSkillSelection`；6 项 Node 内置测试和演示均实际运行，分别覆盖只读选择、缺输入、缺前置条件、范围不匹配、写入升级和缺选择证据。实现只处理注入对象，记录位于 `.memory/reviews/2026-07-15-chapter-08-example-integration.md`。下一项为 Diagram Review。
- 2026-07-15：第 8 章完成 Diagram Review：Mermaid CLI 11.16.0 实际导出 Skill 生命周期与权限边界 SVG/PNG 并查看 PNG；正文 Mermaid 块、图源、导出链接和替代描述一致，图中没有把发现、Contract、授权或 Tool 请求直接写成结果验证。记录位于 `.memory/reviews/2026-07-15-chapter-08-diagram-review.md`。下一项为 Fact Check。
- 2026-07-15：第 8 章完成 Fact Check：重新限定 REF-024 至 REF-027 的规范与产品范围，记录所有外推禁区，并重跑 `evaluateSkillSelection` 的 6 项纯内存测试和演示；状态同步后的完整校验检查 161 个 Markdown 文件、8 组共 40 项 Node 内置测试。结果只证明注入对象上的教学函数行为。下一项为 Language Editing。
- 2026-07-15：第 8 章完成 Language Editing：统一术语首次出现、来源段落和授权证据主语，修正测试小节的图示阶段时态；未改变事实范围、示例接口或 Mermaid 含义。完整校验检查 162 个 Markdown 文件、8 组共 40 项 Node 内置测试。下一项为 Final Review。
- 2026-07-15：第 8 章完成 Final Review：重新运行 6 项纯内存测试与演示、Mermaid SVG/PNG 渲染、正文图源一致性检查和完整项目校验；正文、来源、示例、图示、审查记录和状态工件一致。下一项为第 9 章 Research Brief。
- 2026-07-15：第 9 章完成 Research Brief 与候选参考资料：核验 Plan-and-Solve、ReAct、Anthropic workflow/agent 工程建议及 OpenAI Agents SDK orchestration 的限定范围；Plan Brief、任务卡、依赖图、停止条件和案例均保持为本书工程模型。下一项为 Chapter Outline。
- 2026-07-15：第 9 章完成 Chapter Outline：以 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例组织逐节蓝图；论文、官方工程建议、特定 SDK 文档与本书模型保持分层。下一项为 First Draft。
- 2026-07-15：第 9 章完成 First Draft：写作日重新读取 REF-004、REF-028 至 REF-030，以 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例组织原创正文；图示、示例与后续审查均明确为未开始。下一项为 Technical Review。
- 2026-07-15：第 9 章完成 Technical Review：重新限定论文、官方工程建议、SDK 文档与本书模型的范围，修正 Plan Brief、Task Card、API 与 Skill Contract 的术语首现；图示、示例和后续审查仍未开始。下一项为 Example Implementation。
- 2026-07-15：第 9 章完成 Example Implementation：`assessTaskPlan` 先以 `ERR_MODULE_NOT_FOUND` 记录模块缺失红灯，再以 6 项 Node 内置测试和演示验证准备、缺验收、依赖阻塞、写入升级、资源冲突与不完整 Brief；实现只处理注入对象。下一项为 Diagram Review。
- 2026-07-15：第 9 章完成 Diagram Review：Mermaid CLI 11.16.0 实际导出 Plan Brief 到任务图的 SVG/PNG 并查看 PNG；正文 Mermaid 块、图源、导出链接与替代描述一致，图只表达本书模型。下一项为 Fact Check。
- 2026-07-15：第 9 章完成 Fact Check：实际重读 REF-004、REF-028 至 REF-030，限定论文、官方工程建议与 Python SDK 文档的允许用途及外推禁区；重跑 6 项纯内存测试与演示。下一项为 Language Editing。
- 2026-07-15：第 9 章完成 Language Editing：统一中英文术语首现、主语、段落节奏与阶段时态，未改变来源范围、示例接口、Mermaid 图源或导出图。下一项为 Final Review。
- 2026-07-15：第 9 章完成 Final Review：重跑 6 项纯内存测试、演示、Mermaid SVG/PNG 导出、PNG 视觉检查、正文图源一致性、完整工具链与 diff 检查；正文、来源、示例、图示、审查记录和项目状态一致。下一项为第 10 章 Research Brief。
- 2026-07-15：第 10 章完成 Research Brief 与候选参考资料：复核 AWS Step Functions、LangGraph 与 Temporal 的状态、错误处理、检查点、重入和幂等性限定范围；Workflow Contract、State Record、交接包和停止规则均保持为本书工程模型。下一项为 Chapter Outline。
- 2026-07-15：第 10 章完成 Chapter Outline：以执行与尝试、Workflow Contract、State Record、Checkpoint、重入、幂等性、错误路径、交接和章节生产案例组织逐节蓝图；图示、示例、正文与审查均保持未开始。下一项为 First Draft。
- 2026-07-16：第 10 章完成原创 First Draft：写作日重读 REF-031 至 REF-035，正文分离 AWS、LangGraph、Temporal 的限定陈述、本书 Workflow Contract／State Record／交接包模型和章节生产教学案例；Mermaid 图源、纯内存示例、真实运行时与后续审查均明确保持未开始。下一项为 Technical Review。
- 2026-07-16：第 10 章完成 Technical Review：重读 REF-031 至 REF-035，核对产品或框架限定语境、本书模型、状态/记忆与计划/执行边界、术语首现和未实施工件状态；修正术语表、引用登记与 Outline 状态漂移，记录位于 `.memory/reviews/2026-07-16-chapter-10-technical-review.md`。下一项为 Example Implementation（先建立 Example Plan）。
- 2026-07-16：第 10 章完成 Example Implementation：`assessWorkflowTransition` 先以 `ERR_MODULE_NOT_FOUND` 建立模块缺失红灯，再以 8 项 Node 内置测试和演示验证合法迁移、终态重入、缺 checkpoint、未知写入效果、过期批准、交接冲突、验证拒绝恢复与验证证据不足；实现只判断注入对象，不代表真实工作流、重放、持久化、审批、Tool、权限或外部效果。记录位于 `.memory/reviews/2026-07-16-chapter-10-example-integration.md`。下一项为 Diagram Review。
- 2026-07-16：第 10 章完成 Diagram Review：`chapter-10-workflow-state-machine.mmd` 已由 Mermaid CLI 11.16.0 导出 SVG/PNG 并实际查看 PNG；正文 Mermaid 块与图源以 `diff -u` 比较无差异，图只表达本书的状态、证据、检查点和保守出口模型。记录位于 `.memory/reviews/2026-07-16-chapter-10-diagram-review.md`。下一项为 Fact Check。
- 2026-07-16：第 10 章完成 Fact Check：重读 REF-031 至 REF-035，逐项记录 AWS Step Functions、LangGraph 与 Temporal 的允许陈述、外推禁区和动态复核条件；重跑 `assessWorkflowTransition` 的 8 项纯内存测试与演示。结果只证明注入教学对象上的确定性判断。下一项为 Language Editing。
- 2026-07-16：第 10 章完成 Language Editing：统一工具、执行实例、智能体、沙箱、checkpointer/thread/store、API 和 exactly-once 等术语首现，收束来源段落主语与图示导语；未改变 REF-031 至 REF-035 的限定范围、示例接口或 Mermaid 语义。下一项为 Final Review。
- 2026-07-16：第 10 章完成 Final Review：重跑 8 项纯内存测试、演示、Mermaid SVG/PNG 导出、PNG 视觉检查与正文图源一致性检查；正文、来源、示例、图示、审查记录和状态工件一致。完整工具链和 diff 检查的实际结果见 `CURRENT_STATE.md`。下一项为第 11 章 Research Brief。
- 2026-07-16：第 11 章完成 Research Brief 与候选参考资料：核验 MCP 当前 Tools 草案、OpenAI Function Calling、Anthropic 工具定义与 JSON Schema 的限定范围；工具契约、调用记录、结果信封与效果不确定性均明确为本书工程模型。下一项为 Chapter Outline。
- 2026-07-16：第 11 章完成 Chapter Outline：以模型候选、工具描述、调用请求、结果关联、错误层次、效果不确定性和书稿元数据教学案例组织逐节蓝图；所有图示、纯内存示例、测试和运行时均保持未开始。下一项为 First Draft。
- 2026-07-16：第 11 章完成原创 First Draft：写作日重读 REF-036 至 REF-039，以模型候选、Tool Descriptor、Schema 准入、Invocation Request、关联记录、Result Envelope、错误层次、效果不确定性和书稿元数据教学案例组织正文；图示、纯内存示例、真实工具运行时与后续审查均未开始。下一项为 Technical Review。
- 2026-07-16：第 11 章完成 Technical Review：重读 REF-036 至 REF-039，分开 MCP Tools 草案与 2025-11-25 Schema Reference 的用途，收束 OpenAI 参数校验归因，补齐核心术语并修正 Outline 状态漂移；图示、纯内存示例与真实工具运行时仍未开始。下一项为 Example Implementation。
- 2026-07-16：第 11 章完成 Example Implementation：先以 `ERR_MODULE_NOT_FOUND` 记录模块缺失红灯，再以 7 项 Node 内置测试和演示验证未知工具、参数形状、只读候选、缺批准、关联冲突、效果未知和未验证成功结果；`assessToolInvocation` 只处理注入对象，不调用真实 Tool、权限或外部系统。下一项为 Diagram Review。
- 2026-07-16：第 11 章完成 Diagram Review：`chapter-11-tool-invocation-sequence.mmd` 已用 Mermaid CLI 11.16.0 导出白色背景、两倍缩放的 SVG/PNG 并实际查看；正文 Mermaid 块、图源、导出链接、替代描述与读图结论一致，图只表达本书模型。下一项为 Fact Check。
- 2026-07-16：第 11 章完成 Fact Check：重读 REF-036 至 REF-039，逐项限定 MCP Tools 草案、版本化 Schema、OpenAI、Anthropic 与 JSON Schema 的可归因范围和外推禁区；重跑 7 项纯内存测试与演示。下一项为 Language Editing。
- 2026-07-16：第 11 章完成 Language Editing：收束候选—请求—结果—观察—验收判断链的中文表达、图示替代描述和示例说明，未新增来源、改变示例接口或 Mermaid 语义。下一项为 Final Review。
- 2026-07-16：第 11 至 14 章完成并行工件收口与交叉审查修正：第 11 章完成 Final Review；第 12 章补齐目标范围准入并通过 8 项纯内存测试；第 13 章完成正式引用与术语登记；第 14 章补齐证据状态不匹配与匹配批准两条测试并通过 10 项测试。REF-040 至 REF-052、出版目录、npm 入口和状态工件均已同步；最终全仓校验和 diff 检查结果记录于对应 Final Review 与 `CURRENT_STATE.md`。下一项为第 15 章 Research Brief。
- 2026-07-17：第 43 章完成 Technical Review：复核 Book Harness 工件、五项来源及第 42/44 章边界，修正术语首现、阶段时态和 `ready_for_completion_review` 状态名；定向 Markdown lint 与 diff 检查通过。下一项为 Example Implementation。
- 2026-07-17：第 44 章完成 Research Brief 与 Chapter Outline：五项来源已映射 REF-029、REF-134、REF-061、REF-135、REF-136；10 个逐节蓝图、三类案例、纯内存示例与图示计划保持模型/模拟/真实执行分层。下一项为 First Draft。
- 2026-07-17：第 46 章完成 Research Brief：重读 Diátaxis、OASIS DITA 1.3、Carnegie Mellon Learning Objectives、Schema.org LearningResource 与 W3C PROV-DM；建立 Content Atom、Learning Path Contract、Derivative Content Manifest、Publication Adapter Profile、Feedback Candidate Record 与 Consistency Gate 的受限模型。下一项为 Chapter Outline。
- 2026-07-17：第 41 章完成 Final Review：重跑 13 项专用测试与无副作用演示，Mermaid CLI 11.16.0 重新导出并视觉检查 1568×3340 PNG，正文图块与图源逐字一致；章节专属 Markdown、链接、路径与 diff 检查通过。下一项为第 43 至 47 章收口。
- 2026-07-17：第 43 章完成 Example Implementation：先记录模块缺失红灯，再以 19 项纯内存 Node 测试覆盖十阶段顺序、硬缺口、Validation、状态漂移和出版批准边界；演示返回 `ready_for_completion_review` 且 `executionPerformed: false`。下一项为 Diagram Review。
- 2026-07-17：第 46 章完成 Chapter Outline：13 节蓝图逐项映射来源、Content Atom、学习路径、五种媒介、第 28 章三案例、版本/许可、适配、一致性门、反馈、示例与图示；下一项为 First Draft。
- 2026-07-17：第 43 章完成 Diagram Review：Mermaid CLI 11.16.0 导出白底双倍缩放 SVG 与 1514×7196 PNG并视觉检查；正文图块与图源逐字一致，三条完成/发布断点明确。下一项为 Fact Check。
- 2026-07-17：第 44 章完成 First Draft：原创正文覆盖十节、三类案例、六类角色、证据包、版本化队列、双硬门、有界回流、并行边界和 Human Decision；来源事实、本书模型、虚构案例和未运行范围保持分层。下一项为 Technical Review。
- 2026-07-17：第 45 章完成 First Draft：当前 Codex Manual 与 Claude Code 官方资料已重读；正文覆盖共享契约、工具适配、读取协议、能力差异、交接包、状态冲突、集成/恢复门和跨工具教学案例。下一项为 Technical Review。
- 2026-07-17：第 46 章完成 First Draft：原创正文从规范事实源、Content Atom、Learning Path、Manifest、五种媒介、第 28 章三案例、版本/许可、适配/一致性门、反馈回流到渐进路线；定向 Markdown、链接、路径与 diff 检查通过。下一项为 Technical Review。
- 2026-07-17：第 47 章完成 Research Brief：重读 OpenAI 兼容性与评估、Anthropic Agent 工程、NIST AI RMF 1.0、OWASP Prompt Injection 与 SLSA v1.2；建立稳定责任、开放问题、标准化阶梯和一次性脚本演进路线，拒绝确定未来预测。下一项为 Chapter Outline。
- 2026-07-17：第 47 章完成 Chapter Outline：以七项稳定责任、七类开放问题、标准化五层、一次性脚本七级演进、读者实践路线、纯内存示例和演进地图组织结语；所有未来陈述保持为待测假设或工程问题。下一项为 First Draft。
- 2026-07-17：第 43 章完成 Fact Check：当日重读 REF-131、132、117、133、109，重跑 19 项纯内存测试和演示并核对 1514×7196 图示；正文、来源、仓库路径、图文和未运行范围一致。下一项为 Language Editing。
- 2026-07-17：第 47 章完成 First Draft：原创正文回收七项稳定责任、七类开放问题、五层标准化、脚本七级演进和读者实践路线；明确当前尚不能声称全书完成或出版，九条正文链接、Markdown、路径与 diff 检查通过。下一项为 Technical Review。
- 2026-07-17：第 43 章完成 Language Editing 与 Final Review：19 项专用测试和无副作用演示通过，Mermaid CLI 11.16.0 重新导出并视觉检查 1514×7196 PNG，正文图块与图源逐字一致；章节已具备进入全仓 Validation 的专属证据，但在共享状态同步和新鲜全仓校验前不标记 `chapter_complete`。
- 2026-07-17：第 44 章完成 Technical Review 与 Example Implementation：统一角色契约、证据包、版本化队列、双硬门、冲突路由、有界返工和 Human Decision 边界；严格 TDD 经模块缺失 RED、路由加强 RED 后达到 17 项测试通过，三条演示均固定 `executionPerformed: false`。下一项为 Diagram Review。
- 2026-07-17：第 45 章完成 Technical Review 与 Example Implementation：核对 Shared Project Core、Tool Adapter、Context Read、State Conflict、Integration Gate 与 Resume Gate 的边界；严格 TDD 先记录模块缺失 RED，再以 15 项测试和演示验证跨工具接力候选，结果固定 `executionPerformed: false`。下一项为 Diagram Review。
- 2026-07-17：第 46 章完成 Technical Review：规范源与媒介实现、Content Atom 与相邻工件、学习设计与学习结果、派生与发布、许可、反馈和第 28 章当前接口均已复核；定向 Markdown、链接、路径、空白与 diff 检查通过。下一项为 Example Implementation。
- 2026-07-17：第 47 章完成 Technical Review 与 Example Implementation：将新出现的 `Eval Contract`、`Capability Grant` 分别统一回全书既有 Evaluation Spec 与 Capability Grant Record；严格 TDD 先记录模块缺失 RED，再以 11 项测试和无副作用演示得到 `ready_for_bounded_pilot_review`，不表示批准、部署或长期自治。下一项为 Diagram Review。
- 2026-07-17：第 44、45 章完成 Diagram Review：两图均以 Mermaid CLI 11.16.0 生成 SVG/PNG 并实际视觉检查，正文图块与图源逐字一致；第 44 章保留版本化队列、双硬门、冲突路由、有界返工与集成/发布断点，第 45 章保留 Shared Project Core、Tool Adapter、State Conflict、Integration/Resume Gate 与接力/恢复断点。下一项为各章 Fact Check。
- 2026-07-17：第 47 章完成 Diagram Review、Fact Check、Language Editing 与 Final Review：11 项专用测试和无副作用演示重跑通过；Mermaid CLI 11.16.0 重新导出并视觉检查 1568×2972 PNG，正文图块与图源逐字一致；六项来源、术语首现、开放问题和未运行边界完成复核。章节可进入最终全仓 Validation，但不提前标记 `chapter_complete`。
- 2026-07-17：第 45 章完成 Fact Check：写作日官方资料继续支持 Codex 的 `AGENTS.md`/subagent 与 Claude Code 的项目记忆、会话恢复、worktree/subagent 限定陈述；15 项测试、演示、正文图源一致性和定向链接/lint 通过。下一项为 Language Editing。
- 2026-07-17：第 46 章完成 Example Implementation：严格 TDD 经模块缺失 RED、16 项 GREEN、Adapter 权限边界 RED 后达到 17 项通过；演示返回 `ready_for_preview_review` 且 `executionPerformed: false`。下一项为 Diagram Review。
- 2026-07-17：第 44 至 47 章示例已接入 `package.json`、`scripts/validate.sh` 和示例 README；`agent/` 当前登记第 1 至 47 章共 47 组 Node.js 教学示例。四组新增测试共 60 项通过，四条演示均退出码 0；共享词表新增内容工厂、跨工具接力、多媒介派生和结语责任工件。
- 2026-07-17：第 44 章完成 Fact Check：重读 REF-029、REF-134、REF-061、REF-135、REF-136，分开一手来源、本书内容工厂模型、虚构案例和纯内存/图示证据；17 项测试、三条演示、正文图源一致性、PNG 复核和定向链接/lint 通过。下一项为 Language Editing。
- 2026-07-17：第 46 章完成 Diagram Review：Mermaid CLI 11.16.0 导出白底 2 倍 SVG/PNG；首轮反馈回流干扰主链后已修正并重新导出，1568×1470 PNG 完成第二轮视觉检查，正文图块与图源逐字一致。下一项为 Fact Check。
- 2026-07-17：47 个 Node.js 示例测试文件已统一运行，421 项测试通过、0 项失败；该结果只证明纯内存教学对象，不替代章节事实核验、共享状态同步或最终全仓 Validation。
- 2026-07-17：第 43 至 47 章的 Final Review 全部完成，章节终审记录达到 47/47；第 46 章终审修正两处第 28 章陈旧路径并重新验证 17 项测试、演示、图示、来源和专属工件。47 章正文 front matter 已统一为模板规定的 `status: "complete"`，图示和示例路径存在。
- 2026-07-17：附录 A 至 L 全部完成，并按 A–D、E–H、I–L 三组接受独立 Final Review；Prompt、Skill、Workflow、Memory、Evaluation、Reflection、Mermaid、Research、Handoff、Glossary 与 References 均形成读者可用的适配层。下一项为共享状态同步和最终全仓 Validation。
- 2026-07-17：47 章与 12 个附录完成最终内容收口。全仓 `npm run validate` 以退出码 0 完成：Markdown lint 检查 627 个文件、0 个错误，全部链接、47 组 Node.js 章节示例测试与 47/47 章节状态检查通过；另行汇总运行 421 项示例断言，421 项通过、0 项失败。工件矩阵、共享导航、当前状态、交接和完成审计已同步；该结论不包含网站、PDF、EPUB、Git 提交、部署或正式出版。

| Chapter | Research | Outline | Draft | Examples | Diagrams | Technical Review | Fact Check | Final Review | Status | Updated At |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 从 Prompt Engineering 到 Harness Engineering | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 02 Agent、Harness 与运行环境 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 03 仓库即 Agent 上下文 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 04 可靠 Agent 的工程原则 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 05 Instructions 与 Prompt | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 06 Context Engineering | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 07 Working Memory 与 Long-term Memory | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 08 Skills 与可复用能力 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 09 Planning 与任务拆解 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-15 |
| 10 Workflow 与状态管理 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 11 Tool Use 与工具协议 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 12 Environment、Sandbox 与权限 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 13 Knowledge Base 与检索 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 14 Human-in-the-loop | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 15 Observation 与状态感知 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 16 Reflection 与经验提炼 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 17 Evaluation 与可验证结果 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 18 Retry、Recovery 与容错 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 19 Context Compaction 与长任务 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 20 自改进的工程边界与长期运行 Agent | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 21 Claude Code 与 Codex 的项目 Harness | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 22 AGENTS.md、CLAUDE.md 与仓库级规则 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 23 Skills、Hooks 与自动化工作流 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 24 MCP 与外部工具集成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 25 浏览器自动化 Agent | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 26 多 Agent 协作与任务隔离 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 27 Git、Worktree 与代码审查 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 28 从零搭建最小 Harness | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 29 AI 软件工程师工作流 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 30 应用交付 Harness：Flutter 登录到测试报告 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 31 测试自动化 Harness：pytest 与 Playwright | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 32 自动分析失败并修复 Bug | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-16 |
| 33 Obsidian 项目记忆系统 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 34 团队级 Skill Library | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 35 企业级 Harness 架构 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 36 Harness Design Patterns | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 37 Memory 与 Skill Design Patterns | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 38 Reflection、Evaluation 与 Approval Patterns | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 39 Harness 测试策略与 Benchmark | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 40 成本、延迟与 Token 管理 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 41 安全、权限与审计 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 42 Harness 的版本化、回滚和 A/B 测试 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 43 用 Harness 写一本技术书 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 44 AI Technical Book Factory：Research、Writing 与 Review Agent | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 45 Codex、Claude Code 接力与长期项目上下文 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 46 从书籍扩展到课程、博客和知识库 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| 47 Agent Engineering 的未来与结语 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |

## 附录进度

| Appendices | Draft | Independent Review | Validation | Status | Updated At |
| --- | --- | --- | --- | --- | --- |
| A–D Prompt、Skill、Workflow、Memory | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| E–H Evaluation、Reflection、Mermaid、Research | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |
| I–L Handoff、Glossary、References | 完成 | 完成 | 完成 | 完成 | 2026-07-17 |

## 最近校验

- 2026-07-26：`v0.1.0` 中文首版从 `8894896` 发布，GitHub About 已设置在线阅读地址。Release CI 成功生成并校验 PDF/EPUB；上传 Job 首次因无法从无 `.git` 的工作目录推断仓库而失败，`8c7da37` 已显式加入 `--repo`。同一 CI artifact 随后上传成功：PDF 为 A4、505 页、字体全部嵌入，抽检第 1、253、505 页通过；EPUB 解压检查通过，两个 GitHub asset digest 与本地 SHA-256 一致。
- 2026-07-18：出版管线收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 628 个源文件、0 个错误，全仓本地链接、47 组 Node.js 章节示例测试与章节状态检查均通过（47 章完成）；`npm run check:reference-links` 独立检查共享参考表的 132 个外部来源并通过，`node --test examples/agent/*.test.mjs` 汇总 421 项通过、0 项失败、0 项跳过。生成目录已从源文件校验范围排除，网站产物另由 `npm run site:check` 验证。
- 2026-07-18：网站、PDF 与 EPUB 本地出版工件完成。`npm run site:build` 生成 308 个 HTML 页面，`npm run site:check` 检查后 0 条缺失本地链接；Playwright 完成首页快照、点击“开始阅读第一章”、章节快照及 PNG 图示点击，图示页自然宽度为 784 px，Impeccable 最终返回 `[]`。`npm run publication:all` 生成 A4 497 页 PDF 与 EPUB 3，PDF 字体嵌入且经 Poppler 抽页目检，EPUBCheck 5.3.0 得到 0 fatal、0 error、0 warning、0 info。正式部署、版本标签、发行页上传与书稿许可证决定未执行。
- 2026-07-26：GitHub Pages 与 Release PDF/EPUB 归档自动化完成。发布配置已提交并推送，仓库已改为 public；Pages 工作流构建与部署成功，`https://sandu1213.github.io/Harness-Engineering-Guide/` 返回 HTTP 200。Playwright 在线点击首页主按钮后进入带 `/Harness-Engineering-Guide/` 前缀的第一章，控制台 0 错误、0 警告，Impeccable 返回 `[]`。PDF 重新生成 497 页并完成字体检查与 5 页目检，EPUB 解压和 EPUBCheck 均通过。最终 `npm run validate` 以退出码 0 检查 629 个 Markdown 文件、4 项出版测试、47 组章节示例和 47/47 状态。当前尚未创建标签或 Release，也未决定书稿许可证。
- 2026-07-17：最终内容收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 627 个文件、0 个错误，全部链接、47 组 Node.js 章节示例测试与章节状态检查均通过（47 章完成）。另行执行 `node --test examples/agent/*.test.mjs`，421 项通过、0 项失败、0 项跳过。该结果验证书稿源、导航、共享状态和纯内存教学示例，不代表网站、PDF、EPUB、发布、部署或外部系统已经运行。
- 2026-07-16：第 32 章 Fact Check 收口与第 33 至 37 章 Outline 新增后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 446 个文件、0 个错误，链接检查、32 组 Node.js 示例测试与章节状态检查均通过（31 章完成、7 章进行中、9 章未开始）。`bug-investigation-assessment` 组为 8 项通过、0 项失败；该结果只证明书稿工件和纯内存教学对象，不代表 Bug 修复、浏览器、Git、API、环境、账户、凭证或其他外部系统已经运行。下一项为第 32 章 Language Editing。
- 2026-07-16：第 32 章 Example Implementation、Diagram Review 与第 33 至 38 章 Research Brief 的共享整合后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 441 个文件、0 个错误，链接检查、32 组 Node.js 示例测试与章节状态检查均通过（31 章完成、7 章进行中、9 章未开始）。新增的 `bug-investigation-assessment` 组为 8 项通过、0 项失败；该结果只证明书稿工件和纯内存教学对象，不代表 Bug 修复、浏览器、Git、API、环境、账户、凭证或其他外部系统已经运行。下一项为第 32 章 Fact Check。
- 2026-07-16：第 29 章 Fact Check 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该结果验证事实核验清单、正式引用映射、状态和既有质量门；下一项为第 29 章 Language Editing。
- 2026-07-16：第 29 章 Diagram Review 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该结果验证重新导出的图示、图示审查记录和状态工件；下一项为第 29 章 Fact Check。
- 2026-07-16：第 29 章 Example Implementation 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。新增的 `software-change-delivery-assessment` 组在总校验中为 10 项通过、0 项失败；下一项为第 29 章 Diagram Review。
- 2026-07-16：第 29 章 Technical Review 收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该结果验证技术审查记录、正文状态修正、进度与交接工件的 Markdown、链接和既有项目质量门；Example Implementation、Diagram Review、Fact Check、Language Editing 与 Final Review 仍须逐项正式验收。
- 2026-07-16：第 29 章 First Draft 主线程收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该结果验证原创正文、正式引用映射与状态工件的 Markdown、链接和既有项目质量门；不代表本章示例实施、图示审查、技术审查、事实核验、语言编辑或最终审查已完成。下一项为第 29 章 Technical Review。
- 2026-07-16：第 29 章 Chapter Outline 主线程收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该结果验证详细提纲、引用映射、术语与状态工件的 Markdown 和链接一致性；下一项为第 29 章 First Draft。
- 2026-07-16：第 29 章 Research Brief 主线程收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。另行执行 `node --test examples/agent/software-change-delivery-assessment.test.mjs`，10 项通过、0 项失败；演示输出 `ready_for_review`、`software_change_package_ready`、`request_review` 与 `executionPerformed: false`；`git diff --check` 无输出、退出码 0。下一项为第 29 章 Chapter Outline。
- 2026-07-16：第 31 章 Chapter Outline 主线程收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 412 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该结果验证详细 Outline、来源映射、词表与状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。下一项为第 31 章 First Draft。
- 2026-07-16：第 24 至 28 章统一收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 386 个文件、0 个错误，链接检查、28 组示例测试与章节状态检查均通过。另行执行全量 Node 测试，28 个测试文件共 221 项通过、0 项失败；`git diff --check` 无输出、退出码 0。下一项为第 29 章 Research Brief。
- 2026-07-16：第 21 至 23 章统一收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 331 个文件、0 个错误，链接检查、23 组示例测试与章节状态检查均通过。另行执行 `node --test examples/agent/*.test.mjs`，174 项通过、0 项失败；`git diff --check` 无输出、退出码 0。下一项为第 24 章 Research Brief。
- 2026-07-16：第 18 至 20 章统一收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 298 个文件、0 个错误，链接检查、20 组示例测试与章节状态检查均通过。另行执行 `node --test examples/agent/*.test.mjs`，152 项通过、0 项失败；`git diff --check` 无输出、退出码 0。下一项为第 21 章 Research Brief。
- 2026-07-16：第 15 至 17 章统一收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 265 个文件、0 个错误，链接检查、17 组示例测试与章节状态检查均通过。另行执行 `node --test examples/agent/*.test.mjs`，120 项通过、0 项失败；`git diff --check` 无输出、退出码 0。下一项为第 18 章 Research Brief。
- 2026-07-16：第 11 至 14 章统一收口后，`npm run validate` 以退出码 0 完成；Markdown lint 检查 230 个文件、0 个错误，链接检查、14 组示例测试与章节状态检查均通过。另行执行的 86 项 Node 内置测试全部通过，`git diff --check` 无输出、退出码 0。下一项为第 15 章 Research Brief。
