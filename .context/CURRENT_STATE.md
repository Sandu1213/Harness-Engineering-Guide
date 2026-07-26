# Current State

## 当前状态

### Pi Agent 借鉴点专项增补（2026-07-26）

- 已核对 REF-148 至 REF-152 及现有未提交书稿改动；当前证据已覆盖 pi 的 README、作者构建札记、MCP/CLI 文章、第三方实践观察和官方 extensions／sessions／compaction 文档，因此本轮未重复外部查询。
- Pi 设计样本已落入第 5、10、11、12、19、23、24、26、36、40、42 章，覆盖最小 Prompt/工具面、会话树、工具结果双视图、安全架构对照、上下文压缩、自我扩展、工具交付 token 经济学、子代理边界、设计模式选型、供应商抽象和提示词版本治理。
- 第 10 章新增“会话即树”，第 12 章新增“三种安全架构对照”；11 章的 front matter、正文内联 REF、`.references.md`、`.fact-check.md` 与 `.ai/references.md` 分配区已同步。第 36 章借鉴矩阵继续区分可直接借鉴、必须补充护栏与不应照搬的结论；这些内容不表示本仓库运行、移植或基准测试过 pi。
- 逐章 Markdown 校验均为 0 error；11 章共 27 组 REF 在 front matter、正文、`.references.md`、`.fact-check.md` 与 `.ai/references.md` 分配区一致。`npm run validate` 退出码 0，检查 630 个 Markdown 文件、全仓链接、章节示例测试与 47/47 章节状态；`npm run site:build && npm run site:check` 退出码 0，308 个 HTML 页面无缺失本地链接。
- 浏览器已对第 10、12 章新增小节和首轮复查后受影响的第 11、23、24、26、36 章完成“快照 → 点击小节永久链接 → 重新快照”，标题可见、URL 锚点正确；最终 Playwright 控制台 0 错误、0 警告。Impeccable 仅报告既有全章文本的破折号 warning 与编号 advisory，本轮新增 diff 未引入对应模式。
- Claude Code 首轮复查给出 4 项 must_fix、6 项 should_fix 与 3 项 suggestion，均已修正；二次只读复查结论为 `PASS`，确认计划符合性、来源边界、作者主语、引用一致性和禁止事项均已收口。
- 项目版本、Changelog、README 与出版说明已同步为 `0.2.0`。`npm run release:build` 已生成 308 页站点、A4 510 页本地 PDF 与 EPUB；PDF 字体全部嵌入，目检第 1、93、94、118、510 页未见裁切、重叠或乱码；EPUB 的 `unzip -t` 与 EPUBCheck 5.3.0 均通过，后者为 0 fatal、0 error、0 warning、0 info。最终 `npm run validate` 退出码 0，检查 630 个 Markdown 文件、全仓链接、章节示例测试与 47/47 章节状态。
- `v0.2.0` 已从提交 `8b43aa6` 发布为 Latest Release。`Deploy reading site`、`Attach books to release`、Markdown lint 与 link check 工作流均成功；线上站点已完成“首页快照 → 点击开始阅读第一章 → 第一章快照”，并在第 10 章完成“定位会话即树 → 点击永久链接 → 锚点 URL 与重新快照”验证。远端 PDF 为 A4 521 页，Noto CJK 字体全部嵌入，目检第 1、95、96、120、521 页通过；远端 EPUB 解压与 EPUBCheck 5.3.0 均通过。GitHub 附件 digest 分别为 PDF `sha256:2cec20c1896476ef3b6b34f1b0ef8db85b7e5adc379076e9ec96452b9fd075f2`、EPUB `sha256:689c80c0319336d1f82f49a9e959756386da46b67ca0b70f14d65ba18f1af7a2`，与独立下载文件一致。

### Release 归档与在线站点自动化（2026-07-26）

- 新增 `.github/workflows/deploy-pages.yml`：`main` 更新后使用 GitHub Pages 官方 Actions 构建 VitePress、检查产物链接并部署站点。站点通过 `SITE_BASE` 适配 Pages 子路径；以 `/Harness-Engineering-Guide/` 生产构建时生成 308 个 HTML 页面，`npm run site:check` 得到 0 条缺失本地链接。
- 新增 `.github/workflows/release-publications.yml`：GitHub Release 发布后检出其标签提交，以 Pandoc 3.10、Typst 0.15.1 和 Noto CJK 字体生成 PDF/EPUB；构建 Job 只有只读权限，独立上传 Job 才拥有 Release 写权限。首个 Release 的构建、PDF/EPUB 校验和 Actions artifact 均成功；上传 Job 首次因工作目录没有 `.git` 且命令未显式指定仓库而失败，已在 `8c7da37` 中加入 `--repo` 修复，首版附件使用同一命令和原始 CI artifact 补传成功。
- GitHub Pages 已启用并部署至 `https://sandu1213.github.io/Harness-Engineering-Guide/`。线上站点已用 `playwright-cli` 完成“首页快照 → 点击开始阅读第一章 → 第一章快照”，最终 URL 保留 `/Harness-Engineering-Guide/` 前缀，浏览器控制台 0 错误、0 警告；`impeccable detect --json docs/.vitepress/dist/index.html` 返回 `[]`。
- `npm run publication:all` 重新生成 A4 497 页 PDF 与 EPUB；PDF 由 Poppler 确认字体嵌入，并目检第 1、3、120、300、497 页无裁切、重叠或乱码；EPUB 的 `unzip -t` 与 EPUBCheck 5.3.0 均通过，后者为 0 fatal、0 error、0 warning、0 info。
- `npm run validate` 最终以退出码 0 完成：629 个 Markdown 文件 lint 0 错误，全仓本地链接、4 项出版管线测试、47 组章节示例测试与 47/47 章节状态检查通过。首轮曾因首页 3 个 Pages 相对链接被 Markdown 文件检查器误判而失败，加入 3 条精确忽略规则后定向检查与全仓复验均通过。
- GitHub About 已设置在线阅读地址。`v0.1.0` 中文首版已发布，标签锁定 `8894896`，许可证为仓库既有 MIT；Release 中的 PDF 为 A4、505 页且字体全部嵌入，抽检第 1、253、505 页无裁切、重叠或乱码，EPUB 解压检查通过。两个附件的 GitHub digest 与下载自 CI 的原始 artifact SHA-256 一致。

### 本地出版工件收口（2026-07-18）

- VitePress 网站已实现，共生成 308 个 HTML 页面；主导航严格展示 47 章与 12 附录，研究、提纲、事实核验等支持页保留可访问但不进入主导航。`npm run site:build` 退出码 0，`npm run site:check` 检查全部生成页后得到 0 条缺失本地链接。
- 浏览器 E2E 使用 `playwright-cli` 对 `http://127.0.0.1:5173/` 完成“首页快照 -> 点击开始阅读第一章 -> 第一章快照”，随后点击 PNG 图示并确认新页面包含 1 张自然宽度 784 px 的图片；`impeccable detect --json http://127.0.0.1:5173/` 最终返回空数组。
- PDF 由 Pandoc 3.10 + Typst 0.15.1 生成到 `output/pdf/harness-engineering-guide.pdf`：A4、497 页、约 15 MB，中文与代码字体均已嵌入。已用 Poppler 抽检封面、目录、正文、宽表、代码、附录与末页，未见裁切、重叠或乱码。
- EPUB 生成到 `output/epub/harness-engineering-guide.epub`，包含 47 张 PNG 主图；`unzip -t` 通过，EPUBCheck 5.3.0 按 EPUB 3.3 规则检查为 0 fatal、0 error、0 warning、0 info。
- 出版管线收口后，`npm run validate` 以退出码 0 完成：628 个源 Markdown 文件 lint 0 错误，全仓本地链接、47 组章节示例测试与 47/47 状态检查通过；共享参考表的 132 个外部来源由 `npm run check:reference-links` 独立检查并通过，421 项示例断言汇总为 0 失败。
- 三种发布形态共享 `publication/book-manifest.mjs` 的唯一内容顺序。构建产物已忽略，不纳入 Git。正式域名部署、版本标签、发行页上传与书稿发布许可证仍未执行。

### 最终内容收口（2026-07-17）

- 第 1 至 47 章的 Research、Outline、Draft、Technical Review、Example Implementation、Diagram Review、Fact Check、Language Editing 与 Final Review 已全部完成；47 份正文、47 组研究/提纲/引用/事实核验/示例计划、47 个测试文件、47 组 Mermaid/SVG/PNG 与47份章节终审记录已经齐备。
- 附录 A 至 L 已完成内容生产，并按 A–D、E–H、I–L 三组完成独立 Final Review。附录作为读者适配层，不复制 `.ai/glossary.md`、`.ai/references.md` 或项目模板形成第二事实源。
- 47 章正文 front matter 的终态已统一为模板规定的 `status: "complete"`；正文声明的图示和示例路径已通过存在性检查。最终全仓 `npm run validate` 以退出码 0 完成：627 个 Markdown 文件、0 个 lint 错误，全部链接、47 组章节测试与 47/47 状态检查通过；另行汇总运行 421 项示例断言，全部通过。
- 全书内容源完成审计见 `.memory/reviews/2026-07-17-full-book-content-completion-audit.md`。当前没有未完成的内容生产任务；所有示例与图示只证明书稿和注入的教学对象，不代表外部系统、审批、权限、发布或业务结果。当时网站、PDF、EPUB 尚未实现，现已由上方 2026-07-18 出版工件记录接续。

### 历史记录

