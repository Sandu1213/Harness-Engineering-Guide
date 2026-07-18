---
chapter: "39"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-17"
---

# 第 39 章 Diagram Review：Harness 测试证据回路

## 审查范围

- 工件：`diagrams/mermaid/chapter-39-harness-testing-evidence-loop.mmd`、导出的 SVG／PNG、正文 Mermaid 块、导出链接与替代说明。
- 问题：版本化 Eval Suite 怎样经过组件与契约、边界与集成、完整任务和离线 Benchmark 形成受限候选证据；线上观察又怎样先经过候选任务准入，而不直接修改 Prompt、Skill、模型或发布？
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`STYLE_GUIDE.md`、`diagrams/README.md` 与 `.ai/review-checklist.md`。

## 图示结论

图以 Eval Suite 为离线测试入口，依次经过组件与契约、边界与集成、完整任务和离线 Benchmark。四条主链箭头分别写明：组件通过不证明真实依赖、替身通过不证明完整任务、一次任务通过不证明稳定、总分不能覆盖硬性失败。

比较门将三类结果分开：条件未对齐进入 `not_comparable`，硬性门失败进入 `regression_detected / blocked`，条件对齐且没有硬性回归才形成 `ready_for_review`。该状态只把证据交给第 38／42 章，没有直接发布、灰度、回滚或线上观察箭头。

线上观察作为第五层先进入候选任务准入。只有授权、隐私、代表性与可复现性齐全时才回到 Eval Suite；条件不足进入 `needs_evidence`，并明确禁止直接修改 Prompt、Skill、模型或发布。

## 已执行验证与未验证范围

- `npx --yes @mermaid-js/mermaid-cli@11.16.0` 导出 SVG：退出码 0。
- 同版本 Mermaid CLI 以 `-b white -s 2` 导出 PNG：退出码 0；PNG 尺寸为 1568×3282。
- 已实际查看 PNG：五层编号、候选准入、四层离线主链、比较门、三个结果出口和第 38／42 章交接均完整可读；文本、节点与箭头没有截断。
- 已用 Node 从正文抽取 Mermaid 块并与 `.mmd` 图源逐字比较：退出码 0，输出 `Mermaid body block matches source byte-for-byte.`。
- `node --test examples/agent/harness-evaluation-plan-assessment.test.mjs`：退出码 0，8 项通过、0 项失败。
- 定向 Markdown lint：退出码 0，检查正文和本审查记录，0 个错误。
- 定向 `git diff --check`：退出码 0，无输出。
- 未运行全仓 `npm run validate`；共享脚本和项目状态由主线程统一收口。
- 图只表达本书的教学证据路由。没有运行模型、Harness、工具、Benchmark、线上观察、发布、灰度、回滚、账户、凭证或其他外部系统。
