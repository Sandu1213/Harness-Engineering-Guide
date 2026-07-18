# 第 16 章 Example Integration Review

日期：2026-07-16

## 红绿过程

先创建 `examples/agent/reflection-record-assessment.test.mjs`，再运行：

```bash
node --test examples/agent/reflection-record-assessment.test.mjs
```

实际红灯为 `ERR_MODULE_NOT_FOUND`，因为 `reflection-record-assessment.mjs` 尚不存在。该结果只证明测试在实现之前执行，不对应任何真实链接检查或故障。

实现 `assessReflectionRecord` 后，实际执行：

```bash
node --test examples/agent/reflection-record-assessment.test.mjs
node examples/agent/reflection-record-assessment.mjs
```

专用测试退出码 0，8 项 Node 内置测试通过、0 项失败。演示退出码 0，输出：

```text
candidate_for_validation
reflection_candidate_ready
run_falsifiable_check
```

## 行为覆盖

| 情形 | 断言出口 | 保护的边界 |
| --- | --- | --- |
| 有界失败、当前观察、完整反思、未运行验证 | `candidate_for_validation` | 候选不是已采纳经验 |
| 候选检查通过 | `eligible_for_review` | 验证与采纳分离 |
| 候选检查失败 | `rejected` | 失败不被重命名为经验 |
| 缺观察来源 | `needs_evidence` | 不补写缺失事实 |
| 轨迹评估通过 | `not_applicable` | 不从成功轨迹制造失败经验 |
| 观察陈旧 | `refresh_required` | 不用旧状态推导新结论 |
| 缺可证伪检查 | `needs_evidence` | 假设不是根因 |
| 改变范围扩大 | `blocked` | 局部故障不能静默改写全仓 |

## 结论与限制

函数只处理注入对象，没有文件、网络、时钟、模型、进程、数据库或持久化 I/O。它不验证真实链接、根因、SRE 流程、记忆、权限、审批、规则修改或任何 Harness 改进。主线程可在共享入口中登记此示例，但本子任务没有修改 `package.json` 或总校验脚本。
