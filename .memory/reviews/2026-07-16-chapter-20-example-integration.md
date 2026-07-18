# 第 20 章 Example Integration Review

## 范围

- `examples/agent/self-improvement-boundary-assessment.mjs`
- `examples/agent/self-improvement-boundary-assessment.test.mjs`
- 第 20 章 Example Plan 与正文示例说明。

## 红绿验证

2026-07-16 先实际执行：

```bash
node --test examples/agent/self-improvement-boundary-assessment.test.mjs
```

结果为退出码 1，错误为 `ERR_MODULE_NOT_FOUND`；目标模块尚未创建。这是预期红灯，只证明测试先于实现。

实现后实际执行：

```bash
node --test examples/agent/self-improvement-boundary-assessment.test.mjs
node examples/agent/self-improvement-boundary-assessment.mjs
```

两条命令退出码均为 0。测试为 10 项通过、0 项失败；演示输出 `ready_for_controlled_release`、`candidate_change_gate_passed` 与 `retry-policy-backoff-v2`。

## 审查结论

- 函数只读取注入的候选、验证、批准、回滚和监控对象，不执行网络、文件、模型、发布、权限、监控或后台任务。
- 明确失败的独立验证返回 `rejected`；未知或范围不匹配返回 `needs_evidence`，不把它们压成同一结论。
- 批准必须显式存在并匹配候选范围；通过验证不自动构成授权。
- 回滚同时要求 `available` 与 `tested`，监控要求至少一个具名指标。
- 返回对象不包含 `published` 或 `deploymentId`；测试明确覆盖这一无发布边界。

## 未验证范围

本示例不证明真实验证器独立、真实批准有效、回滚可执行、监控已接入、发布安全、生产权限或长期运行健康。
