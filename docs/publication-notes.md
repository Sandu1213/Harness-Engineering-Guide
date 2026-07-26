---
title: 出版说明
description: 网站、PDF 与 EPUB 的内容边界和构建说明
---

# 出版说明

本网站、PDF 与 EPUB 均由同一套 Markdown 书稿生成，正文范围固定为 47 章与 12 个附录。网站提供全文导航、本地搜索、图示、示例与模板；PDF 和 EPUB 提供离线阅读版本。

## 在线阅读与离线版本

仓库使用 GitHub Pages 托管本网站：`main` 分支更新后，部署工作流会重新构建并检查全部站内链接，再发布至 [Harness Engineering 在线站点](https://sandu1213.github.io/Harness-Engineering-Guide/)。

每次 GitHub Release 发布后，发行工作流会从该 Release 的标签提交重新生成 `harness-engineering-guide.pdf` 与 `harness-engineering-guide.epub`，完成基础文件校验后附加到对应 Release。发布完成后，读者可从[仓库 Releases 页面](https://github.com/Sandu1213/Harness-Engineering-Guide/releases)下载离线版本。

## Repository assets

正文中的部分链接指向 `.ai/`、`.context/`、`.memory/`、`AGENTS.md` 等仓库级编辑工件。它们用于展示 Book Factory 如何维护研究、审查、进度与交接，不属于面向读者的网站发布包，因此网站统一把这些链接引导到本说明页。

图示、示例代码与通用模板会随网站构建复制，仍可从正文直接访问。完整仓库工件应从本书源码仓库读取，并以仓库中的最新规则和状态为准。

## 发布边界

自动化工作流负责网站部署和 Release 资产附加，但不会自行创建版本标签、GitHub Release 或决定书稿发布许可证。只有部署工作流成功且 Release 页面实际出现对应文件，才表示外部发布完成；本地生成成功不等于已经对外发布。
