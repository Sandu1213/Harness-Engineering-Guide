---
chapter: "13-knowledge-base-and-retrieval"
stage: "Language Editing"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 13 章 Language Editing 记录

## 审查范围

- 工件：`docs/part-02-components/13-knowledge-base-and-retrieval.md`。
- 审查类型：语言、术语首现、段落节奏、主语与阶段时态。
- 使用的规则：`STYLE_GUIDE.md`、`BOOK_RULES.md`、第 13 章 Fact Check。

## 结论

`可合并`。本次语言审查只改善可读性和证据语义的精确度；没有新增可归因事实，没有扩大 C13-REF-01 至 C13-REF-03 的限定范围，也没有改变纯内存示例、Mermaid 图或案例边界。

## 已完成编辑

- 统一知识库（Knowledge Base）、索引（Index）、候选（Candidate）、证据单元（Evidence Unit）、检索策略（Retrieval Policy）和证据卡（Evidence Card）的首次呈现，并把它们的英文术语限制在首次或必要对照处。
- 将场景导语改为“候选先通过范围、来源、新鲜度、稳定位置和引用回链检查，才可进入模型上下文”，避免把“通过”误读为真实检索或验收成功。
- 将排序、来源、时间与回链改写为“不能互相代偿的不同维度”，使相似度分数的边界更明确。
- 收束案例、测试表和总结中的主语：Policy 只判断候选资格，Evidence Card 只提供回链，Evaluation 才作独立接受判定。
- 拆分含多个否定条件的长句，并保留 `needs_evidence`、`blocked` 与停止/升级的差异。

## 边界

本次编辑不修改局部候选资料、Research Brief、事实核验结论、示例输入输出、7 项测试、Mermaid 源或 SVG/PNG。它不将本书术语、图示、示例、链接检查或 Markdown lint 表述为真实知识库、索引、来源可信度、内容正确性、权限或任务结果证明。

## 已执行验证与未验证范围

- 语言编辑后，已实际运行本章 9 个 Markdown 工件的 `markdownlint-cli2`，0 个错误；正文、Research Brief 与候选资料的链接检查均通过；纯内存示例 7 项测试和演示均通过。
- 未运行全仓 `npm run validate`，未更新全局进度、引用、词表、目录、示例索引、包脚本、校验入口或 `.context` 状态文件；这些共享项留给主线程统一整合。
