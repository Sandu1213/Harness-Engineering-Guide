---
title: "第 27 章 Example Plan：候选 Git 变更准入"
chapter: "27"
status: "implemented-and-verified"
updated_at: "2026-07-16"
---

# 第 27 章 Example Plan：候选 Git 变更准入

## 目的与边界

`assessGitChangeAdmission` 是一个纯内存教学函数。它检查调用者传入的 Change Contract 是否具备基线、范围、隔离工作区声明、冲突状态、diff/校验证据和人类审查记录，或是否应转交给集成者。

它**不会**调用 Git、创建或列出 branch/worktree、读取仓库状态或 diff、写文件、调用子进程、访问网络或远端、创建 Pull Request、请求或读取真实审查、提交、合并、回滚、读取权限或改变外部系统。

## 输入契约

| 输入 | 最小字段 | 判断用途 |
| --- | --- | --- |
| Change Contract | `kind`、`changeId`、`baseSnapshot`、`branch`、`worktreePath`。 | 声明一个教学用候选变更及其比较和隔离前提。 |
| 范围声明 | `exclusivePaths`、`changedPaths`、`sharedPaths`、`integrationOwner`。 | 区分局部作者可交付的路径与必须交由集成者的共享路径。 |
| 冲突声明 | `conflictState`。 | 仅接受 `no_reported_conflict`，未知或其他状态一律停止。 |
| 证据声明 | `diffReviewed`、校验的 `status`/`command`、审查的 `status`/`reviewerKind`。 | 检查最小审查输入，不执行或验证其中记录的外部命令。 |

路径只是调用者传入的字符串。函数不将其规范化为真实路径，也不推断目录包含关系、Git tracking、worktree metadata 或文件锁。

## 输出契约

| 状态 | 路由 | 含义 | 不能说明 |
| --- | --- | --- | --- |
| `ready` | `integration_decision` | 注入的教学对象具备局部准入所需声明，可交给集成者作下一步决定。 | 已创建 branch/worktree、已提交、已合并、已发布或真实审查已发生。 |
| `blocked` | `null` | 基线、范围、隔离声明、冲突、diff、校验或人类审查证据不完整。 | 问题已修复、变更被拒绝或 Git 命令执行失败。 |
| `requires_integration` | `integrationOwner` | 专属或实际路径触及声明的共享路径，应由集成者处理。 | 集成者已批准、已写入共享文件或已通过全仓校验。 |
| `not_applicable` | `null` | 输入不是本书定义的 Change Contract。 | 真实请求不重要、无法审查或已被删除。 |

## 红绿记录

先创建测试，再创建模块。2026-07-16 实际运行：

```bash
node --test examples/agent/git-change-admission-assessment.test.mjs
```

模块尚不存在时，Node 以退出码 `1` 结束，错误为 `ERR_MODULE_NOT_FOUND`，缺失目标为 `examples/agent/git-change-admission-assessment.mjs`。这只证明测试先于模块存在。

实现后，使用相同命令实际运行：12 项 Node 内置测试通过、0 项失败。演示命令：

```bash
node examples/agent/git-change-admission-assessment.mjs
```

实际输出为：

```json
{"status":"ready","route":"integration_decision","code":"change_contract_complete","reasons":[],"admittedPaths":["docs/part-04-engineering-practice/27-git-worktree-and-code-review.md"]}
```

此结果只证明函数对这个注入对象作出了确定性判断；其中的基线、branch、worktree 与审查字段是教学字符串或枚举，并非通过 Git 或 GitHub 观察得到的事实。

## 测试矩阵

| 路径 | 输入变化 | 预期状态 | 预期原因或路由 |
| --- | --- | --- | --- |
| 完整教学契约 | 基线、路径、证据、无已报告冲突与人类批准齐全。 | `ready` | `integration_decision`。 |
| 非契约输入 | `kind` 不是 `git_change_admission`。 | `not_applicable` | `git_change_contract_not_provided`。 |
| 基线缺失 | `baseSnapshot` 为空。 | `blocked` | `base_snapshot_missing`。 |
| worktree 声明缺失 | `worktreePath` 为空。 | `blocked` | `worktree_declaration_missing`。 |
| 实际路径触及共享面 | `changedPaths` 含共享状态文件。 | `requires_integration` | `shared_path_requires_integrator`。 |
| 范围越界 | 实际路径不在 `exclusivePaths`。 | `blocked` | `changed_path_outside_exclusive_scope`。 |
| 没有 diff 证据 | `diffReviewed` 为 `false`。 | `blocked` | `diff_evidence_missing`。 |
| 校验失败 | 校验状态不是 `passed`。 | `blocked` | `validation_evidence_missing_or_failed`。 |
| 非人类审查 | `reviewerKind` 为 `agent`。 | `blocked` | `human_review_evidence_missing`。 |
| 请求修改 | 审查状态为 `request_changes`。 | `blocked` | `review_not_approved`。 |
| 冲突未知 | `conflictState` 不是 `no_reported_conflict`。 | `blocked` | `conflict_state_unresolved`。 |
| 共享面误称专属 | `exclusivePaths` 含共享状态文件。 | `requires_integration` | `shared_path_requires_integrator`。 |

## 不覆盖范围

- `worktreePath` 不证明目录存在、已经关联仓库、指向指定 branch，或与其他工作树没有磁盘、配置、凭证或外部资源冲突。
- `diffReviewed` 不读取或解释真实 diff；它不能发现遗漏的文件、二进制变化、依赖变更、机密信息、语义错误或冲突。
- `validation.status` 和 `review.status` 是调用者的教学声明，不是命令、CI、GitHub review 或分支保护的观察结果。
- `ready` 不代表可以自动提交、合并、发布或回滚；这些动作需要在真实环境中重新取得权限、检查规则并独立观察结果。
