# Handoff

## 当前交接点

**v0.2.0 发布完成交接（2026-07-26）：** Pi Agent 借鉴点专项增补及 Claude Code 二次复查已完成，`v0.2.0` 已从提交 `8b43aa6` 发布为 Latest Release。`Deploy reading site`、`Attach books to release`、Markdown lint 与 link check 工作流均成功；线上首页主入口与第 10 章“会话即树”锚点已完成浏览器点击复验。Release PDF 为 A4 521 页、Noto CJK 字体全部嵌入，目检第 1、95、96、120、521 页通过；EPUB 解压与 EPUBCheck 5.3.0 为 0 fatal、0 error、0 warning、0 info。远端 PDF/EPUB digest 与独立下载文件 SHA-256 一致。下一项仅为可选的 English 版本最小试点。

**Release 归档与在线站点自动化交接（2026-07-26）：** GitHub About 已指向 `https://sandu1213.github.io/Harness-Engineering-Guide/`，`v0.1.0` 中文首版已从 `8894896` 发布并附带 PDF/EPUB。CI 构建与文件校验成功；上传 Job 首次因无 `.git` 且未显式指定仓库而失败，`8c7da37` 已加入 `--repo`，同一 CI artifact 已补传。Release PDF 为 A4、505 页、字体全部嵌入，抽检封面/中页/末页通过；EPUB 解压检查通过，GitHub asset digest 与本地 SHA-256 一致。当前工作区另有未提交的章节与参考资料修订，未混入 `v0.1.0` 或本次发布修复。可选下一阶段是先以首页、出版说明、目录和一章正文试点 English 版本与中英文切换，再决定全书翻译和英文离线出版物。

**本地出版工件交接（2026-07-18）：** 网站、PDF 与 EPUB 已从同一份 47 章 + 12 附录清单实现并在本地验证。复现入口为 `npm run release:build`；网站构建位于 `docs/.vitepress/dist/`，PDF 位于 `output/pdf/harness-engineering-guide.pdf`，EPUB 位于 `output/epub/harness-engineering-guide.epub`。PDF/EPUB 需要 Pandoc，PDF 另需 Typst；完整验收使用 Poppler 与 EPUBCheck。网站生产构建生成 308 个 HTML 页面并通过本地链接爬检，Playwright 完成首页主按钮与图示点击链，Impeccable 检查为 0 项；PDF 为 A4 497 页且字体已嵌入，抽页目检通过；EPUBCheck 为 0 错误/警告。构建产物未提交。正式部署、版本标签、发行页上传和书稿许可证决定均未执行。

**最终内容完成交接（2026-07-17）：** 47 章全部章节阶段与 12 个附录的三组独立终审均已完成。正文、研究、提纲、局部引用、事实核验、示例计划、测试、Mermaid/SVG/PNG 和章节 Final Review 均达到 47 份；正文 front matter 已统一为 `status: "complete"`，图示/示例路径存在。最终 `npm run validate` 以退出码 0 完成：627 个 Markdown 文件、0 个 lint 错误，全部链接、47 组章节测试和 47/47 状态检查通过；421 项汇总断言全部通过。当前没有未完成的内容生产任务；只有用户明确授权后才进入网站、PDF、EPUB 或正式出版工作。

**历史交接更新（2026-07-17）：** 第 1 至 38 章已完成全部九阶段。第 33 至 38 章的 Final Review 已并行完成：六章共 47 项专用 Node 测试通过、0 项失败，演示均保留 `executionPerformed: false`，正文 Mermaid 块与图源一致，PNG 已实际查看；全仓 `npm run validate` 以退出码 0 完成，检查 505 个 Markdown 文件、0 个 lint 错误，链接、38 组示例测试及 38 章完成／9 章未开始的状态均通过。第 39 至 42 章已完成 Research Brief 与 Chapter Outline；第 39、40、42 章已完成 First Draft并进入 Technical Review，第 41 章 First Draft 正在收口。新增 REF-116 至 REF-130 已由主线程登记。不要把纯内存测试、图示或文本记录误写成真实产品、价格、Benchmark、实验、文件、网络、权限、审批、同步或外部动作已执行。

项目已完成初始骨架、P0 目录审查与第 1 至 31 章的全部章节阶段。第 24 至 28 章的并行交付已由主线程整合：第 24 章以 8 项纯内存断言检查 MCP 接入准入；第 25 章以 10 项断言检查浏览器 E2E 证据链；第 26 章以 10 项断言检查任务所有权与共享写入路由；第 27 章以 12 项断言检查候选变更准入；第 28 章以 7 项断言检查最小 Harness 准入。REF-086 至 REF-097、词表、npm 入口、示例说明、出版目录和进度表均已同步。第 29、30、31 章均已完成 Final Review；其中的测试、图示和演示只证明本书工件或注入的教学对象，不代表真实外部系统已执行。

**历史交接说明：** 当时的下一位执行者需先阅读 `CURRENT_STATE.md`、`NEXT_TASK.md`、`.ai/progress.md`，再执行第 33 章 Example Implementation；该任务及后续章节现均已完成。并行执行者当时只能修改本章局部路径，`.context/*`、`.ai/progress.md`、`.ai/references.md`、词表、目录、脚本和根文档由主线程统一写入。

