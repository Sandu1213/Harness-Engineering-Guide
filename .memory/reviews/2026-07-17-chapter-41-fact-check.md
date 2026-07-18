---
title: "第 41 章 Fact Check"
chapter: "41"
stage: "Fact Check"
status: "completed"
updated_at: "2026-07-17"
---

# 第 41 章 Fact Check

## 范围

- 通过 Agent Reach 的一手网页读取路径，在写作日重新访问 REF-125、REF-126、REF-127、REF-128、REF-086、REF-129 与 REF-130。
- 对 REF-126 同时核对 NIST 当前发布页和 Rev. 5 原始 PDF 中 AC-6、AU-3 的控制原文与隐私边界。
- 将来源事实、本书安全工件、虚构恶意网页案例和纯内存运行证据分开写入 `41-security-permissions-and-audit.fact-check.md`。

## 来源复读结论

- REF-125 只支持直接/间接提示注入、外部不可信内容和输入输出检查、指令/数据分离、最小权限、高风险人工监督的纵深防御背景。
- REF-126 的发布页仍列 `SP 800-53 Release 5.2.0`；Rev. 5 PDF 的 AC-6 支持任务必要的已授权访问，AU-3 支持事件类型、时间、位置、来源、结果、关联身份及隐私风险提醒。
- REF-127 只支持细粒度访问、秘密生命周期、秘密访问审计、避免明文秘密进入日志和暴露后响应的工程背景。
- REF-128 只支持应用日志的 when/where/who/what、交互关联、动作/对象/结果/理由、敏感数据排除、日志注入防护和记录保护。
- REF-086 只支持 MCP 实现中的 confused deputy、token passthrough、SSRF、本地 Server 与 scope minimization 风险和缓解背景。
- REF-129 只支持源码/构建完整性、供应链各环节风险和 SLSA v1.2 未覆盖全部威胁的明确边界。
- REF-130 只支持 CSF 2.0 风险管理中的准备、检测、响应和恢复背景；页面仍标明 SP 800-61 Rev. 3 于 2025-04-03 Final。

## 实际运行

1. `node --test examples/agent/research-security-plan-assessment.test.mjs`
   - 退出码 0；13 项通过、0 项失败。
2. `node examples/agent/research-security-plan-assessment.mjs`
   - 退出码 0；输出 `ready_for_read_only_review`、`read_only_security_plan_ready`、`review_extracted_facts` 与 `executionPerformed: false`。
3. 抽取正文 Mermaid 块并与独立 `.mmd` 比较。
   - 退出码 0；两者均为 2257 个字符，逐字一致。

## 定向校验

- 对第 41 章正文、参考资料、事实核验文件和本记录运行 Markdown lint；要求 0 个错误。
- 对第 41 章本轮文本文件运行独立行尾空白检查；要求通过。
- 运行 `git diff --check`；要求退出码 0、无空白错误。
- 全仓 `npm run validate` 留给主线程在共享状态与 npm 入口整合后执行。

## 边界与下一项

- 未运行真实提示注入检测、模型、浏览器、文件、网络、OAuth、MCP、身份、权限、秘密、日志、SIEM、供应链验证、事件响应或外部效果。
- 纯内存测试只证明注入教学对象的确定性路由，不证明攻击已识别或阻断、授权已强制、秘密已保护、日志可信、供应链安全或事件已遏制。
- 下一项为 Language Editing。
