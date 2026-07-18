# 第 8 章 Example Implementation 整合记录

## 范围

- 实现：`examples/agent/skill-selection.mjs`。
- 测试：`examples/agent/skill-selection.test.mjs`。
- 运行入口：`npm run test:skill-selection`、`npm run example:skill-selection`。
- 文档：`08-skills-and-reusable-capabilities.example-plan.md`、第 8 章正文、`examples/agent/README.md`、`package.json` 与 `scripts/validate.sh`。

## 红灯

2026-07-15 先创建测试并运行：

```bash
node --test examples/agent/skill-selection.test.mjs
```

命令以 `ERR_MODULE_NOT_FOUND` 失败：`skill-selection.mjs` 当时尚不存在。该红灯只证明测试先于实现存在；它不代表真实 Skill、产品行为、权限或外部系统失败。

## 实现与绿灯

实现 `evaluateSkillSelection` 后，函数仅检查注入的 Contract、任务摘要、前置条件和选择证据。它可以返回：

- `selected / ready_for_read_only_review`
- `blocked / missing_required_inputs`
- `blocked / missing_preconditions`
- `not_applicable / scope_not_supported`
- `requires_approval / effect_outside_default_boundary`
- `blocked / missing_selection_evidence`

2026-07-15 实际运行：

```bash
npm run test:skill-selection
npm run example:skill-selection
```

结果：6 项 Node 内置测试通过、0 项失败。演示输出 `selected`、`ready_for_read_only_review`、`review-markdown-chapter@1`、一条选择理由、空的 `missing` 列表和空的 `effects` 列表。

## 边界

- 实现不读取或写入文件，不访问网络、模型、工具、Plugin、Hook、MCP、环境变量、时钟、账户、凭证、数据库、进程或源系统。
- `chapterPath`、`ruleVersion` 与 `referenceRegistry` 是注入的教学字符串；测试不证明它们存在、可读、已登记或被授权。
- `requires_approval` 仅表达本书的选择结果；函数不授予、请求或执行 `write`。
- 6 项测试只验证纯函数对固定输入的输出，不验证真实 Markdown 审查、引用事实、Skill 发现、产品安装、权限、扫描或外部行为。
