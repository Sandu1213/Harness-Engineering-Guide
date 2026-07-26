# Next Task

47 章与 12 个附录的内容生产、专属终审、共享状态同步、最终全仓 Validation、完成审计、网站/PDF/EPUB 本地构建，以及 GitHub Pages/Release 自动化均已完成。当前没有未完成的内容生产或本地出版构建任务。

## 可选后续：正式发行

**触发条件：** 只有用户明确授权 Git 提交与推送，并指定首个版本号和书稿许可证后，才执行外部发布。

**起始要求：** 推送当前发布配置后，先确认当前账户计划支持 private 仓库 Pages，再在 GitHub Settings → Pages 把 Source 设为 GitHub Actions，确认 `Deploy reading site` 成功并记录实际 URL；随后创建版本标签与 GitHub Release，确认 PDF/EPUB 出现在对应 Release，再记录许可证、回滚方式和最终验收证据。

**边界：** 当前没有执行 Git 提交或推送，没有启用 Pages、创建版本标签或 Release，也没有决定书稿许可证。工作流和本地产物通过不等于外部发布完成。
