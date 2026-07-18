---
title: "第 43 章 Technical Review：用 Harness 写一本技术书"
chapter: "43"
stage: "Technical Review"
status: "completed"
updated_at: "2026-07-17"
---

# 第 43 章 Technical Review：用 Harness 写一本技术书

## 审查范围

- 第 43 章 Research Brief、参考资料、详细 Outline 与 First Draft。
- `BOOK_RULES.md`、`STYLE_GUIDE.md`、Technical Review Prompt、Review Checklist 与审查模板。
- REF-131、REF-132、REF-117、REF-133、REF-109 的章节限定和全局登记；First Draft 工作流已于 2026-07-17 重读原始页面，本轮重新核对同日来源卡与不可外推范围。
- 正文列出的规则、路线、状态、术语、来源、模板、提示、示例、图示、验证和交接路径。
- 第 42 章的版本身份、发布决定与回滚边界，以及第 44 章 Research/References 和全局规划中的多角色 Book Factory 边界。
- Book Contract、Chapter Contract、Stage Record、Chapter Evidence Package、Chapter DoD、Production Board 与 Publication Candidate Manifest 的责任、首现和阶段时态。

## 结论

`可继续进入 Example Implementation`。正文在最小修正后保持四层信息分离：外部来源只提供受限背景，当前仓库路径只证明接口存在，Book Harness 工件与状态码属于本书模型，漂移场景和计划示例不描述真实执行。没有把 Markdown lint、文件存在、章节状态、单机构建或批准请求外推为内容正确、构建可复现或已经出版。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| “最小示例（计划）” | `ready_for_chapter_review` 容易与固定流程中的 Technical Review 混淆，无法说明它位于 Completion 之前。 | `BOOK_RULES.md` 将 Technical Review 固定为第 4 阶段。 | 改为 `ready_for_completion_review`，并明确它只表示可进入 Completion 前终审。已修复。 |
| “完整工程案例”与完成检查表 | First Draft 已结束，正文仍写“结果将在实际执行后记录”和“Technical Review 尚未完成”，阶段证据已经过期。 | 状态必须描述当前实际阶段，不能把计划冒充现状。 | 改写为 First Draft 已有的 0 错误结果、Technical Review 当前职责和后续未完成阶段。已修复；最终校验结果在本记录末尾补充。 |

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| 章首、为什么要学、前置知识 | `Book Harness`、`Docs as Code` 与 `front matter` 首次出现时缺少中文定义。 | `BOOK_RULES.md` 与 `STYLE_GUIDE.md` 要求英文术语首次以“中文（English）”出现。 | 分别改为“书籍 Harness（Book Harness）”“文档即代码（Docs as Code）”与“YAML 前置元数据（front matter）”。已修复。 |
| “出版候选清单” | 未直接说明本章与第 42 章版本身份和发布实验的分工。 | 相邻章节都讨论版本和发布，缺少断点会让读者误以为 Publication Candidate Manifest 重复 Release Decision Record。 | 增加边界：第 42 章负责不可变 Harness 身份、比较、发布决定和回滚；本章只绑定书稿身份与书籍工件/证据。已修复。 |
| “并行生产” | 多阶段与多 Agent 角色工厂的边界不够显式。 | 第 44 章规划将负责角色契约、证据交接、队列与冲突回流。 | 明确本章只负责书籍工件、阶段证据和集中集成，不声称 Agent 编排已运行。已修复。 |

## Book Harness 工件责任复核

| 工件 | 本章保留的责任 | 已排除的责任 |
| --- | --- | --- |
| Book Contract | 约束整书使命、读者、范围、原创性、风格、版权与完成定义。 | 不替代章节论证或出版合同。 |
| Chapter Contract | 把读者目标、输入、交付物、来源要求和非范围固定到单章。 | 不表示草稿、示例、图示或审查已完成。 |
| Stage Record | 记录阶段输入版本、专属产物、实际验证、未覆盖项和下一状态。 | 不自动推进状态或证明内容质量。 |
| Chapter Evidence Package | 关联正文、来源、示例、图示、审查、验证与状态同步证据。 | 不等于文件压缩格式、审稿批准、读者效果或发布。 |
| Chapter DoD | 以不可互相抵消的硬性门判断能否进入 Completion。 | 不计算统一质量分，不让字数或单项绿色结果覆盖失败。 |
| Production Board | 导航章节阶段、阻塞、更新时间和下一任务。 | 不授权修改、集成或发布，也不以表格状态替代工件审计。 |
| Publication Candidate Manifest | 固定待出版决定的书稿身份、章节集合、目录、引用/术语快照、构建输入、验证与未覆盖范围。 | 不执行构建、签名、上传、销售、分发或出版批准。 |

## 来源与仓库证据复核

| 引用或证据 | 本轮结论 | 保留的外推禁区 |
| --- | --- | --- |
| REF-131 | 只支持 Docs as Code 使用问题跟踪、版本控制、纯文本、审查和自动化测试等工程实践的社区背景。 | 不保证内容正确、流程充分、适合所有团队或书籍可发布。 |
| REF-132 | 只支持教程、操作指南、参考与解释服务不同读者需求。 | 不把 Diátaxis 写成本书固定目录、唯一分类或完整质量标准。 |
| REF-117 | 只支持任务特定、真实分布、持续评估和人工校准的受限类比。 | 不让自动评分替代技术、事实、语言、读者或出版审查；Fact Check 仍需重读动态页面。 |
| REF-133 | 只使用相同来源、构建环境和指令产生逐位一致工件的定义。 | 不声称当前 PDF/EPUB 已可复现、跨平台一致或供应链安全。 |
| REF-109 | 只借用先声明 public API 与已发布版本不可原地修改的原则。 | 不为自然语言内容套用 SemVer 语义，也不让版本号证明事实或示例兼容。 |
| 当前仓库路径 | 正文列出的规则、路线、状态、术语、来源、模板、提示、示例、图示、验证和交接入口均存在。 | 路径存在不证明内容正确、当前命令通过、状态无漂移或规则已被执行。 |

## 共享集成项

`.ai/glossary.md` 当前未登记 Book Contract、Chapter Contract、Stage Record、Chapter Evidence Package、Chapter DoD、Production Board 和 Publication Candidate Manifest。正文已经按首次出现规则给出受限定义；由于本轮禁止修改共享文件，术语登记必须由主线程在后续集成时完成，未登记状态不应被写成已解决。

## 已执行验证与未验证范围

- 已执行 `rtk npx markdownlint-cli2 docs/part-07-future/43-writing-a-technical-book-with-harness.md`：退出码 0，1 个文件，0 个错误。
- 已逐项检查正文引用的仓库路径；只记录“存在”，未据此推断内容或状态正确。
- 已执行正文与本记录的联合 Markdown lint：退出码 0，2 个文件，0 个错误。
- 已执行定向 `git diff --check`：退出码 0；尾随空白扫描无匹配。
- 未运行全仓 `npm run validate`、示例测试、Mermaid 渲染、PDF/EPUB 构建、发布、上传、销售或分发。
- 未创建示例、图示或任何共享文件；Example Implementation、Diagram Review、Fact Check、Language Editing、Validation 与 Completion 仍是后续阶段。
