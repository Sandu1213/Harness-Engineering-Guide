---
title: "第 43 章详细 Outline：用 Harness 写一本技术书"
chapter: "43"
status: "completed"
updated_at: "2026-07-17"
---

# 第 43 章详细 Outline：用 Harness 写一本技术书

## 写作契约

### 本章要完成的学习目标

读者完成本章后应能：

1. 将技术书拆成 Book Contract、Chapter Contract、Stage Record、Chapter Evidence Package、Production Board 与 Publication Candidate Manifest，而不是一组孤立 Markdown。
2. 为章节建立 Research、Outline、Draft、Technical Review、Example、Diagram、Fact Check、Language Editing、Validation 和 Completion 的状态与证据断点。
3. 设计 Chapter Definition of Done（Chapter DoD），防止字数、文件存在、单项测试或进度表中的“完成”冒充可发布证据。
4. 用本仓库的规则、状态、模板、术语、引用、示例、图示和验证脚本解释局部所有权与集中集成。
5. 为纯内存章节完成准入器与 Book Harness 状态图定义输入、输出、保守出口和外部发布边界。

### 读者、前置与明确边界

- **读者：** 需要长期维护技术书、课程或大型文档项目的工程师、技术作者、编辑和 AI 工作流设计者。
- **前置：** 第 3 章仓库上下文、第 17 章可验证结果、第 26 章任务隔离、第 39 章测试/Benchmark、第 42 章版本与发布决定。
- **本章负责：** 书籍与章节契约、阶段状态、证据包、质量门、生产看板、交接和出版候选身份。
- **本章不负责：** 自动写作质量保证、真实 PDF/EPUB 构建、上传、销售、分发、版权授权、编辑批准、读者效果或发布平台实现。

### 来源、仓库证据与本书模型分层

| 使用位置 | 来源或证据 | 允许的有限陈述 | 本书原创内容 |
| --- | --- | --- | --- |
| 第 1、3、8 节 | REF-131 | Docs as Code 将版本控制、问题跟踪、审查和自动化测试作为文档工程实践背景。 | Book Harness、Stage Record、Production Board 与集中集成。 |
| 第 2、4 节 | REF-132 | 教程、操作指南、参考和解释服务不同读者需求。 | Chapter Contract 的学习目标、场景与内容职责检查。 |
| 第 5、6 节 | REF-117 | 评估应任务特定、贴近真实分布、持续运行并经人工校准。 | Chapter DoD、Chapter Evidence Package 与硬性门。 |
| 第 7、9 节 | REF-133 | 可复现构建要求相同来源、环境和指令产生逐位一致工件。 | Publication Candidate Manifest 与“构建成功不等于可复现/已批准”的断点。 |
| 第 7、9 节 | REF-109 | 已发布版本不可原地修改；public API 需先声明。 | 书籍版本身份与读者可见契约的受限类比。 |
| 全章案例 | 当前仓库路径与当轮命令 | 仓库存在显式规则、状态、模板、示例、图示和校验入口。 | 对这些接口的责任映射、漂移诊断和完成准入模型。 |

正文必须写清“来源指出”“仓库当前存在”“本书建议”和“虚构教学输入”。文件存在只证明接口可检查；具体命令结果必须来自当轮实际执行。

## 章节叙事与逐节蓝图

### 1. 为什么很多 Markdown 仍然不是一本可维护的书

- **读者问题：** 文件越来越多时，为什么术语、事实、示例和章节状态反而更容易失控？
- **场景：** 多名作者和 Agent 在数月中补写同一本书，研究日期、草稿状态、示例输出和下一任务散落在聊天与文件名中。
- **来源边界：** REF-131 只提供 Docs as Code 的社区实践背景，不证明版本控制能自动解决内容问题。
- **本书模型：** 用“内容、状态、证据、责任、发布身份”五列展示孤立 Markdown 缺少的接口。
- **停止条件：** 无法找到权威状态、来源或验收入口时，先建立契约和现状记录，不继续批量写正文。

### 2. Book Contract 与 Chapter Contract：先定义读者价值和非范围

