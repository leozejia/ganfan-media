# Codex App API 登录后，插件不能用怎么办

如果你用 API 登录 Codex App，发现 Browser、Chrome、Computer Use、HyperFrames 这类插件不能用，先别把问题归因到 API 登录。

API 模式不是核心限制。更常见的问题是插件安装路径不对，或者旧的浏览器自动化工具还在后台占着状态。

Codex 现在有几类插件能力，名字容易混在一起：

- Browser：Codex 自带的浏览器，适合本地网页测试、截图、表单流程。
- Chrome：连接你真实的 Google Chrome，适合需要登录态的网站。
- Computer Use：控制 macOS 桌面 UI，适合系统设置和原生应用。
- HyperFrames：做 HTML 视频和动效实验。

真正要注意的是 Chrome。Chrome 不是只装一个 Chrome Web Store 扩展就完事，它还需要 Codex 插件安装流程里的 native host。最稳的方式是从 Codex App 的插件菜单安装或修复 Chrome 插件，然后完整重启 Codex App。

如果 Chrome 插件已经装了，native host 也正常，但 `@Chrome` 还是卡住，可以检查旧的 `agent-browser`。旧工具可能留下后台进程和 `~/.agent-browser` 状态，导致新的 Chrome 插件连接异常。

核心解法是：

1. 在 Codex App 插件菜单里安装 Browser / Chrome / Computer Use。
2. Chrome 一定走 Codex 插件 setup，不要只手动装扩展。
3. 安装后完整退出并重开 Codex App。
4. 需要真实登录态的网站，用 `@Chrome`。
5. 如果仍然卡住，再清理旧 `agent-browser` 状态。

这件事的关键不是折腾插件，而是把 Codex 从只会写代码，扩展成能打开浏览器、操作真实网页、处理桌面任务的工作台。
