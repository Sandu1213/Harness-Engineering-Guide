---
chapter: "12-environment-sandbox-and-permissions"
stage: "Example Implementation"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 12 章示例整合记录：环境准入判断

## 范围

`assessEnvironmentAccess` 是一个纯内存教学函数。它比较注入的任务效果类别、目标范围、环境允许效果、文件/网络边界、凭证 scope、policy 与批准 snapshot，并返回 `allowed`、`blocked` 或 `requires_approval`。

函数不读取 `process.env`、文件、目录、时钟、网络、secret、身份、容器、CI、Sandbox、云账户、Docker、Kubernetes 或源系统；它不提供、校验或保存真实凭证，也不执行、批准、审计、部署或回读。

## 红灯记录

测试文件先于实现模块存在。2026-07-16 实际执行：

```bash
node --test examples/agent/environment-sandbox-assessment.test.mjs
```

命令以退出码 `1` 结束，报告 `ERR_MODULE_NOT_FOUND`；缺失模块为 `examples/agent/environment-sandbox-assessment.mjs`。该红灯只证明测试先于实现创建。

## 实现与实际运行

实现完成后实际执行：

```bash
node --test examples/agent/environment-sandbox-assessment.test.mjs
node examples/agent/environment-sandbox-assessment.mjs
```

两个命令均以退出码 `0` 结束。补齐目标范围准入后，Node 内置测试为 8 项通过、0 项失败；演示输出：

```json
{
  "status": "allowed",
  "code": "environment_admission_allowed",
  "taskId": "inspect-preview"
}
```

## 测试覆盖与边界

| 路径 | 注入重点 | 预期教学判断 | 不证明 |
| --- | --- | --- | --- |
| dry-run 只读 | 允许效果、只读文件、网络关闭、`none` scope | `allowed / environment_admission_allowed` | 当前机器或目标可读。 |
| dry-run 写入 | 环境未声明 `write` | `blocked / effect_not_allowed_in_environment` | 真实 Sandbox 拦截写入。 |
| 目标范围不匹配 | task target 不在环境 `targetScopes` 中 | `blocked / target_scope_not_allowed_in_environment` | 真实目标、身份或平台授权已验证。 |
| 测试写入 | 测试 profile、写入边界、`test-deploy` scope | `allowed` | 测试服务、文件或构件已改变。 |
| 生产外部动作缺批准 | 外部 effect、生产 profile、无 snapshot | `requires_approval / approval_missing` | 人类会批准。 |
| 批准 scope 不符 | snapshot 环境与当前环境不同 | `requires_approval / approval_scope_mismatch` | 真实审批系统的范围规则。 |
| 网络边界不符 | 注入 profile 的 network 与 policy 不同 | `blocked / boundary_not_satisfied` | 网络真被隔离。 |
| 凭证 scope 缺失 | task scope 不在注入环境列表 | `blocked / credential_scope_missing` | 凭证真实不存在、失效或无权。 |

## 共享集成待办

- 主线程需要在 `package.json` 添加示例和测试脚本，并在 `scripts/validate.sh` 纳入本测试；子任务未修改共享配置。
- 主线程需要在 `examples/agent/README.md` 增加示例说明；子任务未修改共享目录索引。
- 这些命令在本子任务中以直接 Node 命令实际运行，不以尚不存在的 npm script 冒充已经验证。
