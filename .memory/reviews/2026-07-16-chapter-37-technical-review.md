# 第 37 章 Technical Review

## 审查范围

- **工件：** `docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md`。
- **审查类型：** 技术审阅。
- **使用的规则与来源：** `BOOK_RULES.md`、`.ai/review-checklist.md`、第 37 章 Research Brief／References／Outline，以及第 36、38 章正文。写作日重新读取 OpenAI Agents SDK Sessions（REF-020）、LangChain Long-term memory（REF-022）、Agent Skills Specification（REF-024）与 Claude Code Skills（REF-025）。

## 结论

`可合并（进入 Example Implementation）`。正文将四项外部资料严格限制为各自的产品或规范背景；会话历史、项目记忆、Evidence Card、读写门、生命周期记录、项目适配层、只读／提议写入 Skill 和教学路由均明确标为本书工程模型或虚构教学输入。第 36 章的模式选择语言只作为前置选择框架，第 38 章只接收候选、评估与批准闭环；没有重复其控制流或批准机制论证。

## 必须修复

| 位置 | 问题 | 证据或规则 | 最小修复 |
| --- | --- | --- | --- |
| `前置知识与来源边界` | “保存本轮项目”可能把 SDK 所称的 run items 误解为项目对象。 | REF-020 说明 session 在 run 后保存本轮产生的项；来源事实必须保持受限且准确。 | 已改为“保存本轮产生的项”。 |

## 应该修复

无。来源限定、术语首现、教学状态与跨章连接均与本次审阅范围一致。

## 建议

无。后续阶段应继续把 `proposed_write`、`review_approved` 与真实写入或外部效果分开，并在 Fact Check 再次重读动态产品文档。

## 已执行验证与未验证范围

- 已在 2026-07-16 重新读取四份登记来源，确认：REF-020 仅覆盖特定 session 的跨 run 历史与服务端延续边界；REF-022 仅覆盖 LangChain 的 thread／跨 session 长期数据和 namespace／key 语境；REF-024 仅覆盖 `SKILL.md`、frontmatter、正文和可选资源的规范结构；REF-025 仅覆盖 Claude Code 的按需 Skill 与常驻项目指令的产品特定区别。
- 已执行 `npx markdownlint-cli2 docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md .memory/reviews/2026-07-16-chapter-37-technical-review.md`，退出码 0，2 个文件、0 个错误。
- 已执行 `git diff --check -- docs/part-06-design-and-evaluation/37-memory-and-skill-design-patterns.md .memory/reviews/2026-07-16-chapter-37-technical-review.md`，退出码 0、无输出。
- 未运行或模拟任何真实 Session、数据库、向量检索、嵌入、同步、权限系统、Skill、产品配置、文件、模型、账户、凭证、审批或外部系统。公开资料的只读获取不构成上述系统执行证据。