**最新状态（2026-07-16）：** 第 1 至 30 章均完成；第 30 章已完成 Research Brief、Chapter Outline、First Draft、Technical Review、Example Implementation、Diagram Review、Fact Check、Language Editing 与 Final Review。CH30-REF-01 至 CH30-REF-04 映射 REF-092、REF-093、REF-094、REF-090；正文以虚构 Flutter 登录三场景组织交付契约、状态、分层测试、观察和报告边界，并将官方测试/表单/集成测试资料与本书工程模型分开。`assessFlutterLoginDelivery` 的红灯记录、8 项绿灯测试、无副作用演示和 npm 总校验入口均已完成；图已由 Mermaid CLI 11.16.0 重建、查看并核对正文图块与图源；事实核验重读四项官方资料并确认正式映射和受限用法；语言审阅已明确场景键和状态终态的差异；Final Review 已重跑示例、演示和图示核验。最终 `npm run validate` 以退出码 0 完成：409 个 Markdown 文件零 lint 错误、链接检查、30 组 Node.js 示例测试与 30 章完成／17 章未开始的状态检查均通过。下一项是第 31 章 Research Brief；不得把计划、纯内存示例、图示或 Flutter 文档写成真机、模拟器、网络、登录、凭证或报告已经执行。所有测试、演示、图示与校验都只证明本书工件或注入的教学对象；不得写成真实 Tool、MCP、SDK、Hook、CI、环境、权限、审批、知识库、浏览器、外部效果或业务结果。

**第 31 章进度（2026-07-16）：** Research Brief 已完成：pytest fixture／monkeypatch 与 Playwright Browser Context、locator、assertion 的官方限定语义已登记；CH31-REF-01 至 CH31-REF-05 对应 REF-095、REF-096、REF-097、REF-083、REF-082。API 与 UI 证据、替身、隔离、定位、观察、失败分类和报告门保持为受限研究框架。下一项为 Chapter Outline；未创建或运行真实服务、浏览器、账户、网络、CI、报告或凭证。

**第 31 章 Outline（2026-07-16）：** 逐节蓝图已完成，覆盖证据计划、API 契约、fixture／替身、Browser Context、locator、可重试断言、Failure Record、Report Gate、纯内存准入器、图示断点、同一登录案例和渐进增强；下一项为 First Draft。研究与提纲均未创建或运行真实 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。

**第 31 章 Outline 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：412 个 Markdown 文件、0 个 lint 错误、链接检查、30 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。该结果只验证书稿与纯内存教学工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 First Draft（2026-07-16）：** 原创正文已将虚构登录场景中的 API Contract Check 与 UI Flow Evidence 分开，fixture／替身、Browser Context、locator 与可重试断言只按官方资料的受限机制说明；Test Evidence Plan、Failure Record、Report Gate 和未来纯内存准入器都明确为本书模型。图示、示例、pytest、Playwright、API、浏览器、账户、网络、CI、报告与凭证均未实施或运行；下一项为 Technical Review。

**第 31 章 First Draft 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：413 个 Markdown 文件、0 个 lint 错误、链接检查、30 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。该结果只验证原创书稿、引用映射与纯内存教学工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 Technical Review（2026-07-16）：** 已重读 pytest fixture／`monkeypatch` 与 Playwright Browser Context、locator、assertion 官方资料，确认五项 CH31-REF 映射和受限表述；审查发现并补齐正文的前置知识、工作流程、参考资料、完成检查表及空图示／示例元数据。未新增框架事实、图示、示例或任何 pytest、Playwright、API、浏览器、账户、网络、CI、报告、凭证运行结论。下一项为 Example Implementation，记录位于 `.memory/reviews/2026-07-16-chapter-31-technical-review.md`。

**第 31 章 Technical Review 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：414 个 Markdown 文件、0 个 lint 错误、链接检查、30 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。该结果只验证审查、正文结构、引用与纯内存教学工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 Example Implementation（2026-07-16）：** 已为 `assessTestEvidencePlan` 记录 `ERR_MODULE_NOT_FOUND` 红灯，再运行专用 Node 测试得到 8 项通过、0 项失败；演示输出 `ready`、`test_evidence_plan_ready`、`implement_in_isolated_example` 和 `executionPerformed: false`。npm 入口、总校验、示例计划、正文和示例说明已同步。实现不导入 pytest／Playwright，不执行 API、浏览器、账户、网络、CI、报告或凭证动作；下一项为 Diagram Review，记录位于 `.memory/reviews/2026-07-16-chapter-31-example-integration.md`。

**第 31 章 Example Implementation 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：416 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。新增示例组为 8 项通过、0 项失败。该结果只验证纯内存示例、npm 入口、正文与状态工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 Diagram Review（2026-07-16）：** Mermaid CLI 11.16.0 已导出 SVG 与 1568×1920 PNG，PNG 已查看，正文 Mermaid 块与 `.mmd` 图源逐字一致。图保留 API/UI 证据、三个失败节点、Observation Record、Failure Record、Report Gate 和 `requires_approval` 之间的断点；图不表示真实 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证运行。下一项为 Fact Check，记录位于 `.memory/reviews/2026-07-16-chapter-31-diagram-review.md`。

**第 31 章 Diagram Review 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：417 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。该结果只验证 Mermaid 源、导出链接、图示审查与状态工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 Fact Check（2026-07-16）：** 已重读 pytest fixture／`monkeypatch` 与 Playwright Browser Context、locator、assertion 官方资料，确认五项 CH31-REF 的正式映射和受限陈述；重跑纯内存测试及演示，8 项通过、0 项失败且保持 `executionPerformed: false`。来源事实、本书模型、虚构案例、图示和实际运行范围分别登记于 `31-test-automation-harness-pytest-and-playwright.fact-check.md` 与 `.memory/reviews/2026-07-16-chapter-31-fact-check.md`。未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证；下一项为 Language Editing。

