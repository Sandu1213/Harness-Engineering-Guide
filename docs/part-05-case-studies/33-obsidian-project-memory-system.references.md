---
title: "第 33 章参考资料：Obsidian 项目记忆系统"
chapter: "33"
status: "registered"
updated_at: "2026-07-16"
---

# 第 33 章参考资料：Obsidian 项目记忆系统

> 本地 `CH33-REF-*` 键用于章节内追溯，已分别映射为 `REF-101` 至 `REF-105`。本地键不代替全局引用登记，也不表示 Obsidian 已在本仓配置或运行。

| 本地键 | 来源 | 类型 | 支持的限定陈述 | 访问日期与状态 | 不能外推 |
| --- | --- | --- | --- | --- | --- |
| CH33-REF-01 | [How Obsidian stores data](https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data) | Obsidian 官方帮助 | 笔记是 vault 中的 Markdown 纯文本文件；vault 为本地文件夹；应用会刷新外部文件变化。 | 2026-07-16：写作日重读；已登记为 `REF-101`。 | 外部编辑无冲突、文件语义正确、任何 Agent 获得访问权，或 vault 已实际打开。 |
| CH33-REF-02 | [Properties](https://help.obsidian.md/Properties) | Obsidian 官方帮助 | Properties 保存结构化数据，位于文件顶部 YAML；同名属性在 vault 中采用同一类型。 | 2026-07-16：写作日重读；已登记为 `REF-102`。 | 本书字段是 Obsidian 强制 schema、属性保证内容正确，或批量迁移已经完成。 |
| CH33-REF-03 | [Internal links](https://help.obsidian.md/Linking+notes+and+files/Internal+links) | Obsidian 官方帮助 | 支持 Wikilink 与 Markdown 内部链接；可在重命名时更新 vault 内链接；Wikilink 可关闭以改用 Markdown 格式。 | 2026-07-16：写作日重读；已登记为 `REF-103`。 | 外部渲染器兼容 Wikilink／块引用、全部关系可自动重写，或链接代表语义正确。 |
| CH33-REF-04 | [Tags](https://help.obsidian.md/tags) | Obsidian 官方帮助 | 标签有助于查找笔记；YAML `tags` 为列表；嵌套标签可支持相关标签的筛选。 | 2026-07-16：Fact Check 重读；此前登记 URL 已重定向至遗留页，改用当前官方地址；已登记为 `REF-104`。 | 标签层级是权威目录、依赖图、权限模型或事实核验。 |
| CH33-REF-05 | [Introduction to Obsidian Sync](https://help.obsidian.md/Obsidian+Sync/Introduction+to+Obsidian+Sync) | Obsidian 官方帮助 | Obsidian Sync 是私有跨设备笔记同步的附加服务；官方提醒同时使用其他云存储时先备份以防同步冲突。 | 2026-07-16：写作日重读；已登记为 `REF-105`。 | 本仓已启用 Sync、协作已授权、冲突会自动解决、已备份，或其他同步渠道的行为一致。 |

## 集成提示

- 共享引用维护者应为以上五项来源分配连续的全局 `REF-*` 编号，并在 `.ai/references.md` 的正式引用表和“第 33 章已分配引用”表中登记相同的受限陈述。
- 建议同步审阅并按需加入术语表的本书模型：项目记忆层（Project Memory Layer）、记忆节点（Memory Node）、链接契约（Link Contract）、生命周期记录（Lifecycle Record）、记忆健康检查（Memory Health Check）和同步边界（Synchronization Boundary）。这些不是 Obsidian 产品术语或配置。
- 后续正文若使用插件、Bases、Graph view、block reference、Obsidian Sync 的协作／版本历史／安全性，或第三方同步渠道，必须在写作当天新增或重读对应官方资料；不得用本表替代该核验。
