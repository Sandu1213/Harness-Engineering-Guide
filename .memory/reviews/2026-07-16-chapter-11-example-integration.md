---
chapter: "11-tool-use-and-tool-protocols"
stage: "Example Implementation"
status: "completed"
reviewed_at: "2026-07-16"
---

# 第 11 章示例整合记录：工具调用准入判断

## 范围

本次只完成第 11 章的 Example Plan 和 Example Implementation。新增的 `assessToolInvocation` 是纯内存教学函数：它根据注入的 Tool Contract、Invocation Request、环境摘要、批准摘要和可选 Invocation Record 判断一个候选应被允许、拒绝、阻塞、要求批准、要求补证或标为效果未知。

函数不发现或调用真实工具，不实现 JSON Schema，不查询真实环境、时间或权限，也不发送请求、读写文件、回读目标或给任务验收。

## 红灯记录

先创建 `examples/agent/tool-invocation-assessment.test.mjs`，其导入的实现模块当时不存在。随后实际执行：

```bash
node --test examples/agent/tool-invocation-assessment.test.mjs
```

命令以退出码 `1` 结束，并报告 `ERR_MODULE_NOT_FOUND`；缺失路径为 `examples/agent/tool-invocation-assessment.mjs`。该红灯只证明测试先于实现模块存在。

## 实现与实际运行

实现模块、npm 脚本和总校验入口补齐后，实际执行：

```bash
npm run test:tool-invocation-assessment
npm run example:tool-invocation-assessment
```

专用测试以退出码 `0` 结束，7 项 Node 内置测试全部通过、0 项失败。它覆盖未知工具、缺必填参数、已知只读候选、写入缺批准、关联标识冲突、超时后的效果未知和工具成功但未验证。

演示以退出码 `0` 结束，输出：

```json
{
  "status": "allowed",
  "code": "admission_allowed",
  "correlationId": "request-demo"
}
```

## 全仓校验

2026-07-16：状态同步后实际运行 `npm run validate`，退出码为 0：Markdown lint 检查 192 个文件、0 个错误，链接检查通过，十一套纯内存示例共 61 项 Node 内置测试通过，章节状态检查为 10 章完成、1 章进行中、36 章未开始。随后 `git diff --check` 退出码为 0、无输出。二者即使通过，也只证明 Markdown、链接、既有示例和教学函数的仓库工件一致。

## 结论与边界

- 通过只表示 `assessToolInvocation` 对测试注入对象返回了预期判断。
- `approval` 只是输入快照；示例不检查真实时间、不授予权限，也不代表真实批准。
- `environment` 与 `invocationRecord` 只是输入数据；示例不连接运行环境、不调用 Tool、不重新观察外部状态，也不证明写入发生或未发生。
- `effect_unknown` 表示输入记录不足以判断效果，不能推出可以安全重试或目标一定未变。
- Mermaid 图源、Diagram Review、Fact Check、Language Editing 和 Final Review 未在本次创建或执行。

## 关联工件

- [示例计划](../../docs/part-02-components/11-tool-use-and-tool-protocols.example-plan.md)
- [实现](../../examples/agent/tool-invocation-assessment.mjs)
- [测试](../../examples/agent/tool-invocation-assessment.test.mjs)
- [章节正文](../../docs/part-02-components/11-tool-use-and-tool-protocols.md)