**第 31 章 Fact Check 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：419 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。该结果只验证事实核验、引用映射、纯内存运行记录与状态工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 Language Editing（2026-07-16）：** pytest fixture、Browser Context、locator、Failure Record、Report Gate 和 timeout 已在首次出现处统一为中文（English），具体主语、时态、图文术语和相邻章节衔接已核对；未改变正式映射、示例接口、8 项 Node 测试结果或 Mermaid 语义。未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证；下一项为 Final Review，记录位于 `.memory/reviews/2026-07-16-chapter-31-language-edit.md`。

**第 31 章 Language Editing 校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：420 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 30 章完成／1 章进行中／16 章未开始的状态检查均通过。该结果只验证语言审阅、术语呈现与状态工件，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 31 章 Final Review（2026-07-16）：** 已重跑 8 项专用 Node 测试与无副作用演示，重新导出并查看 1568×1920 Mermaid PNG，确认正文 Mermaid 块与 `.mmd` 图源逐字一致；正式来源映射、事实核验、完成检查表和状态已收口。示例与图只证明注入对象和书稿工件，未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。下一项为第 32 章 Research Brief，记录位于 `.memory/reviews/2026-07-16-chapter-31-final-review.md`。

**第 31 章 Final Review 校验（2026-07-16）：** `npm run validate` 已以退出码 0 完成：421 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 31 章完成／0 章进行中／16 章未开始的状态检查均通过。该结果只验证书稿工件与纯内存示例，不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。

**第 32 章 Research Brief（2026-07-16）：** 已重读 Delta Debugging 原始论文、Google SRE Effective Troubleshooting、Git `bisect` 与 Playwright actionability；CH32-REF-01 至 CH32-REF-04 映射 REF-098、REF-099、REF-100、REF-081。最小复现、可证伪假设、候选修复、回归门和升级记录均限于本书工程模型，案例只是假想的 UI 等待条件问题。未实施或运行 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作；下一项为第 32 章 Chapter Outline。

**第 32 章 Research Brief 校验（2026-07-16）：** `npm run validate` 已以退出码 0 完成：423 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 31 章完成／1 章进行中／15 章未开始的状态检查均通过。该结果只验证 Research Brief、引用、术语和书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。

**第 32 章 Chapter Outline（2026-07-16）：** 已把症状收集、Reproduction Contract、最小化、模式搜索、Hypothesis Record、Falsifiable Check、Fix Candidate、Regression Gate、Escalation Record、纯内存示例与图示／案例拆成逐节蓝图。来源事实、本书模型、虚构 UI 等待条件输入和未运行边界均分开；未实施或运行 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作。下一项为第 32 章 First Draft。

**第 32 章 Chapter Outline 校验（2026-07-16）：** `npm run validate` 已以退出码 0 完成：424 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 31 章完成／1 章进行中／15 章未开始的状态检查均通过。该结果只验证 Chapter Outline 与书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。

**第 32 章 First Draft（2026-07-16）：** 写作日已重读 CH32-REF-01 至 CH32-REF-04；原创正文以虚构 UI 等待条件失败组织症状、复现、最小化、假设、检查、候选修复、回归门与升级。来源事实、本书模型、教学输入和未运行范围均分开；图示、纯内存示例、测试、Bug 修复与后续审查未实施。下一项为 Technical Review。

**第 32 章 First Draft 校验（2026-07-16）：** `npm run validate` 已以退出码 0 完成：425 个 Markdown 文件、0 个 lint 错误、链接检查、31 组 Node.js 示例测试与 31 章完成／1 章进行中／15 章未开始的状态检查均通过。该结果只验证原创正文、引用与书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。

**第 32 章 Technical Review（2026-07-16）：** 已重读 CH32-REF-01 至 CH32-REF-04，确认 Delta Debugging、Google SRE、Git `bisect` 与 Playwright actionability 都只用于其受限语境；补齐候选修复（Fix Candidate）和升级记录（Escalation Record）的词表入口及正文术语首现。未创建或运行示例、图示、Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作；下一项为 Example Implementation。

**第 32 章 Technical Review 校验（2026-07-16）：** `npm run validate` 已以退出码 0 完成：426 个 Markdown 文件、0 个 lint 错误、链接检查、31 组既有 Node.js 示例测试与 31 章完成／1 章进行中／15 章未开始的状态检查均通过。该结果只验证技术审查、术语与书稿工件，不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。

