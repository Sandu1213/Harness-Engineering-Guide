---
title: "第 21 章示例实现记录：项目 Harness 可移植性评估"
chapter: "21"
status: "implemented"
updated_at: "2026-07-16"
---

# 第 21 章示例实现记录：项目 Harness 可移植性评估

## 目的与边界

`assessProjectHarnessPortability` 对调用者注入的共享仓库契约和产品适配声明进行确定性分类。它检查规则读取顺序、任务状态、交接下一步、验证契约、适配来源日期、上下文/强制执行边界和权限边界声明。

它不会读取真实 `AGENTS.md`、`CLAUDE.md`、`.codex/`、`.claude/`、工作目录、环境变量、账户、网络、设置、自动记忆或 Tool；它不安装、配置、启动或验证 Codex、Claude Code 或任何其他 Agent。

因此 `portable` 只表示本书定义的输入对象具备最小共享契约和适配边界，不表示真实产品已经接入、读取规则、取得权限、调用工具或完成任务。

## 接口与判定顺序

| 顺序 | 条件 | 返回 | 不代表什么 |
| --- | --- | --- | --- |
| 1 | 规则读取顺序、任务状态、交接下一步或验证契约缺失 | `needs_shared_context` | 产品无法工作。 |
| 2 | 产品标识、指令入口或官方来源日期缺失 | `needs_adapter_evidence` | 产品资料一定错误。 |
| 3 | 适配声明把上下文规则说成强制执行 | `needs_boundary_review` | 真实产品的技术控制已经被否定。 |
| 4 | 权限边界未单独声明 | `needs_adapter_evidence` | 当前用户没有权限。 |
| 5 | 上述最低字段齐备 | `portable` | 真实产品已读取文件、已执行命令或已经完成交接。 |

## 红绿验证

先只创建测试并运行：

```bash
node --test examples/agent/project-harness-portability-assessment.test.mjs
```

实际红灯为 `ERR_MODULE_NOT_FOUND`，因为目标模块尚未创建。这只证明测试先于实现存在；它不表示任何产品、配置或项目状态失败。

实现后执行：

```bash
node --test examples/agent/project-harness-portability-assessment.test.mjs
node examples/agent/project-harness-portability-assessment.mjs
```

实际绿色结果和演示输出记录在[示例整合审查](../../.memory/reviews/2026-07-16-chapter-21-example-integration.md)。

## 测试矩阵

| 路径 | 预期 | 不能证明 |
| --- | --- | --- |
| Codex 与 Claude Code 两个标签使用同一共享对象 | 两次均为 `portable` | 两种产品真实发现或加载相同文件。 |
| 任务状态缺失 | `needs_shared_context` | 真实状态文件缺失。 |
| 产品来源日期缺失 | `needs_adapter_evidence` | 官方资料不可用。 |
| 上下文被标为强制执行 | `needs_boundary_review` | 任一产品没有技术控制。 |
| 权限边界未声明 | `needs_adapter_evidence` | 真实账户权限不足。 |
| 返回对象 | 不包含 I/O 或账户字段 | 运行时没有其他副作用。 |

## 完成检查

- [x] 测试先于实现运行并留下真实缺模块结果。
- [x] 实现只使用 Node.js 内置能力与纯内存对象。
- [x] 未新增共享 npm 命令；主线程决定是否把本章专用命令接入总校验。