- 项目骨架已建立；第 1 至 38 章均已完成 Research、Outline、Draft、Technical Review、Example Implementation、Diagram Review、Fact Check、Language Editing 与 Final Review，并具有可追溯的正文、图示、示例、来源和审查记录。
- 2026-07-17：第 33 至 38 章的 Final Review 已由并行工作完成。六章分别重跑专用纯内存测试与演示，共 47 项测试通过、0 项失败；正文 Mermaid 块与图源一致，现有 PNG 已实际查看，章节 front matter、示例路径、引用边界和完成检查表已收口。随后全仓 `npm run validate` 以退出码 0 完成：Markdown lint 检查 505 个文件、0 个错误，链接检查、38 组示例测试和章节状态检查均通过（38 章完成、9 章未开始）。第 39 至 42 章现已完成 Research Brief 与 Chapter Outline；第 39、40、42 章 First Draft 已完成并进入 Technical Review，第 41 章 First Draft 正在收口。所有结果仅证明书稿与注入的纯内存教学对象，不代表真实产品、审批、实验、权限、同步、企业系统或外部效果。
- 第 24 至 28 章的并行工件已由主线程统一收口：REF-086 至 REF-091 与复用来源、术语、npm 入口、出版目录和状态均已写入。第 24 章把协议能力、来源、准入、调用、观察和效果验证分开；第 25 章只检验注入的浏览器证据链；第 26 章将局部所有权与集中集成分开；第 27 章把 Git/worktree/diff/审查的责任分开；第 28 章给出无副作用的最小准入器。2026-07-16 已实际执行 `npm run validate` 并以退出码 0 完成：Markdown lint 检查 386 个文件、0 个错误，链接检查、28 组示例测试与章节状态检查均通过；另行执行全量 Node 测试，28 个测试文件共 221 项通过、0 项失败；`git diff --check` 无输出、退出码 0。本书的所有示例、图示和质量门都不代表真实产品、CI、Hook、MCP、Git、权限或外部系统能力已验证。
- 书籍大纲已规划，并将原始 58 个细粒度主题收敛为 47 个覆盖完整、依赖更清晰的章节。
- 初始任务的 P0 项目已补齐。第 29 章现已完成全部九个章节阶段：已重新读取 Anthropic、Git、GitHub 和 Node 的一手资料，登记复用的 REF-029、REF-088 至 REF-090，并将软件变更交付包及其六类工件作为本书工程模型登记到术语表。技术审查复核正文、逐节蓝图、来源、术语、示例/测试源、Mermaid 图源与章节边界，并修正完成检查表的状态漂移；`assessSoftwareChangeDelivery` 通过 10 项 Node 内置测试与演示，且已纳入 npm 命令和总校验；图已重新导出 SVG/PNG、查看 PNG 并比较正文图块与图源；事实核验把四项官方来源、正式映射、本书模型、案例与运行证据分开；语言审阅确认术语、主语、时态和图文衔接一致；最终审查重新运行专用测试/演示并重建、查看图示。下一项为第 30 章 Research Brief。必须继续区分来源明确的产品或论文事实、本书工程模型和教学案例，且不得把动态产品行为写成跨产品结论。
- 第 30 章 Research Brief 已完成：写作日重读 Flutter 的 Testing Overview、表单校验和集成测试官方页，以及 Node Test runner/CLI；CH30-REF-01 至 CH30-REF-04 已映射 REF-092、REF-093、REF-094、REF-090。Flutter 的测试分类、表单 API 示例和设备/模拟器运行语境仅用作受限背景；Delivery Contract、State Model、Test Matrix、Observation Record 和 Report Contract 是本书模型，未创建 Flutter 项目、凭证、设备、模拟器、网络或测试报告。下一项为第 30 章 Chapter Outline。
- 第 30 章 Chapter Outline 已完成：把交付契约、状态模型、分层测试、观察与报告、应用交付门、纯内存准入器、图示断点、三场景案例和渐进增强展开为逐节蓝图；每节均标出允许的 Flutter/Node 来源、本书工件、最小证据和未运行边界。下一项为第 30 章 First Draft；不得在草稿前把计划、图示或 Node 示例写成 Flutter、设备、模拟器、网络、凭证或测试报告已执行。
- 第 30 章 First Draft 已完成：正文以虚构 Flutter 登录三场景组织交付契约、状态模型、测试矩阵、观察记录和报告契约，并将 Flutter 文档中的测试/表单/集成测试语境与本书模型分开；图示、纯内存实现、Node 测试和所有真实移动环境仍未实施。下一项为第 30 章 Technical Review。
- 第 30 章 Technical Review 已完成：重读四项 Flutter/Node 官方资料，核对正文对测试分类、`FormState.validate()`、设备/模拟器运行语境和 Node 测试入口的限定陈述；没有来源、术语或阶段时态问题。下一项为第 30 章 Example Implementation。
- 第 30 章 Example Implementation 已完成：`assessFlutterLoginDelivery` 只审查注入的交付计划；保留实现前 `ERR_MODULE_NOT_FOUND` 红灯，随后以 8 项 Node 测试通过、0 项失败和 `executionPerformed: false` 的演示收口。npm 命令、总校验入口和示例清单已登记；未执行 Flutter、Dart、设备、模拟器、网络、认证、文件 I/O 或报告生成。下一项为第 30 章 Diagram Review。
- 第 30 章 Diagram Review 已完成：`chapter-30-flutter-login-delivery-chain.mmd` 由 Mermaid CLI 11.16.0 重新导出 SVG/PNG，1220×2220 PNG 已实际查看，正文 Mermaid 块与图源逐字一致。图只表达本书 Delivery Gate、`ready`、`requires_approval`、计划性报告、Observation Record 与保守停止之间的边界；未运行 Flutter、设备、模拟器、网络、认证或测试报告。下一项为第 30 章 Fact Check。
- 第 30 章 Fact Check 已完成：重读四项 Flutter/Node 官方资料，逐项确认测试分类、`FormState.validate()`、集成测试的设备/模拟器语境、`integration_test`/`WidgetTester`/绑定初始化，以及 `node:test`/`--test` 的限定范围；CH30-REF-01 至 CH30-REF-04 分别映射 REF-092、REF-093、REF-094、REF-090。重新运行纯内存测试得到 8 项通过、0 项失败，演示仍为 `executionPerformed: false`；未运行真实移动环境。下一项为第 30 章 Language Editing。
- 第 30 章 Language Editing 已完成：明确 `success` 为测试场景键、`authenticated` 为对应状态终态，避免与同名的 `validation_error`／`network_error` 标签混淆；术语首现、主体、时态、图示替代描述、表格和第 31/32 章衔接均已核对，未改变来源范围、示例接口、测试结果或 Mermaid 语义。下一项为第 30 章 Final Review。
- 第 30 章 Final Review 已完成：重新运行 8 项专用 Node 测试与无副作用演示，重新导出 SVG/PNG、查看 1220×2220 PNG，并确认正文 Mermaid 块与 `.mmd` 图源逐字一致；来源映射、事实清单、完成检查表、进度与交接均一致。第 30 章所有九个阶段完成；下一项为第 31 章 Research Brief。
- 2026-07-16：第 30 章 Final Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 409 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、17 章未开始）。该校验只证明书稿、图示与纯内存教学对象，不代表 Flutter、设备、模拟器、网络、认证或真实报告已执行。
- 第 31 章 Research Brief 已完成：重读 pytest fixture 与 monkeypatch、Playwright Browser Context、locators 和 assertions 官方资料；CH31-REF-01 至 CH31-REF-05 分别映射 REF-095、REF-096、REF-097、REF-083、REF-082。研究将 API 契约检查、浏览器可见流程、受控替身、Browser Context 隔离、定位器和可重试断言分开；Test Evidence Plan、API Contract Check、UI Flow Evidence、Failure Record 与 Report Gate 是本书研究框架。未创建真实 API、浏览器会话、账户、凭证、CI、报告或测试运行。下一项为第 31 章 Chapter Outline。
- 2026-07-16：第 31 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 411 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖 Research Brief、引用、词表和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络或报告已经运行。
- 第 31 章 Chapter Outline 已完成：把 Test Evidence Plan、API Contract Check、fixture／替身、Browser Context、locator、可重试断言、Failure Record、Report Gate、纯内存准入器、图示断点、同一登录案例和渐进增强展开为逐节蓝图；每节均标出允许来源、本书模型、最小证据和未运行边界。下一项为第 31 章 First Draft。
- 第 31 章 First Draft 已完成：原创正文以虚构登录场景分别组织 API Contract Check 与 UI Flow Evidence，将 pytest fixture／`monkeypatch`、Playwright Browser Context、locator 与可重试断言限定为各自的测试机制；Test Evidence Plan、Failure Record、Report Gate 与纯内存准入器是本书工程模型。图示、示例、pytest、Playwright、API、浏览器、账户、网络、CI、报告与凭证均未实施或运行。下一项为第 31 章 Technical Review。
- 第 31 章 Technical Review 已完成：写作日重读 pytest fixture／`monkeypatch` 与 Playwright Browser Context、locator、assertion 的官方资料，逐项确认 CH31-REF-01 至 CH31-REF-05 对 REF-095、REF-096、REF-097、REF-083、REF-082 的受限映射；补齐正文的前置知识、工作流程、参考资料、完成检查表和空图示／示例元数据。未新增框架事实、图示、示例、pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证运行结论。记录位于 `.memory/reviews/2026-07-16-chapter-31-technical-review.md`；下一项为第 31 章 Example Implementation。
- 第 31 章 Example Implementation 已完成：`assessTestEvidencePlan` 只分类注入的 Test Evidence Plan；实现前以 `ERR_MODULE_NOT_FOUND` 记录红灯，随后专用 Node 测试得到 8 项通过、0 项失败，演示输出 `ready`、`test_evidence_plan_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。npm 入口、总校验、示例计划、正文和示例说明均已登记；未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。记录位于 `.memory/reviews/2026-07-16-chapter-31-example-integration.md`；下一项为第 31 章 Diagram Review。
- 第 31 章 Diagram Review 已完成：`chapter-31-test-evidence-flow.mmd` 已由 Mermaid CLI 11.16.0 导出 SVG 与 1568×1920 PNG，PNG 已实际查看；正文 Mermaid 块与 `.mmd` 图源逐字一致。图只表达 API/UI 证据、Failure Record、Observation Record、Report Gate 和 `requires_approval`，未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。记录位于 `.memory/reviews/2026-07-16-chapter-31-diagram-review.md`；下一项为第 31 章 Fact Check。
- 第 31 章 Fact Check 已完成：重读 pytest fixture／`monkeypatch` 与 Playwright Browser Context、locator、assertion 官方资料，确认 CH31-REF-01 至 CH31-REF-05 对 REF-095、REF-096、REF-097、REF-083、REF-082 的限定映射；重跑专用 Node 测试得到 8 项通过、0 项失败，演示保持 `executionPerformed: false`。来源事实、本书模型、虚构案例、图示与纯内存运行范围已分开记录于 `31-test-automation-harness-pytest-and-playwright.fact-check.md` 和 `.memory/reviews/2026-07-16-chapter-31-fact-check.md`；下一项为第 31 章 Language Editing。
- 第 31 章 Language Editing 已完成：pytest fixture、Browser Context、locator、Failure Record、Report Gate 和 timeout 的首次出现已统一为中文（English）形式，具体主语、时态、图文术语和第 30／32 章衔接均已核对；未改变来源映射、`assessTestEvidencePlan` 接口、8 项 Node 测试结果或 Mermaid 语义。记录位于 `.memory/reviews/2026-07-16-chapter-31-language-edit.md`；下一项为第 31 章 Final Review。
- 第 31 章 Final Review 已完成：重跑 `assessTestEvidencePlan` 的 8 项 Node 测试与无副作用演示，重新导出并实际查看 1568×1920 Mermaid PNG，确认正文 Mermaid 块与 `.mmd` 图源逐字一致；Research、Outline、正文、引用、事实核验、示例、图示、技术审查、语言审阅、完成检查表和交接均已收口。测试与图只证明注入对象和书稿工件；未运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。记录位于 `.memory/reviews/2026-07-16-chapter-31-final-review.md`；下一项为第 32 章 Research Brief。
- 2026-07-16：第 31 章 Final Review 状态收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 421 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、0 章进行中、16 章未开始）。该校验只覆盖书稿工件与纯内存示例；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 第 32 章 Research Brief 已完成：重读 Delta Debugging 原始论文、Google SRE Effective Troubleshooting、Git `bisect` 与 Playwright actionability，确认 CH32-REF-01 至 CH32-REF-04 对 REF-098、REF-099、REF-100、REF-081 的受限映射。Bug Investigation、Reproduction Contract、Hypothesis Record、Fix Candidate、Regression Gate 与 Escalation Record 是本书工程模型；教学案例为虚构的 UI 等待条件问题。未实施或运行 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作。下一项为第 32 章 Chapter Outline。
- 2026-07-16：第 32 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 423 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该校验只覆盖 Research Brief、引用、术语和书稿工件；不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 第 32 章 Chapter Outline 已完成：以症状收集、Reproduction Contract、最小化、模式搜索、Hypothesis Record、Falsifiable Check、Fix Candidate、Regression Gate、Escalation Record、纯内存示例和图示／案例为顺序建立逐节蓝图。每节均分开 CH32-REF-01 至 CH32-REF-04 的允许陈述、本书模型、虚构 UI 等待条件输入和未运行边界；未实施或运行 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作。下一项为第 32 章 First Draft。
- 2026-07-16：第 32 章 Chapter Outline 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 424 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该校验只覆盖 Chapter Outline 与书稿工件；不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 第 32 章 First Draft 已完成：写作日重读 Delta Debugging、Google SRE、Git `bisect` 与 Playwright actionability。正文使用虚构 UI 等待条件失败，完整组织症状、Reproduction Contract、最小化、Hypothesis Record、Falsifiable Check、Fix Candidate、Regression Gate 与 Escalation Record；来源事实、本书模型、教学输入和未运行范围已分开。图示、纯内存示例、测试、Bug 修复与后续审查未实施；下一项为 Technical Review。
- 2026-07-16：第 32 章 First Draft 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 425 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该校验只覆盖原创正文、引用与书稿工件；不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 第 32 章 Technical Review 已完成：重读 CH32-REF-01 至 CH32-REF-04，确认 Delta Debugging、Google SRE、Git `bisect` 与 Playwright actionability 的正文陈述均保留来源限定；将候选修复（Fix Candidate）和升级记录（Escalation Record）补入词表，并修正流程中的术语首现。未创建或运行示例、图示、Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作。审查记录位于 `.memory/reviews/2026-07-16-chapter-32-technical-review.md`；下一项为 Example Implementation。
- 2026-07-16：第 32 章 Technical Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 426 个文件、0 个错误，链接检查、31 组既有 Node.js 示例测试与章节状态检查均通过（31 章完成、1 章进行中、15 章未开始）。该校验只覆盖技术审查、术语与书稿工件；不代表 Bug 修复、测试、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统已经运行。
- 第 32 章 Example Implementation 已完成：`assessBugInvestigation` 先记录 `ERR_MODULE_NOT_FOUND` 红灯，随后专用 Node 内置测试得到 8 项通过、0 项失败；演示输出 `ready`、`bug_investigation_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。实现只判断注入的调查对象，不运行 Bug 修复、pytest、Playwright、浏览器、API、Git bisect、CI、环境、账户、凭证或外部系统动作；记录位于 `.memory/reviews/2026-07-16-chapter-32-example-integration.md`。
- 第 32 章 Diagram Review 已完成：`chapter-32-bug-investigation-flow.mmd` 已由 Mermaid CLI 11.16.0 导出 SVG 与 1518×2828 PNG，PNG 已实际查看，正文 Mermaid 块与图源逐字一致。图只表达症状、复现、最小化、假设、检查、候选修复、回归门与升级记录之间的本书模型，不表示真实修复、测试、Git、浏览器或外部执行；记录位于 `.memory/reviews/2026-07-16-chapter-32-diagram-review.md`。下一项为 Fact Check。
- 第 32 章 Fact Check 已完成：写作日重读 REF-098、REF-099、REF-100 与 REF-081，逐项限定 Delta Debugging、Google SRE 排障、Git `bisect` 与 Playwright actionability 的可归因陈述，并分开本书调查模型、虚构 UI 场景和纯内存运行记录。专用测试重跑为 8 项通过、0 项失败，演示保持 `executionPerformed: false`；未运行真实 Bug 修复、pytest、Playwright、浏览器、API、Git、CI、环境、账户、凭证或外部系统。记录位于 `32-automated-failure-analysis-and-bug-fixing.fact-check.md` 与 `.memory/reviews/2026-07-16-chapter-32-fact-check.md`；下一项为 Language Editing。
- 第 32 章 Language Editing 已完成：统一可证伪检查（Falsifiable Check）、回归门（Regression Gate）、候选修复与已验证修复的术语首现和结论边界，明确只有原失败与候选变化后预期行为都有独立证据时才能作出受限结论；图后断点及第 31／33 章衔接也已收束。未改变来源范围、`assessBugInvestigation` 接口、8 项 Node 测试结果、Mermaid 语义或外部执行边界。记录位于 `.memory/reviews/2026-07-16-chapter-32-language-edit.md`；下一项为 Final Review。
- 第 32 章 Final Review 已完成：重跑 `assessBugInvestigation` 的 8 项 Node 测试与无副作用演示，重新导出并查看 1518×3084 Mermaid PNG，确认正文 Mermaid 块与 `.mmd` 图源逐字一致；审查补齐图中遗漏的 Bug Investigation 节点并同步正文、图源和导出文件。Research、Outline、正文、引用、示例、图示、技术／事实／语言审阅和完成检查表均已收口；未运行真实 Bug 修复、pytest、Playwright、浏览器、API、Git、CI、环境、账户、凭证或外部系统。记录位于 `.memory/reviews/2026-07-16-chapter-32-final-review.md`。
- 第 33 至 38 章的 Research Brief 已并行完成并由主线程整合：第 33 章登记 REF-101 至 REF-105，第 34 章复用 REF-024 并登记 REF-106 至 REF-109，第 35 章登记 REF-110 至 REF-113，第 36 章复用 REF-029 至 REF-031 并登记 REF-114 至 REF-115，第 37、38 章复用既有正式引用。它们仅完成研究、来源限定、后续大纲和纯内存示例计划；尚未开始正文、示例、图示或后续审查。
- 第 33 至 38 章 Chapter Outline 已并行完成：分别以项目记忆层、团队 Skill 治理、企业控制／执行平面、控制流模式卡、Memory／Skill 模式卡以及反思／评估／批准模式卡建立逐节蓝图，并为每一节分开来源可支持陈述、本书工程模型、虚构案例与未执行边界。各章正文、示例、图示和后续审查阶段分别独立跟踪。
- 第 33 章 First Draft 已完成：原创正文以项目记忆层、目录／属性／链接／标签、生命周期、健康检查和同步边界组织虚构第 31 章证据网，并将 REF-101 至 REF-105 的 Obsidian 产品语境与本书模型分开。未创建、读取或写入 vault、Obsidian、Sync、网络、账户、插件、备份、冲突处理或外部系统；下一项为 Technical Review。
- 第 33 章 Technical Review 已完成：重读 CH33-REF-01 至 CH33-REF-05／REF-101 至 REF-105，确认 vault、Properties、links、tags 与 Sync 的产品陈述均保留受限语境；项目记忆层模型、虚构第 31 章证据网和未执行边界已分开。第 32→33、第 33→34／37 衔接无越界，正文无需修订。记录位于 `.memory/reviews/2026-07-16-chapter-33-technical-review.md`；下一项为 Example Implementation。
- 第 34 章 First Draft 已完成：原创正文以登记、契约、准入审查、质量等级、兼容性、反馈与弃用记录组织三项虚构候选 Skill，并将 REF-024、REF-106 至 REF-109 的格式、产品和规范语境与本书治理模型分开。未安装、发布、授权、选择或执行真实 Skill、插件、MCP、网络、浏览器、文件写入、凭证、组织系统或外部系统；下一项为 Technical Review。
- 第 34 章 Technical Review 已完成：重读 REF-024、REF-106 至 REF-109，确认 Skill format、Codex／Anthropic 文档、SemVer 规范、本书治理模型、虚构候选与未运行边界保持分层；第 33／35／37 章衔接无越界。正文仅将过期的验证状态改为“已纳入主线程质量门、Technical Review 后待重跑”。记录位于 `.memory/reviews/2026-07-16-chapter-34-technical-review.md`；下一项为 Example Implementation。
- 第 35 章 First Draft 已完成：原创正文以控制／执行平面、策略决定、租户与数据边界、预算、关联观察与人工升级组织虚构三阶段知识助手，并将 REF-110 至 REF-113 的零信任、多租户、策略和追踪语境与本书企业 Harness 模型分开。未运行企业目录、身份提供方、Kubernetes、OPA、OpenTelemetry、云账户、工单系统、知识库、审计、网络、凭证、审批或外部系统；下一项为 Technical Review。
- 第 35 章 Technical Review 已完成：重读 REF-110 至 REF-113，确认 NIST、Kubernetes、OPA 与 OpenTelemetry 的限定语境、本书企业 Harness 模型、虚构三阶段案例和未执行边界保持分层；第 34→35、35→36 衔接一致。正文测试表已记录本次四项官方资料复核；新增企业控制平面、执行平面、策略决定记录、租户与数据边界、关联观察记录和人工升级门的词表条目。记录位于 `.memory/reviews/2026-07-16-chapter-35-technical-review.md`；下一项为 Example Implementation。
- 第 36 章 First Draft 已完成：原创正文以受控单循环、计划—执行、监督者—工作者、流水线与事件驱动五类模式卡组织虚构文件修复案例，并将 REF-029 至 REF-031、REF-114 至 REF-115 的工程、SDK、产品、规范和运行时语境与本书模式选择模型分开。未运行真实 Agent、模型、队列、事件总线、调度器、工作流引擎、并发工作者、工具、Git、浏览器、CI、文件、网络、账户、凭证或外部系统；下一项为 Technical Review。
- 第 36 章 Technical Review 已完成：重读 REF-029 至 REF-031、REF-114 至 REF-115，确认工程、SDK、产品、规范与 Node 运行时背景均仅作受限来源说明；Pattern Card、结果所有者、选择／停止规则、虚构案例和未执行边界保持本书模型。第 35／37 章衔接一致，正文无需修订。记录位于 `.memory/reviews/2026-07-16-chapter-36-technical-review.md`；下一项为 Example Implementation。
- 第 37 章 First Draft 已完成：原创正文以会话、任务、项目与事件四类记录、只读／提议写入 Skill、版本／替代／弃用和虚构事实核验场景组织 Memory／Skill Pattern Card，并将 REF-020、REF-022、REF-024、REF-025 的产品与规范语境和本书模型分开。未运行真实 Session、数据库、向量检索、嵌入、同步、权限系统、Skill、产品配置、网络、文件、模型、账户、凭证、审批或外部系统；下一项为 Technical Review。
- 第 37 章 Technical Review 已完成：重读 REF-020、REF-022、REF-024、REF-025，确认产品／规范事实、本书 Memory／Skill 模式卡、虚构案例和未执行边界保持分层；第 36 章模式选择及第 38 章候选—评估—批准衔接一致。正文仅将“保存本轮项目”收紧为“保存本轮产生的项”。记录位于 `.memory/reviews/2026-07-16-chapter-37-technical-review.md`；下一项为 Example Implementation。
- 第 38 章 First Draft 已完成：原创正文以五类记录、五张反思／评估／批准模式卡、链接／来源双轨虚构案例和纯内存示例计划组织本章内容，并将来源事实、本书工程模型、虚构教学输入和外部执行边界分开。未运行真实 Agent、评估、审批、重试、外部工具、环境、账户、凭证、网络或外部系统；下一项为 Technical Review。
- 第 38 章 Technical Review 已完成：核对 CH38-REF-01 至 CH38-REF-04 的登记范围及第 37／39 章边界，确认来源事实、本书反思／评估／批准模式卡、虚构案例和未执行边界保持分层。正文修正第 41 至 43 章关联标识，并统一五张模式卡的中文（English）首次呈现。记录位于 `.memory/reviews/2026-07-16-chapter-38-technical-review.md`；下一项为 Example Implementation。
- 2026-07-16：第 32 章 Example Implementation、Diagram Review 与第 33 至 38 章 Research Brief 共享整合后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 441 个文件、0 个错误，链接检查、32 组 Node.js 示例测试与章节状态检查均通过（31 章完成、7 章进行中、9 章未开始）。`bug-investigation-assessment` 为 8 项通过、0 项失败；该结果只验证书稿工件和纯内存教学对象，不代表 Bug 修复、浏览器、Git、API、环境、账户、凭证或外部系统已经运行。
- 2026-07-16：第 32 章 Fact Check 收口与第 33 至 37 章 Outline 新增后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 446 个文件、0 个错误，链接检查、32 组 Node.js 示例测试与章节状态检查均通过（31 章完成、7 章进行中、9 章未开始）。该校验只证明书稿工件和纯内存教学对象；不代表 Bug 修复、浏览器、Git、API、环境、账户、凭证或外部系统已经运行。
- 2026-07-16：第 31 章 Language Editing 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 420 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖语言审阅、术语呈现和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章 Fact Check 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 419 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖事实核验、正式引用映射、纯内存运行记录和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章 Diagram Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 417 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖 Mermaid 源、导出链接、图示审查和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章 Example Implementation 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 416 个文件、0 个错误，链接检查、31 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。新增测试组为 8 项通过、0 项失败。该校验覆盖纯内存示例、npm 入口、正文和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章 Technical Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 414 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖技术审查、正文结构、引用与状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章 First Draft 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 413 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖原创正文、正式引用映射和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 31 章 Chapter Outline 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 412 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（30 章完成、1 章进行中、16 章未开始）。该校验覆盖详细 Outline、来源映射、词表和状态工件；不代表 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证已经运行。
- 2026-07-16：第 30 章 Example Implementation 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、30 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。该校验覆盖纯内存示例及其 npm 入口；不代表 Flutter、设备、模拟器、网络、凭证或真实测试报告已经执行。
- 2026-07-16：第 30 章 First Draft 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。该校验覆盖原创正文、正式引用映射和状态工件；不代表第 30 章示例、图示、审查、Flutter、设备、模拟器、网络、凭证或报告已经完成。
- 2026-07-16：第 30 章 Chapter Outline 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。该校验覆盖详细提纲、引用、词表和状态工件；不代表第 30 章正文、示例、图示、审查或任何 Flutter 环境已经完成。
- 2026-07-16：第 30 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、1 章进行中、17 章未开始）。该校验覆盖本章 Research Brief、正式引用映射、词表和状态工件；不代表 Flutter、设备、模拟器、网络、登录、凭证或报告已执行。
- 2026-07-16：第 29 章 Research Brief 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。另行执行 `node --test examples/agent/software-change-delivery-assessment.test.mjs`，10 项通过、0 项失败；演示输出 `ready_for_review`、`software_change_package_ready`、`request_review` 与 `executionPerformed: false`。`git diff --check` 无输出、退出码 0。以上只验证本书工件和注入的教学对象，不代表真实 Git、CI、PR、权限、浏览器、环境或外部系统。
- 2026-07-16：第 29 章 Chapter Outline 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该校验覆盖详细提纲、来源映射、术语和状态文件的 Markdown 与链接一致性；不代表第 29 章正文、图示、示例、技术审查或真实工程动作已经完成。
- 2026-07-16：第 29 章 First Draft 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该校验覆盖原创正文、正式引用映射和状态工件的 Markdown、链接与既有项目质量门；不代表第 29 章示例实施、图示审查、技术审查、事实核验、语言编辑、最终审查或真实工程动作已经完成。
- 2026-07-16：第 29 章 Technical Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、28 组既有示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该校验覆盖技术审查记录、正文状态修正、进度与交接工件的 Markdown、链接和既有项目质量门；不代表第 29 章 Example Implementation、Diagram Review、Fact Check、Language Editing、Final Review 或真实工程动作已经完成。
- 2026-07-16：第 29 章 Example Implementation 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。新增的 `software-change-delivery-assessment` 组在总校验中为 10 项通过、0 项失败；不代表第 29 章 Diagram Review、Fact Check、Language Editing、Final Review 或真实工程动作已经完成。
- 2026-07-16：第 29 章 Diagram Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该校验覆盖重新导出的图示、图示审查记录和状态工件；不代表第 29 章 Fact Check、Language Editing、Final Review 或真实工程动作已经完成。
- 2026-07-16：第 29 章 Fact Check 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该校验覆盖事实核验清单、正式引用映射、状态和既有质量门；不代表第 29 章 Language Editing、Final Review 或真实工程动作已经完成。
- 2026-07-16：第 29 章 Language Editing 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（28 章完成、1 章进行中、18 章未开始）。该校验覆盖语言审阅记录、正文完成清单与状态工件；不代表第 29 章 Final Review 或真实工程动作已经完成。
- 2026-07-16：第 29 章 Final Review 收口后，`npm run validate` 以退出码 0 完成：Markdown lint 检查 408 个文件、0 个错误，链接检查、29 组 Node.js 示例测试与章节状态检查均通过（29 章完成、0 章进行中、18 章未开始）；`git diff --check` 无输出、退出码 0。该校验覆盖第 29 章最终审查记录、完成状态、下一任务与既有项目质量门；只证明本书工件和注入的教学对象，不代表真实工程动作已经完成。

