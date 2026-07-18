---
title: "第 34 章 Fact Check"
chapter: "34"
stage: "Fact Check"
status: "completed"
updated_at: "2026-07-16"
---

# 第 34 章 Fact Check

## 范围

- 逐项重读正文引用的 REF-024、REF-106、REF-108 与 REF-109；结果、可归因范围和不可外推范围写入 `34-team-skill-library.fact-check.md`。
- 尝试重读 REF-107 的 Anthropic overview，但当前读取路径未取得可核验正文；不将其旧研究记录当作本轮重新确认的来源。
- 核验正文不把 Skill 目录格式、Codex 的发现位置、Anthropic 的企业治理建议或 SemVer 类比写成跨产品发现、运行时授权、实际部署、安全认证或外部效果。

## 正文修订

- 将“Anthropic overview 已确认目录形态与未知来源审计”的表述替换为 REF-108 可直接支持的企业指南限定：第三方或内部贡献的 Skill 在部署前须审查，且不受信任来源的安装应按生产软件同等严格对待。
- 从正文的引用元数据和延伸阅读移除 REF-107，并新增 Fact Check 链接及独立的事实核验完成项；Research Brief 与参考资料保留该来源的既有追溯记录，但不构成本轮核验结论。

## 结论与边界

- REF-024 只支持 Skill 目录、frontmatter 和按需资源的格式背景；REF-106 只支持 Codex 产品中的发现、描述与直接 Skill／plugin 分发边界；REF-108 只支持企业部署前审查、评估与生命周期治理建议；REF-109 只支持先声明 public API 的版本语义。
- Skill Registry Record、Skill Contract、Admission Review、Quality Tier、Compatibility Declaration、Feedback Record、Deprecation Record、教学状态和三个候选均明确为本书模型或虚构输入。
- 未运行真实 Skill／plugin、产品 API、网络、MCP、浏览器、文件、凭证、组织系统、生产评估、迁移或弃用动作；未运行示例或全仓 `npm run validate`。
