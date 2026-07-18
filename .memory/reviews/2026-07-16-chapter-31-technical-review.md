# 第 31 章技术审查

## 审查范围

- 工件：第 31 章 Research Brief、详细 Outline、正文草稿、参考资料、全局引用和词表。
- 规则：`BOOK_RULES.md`、`CHAPTER_TEMPLATE.md`、`.ai/review-checklist.md`。

## 来源复核

| 来源 | 本轮核对结果 | 正文允许范围 |
| --- | --- | --- |
| CH31-REF-01 / REF-095 | pytest 官方文档说明测试函数通过参数请求 fixture，fixture 具有作用域。 | 受控依赖、准备／清理与作用域的有限背景。 |
| CH31-REF-02 / REF-096 | pytest 官方文档说明 `monkeypatch` 的修改会在请求测试或 fixture 结束后撤销。 | 替身应具备显式恢复边界。 |
| CH31-REF-03 / REF-097 | Playwright 官方文档说明每项测试使用独立 Browser Context，并隔离 local storage、session storage 和 cookies。 | 浏览器状态隔离的有限背景。 |
| CH31-REF-04 / REF-083 | Playwright 官方文档建议优先用户可见属性或显式测试契约，且 locator 动作时解析当前 DOM。 | 定位策略和动作目标新鲜度的有限背景。 |
| CH31-REF-05 / REF-082 | Playwright 官方文档说明异步断言会重新取值直至满足条件或到达 timeout。 | 动作后可重试观察与 timeout 边界。 |

## 结构与边界修订

审查发现草稿虽已具备目标、场景、核心概念、示例计划、验证、边界、总结和练习，但缺少模板要求的显式“前置知识”“工作流程”“参考资料”和“章节完成检查表”入口。已做最小补齐，并补全空的 `diagrams`／`examples` 元数据；未增加新框架事实、示例、图示或运行结论。

## 结论

`通过`。正文没有把 API 200、fixture／`monkeypatch`、Browser Context、locator 或可重试断言写成真实用户登录成功。Test Evidence Plan、API Contract Check、UI Flow Evidence、Failure Record、Report Gate 和未来纯内存准入器均明确为本书模型。术语与 `.ai/glossary.md`、正式 REF 映射及第 30、32 章边界一致。

## 必须修复

无；模板结构缺口已在本轮修订。

## 应该修复

无。

## 后续边界

- Example Implementation 必须只实现纯内存 `assessTestEvidencePlan(plan)`，先保留模块缺失红灯，再运行实际 Node 测试与演示；不得运行 pytest、Playwright、HTTP 或浏览器。
- Diagram Review 才创建 Mermaid 源、SVG/PNG 和替代描述；本次不声称图已存在或已查看。
- pytest 与 Playwright 的动态行为、版本和运行语境应在 Fact Check 写作日再次重读官方资料。
