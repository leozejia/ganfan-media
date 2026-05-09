---
name: ganfan-distribution-agent
version: 1.1.0
description: 多平台分发执行器。当前本地已内收两条真实主链：微信公众号单内核链路，以及 X Article 浏览器发布链路。配置与默认行为统一回收至 ganfan-media。
author: GanFan Media
---

# Distribution Agent Skill

## 定位

`ganfan-distribution-agent` 是 **多平台分发执行器**。

对当前 `ganfan-media`，已收敛两条真实主链：

- `render:wechat`：把 `drafts/sorrycode.md` 渲染为 `outputs/wechat/article.html`
- `publish:wechat`：基于浏览器自动化把文章自动写入公众号编辑器并保存草稿
- `publish:wechat:api`：使用公众号 API 写入草稿
- `publish:x:article`：把 `drafts/sorrycode.md` 自动写入 X Articles 编辑器并进入预览 / 发布链路

## 当前本地真相

- HTML 终稿入口：`npm run render:wechat -- <drafts/sorrycode.md> [--theme <default|grace|simple|modern|magazine>] [--output <path>]`
- 浏览器自动发布主入口：`npm run publish:wechat -- --markdown <drafts/sorrycode.md> [--theme <default|grace|simple|modern|magazine>] [--color <hex>] [--submit]`
- API 入口：`npm run publish:wechat:api -- <article.md|article.html> [--theme <default|grace|simple|modern|magazine>] [--color <hex>]`
- X Article 浏览器入口：`npm run publish:x:article -- <drafts/sorrycode.md> [--cover <path>] [--title <text>] [--submit]`
- X Article 结构检查入口：`npm run inspect:x:article -- <drafts/sorrycode.md> [--html-only] [--save-html <path>]`

默认主题由 `wechat.yaml` 决定，当前标准是 `magazine`。

浏览器发布链路默认收敛到一条共享 automation Chrome 主线：X 与微信共用同一个非默认 Chrome profile，默认先 attach；若该 profile 当前未运行，则自动拉起同一个浏览器实例。

## 配置来源

- 微信发布偏好：`distribution/profiles/wechat.yaml`
- 微信本地密钥：`distribution/profiles/wechat.local.env`
- X 发布偏好：`distribution/profiles/x.yaml`
- 本地微信实现：`src/platforms/wechat/`
- 本地 X Article 实现：`src/platforms/x/`

## 行为要求

- 微信 HTML 终稿与自动发布必须共用同一套渲染内核，不允许再保留平行渲染入口
- 自动发布默认走浏览器链路，不再把外部 skill 目录当配置中心
- 默认作者、默认主题、默认主色、评论开关必须优先读 GanFan Media profile
- `drafts/sorrycode.md` 是微信分发默认标准输入
- `outputs/wechat/article.html` 是微信 HTML 默认标准输出
- 任何“已保存草稿 / 已发布”的结论，都必须基于真实日志证据
- 不得保留指向不存在文件或废弃渲染器的脚本入口

- X Article 自动发布默认走浏览器链路，不再依赖外部 `baoyu-post-to-x` skill 配置
- `drafts/sorrycode.md` 也是 X Article 当前默认标准输入
- X Article 的“已进入预览 / 已发布”结论，同样必须基于真实日志证据
- X 与微信当前唯一浏览器主线：同一个共享 automation Chrome profile；默认先 attach，同 profile 未运行时自动拉起
