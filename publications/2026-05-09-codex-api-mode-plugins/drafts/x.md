# X Thread

1/ Codex App 用 API 登录后，插件不是不能用。

我刚踩完一轮坑，真正的问题通常不是 API 模式，而是插件安装路径不对，或者旧浏览器自动化工具还在后台占着状态。

2/ 先分清几个插件：

Browser：Codex 自带浏览器，适合本地网页测试。
Chrome：连接你真实的 Chrome，适合需要登录态的网站。
Computer Use：控制桌面 UI。
HyperFrames：做 HTML 视频和动效。

3/ 最容易出问题的是 Chrome。

Chrome 插件不是只装一个 Chrome Web Store 扩展就行。

它还需要 Codex 插件 setup 里的 native host。少了 native host，Codex App 里看起来像装了，但 `@Chrome` 还是连不上。

4/ 最稳的安装顺序：

打开 Codex App → 插件菜单 → 安装 / 修复 Browser、Chrome、Computer Use。

Chrome 一定走 Codex 的插件 setup 流程。

装完以后，完整退出 Codex App，再重新打开。

5/ 用的时候也要叫对名字：

本地页面测试，用 `@Browser`。

要用你真实 Chrome 里的登录态，用 `@Chrome`。

要操作系统设置或桌面应用，用 `@Computer`。

6/ 如果 Chrome extension 和 native host 都正常，但 `@Chrome` 还是卡住，检查旧的 `agent-browser`。

旧工具可能留下后台进程和 `~/.agent-browser` 状态，新的 Chrome 插件会被它干扰。

7/ 核心结论：

API 登录不是插件不能用的原因。

先走 Codex App 插件安装流程，再完整重启；如果还卡，再清理旧 browser automation 状态。

完整排查命令和 HyperFrames 配置细节，我整理到 SorryCode 文档里。
