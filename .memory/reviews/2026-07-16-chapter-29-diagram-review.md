# 第 29 章图示审查

## 审查范围

- 工件：`diagrams/mermaid/chapter-29-software-change-delivery-loop.mmd`、导出 SVG/PNG、正文 Mermaid 块与替代描述。
- 审查类型：图示、可访问性与边界一致性。
- 使用的规则与来源：`BOOK_RULES.md` 的 Diagram Rules、`STYLE_GUIDE.md`、`diagrams/README.md`。

## 结论

`可合并`。图将六类交付工件汇入 Software Change Delivery Gate，清楚分开 `ready_for_review`、`stopped`、后续真实实现与验证、运行证据与实际 diff、独立审查与合并决定。停止分支回到澄清、探索或收缩范围；虚线明确“运行证据不能倒推”为此前已准入。

## 必须修复

无。

## 应该修复

无。

## 建议

无。

## 已执行验证与未验证范围

- 2026-07-16 实际执行 `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-29-software-change-delivery-loop.mmd -o diagrams/exported/chapter-29-software-change-delivery-loop.svg -b white`，退出码 0。
- 2026-07-16 实际执行同一版本 Mermaid CLI，以 `-o diagrams/exported/chapter-29-software-change-delivery-loop.png -b white -s 2` 导出 PNG，退出码 0；PNG 尺寸为 1568×696。
- 已实际查看导出的 PNG：六个输入节点、Delivery Gate、准入/停止分支、后续真实执行、运行证据、独立审查与虚线边界均无截断且可读。
- 从正文提取 Mermaid 块并用 `diff -u` 与 `.mmd` 比较，退出码 0、无输出，确认图源与正文逐字一致；替代描述和读图结论同样保留不将节点当作真实系统动作的边界。
- 图只表达本书工程模型；未运行或证明真实 Git、CI、PR、浏览器、模型、权限、环境、外部 Tool 或生产系统。
