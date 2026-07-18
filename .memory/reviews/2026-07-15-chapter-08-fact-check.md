---
title: "第 8 章事实核验记录"
chapter: "08"
review_type: "fact-check"
status: "completed"
reviewed_at: "2026-07-15"
---

# 第 8 章事实核验记录

## 范围

- 正文与配套工件：`08-skills-and-reusable-capabilities.md`、`.research.md`、`.references.md`、`.outline.md`、`.example-plan.md` 与 `.fact-check.md`。
- 一手来源：REF-024 至 REF-027。
- 仓库执行事实：`npm run test:skill-selection`、`npm run example:skill-selection`，以及本阶段状态同步前的完整校验。

## 结论

**通过。** Agent Skills Specification、Claude Code Skills、ChatGPT Skills 与 OpenAI Plugin 的陈述均限制在各自规范或产品页面的范围内。技能契约（Skill Contract）、选择状态、生命周期、Markdown 审查案例、Mermaid 图和 `evaluateSkillSelection` 都明确是本书工程模型或纯内存教学工件。

## 来源核验结果

| ID | 本次直接核验的范围 | 正文允许用途 | 禁止外推 |
| --- | --- | --- | --- |
| REF-024 | `SKILL.md`、必填 metadata、可选资源、渐进加载与实验性 `allowed-tools`。 | 说明开放规范的工件与加载边界。 | 所有 Agent 都支持相同字段、发现方式或授权语义。 |
| REF-025 | Claude Code 的 `SKILL.md`、相关时使用或直接调用、使用时加载正文。 | 说明 Claude Code 的产品行为。 | 其他产品的目录、覆盖、调用、权限或自动选择机制。 |
| REF-026 | ChatGPT Skill 的可复用/可共享工作流、支持资源与上传扫描提醒。 | 说明该帮助页所述范围。 | 扫描、安装或共享构成充分安全或授权保证。 |
| REF-027 | Plugin 可包含 Skills、Apps、App templates，及 App 与连接源系统权限关系。 | 说明该产品范围内的权限边界。 | 可见、启用或安装 Plugin 即表示能访问或写入源系统。 |

## 本仓库执行事实

2026-07-15 在仓库根目录实际执行：

```bash
npm run test:skill-selection
npm run example:skill-selection
```

- 6 项 Node 内置测试通过、0 项失败，覆盖只读选择、输入缺失、前置条件缺失、范围不匹配、写入升级和选择证据缺失。
- 演示输出 `selected / ready_for_read_only_review`。
- 本阶段状态同步前的 `npm run validate` 通过：160 个 Markdown 文件 lint 0 错误，链接检查、8 组示例共 40 项 Node 内置测试和章节状态检查通过；`git diff --check` 无输出。

以上只证明固定注入对象上的确定性教学函数和本书 Markdown 工具链；不证明真实 Skill 发现、文件访问、权限、Tool、Plugin、App、MCP、审批、身份、源系统访问或结果正确性。

## 未覆盖阶段

- Language Editing：尚未按风格指南收束第 8 章中文叙述。
- Chapter Validation 与 Final Review：尚未作为第 8 章工作流阶段完成；后续阶段必须单独记录其验证范围。
