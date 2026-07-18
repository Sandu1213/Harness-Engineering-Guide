---
title: "第 18 章示例实现记录：受限恢复决策"
chapter: "18-retry-recovery-and-fault-tolerance"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 18 章示例实现记录：受限恢复决策

## 读者问题

在不知道外部动作是否生效时，怎样让程序拒绝盲目重试，同时仍能表达“可重试”“需要观察”“可补偿”和“必须升级”的不同下一步？

## 目的与边界

示例实现纯函数 `assessRecoveryDecision`。它读取显式注入的 `operation`、`failure`、`checkpoint` 和 `policy`，返回本书的恢复决策。它不保存或修改输入，也不执行定时、退避、网络、文件、数据库、浏览器、模型、Tool、工作流、补偿、重试、熔断、人工审批或外部效果。

因此，输出 `retry` 只表示“满足教学策略的下一次尝试候选”；输出 `compensate` 只表示“存在教学补偿路径候选”；输出 `escalate` 只表示“本书模型要求停止自动动作并交接”，不表示任何真实告警、人类处理或数据恢复已经发生。

## 最小接口

```js
assessRecoveryDecision({
  operation: {
    id: 'source-fetch-1',
    target: 'candidate-source',
    repeatability: 'safe',
    effectStatus: 'not_applied',
    attempt: 1,
    compensation: 'none',
  },
  failure: { kind: 'transient_network', evidenceStatus: 'observed' },
  checkpoint: { status: 'recorded', correlationId: 'source-fetch-1' },
  policy: {
    maxAttempts: 3,
    retryableFailures: ['transient_network', 'rate_limited'],
    allowedRepeatability: ['safe'],
    requireCheckpointForCompensation: true,
  },
});
```

## 判定顺序

| 顺序 | 条件 | 返回 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 关键策略、操作、失败类别或效果状态不完整 | `needs_spec` / `recovery_contract_incomplete` | 外部任务必然失败。 |
| 2 | 效果状态或失败证据未知 | `needs_observation` / 对应代码 | 外部效果没有发生。 |
| 3 | 不可逆效果、权限/格式等不可重试失败 | `escalate` / 对应代码 | 人类已经批准或处理。 |
| 4 | 已知未生效、失败可重试、操作允许重复且未超过上限 | `retry` / `retry_allowed` | 下一次调用一定成功。 |
| 5 | 已部分生效且存在记录的补偿路径 | `compensate` / `compensation_required` | 数据已经回滚。 |
| 6 | 已部分生效但缺补偿或检查点 | `escalate` / 对应代码 | 没有任何恢复办法。 |
| 7 | 重试次数耗尽 | `stop` / `retry_budget_exhausted` | 故障根因已被找到。 |

## 红绿验证计划

先只创建测试文件并运行：

```bash
node --test examples/agent/retry-recovery-assessment.test.mjs
```

此轮工作同时创建了实现和测试文件，未执行“目标模块缺失”的先行红灯命令，因此不宣称存在红灯结果。实现完成后已实际执行测试和演示；真实结果写入示例整合审查。

## 测试矩阵

| 路径 | 输入重点 | 预期 | 不证明 |
| --- | --- | --- | --- |
| 受限重试 | 短暂失败、未生效、安全可重复、次数未耗尽 | `retry` | 网络或来源可访问。 |
| 契约缺失 | 漏掉上限或效果状态 | `needs_spec` | 无法补全真实契约。 |
| 效果未知 | `effectStatus: unknown` | `needs_observation` | 动作尚未发生。 |
| 效果状态非法 | 不在契约枚举内的状态 | `needs_spec` / `effect_status_not_supported` | 系统已经正确分类效果。 |
| 失败证据未知 | `evidenceStatus: unknown` | `needs_observation` | 错误一定短暂。 |
| 不可重试 | 格式或权限失败 | `escalate` | 人类已处理问题。 |
| 重试耗尽 | 尝试达到上限 | `stop` | 根因已经确定。 |
| 部分生效可补偿 | `applied`、补偿声明和检查点齐全 | `compensate` | 补偿动作已执行。 |
| 补偿缺检查点 | 已生效但无记录 | `escalate` | 状态可安全重建。 |
| 不可逆 | `irreversible` | `escalate` | 已触发真实告警。 |

## 可选增强与升级触发

1. 真实运行时需要把延迟、预算、失败码和重试所有者写进可审查策略，并以实际负载数据校准；本示例不提供默认参数。
2. 真实补偿前需要保存受控输入、关联、前置状态、已执行步骤和业务所有者；不要用模型摘要替代可恢复信息。
3. 当要执行真实网络或写入动作时，接入第 10、11、12、14、15、17 章的工作流、工具、权限、审批、观察和评估契约。

## 实际执行结果

2026-07-16 实际运行 `node --test examples/agent/retry-recovery-assessment.test.mjs`：13 项通过、0 项失败。随后运行 `node examples/agent/retry-recovery-assessment.mjs`，退出码为 0，输出 `retry` / `retry_allowed` / `source-fetch-demo`。这些结果只证明纯函数对注入对象的判断，不证明网络重试、补偿、人工升级或外部效果。
