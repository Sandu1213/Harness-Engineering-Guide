---
chapter: "15-observation-and-state-awareness"
stage: "Technical Review"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 15 章技术审查：Observation 与状态感知

## 审查范围

- 正文、Research Brief、详细 Outline、局部来源、事实核验与示例计划。
- 纯内存 `assessObservationSnapshot` 的输入、输出、判断顺序和十二条行为路径。
- 与第 10、11、12、14、16、17、18 和 25 章的责任边界。

## 结论

`可合并（等待共享工件整合）`。正文把动作请求、动作返回、状态快照和评估接受分开；观察记录是本书模型，不被误写成 OpenTelemetry、Trace Context 或 Playwright 的 API。纯内存函数不会读取或改变真实环境，且未知效果、错配、陈旧、推测和未推进快照都有保守出口。

## 必须修复

无。本次审查未发现会使来源归因、示例边界或相邻章节责任发生错误的缺陷。

## 已处理的应该修复项

| 位置 | 问题 | 最小修复 | 结果 |
| --- | --- | --- | --- |
| 正文“信号不能互换”段 | 首次出现的 OpenTelemetry 信号名称只使用英文，容易与术语规范不一致。 | 改为“追踪（traces）、指标（metrics）、日志（logs）、随附上下文（baggage）和性能剖析（profiles）”。 | 已修复；不改变来源限定范围。 |
| 纯内存教学函数 | 若没有行动后的推进检查，旧快照可被再次用作确认。 | 仅对相同 `correlationId` 与 `target` 的 `previousSnapshot` 比较 `fingerprint`，输出 `needs_evidence` / `snapshot_not_advanced`。 | 已有同一对象、跨行动与跨目标三类独立行为测试；不声称真实时钟或 UI 回读。 |
| Mermaid 阻塞分支 | `blocked` 直接回观察点会弱化停止或升级边界。 | 让 `needs_evidence` 在刷新证据或缩小范围后回观察点；让 `blocked` 进入停止或升级，交给第 18 章或人工节点。 | 已同步正文图块、图源和导出图。 |

## 关键边界检查

| 边界 | 审查结论 |
| --- | --- |
| 第 10 章 Workflow | 本章产生可解释观察输入，不重定义状态机、持久化或恢复。 |
| 第 11 章 Tool Use | 工具调用返回仅是可用信号之一；本章未把它写成目标状态或外部效果。 |
| 第 12、14 章 | 快照不授予权限、批准或执行权。 |
| 第 16 章 Reflection | 本章不推断根因或把单次异常沉淀为经验。 |
| 第 17 章 Evaluation | `observed` 不等于 `accepted`；任务成功仍由独立评估定义。 |
| 第 18 章 Recovery | `blocked`、`needs_evidence`、`not_observed` 不包含重试、回滚或升级政策。 |
| 第 25 章 Browser Automation | Playwright 仅作产品限定例子；本章没有运行浏览器或宣称 UI 已验证。 |

## 已执行验证与未验证范围

2026-07-16 实际执行：

```bash
node --test examples/agent/observation-snapshot-assessment.test.mjs
node examples/agent/observation-snapshot-assessment.mjs
```

结果：12 项 Node 内置测试通过、0 项失败；演示输出受限的 `observed` / `expected_state_observed` 判断。它们不验证真实浏览器、DOM、日志、Trace Context、OpenTelemetry、网络、文件、权限、审批、外部效果或业务完成。

共享集成仍需由主线程完成：将 `CH15-REF-01` 至 `CH15-REF-04` 映射到全局引用、登记术语、接入目录与 npm 校验脚本，再运行全仓验证。
