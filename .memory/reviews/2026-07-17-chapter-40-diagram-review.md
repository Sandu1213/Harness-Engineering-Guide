---
chapter: "40"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-17"
---

# 第 40 章 Diagram Review：资源优化候选决策流

## 审查范围

- `diagrams/mermaid/chapter-40-resource-optimization-decision-flow.mmd`
- `diagrams/exported/chapter-40-resource-optimization-decision-flow.svg`
- `diagrams/exported/chapter-40-resource-optimization-decision-flow.png`
- 正文 Mermaid 块、导出链接、替代说明与读图断点。

图回答一个问题：注入的 Task Contract 如何先保护不可降级项，再把 Resource Budget、Resource Records、Latency Path、可选 Rate Snapshot、Optimization Candidate 与 Quality Non-regression Gate 组织成受限比较，而不把估算、缓存候选、资源减少或候选接受画成真实观察、质量通过或部署。

## 图示结论

主链先检查任务范围、成功标准、质量、安全、来源和停止条件；缺失时进入 `needs_spec`。Resource Records 必须包含可归属的 `observed` 记录才能继续，否则进入 `needs_measurement`。Latency Path 之后明确分出“是否需要派生金额”：不需要金额时只保留原始用量，需要金额时才检查 Rate Snapshot 的范围、单位和有效时间。

Optimization Candidate 先经过身份、命中证据和依赖检查，再进入 Quality Non-regression Gate。质量失败进入 `quality_regression`；通过也最多进入 `ready_for_comparison`。所有路线最终在 `blocked` 停止，图中没有创建缓存、启动并行／批处理、计算真实账单、批准候选、切换路由或发布的箭头。

图中四条断点与正文一致：

- `estimated_usage ≠ observed_usage`
- `cache_candidate ≠ cache_hit`
- `resource_reduction ≠ quality_pass`
- `candidate_accepted ≠ route_deployed`

## 已执行验证

- Mermaid CLI 11.16.0 以白色背景导出 SVG，退出码 0。
- 同版本 Mermaid CLI 以白色背景和两倍缩放导出 PNG，退出码 0；`sips` 显示 PNG 为 1568×2920。
- 已实际查看 PNG：Task Contract、两个前置门、Resource Budget、Resource Records、Latency Path、金额可选分支、Rate Snapshot、Optimization Candidate、Quality Non-regression Gate、四个断点和底部 `blocked` 均完整可读，无明显文字或箭头截断。
- 已用 Node 抽取正文 Mermaid 块并与 `.mmd` 比较：两者逐字一致，均为 2007 个字符。
- `node --test examples/agent/resource-optimization-assessment.test.mjs`：8 项通过、0 项失败。
- 定向 Markdown lint：第 40 章正文与本记录共 2 个文件，0 个错误。
- `git diff --check` 与独立行尾空白检查：均通过。

## 未验证范围

图没有访问、调用或模拟真实模型、用量、账单、费率合同、缓存、摘要服务、并发、批处理、网络、文件、时钟、账户、凭证、批准、发布或外部效果。`ready_for_comparison` 只表示注入的教学记录具备当前比较条件，不代表候选更优、已批准或已部署。