### 历史：本次初始化的交付

- 建立 Codex 与 Claude Code 共用的入口、规则和启动流程。
- 建立 `.context`、`.memory`、`.ai`、书稿、图示、示例、模板、脚本与 GitHub Actions 目录。
- 配置 Markdown lint、链接检查和本地总校验入口。
- 建立章节工作流、进度表、引用策略与初始任务队列。
- 完成 P0 目录审查，为 47 章补充依赖契约和边界说明。
- 完成初始任务 P0 差距分析，修正状态表语义、README 与 AI 路线图中的过期任务描述，并将状态检查纳入总校验。
- 完成第 1 章 Research Brief，使用两项作者站点的一手来源并区分本书工程扩展。
- 完成第 1 章准备包：详细提纲、可追溯的事实核验清单、Mermaid 计划图源文件、最小 Harness 计划示例，以及四项候选参考资料。
- 建立无模型、无网络、无文件写入的最小 Harness 示例及 4 项内置 Node 测试。
- 完成第 2 章准备包与原创正文初稿：区分模型、Agent、Harness 与运行环境的责任，提供故障归因表、接口草图和原创教学场景；三项一手来源于写作当天复核。
- 完成第 1 章 Technical Review：修正 Research Brief 的过期状态与来源日期、正文示例路径和测试的可观察断言；审查记录位于 `.memory/reviews/2026-07-15-chapter-01-technical-review.md`。
- 完成第 2 章 Technical Review：补充概念示例的假设和预期观察，修正正文验证状态，并同步全局引用登记；审查记录位于 `.memory/reviews/2026-07-15-chapter-02-technical-review.md`。
- 完成第 1 章 Example Implementation：示例计划、正文与运行说明完成整合；四项确定性控制流测试和演示入口于 2026-07-15 实际运行，记录位于 `.memory/reviews/2026-07-15-chapter-01-example-integration.md`。
- 完成第 2 章 Example Implementation：建立纯内存运行边界模拟器，区分候选拒绝、Runtime 拒绝、验证拒绝和验证接受；四项 Node 内置测试与演示入口于 2026-07-15 实际运行，记录位于 `.memory/reviews/2026-07-15-chapter-02-example-integration.md`。
- 完成第 1 章 Diagram Review：使用 Mermaid CLI 11.16.0 实际导出 SVG 与 PNG，并检查图像中的节点、箭头和接受/拒绝路径；记录位于 `.memory/reviews/2026-07-15-chapter-01-diagram-review.md`。
- 完成第 2 章 Diagram Review：使用 Mermaid CLI 11.16.0 实际导出 SVG 与 PNG，并检查图像中的四层节点、两条反馈虚线、观察回流与证据闭环；记录位于 `.memory/reviews/2026-07-15-chapter-02-diagram-review.md`。
- 完成第 1 章 Fact Check：实际重读四项原始来源、重新执行最小 Harness 测试与演示，并将 ReAct 的参考日期改为 arXiv 可追溯的 v3（2023-03-10）；记录位于 `.memory/reviews/2026-07-15-chapter-01-fact-check.md`。
- 完成第 2 章 Fact Check：实际重读三项原始来源、重新执行运行边界示例，并确认四层表和教学场景仍标为本书工程模型或假设；记录位于 `.memory/reviews/2026-07-15-chapter-02-fact-check.md`。
- 完成第 1 章 Language Editing：收束“提议—行动—验证”叙述，统一验证接受与拒绝的证据路径，并更新最近总校验计数；未扩大来源、图示或示例的已核验范围。记录位于 `.memory/reviews/2026-07-15-chapter-01-language-edit.md`。
- 完成第 2 章 Language Editing：收束四层责任、候选与观察的叙述，首次展开 Sandbox 与 CLI，并修复示例链接前的空格；未扩大来源、图示或示例的已核验范围。记录位于 `.memory/reviews/2026-07-15-chapter-02-language-edit.md`。
- 完成第 1 章 Final Review：修正 Outline 中已完成阶段仍为待办的状态漂移，重新运行示例、演示、Mermaid 渲染与完整校验；记录位于 `.memory/reviews/2026-07-15-chapter-01-final-review.md`。
- 完成第 2 章 Final Review：修正 Outline 中已完成阶段仍为待办的状态漂移，重新运行运行边界示例、演示、Mermaid 渲染与完整校验；记录位于 `.memory/reviews/2026-07-15-chapter-02-final-review.md`。
- 完成第 2 章增补修订：正文新增“问题—工件—判定”责任框架、“假设—证据—行动”诊断卡和渐进增强边界；重新核验 REF-004 摘要的限定陈述，并同步 Research Brief、事实核验清单、参考资料与出版目录。示例与图示接口未变，记录位于 `.memory/reviews/2026-07-15-chapter-02-supplemental-revision.md`。
- 完成第 2 章结论状态语义增补：新增“未证实、候选拒绝、运行环境阻塞、验证拒绝、验证接受”词表，明确记录缺失不能反推执行结果；不新增来源事实，也不改变示例或图示接口。运行边界示例 4 项测试、演示、完整项目校验与 diff 检查均已通过；记录位于 `.memory/reviews/2026-07-15-chapter-02-state-semantics-revision.md`。
- 完成第 2 章 Attempt Trace 增补：以 `attempt_id` 串联候选、决策、执行请求、观察与验证，并明确缺失关联时只能标记为未证实；该框架是本书工程模型，不是产品格式或追踪标准。纯内存示例与 Mermaid 图未改动；专用测试、演示和全仓校验的记录位于 `.memory/reviews/2026-07-15-chapter-02-attempt-trace-revision.md`。
- 完成第 8 章 Research Brief 与候选参考资料：复核 Agent Skills Specification、Claude Code Skills、ChatGPT Skills 和 OpenAI Plugins 的限定范围；Skill Contract、生命周期、Markdown 审查案例和权限分层均保持为本书工程模型。工件位于 `docs/part-02-components/08-skills-and-reusable-capabilities.research.md` 与 `.references.md`。
- 完成第 8 章 Chapter Outline：以 Prompt 碎片、最小 Skill 工件、渐进加载、Skill Contract、发现与前置检查、概念与权限边界、测试版本弃用和 Markdown 审查案例组织逐节蓝图；该阶段图示、示例和正文均未开始。工件位于 `docs/part-02-components/08-skills-and-reusable-capabilities.outline.md`。
- 完成第 8 章 First Draft：原创正文以重复 Prompt 的维护缺口、最小工件与渐进加载、Skill Contract、发现与选择、概念与权限边界、测试版本弃用和只读 Markdown 审查案例组织；REF-024 至 REF-027 已于写作日重新读取，示例、图示与后续审查仍明确标为未开始。工件位于 `docs/part-02-components/08-skills-and-reusable-capabilities.md`。
- 完成第 8 章 Technical Review：重读 REF-024 至 REF-027，检查来源范围、概念与权限边界、计划工件状态及跨章节责任；修正技能契约（Skill Contract）的首次术语呈现。记录位于 `.memory/reviews/2026-07-15-chapter-08-technical-review.md`。
- 完成第 8 章 Example Implementation：`evaluateSkillSelection` 只处理注入的 Contract、任务摘要、前置条件和证据，先记录模块缺失红灯，再实际运行 6 项 Node 内置测试和演示；不读取或写入真实文件，不调用模型、Tool、Plugin、Hook、MCP、网络、环境或权限系统。记录位于 `.memory/reviews/2026-07-15-chapter-08-example-integration.md`。
- 完成第 8 章 Diagram Review：`chapter-08-skill-lifecycle.mmd` 已用 Mermaid CLI 11.16.0 实际导出 SVG/PNG 并查看 PNG；正文、图源、导出链接和替代描述一致，图只表达本书模型并保留独立授权边界。记录位于 `.memory/reviews/2026-07-15-chapter-08-diagram-review.md`。
- 完成第 8 章 Fact Check：逐项限定 REF-024 至 REF-027 的来源与产品范围、允许用途和外推禁区，并重跑 `evaluateSkillSelection` 的 6 项纯内存测试和演示；测试和图示不被表述为真实 Skill、权限或审查证据。工件位于 `docs/part-02-components/08-skills-and-reusable-capabilities.fact-check.md`。
- 完成第 8 章 Language Editing：统一中英文术语首次出现、来源段落与授权证据主语，并修正测试小节中图示阶段的状态漂移；未改变来源范围、示例接口或 Mermaid 图示含义。记录位于 `.memory/reviews/2026-07-15-chapter-08-language-edit.md`。
- 完成第 8 章 Final Review：重跑 6 项纯内存测试与演示、Mermaid SVG/PNG 渲染、正文图源一致性检查和完整项目校验；正文、来源、示例、图示、审查记录和状态工件一致。记录位于 `.memory/reviews/2026-07-15-chapter-08-final-review.md`。
- 完成第 9 章 Research Brief 与候选参考资料：限定 Plan-and-Solve、ReAct、Anthropic workflow/agent 工程建议和 OpenAI Agents SDK orchestration 的用途及外推禁区；Plan Brief、任务卡、依赖图、停止条件和案例均为本书工程模型。工件位于 `docs/part-02-components/09-planning-and-task-decomposition.research.md` 与 `.references.md`。
- 完成第 9 章 Chapter Outline：以 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例组织逐节蓝图；图示、示例、案例与验证均明确为计划或教学设计。工件位于 `docs/part-02-components/09-planning-and-task-decomposition.outline.md`。
- 完成第 9 章 First Draft：写作日重新读取 REF-004、REF-028 至 REF-030，以 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例组织原创正文；图示、示例与后续审查仍明确为未开始。工件位于 `docs/part-02-components/09-planning-and-task-decomposition.md`。
- 完成第 9 章 Technical Review：重新限定来源范围，修正计划摘要（Plan Brief）、任务卡（Task Card）、应用程序接口（Application Programming Interface，API）与技能契约（Skill Contract）的术语首现；未实施图示、示例与相邻章节责任均已复核。记录位于 `.memory/reviews/2026-07-15-chapter-09-technical-review.md`。
- 完成第 9 章 Example Implementation：`assessTaskPlan` 先以模块缺失建立红灯，再以 6 项 Node 内置测试和演示检查准备、缺验收、未满足依赖、写入升级、资源冲突与不完整 Brief；模块只处理注入对象，不生成计划、不调度任务，也不访问真实外部系统。记录位于 `.memory/reviews/2026-07-15-chapter-09-example-integration.md`。
- 完成第 9 章 Diagram Review：`chapter-09-plan-to-task-graph.mmd` 已由 Mermaid CLI 11.16.0 导出 SVG/PNG 并查看 PNG；正文、图源、导出链接和替代描述一致，图只表达本书计划模型。记录位于 `.memory/reviews/2026-07-15-chapter-09-diagram-review.md`。
- 完成第 9 章 Fact Check：重新读取 REF-004、REF-028 至 REF-030，限定论文、官方工程建议与 Python SDK 文档的允许用途和外推禁区，并重跑 6 项纯内存测试与演示。工件位于 `docs/part-02-components/09-planning-and-task-decomposition.fact-check.md`。
- 完成第 9 章 Language Editing：统一术语首现、主语、段落节奏和阶段时态，未改变来源范围、示例接口、Mermaid 图源或导出图。记录位于 `.memory/reviews/2026-07-15-chapter-09-language-edit.md`。
- 完成第 9 章 Final Review：重新运行示例、Mermaid SVG/PNG 导出、PNG 视觉检查、正文图源一致性、完整 Markdown 工具链和 diff 检查；正文、来源、示例、图示、审查记录和状态工件一致。记录位于 `.memory/reviews/2026-07-15-chapter-09-final-review.md`。
- 完成第 10 章 Research Brief 与候选参考资料：复核 AWS Step Functions 的状态/错误处理、LangGraph 的 checkpoint/重入/幂等性与 Temporal 的架构限定；Workflow Contract、State Record、交接包、恢复与停止规则均明确为本书工程模型。正文、图示、示例和后续审查尚未开始。工件位于 `docs/part-02-components/10-workflow-and-state-management.research.md` 与 `.references.md`。
- 完成第 10 章 Chapter Outline：逐节定义执行与尝试、Workflow Contract、State Record、Checkpoint、重入、幂等性、错误路径、交接和书籍章节生产案例的读者问题、边界、工件与验证；正文、图示、示例和后续审查仍未开始。工件位于 `docs/part-02-components/10-workflow-and-state-management.outline.md`。
- 完成第 10 章 First Draft：写作日重读 REF-031 至 REF-035，以工作流定义/执行/尝试、Workflow Contract、State Record、Checkpoint、重入与幂等性、错误路径、交接和章节生产案例组织原创正文；AWS、LangGraph 与 Temporal 的陈述仍限定在各自来源范围，图示、示例与真实运行时均未实施。工件位于 `docs/part-02-components/10-workflow-and-state-management.md`。
- 完成第 10 章 Technical Review：写作日重读 REF-031 至 REF-035，复核产品或框架限定语境、本书工程模型、状态/记忆与计划/执行边界、术语首现和未实施工件状态；修正词表、引用登记、Outline 与正文检查表的状态漂移。记录位于 `.memory/reviews/2026-07-16-chapter-10-technical-review.md`。下一项为 Example Implementation（先建立 Example Plan）。
- 完成第 10 章 Example Implementation：`assessWorkflowTransition` 先以 `ERR_MODULE_NOT_FOUND` 建立模块缺失红灯，再实际运行 8 项 Node 内置测试和演示；示例只判断注入的 Workflow Contract、State Record、观察和批准快照，不代表真实工作流、重放、持久化、审批、Tool、权限或外部效果。记录位于 `.memory/reviews/2026-07-16-chapter-10-example-integration.md`。下一项为 Diagram Review。
- 完成第 10 章 Diagram Review：`chapter-10-workflow-state-machine.mmd` 已用 Mermaid CLI 11.16.0 导出 SVG/PNG 并实际查看；图源与正文 Mermaid 块已比较一致，图只表达本书状态、证据、检查点与保守出口模型。记录位于 `.memory/reviews/2026-07-16-chapter-10-diagram-review.md`。下一项为 Fact Check。
- 完成第 10 章 Fact Check：重新读取 REF-031 至 REF-035，建立逐项允许用途、外推禁区、动态复核条件和纯内存示例边界记录；实际重跑 8 项状态迁移测试与演示。工件位于 `docs/part-02-components/10-workflow-and-state-management.fact-check.md`。下一项为 Language Editing。
- 完成第 10 章 Language Editing：统一术语首现、来源段落主语和段落节奏，未改变来源范围、示例接口或 Mermaid 图示含义；记录位于 `.memory/reviews/2026-07-16-chapter-10-language-edit.md`。下一项为 Final Review。
- 完成第 10 章 Final Review：重新运行 8 项纯内存测试、演示、Mermaid SVG/PNG 导出、PNG 视觉检查、正文图源一致性、完整 Markdown 工具链和 diff 检查；正文、来源、示例、图示、审查记录和状态工件一致。记录位于 `.memory/reviews/2026-07-16-chapter-10-final-review.md`。下一项为第 11 章 Research Brief。
- 完成第 11 章 Research Brief 与候选资料：实际读取 MCP 当前 Tools 草案、OpenAI Function Calling、Anthropic 工具定义和 JSON Schema 规范页；研究工件限定工具描述、调用请求、调用记录、结果信封、错误层次和效果不确定性，正文、图示、示例及真实工具运行时均未开始。工件位于 `docs/part-02-components/11-tool-use-and-tool-protocols.research.md` 与 `.references.md`。下一项为 Chapter Outline。
- 完成第 11 章 Chapter Outline：逐节定义模型候选、Tool Descriptor、Invocation Request、Result Envelope、错误层次、效果类别和书稿元数据教学案例的读者问题、来源/模型边界、计划工件和验证；正文、图示、示例及真实工具运行时均未开始。工件位于 `docs/part-02-components/11-tool-use-and-tool-protocols.outline.md`。下一项为 First Draft。
- 完成第 11 章原创 First Draft：写作日实际重读 REF-036 至 REF-039，以候选与执行分离、Tool Descriptor、Schema 与准入门、Invocation Request、调用关联、Result Envelope、错误层次、效果不确定性和书稿元数据教学案例组织原创正文；图示、纯内存示例、真实工具运行时与后续审查均未实施。工件位于 `docs/part-02-components/11-tool-use-and-tool-protocols.md`。下一项为 Technical Review。
- 完成第 7 章 Research Brief 与候选参考资料：重新读取 Claude Code、OpenAI Agents SDK、LangChain/LangGraph 官方文档及 MemGPT 原始论文，限定会话历史、sandbox memory、thread-scoped 状态、跨任务记录与分层记忆的各自范围；工作记忆、长期记忆、Memory Record 与生命周期均明确为本书工程模型。工件位于 `docs/part-02-components/07-working-memory-and-long-term-memory.research.md` 与 `.references.md`。
- 完成第 7 章 Chapter Outline：以资料分类、Working Memory 与 Long-term Memory 边界、Memory Record、写入与读取门槛、生命周期冲突和接手案例组织逐节蓝图；产品或框架来源、本书工程模型和教学案例仍保持分层，未提前写入正文、图源或示例实现。工件位于 `docs/part-02-components/07-working-memory-and-long-term-memory.outline.md`。
- 完成第 7 章 Fact Check：逐项限定 Claude Code、OpenAI Agents SDK、LangChain/LangGraph 与 MemGPT 的 memory 相关陈述、外推禁区与写作当天复核条件；工作记忆、长期记忆、Memory Record、生命周期和教学案例保持为本书工程模型。工件位于 `docs/part-02-components/07-working-memory-and-long-term-memory.fact-check.md`。
- 完成第 7 章 Mermaid 图源：`diagrams/mermaid/chapter-07-memory-record-lifecycle.mmd` 只表达本书的候选、检查、两类记忆、当前证据复核、保留、修订、过期与撤销闭环；Mermaid CLI 11.16.0 已成功语法渲染，尚未导出发布图或完成视觉审查。
- 完成第 7 章 Example Plan：`07-working-memory-and-long-term-memory.example-plan.md` 定义纯内存 `decideMemoryRecord` 的输入、输出、工作/长期候选/阻塞/刷新状态、六条确定性测试路径和无外部副作用边界。
- 完成第 7 章 First Draft：原创正文以资料分类、Working Memory 与 Long-term Memory 边界、Memory Record、写入/读取闸门、生命周期、接手案例与相邻章节责任组织；写作日重读来源，图源语法渲染与示例计划均如实标注为未完成视觉审查或实施。
- 完成第 7 章 Technical Review：修正 Fact Check 对后续工件“尚未发生”的时态漂移；来源范围、本书模型、术语、图文一致性、示例阶段和相邻章节责任已复核，记录位于 `.memory/reviews/2026-07-15-chapter-07-technical-review.md`。
- 完成第 7 章 Example Implementation：`decideMemoryRecord` 的模块缺失红灯、6 项 Node 内置测试与演示均已实际运行；示例只分类注入对象，不读取或写入真实记忆、文件、网络、模型、时钟、检索、权限或持久化系统。记录位于 `.memory/reviews/2026-07-15-chapter-07-example-integration.md`。
- 完成第 7 章 Diagram Review：Mermaid CLI 11.16.0 导出 `chapter-07-memory-record-lifecycle.svg` 与 `.png` 并实际查看 PNG；阻塞记录须补证或经人工裁决后回到检查，跨任务记录仍只是长期候选。记录位于 `.memory/reviews/2026-07-15-chapter-07-diagram-review.md`。
- 完成第 7 章 Language Editing：统一作用范围、长期记忆与长期候选的语义，说明概念字段与 JavaScript 命名差异，并拆分长句；未修改来源范围、示例接口、Mermaid 源或导出图。记录位于 `.memory/reviews/2026-07-15-chapter-07-language-edit.md`。
- 完成第 7 章 Final Review：重新运行 6 项纯内存测试、演示、Mermaid SVG/PNG 渲染与视觉检查，确认正文 Mermaid 块与源文件一致；正文、来源、示例、图示、审查记录和状态工件已经交叉核对。记录位于 `.memory/reviews/2026-07-15-chapter-07-final-review.md`。
- 完成第 3 章 Research Brief：使用 Codex 与 Claude Code 的当日官方文档限定项目指令事实，并将“仓库即 Agent 上下文”明确为本书工程模型；工件位于 `docs/part-01-foundations/03-repository-as-agent-context.research.md`。
- 完成第 3 章 Chapter Outline：以恢复性、职责分层、最小导航、交接工作流、状态冲突和教学案例组织小节；官方产品事实与本书工程模型保持分层，未提前写入未经核验正文。
- 完成第 3 章 Fact Check：重新读取 REF-005、REF-006 与 REF-001，逐项限定官方产品行为、来源背景和本书工程模型；未声称尚未发生的正文、图示或示例运行结果。
- 完成第 3 章图示与示例规划：新增恢复工作流 Mermaid 源和纯内存上下文恢复预检计划；图示与示例尚未进入实施或审查阶段，不能作为产品行为、真实权限或运行结果证据。
- 完成第 3 章原创正文初稿：以交接场景、目录职责、指令边界、恢复工作流、计划示例与状态冲突组织原创叙述；示例仍为计划、图示仍待视觉审查，未将其伪装成已验证实现。
- 完成第 3 章 Technical Review：确认产品事实、来源背景、本书工程模型、教学案例与相邻章节边界一致；修正正文 Draft 校验状态和 Fact Check 历史范围的两处状态漂移，记录位于 `.memory/reviews/2026-07-15-chapter-03-technical-review.md`。
- 完成第 3 章 Example Implementation：实现纯内存 `recoverTask` 预检、5 项 Node 内置测试和演示入口；红灯、绿灯、实际命令与边界记录位于 `.memory/reviews/2026-07-15-chapter-03-example-integration.md`，示例不读取真实仓库或产品指令文件。
- 完成第 3 章 Diagram Review：使用 Mermaid CLI 11.16.0 实际导出 SVG/PNG 并检查节点、箭头、虚线反馈与文字；图文一致性和边界记录位于 `.memory/reviews/2026-07-15-chapter-03-diagram-review.md`。
- 完成第 3 章 Language Editing：统一章节编号、交接术语、图示导语和初稿阶段验证记录的表述；未改变来源归因、示例行为、图示接口或技术结论，记录位于 `.memory/reviews/2026-07-15-chapter-03-language-edit.md`。
- 完成第 3 章 Final Review：修正示例说明与 `recoverTask` 实际接口不一致的字段；跨工件核对正文、来源、示例、图示、审查记录和状态，记录位于 `.memory/reviews/2026-07-15-chapter-03-final-review.md`。
- 完成第 4 章 Research Brief 与候选参考资料：核验 NIST AI RMF、OpenAI Guardrails 指南与 Google SRE Canarying 的限定使用范围，并将六条可靠性原则标为本书工程扩展。
- 完成第 4 章 Chapter Outline：以可观察目标、状态与失败可见、最小权限、人工升级、渐进变更和受控配置修改案例组织详细蓝图。
- 完成第 4 章 Fact Check：重新核验 REF-007 至 REF-009 的限定陈述，并新增可靠性闭环 Mermaid 图源。
- 完成第 4 章 Example Implementation：实现纯内存 `evaluateConfigChange`，以 5 项 Node 内置测试覆盖受控成功、预检拒绝、验证失败、高风险升级与执行拒绝；示例不读取或写入真实文件，不访问网络、环境变量、账户、凭证或审批系统，记录位于 `.memory/reviews/2026-07-15-chapter-04-example-integration.md`。
- 完成第 4 章原创正文初稿：以可验证目标、状态与失败可见、最小权限、人工升级、渐进变更和受控配置修改案例组织原创叙述；图示审查后的 SVG/PNG 仅呈现本书工程模型，未将其表述为真实权限控制或产品架构。
- 完成第 4 章 Technical Review：重新核验 NIST、OpenAI、Google SRE 与 Harness 来源的限定范围，修正第 11 章 stable slug、Outline 阶段漂移和项目上下文状态；记录位于 `.memory/reviews/2026-07-15-chapter-04-technical-review.md`。
- 完成第 4 章 Diagram Review：使用 Mermaid CLI 11.16.0 实际导出 `chapter-04-reliability-loop.svg` 与 `.png`，检查节点、箭头、分支标签、虚线证据关系与文字；图文一致性和布局修正记录位于 `.memory/reviews/2026-07-15-chapter-04-diagram-review.md`。
- 完成第 4 章 Language Editing：收束任务判定、图文术语、示例阶段语义、渐进验证和章节总结的表达；未改变来源、示例、Mermaid 源码或导出图，记录位于 `.memory/reviews/2026-07-15-chapter-04-language-edit.md`。
- 完成第 4 章 Final Review：修正已实现示例仍被标为“计划”的跨工件漂移，重新运行 5 项示例测试、接受路径演示、Mermaid SVG/PNG 导出、正文图源一致性检查和全仓校验；记录位于 `.memory/reviews/2026-07-15-chapter-04-final-review.md`。
- 完成第 5 章 Research Brief 与候选参考资料：重新访问 OpenAI Model Spec、Codex `AGENTS.md`、Claude Code `CLAUDE.md`、Google Prompt 与 structured output 文档、Anthropic Prompting best practices 及 OpenAI API 稳定性说明；将系统/项目/任务/数据/输出契约标为本书工程模型，工件位于 `docs/part-02-components/05-instructions-and-prompt.research.md`。
- 完成第 5 章 Chapter Outline：按 Prompt 碎片化、内容分类、产品指令边界、冲突装配、输出契约、回归检查和代码审查教学案例组织逐节蓝图；未提前写入正文、产品 API 字段、真实模型行为或安全保证，工件位于 `docs/part-02-components/05-instructions-and-prompt.outline.md`。
- 完成第 5 章 Fact Check 与 Mermaid 图源：当日重新读取 REF-005、REF-006、REF-010 至 REF-014，将产品事实、Prompt 建议、结构化输出边界、本书装配模型和教学案例逐项分开；`diagrams/mermaid/chapter-05-instruction-assembly.mmd` 只表达本书工程模型，随后已导出 SVG/PNG 并完成视觉审查。
- 完成第 5 章纯内存示例计划与实现：`assembleInstructionPacket` 的测试注入输入、结构化结果、五条确定性路径、npm scripts 和运行记录已就绪；实现与测试位于 `examples/agent/instruction-packet.mjs` 和 `.test.mjs`，工件说明位于 `docs/part-02-components/05-instructions-and-prompt.example-plan.md`。
- 完成第 5 章原创正文与 Final Review：以 Prompt 碎片化、内容分类、产品指令边界、冲突装配、输出契约、回归检查和代码审查教学案例组织原创叙述；已实现示例仍只代表纯内存教学模型，图示只代表本书工程模型，工件位于 `docs/part-02-components/05-instructions-and-prompt.md`。
- 完成第 5 章 Technical Review：修正 Outline 中“未写入正文”的状态漂移、正文 Mermaid 块与源文件的边界注释缺失，以及已使用引用仍标为候选的问题；审查记录位于 `.memory/reviews/2026-07-15-chapter-05-technical-review.md`。

