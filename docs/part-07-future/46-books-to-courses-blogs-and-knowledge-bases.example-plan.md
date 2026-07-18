---
title: "第 46 章示例计划：派生内容包评估"
chapter: "46"
status: "completed"
updated_at: "2026-07-17"
---

# 第 46 章示例计划：派生内容包评估

## 目标与边界

`assessDerivedContentPackage(input)` 只判断调用方注入的 Content Atom、Source Anchor、Learning Path Contract、Derivative Content Manifest、Publication Adapter Profile、Consistency Gate 证据、Feedback Candidate Record 和发布请求。函数不读取仓库、文件、环境变量或外部平台，不生成课程、博客、FAQ 或知识库，不调用模型、LMS、CMS、搜索、分析、凭证、网络、Git、构建、上传、审批或发布工具。

所有返回对象固定包含 `status`、`code`、`derivativeId`、`next` 和 `executionPerformed: false`。函数只路由缺口和审查责任，不修复、刷新、批准或发布内容。

## 接口草图

```js
assessDerivedContentPackage({
  sourceSnapshot,
  contentAtoms,
  learningPath,
  derivativeManifest,
  adapterProfile,
  consistencyEvidence,
  feedbackCandidates,
  publicationRequest,
});
```

## 保守判定顺序

1. 检查来源快照、Content Atom 和 Source Anchor 是否完整、可定位且有证据。
2. 检查许可状态；未决许可进入 `blocked_by_license_review`。
3. 比较来源、Atom、Manifest 和一致性证据版本；漂移进入 `refresh_required`。
4. 检查 Manifest 的媒介重写、删减边界、责任者和刷新触发。
5. 对课程型媒介检查 Learning Path Contract 的目标、练习和评估映射。
6. 检查 Publication Adapter Profile 只允许无凭证预览，不授予发布执行权限。
7. 执行纯内存 Consistency Gate；链接、资源或渲染失败回到媒介修订。
8. 检查 Feedback Candidate Record；涉及规范源的候选只能路由到 Research、Fact Check 或 Technical Review。
9. 完整候选返回 `ready_for_preview_review`；任何发布请求仍返回 `publication_approval_required`。

## 测试矩阵

| 行为 | 预期状态 | 不证明 |
| --- | --- | --- |
| 来源快照缺失，或 Atom/Anchor 不完整。 | `needs_source_evidence` | 函数定位或读取了真实源文件。 |
| Atom、Manifest 或一致性证据版本落后。 | `refresh_required` | 派生物已经被改写或刷新。 |
| Atom 许可或 Consistency Gate 许可证据未决。 | `blocked_by_license_review` | 已取得法律意见或许可批准。 |
| Manifest 缺少媒介重写。 | `needs_medium_rewrite` | 函数生成了派生内容。 |
| 课程目标没有练习和评估映射。 | `learning_alignment_failed` | 学习效果、评估效度或认证成立。 |
| Adapter 不完整或预览检查失败。 | `needs_medium_rewrite` | 平台兼容、无障碍合规或预览已创建。 |
| Feedback Candidate 不完整或要求修改规范源。 | `needs_feedback_evidence` | 反馈正确或源书稿已经修改。 |
| 所有注入证据完整。 | `ready_for_preview_review` | 预览、批准、上传或发布已经发生。 |
| 候选请求发布。 | `publication_approval_required` | 人工批准已作出或外部发布已执行。 |

## TDD 记录

- **RED：** 已先运行测试；退出码为 1，Node.js 返回 `ERR_MODULE_NOT_FOUND`，因为 `derived-content-package-assessment.mjs` 尚不存在。
- **GREEN：** 创建最小纯内存分类逻辑后，专用测试以退出码 0 完成，17 项通过、0 项失败。
- **EXECUTE：** 演示使用虚构注入对象，以退出码 0 打印 `ready_for_preview_review / derived_content_evidence_ready / review_preview_candidate / executionPerformed:false`。

## 运行前提与未覆盖范围

测试只需要本仓 Node.js。虚构输入不能证明第 28 或 46 章真实版本、来源、许可、学习设计、平台适配、反馈、预览、人工批准或出版状态，也不能替代后续 Diagram Review、Fact Check、Language Editing、Final Review 和全仓 Validation。
