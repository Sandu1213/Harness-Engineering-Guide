---
title: "第 2 章示例实现：运行边界的最小 Harness"
chapter: "02"
status: "example-implemented"
implementation: "../../examples/agent/runtime-boundaries.mjs"
tests: "../../examples/agent/runtime-boundaries.test.mjs"
updated_at: "2026-07-15"
---

# 第 2 章示例实现：运行边界的最小 Harness

## 读者问题

“候选被范围规则拒绝、运行环境拒绝请求、验证拒绝结果，为什么不能用同一类重试处理？”

## 范围与运行前提

实现位于 `examples/agent/runtime-boundaries.mjs`。程序只在内存中处理候选路径、一个注入的 Runtime 返回值和一个验证函数。它不调用模型，不访问真实文件系统、网络、进程、环境变量、账户或密钥；`runtime.write` 是测试或演示提供的模拟接口。

从仓库根目录运行。需要可执行的 `node` 与 `npm`，并已安装项目依赖。示例本身不需要网络、授权令牌或写入权限。

## 概念映射

| 章节概念 | 示例接口或字段 | 读者可观察到的内容 |
| --- | --- | --- |
| 上游候选 | `candidate.path`、`candidate.content` | 候选被接收，但不是已执行的事实。 |
| Harness 约束 | `allowedPaths` | 越界候选在 Runtime 前被拒绝。 |
| 执行请求 | `runtime.write(candidate)` | 只有通过范围检查才会请求 Runtime。 |
| Runtime 观察 | `ok`、`observedContent`、`error` | Runtime 可返回观察或拒绝原因。 |
| 验证 | `validate({ path, observedContent })` | 成功 Runtime 结果仍需被接受。 |
| 证据与状态 | `state`、`phase`、`events`、`evidence`、`failure` | 四条路径的终态和原因可被测试。 |

## 已实现的演示路径

1. **候选拒绝：** 路径不以允许前缀开始时，函数返回 `failed` / `candidate_rejected`，且不会调用 Runtime。
2. **Runtime 拒绝：** 路径允许但 Runtime 返回 `ok: false` 时，函数返回 `blocked` / `runtime_rejected`，验证器不会运行。
3. **验证拒绝：** Runtime 返回观察但 `validate` 不接受时，函数返回 `failed` / `validation_rejected` 并保留观察值。
4. **接受：** Runtime 返回观察且验证器接受时，函数返回 `succeeded` / `validated`，并留下事件序列和证据。

## 运行与验证

```bash
npm run test:runtime-boundaries
npm run example:runtime-boundaries
```

**成功标准：** 四项 Node 内置测试通过；演示输出包含 `state: "succeeded"`、`phase: "validated"`、`observation: "boundary verified"`、`validator accepted runtime observation` 以及 `candidate_received`、`execution_requested`、`observation_received`、`validated` 事件。

**验收边界：** 测试只证明确定性内存控制流，不证明真实文件权限、Sandbox 语义、工具协议、审计、人工审批、模型能力、持久化恢复或生产可靠性。模拟 Runtime 的 `permission denied` 只是教学输入，不能解释为本仓库或任何产品的真实权限行为。

**本次整合记录：** 当次命令、红灯基线与实际结果记录在 `.memory/reviews/2026-07-15-chapter-02-example-integration.md`。只有该记录中的实际运行可以支撑本阶段完成状态。

## 后续增强，但不在第 2 章实现

- 用真实且受控的工具协议替换模拟 Runtime：留给第 11 章。
- 增加实际 Sandbox、权限矩阵和审批：留给第 12、14 与第 41 章。
- 为失败分类增加重试、恢复和状态检查点：留给第 10 与第 18 章。
- 扩展验证器为多维评估和回归基准：留给第 17 与第 39 章。
