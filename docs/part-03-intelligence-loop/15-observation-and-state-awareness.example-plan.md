---
title: "第 15 章示例计划：状态快照判断"
chapter: "15-observation-and-state-awareness"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 15 章示例计划：状态快照判断

## 读者问题

一次 UI 点击、工具请求或工作流动作之后，Harness 怎样只依据关联正确、字段完整、来源明确、足够新鲜且真正推进的状态快照进入下一步，而不把“动作没有报错”写成“目标已完成”？

## 目标与非目标

本示例实现纯内存函数 `assessObservationSnapshot`。它只读取调用方注入的行动、观察契约、当前快照和可选前一快照，返回受限的教学判断。

它不：

- 读取或操作真实浏览器、DOM、截图、页面、网络、文件、日志、追踪系统、数据库、模型、Tool、时钟、环境变量、账户、凭证或权限系统；
- 调用 Playwright、OpenTelemetry、W3C Trace Context 或任何 SDK；
- 生成行动、等待页面、重试、写入状态、存储日志、验证业务结果或宣布工作流完成；
- 将 `observed`、`expected_state_observed` 或演示输出解释为真实 UI 成功、外部效果、授权、验收或任务完成。

## 环境与运行命令

- 环境：仓库根目录、Node.js；仅使用 Node 内置的 `node:test` 与 `node:assert/strict`。
- 实现：`examples/agent/observation-snapshot-assessment.mjs`。
- 测试：`examples/agent/observation-snapshot-assessment.test.mjs`。
- 实际验证命令：

```bash
node --test examples/agent/observation-snapshot-assessment.test.mjs
node examples/agent/observation-snapshot-assessment.mjs
```

- 全仓验证与 npm 入口需要由主线程将本章命令加入共享脚本后运行；本子任务不修改 `package.json` 或 `scripts/validate.sh`。

## 教学接口

```js
assessObservationSnapshot({
  action: {
    correlationId: 'ui-click-1',
    target: 'submit-status',
    expectedState: 'submitted',
  },
  observationContract: {
    version: 'chapter-15-v1',
    requiredFields: [
      'observedAt',
      'source',
      'correlationId',
      'target',
      'state',
      'evidenceStatus',
      'freshness',
      'fingerprint',
    ],
    knownStates: ['submitted', 'pending', 'error'],
  },
  snapshot: {
    observedAt: 'step-2',
    source: 'ui_state_assertion',
    correlationId: 'ui-click-1',
    target: 'submit-status',
    state: 'submitted',
    evidenceStatus: 'observed',
    freshness: 'fresh',
    fingerprint: 'status-submitted',
  },
  previousSnapshot: undefined,
})
```

`observedAt`、`freshness`、`source`、`fingerprint` 与所有状态字符串均为测试注入的教学字段。函数不调用时钟，所以它不自行计算“过去了多久”；调用方必须先以其实际策略判断新鲜度并将结果作为输入。只有前一快照与当前快照具有相同 `correlationId` 和 `target` 时，函数才会把相同 `fingerprint` 解释为“同一观察对象未推进”；另一个行动或目标的同名指纹不能作为本次判断的证据。

## 判断顺序

| 顺序 | 条件 | 教学输出 | 不能推导 |
| --- | --- | --- | --- |
| 1 | 缺少契约规定的字段 | `needs_evidence` / `snapshot_fields_missing` | 真实采集器、UI 或日志已检查。 |
| 2 | 关联标识不同 | `blocked` / `correlation_mismatch` | 目标状态未变或另一行动一定失败。 |
| 3 | 目标不同 | `blocked` / `target_mismatch` | 原目标已被重新观察。 |
| 4 | 证据标签不是 `observed` | `needs_evidence` / `snapshot_not_confirmed` | 摘要、猜测或模型文本可替代观察。 |
| 5 | 新鲜度不是 `fresh` | `needs_evidence` / `snapshot_not_fresh` | 具体超时、时钟、TTL 或真实缓存策略。 |
| 6 | 效果状态为 `unknown` | `blocked` / `effect_unknown_requires_stop_or_escalation` | 可以安全重试或目标未改变。 |
| 7 | 与同一关联和目标的前一快照指纹相同 | `needs_evidence` / `snapshot_not_advanced` | 同一快照永远无效；仅表示这里缺少行动后的推进证据。 |
| 8 | 状态不在已知集合 | `blocked` / `unrecognized_observed_state` | 未知状态的根因、可重试性或成功含义。 |
| 9 | 已知状态但不等于预期 | `not_observed` / `expected_state_not_observed` | 一定是失败、页面错误或应立即重试。 |
| 10 | 已知、关联正确、新鲜且匹配 | `observed` / `expected_state_observed` | 工作流、业务任务或外部系统已经完成。 |

## 测试矩阵与实际结果

| 路径 | 注入重点 | 预期判断 | 实际状态 |
| --- | --- | --- | --- |
| 新鲜匹配 | `submitted`、新鲜且关联正确 | `observed` | 已执行通过。 |
| 关联错配 | 不同 `correlationId` | `blocked` | 已执行通过。 |
| 目标错配 | 不同 `target` | `blocked` | 已执行通过。 |
| 字段缺失 | 缺少 `source` | `needs_evidence` | 已执行通过。 |
| 陈旧快照 | `freshness: stale` | `needs_evidence` | 已执行通过。 |
| 推测性标签 | `evidenceStatus: inferred` | `needs_evidence` | 已执行通过。 |
| 未知效果 | `effectStatus: unknown` | `blocked` | 已执行通过。 |
| 未推进 | 同一关联、同一目标且前后相同 `fingerprint` | `needs_evidence` | 已执行通过。 |
| 跨行动同指纹 | 前一快照的 `correlationId` 不同 | `observed` | 已执行通过；不把另一行动的快照当作未推进。 |
| 跨目标同指纹 | 前一快照的 `target` 不同 | `observed` | 已执行通过；不把另一目标的快照当作未推进。 |
| 已知未匹配 | `pending` | `not_observed` | 已执行通过。 |
| 未知状态 | `redirected` | `blocked` | 已执行通过。 |

## 红绿步骤与完成条件

1. 先创建测试文件并导入尚不存在的模块。
2. 2026-07-16 实际执行 `node --test examples/agent/observation-snapshot-assessment.test.mjs`，以退出码 `1` 和 `ERR_MODULE_NOT_FOUND` 结束；失败原因是实现模块尚未创建，符合红灯预期。
3. 实现最小纯函数与演示入口，未增加依赖。
4. 同日重跑专用测试：交叉审查补齐跨行动与跨目标同指纹两个边界后，共 12 项 Node 内置测试通过、0 项失败；演示以退出码 `0` 输出 `observed` / `expected_state_observed` / `ui-click-demo` / `submit-status`。
5. 完整的项目级脚本、状态表、全局引用和术语表更新由主线程整合；本地验证结果不声称这些共享工件已经更新。

## 可选增强与触发条件

- 只有需实际验证 UI 交互时，才接入第 25 章的浏览器工具，并按项目 E2E 规则执行快照、动作、重新快照；不可用本函数代替。
- 只有需判断业务目标是否接受时，才由第 17 章定义独立评估器和验收证据；`observed` 不是 `accepted`。
- 只有确实需要等待、重试、回滚或接管时，才由第 18 章将 `blocked`、`needs_evidence`、`not_observed` 接入恢复策略；本函数不决定下一次动作。
