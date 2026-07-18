---
title: "第 9 章示例实现记录：纯内存任务计划检查"
chapter: "09"
status: "implemented"
implementation: "../../examples/agent/task-plan-assessment.mjs"
tests: "../../examples/agent/task-plan-assessment.test.mjs"
updated_at: "2026-07-15"
---

# 第 9 章示例实现记录：纯内存任务计划检查

> 本文件记录已实现并运行的纯内存教学示例。计划摘要（Plan Brief）、任务卡（Task Card）、状态、字段和判断顺序都是本书工程模型；它们不是 Planner、任务调度器、OpenAI Agents SDK、Anthropic 产品、应用程序接口（Application Programming Interface，API）测试框架、权限系统或任何真实项目的接口。所有输入均由测试或演示注入。

## 读者问题

“一个任务具有目标、完成证据、输入、输出和依赖时，Harness 怎样在不访问真实 API、文件、环境或凭证的前提下，明确它是可准备、被阻塞、需要批准还是不能并行？”

## 最小范围与非目标

待实现的 `assessTaskPlan(request)` 只读取测试或演示注入的：

- 计划摘要：目标、完成证据与停止条件。
- 任务卡：问题、输入、输出、验收证据、依赖、效果标签和资源标签。
- 请求快照：要检查的任务、并行候选、已完成任务 ID 与测试注入的效果批准标记。

它只返回 `ready`、`blocked`、`requires_approval` 或 `not_ready`，以及阶段、原因、缺失字段、等待依赖和可并行候选。它不会生成计划、执行任务、安排并行工作、读取真实资料、调用模型、网络、文件、进程、测试框架、Tool、环境变量、账户、凭证、权限系统或外部 API。

`approvedEffects` 只是注入的教学布尔值，用来检查任务卡的效果标签是否越过当前模型的默认只读边界；它不是身份、策略、沙箱（Sandbox）、访问控制列表（Access Control List，ACL）、真实批准或外部动作的模拟。

## 实际接口

```js
assessTaskPlan({
  planBrief: {
    goal: '为虚构服务形成认证测试方案',
    completionEvidence: ['认证契约已定位', '断言已审查'],
    stopConditions: ['认证契约不可定位'],
  },
  tasks: [
    {
      id: 'research-auth-contract',
      question: '认证契约能否被定位？',
      inputs: ['injected:requirement'],
      output: 'contract-evidence',
      acceptanceEvidence: ['traceable-source'],
      dependencies: [],
      effect: 'read_only',
      resources: ['auth-contract'],
    },
  ],
  request: {
    taskId: 'research-auth-contract',
    parallelWith: [],
    completedTaskIds: [],
    approvedEffects: {},
  },
});
```

```js
{
  status: 'ready' | 'blocked' | 'requires_approval' | 'not_ready',
  phase: string,
  taskId: string,
  reasons: string[],
  missing: string[],
  waitingFor: string[],
  parallelCandidates: string[],
  effects: string[],
}
```

## 确定性判断规则

1. 先检查注入对象形状；缺少对象、数组或字符串字段时抛出 `TypeError`，不尝试补全。
2. 计划摘要缺少目标、完成证据或停止条件时，返回 `not_ready / missing_plan_brief`。
3. 请求的任务卡不存在时，返回 `not_ready / task_not_found`。
4. 任务卡缺问题、输入、输出或验收证据时，返回 `blocked / missing_task_contract`，并列出字段。
5. 未出现在 `completedTaskIds` 中的依赖使任务返回 `blocked / unmet_dependencies`；函数不将任务图写成完成记录。
6. 任务效果不是 `read_only` 且相应教学批准标记不为 `true` 时，返回 `requires_approval / effect_requires_approval`；函数不授予或执行该效果。
7. 若请求并行候选，两个任务共享资源时返回 `not_ready / parallel_candidate_conflict`；无共享资源时，才回显可并行候选 ID。
8. 以上条件均满足时，返回 `ready / ready_for_planned_task`。这只证明注入对象满足教学契约，不表示真实任务、授权、调度、API 测试或业务验收已经发生。

## 已实现的测试路径

1. **只读准备：** 完整的研究任务可返回 `ready`，并保留一个不共享资源的并行候选。
2. **缺验收证据：** 任务卡的 `acceptanceEvidence` 为空时返回 `blocked / missing_task_contract`。
3. **依赖未满足：** 设计断言任务缺少认证契约研究结果时返回 `blocked / unmet_dependencies`。
4. **写入需批准：** 需要写入的测试草稿任务未有注入批准标记时返回 `requires_approval`。
5. **共享资源冲突：** 两个并行候选共享同一测试环境标签时返回 `not_ready / parallel_candidate_conflict`。
6. **计划摘要不完整：** 缺少完成证据时返回 `not_ready / missing_plan_brief`。

## 红灯、绿灯与已运行路径

```bash
node --test examples/agent/task-plan-assessment.test.mjs
```

该命令于 2026-07-15 如预期以 `ERR_MODULE_NOT_FOUND` 失败，因为 `task-plan-assessment.mjs` 尚不存在。这只证明测试先于实现存在，不是计划、权限、API 或外部系统失败。

随后实现 [`task-plan-assessment.mjs`](../../examples/agent/task-plan-assessment.mjs)，并实际运行：

```bash
npm run test:task-plan-assessment
npm run example:task-plan-assessment
```

2026-07-15 的实际结果为 6 项 Node 内置测试通过、0 项失败；演示输出 `ready / ready_for_planned_task`、目标任务 ID、一条准备理由，以及空的 `missing`、`waitingFor`、`parallelCandidates` 与 `effects` 列表。它只证明纯函数对注入对象遵守本节规则，不证明真实计划、授权、调度、API 测试、文件、凭证或业务验收已经发生。

## 不属于本示例的能力

- Planner、任务生成、依赖图推断、有向无环图（Directed Acyclic Graph，DAG）执行、并发调度、重试、恢复或跨会话状态。
- 真实 API、认证协议、超文本传输协议（Hypertext Transfer Protocol，HTTP）请求、测试框架、代码修改、文件系统、网络、环境变量、进程、账户、凭证或数据库。
- Tool、模型上下文协议（Model Context Protocol，MCP）、Skill 发现、Workflow 引擎、Sandbox、身份、策略、ACL、人工批准、审计或任何外部副作用。

## 实现完成检查

- [x] 定义了纯内存输入、输出、状态、字段、优先顺序和无副作用边界。
- [x] 实现并实际运行了准备、缺契约、未满足依赖、需批准、资源冲突与不完整 Brief 六条路径。
- [x] 记录了目标模块不存在的红灯与 6 项通过的绿灯结果。
- [x] 已接入 `package.json` 与 `scripts/validate.sh`，且不含真实 I/O 或权限模拟。
