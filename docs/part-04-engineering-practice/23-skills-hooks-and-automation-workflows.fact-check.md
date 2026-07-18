---
title: "第 23 章事实核验清单"
chapter: 23
status: "complete_with_dynamic_recheck_required"
updated_at: "2026-07-16"
---

# 第 23 章事实核验清单

## 核验原则

本章把 Codex 的动态产品能力限制在官方资料明确表达的范围内；所有选择表、状态名称、案例分层和示例对象都是本书工程模型。没有将本地测试或仓库配置包装成外部系统已验证的事实。

## 实际核验记录

| 检查项 | 来源或命令 | 实际观察 | 正文处理 |
| --- | --- | --- | --- |
| Skill 工件与激活 | `Build skills` 官方页面，经当前 Codex Manual 读取。 | Manual 说明 Skill 的 `SKILL.md`、`name`/`description`、显式/隐式激活与渐进加载。 | 仅写为 Codex 的当前行为，引用 REF-077。 |
| Hook 事件与匹配 | `Hooks` 官方页面，经当前 Codex Manual 读取。 | Manual 说明多来源匹配 Hook 都会运行，匹配命令 Hook 可并发启动，并列出生命周期事件。 | 只说明 Hook 不能凭直觉假设顺序，引用 REF-078。 |
| Hook 信任与项目层 | `Hooks` 官方页面，经当前 Codex Manual 读取。 | Manual 说明非受管命令 Hook 的审查/信任和项目层受信任限定。 | 不外推为脚本安全、权限或结果验证。 |
| Plugin 打包边界 | `Build plugins` 官方页面，经当前 Codex Manual 读取。 | Manual 说明 `.codex-plugin/plugin.json` 和可包含的 Skill、Hook、MCP 配置等。 | 仅写为 Codex Plugin 分发结构，引用 REF-079。 |
| 本地工作流案例 | `sed` 读取 `.github/workflows/*.yml` 与 `package.json`。 | 两个工作流均监听 `pull_request` 与推送到 `main`；命令与正文一致。 | 仅称为当前仓库配置，不称它们已经运行或保证内容正确。 |
| 示例边界 | Node 测试和实现的直接读取与执行。 | 实现只处理普通对象，没有导入 I/O、网络或子进程模块。 | 说明为纯内存判断。 |

## 陈述与证据映射

| 正文陈述类型 | 证据 | 状态 |
| --- | --- | --- |
| Codex Skill 的产品行为 | REF-077。 | 2026-07-16 已核验；发布时重查。 |
| Codex Hook 的事件、并发、信任与配置边界 | REF-078。 | 2026-07-16 已核验；发布时重查。 |
| Codex Plugin 的分发与 manifest 边界 | REF-079。 | 2026-07-16 已核验；发布时重查。 |
| 四类工件选择表、失败状态和案例建议 | 本书工程扩展。 | 不作为来源事实呈现。 |
| 当前仓库的两条检查工作流 | 仓库内 YAML 与 `package.json`。 | 本地配置事实；不等于运行历史。 |

## 外推禁区

- 不宣称所有 Agent 都使用同样的 Skill 扫描、Hook 事件、Plugin 结构或信任模型。
- 不宣称 Hook 有串行顺序保证，或任意 Hook 脚本安全、可信或已启用。
- 不宣称 Plugin 安装产生权限、连接器访问、跨产品兼容或结果正确性。
- 不宣称 GitHub Actions 已运行、保护了所有分支、阻止了所有错误或可自动发布。
- 不宣称本章函数证明真实 Skill、Hook、Workflow、Automation、调度、权限或外部效果。

## 发布前待复核项

- `TODO(verify)：` 正式出版前重新打开 REF-077 至 REF-079 对应官方页面，更新访问日期、链接与术语。
- `TODO(verify)：` 若正文改为描述某一具体 Codex 版本、Plugin API、Hook 参数或 CI 平台语义，必须读取相应官方原始文档并缩小陈述。
- `TODO(verify)：` 若仓库工作流改变，重读 YAML 与 `package.json`，不要沿用本章的当前配置描述。