- **读者问题：** 怎样让一本书和一章成为可验收产品，而不只是主题列表？
- **来源边界：** REF-132 只说明不同文档类型服务不同读者需求；不要求本书照搬四类目录。
- **本书工件：** Book Contract 记录使命、读者、范围、原创性、风格、版权和整书 DoD；Chapter Contract 记录学习目标、前置、场景、交付物、来源要求和非范围。
- **案例映射：** `BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/outline.md` 与章节 front matter 分别承担哪些责任。
- **最小证据：** 目标必须能由读者产出或判断验证；“介绍 X”改写为“读者能为 X 建立可审查契约”。

### 3. Stage Record：让研究、草稿和审查不能互相冒充

- **读者问题：** 为什么一个 `status: draft` 不足以支撑长周期协作？
- **本书工件：** Stage Record 包含阶段、输入版本、专属产物、执行者、实际验证、未覆盖范围、下一状态和更新时间。
- **工作流：** Research → Outline → Draft → Technical Review → Example → Diagram → Fact Check → Language Editing → Validation → Completion。
- **责任断点：** 研究存在不等于论证成立；草稿完整不等于技术正确；示例通过不等于真实系统可用；图可渲染不等于图正确；语言流畅不等于可发布。
- **停止条件：** 阶段产物缺失、输入漂移或真实验证未知时，保持 `in_progress`/`blocked`，不能跳到 Completion。

### 4. 术语、引用、图示和示例是共享接口

- **读者问题：** 为什么书籍内部一致性需要像软件接口一样管理？
- **仓库案例：** `.ai/glossary.md`、`.ai/references.md`、章节 references/fact-check、`diagrams/`、`examples/` 和 `docs/SUMMARY.md`。
- **本书模型：** 术语登记定义稳定名称与边界；引用登记保存允许用途和访问日期；图源与正文必须一致；示例说明环境、命令、结果和未运行范围。
- **来源边界：** REF-132 只帮助识别内容职责；具体术语、引用和工件规则来自本仓库。
- **失败分支：** 术语冲突、引用无全局映射、示例路径不存在、图源与正文不同或目录链接失效分别回到对应阶段。

### 5. Chapter Evidence Package 与 Chapter DoD

- **读者问题：** 怎样证明一章完成，而不是只在看板上把它标绿？
- **来源边界：** REF-117 只提供任务特定、真实分布、持续评估和人工校准的建议；不提供书籍评分器。
- **本书工件：** Evidence Package 汇集正文、来源映射、示例测试/演示、图示导出/视觉检查、Technical Review、Fact Check、Language Editing、全仓校验和状态同步。
- **硬性门：** 来源缺失、示例失败、图示不可读、动态事实未重读或状态漂移不能用字数、流畅度或其他通过项抵消。
- **状态：** `needs_scope_review`、`needs_fact_evidence`、`needs_example_evidence`、`needs_diagram_review`、`needs_review`、`validation_failed`、`state_drift`、`ready_for_chapter_review`。

### 6. 生产看板与状态漂移诊断

- **读者问题：** 进度表何时有用，何时会制造虚假确定性？
- **仓库案例：** `.ai/progress.md` 是汇总入口，`CURRENT_STATE.md` 记录证据和阻塞，`NEXT_TASK.md` 只保留可领取任务，`HANDOFF.md` 保存接力边界。
- **本书规则：** 看板状态必须能反向定位实际工件；状态文件不一致时，以最近的新鲜验证和实际产物为基线修正。
- **最小检查：** 比较 front matter、阶段文件、review 记录、示例/图示路径和校验输出，而不是只统计表格单元格。
- **停止条件：** 无法证明状态来源时输出 `state_drift`，先同步状态再开始下一章。

### 7. Publication Candidate Manifest：章节完成仍不等于全书可发布

- **读者问题：** 当所有章节完成后，还需要冻结和审查什么？
- **来源边界：** REF-109 只作发布身份不可原地覆盖的类比；REF-133 只定义可复现构建，不证明本仓库已经实现。
- **本书工件：** Manifest 记录书稿版本、目录、章节集合、引用/术语快照、构建输入、验证结果、未覆盖项、责任人和批准状态。
- **责任断点：** `chapter_complete ≠ book_releasable`、`build_succeeded ≠ reproducible_build`、`reproducible_build ≠ publication_approved`。
- **非范围：** 本章不运行 PDF/EPUB 构建、签名、上传、商店分发或版权审批。

