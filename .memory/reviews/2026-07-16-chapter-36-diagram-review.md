---
chapter: "36"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 36 章 Diagram Review：Harness Design Patterns

## 审查范围

- 工件：`diagrams/mermaid/chapter-36-control-flow-pattern-selection.mmd`、导出的 SVG／PNG、正文 Mermaid 块、导出链接与替代说明。
- 问题：同一虚构只读请求如何先比较模式卡的契约字段，再在五种控制流模式之间作出受限选择，同时不把模式名称或箭头画成真实调度、并发、事件处理或外部效果？
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`STYLE_GUIDE.md`、`diagrams/README.md` 与 `.ai/review-checklist.md`。

## 图示结论

图把 Pattern Card 与契约检查置于五张模式卡之前：缺控制权、状态／证据或停止条件时进入 `conservative_stop`，请求外部效果时只进入 `requires_approval`。受控单循环、计划—执行、监督者—工作者、流水线和事件驱动都只交回受限的教学产物；最终由 Result Owner 整合下一步、停止原因或升级记录。

三条责任断点保持可读：计划—执行节点明确“计划 ≠ 执行许可”；事件节点明确“事件 ≠ 已处理”；`ready` 明确只可进入隔离教学实现，不能推出外部效果。事件的消费者、顺序或去重不明，监督者—工作者的共享状态或合并责任不明，以及流水线的阶段失败或回退不明，均转入 Escalation Record 后保守停止。

## 已执行验证与未验证范围

- `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-36-control-flow-pattern-selection.mmd -o diagrams/exported/chapter-36-control-flow-pattern-selection.svg -b white`：退出码 0。
- 同版本 Mermaid CLI 以 `-b white -s 2` 导出 PNG：退出码 0；PNG 尺寸为 1568×990。
- 已实际查看 PNG：虚构请求、Pattern Card、契约检查、五张模式卡、Result Owner、`ready`、`requires_approval`、Escalation Record 与 `conservative_stop` 均完整可读，没有文字截断。五张卡的箭头只汇回教学结果所有者或升级出口，没有指向真实执行或外部效果。
- 已用 Node 从正文抽取 Mermaid 块并与 `.mmd` 图源逐字比较：退出码 0，输出 `Mermaid body block matches source byte-for-byte.`。
- `./node_modules/.bin/markdownlint-cli2 docs/part-06-design-and-evaluation/36-harness-design-patterns.md .memory/reviews/2026-07-16-chapter-36-diagram-review.md`：退出码 0，检查 2 个文件、0 个错误。
- `git diff --check -- docs/part-06-design-and-evaluation/36-harness-design-patterns.md diagrams/mermaid/chapter-36-control-flow-pattern-selection.mmd diagrams/exported/chapter-36-control-flow-pattern-selection.svg diagrams/exported/chapter-36-control-flow-pattern-selection.png .memory/reviews/2026-07-16-chapter-36-diagram-review.md`：退出码 0，无输出。
- 未运行全仓 `npm run validate`；共享状态和全仓验证由主线程统一收口。没有运行或模拟真实 Agent、模型、工作者、队列、事件总线、调度器、工作流、并发、工具、Git、浏览器、CI、网络、账户、凭证或外部系统；图只表达本书教学模型。
