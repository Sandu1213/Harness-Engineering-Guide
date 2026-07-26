# D010：使用 GitHub Pages 与 GitHub Release 承载出版物

## 背景

本地 VitePress、PDF 与 EPUB 已共享唯一内容清单并完成验证，但尚无与 GitHub 版本对应的在线部署和离线文件归档。仓库已有 GitHub 远端，网站是静态构建。

## 决策

- `main` 更新后使用 GitHub Actions 构建、检查并部署 GitHub Pages。
- GitHub Release 发布后检出其标签提交，重新生成 PDF/EPUB 并上传到对应 Release。
- 工作流不自动创建标签、Release 或决定书稿许可证。

## 原因

GitHub Pages 可直接复用 VitePress 产物；Release 资产按标签保留历史版本。两条路径都使用 `publication/book-manifest.mjs`，不会复制书稿顺序。

## 后果

站点构建接受 `SITE_BASE` 以支持 Pages 子路径；Release 的 Linux runner 使用固定 Pandoc/Typst 版本与 Noto CJK 字体。首次 Pages 启用、版本号、Release 和书稿许可证仍由维护者明确执行。

## 状态

已采纳，2026-07-26。相关文件为 `.github/workflows/deploy-pages.yml`、`.github/workflows/release-publications.yml`、`publication/site-base.mjs` 与 `docs/.vitepress/config.mjs`。
