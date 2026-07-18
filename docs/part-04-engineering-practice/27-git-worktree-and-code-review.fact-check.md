---
title: "第 27 章 Fact Check：Git、Worktree 与代码审查"
chapter: "27"
status: "completed"
updated_at: "2026-07-16"
---

# 第 27 章 Fact Check：Git、Worktree 与代码审查

## 来源级核验

| 本地键 | 2026-07-16 实际读取的来源 | 正文允许陈述 | 核验结论与外推禁区 |
| --- | --- | --- | --- |
| CH27-REF-01 | [Git：git-worktree](https://git-scm.com/docs/git-worktree) | Git 文档将 `git worktree` 描述为管理附着于同一仓库的多个工作树，可同时检出多个分支；linked worktree 中 `HEAD`、index 等按工作树区分。 | 正文不把它写成容器、安全沙箱、文件锁、无冲突并发、权限分离或真实 worktree 创建证据；共享配置和 refs 等细节也不能凭“独立目录”忽略。 |
| CH27-REF-02 | [Git：git-diff](https://git-scm.com/docs/git-diff) | Git 文档区分工作树、索引、提交、树对象与磁盘路径的比较；默认 `git diff` 与 `git diff --cached` 有不同比较对象。 | 正文不把任何 diff 输出当作测试通过、事实核验、语义正确、人工审查、权限批准或可合并结论。 |
| CH27-REF-03 | [GitHub Docs：About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | GitHub PR review 有 Comment、Approve、Request changes 三种状态；管理员可要求批准，且 Request changes 的阻断效果依赖规则配置。 | 正文不假定当前仓库或任何组织使用 GitHub、启用了规则、具备特定审查人数、权限、检查、CODEOWNERS 或 merge queue。 |

## 本书模型核验

| 陈述 | 分类 | 核验方式 | 结论 |
| --- | --- | --- | --- |
| Change Contract 需包含基线、范围、隔离声明、冲突、验证和审查证据。 | 本书工程模型。 | 正文、图示、Example Plan 与测试矩阵均对照同一字段。 | 不是 Git/GitHub schema，也不是自动合并策略。 |
| `changedPaths` 触及共享路径时应交由集成者。 | 本书工程模型。 | 测试精确断言 `requires_integration` 与 `shared_path_requires_integrator`。 | 不会检测真实文件、目录重叠、语义依赖或权限。 |
| 没有已批准的人类审查、校验或 diff 记录时阻塞局部准入。 | 本书工程模型。 | 测试分别断言 `human_review_evidence_missing`、`validation_evidence_missing_or_failed` 与 `diff_evidence_missing`。 | 不代表任何真实审查系统、CI、命令或分支规则被调用。 |
| `ready` 只表示教学包可交给 `integration_decision`。 | 本书工程模型。 | 演示输出与正文、图示的终点一致。 | 不代表 commit、PR、merge、发布、回滚或外部效果。 |

## 实际执行核验

| 项目 | 命令或方法 | 实际结果 | 有限结论 |
| --- | --- | --- | --- |
| 红灯 | `node --test examples/agent/git-change-admission-assessment.test.mjs`（模块创建前）。 | 退出码 `1`，`ERR_MODULE_NOT_FOUND`。 | 测试先于模块存在。 |
| 纯函数测试 | `node --test examples/agent/git-change-admission-assessment.test.mjs`。 | 12 项通过、0 项失败。 | 仅证明注入 Change Contract 的确定性路由。 |
| 演示 | `node examples/agent/git-change-admission-assessment.mjs`。 | 输出 `ready` / `integration_decision`。 | 不证明真实 Git、worktree、diff、审查或合并发生。 |
| 图示 | Mermaid CLI 导出 SVG/PNG，并人工查看 PNG。 | 见 Diagram Review。 | 图只表达本书证据流。 |

## 尚未声称的事实

- 本章没有创建、列出、移动、删除或修复真实 Git worktree，也没有切换分支、读取仓库、查看 diff、暂存、提交、推送、拉取、合并或回滚。
- 本章没有访问 GitHub 或其他代码托管服务的仓库、PR、审查、规则、权限、CI、checks、CODEOWNERS、merge queue、通知或审计记录。
- 本章没有验证实际 Git 版本、worktree 共享配置、文件锁、操作系统隔离、凭证、网络、冲突解析、分支保护或人类审批。
- 正式引用编号、词表、目录、npm 入口、项目状态和全仓校验由主线程统一更新；本地完成记录不能替代这些工作。
