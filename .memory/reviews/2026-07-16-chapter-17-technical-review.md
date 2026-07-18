# 第 17 章 Technical Review

## 审查范围

- `docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.research.md`
- `docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.references.md`
- `docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.outline.md`
- `docs/part-03-intelligence-loop/17-evaluation-and-verifiable-results.md`

审查依据为 `BOOK_RULES.md`、`STYLE_GUIDE.md`、`.ai/research-policy.md`、`.ai/review-checklist.md` 与 C17-REF-01 至 C17-REF-04 的来源页面。

## 结论

可交由主线程整合。章节把“完成”组织为原创的 Evaluation Spec、证据矩阵和质量门，没有将来源文章、NIST 框架或论文改写成固定 Agent 评估协议。

## 必须修复

无。

## 应该修复

无。

## 已复核的技术边界

- 第 15 章负责产生观察和状态快照；本章只消费证据记录，不声称自己采集了真实状态。
- 第 16 章负责待验证的反思/经验候选与准入审查；本章只保留失败/缺证的结构化原因，不从结果自动写入跨任务经验。
- 第 18 章负责重试、恢复、停止和升级；本章的 `rejected`、`needs_evidence` 与 `needs_review` 不是动作命令。
- C17-REF-01 的 task、trial、grader、transcript、outcome 和评分器讨论均限定为 Anthropic 工程文章；四类标准与质量门是本书模型。
- C17-REF-02 与 C17-REF-03 只提供 NIST 自愿风险管理语境，未被写成合规认证、固定阈值或具体产品行为。
- C17-REF-04 只支持 LLM 评判器偏差风险的研究背景；正文没有宣称本书模型评判器已校准或可信。

## 已执行验证与未验证范围

来源已于写作日重新读取。专用代码、图示和局部文档校验的实际结果分列于示例整合、图示审查和终审记录。没有运行真实模型、评估平台、CI、文档更新、浏览器、外部链接检查、权限、发布或生产系统；这些不在本章局部实现范围。

## 交叉审查后的技术校正

后续独立审查发现示例与文稿对未知状态、范围、新鲜度和可选项缺证的契约不一致。本章现将 `unknown`、缺失或不支持的状态归为 `needs_evidence`，仅将显式 `failed` 归为失败；并以任务 `scope` 与策略 `requiredFreshness` 作为接受路径的最小守卫。可选项缺证或明确失败均进入 `needs_review`。专用测试与演示的最新实际结果见示例整合审查；这些修正不扩大真实系统或来源级结论。

## 主线程整合项

- 将 C17-REF-01 至 C17-REF-04 映射到 `.ai/references.md` 的正式 `REF-*` 编号，并替换正文 Front matter 与行内资料标识。
- 统一更新术语表、出版目录、进度、当前状态、README、示例索引、npm 入口和全仓校验；这些共享路径未在本子任务修改。
