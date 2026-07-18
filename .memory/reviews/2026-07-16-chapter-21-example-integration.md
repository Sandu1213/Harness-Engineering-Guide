# 第 21 章 Example Integration Review

## 红绿记录

先只创建测试并运行 `node --test examples/agent/project-harness-portability-assessment.test.mjs`。实际得到 `ERR_MODULE_NOT_FOUND`，原因是 `project-harness-portability-assessment.mjs` 尚未创建。

实现后实际运行相同测试，结果为 6 项通过、0 项失败；随后执行 `node examples/agent/project-harness-portability-assessment.mjs`，输出 `portable` / `shared_contract_and_adapter_boundary_present`。

## 边界复核

实现只读取调用者注入的普通对象。它不读取真实规则文件、项目状态、配置、环境变量、网络、账户或 Tool，也不检查真实 Codex 或 Claude Code 行为。`productId` 仅是教学标签。
