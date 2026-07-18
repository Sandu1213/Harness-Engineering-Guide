---
title: "第 41 章示例计划：研究安全准入与审计评估"
chapter: "41"
status: "completed"
updated_at: "2026-07-17"
---

# 第 41 章示例计划：研究安全准入与审计评估

## 目标与边界

`assessResearchSecurityPlan(input)` 只检查调用方注入的威胁模型、任务、不可信内容信封、能力授予、秘密引用、候选动作、策略决定、工具安全门、审计事件、供应链记录和事件交接路由。它返回确定性教学状态，不调用模型、浏览器、文件、网络、OAuth、MCP、身份、权限、秘密管理器、日志、SIEM、供应链或事件响应系统。

| 允许 | 不允许 |
| --- | --- |
| 读取普通 JavaScript 对象；比较显式身份、范围和状态；返回受限原因码；打印演示 JSON。 | 获取网页、扫描秘密、发放凭证、验证 token、调用工具、写日志、加载 Skill、启动 Server、通知责任人或执行安全处置。 |

输入中的 `containsSensitiveValue`、`secretExposureSuspected`、`sourceTrust` 和 `reviewState` 都是测试明确注入的教学标记。函数不检查字符串是否“像密钥”，也不从环境变量、文件、命令输出或网络响应推断真实秘密和安全状态。

## 接口草图

```js
assessResearchSecurityPlan({
  threatModel,
  task,
  contentEnvelope,
  capabilityGrant,
  secretReferences,
  candidateAction,
  policyDecision,
  toolSecurityGate,
  auditEvent,
  supplyChainRecord,
  incidentRoute,
});
```

返回对象固定包含：

```js
{
  status,
  code,
  taskRef,
  next,
  executionPerformed: false,
}
```

允许的顶层状态只有 `ready_for_read_only_review`、`needs_evidence`、`blocked` 和 `escalate_security_review`。`ready_for_read_only_review` 只表示注入对象满足当前只读教学契约；它不表示网页已读取、内容真实、工具已调用、权限已生效或审计事件已写入。

## 判定顺序

1. 检查威胁模型是否包含资产、入口、信任边界、允许效果和责任角色。
2. 检查内容信封是否保留来源、用途、`untrusted_data` 状态和任务关联。
3. 拒绝外部内容提出的控制变更，以及超出任务目标、动作或数据范围的候选。
4. 检查能力授予是否任务绑定、当前有效、可撤销且不含通配动作。
5. 检查策略版本、受限决定和事件引用。
6. 检查秘密引用是否不携带值且生命周期状态明确。
7. 检查工具来源、最小 scope、观察计划，以及 MCP 凭证受众是否匹配目标。
8. 拒绝显式标为含敏感值的审计事件，并检查事件字段和前序引用。
9. 检查供应链来源、所有者、版本、审查状态和请求能力。
10. 秘密疑似暴露或事件路由被要求时，只返回具名安全交接；没有责任人则保守升级。

判定顺序只说明纯函数分支，不是安全产品的执行管线。

## TDD 证据

| 阶段 | 实际命令 | 实际结果 | 有限结论 |
| --- | --- | --- | --- |
| RED | `rtk node --test examples/agent/research-security-plan-assessment.test.mjs` | 退出码 1；`ERR_MODULE_NOT_FOUND`。 | 预期实现模块尚不存在；不是安全控制失败。 |
| 初次 GREEN | 同一测试命令 | 退出码 0；12 项通过、0 项失败。 | 首批计划路径由纯函数通过。 |
| 最小权限 RED | 增加“摘要能力夹带上传动作”测试后运行同一命令 | 退出码 1；12 项通过、1 项失败，实际错误地返回 `ready_for_read_only_review`。 | 只拒绝通配符仍会漏过无关的额外动作。 |
| 最终 GREEN | 将能力限制为当前候选所需的唯一动作后运行同一命令 | 退出码 0；13 项通过、0 项失败。 | 纯函数对测试构造的普通对象给出预期路由。 |
| EXECUTE | `rtk node examples/agent/research-security-plan-assessment.mjs` | 退出码 0；输出 `ready_for_read_only_review / read_only_security_plan_ready / review_extracted_facts / executionPerformed: false`。 | 演示只打印教学 JSON，没有外部效果。 |

## 测试矩阵

| 路径 | 预期状态／原因码 | 不证明 |
| --- | --- | --- |
| 完整只读教学计划。 | `ready_for_read_only_review / read_only_security_plan_ready` | 网页、模型、工具或事实核验已运行。 |
| 威胁模型缺受保护资产。 | `needs_evidence / threat_model_incomplete` | 真实系统没有任何安全控制。 |
| 内容信封缺来源。 | `needs_evidence / content_envelope_incomplete` | 来源不存在或恶意。 |
| 不可信内容要求改变控制。 | `blocked / untrusted_content_requested_control` | 平台已经阻断真实提示注入。 |
| 候选目标超出任务。 | `blocked / candidate_target_out_of_scope` | 外部上传已经发生。 |
| 能力授予包含通配或额外无关动作。 | `blocked / capability_not_minimal` | 真实 token 已撤销或权限已收回。 |
| 策略版本缺失。 | `needs_evidence / policy_version_missing` | 真实策略引擎不可用。 |
| 审计事件显式标为含敏感值。 | `blocked / sensitive_data_in_audit_event` | 已发现或清除了真实秘密。 |
| 审计事件没有关联策略事件。 | `needs_evidence / audit_chain_incomplete` | 日志被篡改或事件顺序已确定。 |
| MCP 凭证受众与目标不匹配。 | `blocked / credential_audience_mismatch` | 已解析、验证或拒绝真实 token。 |
| 供应链来源未审查。 | `blocked / supply_chain_unreviewed` | 工件恶意或主机已受影响。 |
| 秘密疑似暴露且事件责任人缺失。 | `escalate_security_review / incident_owner_missing` | 人员已通知、秘密已轮换或事件已遏制。 |

## 运行前提与命令

- 只需要本仓 Node.js，不需要安装新依赖。
- 模块和测试不读取环境变量、真实时间、文件内容或网络。

```bash
node --test examples/agent/research-security-plan-assessment.test.mjs
node examples/agent/research-security-plan-assessment.mjs
```

Example Implementation 阶段按任务边界没有修改 `package.json`、`scripts/validate.sh`、`README.md` 或 `examples/README.md`。截至 Final Review，主线程已在共享 `package.json` 接入 `test:research-security-plan-assessment` 与 `example:research-security-plan-assessment`；本计划只记录当前入口状态，不把共享修改归入原示例阶段。
