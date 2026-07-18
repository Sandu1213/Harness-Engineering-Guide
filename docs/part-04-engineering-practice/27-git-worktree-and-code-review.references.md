---
title: "第 27 章候选参考资料：Git、Worktree 与代码审查"
chapter: "27"
status: "registered"
updated_at: "2026-07-16"
---

# 第 27 章候选参考资料：Git、Worktree 与代码审查

> 已完成全局映射：`CH27-REF-01` → `REF-087`、`CH27-REF-02` → `REF-088`、`CH27-REF-03` → `REF-089`。本章只使用来源直接支持的 Git/GitHub 行为；Change Contract、Evidence Package、Integration Decision 和所有准入状态均为本书工程模型。

| 本地键 | 正式键 | 来源 | 类型 | 写作日访问 | 允许支持的限定陈述 | 不可外推的范围 |
| --- | --- | --- | --- | --- | --- | --- |
| CH27-REF-01 | REF-087 | [Git：git-worktree](https://git-scm.com/docs/git-worktree) | Git 官方参考 | 2026-07-16 | `git worktree` 管理附着于同一仓库的多个工作树，允许同时检出多个分支；linked worktree 与主工作树共享部分仓库数据，但 `HEAD`、index 等文件按工作树区分。 | 不证明沙箱、权限隔离、文件锁、无冲突并发、环境复制、自动清理、审查完成或任何真实 worktree 已创建。 |
| CH27-REF-02 | REF-088 | [Git：git-diff](https://git-scm.com/docs/git-diff) | Git 官方参考 | 2026-07-16 | `git diff` 可以比较工作树、索引、提交、树对象或磁盘路径；默认与 `--cached` 形式的比较对象由文档明确区分。 | 不把 diff 输出、退出码或文件变化外推为测试、事实、语义、权限、审查或合并正确性。 |
| CH27-REF-03 | REF-089 | [GitHub Docs：About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | GitHub 官方文档 | 2026-07-16 | PR review 状态包括 Comment、Approve、Request changes；管理员可要求合并前有批准，Request changes 是否阻断合并取决于规则设置。 | 不推断任何仓库的规则、计划、权限、CODEOWNERS、CI、merge queue、审查者身份或合并结果。 |

## 使用规则

- `Change Contract`、`Base Snapshot`、`Scope Declaration`、`Evidence Package`、`Integration Decision` 与 `ready`/`blocked` 等状态均是本书教学对象，不是 Git config、Git object、GitHub API 或平台字段。
- 纯内存示例只检查调用者传入的字符串、列表和证据状态；它不调用 Git、不执行命令、不读取文件、不创建 worktree、不访问远端或 GitHub、不创建 PR、不提交、不合并、不回滚。
- 未来修订涉及具体 Git 版本、命令选项、GitHub 规则、审查权限或平台界面时，必须在修订当日重新读取相应官方资料；本章资料不能代替环境验证。

## 候选资料完成检查

- [x] 每条资料均记录固定 URL、来源类型、访问日期、允许用途与外推禁区。
- [x] 已完成本地键到 `.ai/references.md` 正式编号的映射。
- [x] 未用来源替代本章工程模型，也未把平台行为写成真实执行证据。
