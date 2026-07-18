---
title: "第 43 章 Research Brief：用 Harness 写一本技术书"
chapter: "43"
status: "completed"
updated_at: "2026-07-17"
---

# 第 43 章 Research Brief：用 Harness 写一本技术书

## 要解决的读者问题

技术书的难点不只是把若干章节写出来，而是在数月甚至更长的周期中持续回答：当前目标是什么，哪条事实仍然新鲜，哪个示例真的运行过，图和正文是否仍一致，章节何时能进入发布候选，以及下一位作者或 Agent 应从哪里继续。

当这些答案只存在于聊天、个人记忆或零散 TODO 中，Markdown 数量越多，项目越难维护。相反，把书籍当作产品、章节当作工作项、研究和审查当作证据阶段，写作就可以拥有明确输入、状态、质量门和交接。本章把这套机制称为书籍 Harness（Book Harness）。它是本书基于当前仓库推导的工程模型，不是某个写作平台或来源中的现成产品。

## 研究范围与非范围

| 读者问题 | 本章研究的回答 | 本章不回答 |
| --- | --- | --- |
| 如何知道一本书当前做到哪里？ | 用路线图、章节契约、阶段记录和生产看板分开计划、进行中、阻塞与完成。 | 用字数、文件数或模型输出量替代内容完成度。 |
| 如何让章节可接力？ | 将目标、输入、来源、工件、真实验证、未知项和下一任务写入仓库状态与交接包。 | 假定聊天历史、模型记忆或个人脑内上下文永久可用。 |
| 如何控制事实与术语漂移？ | 为来源保存访问日期和允许用途，为术语维护唯一登记，并在 Fact Check/Language Editing 阶段重新核对。 | 声称一次审查能让动态事实永久正确。 |
| 如何判断章节可完成？ | 以章节完成定义（Chapter Definition of Done，Chapter DoD）逐项检查正文、引用、示例、图示、审查和全仓验证。 | 把 Markdown lint 通过、测试通过或审稿人同意中的任一项单独当作完成。 |
| 如何形成发布候选？ | 冻结书稿版本、目录、引用、构建输入、验证结果和未覆盖范围，再进入人工发布决定。 | 在本章中自动发布、生成真实 PDF/EPUB、分发内容或授予版权/审批权限。 |

## 已核验的一手资料与受限用途

| 本地键 | 来源明确表达的内容 | 允许用于本章的范围 | 不可外推 |
| --- | --- | --- | --- |
| CH43-REF-01 | Write the Docs 的 Docs as Code 指南把版本控制、问题跟踪、代码审查和自动化测试列为文档采用软件开发实践的常见组成。 | 支持“文档可以进入可审查、可测试的仓库工作流”的社区工程背景。 | 这些实践能保证内容正确、作者责任充分、书籍可发布，或适合所有团队。 |
| CH43-REF-02 | Diátaxis 将教程、操作指南、参考和解释区分为服务不同读者需求的文档类型。 | 支持在章节设计时先确定读者任务与内容职责，避免把所有材料堆进同一叙述。 | Diátaxis 是本书唯一目录、完整质量标准，或四类内容必须一一对应章节。 |
| CH43-REF-03 | OpenAI Evaluation best practices 建议从目标出发，使用任务特定、贴近真实分布的数据，并持续评估与校准评分方法。 | 支持书籍质量门也需要目标、真实读者任务、可解释标准和人工校准的受限类比。 | 自动评分器能替代技术审查、语言审查、读者测试或出版决定。 |
| CH43-REF-04 | Reproducible Builds 将可复现构建限定为相同来源、构建环境和构建指令产生逐位一致工件。 | 支持发布工件需要记录来源、环境和构建指令，且“构建成功”与“可复现”是不同结论。 | 本仓库当前 PDF/EPUB 已可复现、跨平台逐位一致或供应链安全。 |
| CH43-REF-05 | Semantic Versioning 2.0.0 要求先声明 public API，并规定已发布版本不得原地修改。 | 作为书籍发布身份不可原地覆盖、读者可见契约需明确的受限类比。 | 自然语言内容具有 SemVer 意义，或版本号能证明事实、示例和链接兼容。 |

访问日期均为 2026-07-17。CH43-REF-01 至 CH43-REF-04 分别映射 REF-131、REF-132、REF-117、REF-133；CH43-REF-05 复用 REF-109。完整 URL 和外推禁区见[本章参考资料](43-writing-a-technical-book-with-harness.references.md)。

## 本仓库作为案例的事实边界

以下路径是本仓库当前存在的项目工件，可作为案例直接检查；它们不是外部来源的产品能力，也不能因为文件存在就推导内容正确。

