---
title: "第 35 章 Diagram Review：企业级 Harness 架构"
chapter: "35"
stage: "Diagram Review"
status: "completed"
updated_at: "2026-07-16"
---

# 第 35 章 Diagram Review：企业级 Harness 架构

## 审查范围

- 工件：`diagrams/mermaid/chapter-35-enterprise-control-observation-flow.mmd`、导出的 SVG/PNG、正文 Mermaid 块、替代说明和完成检查表。
- 问题：控制决定、受限执行候选、关联观察与人工升级怎样各自停在受限结论范围内，而不把计划性决定、观察关联或人工处理画成业务效果与审计结论？

## 图示结论

图把教学请求依次送入企业控制平面（Enterprise Control Plane）和策略决定记录（Policy Decision Record）。只有带有能力、目标、预算、到期与停止条件的 `allowed_with_limits` 才成为受限执行候选；执行平面（Execution Plane）只描述受限尝试，明确不执行外部动作。拒绝流向保守停止；待批准、范围扩大、跨边界、超预算、关联缺失、过期或证据不足流向人工升级门（Human Escalation Gate）。人工给出新的受限范围后仍要重新形成策略决定，不能直接进入执行。

关联观察记录（Correlated Observation Record）把策略决定与执行摘要连到同一教学上下文，但图用虚线明确保留两条断点：策略允许不等于业务效果，关联观察不等于审计充分性。业务效果与审计充分性均要求图外的独立材料；本图不表示任何企业部署、审计、批准或外部执行已经发生。

## 已执行验证

- 已执行 `npx --yes @mermaid-js/mermaid-cli@11.16.0 --version`，输出 `11.16.0`，退出码 0。
- 已执行 `npx --yes @mermaid-js/mermaid-cli@11.16.0 -i diagrams/mermaid/chapter-35-enterprise-control-observation-flow.mmd -o diagrams/exported/chapter-35-enterprise-control-observation-flow.svg -b white`，输出 `Generating single mermaid chart`，退出码 0。
- 已执行同版本 Mermaid CLI 导出 PNG（`-b white -s 2`），输出 `Generating single mermaid chart`，退出码 0；PNG 为 1568×1732。
- 已实际查看 PNG：主链、`allowed_with_limits`、`denied`、`pending_approval`、两条虚线结论断点、人工升级门、重新形成策略决定与保守停止均可读，没有文字截断。
- 已从正文提取 Mermaid 块并与 `.mmd` 逐字比较，退出码 0、无输出。
- 已执行 `./node_modules/.bin/markdownlint-cli2 docs/part-05-case-studies/35-enterprise-harness-architecture.md .memory/reviews/2026-07-16-chapter-35-diagram-review.md`，退出码 0，检查 2 个文件、0 个错误。
- 已执行 `git diff --check --` 针对本章正文、图源、导出图与审查记录，退出码 0、无输出。

## 未覆盖范围

- 本图只表达本书教学模型；没有连接或运行企业目录、身份、Kubernetes、OPA、OpenTelemetry、云账户、工单系统、审计、网络、凭证、API 或任何外部系统。
- Mermaid 导出与图块比较只验证图源、发布资源和书稿的一致性；不验证真实身份、策略求值、资源预算、观察采集、人工批准、业务效果、审计充分性、安全审查或合规。
