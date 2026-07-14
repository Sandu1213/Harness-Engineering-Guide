# AI Bootstrap

本文件是新 AI 加入仓库后的可执行启动流程。不要凭聊天摘要直接续写；仓库中的状态文件才是事实来源。

## 阅读顺序

1. 工具入口：`AGENTS.md`（Codex）或 `CLAUDE.md`（Claude Code）。
2. 本文件与 [BOOK_RULES.md](BOOK_RULES.md)。
3. `.context/PROJECT_CONTEXT.md`、`.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md`。
4. `.ai/progress.md`、`.ai/outline.md`、`.ai/glossary.md` 与 `.ai/references.md`。
5. 当前任务对应的章节、模板、示例、决策和审查记录。

## 判断当前状态

先比较 `CURRENT_STATE.md`、`NEXT_TASK.md` 与 `.ai/progress.md`：

- 三者一致：按 `NEXT_TASK.md` 的最高优先级开始。
- 不一致：不猜测；以最近一次有验证记录的状态为基线，先修正状态文件。
- 有阻塞项：只处理解除阻塞所需的最小任务，并在状态中说明。

## 领取下一项任务

选择一个满足“目标明确、输入可得、验收可执行”的任务。为该任务写明：交付物路径、完成标准、需要的来源、要更新的状态文件。不要在同一轮同时开始研究、写草稿和跨章节重构。

## 选择模板

| 任务 | 模板或规则 |
| --- | --- |
| 新章节 | `CHAPTER_TEMPLATE.md`、`templates/chapter-template.md` |
| 小节 | `templates/section-template.md` |
| 研究 | `.ai/prompts/research.prompt.md`、`.ai/research-policy.md` |
| 图示 | `.ai/prompts/diagram.prompt.md`、`diagrams/README.md` |
| 示例 | `.ai/prompts/example.prompt.md`、`examples/README.md` |
| 审查 | `templates/review-template.md`、`.ai/review-checklist.md` |
| 决策 | `templates/decision-template.md` |
| 交接 | `.ai/prompts/handoff.prompt.md`、`.context/HANDOFF.md` |

## 研究、编写与验证

1. 研究：建立可追溯 Research Brief，标注来源的发布日期、版本与访问日期；动态产品能力优先官方资料。
2. 编写：先形成章节 outline，再按模板写原创内容，区分事实与工程扩展。
3. 实现：示例优先最小可运行闭环，记录前提、命令和预期结果。
4. 验证：运行 `npm run validate`；对可运行示例执行其验证命令；对动态事实完成链接和官方资料核验。
5. 审查：按 `.ai/review-checklist.md` 检查技术、语言、图示、引用与读者体验。

## 记录决策

涉及内容范围、章节依赖、工具选择、可复用模板或发布策略的决定，使用 `templates/decision-template.md` 添加到 `.context/DECISIONS.md`，并在 `.memory/decisions/` 留下独立记录。不要把“我猜测”写成决策。

## 完成交接

在 `.context/HANDOFF.md` 写下：已完成内容、真实验证命令与结果、未完成项、风险、下一位 AI 应先读的文件。然后同步更新 `CURRENT_STATE.md`、`NEXT_TASK.md` 与 `.ai/progress.md`。

## 启动检查清单

- [ ] 已读入口、规则、项目上下文、当前状态与任务。
- [ ] 已确认只处理一个可验收任务。
- [ ] 已选择模板和验证命令。
- [ ] 已找到或明确缺少权威研究来源。
- [ ] 已检查是否会影响术语、目录、引用、图示或示例。

## 结束检查清单

- [ ] 交付物是原创内容，来源与工程扩展已区分。
- [ ] 可运行内容已实际验证，未运行内容已如实标注。
- [ ] `npm run validate` 已运行或阻塞原因已记录。
- [ ] 状态、进度、决策和交接已同步。
- [ ] 未自动执行 Git 提交。
