---
title: "第 33 章事实核验：Obsidian 项目记忆系统"
chapter: "33"
status: "completed"
updated_at: "2026-07-16"
---

# 第 33 章事实核验：Obsidian 项目记忆系统

## 可归因陈述

| 编号 | 正文中的陈述 | 来源与核验范围 | 核验结论 |
| --- | --- | --- | --- |
| FC-01 | Obsidian 将笔记保存为 vault 中的 Markdown 纯文本文件；vault 是本地文件系统中的文件夹，应用会刷新外部变化。 | REF-101，2026-07-16 重读 Obsidian 官方 *How Obsidian stores data*。 | 可作为本章讨论文件与目录归属的产品背景；不证明外部编辑无冲突、文件语义正确、vault 已打开，或任何 Agent 已获访问权。 |
| FC-02 | Obsidian Properties 保存文本、链接、日期等结构化数据，存于文件顶部的 YAML；同名属性在同一 vault 中使用同一类型。 | REF-102，2026-07-16 重读 Obsidian 官方 *Properties*。 | 可作为以 YAML 表达字段和类型一致性语境的背景；本书的 `id`、`status`、`owner`、`reviewed_at` 与生命周期枚举不是产品强制 schema，也不因出现属性而变成正确结论。 |
| FC-03 | Obsidian 支持 Wikilink 与 Markdown 内部链接，并可在重命名时更新 vault 内部链接；可关闭默认 Wikilink 格式以使用 Markdown 链接。 | REF-103，2026-07-16 重读 Obsidian 官方 *Internal links*。 | 可用于区分 Obsidian 特定链接与项目可移植的相对 Markdown 链接；不保证外部渲染器、附件、Git 历史、块引用或人工语义关系随重命名保持正确。 |
| FC-04 | Obsidian 标签用于查找笔记；YAML 的 `tags` 是列表，嵌套标签有助于查找和筛选相关标签。 | REF-104，2026-07-16 通过 Obsidian 官方当前标签页 `https://help.obsidian.md/tags` 重读。 | 可作为标签检索背景；标签不构成权威目录、关系图、权限模型或事实核验。已登记的旧路径在本次访问中进入遗留入口，正式引用维护者应在后续共享整合时把它更新为当前页面。 |
| FC-05 | Obsidian Sync 是私有跨设备同步笔记的附加服务；与其他云存储并用时，官方建议先备份以避免同步冲突。 | REF-105，2026-07-16 重读 Obsidian 官方 *Introduction to Obsidian Sync*。 | 可作为同步风险和备份责任的产品背景；不证明本仓已启用 Sync、已备份、已授权协作、冲突可自动解决或其他同步渠道有相同行为。 |

CH33-REF-01 至 CH33-REF-05 分别映射 REF-101 至 REF-105。上述映射只支持本表中的有限陈述。

## 本书工程模型，不归因来源

| 编号 | 工程模型 | 写作限制 |
| --- | --- | --- |
| EM-01 | 项目记忆层（Project Memory Layer）、记忆节点（Memory Node）、链接契约（Link Contract）与生命周期记录（Lifecycle Record）。 | 是本书为可定位、可追溯和可交接材料提出的模型，不称为 Obsidian 的预置数据模型、目录规范或插件功能。 |
| EM-02 | `collected`、`under_review`、`stable`、`superseded`、`archived` 与 `pending_removal`，以及字段缺口的保守路由。 | 是教学状态和判断规则；不触发文件迁移、删除、通知、审批或事实确认。 |
| EM-03 | 记忆健康检查（Memory Health Check）的 `ready_for_followup`、`needs_evidence`、`needs_review` 与 `requires_approval` 路由。 | 只判断注入教学对象的结构；不扫描真实 vault、验证来源权威性、检查链接可访问性或授予读取、写入与同步权限。 |
| EM-04 | 同步边界（Synchronization Boundary）、冲突停止条件、备份责任和人工升级出口。 | 是协作前的工程记录，不是 Obsidian Sync、云盘、Git 或任何账户的配置或执行证据。 |
| EM-05 | 虚构的“第 31 章登录测试证据”记忆网、其中的章节节点和审查节点。 | 是教学输入，不代表本仓、Obsidian、测试、浏览器、账户、同步、备份或外部系统已被读取、写入或运行。 |

## 实际运行核验

| 编号 | 命令 | 实际结果 | 支持的有限结论 |
| --- | --- | --- |
| FC-06 | `node --test examples/agent/project-memory-health.test.mjs` | 7 项通过、0 项失败。 | 纯函数在测试构造的记忆图上覆盖完整图、来源缺口、基础字段缺口、悬空关系、过期复核、未声明同步边界和外部执行请求的分类。 |
| FC-07 | `node examples/agent/project-memory-health.mjs` | 输出 `ready_for_followup`、`project_memory_graph_ready`、`implement_in_isolated_example` 与 `executionPerformed: false`。 | 演示只显示教学对象可在受限范围内继续；未读取或修改 vault、笔记、文件、网络、账户、同步服务或其他外部系统。 |

## 仍需谨慎之处

- Obsidian 帮助页、链接格式、属性类型、同步功能和插件生态会变化；后续改写产品行为时应在写作当日重新核验官方页面。
- REF-104 的登记 URL `https://help.obsidian.md/Editing+and+formatting/Tags` 在本次请求中先返回 301，再落到遗留的同路径页面；该页面未提供标签正文。当前可读的官方页面为 `https://help.obsidian.md/tags`。本轮不改共享引用登记，后续维护应修正该目标。
- 未运行 Obsidian、Obsidian Sync、Git、云盘、网络、账户、设备、插件、备份、冲突处理、真实 vault 扫描、文件读写或跨工具链接迁移。
- 测试和演示不验证真实项目记忆的正确性、新鲜度、来源权威性、链接可访问性、权限、协作一致性、冲突处理、数据保留、安全性或恢复能力。
