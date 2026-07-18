## 审查范围

- 工件：`diagrams/mermaid/chapter-25-browser-e2e-evidence-loop.mmd`、导出 SVG/PNG 与正文同名 Mermaid 块。
- 审查类型：图示与可访问性。
- 使用的规则：`diagrams/README.md`、`STYLE_GUIDE.md`、`.ai/prompts/diagram.prompt.md`。

## 结论

可合并。图将动作前条件、主点击、动作后重新观察、受限观察结论、独立验收和恢复出口分开，没有把浏览器动作写成业务完成。

## 必须修复

无。

## 应该修复

无。图采用自上而下布局，中文节点和分支标签在导出 PNG 中可读；右侧的不足路径不会遮蔽主证据链。

## 已执行验证与未验证范围

2026-07-16 实际执行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-25-browser-e2e-evidence-loop.mmd \
  -o diagrams/exported/chapter-25-browser-e2e-evidence-loop.svg -b white -s 2
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-25-browser-e2e-evidence-loop.mmd \
  -o diagrams/exported/chapter-25-browser-e2e-evidence-loop.png -b white -s 2
```

两次命令均输出 `Generating single mermaid chart` 并以退出码 `0` 结束。随后实际查看 PNG：节点、箭头、`是/否`、`效果未知`与两个下游章节出口均清晰可读。图仅表达本书模型；不代表真实浏览器轨迹或工具协议。
