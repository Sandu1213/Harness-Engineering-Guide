# 第 36 章语言审阅

## 审阅范围

- 正文、Research Brief、详细 Outline、参考资料、示例计划、Technical Review、Example Implementation、Diagram Review 与 Fact Check。
- 术语首现、具体主语、阶段时态、模式卡字段、图文／表文表述、链接标签，以及与第 35、37、38 章的衔接。

## 修订

- 将来源背景中的 `workflow` 明确为“工作流（workflow）”，并保留 Agent 为来源语境中的系统名称；未改变 REF-029 的限定范围。
- 将五个教学状态改称“状态标签”，把结果所有者标明为本书工程模型，并补足虚构案例的具体主语。
- 将组合关系收束为“监督者—工作者结构中的一份工作契约”，避免把监督者和工作契约的层级混写。
- 将最小示例改为已实现评估器所接收的注入式教学模式卡，删除“未来”与“未运行”的过期时态；实现、测试和无副作用边界仍由“实现说明”给出。
- 将案例标题改为“受限处理方式”，并在完成检查表中标记 Language Editing 已完成；Final Review、共享状态工件和全仓校验仍保持未完成。

## 结论

语言审阅只收束中文术语、主语、时态与图文／表文标签。未改变 REF-029 至 REF-031、REF-114、REF-115 的限定范围，未改变 `assessHarnessPatternSelection(card)` 的接口、8 项 Node 测试结果、无副作用演示、Mermaid 源码或导出图语义。真实 Agent、模型、工作者、队列、事件、工作流、并发、工具、Git、浏览器、CI、文件、网络、账户、凭证和外部系统仍明确为未运行范围。

## 已执行验证与未验证范围

- `./node_modules/.bin/markdownlint-cli2 docs/part-06-design-and-evaluation/36-harness-design-patterns.md .memory/reviews/2026-07-16-chapter-36-language-edit.md`：退出码 0，检查 2 个文件、0 个错误。
- `git diff --check -- docs/part-06-design-and-evaluation/36-harness-design-patterns.md .memory/reviews/2026-07-16-chapter-36-language-edit.md`：退出码 0，无输出。
- 未运行全仓 `npm run validate`；共享状态由主线程统一收口。
- 本轮不重跑示例；正文中的 8 项通过、0 项失败和演示输出均来自已完成的 Example Implementation 与 Fact Check 记录。
