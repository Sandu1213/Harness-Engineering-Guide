# 第 18 章 Language Editing

## 编辑范围

检查第 18 章正式正文、Research Brief、Outline、Example Plan、候选资料和 Fact Check 的术语、句子主语、阶段时态与交叉章节关系。

## 编辑结论

- 首次使用时明确了重试（Retry）、恢复（Recovery）、补偿（Compensation）和熔断（Circuit Breaker）；`Recovery Contract` 保持为本书模型。
- 将“超时”“失败”“未执行”“已恢复”等容易越界的说法拆为失败信号、效果状态、恢复候选和重新观察，避免把请求或推测写成事实。
- 对 RFC、Google SRE 和 Microsoft 的陈述均保留具体语境与“不可外推”限制；没有引用性能数字、默认参数或产品能力。
- 章节总结连接第 19 章的压缩职责，未让压缩章节接管本章的重试判断。

## 未改变的范围

未新增外部事实、未改变纯内存示例的 I/O 边界、未修改 Mermaid 状态含义、未替主线程登记全局引用或项目状态。
