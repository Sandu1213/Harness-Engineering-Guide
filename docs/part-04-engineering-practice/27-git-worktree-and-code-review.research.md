---
title: "第 27 章 Research Brief：Git、Worktree 与代码审查"
chapter: "27"
status: "completed"
updated_at: "2026-07-16"
references:
  - "CH27-REF-01"
  - "CH27-REF-02"
  - "CH27-REF-03"
---

# 第 27 章 Research Brief：Git、Worktree 与代码审查

## 要解决的工程问题

Agent 能写出一组文件，不等于这组文件已经可以进入主线。若没有明确的比较基线、受限的变更范围、隔离的工作区声明、可复查的校验证据和人类审查结论，所谓“已完成”只是一段难以复现的描述。本章研究如何把一次候选变更写成可判断的变更契约（Change Contract），让集成者能决定继续审查、补证、退回或合并。

目标不是教读者无条件运行 Git 命令，而是让读者知道：版本控制的隔离、差异比较与代码审查各自提供什么证据，又没有提供什么保证。尤其在 Agent 协作中，不能把“在另一个目录工作”“存在 diff”或“出现 Approved 标签”误说成语义正确、已发布或安全可回滚。

## 研究问题

1. `git worktree` 能直接支持哪些隔离相关的事实？它在哪些元数据与配置面仍然共享？
2. `git diff` 的比较对象为何必须写清，才能把“看过变化”变成可复查证据？
3. GitHub Pull Request（PR）审查的 Comment、Approve 和 Request changes 分别意味着什么，哪些规则决定其是否阻止合并？
4. 如何把基线、路径范围、验证、冲突声明与人工审查装入一个教学用 Change Contract，而不把它伪装成 Git 或 GitHub 的数据结构？
5. 一个纯内存示例如何阻止范围越界或缺失审查证据，同时不创建 worktree、读取仓库、执行子进程或访问审查系统？

## 已核验的来源事实

| 本地键 | 写作日实际读取的来源 | 允许写入正文的限定陈述 | 不可写入正文的扩展 |
| --- | --- | --- | --- |
| CH27-REF-01 | [Git：git-worktree](https://git-scm.com/docs/git-worktree) | Git 将 `git worktree` 定义为管理附着于同一仓库的多个工作树；文档说明可以同时检出多个分支，linked worktree 与主工作树之间既有共享数据，也有如 `HEAD`、index 等按工作树区分的文件。 | 不将其写成进程隔离、权限隔离、文件锁、无冲突协作、环境复制、审查通过或自动回滚保证。 |
| CH27-REF-02 | [Git：git-diff](https://git-scm.com/docs/git-diff) | Git 文档说明 `git diff` 可以比较工作树、索引、树对象、提交或磁盘路径；默认形式展示工作树相对索引的未暂存变化，`--cached` 展示索引相对某个提交的暂存变化。 | 不把 diff 存在、退出码或文件差异写成测试通过、语义正确、审查完成或可安全合并。 |
| CH27-REF-03 | [GitHub Docs：About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | GitHub 的 PR review 有 Comment、Approve、Request changes 三种状态；页面还说明管理员可以要求合并前获得批准，且 Request changes 是否实际阻止合并取决于仓库规则配置。 | 不推断本仓库、任意 GitHub 计划、任意分支保护、CODEOWNERS、CI、权限或合并队列的实际设置。 |

## 本书工程模型

下表的名词是本书对候选变更的审查模型，不是 Git 命令参数、Git 对象格式或 GitHub API：

| 工件 | 作用 | 最小字段 | 不表示 |
| --- | --- | --- | --- |
| 变更契约（Change Contract） | 让一组候选修改可被领取、比较和审查。 | 变更标识、基线声明、分支声明、worktree 声明、专属路径、共享路径、校验与审查证据。 | 工作树已创建、分支存在、提交已产生。 |
| 基线声明（Base Snapshot） | 指明应比较哪个教学基线。 | 可引用的基线标签或提交标识。 | 标签就是可访问的真实 Git commit，或基线仍然最新。 |
| 范围声明（Scope Declaration） | 指明局部作者可以修改的路径与应交给集成者的共享路径。 | `exclusivePaths`、`changedPaths`、`sharedPaths`。 | 路径已经锁定，或不同路径没有语义依赖。 |
| 证据包（Evidence Package） | 交给人类审查者的 diff、校验命令与结论。 | diff 已审阅声明、命令、状态、未覆盖范围。 | 命令真的在当前环境运行、任何外部状态已观察。 |
| 集成决定（Integration Decision） | 由有权责任人决定接受、退回、补证或合并。 | 审查结论、冲突说明、决定者。 | 自动 merge、发布或回滚。 |

## 章节范围与相邻边界

| 章节 | 本章借用的前置 | 本章不替代的责任 |
| --- | --- | --- |
| 第 10 章 | 状态、检查点、恢复和效果未知。 | 不实现工作流恢复或副作用幂等。 |
| 第 12、14 章 | 环境权限、审批和人类控制。 | 不授予 Git、远端或平台权限。 |
| 第 17、18 章 | 评估证据、失败路由与恢复边界。 | 不把 diff 或审查状态当作结果正确性。 |
| 第 23 章 | Hook、自动化检查和失败可见性。 | 不创建 Git Hook、CI 或 PR automation。 |
| 第 26 章 | Task Contract、专属路径、交付包和集成门。 | 不重新定义多 Agent 调度或文件竞争处理。 |
| 第 42 章 | 版本化、回滚与 A/B 测试。 | 不声称本章示例可实施回滚。 |

## 计划图示与示例

- **图示：** `chapter-27-git-change-admission.mmd`。图从 Change Contract 出发，经范围与基线检查、隔离工作区声明、差异与验证证据、人工审查，再到集成决定或停止。箭头仅表示本书的证据流，不表示真实 Git、worktree、PR、CI 或 merge 已执行。
- **示例：** `assessGitChangeAdmission`。输入是调用者注入的教学 Change Contract；输出为 `ready`、`blocked`、`requires_integration` 或 `not_applicable`。它将在模块缺失时先产生实际 `ERR_MODULE_NOT_FOUND` 红灯，然后以 Node 内置测试验证确定性判断。

## 风险、停止条件与事实核验

- 基线、分支或 worktree 只要没有被明确声明，就不能把局部差异描述成可审查变更；停止并要求补齐 Change Contract。
- 若 `changedPaths` 触及 `sharedPaths`，或超出专属路径声明，局部作者不得继续把结果当作可集成产物；交给集成者决定拆分、串行或扩大审查范围。
- 若校验失败、没有命令、没有 diff 审阅记录、冲突状态未知，或人类审查未批准，停止变更准入；不得用 Agent 自评代替人类审查证据。
- `git worktree`、`git diff` 与 GitHub review 的具体行为均须在后续修订日重读 CH27-REF-01 至 CH27-REF-03。特别是仓库规则、权限、平台界面和 Git 版本不可由本 Brief 推断。

## 阶段门

| 阶段 | 可验收输出 | 进入下一阶段的条件 |
| --- | --- | --- |
| Research | 本 Brief、候选来源及外推禁区。 | Git/GitHub 事实与本书模型分离。 |
| Outline | 小节、案例、图示、示例与前后章节边界。 | 每一节回答一个变更控制问题。 |
| Draft | 原创正文、图文与本地引用键。 | 未把声明写成真实 Git 或 PR 操作。 |
| Example | 红灯、纯内存模块、测试与演示。 | 测试只断言教学对象的输出。 |
| Review | 技术、事实、图示、语言与终审记录。 | 术语、证据、图示和代码边界一致。 |
