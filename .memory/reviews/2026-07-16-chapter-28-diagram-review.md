---
chapter: "28"
review_type: "diagram-review"
status: "passed"
reviewed_at: "2026-07-16"
---

# 第 28 章 Diagram Review

## 实际检查

- 用 Mermaid CLI `@mermaid-js/mermaid-cli@11.16.0` 将 `chapter-28-minimal-harness-loop.mmd` 导出为 SVG 与 PNG。
- 实际查看导出的 PNG：四类输入汇入 Minimal Harness Admission；`ready` 与 `stopped` 两条分支清晰可读；虚线明确 Result Evidence 不能倒推为 `ready`。
- 从正文提取 Mermaid 块并与 `.mmd` 比较，`diff -u` 无输出。

## 语义核对

| 图中关系 | 正文一致性 | 结论 |
| --- | --- | --- |
| 四类输入同时进入准入器 | “五个工件”与“工作流程”小节一致。 | 通过。 |
| 任一条件不足转为 `stopped` | 示例测试与常见错误表一致。 | 通过。 |
| `ready` 仅进入未实现的内存求值器 | 正文和示例均声明未执行 Tool。 | 通过。 |
| 结果证据不能倒推准入 | 证据计划与结果证据的边界一致。 | 通过。 |

## 边界

图是教学接口图，不表示任何真实 Agent 内部调用、Tool 协议、环境、权限、日志或系统部署路径。
