---
title: "第 43 章参考资料：用 Harness 写一本技术书"
chapter: "43"
status: "completed"
updated_at: "2026-07-17"
---

# 第 43 章参考资料：用 Harness 写一本技术书

> `CH43-REF-*` 是本章局部追溯键；正文使用全局 REF 编号。外部来源只提供受限背景，本仓库的 Book Harness 工件与状态必须由当前文件和实际命令证明。

| 本地键 | 全局引用 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推 |
| --- | --- | --- | --- | --- | --- | --- |
| CH43-REF-01 | REF-131 | [Write the Docs：Docs as Code](https://www.writethedocs.org/guide/docs-as-code/) | 社区工程指南 | 2026-07-17 | 文档采用版本控制、问题跟踪、代码审查和自动化测试等软件开发实践的背景。 | 内容必然正确、流程充分、适合所有团队或书籍已可发布。 |
| CH43-REF-02 | REF-132 | [Diátaxis documentation framework](https://diataxis.fr/) | 文档设计框架 | 2026-07-17 | 教程、操作指南、参考和解释服务不同读者需求。 | 本书必须按四类划分章节，或框架构成完整质量标准。 |
| CH43-REF-03 | REF-117 | [OpenAI API：Evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices) | 官方动态指南 | 2026-07-17 | 任务特定、贴近真实分布、持续评估和人工校准的受限建议。 | 自动评分能替代技术、事实、语言、读者或出版审查。 |
| CH43-REF-04 | REF-133 | [Reproducible Builds：Definitions](https://reproducible-builds.org/docs/definition/) | 开放定义 | 2026-07-17 | 相同来源、构建环境和指令产生逐位一致工件的可复现构建定义。 | 本书当前 PDF/EPUB 已可复现、跨平台一致或供应链安全。 |
| CH43-REF-05 | REF-109 | [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) | 开放版本规范 | 2026-07-17 | 先声明 public API、已发布版本不可原地修改的规范背景。 | 自然语言内容自动符合 SemVer，或版本号证明事实与示例兼容。 |

## 仓库内案例来源

- 项目契约：`AGENTS.md`、`AI_BOOTSTRAP.md`、`BOOK_RULES.md`、`STYLE_GUIDE.md`。
- 路线与状态：`.ai/outline.md`、`.ai/progress.md`、`.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md`、`.context/HANDOFF.md`。
- 证据与质量门：章节阶段文件、`.memory/reviews/`、`examples/`、`diagrams/`、`scripts/validate.sh`。

这些路径证明仓库中存在可检查接口，不证明内容正确、命令当前通过、动态事实新鲜或规则已被所有参与者遵守。正文使用具体结果前必须重新运行对应命令。

## 使用规则

- 不逐段改写外部页面；只保存支撑本章工程问题所需的最小结论与外推禁区。
- Book Contract、Chapter Contract、Stage Record、Chapter Evidence Package、Publication Candidate Manifest、Production Board 和 Chapter DoD 均为本书工程模型。
- 不把历史 `npm run validate` 结果、文件存在或进度表状态写成当前完成证据。
- 不在本章声称真实 PDF/EPUB 构建、上传、发布、销售、分发、审批或读者效果已经发生。

## 完成检查

- [x] 每条外部来源有全局映射、稳定 URL、访问日期、允许用途和不可外推范围。
- [x] 外部事实、仓库可检查路径、本书工程模型和计划示例保持分层。
- [x] 动态指南已标记为 First Draft、Fact Check 和出版前重读对象。
- [x] 未引用动态价格、模型名、Benchmark 数值、固定阈值或虚构出版结果。