### 历史：验证状态

- 2026-07-14：`npm install` 成功，安装 154 个依赖包；审计报告 0 个漏洞。npm 同时报告了 `whatwg-encoding@3.1.1` 的弃用警告，未阻塞本项目工具链。
- 2026-07-14：`npm run lint:md` 成功，检查 66 个 Markdown 文件，0 个错误。
- 2026-07-14：`npm run check:links` 成功，内部链接及两个外部来源链接均通过。
- 2026-07-14：P0、P1、P2 完成后再次运行 `npm run validate` 成功；Markdown lint 检查 69 个文件、0 个错误，链接检查通过全部发现的内部与外部链接，并执行了 4 项最小 Harness 测试。
- 2026-07-14：`npm run test:harness` 成功；4 项 Node 内置测试全部通过。`npm run example:harness` 成功输出 `succeeded` 状态和验证证据。
- 2026-07-14：第 1 章准备包完成后运行 `npm run validate` 成功；Markdown lint 检查 73 个文件、0 个错误，所有已发现的内部与外部链接通过，4 项最小 Harness 测试全部通过。随后 `npm run example:harness` 成功输出 `succeeded` 状态及验证证据。
- 2026-07-14：P0 差距补齐后运行 `npm run validate` 成功；Markdown lint 检查 74 个文件、0 个错误，链接检查与 4 项最小 Harness 测试通过，章节状态检查确认 47 章中 1 章进行中、46 章未开始。`npm run example:harness` 输出 `succeeded`；`git diff --check` 无输出。
- 2026-07-15：第 1 章正文初稿完成后运行 `npm run validate` 成功；Markdown lint 检查 75 个文件、0 个错误，链接检查、4 项最小 Harness 测试和章节状态检查通过。REF-001 至 REF-004 已在正文起草当天复核。
- 2026-07-15：第 2 章正文与配套工件完成后运行 `npm run validate` 成功；Markdown lint 检查 80 个文件、0 个错误，链接检查、既有 4 项最小 Harness 测试和章节状态检查通过。REF-001、REF-003 与 REF-004 已在正文起草当天复核。
- 2026-07-15：第 1 章 Technical Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 81 个文件、0 个错误，链接检查、4 项最小 Harness 测试和章节状态检查通过。`git diff --check` 无输出。
- 2026-07-15：第 2 章 Technical Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 82 个文件、0 个错误，链接检查、4 项最小 Harness 测试和章节状态检查通过。`git diff --check` 无输出。
- 2026-07-15：第 1 章 Example Implementation 完成后运行 `npm run validate` 成功；Markdown lint 检查 83 个文件、0 个错误，链接检查、4 项最小 Harness 测试和章节状态检查通过。`git diff --check` 无输出。
- 2026-07-15：第 2 章 Example Implementation 完成后运行 `npm run validate` 成功；Markdown lint 检查 85 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过。`npm run example:runtime-boundaries` 输出 `succeeded` / `validated`；`git diff --check` 无输出。
- 2026-07-15：第 1 章 Diagram Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 86 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过。Mermaid CLI 11.16.0 已导出并视觉检查 SVG/PNG；`git diff --check` 无输出。
- 2026-07-15：第 2 章 Diagram Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 87 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过。Mermaid CLI 11.16.0 已导出并视觉检查 SVG/PNG；`git diff --check` 无输出。
- 2026-07-15：第 1 章 Fact Check 完成后运行 `npm run validate` 成功；Markdown lint 检查 88 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过。`npm run test:harness` 与 `npm run example:harness` 也已重新执行；`git diff --check` 无输出。
- 2026-07-15：第 2 章 Fact Check 完成后运行 `npm run validate` 成功；Markdown lint 检查 89 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过。`npm run test:runtime-boundaries` 与 `npm run example:runtime-boundaries` 也已重新执行；`git diff --check` 无输出。
- 2026-07-15：第 1 章 Language Editing 完成后运行 `npm run validate` 成功；Markdown lint 检查 90 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（2 章进行中、45 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 2 章 Language Editing 完成后运行 `npm run validate` 成功；Markdown lint 检查 91 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（2 章进行中、45 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 1 章 Final Review 完成并同步状态后运行 `npm run validate` 成功；Markdown lint 检查 92 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1 章完成、第 2 章进行中、45 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 2 章 Final Review 完成并同步状态后运行 `npm run validate` 成功；Markdown lint 检查 93 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、45 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 3 章 Research Brief 完成后运行 `npm run validate` 成功；Markdown lint 检查 95 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 3 章 Chapter Outline 完成后运行 `npm run validate` 成功；Markdown lint 检查 96 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 3 章 Fact Check 完成后运行 `npm run validate` 成功；Markdown lint 检查 97 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 3 章计划图示与 Example Plan 完成后运行 `npm run validate` 成功；Markdown lint 检查 98 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。Mermaid CLI 已成功生成临时 SVG 以确认图源语法，但尚未进行发布导出或视觉审查。
- 2026-07-15：第 3 章原创正文初稿完成后运行 `npm run validate` 成功；Markdown lint 检查 99 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。第 3 章图示仍只完成语法检查，示例仍只完成计划，未将它们表述为已实现或已审查。
- 2026-07-15：第 3 章 Technical Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 100 个文件、0 个错误，链接检查、两套示例共 8 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。第 3 章图示仍只完成语法检查，示例仍只完成计划，未将它们表述为已实现或已审查。
- 2026-07-15：第 3 章 Example Implementation 完成后运行 `npm run validate` 成功；Markdown lint 检查 101 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。第 3 章图示当时仍只完成语法检查，尚未进行发布导出或视觉审查。
- 2026-07-15：第 3 章 Diagram Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 102 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。Mermaid CLI 11.16.0 已实际导出并视觉检查 SVG/PNG。
- 2026-07-15：第 3 章 Language Editing 完成后运行 `npm run validate` 成功；Markdown lint 检查 103 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2 章完成、第 3 章进行中、44 章未开始）；`git diff --check` 无输出。编辑未修改来源范围、可运行示例、Mermaid 源码或导出图。
- 2026-07-15：第 3 章 Final Review 完成后运行 `npm run validate` 成功；Markdown lint 检查 104 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2、3 章完成、44 章未开始）；`git diff --check` 无输出。最终审查重新运行第 3 章示例、演示和 Mermaid 导出，并修正了示例说明字段漂移。
- 2026-07-15：第 4 章 Research Brief 完成后运行 `npm run validate` 成功；Markdown lint 检查 106 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 4 章 Fact Check 与计划图示完成后运行 `npm run validate` 成功；Markdown lint 检查 108 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 4 章计划示例完成后运行 `npm run validate` 成功；Markdown lint 检查 109 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试和章节状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。计划未声明模块或测试已经实现。
- 2026-07-15：第 2 章完整性复核与第 4 章正文初稿写入后实际运行 `npm run test:runtime-boundaries`、`npm run example:runtime-boundaries`、`npm run validate` 和 `git diff --check`；第 2 章 4 项测试通过，演示输出 `succeeded` / `validated`，Markdown lint 检查 110 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试与状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 4 章 Technical Review 中实际重读 REF-007 至 REF-009 与 REF-001 的官方或原始页面，确认正文 Mermaid 与图源一致，并运行 `npm run validate`、`git diff --check`；Markdown lint 检查 111 个文件、0 个错误，链接检查、三套示例共 13 项 Node 内置测试与状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始），两项命令均以退出码 0 完成。第 4 章专用示例和图示导出仍未运行，未将其记为通过。
- 2026-07-15：第 4 章 Example Implementation 完成后实际运行 `npm run test:controlled-config-change`、`npm run example:controlled-config-change`、`npm run validate` 和 `git diff --check`；5 项目标测试通过，演示输出 `succeeded` / `verified`，Markdown lint 检查 112 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。图示导出、语言编辑与最终审查尚未进行。
- 2026-07-15：第 4 章 Diagram Review 完成后实际运行 Mermaid CLI 11.16.0 导出 SVG/PNG、检查正文与图源一致性、视觉查看 PNG、`npm run validate` 和 `git diff --check`；Markdown lint 检查 113 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。语言编辑与最终审查尚未进行。
- 2026-07-15：第 4 章 Language Editing 完成后实际运行 `npm run validate` 和 `git diff --check`；Markdown lint 检查 114 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1、2、3 章完成、第 4 章进行中、43 章未开始）；`git diff --check` 无输出。来源、示例和图示没有修改，最终审查尚未进行。
- 2026-07-15：第 4 章 Final Review 完成后实际运行 `npm run test:controlled-config-change`、`npm run example:controlled-config-change`、Mermaid CLI 11.16.0 SVG/PNG 导出、正文图源一致性检查、`npm run validate` 和 `git diff --check`；5 项目标测试通过，演示输出 `succeeded` / `verified`，Markdown lint 检查 115 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、43 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 2 章增补修订后实际重新读取 REF-001、REF-003 与 REF-004 的原始页面或摘要，并运行 `npm run test:runtime-boundaries`、`npm run example:runtime-boundaries`、`npm run lint:md`、`npm run check:links`、`npm run validate` 与 `git diff --check`；4 项目标测试通过，演示输出 `succeeded` / `validated`，最终 Markdown lint 检查 116 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、43 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 5 章 Research Brief 与候选资料完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 118 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。链接检查首次遇到 OpenAI API Overview 的 Cloudflare HTTP 403，已通过官方页面读取和直接请求确认后按精确 URL 忽略。
- 2026-07-15：第 5 章 Chapter Outline 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 119 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 5 章 Fact Check 与 Mermaid 图源完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 120 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。图源尚未进入 Mermaid 导出或视觉审查。
- 2026-07-15：第 5 章纯内存示例计划完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 121 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。第 5 章示例尚未实现或运行。
- 2026-07-15：第 5 章原创正文初稿完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 122 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。图源尚未导出或视觉审查，示例尚未实现或运行。
- 2026-07-15：第 5 章 Technical Review 完成后实际运行 Mermaid 源与正文块一致性检查、`npm run validate` 与 `git diff --check`；Mermaid 检查与 diff 均无输出，Markdown lint 检查 123 个文件、0 个错误，链接检查、四组示例共 18 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）。图源尚未导出或视觉审查，示例尚未实现或运行。
- 2026-07-15：第 5 章 Example Implementation 完成后实际运行红灯、`npm run test:instruction-packet`、`npm run example:instruction-packet`、`npm run validate` 与 `git diff --check`；红灯因待实现模块出现 `ERR_MODULE_NOT_FOUND`，随后 5 项目标测试通过，演示输出 `ready` / `assembled`。完整校验的 Markdown lint 检查 124 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。图源尚未导出或视觉审查。
- 2026-07-15：第 5 章 Diagram Review 完成后实际运行 Mermaid 源与正文块一致性检查、Mermaid CLI 11.16.0 SVG/PNG 导出、视觉查看 PNG、`npm run validate` 与 `git diff --check`；图源与正文一致，SVG/PNG 均成功生成，Markdown lint 检查 125 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 5 章 Language Editing 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 126 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 4 章完成、第 5 章进行中、42 章未开始）；`git diff --check` 无输出。编辑没有修改来源范围、可运行代码、Mermaid 源码或导出图。
- 2026-07-15：第 5 章 Final Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 127 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、42 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Research Brief 与候选参考资料完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 129 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Chapter Outline 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 130 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Fact Check 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 131 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Example Plan 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 132 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章正文初稿完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 133 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Technical Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 134 个文件、0 个错误，链接检查、五组示例共 23 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Example Implementation 与 Diagram Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 136 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 5 章完成、第 6 章进行中、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 6 章 Final Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 138 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、41 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 2 章结论状态语义增补完成后实际运行 `npm run test:runtime-boundaries`、`npm run example:runtime-boundaries`、`npm run lint:md`、`npm run validate` 与 `git diff --check`；4 项目标测试通过，演示输出 `succeeded` / `validated`，最终 Markdown lint 检查 139 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、41 章未开始）；`git diff --check` 无输出。词表仍仅是本书工程模型，纯内存示例不模拟跨进程记录缺失。
- 2026-07-15：第 7 章 Research Brief 与候选资料完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 141 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。Research Brief 仅记录来源范围与本书工程模型，未声称正文、图示、示例或产品实现已完成。
- 2026-07-15：第 7 章 Chapter Outline 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 142 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。Outline 只定义写作、图示与示例的边界，未声称 Fact Check、正文、图源、示例实现或产品行为已完成。
- 2026-07-15：第 7 章 Fact Check 完成后实际运行 `npm run validate` 与 `git diff --check`；首次校验发现 `NEXT_TASK.md` 一处行尾空格并已移除，重跑后 Markdown lint 检查 143 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。Fact Check 仅核验来源范围，未声称正文、图源、示例或产品实现已完成。
- 2026-07-15：第 7 章 First Draft 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 145 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。正文在写作日重新核对来源；图源仅语法渲染，示例仅计划，均未被表述为已实现或产品结论。
- 2026-07-15：第 7 章 Technical Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 146 个文件、0 个错误，链接检查、六组示例共 28 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。审查修正了 Fact Check 对后续工件“尚未发生”的时态漂移；示例尚未实施，图示尚未导出或视觉审查。
- 2026-07-15：第 7 章 Example Implementation 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 147 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。`decideMemoryRecord` 的红灯、6 项绿灯测试和演示均已独立记录，图示仍未导出或视觉审查。
- 2026-07-15：第 7 章 Diagram Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 148 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。Mermaid SVG/PNG 均已导出并查看，图示不把阻塞项表述为可直接读取。
- 2026-07-15：第 7 章 Language Editing 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 149 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 6 章完成、第 7 章进行中、40 章未开始）；`git diff --check` 无输出。编辑只统一术语、字段命名说明与句法，不扩大来源、示例或图示结论。
- 2026-07-15：第 7 章 Final Review 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 150 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 7 章完成、第 8 章进行中、39 章未开始）；`git diff --check` 无输出。正文、来源、示例、图示、审查记录和状态工件已交叉核对。
- 2026-07-15：第 2 章 Attempt Trace 增补完成并同步状态后实际运行 `npm run test:runtime-boundaries`、`npm run example:runtime-boundaries`、`npm run validate` 与 `git diff --check`；专用示例 4 项测试通过，演示输出 `succeeded` / `validated`，Markdown lint 检查 151 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 7 章完成、第 8 章进行中、39 章未开始）；`git diff --check` 无输出。
- 2026-07-15：第 8 章 Chapter Outline 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 154 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 7 章完成、第 8 章进行中、39 章未开始）；`git diff --check` 无输出。本阶段未新增可运行示例、图示导出或产品行为断言。首次链接检查对两项 OpenAI Help Center 来源返回 HTTP 403，已按精确 URL 配置忽略后重跑通过。
- 2026-07-15：第 8 章 First Draft 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 155 个文件、0 个错误，链接检查、七组示例共 34 项 Node 内置测试与状态检查通过（第 1 至 7 章完成、第 8 章进行中、39 章未开始）；`git diff --check` 无输出。正文重新读取 REF-024 至 REF-027；第 8 章图示、示例和审查仍未开始，未把计划写成运行结果。
- 2026-07-15：第 8 章 Fact Check 与状态同步后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 161 个文件、0 个错误，链接检查、八组示例共 40 项 Node 内置测试与状态检查通过（第 1 至 7 章完成、第 8 章进行中、39 章未开始）；`git diff --check` 无输出。精确 URL 忽略仍只处理已知的 Cloudflare/Help Center 抓取限制，不替代写作日的一手来源复核。
- 2026-07-15：第 8 章 Language Editing 完成后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 162 个文件、0 个错误，链接检查、八组示例共 40 项 Node 内置测试与状态检查通过（第 1 至 7 章完成、第 8 章进行中、39 章未开始）；`git diff --check` 无输出。编辑未改变事实范围、示例接口或 Mermaid 含义。
- 2026-07-15：第 8 章 Final Review 与状态同步后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 163 个文件、0 个错误，链接检查、八组示例共 40 项 Node 内置测试与状态检查通过（第 1 至 8 章完成、39 章未开始）；`git diff --check` 无输出。最终审查还实际重跑了第 8 章专用测试、演示、Mermaid SVG/PNG 渲染和正文图源一致性检查。

