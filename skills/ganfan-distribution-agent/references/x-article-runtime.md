# X Article 运行约束

## 本地真相

- 发布偏好：`channels/profiles/x.yaml`
- X Article 实现：`src/platforms/x/`
- 主入口：`npm run publish:x:article -- <sorrycode.md> [--cover <path>] [--title <text>] [--submit]`
- 默认浏览器 profile：仓库内 `.runtime/opencli/browser-profile`
- 如果要复用另一个发布专用 profile，设置 `GANFAN_SHARED_CHROME_PROFILE_PATH`，或写入 `channels/profiles/x.yaml` 的 `browser.chrome_profile_path`

## 规则

- X 与微信共用同一套 Chrome remote debugging 入口，默认先 attach；当前未运行时自动拉起
- 普通方式打开的日常 Chrome 不能被中途接管。默认使用发布专用 profile；如果 operator 显式改成常用 profile，需要先完整退出 Chrome 后重跑，但这条路不作为默认路径。

- 当前本地仅内收 `X Article` 单链路，不包含普通贴文、视频、引用推文
- 标准输入优先使用 `sorrycode.md`
- 自动化默认先完成 compose / preview，不带 `--submit` 时不得宣称已发布
- 首次登录或 X Premium 缺失时，必须进入人工接管
- 只有真实日志出现 preview / publish 关键动作后，才能宣称链路跑通
