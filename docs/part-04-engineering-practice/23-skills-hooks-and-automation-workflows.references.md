---
title: "第 23 章候选参考资料"
chapter: 23
status: "registered"
updated_at: "2026-07-26"
---

# 第 23 章候选参考资料

本章已登记至全书引用表：CH23-001 → REF-077、CH23-002 → REF-078、CH23-003 → REF-079。正式正文只使用 REF 键；本表保留原始访问日与外推禁区。

| 正式 ID | 来源 | 访问与核验 | 支持的限定陈述 | 外推禁区 |
| --- | --- | --- | --- | --- |
| REF-077 | [OpenAI Codex：Build skills](https://learn.chatgpt.com/docs/build-skills.md) | 2026-07-16 通过当日刷新且状态为 current 的 Codex Manual 读取相关章节。 | Codex Skill 的 `SKILL.md`、`name`/`description`、显式或隐式激活、渐进加载、作者位置和可选资源。 | 不支持其他 Agent 的相同行为、任何权限、成功率或安全保证。 |
| REF-078 | [OpenAI Codex：Hooks](https://learn.chatgpt.com/docs/hooks.md) | 2026-07-16 通过当日刷新且状态为 current 的 Codex Manual 读取相关章节。 | Codex Hook 的事件、多个匹配命令 Hook 的并发、非受管 Hook 信任审查、项目层信任与配置位置。 | 不支持 Hook 顺序、脚本安全、任意外部授权或跨产品实现。 |
| REF-079 | [OpenAI Codex：Build plugins](https://learn.chatgpt.com/docs/build-plugins) | 2026-07-16 通过当日刷新且状态为 current 的 Codex Manual 读取相关章节。 | `.codex-plugin/plugin.json` 入口和 Plugin 可打包 Skill、Hook、MCP 配置、应用映射与资产。 | 不支持插件已安装、启用、被信任、拥有权限或可以跨产品运行。 |
| REF-148 | [pi 仓库 README（badlogic/pi-mono，现迁移至 earendil-works/pi）](https://github.com/earendil-works/pi) | 2026-07-26 通读 README。 | pi 是 Mario Zechner 开发的开源极简编码代理（MIT 协议，仓库现位于 earendil-works/pi）；packages 机制可打包分发 extensions、skills、提示词模板与主题（npm: 或 git: 来源）。 | 不支持 GitHub stars、下载量等动态数字；不支持其他 Agent 的相同机制；不支持任何评测名次。 |
| REF-151 | [Ronacher, Armin. Pi: The Minimal Agent Within OpenClaw（2026-01-31）](https://lucumr.pocoo.org/2026/1/31/pi/) | 2026-07-26 通读原文。 | Armin Ronacher 的个人观察：用户不是下载现成扩展，而是让代理给自己写一个。 | 观点必须归属 Ronacher 本人，不得写成行业事实；不展开 OpenClaw 细节（至多定性“社区项目 OpenClaw 构建在 pi 之上”）。 |
| REF-152 | [pi 官方文档：extensions / sessions / compaction（packages/coding-agent/docs）](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs) | 2026-07-26 通读 extensions 相关文档。 | pi 扩展为进程内 TypeScript 模块（jiti 加载免编译、目录自动发现、`/reload` 热重载）；扩展 API 含生命周期事件（拦截 `tool_call`、经 `session_before_compact` 接管压缩）、自定义工具/命令/快捷键/标志/provider 注册与 UI 面；扩展状态经 `appendEntry` 持久化进会话文件；文档首行原话 “pi can create extensions. Ask it to build one for your use case.”；packages 机制的打包范围。 | 实现细节随版本变化，只能以访问日（2026-07-26）文档为准；不支持默认值、命令与包结构在未来版本不变；不支持其他产品具有相同扩展模型。 |

## 本地配置证据

下列文件是本章案例的仓库内一手证据，不应作为外部产品功能的引用：

- `.github/workflows/markdown-lint.yml`：当前配置在 `pull_request` 与推送到 `main` 时运行 `npm run lint:md` 和 `npm run test:harness`。
- `.github/workflows/link-check.yml`：当前配置在相同事件下运行 `npm run check:links`。
- `package.json`：记录上述命令的当前脚本定义。

这些文件只能支持“本仓库当前写了什么配置”，不能证明 GitHub Actions 已运行、访问权限有效、所有分支受保护或内容正确。

## 发布前复核规则

- 已于 2026-07-26 通读 REF-148、REF-151、REF-152，确认“自我扩展的 harness”小节的 pi 事实、引语与归属均在上表限定范围内；发布前若引用 pi 的扩展机制、命令或包结构，须重新访问访问日文档。
- 正文出现 Codex、Skill、Hook、Plugin、事件、信任、位置或配置行为时，必须重新访问对应官方资料。
- 资料不可访问、用词变化或与当前正文不一致时，用 `TODO(verify)` 标记并停止扩大陈述。
- 不引用本地演示或测试来证明远程服务、真实 Hook、自动化、调度、权限或外部效果。