| 责任 | 当前仓库工件 | 能证明什么 | 不能证明什么 |
| --- | --- | --- | --- |
| 项目契约 | `AGENTS.md`、`AI_BOOTSTRAP.md`、`BOOK_RULES.md`、`STYLE_GUIDE.md` | 写作、启动、审查和验证规则已显式保存。 | 每位参与者必然读取或遵守规则。 |
| 路线与目录 | `.ai/outline.md`、`.ai/roadmap.md`、`docs/SUMMARY.md` | 计划范围和出版顺序可被比较。 | 所有计划章节都已完成或顺序永久正确。 |
| 当前状态 | `.ai/progress.md`、`.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md` | 章节阶段、最近证据和下一任务有仓库内入口。 | 状态没有漂移；仍需与实际工件和校验结果核对。 |
| 术语与引用 | `.ai/glossary.md`、`.ai/references.md`、章节 `research/references/fact-check` 文件 | 来源、访问日期、术语和外推禁区可追溯。 | 来源仍然在线、动态事实仍新鲜或论证必然正确。 |
| 内容模板 | `CHAPTER_TEMPLATE.md`、`.ai/prompts/*`、`templates/*` | 章节、研究、图示、示例、审查和交接具有公共输入结构。 | 模板填满就等于内容有价值。 |
| 可运行证据 | `examples/`、`diagrams/`、`scripts/validate.sh`、阶段 review 记录 | 示例、图源和质量门有可执行入口及历史记录。 | 没有当前新鲜运行就能声称测试、图示或全仓验证通过。 |
| 交接 | `.context/HANDOFF.md` 与 `.memory/` | 已完成、未完成、边界和下一步可以脱离聊天传递。 | 交接没有遗漏或下一位执行者无需重新验证。 |

本章案例只能写“仓库提供了这些接口”。若正文要声称某项命令通过，必须在相应阶段重新执行并记录退出码与结果。

## 本书的 Book Harness 模型

| 工件 | 最小字段 | 主要责任 | 不承担的责任 |
| --- | --- | --- | --- |
| **书籍契约（Book Contract）** | 使命、读者、范围、原创性、风格、版权和完成定义。 | 限定整本书为何存在以及什么不能写。 | 不替代章节论证或出版合同。 |
| **章节契约（Chapter Contract）** | 学习目标、前置章节、读者场景、交付物、来源要求和非范围。 | 让章节成为可验收工作项，而非一个标题。 | 不表示草稿、示例或审查已完成。 |
| **阶段记录（Stage Record）** | 阶段、输入版本、产物、执行者、验证、未覆盖项和下一状态。 | 防止 Research、Draft、Review 与 Completion 互相冒充。 | 不自动推进状态或证明内容质量。 |
| **章节证据包（Chapter Evidence Package）** | 正文、来源映射、示例结果、图示检查、事实核验、语言审阅和校验结果。 | 为 Chapter DoD 提供逐项可回放证据。 | 不等同于审稿人批准、读者效果或发布。 |
| **出版候选清单（Publication Candidate Manifest）** | 书稿版本、目录、引用快照、构建输入、验证结果、未覆盖范围和责任人。 | 固定“准备发布的究竟是哪一份书”。 | 不执行构建、签名、上传、销售或分发。 |
| **生产看板（Production Board）** | 每章阶段、阻塞、更新时间和下一任务。 | 提供全书工作流的可视状态入口。 | 不以表格中的“完成”取代实际工件审计。 |

这些工件是本书从当前项目经验抽象出的接口。它们不要求特定 Markdown 工具、Git 托管平台、模型或发布系统。

## 章节工作流与状态断点

本仓库的章节流程依次为 Research Brief、Chapter Outline、First Draft、Technical Review、Example Implementation、Diagram Review、Fact Check、Language Editing、Validation 和 Completion。固定顺序的目的不是制造表格，而是保留以下断点：

1. **研究存在不等于论证成立。** Research Brief 只限定问题、来源和外推边界。
2. **提纲存在不等于正文完成。** Outline 只说明章节将如何回答读者问题。
3. **草稿完整不等于技术正确。** Technical Review 必须核对职责、来源、接口和相邻章节边界。
4. **示例通过不等于真实系统可用。** 示例的环境和副作用范围必须单独写明。
5. **图可渲染不等于图正确。** 需要图文一致性和视觉检查。
6. **事实核验不等于永久新鲜。** 动态来源在后续修订和出版前仍需重读。
7. **语言流畅不等于可发布。** 还需要全仓链接、目录、状态和构建入口验证。
8. **状态写为完成不等于完成。** Completion 必须由 Chapter Evidence Package 反向证明。

