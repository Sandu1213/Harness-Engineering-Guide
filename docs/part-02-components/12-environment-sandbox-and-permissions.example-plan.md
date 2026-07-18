---
title: "第 12 章示例计划：环境准入判断"
chapter: "12-environment-sandbox-and-permissions"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 12 章示例计划：环境准入判断

## 读者问题

当一个 Agent 提出“部署服务”或“更新配置”时，怎样在执行前判断：当前环境是否允许该效果类别、文件和网络边界是否匹配、凭证仅覆盖请求目标、以及是否仍需要一个匹配的批准 snapshot？

## 前提与安全限制

- 使用 Node.js 内置 `node:test` 与 `node:assert/strict`，不添加依赖。
- 函数只读取调用者传入的普通对象；不会读取 `process.env`、当前目录、文件、时钟、网络、密钥、身份、容器、CI 或任何外部系统。
- `environment`、`policy`、`approval`、`credentialScopes` 与结果码均为教学数据，不代表实际 Sandbox、凭证、RBAC、审批或审计结果。
- 示例不会生成部署命令，也不访问任何测试或生产环境。

## 输入与输出契约

```js
{
  task: {
    id: 'deploy-preview',
    effect: 'read_only | write | external',
    targetScope: 'preview | test-service | production-service',
    credentialScope: 'none | test-deploy | production-deploy',
  },
  environment: {
    id: 'dry-run | test | production',
    allowedEffects: ['read_only'],
    filesystem: 'read_only | workspace_write',
    network: 'disabled | allowlisted',
    credentialScopes: ['none'],
  },
  policy: {
    requiredBoundaryByEffect: {
      read_only: { filesystem: 'read_only', network: 'disabled' },
    },
    approvalRequiredEffects: ['external'],
  },
  approval: { status: 'active | expired', environmentId: 'production', effect: 'external' } | null,
}
```

返回值固定包含 `status`、`code` 与 `taskId`；不返回 token、文件内容、命令或环境秘密。

## 测试矩阵

| 情形 | 重点输入 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| dry-run 只读 | `read_only` + dry-run 边界 | `allowed / environment_admission_allowed` | 预检查已执行或目标可读。 |
| dry-run 写入 | `write` 不在环境允许效果中 | `blocked / effect_not_allowed_in_environment` | 写入被真实 Sandbox 拦截。 |
| 目标范围不匹配 | 任务目标不在环境声明的 `targetScopes` 中 | `blocked / target_scope_not_allowed_in_environment` | 真实目标、身份或平台授权已被验证。 |
| 测试环境写入 | 写入 profile 与测试凭证 scope 匹配 | `allowed` | 文件、服务或部署真实改变。 |
| 生产外部动作无批准 | 外部 effect 无 approval | `requires_approval / approval_missing` | 人类会批准或生产边界正确。 |
| 批准 scope 不符 | `approval.environmentId` 与环境不同 | `requires_approval / approval_scope_mismatch` | 旧批准不可用于任何系统。 |
| 网络边界不符 | 写入 profile 缺少要求的网络状态 | `blocked / boundary_not_satisfied` | 网络实际被阻断。 |
| 凭证范围缺失 | task 的 scope 不在环境注入列表 | `blocked / credential_scope_missing` | 凭证真实不存在或已过期。 |

## 验证命令

先只创建测试文件并运行下面的命令。2026-07-16 它实际以退出码 `1` 结束并出现 `ERR_MODULE_NOT_FOUND`，因为实现模块尚不存在；这只是红灯记录。

```bash
node --test examples/agent/environment-sandbox-assessment.test.mjs
```

实现后实际运行同一测试和演示：

```bash
node --test examples/agent/environment-sandbox-assessment.test.mjs
node examples/agent/environment-sandbox-assessment.mjs
```

两个命令均于 2026-07-16 以退出码 `0` 结束。测试为 8 项通过、0 项失败；演示输出 `allowed / environment_admission_allowed / inspect-preview`。它们只验证注入教学对象上的确定性判断。

## 可选增强与触发条件

1. **版本化环境 profile：** 当多个团队复用同一环境约束时，增加不可变 profile 版本和迁移审查。
2. **真实策略适配器：** 只有在明确选择具体平台、获得环境授权并定义回读证据后，才读取 CI、容器或云策略。
3. **审计关联：** 当动作会产生共享或不可逆效果时，将准入判断关联到第 10、11、14、17 章各自的状态、调用、批准和验收记录。
