---
title: "第 23 章候选参考资料"
chapter: 23
status: "registered"
updated_at: "2026-07-16"
---

# 第 23 章候选参考资料

本章已登记至全书引用表：CH23-001 → REF-077、CH23-002 → REF-078、CH23-003 → REF-079。正式正文只使用 REF 键；本表保留原始访问日与外推禁区。

| 正式 ID | 来源 | 访问与核验 | 支持的限定陈述 | 外推禁区 |
| --- | --- | --- | --- | --- |
| REF-077 | [OpenAI Codex：Build skills](https://learn.chatgpt.com/docs/build-skills.md) | 2026-07-16 通过当日刷新且状态为 current 的 Codex Manual 读取相关章节。 | Codex Skill 的 `SKILL.md`、`name`/`description`、显式或隐式激活、渐进加载、作者位置和可选资源。 | 不支持其他 Agent 的相同行为、任何权限、成功率或安全保证。 |
| REF-078 | [OpenAI Codex：Hooks](https://learn.chatgpt.com/docs/hooks.md) | 2026-07-16 通过当日刷新且状态为 current 的 Codex Manual 读取相关章节。 | Codex Hook 的事件、多个匹配命令 Hook 的并发、非受管 Hook 信任审查、项目层信任与配置位置。 | 不支持 Hook 顺序、脚本安全、任意外部授权或跨产品实现。 |
| REF-079 | [OpenAI Codex：Build plugins](https://learn.chatgpt.com/docs/build-plugins) | 2026-07-16 通过当日刷新且状态为 current 的 Codex Manual 读取相关章节。 | `.codex-plugin/plugin.json` 入口和 Plugin 可打包 Skill、Hook、MCP 配置、应用映射与资产。 | 不支持插件已安装、启用、被信任、拥有权限或可以跨产品运行。 |

## 本地配置证据

下列文件是本章案例的仓库内一手证据，不应作为外部产品功能的引用：

- `.github/workflows/markdown-lint.yml`：当前配置在 `pull_request` 与推送到 `main` 时运行 `npm run lint:md` 和 `npm run test:harness`。
- `.github/workflows/link-check.yml`：当前配置在相同事件下运行 `npm run check:links`。
- `package.json`：记录上述命令的当前脚本定义。

这些文件只能支持“本仓库当前写了什么配置”，不能证明 GitHub Actions 已运行、访问权限有效、所有分支受保护或内容正确。

## 发布前复核规则

- 正文出现 Codex、Skill、Hook、Plugin、事件、信任、位置或配置行为时，必须重新访问对应官方资料。
- 资料不可访问、用词变化或与当前正文不一致时，用 `TODO(verify)` 标记并停止扩大陈述。
- 不引用本地演示或测试来证明远程服务、真实 Hook、自动化、调度、权限或外部效果。