### 历史：已知阻塞

当前无内容阻塞。`mmdc` 未安装，但一次性 `npx` Mermaid CLI 已成功渲染第 1、2 章；后续图示审查应复用实际渲染路径，而非把文本一致性写成渲染通过。

链接检查对 OpenAI 的《A practical guide to building agents》与 API Overview 的 Backwards compatibility 页面返回 HTTP 403；两页均已通过官方页面读取核验，且直接请求确认是 Cloudflare challenge，因此在 `.markdown-link-check.json` 中按精确 URL 忽略，避免把抓取限制误报为失效来源。第 8 章的 ChatGPT Skills 与 Plugins 帮助页同样被该检查器返回 HTTP 403；研究阶段已读取页面，并仅按两个精确 URL 忽略。第 10 章 Outline 的复跑还遇到 Anthropic Memory 与 NIST AI RMF 的瞬时 `Status: 0`；同次直接 `curl -I -L` 均获得官方终页 HTTP 200，故同样只按精确 URL 忽略链接检查器的网络抓取波动。上述忽略只处理抓取限制或网络波动，不构成来源有效性或产品行为的永久保证；正文写作仍须在写作当天重新访问这些来源。

2026-07-16：EUR-Lex 的 Regulation (EU) 2024/1689 官方 URL 对本机检查器返回 CloudFront `202 Accepted` 与 `x-amzn-waf-action: challenge`，因此也只在 `.markdown-link-check.json` 中按精确 URL 忽略；法规内容、适用范围和合规结论仍须在需要时通过可访问的一手文本重新核验。

