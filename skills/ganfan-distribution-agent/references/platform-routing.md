# 平台路由

## 定位

`ganfan-distribution-agent` 是多平台发送编排层。

## 当前平台口径

| 平台 | 架构口径 | 当前本地真相 |
| --- | --- | --- |
| X | 属于 ganfan-distribution-agent 编排范围 | 本地已内收 X Article 单链路：Markdown → X Articles 编辑器 → preview / publish |
| 微信公众号 | 属于 ganfan-distribution-agent 编排范围 | 本地已内收单内核微信链路：同一套实现负责 HTML 终稿、浏览器自动发草稿与 API 发布 |
| 小红书 | 属于 ganfan-distribution-agent 编排范围 | 本地源码未内收，依赖 runtime 已安装能力与当次验证 |

## 判断原则

- 是否“属于编排范围”与“当前机器此刻能否成功发送”是两件事
- 对公众号，当前默认主路径是：`drafts/sorrycode.md` → `outputs/wechat/article.html` → 浏览器优先附着共享 automation Chrome，会话不存在时自动拉起同一个 profile 后发草稿
- 本地配置真相始终回到 `ganfan-media`，不是外部 skill 自带配置

- 对 X，当前默认主路径是：`drafts/sorrycode.md` → `publish:x:article` → 优先附着共享 automation Chrome，会话不存在时自动拉起同一个 profile 后进入 X Articles 预览 / 发布
