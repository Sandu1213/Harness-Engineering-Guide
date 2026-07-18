---
chapter: "47"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-17"
---

# 第 47 章 Diagram Review：Agent Engineering 演进地图

## 审查范围

- `diagrams/mermaid/chapter-47-agent-engineering-evolution-map.mmd`
- `diagrams/exported/chapter-47-agent-engineering-evolution-map.svg`
- `diagrams/exported/chapter-47-agent-engineering-evolution-map.png`
- 正文 Mermaid 块、导出链接、替代说明、元数据和完成检查表。

## 图示结论

图把模型、Prompt、Tool、Skill、Policy 与数据变化放在 Harness 之外，要求先进行版本和失效检查，再从 Stage 0 的固定样例沿 Task Contract、状态与 Attempt Trace、Capability Grant Record、Result/Observation/验收、Evaluation Spec、交接/检查点/冲突记录和受限自治逐级演进。

四条责任断点均显式保留：模型能力提升不自动扩大权限；协议和 Schema 连通不等于语义与治理互操作；Eval 通过不等于上线批准；自治增加后仍须可停止、可回滚、可交给人类。最终节点最多到 `ready_for_bounded_pilot_review` 和具名 Human Responsibility Map，随后在图外停止，不出现已批准、已部署、已发布或长期自治状态。

安全与资产供应链、组织责任和开放问题以虚线跨阶段约束主链；Stage 4 的新观察回到版本与失效检查，不把一次成功写成永久稳定性。

## 已执行验证

- Mermaid CLI 11.16.0 分别以白色背景、2 倍缩放导出 SVG 和 PNG；两个命令退出码均为 0，输出 `Generating single mermaid chart`。
- `file` 将导出物识别为 SVG 和 1568×2972、8-bit RGB PNG。
- 已实际查看原始 PNG：Stage 0 至 7、三个 `≠` 断点、自治停止/回滚/接力断点、跨阶段虚线约束、回流箭头、Pilot Review、人类责任和图外停止均可读，没有明显文字、节点或箭头裁切。
- 以 `awk` 抽取正文 Mermaid 块并与 `.mmd` 执行 `diff -u`：无差异、退出码 0。
- 正文定向 Markdown lint：1 个文件、0 个错误。
- 正文链接：14 个全部通过，包括图源、SVG、PNG、示例与章节交叉链接。
- 图源与正文尾随空白扫描无匹配；`git diff --check` 退出码 0。

## 未验证范围

图只表达本书的渐进工程模型，不运行模型、Tool、权限、评估、安全控制、供应链验证、组织批准、部署、发布或长期自治。Mermaid 语法通过、导出成功和 PNG 可读不能证明现实系统已具备这些责任，也不能把 `ready_for_bounded_pilot_review` 扩大为上线批准。