允许状态至少包括 `not_started`、`in_progress`、`blocked` 和 `complete`。阻塞原因必须指向缺少的输入或决定；不能用“进行中”长期隐藏未知项。

## Chapter DoD 的最小证据

| 检查面 | 最小证据 | 保守失败出口 |
| --- | --- | --- |
| 目标与结构 | 学习目标、场景、前置和章节依赖相互一致。 | `needs_scope_review` |
| 原创与来源 | 可归因事实有引用，来源观点与本书扩展分开。 | `needs_fact_evidence` |
| 示例 | 路径、环境、命令、真实结果和未运行范围明确。 | `needs_example_evidence` |
| 图示 | Mermaid 源、导出物、正文一致性和视觉审查存在。 | `needs_diagram_review` |
| 技术与语言 | Technical Review、Fact Check、Language Editing 有独立记录。 | `needs_review` |
| 仓库质量门 | 当前版本实际运行 lint、链接、示例测试和章节状态检查。 | `validation_failed` |
| 交接与状态 | 生产看板、Current State、Next Task 和 Handoff 与工件一致。 | `state_drift` |

Chapter DoD 不是分数。来源缺失、示例失败或状态漂移等硬性缺口不能被流畅文字或高字数抵消。

## 并行写作的所有权边界

技术书适合并行研究、章节草稿、图示或审查，但共享目录、术语、引用、脚本和进度表容易发生冲突。本章案例采用“局部所有权、集中集成”：

- 工作者只修改声明的章节专属路径；
- 共享引用编号、术语、npm scripts、目录和状态由唯一集成者写入；
- 每个局部交付包列出实际验证和仍需集成的共享变更；
- 集成者重新运行全仓质量门，不把局部通过外推为全书通过。

这只是本书的协作模型，不表示文件锁、事务、Git 合并或 Agent 调度已经实现。

## 计划图示

Mermaid 图将路线图、章节契约、九个内容阶段、Chapter Evidence Package、全仓验证、状态同步和 Publication Candidate Manifest 连接成状态图。每个硬性缺口回到对应阶段；`chapter_complete` 仍需经过全书发布审查，不能直接画成已出版。

图必须明确三条断点：

- `stage_artifact_exists ≠ stage_verified`
- `chapter_complete ≠ book_releasable`
- `build_succeeded ≠ publication_approved`

## 计划纯内存示例

Example Implementation 可实现 `assessBookChapterCompletion(input)`，只读取注入的：

- `chapterContract`
- `stageRecords`
- `sourceEvidence`
- `exampleEvidence`
- `diagramEvidence`
- `reviewEvidence`
- `validationEvidence`
- `stateSync`
- `publicationRequest`

函数返回 `needs_evidence`、`validation_failed`、`state_drift`、`ready_for_chapter_review` 或 `publication_approval_required`。它不读取真实仓库、不运行 lint/链接/测试、不修改 Markdown、不调用模型、不构建 PDF/EPUB，也不发布或上传任何内容。

## 主要风险与后续核验

- **自指证据：** 本章描述本仓库自身流程，容易把规则文件中的目标写成已经实现的事实；正文必须用当前路径和新鲜命令区分“规定”与“证据”。
- **绿色检查过窄：** Markdown lint 和链接检查只能证明格式与链接层面，不证明技术事实、原创性、读者学习效果或发布资格。
- **状态漂移：** 生产看板可能落后于章节文件；Completion 前必须反向检查工件，而不是只读表格。
- **来源老化：** 产品文档、价格、API 和安全资料在写作后仍可能改变；发布候选需保存复核日期与未覆盖项。
- **并行冲突：** 多个作者同时修改共享术语、引用和目录时，局部正确仍可能造成全局不一致。
- **构建不可复现：** 即使某台机器生成 PDF/EPUB，也不能在没有来源、环境和指令证据时称为可复现构建。
- `TODO(verify)：` First Draft 当天重读 REF-131 至 REF-133，并重新确认 REF-117、REF-109 的页面与受限用途。
- `TODO(verify)：` Example Implementation 前读取仓库当前纯内存示例惯例；没有授权时不得遍历真实仓库或启动发布工具。
- `TODO(verify)：` Final Review 只能引用当轮实际运行的 `npm run validate` 结果，不沿用本 Research Brief 之前的历史成功记录。

## 下一阶段建议

Chapter Outline 应围绕“书籍契约 → 章节契约 → 阶段记录 → 证据包 → Chapter DoD → 全仓验证 → Publication Candidate”组织正文。案例应逐一解释本仓库工件的责任与漂移风险，而不是把目录树改写成说明书；示例和图示必须继续停在外部发布之前。
