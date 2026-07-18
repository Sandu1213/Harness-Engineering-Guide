## 审查范围

- 工件：第 25 章全部隔离路径中的正文、研究、引用、事实核验、示例、图示和审查记录。
- 审查类型：最终交付与主线程集成前检查。
- 使用的规则：`BOOK_RULES.md` Definition of Done、`.ai/review-checklist.md`、本章 Fact Check。

## 结论

局部工件可交给主线程集成。Research → Outline → Draft → Technical Review → Example → Diagram Review → Fact Check → Language Editing → Final Review 九阶段均已有本地工件；共享引用、目录、状态与全仓脚本尚未由本子任务修改。

## 必须修复

无。

## 应该修复

| 位置 | 问题 | 原因 | 建议 |
| --- | --- | --- | --- |
| 共享集成 | 本章的测试尚未加入 `package.json` 与总校验脚本。 | 本子任务按隔离约束不得修改共享文件。 | 主线程新增 npm 入口后重跑全仓校验。 |
| 共享集成 | `CH25-REF-*` 仍是局部引用键。 | 全局引用表由主线程拥有。 | 选择未占用的 `REF-*` 编号并同步所有本章引用。 |

## 已执行验证与未验证范围

- 实际完成官方一手来源读取、纯内存红绿测试、演示、Mermaid SVG/PNG 导出及 PNG 视觉检查。
- 实际运行 `npx markdownlint-cli2 "docs/part-04-engineering-practice/25-browser-automation-agent*.md" ".memory/reviews/2026-07-16-chapter-25-*.md"`：11 个 Markdown 文件、0 个错误。
- 实际用仓库 `.markdown-link-check.json` 检查本章正文、Research Brief、引用、Outline、示例计划与 Fact Check：正文 9 个链接、Research Brief 5 个、引用 5 个、Fact Check 5 个均通过；Outline 和示例计划没有超链接。正文 Mermaid 块与图源 `diff -u` 无输出。
- `git diff --check` 退出码 `0`。主线程仍需在共享 npm 入口、引用、术语、目录和状态更新后重跑全仓 `npm run validate`。
- 未启动真实浏览器或声称真实 UI、用户路径、权限、Cookie、网络或业务结果已经验证。