### 8. 并行生产：局部所有权与集中集成

- **读者问题：** 如何让多个作者/Agent 并行而不互相覆盖共享状态？
- **来源边界：** REF-131 只提供审查与版本控制背景；具体协作模型来自第 26 章与本仓库实践。
- **局部所有权：** 每个工作者只修改章节专属正文、研究、图示、示例或审查文件。
- **集中集成：** 唯一集成者写共享引用编号、术语、目录、npm scripts、进度和上下文，并重新运行全仓质量门。
- **停止条件：** 路径重叠、共享写入未经路由、输入版本漂移或局部验证不完整时，交付包进入冲突/补证，不直接合并状态。

### 9. 完整案例：本仓库怎样成为 Book Harness

- **读者问题：** 一次章节从规划到完成，哪些文件在何时承担责任？
- **路径：** `.ai/outline.md` 选定章节 → Research/References → Outline → 正文 →阶段审查 → 示例/图示 → Fact Check/Language → `npm run validate` → progress/context/handoff。
- **输入案例：** 第 43 章自身作为受控示例；正文必须区分“规则规定什么”“当前仓库存在什么”“本轮命令证明什么”。
- **漂移案例：** 示例已经实现但 README/npm 入口未同步；进度表仍写未开始；历史 validate 通过但当前新增文件有 lint 错误。
- **结果边界：** 案例只证明仓库内工件和当前命令，不证明出版、读者效果、所有协作者遵守规则或动态事实永久新鲜。

### 10. 最小纯内存示例、图示与渐进增强

- **计划函数：** `assessBookChapterCompletion(input)` 读取 Chapter Contract、Stage Records、来源/示例/图示/审查/验证证据、状态同步和出版请求，返回保守路由；不做 I/O。
- **计划测试：** 覆盖缺研究、Outline/Draft 顺序错、来源缺失、示例失败、图示未视觉审查、审查缺失、全仓验证失败、状态漂移、完整章节和出版请求需批准。
- **计划图示：** Roadmap → Chapter Contract → 九阶段 → Evidence Package → Chapter DoD → Repository Validation → State Sync → Publication Candidate；每个硬性缺口回到负责阶段。
- **图示断点：** `artifact_exists ≠ verified`、`chapter_complete ≠ book_releasable`、`build_succeeded ≠ publication_approved`。
- **渐进增强：** 真正的出版管线需构建环境锁定、PDF/EPUB 视觉/可访问性检查、许可证/版权审查、人工编辑决定、签名和分发回读；这些均不在纯内存示例中实现。

## 后续阶段交付与验证契约

| 阶段 | 计划产物 | 不应提前声称的事实 |
| --- | --- | --- |
| First Draft | 原创正文、仓库案例、六类核心工件、DoD、漂移诊断和跨章节过渡。 | 示例、图示、审查、构建或发布已完成。 |
| Technical Review | 重读 REF-131 至 REF-133、REF-117、REF-109；核对仓库路径、职责和相邻章节边界。 | 来源规定本书流程或本仓库当前质量门已通过。 |
| Example Implementation | 纯内存准入器、最小测试和无副作用演示。 | 真实仓库已扫描、文件已修改、验证/构建/发布已执行。 |
| Diagram Review | Mermaid 源、导出图、正文一致性和视觉检查。 | 图中阶段状态代表外部系统状态。 |
| Fact/Language/Final | 来源复读、事实表、术语/时态、全章证据和当前验证结果。 | 历史结果仍新鲜或全书已经出版。 |

## Outline 完成检查

- [x] 覆盖 Book Contract、Chapter Contract、Stage Record、Evidence Package、Production Board、Chapter DoD 与 Publication Candidate Manifest。
- [x] 把规则、仓库路径、当轮运行证据与本书工程模型分开。
- [x] 说明章节阶段、硬性门、状态漂移、并行所有权与集中集成。
- [x] 为仓库案例、纯内存示例和状态图定义输入、输出、失败分支和未运行范围。
- [x] 只使用 REF-131、REF-132、REF-117、REF-133、REF-109 的受限范围，不把社区实践或开放定义写成质量保证。
- [x] 后续正文、示例、图示、审查、构建与发布仍明确为未完成。
