---
title: "第 46 章参考资料：从书籍扩展到课程、博客和知识库"
chapter: "46"
status: "completed"
updated_at: "2026-07-17"
---

# 第 46 章参考资料：从书籍扩展到课程、博客和知识库

> `CH46-REF-*` 是本章局部追溯键，并映射到 `.ai/references.md` 的全局引用。来源只支持内容类型、复用、学习目标、学习资源元数据和 provenance 的限定背景；派生内容契约、状态、质量门与反馈回流均为本书工程模型。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH46-REF-01 | REF-132 | [Diátaxis documentation framework](https://diataxis.fr/) | 文档设计框架 | 2026-07-17 | 教程、操作指南、参考与解释对应不同用户需求，内容目的和组织方式需要区分。 | 四类必须一一对应本章派生物、能覆盖所有教学产品、或采用分类就能保证质量。 |
| CH46-REF-02 | REF-145 | [OASIS DITA 1.3：Introduction to DITA](https://docs.oasis-open.org/dita/dita/v1.3/os/part1-base/archSpec/base/introduction-to-dita.html) | OASIS 标准 | 2026-07-17 | DITA 是面向主题、按信息类型组织的 XML 架构，可用于以多种方式复用和 single-source 内容，并适用于培训与教育材料等出版物。 | 本书必须采用 DITA/XML、Markdown 已具备 DITA 语义、内容原子可无损复用、或工具自动解决漂移。 |
| CH46-REF-03 | REF-146 | [Carnegie Mellon Eberly Center：Learning Objectives](https://www.cmu.edu/teaching/designteach/design/learningobjectives.html) | 大学教学中心指南 | 2026-07-17 | 课程目标、评估与教学策略需要对齐；学习目标应以学生为中心，拆分复杂技能，并尽量使用可观察、可测的动作。 | 该页面是唯一课程设计方法、某个课程已对齐、测验分数等于真实能力，或本章能证明学习效果。 |
| CH46-REF-04 | REF-147 | [Schema.org：LearningResource](https://schema.org/LearningResource) | 开放元数据词汇开发版 | 2026-07-17 | LearningResource 可补充 Book、VideoObject 等主要类型，并提供 `teaches`、`assesses`、`competencyRequired`、`educationalLevel` 与 `learningResourceType` 等候选属性。 | 所有平台支持这些属性、字段可直接作为本书 Schema、元数据正确就保证可发现性或教学效果；页面明确处于 new area。 |
| CH46-REF-05 | REF-135 | [W3C Recommendation：PROV-DM](https://www.w3.org/TR/prov-dm/) | W3C Recommendation | 2026-07-17 | provenance 可表达实体、活动、Agent 及使用、生成、派生和归属等关系。 | 本章派生清单兼容 PROV、来源锚点真实、派生内容正确、授权充分或反馈已安全合并。 |

## 来源到章节问题的映射

| 章节问题 | 主要来源 | 本书需要自行设计的部分 |
| --- | --- | --- |
| 为什么同一主题不能直接复制到所有媒介？ | CH46-REF-01 | Tutorial、Workshop、Blog、FAQ 与 Knowledge Base Entry 的读者任务、粒度和完成条件。 |
| 哪些内容可以成为稳定复用单元？ | CH46-REF-02 | Markdown Content Atom、Source Anchor、复用等级和失效规则。 |
| 课程怎样从章节变成可练习路径？ | CH46-REF-03 | Learning Path Contract、练习输入、观察证据、反馈和人工教学判断。 |
| 派生内容需要哪些元数据？ | CH46-REF-04 | Derivative Content Manifest 的最小字段、平台适配与版本状态。 |
| 如何知道派生物来自哪一版书稿？ | CH46-REF-05 | 章节版本、片段锚点、转换活动、责任者、校验结果与回流候选的仓库映射。 |

## 仓库内案例来源

- 原始章节：`docs/part-05-case-studies/28-minimal-harness-from-scratch.md`。
- 章节证据：同目录的 `.research.md`、`.references.md`、`.outline.md`、`.example-plan.md` 与 `.fact-check.md`。
- 可运行示例：`examples/agent/minimal-harness-admission-assessment.mjs` 与对应 `.test.mjs` 文件。
- 图示与术语：`diagrams/mermaid/chapter-28-minimal-harness-loop.mmd`、`.ai/glossary.md`。
- 全书内容工厂接口：第 43、44 章和 `.ai/progress.md`。

这些路径只证明当前仓库存在可检查输入。它们不证明课程、博客、FAQ、知识库、网站、LMS、搜索索引、发布适配档案或反馈回流已经生成、部署或被读者使用。

## 使用规则

- 不逐段改写或拼接来源；来源只提供分类、标准、课程设计、元数据与溯源背景。
- DITA 是 XML 标准。本章的 Markdown Content Atom 是受限类比，不称为 DITA 实现。
- Schema.org 页面处于开发版 new area；正文只能把字段写成候选元数据，不得声称平台支持或互操作。
- 学习目标、练习与评估对齐是设计要求，不代表学习效果已经发生。
- 派生物必须保留来源锚点、版本、许可与事实复核日期；复制文字不等于完成媒介适配。
- First Draft、Fact Check 与出版前重新读取动态页面；外部平台行为若进入正文必须新增一手资料。

## 完成检查

- [x] 五项来源均有局部键、全局映射、访问日期、允许用途和不可外推范围。
- [x] 复用、重写、派生、发布与反馈回流保持为不同状态。
- [x] 未把 DITA、Diátaxis、Schema.org 或 PROV-DM 写成本书已实现能力。
- [x] 未声称真实课程、博客、FAQ、知识库、LMS、网站或发布流程已运行。
- [x] 仓库案例路径与来源事实分开记录。
