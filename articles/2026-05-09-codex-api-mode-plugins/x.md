# Codex App 怎么启用 Chrome / HyperFrames / Computer Use 插件

最近 Codex App 的插件越来越好玩，Chrome 能读网页，Computer Use 能控制电脑，HyperFrames 能做视频。

但我发现一个很烦的卡点：用 API Key / 中转站登录 Codex App，左侧「插件」按钮可能是灰的，想体验这些插件的人会直接卡住。

API 登录后无法启用插件的朋友，可以看看这篇。

直接改：

```text
~/.codex/config.toml
```

把下面这段加进去：

```toml
[plugins."browser-use@openai-bundled"]
enabled = true

[plugins."chrome@openai-bundled"]
enabled = true

[plugins."computer-use@openai-bundled"]
enabled = true

[plugins."hyperframes@openai-curated"]
enabled = true
```

然后完整退出 Codex App，再重新打开。

注意，是完整退出，不只是关窗口。

重启后，看输入框旁边的插件菜单。

能看到 Browser / Chrome / Computer Use / HyperFrames，就说明配置生效了。

![Codex App 插件配置示意图](../assets/inline-01.png)

之后直接这样用：

```text
@Chrome 打开 X，帮我读这条帖子
```

```text
@Computer 检查屏幕录制权限
```

```text
@HyperFrames 做一个 10 秒产品介绍视频
```

几个坑：

1. Chrome 需要 Codex Chrome Extension 和 native host。
2. HyperFrames 的配置名是 `hyperframes@openai-curated`，不是 `hyperframes@plugins`。
3. Codex Chrome Extension 地址：`https://chromewebstore.google.com/detail/codex/hehggadaopoacecdllhhajmbjkdcmajg`
4. 如果 Chrome Web Store 提示所在地区不可用，先切换可访问地区 / 网络环境，再安装扩展。
5. 使用前确认 Chrome 扩展处于连接正常状态。
6. 如果文件上传 / 下载失败，到 `chrome://extensions/` 里给 Codex 扩展开文件网址权限。
7. 如果 Chrome 仍然卡住，再检查旧浏览器自动化工具残留，比如旧 browser-use / agent-browser 类工具，不要一上来乱删文件。

完整教程和踩坑记录我放在 SorryCode：
https://sorrycode.com/docs/runtime/codex-plugins