### 历史：早期更新

- 2026-07-15：完成第 5 章 Technical Review，修正状态、图源注释和引用登记漂移；来源边界、示例阶段语义和相邻章节责任无阻塞。
- 2026-07-15：完成第 5 章 Example Implementation：实现纯内存 `assembleInstructionPacket`、五项 Node 内置测试和演示入口；测试覆盖正常装配、数据保持为数据、范围冲突、输出契约缺失与未知裁决规则。示例不读取或写入真实文件，不访问网络、模型、凭证或权限系统；记录位于 `.memory/reviews/2026-07-15-chapter-05-example-integration.md`。下一步为 Diagram Review。
- 2026-07-15：完成第 5 章 Diagram Review：Mermaid CLI 11.16.0 实际导出 `chapter-05-instruction-assembly.svg` 与 `.png`，并视觉检查四类输入、装配、冲突、验证、交付、升级和两条虚线反馈关系；记录位于 `.memory/reviews/2026-07-15-chapter-05-diagram-review.md`。下一步为 Language Editing。
- 2026-07-15：完成第 5 章 Language Editing：收束具体主语、因果、四层责任、渐进增强边界和阶段记录的表达；未修改来源范围、示例接口、Mermaid 源码或导出图，记录位于 `.memory/reviews/2026-07-15-chapter-05-language-edit.md`。下一步为 Final Review。
- 2026-07-15：完成第 5 章 Final Review：重新运行 5 项纯内存示例测试、演示、Mermaid SVG/PNG 导出、正文图源一致性检查与完整校验；正文、来源、示例、图示、审查记录和项目状态一致，记录位于 `.memory/reviews/2026-07-15-chapter-05-final-review.md`。下一步为第 6 章 Research Brief。
- 2026-07-15：完成第 6 章 Research Brief：复核 Anthropic、OpenAI Agents SDK 与 Gemini 的五项一手来源，限定 Context Engineering、本地与模型可见 context、跨轮状态、长上下文、缓存与检索切块语境；Context Packet、预算、刷新和污染诊断均标为本书工程扩展。下一步为 Chapter Outline。
- 2026-07-15：完成第 6 章 Chapter Outline：以资料选择、本地与模型 context、Context Brief、预算、按需加载、跨轮去重、刷新污染诊断和测试失败案例组织逐节蓝图；产品事实、教学案例与本书工程模型保持分层。下一步为 Fact Check。
- 2026-07-15：完成第 6 章 Fact Check：重新限定 REF-015 至 REF-019 的 Anthropic、OpenAI Agents SDK 和 Gemini 观点或产品行为，并将 Context Packet、预算、污染诊断和教学案例逐项标注为本书工程模型。下一步为 Mermaid 图源。
- 2026-07-15：完成第 6 章 Mermaid 图源：`chapter-06-context-packet-flow.mmd` 只表达候选资料、元数据检查、预算、按需引用、观察、刷新和记录的本书工程闭环；已成功进行语法渲染，尚未导出发布图或完成视觉审查。下一步为 Example Plan。
- 2026-07-15：完成第 6 章 Example Plan 与原创正文初稿：为纯内存 `buildContextPacket` 定义元数据、预算、指针、刷新和五条测试路径，并以资料选择、三面检查、预算、跨轮状态、污染诊断和失败测试案例完成原创叙述；示例尚未实现，图示尚未完成视觉审查。下一步为 Technical Review。
- 2026-07-15：完成第 6 章 Technical Review：逐字核对 Mermaid 图源与正文，审查五项来源的限定范围、本书模型、相邻章节责任、示例阶段和验证状态；修正验证表状态漂移与可能误导为安全保证的措辞，记录位于 `.memory/reviews/2026-07-15-chapter-06-technical-review.md`。下一步为 Example Implementation。
- 2026-07-15：完成第 6 章 Example Implementation 与 Diagram Review：`buildContextPacket` 的红灯、5 项纯内存测试和演示均已实际运行；Mermaid CLI 11.16.0 已导出 SVG/PNG 并完成视觉检查。记录分别位于 `.memory/reviews/2026-07-15-chapter-06-example-integration.md` 与 `chapter-06-diagram-review.md`。下一步为 Language Editing。
- 2026-07-15：完成第 6 章 Language Editing：统一 Context Brief、Context Packet、token 与 chunk 的首次中文术语，并收束来源—模型—边界叙述；未修改来源、示例接口、Mermaid 源或导出图，记录位于 `.memory/reviews/2026-07-15-chapter-06-language-edit.md`。下一步为 Final Review。
- 2026-07-15：完成第 6 章 Final Review：重新运行纯内存示例测试与演示、Mermaid SVG/PNG 导出、图源一致性检查和完整工具链；正文、来源、示例、图示、审查记录和项目状态一致，记录位于 `.memory/reviews/2026-07-15-chapter-06-final-review.md`。下一步为第 7 章 Research Brief。
- 2026-07-15：完成第 7 章 Chapter Outline：以资料分类、工作与长期边界、Memory Record、写入/读取门槛、生命周期冲突和接手案例组织逐节蓝图；来源事实、本书工程模型与教学案例保持分层。下一步为 Fact Check。
- 2026-07-15：完成第 7 章 Fact Check：REF-006、REF-020 至 REF-023 的来源范围、外推禁区与正文当天复核要求已逐项登记；本书工程模型和教学案例未伪装为产品事实。下一步为 Mermaid 图源。
- 2026-07-15：完成第 7 章 Mermaid 图源：`chapter-07-memory-record-lifecycle.mmd` 已用 Mermaid CLI 11.16.0 语法渲染；图只表达本书模型，尚未导出发布图或视觉审查。下一步为 Example Plan。
- 2026-07-15：完成第 7 章 Example Plan：`decideMemoryRecord` 的纯内存契约、状态、六条测试路径和外部副作用边界已建立，尚未实现或运行。下一步为 First Draft。
- 2026-07-15：完成第 7 章 First Draft：正文将来源事实、本书工程模型、教学案例与未验证示例分层，并交代写入、读取、刷新、修订和撤销的责任边界。下一步为 Technical Review。
- 2026-07-15：完成第 7 章 Technical Review：修正 Fact Check 对后续工件“尚未发生”的时态漂移，并复核来源范围、术语、图文一致性、示例阶段与相邻章节边界。下一步为 Example Implementation。
- 2026-07-15：完成第 7 章 Example Implementation：先确认模块缺失的红灯，再实际运行 `decideMemoryRecord` 的 6 项 Node 内置测试与演示；实现只对注入对象分类，不代表真实 memory、存储、检索、授权或模型行为。记录位于 `.memory/reviews/2026-07-15-chapter-07-example-integration.md`。下一步为 Diagram Review。
- 2026-07-15：完成第 7 章 Diagram Review：Mermaid CLI 11.16.0 已实际导出 SVG/PNG 并查看 PNG；为避免把阻塞项误读为可直接读取，图示改为补证或人工裁决后重新检查，并将跨任务分支标为长期候选。记录位于 `.memory/reviews/2026-07-15-chapter-07-diagram-review.md`。下一步为 Language Editing。
- 2026-07-15：完成第 7 章 Language Editing：统一作用范围、长期记忆与长期候选的表述，解释 `snake_case` 与 JavaScript `camelCase` 的命名语境，并收束长句；未扩大来源或运行结论。记录位于 `.memory/reviews/2026-07-15-chapter-07-language-edit.md`。下一步为 Final Review。
- 2026-07-15：完成第 7 章 Final Review：重新运行 6 项纯内存测试、演示、Mermaid SVG/PNG 渲染和视觉检查，确认正文 Mermaid 块与图源一致，并完成全仓校验。记录位于 `.memory/reviews/2026-07-15-chapter-07-final-review.md`。下一步为第 8 章 Research Brief。
- 2026-07-15：完成第 8 章 Research Brief：复核 Agent Skills Specification、Claude Code、ChatGPT Skills 与 OpenAI Plugin 的限定陈述，分离规范、产品行为和本书 Skill Contract 模型；未写入正文、图示或示例实现。下一步为 Chapter Outline。
- 2026-07-15：完成第 8 章 Chapter Outline：逐节定义最小工件、渐进加载、Skill Contract、发现与前置检查、概念与权限边界、测试版本弃用和 Markdown 审查案例；全仓校验通过，下一步为 First Draft。
- 2026-07-15：完成第 8 章 First Draft：写作日重读 REF-024 至 REF-027，正文分离规范或产品事实、本书工程模型和教学案例；图示与示例均尚未实现，下一步为 Technical Review。
- 2026-07-15：完成第 8 章 Technical Review：修正技能契约（Skill Contract）首现术语并复核产品范围、权限边界、阶段状态和相邻章节责任；下一步为 Example Implementation。
- 2026-07-15：完成第 8 章 Example Implementation：模块缺失红灯、6 项纯内存 Node 测试与演示均已实际记录；下一步为 Diagram Review。
- 2026-07-15：完成第 8 章 Diagram Review：Skill 生命周期与权限边界图已导出 SVG/PNG 并实际查看；下一步为 Fact Check。
- 2026-07-15：完成第 8 章 Fact Check：逐项限定 REF-024 至 REF-027 的允许用途和外推禁区，重跑 6 项纯内存选择测试与演示；下一步为 Language Editing。
- 2026-07-15：完成第 8 章 Language Editing：统一术语首现、来源段落和授权证据主语，修正测试小节的图示阶段时态；下一步为 Final Review。
- 2026-07-15：完成第 8 章 Final Review：重新核对正文、来源、示例、图示、审查记录和状态工件，专用验证与完整工具链均通过；下一步为第 9 章 Research Brief。
- 2026-07-15：完成第 9 章 Research Brief 与候选参考资料：复核 Plan-and-Solve、ReAct、Anthropic 与 OpenAI Agents SDK 的限定陈述，区分论文/产品事实与本书 Plan Brief 模型；下一步为 Chapter Outline。
- 2026-07-15：完成第 9 章 Chapter Outline：以 Plan Brief、任务卡、依赖与并行候选、概念边界、计划修订、停止升级和 API 认证测试教学案例组织逐节蓝图；下一步为 First Draft。
- 2026-07-15：完成第 9 章 First Draft：写作日重新读取 REF-004、REF-028 至 REF-030，正文分离论文与产品范围、本书任务分解模型和未实施工件；下一步为 Technical Review。
- 2026-07-15：完成第 9 章 Technical Review：复核来源范围、术语首现、计划/Skill/Workflow/Tool/权限边界、教学案例、未实施工件状态和相邻章节责任；下一步为 Example Implementation。
- 2026-07-15：完成第 9 章 Example Implementation：先以 `ERR_MODULE_NOT_FOUND` 确认测试先于实现存在，再实际运行 `assessTaskPlan` 的 6 项 Node 内置测试与演示；实现只检查注入的教学对象，不证明真实计划、API、权限或外部动作。下一步为 Diagram Review。
- 2026-07-15：完成第 9 章 Diagram Review、Fact Check、Language Editing 与 Final Review：Mermaid SVG/PNG 已导出并视觉检查，REF-004、REF-028 至 REF-030 已重读，6 项纯内存测试和演示已重跑；图文、状态与引用范围一致。下一步为第 10 章 Research Brief。
- 2026-07-16：完成第 10 章 First Draft：写作日重新读取 REF-031 至 REF-035，正文分离产品或框架的限定事实、本书状态模型与章节生产教学案例；尚未创建 Mermaid 图源、纯内存示例或真实运行时，下一步为 Technical Review。
- 2026-07-16：完成第 10 章 Technical Review：重读 REF-031 至 REF-035，修正全局词表、引用登记、Outline 与正文检查表的状态漂移；正文继续限定 AWS、LangGraph 与 Temporal 的来源范围，图示、纯内存示例和真实运行时仍未创建。下一步为 Example Implementation（先建立 Example Plan）。
- 2026-07-16：完成第 10 章 Fact Check：重读 REF-031 至 REF-035，逐项限定 AWS Step Functions、LangGraph 与 Temporal 的来源事实和外推禁区；重跑 `assessWorkflowTransition` 的 8 项纯内存测试与演示，且未将结果写成真实工作流、重放、持久化、Tool、权限、批准、审计或外部效果证明。下一步为 Language Editing。
- 2026-07-16：完成第 10 章 Language Editing：统一工具、执行实例、智能体、沙箱、checkpointer/thread/store、API 与 exactly-once 的首次呈现，收束条件与图示导语；不新增来源陈述，也不改变纯内存示例或 Mermaid 图的边界。下一步为 Final Review。
- 2026-07-16：完成第 10 章 Final Review：重跑 8 项纯内存测试、演示、Mermaid SVG/PNG 导出、PNG 视觉检查与正文图源一致性检查，确认正文、来源、示例、图示、审查记录和状态工件一致；记录位于 `.memory/reviews/2026-07-16-chapter-10-final-review.md`。下一步为第 11 章 Research Brief。
- 2026-07-16：完成第 11 章 Technical Review：重读 REF-036 至 REF-039，分开 MCP Tools 草案与 2025-11-25 Schema Reference 的来源语境，把应用侧参数校验明确为本书规则，并补齐工具契约及其工件术语；图示、纯内存示例、MCP/SDK 与真实工具运行时仍未创建。记录位于 `.memory/reviews/2026-07-16-chapter-11-technical-review.md`。下一步为 Example Implementation。
- 2026-07-16：完成第 11 章 Example Implementation：先以 `ERR_MODULE_NOT_FOUND` 记录 `assessToolInvocation` 测试先于模块的红灯，再实际运行 7 项 Node 内置测试与演示；函数只判断注入的 Tool Contract、Invocation Request、环境/批准摘要和 Invocation Record，不调用真实 Tool、权限、MCP、SDK 或外部系统。记录位于 `.memory/reviews/2026-07-16-chapter-11-example-integration.md`。下一步为 Diagram Review。
- 2026-07-16：完成第 11 章 Diagram Review：`chapter-11-tool-invocation-sequence.mmd` 已用 Mermaid CLI 11.16.0 导出白色背景、两倍缩放的 SVG/PNG 并实际查看；正文 Mermaid 块与图源比较一致，结果、独立观察、验收和效果未知保持分离。记录位于 `.memory/reviews/2026-07-16-chapter-11-diagram-review.md`。下一步为 Fact Check。
- 2026-07-16：完成第 11 章 Fact Check：重新读取 REF-036 至 REF-039，逐项限定 MCP Tools 草案、版本化 Schema、OpenAI Function Calling、Anthropic 工具定义和 JSON Schema 的允许陈述与外推禁区；重跑 7 项纯内存测试与演示。记录位于 `docs/part-02-components/11-tool-use-and-tool-protocols.fact-check.md`。下一步为 Language Editing。
- 2026-07-16：完成第 11 章 Language Editing：统一候选—请求—结果—观察—验收判断链的中文表达、图示替代描述和纯内存示例说明，未改变来源范围、示例接口或 Mermaid 语义。记录位于 `.memory/reviews/2026-07-16-chapter-11-language-edit.md`。下一步为 Final Review。

