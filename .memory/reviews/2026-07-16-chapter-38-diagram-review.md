---
chapter: "38"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 38 章 Diagram Review：反思、评估与批准模式

## 审查范围

- 工件：`diagrams/mermaid/chapter-38-feedback-approval-decision-flow.mmd`、导出的 SVG／PNG、正文 Mermaid 块、导出链接与替代说明。
- 问题：一份注入的 Observation 或 Evaluation Evidence 怎样经由证据门、反思、候选、分离评估与批准门形成可读的 Decision Package，同时不把补证、评估接受、批准请求或记录误画为真实执行？
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`STYLE_GUIDE.md`、`diagrams/README.md` 与 `.ai/review-checklist.md`。

## 图示结论

图以“证据、范围、效果状态、预算与停止条件”作为入口门。缺少这些信息会进入 `needs_evidence`／`collect_more_evidence`，并把理由保存到 Decision Package；`retry_limited` 只回到注入的 Observation／Evaluation Evidence，不跳到 Candidate Change。

主链依次为 Reflection Record、Candidate Change、Separated Evaluation、Approval Gate 与 Decision Package。分离评估只能把范围匹配的候选交给 Approval Gate；`ready_for_approval` 只记录请求的决定，不授予外部执行。拒绝、升级和补证同样保留到只读 Decision Package，最后在 `blocked` 处明确：任何外部行动仍需要独立契约。

## 已执行验证与未验证范围

- `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-38-feedback-approval-decision-flow.mmd -o diagrams/exported/chapter-38-feedback-approval-decision-flow.svg -b white`：退出码 0。
- 同版本 Mermaid CLI 以 `-b white -s 2` 导出 PNG：退出码 0；PNG 尺寸为 1568×2230。
- 已实际查看 PNG：入口、证据门、`retry_limited` 回流、反思／候选／评估／批准主链、`needs_evidence`、`rejected`、`escalated`、Decision Package 与 `blocked` 均完整可读；文本和箭头没有截断。图中没有“评估通过即批准”“批准即执行”或“回放包即回滚”的箭头。
- 已用 Node 从正文抽取 Mermaid 块并与 `.mmd` 图源逐字比较：退出码 0，输出 `Mermaid body block matches source byte-for-byte.`。
- `./node_modules/.bin/markdownlint-cli2 docs/part-06-design-and-evaluation/38-reflection-evaluation-and-approval-patterns.md .memory/reviews/2026-07-16-chapter-38-diagram-review.md`：退出码 0，检查 2 个文件、0 个错误。
- `git diff --check -- docs/part-06-design-and-evaluation/38-reflection-evaluation-and-approval-patterns.md diagrams/mermaid/chapter-38-feedback-approval-decision-flow.mmd diagrams/exported/chapter-38-feedback-approval-decision-flow.svg diagrams/exported/chapter-38-feedback-approval-decision-flow.png .memory/reviews/2026-07-16-chapter-38-diagram-review.md`：退出码 0，无输出。
- 未运行全仓 `npm run validate`；共享状态和全仓验证由主线程统一收口。没有访问、调用或模拟真实 Agent、模型、文件、网络、Git、CI、审批、回滚、账户、凭证或其他外部系统；图只表达本书的教学责任路由。
