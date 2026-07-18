---
chapter: "37"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 37 章 Diagram Review：Memory 与 Skill Design Patterns

## 审查范围

- 工件：`diagrams/mermaid/chapter-37-memory-skill-boundaries.mmd`、导出的 SVG／PNG、`docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md` 中的 Mermaid 块、导出链接与替代说明。
- 问题：在一个虚构事实核验任务中，怎样让会话历史、任务锚点、事件记录、候选证据、只读 Skill、提议写入、审查、项目记忆与生命周期各自停在可检查的责任边界，而不把候选、审查或记录状态写成真实读写、授权或外部效果？
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`STYLE_GUIDE.md`、`diagrams/README.md`、`.ai/review-checklist.md`，以及第 37 章 Research Brief、References、Outline、Technical Review 和正文。

## 图示结论

图将 `Session History` 限定为 Task Anchor 的本轮上下文，并把 `Event Record` 限定为关联候选；二者都没有直达 `Project Memory` 的箭头。`Candidate Evidence Card` 经 `Read-Only Skill` 比较后只形成 `evidence_candidate`。当提议写入契约给出目标类别、变更理由与审查状态时，才形成 `proposed_write`，而该候选仍必须经过独立／人工审查，才能在声明范围内成为本书的 `Project Memory` 教学记录。

图将版本、替代、弃用与维护终点集中在 `Lifecycle Record`，让后续任务重新把记录视为候选；没有用版本号推断迁移、权限或自动加载。来源缺失、资料过期、范围冲突／跨项目和弃用关系不明分别落到 `needs_evidence`、`needs_refresh`、`needs_review`、`not_applicable`／`needs_human_review`，随后进入 `conservative_stop`。停止节点明确只能补证、刷新、复核或定位替代，不得自动写入、同步或执行。

## 必须修复

无。

## 应该修复

无。

## 建议

无。后续 Fact Check、Language Editing 与 Final Review 应继续保持 `evidence_candidate ≠ fact_verified`、`proposed_write ≠ memory_updated` 和“审查记录不等于外部效果”的边界。

## 已执行验证与未验证范围

- `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-37-memory-skill-boundaries.mmd -o diagrams/exported/chapter-37-memory-skill-boundaries.svg -b white`：退出码 0。
- 同版本 Mermaid CLI 使用 `-b white -s 2` 导出 PNG：退出码 0；PNG 尺寸为 1568×2338。
- 已实际查看 PNG：Session History、Task Anchor、Event Record、Candidate Evidence Card、Read-Only Skill、提议写入契约、`proposed_write`、独立／人工审查、Project Memory、Lifecycle Record、四类停止原因与 `conservative_stop` 都完整可读，未见文字截断。图中 `proposed_write` 只通往审查，Project Memory 只经审查可达；没有会话直达项目记忆、候选直达事实、Skill 发现直达执行或审查直达外部效果的箭头。
- 已执行 Node 比较，从正文抽取 Mermaid 块并与 `.mmd` 图源逐字比较：退出码 0，输出 `Mermaid body block matches source byte-for-byte.`。
- 已执行 `node_modules/.bin/markdownlint-cli2 docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md`：退出码 0，1 个文件、0 个错误。
- 已执行 `git diff --check -- docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md diagrams/mermaid/chapter-37-memory-skill-boundaries.mmd diagrams/exported/chapter-37-memory-skill-boundaries.svg diagrams/exported/chapter-37-memory-skill-boundaries.png`：退出码 0，无输出。
- 未运行全仓 `npm run validate`；共享状态与全仓校验由主线程统一收口。没有运行或模拟真实 Session、数据库、检索、同步、权限、Skill、网络、文件、模型、账户、凭证、审批或外部系统；图只说明本书教学模型。
