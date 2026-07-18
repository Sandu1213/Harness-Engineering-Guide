---
title: "第 19 章示例实现记录：Compaction Record 损失检测"
chapter: "19-context-compaction-and-long-running-tasks"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 19 章示例实现记录：Compaction Record 损失检测

## 读者问题

压缩后如何知道恢复者仍握有任务前提，而不是只得到一段听起来合理的摘要？

## 目的与边界

示例提供纯函数 `assessCompactionRecord`。函数只对注入的教学 `run`、`record` 和 `policy` 作确定性判断，输出恢复前应走的保守路径。

它不读取真实聊天记录、模型输出、文件、外部记忆、数据库、时钟、网络、账户、环境变量、工具结果或任何项目状态。因此，`ready_to_resume` 只表示给定教学对象满足本书的压缩记录检查；它不证明真实内容仍可访问、链接仍有效、任务已恢复、Agent 已继续或外部效果存在。

## 输入、输出与最小接口

- **运行对象 `run`：** `id`、`scope`、`contractVersion`。
- **压缩记录 `record`：** `summary`、稳定 `anchors`、`pointers`、`retained`、`discarded`、`resumption` 与 `lossChecks`。
- **策略 `policy`：** 必需锚点、允许丢弃类别、必需指针类别。
- **输出：** `{ status, code, runId, anchorId? | pointerKind? }`。

```js
import { assessCompactionRecord } from './examples/agent/context-compaction-assessment.mjs';

const conclusion = assessCompactionRecord({
  run: {
    id: 'book-review-run-19',
    scope: 'chapter-19-review',
    contractVersion: '2026-07-16',
  },
  record: {
    runId: 'book-review-run-19',
    scope: 'chapter-19-review',
    contractVersion: '2026-07-16',
    summary: '保留目标、决定、未知项和恢复条件。',
    anchors: [/* 每项关联证据指针 */],
    pointers: [/* 受控再定位线索 */],
    retained: [/* 保留理由 */],
    discarded: [/* 丢弃类别与理由 */],
    resumption: { nextAction: '先重新读取来源', mustVerify: ['unknown-citation'] },
    lossChecks: ['required_anchors_present'],
  },
  policy: {
    requiredAnchorIds: ['goal', 'decision-source', 'unknown-citation'],
    allowedDiscardKinds: ['redundant_tool_output', 'superseded_draft'],
    requiredPointerKinds: ['evidence'],
  },
});
```

## 判定顺序

| 顺序 | 条件 | 返回 | 不能推出 |
| --- | --- | --- | --- |
| 1 | `run`、策略、摘要、下一动作或损失检查缺失 | `needs_spec` / `compaction_record_incomplete` | 任务永远不能恢复。 |
| 2 | 记录的运行标识或范围不匹配 | `blocked` / `record_identity_mismatch` | 另一段任务记录可安全拼接。 |
| 3 | 契约版本不匹配 | `needs_rehydration` / `contract_version_mismatch` | 原任务失败或应自动重试。 |
| 4 | 必需证据类别或稳定锚点缺失 | `needs_evidence` | 摘要可以代替原始材料。 |
| 5 | 锚点的证据指针无法定位 | `needs_rehydration` / `anchor_pointer_missing` | 指针目标真实存在或有访问权。 |
| 6 | 丢弃类别不允许或没有理由 | `needs_review` / `discard_decision_not_justified` | 原始材料一定应永久保留。 |
| 7 | 不确定锚点没有专属损失检查 | `needs_evidence` | 不确定性可以被措辞淡化。 |
| 8 | 所有教学前提满足 | `ready_to_resume` / `compaction_record_ready` | 真实任务、环境、权限或外部效果已验证。 |

## 红绿验证

实现前只存在测试文件，运行：

```bash
node --test examples/agent/context-compaction-assessment.test.mjs
```

实际红灯是 `ERR_MODULE_NOT_FOUND`，因为目标模块尚不存在。这只证明测试先于实现创建。

实现后运行：

```bash
node --test examples/agent/context-compaction-assessment.test.mjs
node examples/agent/context-compaction-assessment.mjs
```

实际结果写入[示例整合审查](../../.memory/reviews/2026-07-16-chapter-19-example-integration.md)。

## 测试矩阵

| 路径 | 重点 | 预期 | 不证明 |
| --- | --- | --- | --- |
| 正常继续 | 锚点、指针、保留/丢弃与损失检查完整 | `ready_to_resume` | 真实上下文已恢复。 |
| 记录不完整 | 缺摘要或下一动作 | `needs_spec` | 任务无价值。 |
| 错任务接续 | 范围不同 | `blocked` | 当前记录被删除。 |
| 契约漂移 | 版本不同 | `needs_rehydration` | 已完成真实恢复。 |
| 缺稳定锚点 | 未决引用没有锚点 | `needs_evidence` | 未决项已经失败。 |
| 断指针 | 锚点指向不存在的指针 | `needs_rehydration` | 指针目标被真正删除。 |
| 无理由丢弃 | 原始证据被标为可丢弃且无理由 | `needs_review` | 原始材料必须永久进入模型输入。 |
| 不确定项 | 没有相应损失检查 | `needs_evidence` | 不确定性已经被解决。 |
| 缺证据类别 | 没有 `evidence` 指针 | `needs_evidence` | 摘要可独立证明事实。 |

## 升级触发

1. 若要实际解析指针，先定义工具协议、环境权限和数据最小化；不得将路径字符串当作访问授权。
2. 若要持久化记录或跨任务复用，先经过第 7 章的写入、读取、过期和撤销门槛。
3. 若版本不匹配、未决项或外部效果不确定，交给第 18 章或人工策略；本函数不自动再试。

## 完成检查

- [x] 函数只处理注入对象，未引入外部 I/O 或依赖。
- [x] 每条测试都检查一个可观察的保守出口。
- [x] `ready_to_resume` 的狭窄含义在代码、正文和测试记录中一致。
- [ ] 主线程决定是否将专用命令加入共享 `package.json` 和总校验脚本。