### 历史：早期验证

- 2026-07-16：第 10 章 Technical Review 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 179 个文件、0 个错误，链接检查、九组既有示例共 46 项 Node 内置测试和章节状态检查均通过（9 章完成、1 章进行中、37 章未开始）；REF-031 至 REF-035 的正文引用和目录链接均在检查范围内且通过。该结果只验证本仓库 Markdown、链接、既有纯内存示例、图示工件与状态格式，不代表第 10 章工作流运行时、重放、持久化、Tool、权限或外部系统已经实现。
- 2026-07-16：第 10 章 Example Implementation 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 181 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（9 章完成、1 章进行中、37 章未开始）。该结果覆盖新增纯内存状态迁移示例及其项目链接、格式与状态，不代表真实工作流、重放、持久化、审批、Tool、权限或外部系统已经实现。
- 2026-07-16：第 10 章 Diagram Review 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 182 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（9 章完成、1 章进行中、37 章未开始）。该结果覆盖新增 Mermaid 图源、SVG/PNG 导出链接和图示审查记录的格式与链接，不代表真实工作流、状态存储、重放、Tool、权限、批准或外部系统行为。
- 2026-07-16：第 10 章 Fact Check 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 183 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（9 章完成、1 章进行中、37 章未开始）。该结果覆盖事实核验清单、来源链接、纯内存教学示例和状态格式，不代表真实工作流、状态存储、重放、Tool、权限、批准、审计或外部系统行为。
- 2026-07-16：第 10 章 Language Editing 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 184 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（9 章完成、1 章进行中、37 章未开始）。该结果验证语言编辑后的 Markdown、链接、纯内存教学示例与阶段状态，不代表真实工作流、状态存储、重放、Tool、权限、批准、审计或外部系统行为。
- 2026-07-16：第 10 章 Final Review 与状态同步后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 185 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（10 章完成、37 章未开始）；`git diff --check` 无输出。该结果验证 Markdown、链接、纯内存教学示例、图示工件与阶段状态，不代表真实工作流、状态存储、重放、Tool、权限、批准、审计或外部系统行为。
- 2026-07-16：第 11 章 Research Brief 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 187 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（10 章完成、1 章进行中、36 章未开始）。该结果验证研究 Markdown、链接、既有纯内存示例与阶段状态，不代表真实 Tool、权限、批准、验证、审计、持久化或外部效果已经实现。
- 2026-07-16：第 11 章 Chapter Outline 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 188 个文件、0 个错误，链接检查、十套示例共 54 项 Node 内置测试和章节状态检查均通过（10 章完成、1 章进行中、36 章未开始）。该结果验证 Outline Markdown、链接、既有纯内存示例与阶段状态，不代表正文、图示、示例、真实 Tool、权限、批准、验证、审计、持久化或外部效果已经实现。
- 2026-07-16：第 11 章 First Draft 与状态同步后实际运行 `npm run validate`；Markdown lint 检查 189 个文件、0 个错误，链接检查、十套既有示例共 54 项 Node 内置测试和章节状态检查均通过（10 章完成、1 章进行中、36 章未开始）。该结果验证原创正文、Markdown、链接、既有纯内存示例与阶段状态，不代表本章图示、示例、真实 Tool、权限、批准、验证、审计、持久化或外部效果已经实现。
- 2026-07-16：第 11 章 Technical Review 与状态同步后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 190 个文件、0 个错误，链接检查、十套既有示例共 54 项 Node 内置测试和章节状态检查均通过（10 章完成、1 章进行中、36 章未开始）；`git diff --check` 退出码为 0、无输出。该结果验证审查记录、引用边界、术语、Markdown、链接、既有纯内存示例与阶段状态，不代表本章图示、示例、真实 Tool、权限、批准、验证、审计、持久化或外部效果已经实现。
- 2026-07-16：第 11 章 Example Implementation 与状态同步后实际运行 `npm run validate` 与 `git diff --check`；Markdown lint 检查 192 个文件、0 个错误，链接检查、十一套纯内存示例共 61 项 Node 内置测试和章节状态检查均通过（10 章完成、1 章进行中、36 章未开始）；`git diff --check` 退出码为 0、无输出。该结果验证新增示例计划、纯内存教学函数、测试、审查记录、Markdown、链接与阶段状态，不代表真实 Tool、权限、MCP、SDK、批准、验证、审计、持久化或外部效果已经实现。
