---
chapter: "12-environment-sandbox-and-permissions"
stage: "Language Editing"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 12 章 Language Editing 记录

## 范围与结论

审查范围为第 12 章正文、Research Brief、Outline、Example Plan 和候选参考资料。结论为 `可合并`：本次只统一术语首现、条件主语和“允许”语义，没有扩大来源、示例或图示的已核验范围。

## 已完成编辑

- 首次出现统一为环境（Environment）、沙箱（Sandbox）、凭证（Credential）、环境契约（Environment Contract）、最小权限（Least Privilege）、凭证作用域（scope）、批准快照（snapshot）和教学配置（profile）。
- 将“允许”持续写为“允许候选”或“准入判断”，避免与调用完成、目标改变、回读和验收接受混淆。
- 把 dry-run、测试和生产的描述改为具有主语和不代表什么的矩阵，避免用“更安全”这类没有条件的程度词。
- 统一 Tool、Environment Contract、approval、scope、profile、blocked 与 requires_approval 的拼写，并保持第 10、11、14、17 章的责任边界。

## 未改变的边界

- 没有改变 C12-REF-001 至 C12-REF-005 的限定范围或增加外部事实。
- 交叉审查后，正文已在首次出现统一术语；`assessEnvironmentAccess` 的教学输入新增目标范围准入，覆盖 8 项测试，纯内存限制不变。
- 没有改变 Mermaid 源、SVG/PNG 或图的教学语义。
- 没有把“环境允许”“批准存在”“命令退出为 0”写成真实部署、Sandbox、权限或业务验收成功。
