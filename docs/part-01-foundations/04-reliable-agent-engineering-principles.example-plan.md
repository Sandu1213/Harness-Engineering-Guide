---
title: "第 4 章示例实现说明：受控配置修改"
chapter: "04"
status: "example-implemented"
implementation: "../../examples/agent/controlled-config-change.mjs"
tests: "../../examples/agent/controlled-config-change.test.mjs"
updated_at: "2026-07-15"
---

# 第 4 章示例实现说明：受控配置修改

> 本示例已实现并运行，但只处理测试注入的内存对象。它不能被表述为真实权限控制、文件写入、部署或回滚结果。

## 读者问题

“当一个 Agent 被要求修改配置时，怎样让它先说明目标、范围、风险与验证方式，并在证据不足或风险过高时停止，而不是仅凭一句‘已完成’结束任务？”

## 最小范围与边界

`evaluateConfigChange(snapshot)` 接收测试注入的内存对象，不接收真实文件路径、账户、环境变量、凭证、网络客户端或系统命令。它只判断一个教学配置变更是否应进入预检、验证、恢复或人工升级。

输入：

| 字段 | 用途 | 计划边界 |
| --- | --- | --- |
| `proposal` | 目标键、期望值、动作类型与目标范围。 | 不解析真实配置文件。 |
| `policy` | 允许键、允许范围与是否要求审批。 | 不代表真实 RBAC、Sandbox 或云平台策略。 |
| `before` | 写入前的内存配置快照。 | 不读取磁盘或远程系统。 |
| `execution` | 注入的模拟结果：`applied` 时带观察值，或 `rejected` 时带拒绝原因。 | 不调用工具或执行真实写入。 |
| `approval` | 是否已有明确人工批准。 | 不发送审批请求或记录真实身份。 |

输出包含 `state`、`phase`、`change`、`evidence`、`failure`、`recovery`、`escalation` 和 `events` 字段。`state` 只能是 `succeeded`、`blocked` 或 `escalated`；任何非成功路径均不得声称配置已经被验证。

## 概念映射

| 章节原则 | 实现接口或结果 | 可观察条件 |
| --- | --- | --- |
| 可观察目标 | `proposal.key`、`proposal.expectedValue`、`proposal.scope` | 缺字段时抛出输入错误。 |
| 最小权限与范围 | `policy.allowedKeys`、`policy.allowedScopes` | 越过允许键或范围时不进入模拟执行。 |
| 预检与证据 | `snapshot.before`、`evidence` | 输出记录变更前状态与允许条件。 |
| 验证闭环 | `execution`、`phase: verified` | 只有模拟结果与期望值匹配才返回成功。 |
| 恢复路径 | `recovery` | 验证失败时返回建议的恢复动作，不自行重试真实操作。 |
| 人工升级 | `approval`、`escalation` | 高风险、不可逆或未批准动作返回 `escalated`。 |

## 测试路径

Node 内置测试覆盖：

1. **受控成功：** 允许的低风险键、受限范围、模拟写入匹配期望值，返回 `succeeded` / `verified` 与前后证据。
2. **预检拒绝：** 目标键不在 `allowedKeys`，返回 `blocked`，且不进入模拟执行。
3. **验证失败：** 模拟结果与期望值不一致，返回 `blocked`，含失败证据和恢复建议。
4. **高风险升级：** 不可逆或策略要求批准的动作缺少批准，返回 `escalated`，不声称已经写入。
5. **执行拒绝：** 注入的执行结果为拒绝，返回 `blocked`，并保留拒绝原因与下一步。

## 实际验证与成功条件

实现前已运行红灯测试，测试因导入的模块不存在而以 `ERR_MODULE_NOT_FOUND` 失败。实现后可在仓库根目录运行：

```bash
npm run test:controlled-config-change
npm run example:controlled-config-change
```

2026-07-15 已实际运行：5 项测试全部通过；演示输出 `succeeded` / `verified`、变更前后的 `change`、两项证据与四个事件。成功条件不是“打印成功文案”，而是五条路径都产生与状态相符的结构化证据。完整记录位于 `.memory/reviews/2026-07-15-chapter-04-example-integration.md`。

## 不属于本示例的能力

- 真实文件解析、备份、原子写入、权限检查、Git 回滚和远程部署：留给第 11、12、27、41 与 42 章。
- 真实审批系统、用户身份、通知和组织责任：留给第 14 与 45 章。
- 实际 Canary 流量分割、SLO、监控与生产回滚：保留为 Google SRE 类比，不在本示例实现。
