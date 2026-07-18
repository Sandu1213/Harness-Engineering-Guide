---
title: "第 14 章示例实现记录：人工审批路由"
chapter: "14-human-in-the-loop"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 14 章示例实现记录：人工审批路由

## 读者问题

在没有接入真实审批系统时，如何验证“范围、证据、效果不确定性和已有决定”会把一个候选动作路由到正确的教学出口，而不是把批准、权限、执行和结果混在一起？

## 目的与边界

本示例计划实现纯函数 `assessHumanApprovalRoute`。它读取注入的行动卡、策略、审批快照和观察快照，返回路由结论；它不保存或修改任何输入。

示例绝不读取文件、网络、环境变量、时钟、身份、密钥、数据库、真实审批系统、Tool 或外部服务；不发出通知、不修改依赖、不运行测试、不创建工单、不发布软件。因此，它不能证明真实人类参与、授权、合规、审批安全、Tool 执行、外部效果或漏洞修复。

## 环境、输入与输出

- **环境：** 已安装支持 Node 内置 `node:test` 的 Node.js。
- **实现路径：** `examples/agent/human-approval-routing.mjs`。
- **测试路径：** `examples/agent/human-approval-routing.test.mjs`。
- **输入：** `action`、`policy`、`approval`、`observation` 四个显式注入对象。
- **输出：** `{ status, code, actionId }`；当必须重新观察时，附带 `effectId` 供调用方定位教学对象。

## 最小接口

```js
assessHumanApprovalRoute({
  action: {
    id: 'dependency-update-plan',
    scope: 'prepare-isolated-change',
    effect: 'reversible_write',
    evidence: { status: 'fresh' },
    successCriteria: 'reviewed-test-plan',
  },
  policy: {
    requiresApprovalFor: ['irreversible_write'],
    allowsAutoFor: ['read_only', 'reversible_write'],
  },
  approval: null,
  observation: { effectStatus: 'not_started' },
});
```

判断顺序由较保守的条件优先：

| 顺序 | 条件 | 返回状态 / 代码 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 行动卡缺关键字段 | `needs_evidence` / `action_card_incomplete` | 人已经拒绝或动作不能做 |
| 2 | 证据非新鲜或不足 | `needs_evidence` / `evidence_not_ready` | 证据必然错误 |
| 3 | 已有写入效果未知 | `blocked` / `effect_unknown` | 效果已经发生或未发生 |
| 4 | 策略、不可逆性或范围要求审批 | `requires_approval` | 系统没有权限或人一定会拒绝 |
| 5 | 已有决定被拒绝 | `rejected` / `approval_rejected` | 问题已经解决 |
| 6 | 批准过期、范围不符或刷新条件命中 | `requires_approval` | 旧批准可继续使用 |
| 7 | 自动候选条件满足 | `allowed` / `auto_candidate` | 动作已执行、获权或验收成功 |
| 8 | 适用且新鲜的批准存在 | `allowed` / `approval_matches_action` | 人的身份、权限或真实系统状态已验证 |

## 红绿验证计划

先只创建测试文件并运行：

```bash
node --test examples/agent/human-approval-routing.test.mjs
```

实际红灯是目标模块尚不存在而导致的 `ERR_MODULE_NOT_FOUND`；它仅证明测试先于实现。

实现后运行：

```bash
node --test examples/agent/human-approval-routing.test.mjs
node examples/agent/human-approval-routing.mjs
```

已实际运行：专用测试退出 0，10 项 Node 内置测试通过、0 项失败；演示退出 0，打印低影响动作的 `allowed` / `auto_candidate` 结论。红绿过程与边界见[示例整合审查](../../.memory/reviews/2026-07-16-chapter-14-example-integration.md)。

## 测试矩阵

| 路径 | 输入重点 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| 自动候选 | 可逆写入、范围窄、证据新鲜、尚未开始 | `allowed` / `auto_candidate` | 实际写入可逆 |
| 不可逆动作 | `irreversible_write` | `requires_approval` / `approval_required` | 人会批准 |
| 缺行动卡字段 | 缺 `successCriteria` | `needs_evidence` / `action_card_incomplete` | 动作永远不可做 |
| 证据不新鲜 | `evidence.status = stale` | `needs_evidence` / `evidence_not_ready` | 证据内容错误 |
| 效果未知 | `effectStatus = unknown` | `blocked` / `effect_unknown` | 效果已发生或未发生 |
| 批准过期 | `approval.status = expired` | `requires_approval` / `approval_expired` | 人的真实权限失效 |
| 范围不匹配 | `approval.scope` 与 `action.scope` 不同 | `requires_approval` / `approval_scope_mismatch` | 任意同类动作可复用批准 |
| 证据状态不匹配 | `approval.evidenceStatus` 与 `action.evidence.status` 不同 | `requires_approval` / `approval_evidence_mismatch` | 旧批准仍适用于新证据 |
| 匹配批准 | 不可逆动作、批准范围和证据状态一致 | `allowed` / `approval_matches_action` | 动作已执行或验收成功 |
| 明确拒绝 | `approval.status = rejected` | `rejected` / `approval_rejected` | 已找到替代方案 |

## 可选增强与升级触发

1. 若需解释原因，返回结构化缺失字段与刷新条件；不要返回真实人名、密钥或生产对象。
2. 若需要跨会话保留决定，接入版本化存储、真实身份、环境绑定和访问控制；这些能力属于第 12、41 章的额外工程任务，不能由本示例推断。
3. 若需要行动后结论，增加独立观察与验收工件；不要将 `allowed` 改名为 `succeeded`。

## 完成检查

- [x] 测试先于实现创建并记录实际红灯。
- [x] 函数只处理注入对象，未引入任何 I/O 或外部依赖。
- [x] 10 条非重复判断路径有精确断言。
- [x] 实现后专用测试与演示已实际运行并记录。
- [ ] 主线程已决定是否把命令加入 `package.json` 和全仓 `validate.sh`；本子任务不修改共享入口。
