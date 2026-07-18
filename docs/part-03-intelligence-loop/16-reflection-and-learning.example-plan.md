---
title: "第 16 章示例实现记录：反思候选评估"
chapter: "16-reflection-and-learning"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 16 章示例实现记录：反思候选评估

## 读者问题

没有接入真实日志、评估器或经验库时，如何验证一个反思记录会在缺证据、观察过期、假设不可证伪、范围扩大、验证失败和检查通过时进入不同出口？

## 目的与边界

示例实现纯函数 `assessReflectionRecord`，读取显式注入的 `trace`、`reflection` 和 `verification`。它返回候选状态，不写入任何对象。

函数不读取文件、网络、环境变量、时钟、模型、进程、数据库、真实链接检查器或记忆系统；不执行重试、不修改规则、不保存经验、不发送消息。因此不能证明真实失败、根因、经验质量、持久化、权限、审批、网络或 Harness 改进。

## 环境、输入与输出

- **环境：** 已安装支持 `node:test` 的 Node.js。
- **实现路径：** `examples/agent/reflection-record-assessment.mjs`。
- **测试路径：** `examples/agent/reflection-record-assessment.test.mjs`。
- **输入：** `trace`、`reflection`、`verification` 三个注入对象。
- **输出：** `{ status, code, traceId, nextAction, missing }`；所有值都是教学状态，不是外部系统记录。

## 最小接口

```js
assessReflectionRecord({
  trace: {
    id: 'link-check-attempt-02',
    scope: 'docs:chapter-16',
    outcome: 'failed',
    observationStatus: 'current',
    evidence: 'injected:link-check-output',
  },
  reflection: {
    symptom: '两个链接检查请求未通过。',
    hypothesis: '候选资料 URL 的格式可能不符合检查器规则。',
    falsifiableCheck: '用同一检查器对最小 URL 列表重新执行。',
    counterfactual: '若最小 URL 列表通过，优先检查暂态网络或原页面可达性。',
    proposedChange: '为候选资料增加可追溯链接预检查。',
    changeScope: 'docs:chapter-16',
  },
  verification: { status: 'not_run' },
});
```

判断顺序从不可推断的状态开始：

| 顺序 | 条件 | 返回状态 / 代码 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 轨迹字段缺失 | `needs_evidence` / `reflection_input_incomplete` | 发生了真实失败 |
| 2 | 轨迹结果未知 | `needs_evidence` / `trace_outcome_unknown` | 应该生成经验 |
| 3 | 评估不是失败 | `not_applicable` / `no_verified_failure` | 成功轨迹没有价值 |
| 4 | 观察不是当前 | `refresh_required` / `observation_not_current` | 观察已经错误 |
| 5 | 反思字段或可证伪检查缺失 | `needs_evidence` / `hypothesis_not_falsifiable` | 假设是根因 |
| 6 | 改变范围扩大 | `blocked` / `change_scope_expanded` | 候选可自动扩大 |
| 7 | 检查失败 | `rejected` / `candidate_check_failed` | 已找到替代解释 |
| 8 | 检查通过 | `eligible_for_review` / `candidate_check_passed` | 经验已经采纳 |
| 9 | 检查未运行 | `candidate_for_validation` / `reflection_candidate_ready` | 根因、经验或改进已经成立 |

## 红绿验证过程

先创建测试并执行：

```bash
node --test examples/agent/reflection-record-assessment.test.mjs
```

实际红灯是目标模块尚不存在导致的 `ERR_MODULE_NOT_FOUND`。它只证明测试先于实现，并不表示教学场景中的链接检查确实失败。

实现后实际执行：

```bash
node --test examples/agent/reflection-record-assessment.test.mjs
node examples/agent/reflection-record-assessment.mjs
```

专用测试退出码 0，8 项 Node 内置测试通过、0 项失败；演示退出码 0，打印 `candidate_for_validation` / `reflection_candidate_ready` / `run_falsifiable_check`。完整记录见[示例整合审查](../../.memory/reviews/2026-07-16-chapter-16-example-integration.md)。

## 测试矩阵

| 路径 | 输入重点 | 预期判断 | 不证明 |
| --- | --- | --- | --- |
| 有界失败候选 | 失败、当前观察、完整记录、未运行检查 | `candidate_for_validation` | 根因正确或经验已写入 |
| 检查通过 | `verification.status = passed` | `eligible_for_review` | 可跨项目采用 |
| 检查失败 | `verification.status = failed` | `rejected` | 已定位新原因 |
| 缺观察来源 | `trace.evidence` 为空 | `needs_evidence` | 真实日志丢失 |
| 成功轨迹 | `outcome = passed` | `not_applicable` | 不应保存该轨迹 |
| 陈旧观察 | `observationStatus = stale` | `refresh_required` | 观察一定错误 |
| 不可证伪假设 | 缺 `falsifiableCheck` | `needs_evidence` | 假设一定为假 |
| 范围扩大 | `changeScope` 不同 | `blocked` | 提议一定不可行 |

## 可选增强与升级触发

1. 若需要保留多个假设，返回候选列表和显式对照；不要把排序最高的假设改名为根因。
2. 若需要采集真实证据，接入版本化日志、快照与访问控制；这些能力属于第 15、41 章的额外工程任务。
3. 若需要影响共享规则，增加 Evaluation Spec、人工审查、变更记录和回滚；不要在本函数中新增 `writeLesson` 或 `updatePolicy`。

## 完成检查

- [x] 测试先于实现创建，并记录实际模块缺失红灯。
- [x] 函数只处理注入对象，没有任何 I/O 或外部依赖。
- [x] 8 条非重复判断路径覆盖候选、验证、缺证据、新鲜度与范围边界。
- [x] 专用测试和演示已实际运行并记录。
- [ ] 主线程决定是否将命令加入 `package.json` 与全仓 `validate.sh`；本子任务不修改共享入口。
