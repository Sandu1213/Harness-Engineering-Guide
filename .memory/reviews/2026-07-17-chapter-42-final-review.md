---
title: "第 42 章 Final Review：Harness 的版本化、回滚和 A/B 测试"
chapter: "42"
stage: "Final Review"
status: "completed"
updated_at: "2026-07-17"
---

# 第 42 章 Final Review：Harness 的版本化、回滚和 A/B 测试

## 完成范围

- 复核正文、Research Brief、Outline、参考资料、示例计划、事实核验与全部阶段审查记录。
- 复核运行证据、front matter、图示/示例路径、术语、引用、完成检查表与外部动作边界。
- 重新执行专用 Node 测试、无副作用演示、Mermaid SVG/PNG 导出、PNG 视觉检查和正文图源一致性检查。

## 实际验证

| 检查 | 结果 |
| --- | --- |
| 专用测试 | `node --test examples/agent/harness-release-experiment-assessment.test.mjs` 退出码 0；11 项通过、0 项失败。 |
| 演示 | 输出 `ready_for_review`、`offline_candidate_ready`、`review_limited_exposure` 与 `executionPerformed: false`。 |
| Mermaid SVG | `npx --yes @mermaid-js/mermaid-cli@11.16.0` 重新导出，退出码 0。 |
| Mermaid PNG | 同版本 CLI 以白色背景、两倍缩放重新导出，退出码 0；尺寸 1568×2012。 |
| 视觉检查 | Manifest、兼容、离线比较、发布决定、有限暴露、补证、不可比较、批准、回滚请求和回读验证均可读，无明显截断或错误外部执行箭头。 |
| 图源一致性 | 正文 Mermaid 块与 `.mmd` 均为 1808 个字符，逐字一致。 |

最初尝试调用未安装的本地 `mmdc` 简写时，`npx` 返回“could not determine executable to run”；随后改用仓库既有的固定版本命令 `npx --yes @mermaid-js/mermaid-cli@11.16.0`，SVG 与 PNG 均成功重建。失败命令没有被计为验证通过。

## 审查结论

- REF-009、REF-014、REF-109 与 REF-116 只支持 canary、模型快照、SemVer 和随机化分析的受限背景；本书工件与来源产品/规范保持分层。
- `assessHarnessReleaseExperiment(input)` 只处理注入对象；`ready_for_review`、`rollback_requested` 或 `rollback_verified` 都不表示真实外部动作。
- 章节没有提供虚构价格、流量比例、样本量、显著性阈值、实验时长、自动回滚次数或批准人数。
- 正文状态切换为 `complete`；全仓共享校验仍需在本章状态与第 39 至 41 章共享入口统一同步后运行。

## 未验证范围

未运行真实模型、Harness、Benchmark、A/B 平台、流量、缓存、记忆、监控、发布、回滚、账户、凭证、审批、Git 写入、CI 或外部系统。纯内存测试、图示和文档记录不能证明这些能力存在或已经执行。