**第 32 章 Example Implementation（2026-07-16）：** `assessBugInvestigation` 已先以 `ERR_MODULE_NOT_FOUND` 记录模块缺失红灯，再由专用 Node 内置测试得到 8 项通过、0 项失败；演示输出 `ready`、`bug_investigation_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。实现只评估注入对象，不运行 Bug 修复、pytest、Playwright、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作；记录位于 `.memory/reviews/2026-07-16-chapter-32-example-integration.md`。

**第 32 章 Diagram Review（2026-07-16）：** Mermaid CLI 11.16.0 已导出 SVG 与 1518×2828 PNG，PNG 已查看，正文 Mermaid 块与 `.mmd` 图源逐字一致。图仅表达症状、复现、最小化、假设、检查、候选修复、回归门和升级记录之间的本书模型；下一项为 Fact Check，记录位于 `.memory/reviews/2026-07-16-chapter-32-diagram-review.md`。

**第 33 至 38 章并行 Research Brief（2026-07-16）：** 第 33 章登记 REF-101 至 REF-105；第 34 章复用 REF-024 并登记 REF-106 至 REF-109；第 35 章登记 REF-110 至 REF-113；第 36 章复用 REF-029 至 REF-031 并登记 REF-114 至 REF-115；第 37、38 章复用既有正式引用。六章均只完成研究、来源范围和后续工件计划，尚未创建正文、示例、图示或执行外部产品动作。

**第 33 至 38 章并行 Chapter Outline（2026-07-16）：** 已分别完成项目记忆、团队 Skill 治理、企业 Harness、控制流模式、Memory／Skill 模式与反思／评估／批准模式的逐节蓝图。每份 Outline 均把来源可支持陈述、本书模型、虚构案例和未执行边界分开；第 38 章的正文、示例、图示和后续审查尚未开始。

**第 33 章 First Draft（2026-07-16）：** 已以项目记忆层、目录／属性／链接／标签、生命周期、健康检查、同步边界和虚构第 31 章证据网完成原创正文。REF-101 至 REF-105 只在各自 Obsidian 产品语境内使用；正文、示例与后续工件不代表 vault、Obsidian、Sync、网络、账户、插件、备份、冲突处理或外部系统已运行。下一项为第 33 章 Technical Review。

**第 33 章 Technical Review（2026-07-16）：** 已重读 CH33-REF-01 至 CH33-REF-05／REF-101 至 REF-105，确认 vault、Properties、links、tags 与 Sync 的产品陈述、项目记忆层模型、虚构第 31 章证据网和未执行边界均保持分层；第 32→33、第 33→34／37 衔接无越界，正文无需修订。记录位于 `.memory/reviews/2026-07-16-chapter-33-technical-review.md`；下一项为 Example Implementation。

**第 34 章 First Draft（2026-07-16）：** 已以登记、契约、准入审查、质量等级、兼容性、反馈与弃用记录完成团队 Skill Library 的原创正文；REF-024、REF-106 至 REF-109 均保留各自格式、产品和规范语境。正文与后续工件不代表真实 Skill、插件、MCP、市场、网络、浏览器、文件写入、凭证、组织授权或外部系统已运行。下一项为第 34 章 Technical Review。

**第 34 章 Technical Review（2026-07-16）：** 已重读 REF-024、REF-106 至 REF-109，确认 Skill format、Codex／Anthropic 文档、SemVer 规范、本书治理模型、虚构候选与未运行边界保持分层；第 33／35／37 章衔接无越界。正文仅修正过期验证状态为“已纳入主线程质量门、Technical Review 后待重跑”。记录位于 `.memory/reviews/2026-07-16-chapter-34-technical-review.md`；下一项为 Example Implementation。

**第 35 章 First Draft（2026-07-16）：** 已以控制／执行平面、策略决定、租户与数据边界、预算、关联观察、人工升级和虚构三阶段知识助手完成原创正文；REF-110 至 REF-113 均保留各自零信任、多租户、策略和追踪语境。正文与后续工件不代表企业目录、身份提供方、Kubernetes、OPA、OpenTelemetry、云账户、工单系统、知识库、审计、网络、凭证、审批或外部系统已运行。下一项为第 35 章 Technical Review。

**第 35 章 Technical Review（2026-07-16）：** 已重读 REF-110 至 REF-113，确认 NIST、Kubernetes、OPA 与 OpenTelemetry 的限定语境、本书企业 Harness 模型、虚构三阶段案例和未执行边界保持分层；第 34→35、35→36 衔接一致。正文测试表已记录本次四项官方资料复核；全局词表新增企业控制平面、执行平面、策略决定记录、租户与数据边界、关联观察记录和人工升级门。记录位于 `.memory/reviews/2026-07-16-chapter-35-technical-review.md`；下一项为 Example Implementation。

**第 36 章 First Draft（2026-07-16）：** 已以受控单循环、计划—执行、监督者—工作者、流水线与事件驱动五类模式卡完成虚构文件修复案例的原创正文；REF-029 至 REF-031、REF-114 至 REF-115 保留各自工程、SDK、产品、规范和运行时语境。正文与后续工件不代表真实 Agent、模型、队列、事件总线、调度器、工作流引擎、并发工作者、工具、Git、浏览器、CI、文件、网络、账户、凭证或外部系统已运行。下一项为第 36 章 Technical Review。

**第 36 章 Technical Review（2026-07-16）：** 已重读 REF-029 至 REF-031、REF-114 至 REF-115，确认工程、SDK、产品、规范与 Node 运行时背景均仅作受限来源说明；Pattern Card、结果所有者、选择／停止规则、虚构案例和未执行边界保持本书模型。第 35／37 章衔接一致，正文无需修订。记录位于 `.memory/reviews/2026-07-16-chapter-36-technical-review.md`；下一项为 Example Implementation。

**第 37 章 First Draft（2026-07-16）：** 已以会话、任务、项目与事件四类记录、只读／提议写入 Skill、版本／替代／弃用和虚构事实核验场景完成 Memory／Skill Pattern Card 的原创正文；REF-020、REF-022、REF-024、REF-025 保留各自产品与规范语境。正文与后续工件不代表真实 Session、数据库、向量检索、嵌入、同步、权限系统、Skill、产品配置、网络、文件、模型、账户、凭证、审批或外部系统已运行。下一项为第 37 章 Technical Review。

**第 37 章 Technical Review（2026-07-16）：** 已重读 REF-020、REF-022、REF-024、REF-025，确认产品／规范事实、本书 Memory／Skill 模式卡、虚构案例和未执行边界保持分层；第 36 章模式选择及第 38 章候选—评估—批准衔接一致。正文仅将“保存本轮项目”收紧为“保存本轮产生的项”。记录位于 `.memory/reviews/2026-07-16-chapter-37-technical-review.md`；下一项为 Example Implementation。

**第 38 章 First Draft（2026-07-16）：** 已以五类记录、五张反思／评估／批准模式卡、链接／来源双轨虚构案例和纯内存示例计划完成原创正文，并分开来源事实、本书工程模型、虚构教学输入和外部执行边界。正文与后续工件不代表真实 Agent、评估、审批、重试、外部工具、环境、账户、凭证、网络或外部系统已运行。下一项为第 38 章 Technical Review。

**第 38 章 Technical Review（2026-07-16）：** 已核对 CH38-REF-01 至 CH38-REF-04 的登记范围及第 37／39 章边界，确认来源事实、本书反思／评估／批准模式卡、虚构案例和未执行边界保持分层。正文修正第 41 至 43 章关联标识，并统一五张模式卡的中文（English）首次呈现。记录位于 `.memory/reviews/2026-07-16-chapter-38-technical-review.md`；下一项为 Example Implementation。

**本轮共享整合校验（2026-07-16）：** `npm run validate` 以退出码 0 完成：Markdown lint 检查 441 个文件、0 个错误，链接检查、32 组 Node.js 示例测试与章节状态检查均通过（31 章完成、7 章进行中、9 章未开始）。`bug-investigation-assessment` 的 8 项测试通过、0 项失败。该校验只覆盖书稿和纯内存教学对象；不代表 Bug 修复、浏览器、Git、API、环境、账户、凭证或外部系统已经运行。

**第 32 章 Fact Check（2026-07-16）：** 已重读 REF-098、REF-099、REF-100 与 REF-081，逐项登记 Delta Debugging、Google SRE 排障、Git `bisect` 和 Playwright actionability 的允许陈述、外推禁区与动态复核要求。`npm run test:bug-investigation-assessment` 重跑为 8 项通过、0 项失败；演示保持 `executionPerformed: false`。记录位于 `32-automated-failure-analysis-and-bug-fixing.fact-check.md` 与 `.memory/reviews/2026-07-16-chapter-32-fact-check.md`；下一项为 Language Editing。

**第 32 章 Language Editing（2026-07-16）：** 可证伪检查（Falsifiable Check）、回归门（Regression Gate）、候选修复和已验证修复已统一为中文（English）术语与受限结论；图示断点和第 31／33 章衔接已核对。未改变正式映射、纯内存接口、8 项测试结果或 Mermaid 语义；未运行外部系统。记录位于 `.memory/reviews/2026-07-16-chapter-32-language-edit.md`；下一项为 Final Review。

**第 32 章 Final Review（2026-07-16）：** 已重跑 8 项专用 Node 测试与无副作用演示，重新导出并查看 1518×3084 Mermaid PNG，确认正文 Mermaid 块与 `.mmd` 图源逐字一致；审查补齐图中遗漏的 Bug Investigation 节点并同步正文、图源和导出文件。第 32 章所有阶段完成；未运行 Bug 修复、pytest、Playwright、浏览器、API、Git、CI、环境、账户、凭证或外部系统。记录位于 `.memory/reviews/2026-07-16-chapter-32-final-review.md`。

## 已完成

- 入口、规则、风格规范、章节模板与 AI 工作流已建立。
- 58 个初始主题已映射为 47 个章节；P0 审查补充了依赖契约和章节边界。
- 第 10 章全部章节阶段已完成；REF-031 至 REF-035 已在 2026-07-16 的写作日、Technical Review 与 Fact Check 重读，正文将来源范围、Workflow Contract、State Record、交接包、恢复和停止规则的本书模型边界分开。`assessWorkflowTransition` 的模块缺失红灯、8 项 Node 内置测试与演示已实际运行，示例只判断注入对象；状态图已导出 SVG/PNG 并视觉检查，图源与正文 Mermaid 块一致。Final Review 记录位于 `.memory/reviews/2026-07-16-chapter-10-final-review.md`。
- 第 11 章 Research Brief 与候选资料已完成：实际读取 MCP 当前 Tools 草案、OpenAI Function Calling、Anthropic 工具定义和 JSON Schema 规范页；来源事实、本书 Tool Contract 模型、以及后续图示/示例/运行时未实施边界已分开。工件位于 `docs/part-02-components/11-tool-use-and-tool-protocols.research.md` 与 `.references.md`。
- 第 11 章 Chapter Outline 已完成：模型候选、工具描述、调用请求、关联结果、错误层次、效果不确定性和书稿元数据案例均拆成逐节读者问题、证据边界、计划工件和验证；图示、示例、测试和运行时仍未创建。工件位于 `docs/part-02-components/11-tool-use-and-tool-protocols.outline.md`。
- 第 11 章原创 First Draft 已完成：写作日重新读取 REF-036 至 REF-039，以候选与执行分离、Tool Descriptor、Schema 准入、Invocation Request、调用关联、Result Envelope、错误层次、Effect Uncertainty 与书稿元数据教学案例组织正文；图示、纯内存示例、真实工具运行时与后续审查仍未实施。工件位于 `docs/part-02-components/11-tool-use-and-tool-protocols.md`。
- 第 11 章 Technical Review 已完成：重新读取 REF-036 至 REF-039，拆分 MCP Tools 草案与 2025-11-25 Schema Reference 的支持范围，把应用侧参数校验收束为本书规则，修正 Outline 阶段漂移并补齐全局术语。审查记录位于 `.memory/reviews/2026-07-16-chapter-11-technical-review.md`；图示、示例、MCP/SDK 和真实工具运行时仍未实现。
- 第 11 章 Example Implementation 已完成：`assessToolInvocation` 先以模块缺失建立红灯，再通过 7 项 Node 内置测试和演示检查未知工具、参数形状、只读候选、写入批准、关联冲突、效果未知与未验证结果；示例只处理注入对象，不调用真实 Tool、MCP、SDK、文件、网络、权限或外部系统。记录位于 `.memory/reviews/2026-07-16-chapter-11-example-integration.md`。
- 第 11 章 Diagram Review 已完成：`chapter-11-tool-invocation-sequence.mmd` 已由 Mermaid CLI 11.16.0 导出白色背景、两倍缩放的 SVG/PNG 并实际查看；正文 Mermaid 块、图源、导出链接、替代描述和读图结论一致。图只表达本书模型，未表示真实 Tool、MCP、SDK、权限、批准、外部目标、回读、验收或外部效果。记录位于 `.memory/reviews/2026-07-16-chapter-11-diagram-review.md`。
- 第 11 章 Fact Check 已完成：重读 REF-036 至 REF-039，逐项登记当前 MCP Tools 草案、版本化 Schema、OpenAI、Anthropic 与 JSON Schema 的允许陈述、外推禁区和动态复核条件；重跑 7 项纯内存测试与演示。记录位于 `docs/part-02-components/11-tool-use-and-tool-protocols.fact-check.md`。
- 第 11 章 Language Editing 已完成：统一判断链的中文表达、图示替代描述和示例说明，未改变来源范围、示例接口或 Mermaid 语义。记录位于 `.memory/reviews/2026-07-16-chapter-11-language-edit.md`。
- 第 1 章 Research Brief 已建立，REF-001 与 REF-002 已核验并登记。
- 第 1 章详细提纲、事实核验清单、计划示例、候选资料和 `diagrams/mermaid/chapter-01-prompt-to-harness.mmd` 已建立；REF-003 与 REF-004 已登记为候选来源。
- 第 1 章原创正文初稿已写入 `docs/part-01-foundations/01-prompt-to-harness.md`；正文只使用于 2026-07-15 复核的 REF-001 至 REF-004 的限定范围。
- `examples/agent/minimal-harness.mjs` 与 4 项内置 Node 测试已建立；示例不访问模型、网络、文件系统或真实密钥。
- 第 2 章原创正文初稿与 Research Brief、Outline、事实核验清单、候选参考资料和 Mermaid 源文件已写入；四层架构明确为本书工作模型，REF-001、REF-003 与 REF-004 于 2026-07-15 复核。
- 第 1 章 Technical Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-01-technical-review.md`；最小 Harness 测试现在直接断言空指令不会触发工具。
- 第 2 章 Technical Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-02-technical-review.md`；概念示例明确标注假设和预期观察，全局引用登记与 2026-07-15 来源复核对齐。
- 第 1 章 Example Implementation 已完成，记录于 `.memory/reviews/2026-07-15-chapter-01-example-integration.md`；`npm run test:harness` 的 4 项测试与 `npm run example:harness` 均已实际执行。
- 第 2 章 Example Implementation 已完成，记录于 `.memory/reviews/2026-07-15-chapter-02-example-integration.md`；`npm run test:runtime-boundaries` 的 4 项测试与 `npm run example:runtime-boundaries` 均已实际执行。Runtime 为纯内存模拟，不代表真实权限行为。
- 第 1 章 Diagram Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-01-diagram-review.md`；一次性 Mermaid CLI 11.16.0 已导出 `chapter-01-prompt-to-harness.svg` 与 `.png`，并实际查看 PNG。拒绝路径已改为先记录证据再回写状态。
- 第 2 章 Diagram Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-02-diagram-review.md`；一次性 Mermaid CLI 11.16.0 已导出 `chapter-02-agent-harness-runtime.svg` 与 `.png`，并实际查看 PNG。正文补充了导出链接和替代描述。
- 第 1 章 Fact Check 已完成，记录于 `.memory/reviews/2026-07-15-chapter-01-fact-check.md`；本次访问 REF-001 至 REF-004 的原始 URL，重新运行最小 Harness 测试和演示，并将 ReAct 参考资料改为可追溯的 v3（2023-03-10）。
- 第 2 章 Fact Check 已完成，记录于 `.memory/reviews/2026-07-15-chapter-02-fact-check.md`；本次访问 REF-001、REF-003、REF-004 的原始 URL，重新运行运行边界测试和演示，并保留四层模型与教学场景的非事实边界。
- 第 1 章 Language Editing 已完成，记录于 `.memory/reviews/2026-07-15-chapter-01-language-edit.md`；编辑仅涉及表达、术语呈现和图文叙述衔接，未改变来源归因、示例行为或图示接口。
- 第 2 章 Language Editing 已完成，记录于 `.memory/reviews/2026-07-15-chapter-02-language-edit.md`；编辑仅涉及表达、术语呈现和图文叙述衔接，未改变来源归因、四层责任模型、示例行为或图示接口。
- 第 1 章 Final Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-01-final-review.md`；修正 Outline 状态漂移，并重新运行示例、演示、Mermaid 渲染、完整校验和空白 diff 检查。
- 第 2 章 Final Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-02-final-review.md`；修正 Outline 状态漂移，并重新运行运行边界示例、演示、Mermaid 渲染、完整校验和空白 diff 检查。
- 第 2 章已补充“未证实、候选拒绝、运行环境阻塞、验证拒绝、验证接受”的结论状态语义；“未证实”只表示证据无法定位，不推断外部动作。该词表属于本书工程模型，未改变运行边界示例或图示接口；记录于 `.memory/reviews/2026-07-15-chapter-02-state-semantics-revision.md`。
- 第 2 章已补充 Attempt Trace：以 `attempt_id` 将候选、决策、执行请求、观察与验证限定为同一次尝试，并规定关联缺失时不能拼接因果链；它不是产品事件格式或通用追踪标准。纯内存示例和 Mermaid 图未改变；记录于 `.memory/reviews/2026-07-15-chapter-02-attempt-trace-revision.md`。
- 第 3 章 Research Brief 与候选参考资料已完成；REF-005、REF-006 分别限定 Codex 的 `AGENTS.md` 项目指令行为和 Claude Code 的 `CLAUDE.md` 持久指令上下文，目录模型明确为本书工程扩展。
- 第 3 章 Chapter Outline 已完成；它将恢复性、目录职责、阅读顺序、交接、状态冲突和权限边界拆为可审查小节，并把第 3 章图示、示例和事实核验的输入输出边界写明。
- 第 3 章 Fact Check 已完成；REF-005、REF-006 与 REF-001 均于 2026-07-15 重新读取，产品行为、来源背景、本书工程模型和未核验范围已逐项分开。
- 第 3 章图示与示例规划已完成；`chapter-03-repository-context-flow.mmd` 只表达本书恢复工作流，`03-repository-as-agent-context.example-plan.md` 定义纯内存预检边界，二者均不表示真实权限或产品行为。
- 第 3 章原创正文初稿已完成；正文把产品指令事实、本书目录模型、教学案例和未验证示例明确分层。Technical Review 应先检查这些边界，再允许实施示例或导出图示。
- 第 3 章 Technical Review 已完成；修复了 Draft 校验待办和 Fact Check 历史时点两处状态漂移，未发现来源归因、权限边界、示例阶段语义或章节依赖的阻塞问题。下一步只能实现纯内存预检示例。
- 第 3 章 Example Implementation 已完成；`context-recovery.mjs` 与 5 项 Node 内置测试均实际运行。示例只检查注入快照，不读取真实仓库、不调用模型或工具，仍不能描述为产品指令发现或权限控制。
- 第 3 章 Diagram Review 已完成；Mermaid CLI 11.16.0 已导出 `chapter-03-repository-context-flow.svg` 与 `.png`，并实际查看 PNG。图示的目录恢复工作流、虚线证据反馈与正文读图说明一致，且不代表权限控制。
- 第 3 章 Language Editing 已完成；统一章节编号、交接术语、图示导语与初稿阶段验证记录，未改变来源归因、示例行为、图示接口或技术结论。
- 第 3 章 Final Review 已完成；修正示例说明中不存在的 `nextTask`、`artifacts.outline` 与 `artifacts.factCheck` 字段，使文档与纯内存 `recoverTask` 实际接口一致。最终项目校验结果见本次交接的验证状态。
- 第 4 章 Research Brief 与 Chapter Outline 已完成；六条可靠性原则、来源边界、受控配置修改案例、图示和示例的输入输出边界已明确。
- 第 4 章 Fact Check 已完成；`chapter-04-reliability-loop.mmd` 只表达本书可靠性闭环，不代表真实权限或产品架构。
- 第 4 章 Example Implementation 已完成：`controlled-config-change.mjs` 与 5 项 Node 内置测试均实际运行；示例只检查注入的内存快照，不读取或写入真实配置、不调用模型或工具，仍不能描述为真实权限、写入或审批控制。红灯、绿灯、实际命令与边界记录于 `.memory/reviews/2026-07-15-chapter-04-example-integration.md`。
- 第 4 章原创正文初稿已完成；正文的来源事实、本书工程原则和教学案例分层，图示审查后的导出文件仍只表达本书工程模型。
- 第 4 章 Technical Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-04-technical-review.md`；已重新限定来源范围，并修正第 11 章 stable slug、Outline 阶段与项目上下文漂移。
- 第 4 章 Diagram Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-04-diagram-review.md`；Mermaid CLI 11.16.0 已导出 `chapter-04-reliability-loop.svg` 与 `.png`，并实际查看 PNG。预检节点的自动断词已通过明确换行修正，源码与正文 Mermaid 块保持一致。
- 第 4 章 Language Editing 已完成，记录于 `.memory/reviews/2026-07-15-chapter-04-language-edit.md`；编辑只收束阶段语义、具体主语、因果和图文术语，未修改来源范围、示例接口、Mermaid 源码或导出图。
- 第 4 章 Final Review 已完成，记录于 `.memory/reviews/2026-07-15-chapter-04-final-review.md`；修正已实现示例仍标为“计划”的跨工件漂移，并重新运行 5 项测试、接受路径演示、Mermaid SVG/PNG 导出、正文图源一致性检查和全仓校验。
- 第 5 章 Research Brief 与候选参考资料已完成；REF-005、REF-006、REF-010 至 REF-014 均于 2026-07-15 访问，产品专属事实与本书指令分层模型已分开。正文、图示和示例尚未开始。
- 第 5 章 Chapter Outline 已完成；它将 Prompt 碎片化、内容分类、产品指令边界、冲突装配、输出契约、回归检查和代码审查教学案例拆为可审查小节，并明确图示、示例和正文不得越过的证据边界。
- 第 5 章 Fact Check 与 Mermaid 图源已完成；REF-005、REF-006、REF-010 至 REF-014 已在 2026-07-15 重新读取，`chapter-05-instruction-assembly.mmd` 只表达本书的装配、冲突与独立验证流程，未导出或进行视觉审查。
- 第 5 章纯内存示例计划与实现已完成；`assembleInstructionPacket` 的输入、输出、五条确定性路径、npm scripts 与运行记录均已建立，且不含真实 I/O、模型调用或权限控制。
- 第 5 章原创正文初稿已完成；产品事实、本书工程模型、代码审查教学案例和未验证范围保持分层，图源尚未导出。Technical Review 已检查来源外推、图文一致性、阶段语义和与第 6、7、10、11、12、14 章的边界。
- 第 5 章 Technical Review 已完成；三项状态或源一致性问题已修正，来源边界、示例阶段语义和相邻章节责任无阻塞。
- 第 5 章 Example Implementation 已完成；`instruction-packet.mjs` 与 5 项 Node 内置测试均已实际运行。示例只处理注入的内存对象，不读取真实仓库、不调用模型、工具或网络，不能描述为产品消息优先级、安全防护或真实权限控制。
- 第 5 章 Diagram Review 已完成；Mermaid CLI 11.16.0 已导出 `chapter-05-instruction-assembly.svg` 与 `.png`，并实际查看 PNG。四类输入、来源与范围裁决、交付、升级和虚线反馈均与正文一致，且不代表产品内部行为或真实权限控制。
- 第 5 章 Language Editing 已完成；编辑仅收束具体主语、因果、责任术语、渐进增强边界和阶段记录，未改变来源、示例、Mermaid 源或导出图。
- 第 5 章 Final Review 已完成；重新运行纯内存示例测试与演示、Mermaid SVG/PNG 导出、图源一致性检查和完整工具链，未发现跨工件状态漂移。
- 第 7 章 Research Brief、候选参考资料、Chapter Outline、Fact Check、Mermaid 图源、Example Implementation、Diagram Review、First Draft、Technical Review、Language Editing 与 Final Review 已完成；REF-006、REF-020 至 REF-023 限定 Claude Code、OpenAI Agents SDK、LangChain/LangGraph 与 MemGPT 的 memory 相关陈述，资料分类、Memory Record、写入/读取门槛和生命周期是本书工程模型，未将其外推为通用架构。`decideMemoryRecord` 已通过 6 项 Node 内置测试和演示，生命周期图已导出 SVG/PNG 并完成视觉审查。
- 第 8 章已完成 Research Brief、候选资料、Chapter Outline、First Draft、Technical Review、纯内存 Example Implementation、SVG/PNG Diagram Review 与 Fact Check；REF-024 至 REF-027 仅在各自规范或产品范围内使用，Skill Contract、生命周期、选择状态与 Markdown 审查案例仍是本书模型。`evaluateSkillSelection` 的 6 项测试和演示只处理注入对象，不代表真实 Skill、授权、Tool、Plugin 或审查流程。
- 第 8 章 Final Review 已完成：重新运行专用测试、演示、Mermaid SVG/PNG 渲染、正文图源一致性检查和完整项目校验；记录位于 `.memory/reviews/2026-07-15-chapter-08-final-review.md`。章节已标记完成。
- 第 9 章 Research Brief 与候选参考资料已完成：Plan-and-Solve、ReAct、Anthropic workflow/agent 工程建议和 OpenAI Agents SDK orchestration 的来源范围、允许用途、外推禁区与写作日复核要求已登记；正文、图示、示例和审查尚未开始。
- 第 9 章 Chapter Outline 已完成：逐节定义 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例；正文、图源、示例与审查仍未开始。
- 第 9 章 First Draft 已完成：写作日重新读取 REF-004、REF-028 至 REF-030，原创正文分离论文与产品范围、本书任务分解模型和未实施工件；图源、示例和审查仍未开始。
- 第 9 章 Technical Review 已完成：修正计划摘要（Plan Brief）、任务卡（Task Card）、应用程序接口（Application Programming Interface，API）与技能契约（Skill Contract）的术语首现；来源、阶段状态与相邻章节责任均无阻塞，记录位于 `.memory/reviews/2026-07-15-chapter-09-technical-review.md`。
- 第 9 章 Example Implementation 已完成：`assessTaskPlan` 的模块缺失红灯、6 项 Node 内置测试与演示均已实际运行；示例只检查注入的 Plan Brief、任务卡、依赖、效果批准快照和资源标签，不生成计划、不调度任务，也不访问真实 API、文件、网络、凭证或权限系统。记录位于 `.memory/reviews/2026-07-15-chapter-09-example-integration.md`。
- 第 9 章 Diagram Review 已完成：Mermaid CLI 11.16.0 导出 `chapter-09-plan-to-task-graph.svg` 与 `.png` 并实际查看 PNG；正文图源、替代描述与导出链接一致，且不把计划、候选、批准或观察写成真实执行、授权或验证。记录位于 `.memory/reviews/2026-07-15-chapter-09-diagram-review.md`。
- 第 9 章 Fact Check 已完成：重读 REF-004、REF-028 至 REF-030，保留论文、工程文章与 Python SDK 文档的限定范围，并重跑 6 项纯内存测试和演示；记录位于 `09-planning-and-task-decomposition.fact-check.md`。
- 第 9 章 Language Editing 与 Final Review 已完成：统一术语、主语、时态与段落节奏，重新运行示例、图示导出、图源一致性检查、完整校验和 diff 检查；记录位于 `.memory/reviews/2026-07-15-chapter-09-language-edit.md` 与 `.memory/reviews/2026-07-15-chapter-09-final-review.md`。

## 历史下一步（已完成）

1. 第 29 章 Technical Review 及其后续阶段均已完成。
2. 第 30 至 47 章的局部生产、共享集成与章节终审均已完成；当前任务只以文件顶部的“当前交接点”和 `NEXT_TASK.md` 为准。

## 交接记录模板

- 日期：`YYYY-MM-DD`
- 任务：
- 已变更文件：
- 已执行验证及结果：
- 未验证范围与原因：
- 风险或待决策事项：
- 下一位应先读：
