# Release Plan

## 发布原则

Markdown 是唯一源；GitHub、Obsidian、VitePress、PDF 和 EPUB 是不同呈现层，不应分叉维护正文。

## 预发布检查

1. 所有计划章节达到 `完成` 或明确列为后续版本。
2. 运行 Markdown、链接、示例和图示校验。
3. 核对引用、图片许可证、第三方代码许可证和署名。
4. 由技术审查与语言审查共同确认目录、术语和交叉引用。
5. 生成发布说明，列出已验证范围和已知限制。

## 渠道计划

- GitHub：默认阅读与协作入口。
- Obsidian：直接打开 Markdown 与 Mermaid 源码。
- VitePress：`main` 更新后由 `.github/workflows/deploy-pages.yml` 构建、检查并部署 GitHub Pages；首次发布需启用 Pages，并确认 private 仓库的账户计划与站点可见性。
- PDF/EPUB：GitHub Release 发布后由 `.github/workflows/release-publications.yml` 从对应标签提交重新生成、校验并上传到该 Release。

工作流不会创建标签、Release 或许可证决定。正式发布必须以 Pages deployment environment 的实际 URL 和 Release 页面中的实际附件为验收证据。

## 版本策略

采用语义化发布意图：`0.x` 为内容和结构快速演进，`1.0` 表示首版书稿完成。具体标签和发布授权需在发布阶段由维护者确认。
