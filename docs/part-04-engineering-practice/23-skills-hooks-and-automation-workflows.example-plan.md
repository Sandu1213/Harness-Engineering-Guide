---
title: "第 23 章示例计划：自动化提案准入判断"
chapter: 23
status: "complete"
updated_at: "2026-07-16"
---

# 第 23 章示例计划：自动化提案准入判断

## 目的

用一个没有外部 I/O 的 Node.js 函数，把“该用 Skill、Hook、Workflow 还是 Automation”的选择变成可测试的对象判断。示例只支持本章教学术语，不是任何产品配置验证器。

## 文件与环境

- 实现：`examples/agent/automation-workflow-admission-assessment.mjs`。
- 测试：`examples/agent/automation-workflow-admission-assessment.test.mjs`。
- 运行环境：本仓库已有的 Node.js 内置测试运行器。
- 输入：调用方注入的 `artifact` 与 `environment` 普通对象。
- 输出：`status`、`boundary`、`reasons`。

## 输入契约

| 字段 | 用途 | 缺失时的保守结果 |
| --- | --- | --- |
| `artifact.kind` | `skill`、`hook`、`workflow` 或 `automation`。 | 不支持的种类为 `not_applicable`。 |
| `task` 与 `output` | 说明任务与可观察产物。 | `blocked`。 |
| `effect` | 表示教学上的效果类别，如 `read`、`write`。 | 缺失为 `blocked`，未列入允许类别为 `requires_approval`。 |
| `trigger` | Skill 的 `task_match`、Hook 的生命周期事件或 Automation 的外部事件。 | 对应工件为 `blocked`。 |
| `failurePolicy` | Hook、Workflow 与 Automation 的失败可见性。 | 对应工件为 `blocked`。 |
| `stateRecord` 与 `checkpointRequired` | Workflow 的状态和恢复边界。 | 状态性流程为 `blocked`。 |

字段和值都是本书教学模型，不对应真实 Codex、GitHub Actions、Hook 或权限配置格式。

## 红绿过程

先创建测试文件并执行：

```bash
node --test examples/agent/automation-workflow-admission-assessment.test.mjs
```

实际红灯结果：模块尚未创建，Node 以 `ERR_MODULE_NOT_FOUND` 退出。随后创建最小实现，再次运行测试与演示：

```bash
node --test examples/agent/automation-workflow-admission-assessment.test.mjs
node examples/agent/automation-workflow-admission-assessment.mjs
```

实际绿灯结果：9 项测试通过、0 项失败；演示输出 `{"status":"ready","boundary":"event_driven_check","reasons":[]}`。

## 覆盖的判断

1. 任务触发和输出完整的只读 Skill 为 `ready`。
2. 没有生命周期事件的 Hook 为 `blocked`。
3. 用 Hook 承担有状态编排为 `not_applicable`。
4. 未批准写入效果的 Hook 为 `requires_approval`。
5. 没有状态记录或检查点的 Workflow 为 `blocked`。
6. 没有失败策略的 Automation 为 `blocked`。
7. Tool 提案由第 11 章的协议边界处理，为 `not_applicable`。
8. 状态与检查点齐备的 Workflow 为 `ready`。
9. 触发与失败策略齐备的 Automation 为 `ready`。

## 明确不覆盖的范围

- 不发现、解析、加载或执行任何 `SKILL.md`、Plugin、Hook、CI 配置或 GitHub Actions 工作流。
- 不注册生命周期事件、不调度任务、不创建子进程、不读取或写入文件、不访问网络。
- 不判断真实权限、Hook 信任、CI 密钥、外部动作、报告送达、检查结果或回滚。
- 不证明本书提出的状态名称能映射到任何实际产品。
