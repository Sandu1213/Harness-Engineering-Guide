---
title: "第 8 章示例实现记录：最小 Skill 选择"
chapter: "08"
status: "implemented"
implementation: "../../examples/agent/skill-selection.mjs"
tests: "../../examples/agent/skill-selection.test.mjs"
updated_at: "2026-07-15"
---

# 第 8 章示例实现记录：最小 Skill 选择

> 本文件记录已实现并运行的纯内存教学示例。`evaluateSkillSelection`、其 Contract 字段、状态名称和决策顺序都是本书工程模型；它们不是 Agent Skills、Claude Code、ChatGPT、Codex、Plugin 或任何 Tool 的 API、权限模型或调用协议。所有输入均由测试或演示注入。

## 读者问题

“当一个任务看起来像 Markdown 审查，但缺少资料、超出范围、请求写入，或没有足够选择证据时，Harness 怎样明确选择、阻塞、要求批准或拒绝适用，而不读取真实章节或触发真实动作？”

## 最小范围与非目标

`evaluateSkillSelection(request)` 只检查注入的 Skill Contract、任务摘要、前置条件和选择证据。它输出 `selected`、`blocked`、`requires_approval` 或 `not_applicable`，并给出阶段、原因、缺失项和请求的效果。

它不会读取章节、目录、规则文件、引用登记、环境变量、时钟、网络、数据库、模型、Plugin、Hook、MCP、账户、凭证、进程或 Tool；不会安装或发现真实 Skill；不会批准、执行、模拟或验证任何外部读写动作。`chapterPath`、`ruleVersion` 与 `referenceRegistry` 都是教学字符串，不是文件系统查询。

## 实际接口

```js
evaluateSkillSelection({
  contract: {
    id: 'review-markdown-chapter@1',
    taskKind: 'markdown-review',
    allowedScopes: ['single-chapter'],
    allowedEffects: ['read-only'],
    requiredInputs: [
      'chapterPath',
      'ruleVersion',
      'referenceRegistry',
      'reviewDimensions',
    ],
    requiredPreconditions: ['chapterReadable', 'rulesAvailable'],
    requiredEvidence: [
      'contract-id',
      'task-inputs',
      'precondition-snapshot',
    ],
  },
  task: {
    kind: 'markdown-review',
    scope: 'single-chapter',
    requestedEffect: 'read-only',
    inputs: {
      chapterPath: 'docs/chapter.md',
      ruleVersion: 'book-rules@2026-07-15',
      referenceRegistry: 'injected:references',
      reviewDimensions: ['citations', 'terminology'],
    },
  },
  preconditions: {
    chapterReadable: true,
    rulesAvailable: true,
  },
  evidence: ['contract-id', 'task-inputs', 'precondition-snapshot'],
});
```

## 输入与输出契约

| 字段 | 教学用途 | 判断规则 | 不代表什么 |
| --- | --- | --- | --- |
| `contract.taskKind` 与 `allowedScopes` | 确认任务类别和范围。 | 类别或范围不匹配时返回 `not_applicable`。 | 自动发现、产品目录规则或全局权限。 |
| `allowedEffects` 与 `requestedEffect` | 分离默认只读边界与写入请求。 | 请求效果不在允许集合时返回 `requires_approval`。 | 已批准、已执行或可回滚的外部写入。 |
| `requiredInputs` 与 `task.inputs` | 检查完成本次选择所需资料。 | 任一空值或空数组返回 `blocked`。 | 路径、规则或引用登记真实存在或可读。 |
| `requiredPreconditions` 与 `preconditions` | 检查测试注入的准备状态。 | 非 `true` 的条件返回 `blocked`。 | Sandbox、身份、ACL 或真实环境检查。 |
| `requiredEvidence` 与 `evidence` | 让选择理由可追溯。 | 缺任一标记返回 `blocked`。 | 内容事实、审查结论或任务完成。 |

```js
{
  status: 'selected' | 'blocked' | 'requires_approval' | 'not_applicable',
  phase: string,
  contractId: string,
  reasons: string[],
  missing: string[],
  effects: string[],
}
```

