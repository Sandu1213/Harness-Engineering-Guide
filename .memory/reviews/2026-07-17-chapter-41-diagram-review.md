---
chapter: "41"
review_type: "diagram"
status: "completed"
reviewed_at: "2026-07-17"
---

# 第 41 章 Diagram Review：不可信输入安全边界

## 审查范围

- `diagrams/mermaid/chapter-41-untrusted-input-security-boundaries.mmd`
- `diagrams/exported/chapter-41-untrusted-input-security-boundaries.svg`
- `diagrams/exported/chapter-41-untrusted-input-security-boundaries.png`
- 正文 Mermaid 块、导出链接、替代说明、主链与保守停止分支。

## 图示结论

图把外部内容、任务内提取、候选动作、能力、策略、秘密引用、工具、供应链、效果观察、审计和事件交接拆成独立边界。没有从网页内容直达工具的箭头；任务、目标或动作不匹配，秘密值进入上下文，供应链来源未知，工具边界不匹配，以及审计不足都会离开主链，进入 `Security Incident Handoff → Conservative Stop`。

正常分支也不代表执行完成。`ready_for_read_only_review` 只允许进入事实复核，随后同样停在 `Conservative Stop`。图明确保留五个责任断点：`content_labeled_untrusted ≠ injection_blocked`、`policy_allowed ≠ action_executed`、`tool_returned ≠ effect_verified`、`audit_event_written ≠ audit_sufficient`、`incident_handoff_created ≠ incident_contained`。

## 已执行验证

- Mermaid CLI 11.16.0 以白色背景导出 SVG，退出码 0。
- 同版本 CLI 以白色背景和两倍缩放导出 PNG，退出码 0；`sips` 显示 1568×3340。
- 已实际查看 PNG：内容信封、能力与策略、秘密引用、工具与供应链、效果观察、审计、只读复核、事件交接和保守停止均可读，无关键节点截断或箭头遮挡；异常长分支均汇入事件交接，没有越过责任断点。
- 以 Node 抽取正文 Mermaid 块并与 `.mmd` 比较：两者均为 2257 个字符，逐字一致。
- 第 41 章示例的 13 项 Node 内置测试全部通过，0 项失败。
- 章节正文与本审查记录的定向 Markdown lint 通过。
- 正文、Mermaid 图源与本审查记录的尾随空白检查通过，`git diff --check` 通过。

## 未验证范围

图未访问、运行或模拟真实网页、提示注入检测、模型、浏览器、文件、网络、OAuth、MCP、身份、权限、秘密存储、日志、SIEM、供应链平台或事件响应系统。成功导出只证明图源可渲染；它不能证明注入已阻断、动作已执行、效果已验证、审计充分或事件已遏制。
