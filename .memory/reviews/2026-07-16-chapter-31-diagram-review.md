# 第 31 章 Diagram Review

## 审查范围

- 工件：`diagrams/mermaid/chapter-31-test-evidence-flow.mmd`、导出的 SVG/PNG、正文 Mermaid 块与替代描述。
- 审查类型：图示、可访问性与证据边界一致性。
- 规则：`BOOK_RULES.md` 的 Diagram Rules、`STYLE_GUIDE.md` 与 `diagrams/README.md`。

## 图示结论

图把 Test Evidence Plan 分流为 API Contract Check 和 UI Flow Evidence：前者经过 fixture／替身边界，后者依次经过 Browser Context、locator、Primary Action 与 After Observation；二者分别产生 Observation Record 或 Failure Record，再进入 Report Gate。图明确保留三项断点：API 观察不直接通向用户成功，Browser Context 不直接通向业务通过，locator 不直接通向报告通过。真实环境请求先去 `requires_approval`，批准后才可能产生图外不执行的实际观察。

首次导出的 PNG 显示三条失败箭头标签贴近画布边缘。已将“契约或恢复缺口”“目标缺失”“观察缺失或超时”改为显式节点后重新导出，避免标签截断；这只改善呈现，不改变图的证据语义。

## 已执行验证与未验证范围

- 2026-07-16 实际执行 `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-31-test-evidence-flow.mmd -o diagrams/exported/chapter-31-test-evidence-flow.svg -b white`，退出码 0。
- 2026-07-16 实际执行同一版本 Mermaid CLI，以 `-o diagrams/exported/chapter-31-test-evidence-flow.png -b white -s 2` 导出 PNG，退出码 0；PNG 尺寸为 1568×1920。
- 已实际查看重新导出的 PNG：API/UI 主链、三个显式失败节点、`requires_approval`、实际观察、Observation Record、Failure Record、Report Gate、有限报告与保守停止均可读，无文字截断。
- 从正文提取 Mermaid 块并用 `diff -u` 与 `.mmd` 比较，退出码 0、无输出，确认正文图块与图源逐字一致。
- 图只表示本书模型；没有运行 pytest、Playwright、API、浏览器、账户、网络、CI、报告或凭证。