- `selected` 只表示注入对象满足本书的只读选择规则，不表示真实审查已经开始或完成。
- `blocked` 只表示输入、前置条件或选择证据缺失；函数不会补写缺失值。
- `requires_approval` 只标记请求效果超出默认只读边界；函数不会授予或执行该效果。
- `not_applicable` 只表示任务类别或范围不属于该 Contract；它不评价任务本身是否正确。

## 确定性决策规则

1. 先检查请求、Contract、任务、前置条件和证据的数据形状；无效形状抛出 `TypeError`，不进入选择逻辑。
2. 任务类别不匹配或范围不在 `allowedScopes` 时返回 `not_applicable`；不继续检查资料或调用其他能力。
3. 请求效果不在 `allowedEffects` 时返回 `requires_approval`，并只回显该教学效果名称。
4. 合同要求的输入有空值或空数组时返回 `blocked / missing_required_inputs`；不猜测路径、规则或引用登记。
5. 合同要求的前置条件不为 `true` 时返回 `blocked / missing_preconditions`；不把测试布尔值误写成真实权限。
6. 合同要求的选择证据缺失时返回 `blocked / missing_selection_evidence`；不把模型说明或输出形状代替证据。
7. 只有上述检查均满足时，返回 `selected / ready_for_read_only_review`，且 `effects` 为空。

## 红灯、绿灯与已运行路径

实施前先创建 [skill-selection.test.mjs](../../examples/agent/skill-selection.test.mjs)，再运行：

```bash
node --test examples/agent/skill-selection.test.mjs
```

该命令于 2026-07-15 如预期以 `ERR_MODULE_NOT_FOUND` 失败，因为 `skill-selection.mjs` 尚不存在。这只证明测试先于实现存在，不是产品故障或权限结果。

随后实现 [skill-selection.mjs](../../examples/agent/skill-selection.mjs)，并实际运行：

```bash
npm run test:skill-selection
npm run example:skill-selection
```

2026-07-15 的实际结果为 6 项 Node 内置测试通过、0 项失败；演示输出 `selected` / `ready_for_read_only_review`、Contract ID、选择理由、空缺失项与空效果列表。它只证明纯函数对注入对象遵守本节规则，不证明真实 Markdown 文件、规则、引用、Skill、Plugin、Tool、权限或审查结果存在。

## 已实现的测试路径

1. **只读选择：** 类别、范围、四项输入、两项前置条件和三项证据齐全时返回 `selected`。
2. **缺少输入：** 空的 `referenceRegistry` 返回 `blocked / missing_required_inputs`，并精确列出缺失字段。
3. **缺少前置条件：** `rulesAvailable: false` 返回 `blocked / missing_preconditions`。
4. **范围不匹配：** `repository-wide-rewrite` 返回 `not_applicable / scope_not_supported`，不继续选择。
5. **请求写入：** `requestedEffect: write` 返回 `requires_approval / effect_outside_default_boundary`，不批准或写入。
6. **缺少选择证据：** 遗漏 `precondition-snapshot` 返回 `blocked / missing_selection_evidence`。

## 不属于本示例的能力

- 真实 Skill 目录、`SKILL.md`、产品发现、自动调用、安装、升级或弃用。
- 真实 Markdown 解析、链接检查、引用登记、语言检查、findings 生成或文件修改。
- Tool 接口、MCP、Hook、Plugin、Sandbox、身份、授权、审批、审计和源系统 ACL。
- 模型推理、网络、文件系统、环境变量、时钟、账户、凭证、进程、数据库、会话或持久化。

## 实现完成检查

- [x] 定义了纯内存输入、输出、状态、原因、缺失项和效果契约。
- [x] 实现并实际运行了选择、缺输入、缺前置条件、范围不匹配、写入升级和缺证据六条路径。
- [x] 记录了目标模块不存在的红灯与 6 项通过的绿灯结果。
- [x] 已接入 `package.json` 与 `scripts/validate.sh`，且不含真实 I/O 或权限模拟。
