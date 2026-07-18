# 第 14 章 Diagram Review

## 范围

- `diagrams/mermaid/chapter-14-human-approval-routing.mmd`
- `diagrams/exported/chapter-14-human-approval-routing.svg`
- `diagrams/exported/chapter-14-human-approval-routing.png`
- 第 14 章正文 Mermaid 块与图示说明。

## 已执行验证

2026-07-16 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-14-human-approval-routing.mmd -o diagrams/exported/chapter-14-human-approval-routing.svg -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-14-human-approval-routing.mmd -o diagrams/exported/chapter-14-human-approval-routing.png -b transparent
```

两条命令均退出 0，输出 `Generating single mermaid chart`。PNG 已实际查看：候选动作、行动卡、补证、效果未知阻塞、自动候选、人工审查、批准/拒绝、刷新条件与后续执行前检查均可读，连接关系完整。

随后从正文提取 Mermaid 块并与 `.mmd` 源文件比较：

```bash
sed -n '/^```mermaid$/,/^```$/p' docs/part-02-components/14-human-in-the-loop.md | sed '1d;$d' | diff -u diagrams/mermaid/chapter-14-human-approval-routing.mmd -
```

该比较退出 0、无输出，证明正文图源与 Mermaid 源一致。

## 审查结论

- 图回答“何时找人、何时补证、何时阻塞、批准后还能推出什么”这一个问题，没有把流程图当装饰。
- `Preflight` 明确写为“允许进入后续执行前检查”，没有把批准箭头画成 Tool 执行或结果验证。
- 效果未知路径进入 `blocked`，范围/证据/环境变化路径回到行动卡，避免旧批准被画成永久有效。
- 节点名称与正文的行动卡、审批记录、刷新条件、补证、阻塞和批准术语一致。

## 未验证范围

图不表示真实审批产品、身份、权限、Tool 调用、外部效果、发布或内容正确性；SVG/PNG 仅为本书模型的导出图。
