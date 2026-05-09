# X Article 运行约束

## 本地真相

- 发布偏好：`distribution/profiles/x.yaml`
- X Article 实现：`src/platforms/x/`
- 主入口：`npm run publish:x:article -- <drafts/sorrycode.md> [--cover <path>] [--title <text>] [--submit]`

## 规则

- X 与微信共用同一个共享 automation Chrome profile，默认先 attach；当前未运行时自动拉起

- 当前本地仅内收 `X Article` 单链路，不包含普通贴文、视频、引用推文
- 标准输入优先使用 `drafts/sorrycode.md`
- 自动化默认先完成 compose / preview，不带 `--submit` 时不得宣称已发布
- 首次登录或 X Premium 缺失时，必须进入人工接管
- 只有真实日志出现 preview / publish 关键动作后，才能宣称链路跑通
