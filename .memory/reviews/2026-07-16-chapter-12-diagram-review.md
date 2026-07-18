---
chapter: "12-environment-sandbox-and-permissions"
stage: "Diagram Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 12 章 Diagram Review：环境阶梯中的准入与保守出口

## 范围

- Mermaid 源：`diagrams/mermaid/chapter-12-environment-permission-ladder.mmd`。
- 导出工件：对应的 SVG 与 PNG。
- 正文中的 Mermaid 块、图源链接、导出链接、读图说明和替代描述。

## 实际渲染与检查

2026-07-16 实际运行：

```bash
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-12-environment-permission-ladder.mmd \
  -o diagrams/exported/chapter-12-environment-permission-ladder.svg \
  -b transparent
npx --yes @mermaid-js/mermaid-cli@11.16.0 \
  -i diagrams/mermaid/chapter-12-environment-permission-ladder.mmd \
  -o diagrams/exported/chapter-12-environment-permission-ladder.png \
  -b transparent
```

两次命令均以退出码 `0` 结束。导出的 PNG 是 784 × 795 RGBA 图像，已实际查看：Action Candidate、Environment Contract、三个环境、三个边界判断、`blocked`、批准判断、`requires_approval`、三个允许候选与后续观察节点均可辨认。删除回流箭头标签后，图中不再用“补齐契约”或“已批准”暗示自动执行。

## 图文一致性

- 已以 `diff -u` 比较正文 Mermaid 块与 `.mmd` 源，退出码 `0`、无输出。
- dry-run 路径的允许结果明确是“仅表示预检查可继续”；测试路径仍指向独立观察与验收。
- 交叉审查后，三条路径均显式检查 effect、目标范围与边界；测试与生产路径还检查 credential scope。生产路径的 `allowed candidate` 仍必须经过批准 snapshot，且没有连接到部署完成。
- `blocked` 与 `requires_approval` 都以无标签虚线回到 Environment Contract，正文替代描述说明它们分别需要补齐边界/范围或取得匹配决定后重新评估。

## 交叉审查后的复跑

- 已将 `targetScope` 写入 Environment Contract、三条图中检查和正文替代描述；图只表达教学准入模型。
- 主线程于 2026-07-16 用白色背景、两倍缩放重新导出 SVG/PNG，并实际查看更新后的 PNG；中文标签、目标范围检查、阻塞回流和批准边界均可辨认。
- 更新后的正文 Mermaid 块与 `.mmd` 源再次以可复制的 `awk` 提取加 `diff -u` 比较，退出码 `0`、无输出。

## 未验证范围

图只验证 Mermaid 语法、SVG/PNG 导出、PNG 可读性与图文一致性。它不验证真实 Sandbox、Docker、Kubernetes、GitHub Actions、网络、文件、token、批准、部署、审计、Tool、外部目标或业务结果。
