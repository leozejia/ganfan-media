# 微信运行约束

## 本地真相

- 发布偏好：`channels/profiles/wechat.yaml`
- 本地密钥文件：`channels/profiles/wechat.local.env`
- 微信扩展源码：`src/platforms/wechat/`
- 默认主题：`magazine`
- 默认主色：`#FF8C38`

## 当前入口

```bash
npm run render:wechat -- <sorrycode.md> [--theme <default|grace|simple|modern|magazine>] [--output <path>]
npm run publish:wechat -- --markdown <sorrycode.md> [--theme <default|grace|simple|modern|magazine>] [--color <hex>] [--submit]
npm run publish:wechat:api -- <article.md|article.html> [--theme <default|grace|simple|modern|magazine>] [--color <hex>] [--dry-run]
```

## 规则

- 进入自动发布前，文章应当已经完成插图
- 微信 HTML 终稿默认落盘到 `outputs/wechat/article.html`
- 浏览器自动发布与 HTML 终稿渲染共用同一套 baoyu 基线内核
- `wechat.yaml` 的 `browser.chrome_profile_path` 用于覆盖默认 Chrome user data directory；默认优先使用常用 Chrome profile
- `wechat.local.env` 只服务 API 模式，不写入长期记忆
- 只有真实日志出现保存草稿或发布成功，才能宣称链路跑通
- 微信与 X 共用同一套 Chrome remote debugging 入口，默认先 attach；未运行时自动拉起
