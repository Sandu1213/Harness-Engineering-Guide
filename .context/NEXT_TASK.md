# Next Task

47 章与 12 个附录的中文版、GitHub Pages 在线站点、带 PDF/EPUB 附件的 `v0.2.0` Release 均已完成。

## 已完成：Pi Agent 借鉴点增补与 Claude Code 复查

Pi Agent 借鉴点增补已完成。11 个目标章节的正文、front matter、`.references.md`、`.fact-check.md` 与 `.ai/references.md` 分配区已同步；第 10、12 章缺失正文分别补为“会话即树”和“三种安全架构对照”。Claude Code 首轮提出的 13 项修改均已处理，二次只读复查结论为 `PASS`。`npm run validate`、站点构建/链接检查，以及第 10、11、12、23、24、26、36 章的浏览器锚点交互验证均通过。

## 已完成：发布 v0.2.0

`v0.2.0` 标签和 Latest Release 已从提交 `8b43aa6` 发布；Pages、发行归档、Markdown lint 与 link check 工作流均成功。PDF/EPUB 已出现在 Release Assets，独立下载后的摘要、PDF 字体/抽页版面与 EPUBCheck 均通过。

## 可选后续：English 版本与中英文切换

**目标：** 在不分叉中文事实来源和出版清单的前提下，为网站增加 English 内容与明确的语言切换入口。

**起始要求：** 先确定翻译责任、术语表、引用保真规则、路由方案和中英文内容同步策略；选择首页、出版说明、目录和一章正文做最小试点，再决定是否扩展到全书及英文 PDF/EPUB。

**验收：** 语言切换可键盘操作并保留对应页面语义；两种语言的导航、站内链接、搜索和 canonical/hreflang 元数据可验证；中文页面不得因 English 试点回归。

**边界：** English 内容和切换功能尚未实施；不得把机器翻译草稿直接标记为正式版本，也不得在翻译时扩大中文来源允许陈述。
