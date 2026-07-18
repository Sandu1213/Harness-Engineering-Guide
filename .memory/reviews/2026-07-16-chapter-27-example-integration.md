---
title: "第 27 章 Example Integration Review：候选 Git 变更准入"
chapter: "27"
review: "example-integration"
status: "completed"
updated_at: "2026-07-16"
---

# 第 27 章 Example Integration Review：候选 Git 变更准入

## 审查范围

- `examples/agent/git-change-admission-assessment.mjs`。
- `examples/agent/git-change-admission-assessment.test.mjs`。
- 正文、Example Plan 与 Fact Check 对示例的描述。

## 红绿证据

先创建测试后，实际执行：

```bash
node --test examples/agent/git-change-admission-assessment.test.mjs
```

模块缺失时命令以退出码 `1` 结束，错误为 `ERR_MODULE_NOT_FOUND`。随后创建模块并再次执行同一命令，12 项 Node 内置测试通过、0 项失败。再执行：

```bash
node examples/agent/git-change-admission-assessment.mjs
```

实际演示输出 `ready` / `integration_decision` / `change_contract_complete`，以及一个教学路径字符串。

## 结论

- 测试分别覆盖完整契约、非契约输入、缺基线、缺 worktree 声明、共享路径、范围越界、diff 缺失、校验失败、非人类审查、请求修改、冲突未知和共享路径误称专属。
- 断言检查可观察的 `status`、`route`、`code` 或特定原因，不依赖内部 helper 调用次数。
- 模块不导入 Git、文件、子进程、网络或平台 SDK；路径、基线、branch、校验与审查值均为输入对象中的教学数据。

## 未覆盖范围

模块没有检测真实 worktree、分支、diff、冲突、审查、规则、权限、CI、commit、merge 或回滚。`ready` 只表示本书教学字段齐全，可交给集成决定。
