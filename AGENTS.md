# Codex 项目入口

本仓库是一本中文技术书和可复用 AI Technical Book Factory。开始任何实质工作前，按顺序阅读：

1. `AGENTS.md`
2. `AI_BOOTSTRAP.md`
3. `BOOK_RULES.md`
4. `.context/PROJECT_CONTEXT.md`
5. `.context/CURRENT_STATE.md`
6. `.context/NEXT_TASK.md`
7. `.ai/progress.md`
8. 与当前任务有关的规则、模板、章节或示例

工作约束：

- 未读取项目上下文，不得直接写章节。
- 不得逐句翻译或大段复刻来源文章；书稿必须原创。
- 不得伪造引用、测试结果、命令输出或工具行为。
- 一次只处理一个可验收任务；大规模结构调整前先说明理由。
- 完成任务后更新 `.context/CURRENT_STATE.md`、`.context/NEXT_TASK.md` 和 `.ai/progress.md`，并运行项目校验。
- 不要自动执行 Git 提交；只有用户明确要求时才提交。

详细规则、完成定义和写作工作流见 [BOOK_RULES.md](BOOK_RULES.md) 与 [AI_BOOTSTRAP.md](AI_BOOTSTRAP.md)。
