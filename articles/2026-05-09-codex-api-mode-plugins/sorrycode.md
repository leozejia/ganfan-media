# Codex App 插件灰了？手动配置插件

> Tips：如果你不想看细节，直接点击右上角「复制 Markdown」，把全文发给你的 agent，比如 Codex 或 Claude Code，让它帮你检查并修改本机配置。
>
> 你可以这样说：
>
> ```text
> 请阅读这篇文档，帮我检查 ~/.codex/config.toml，并把 Codex App 常用插件配置好。修改前先告诉我你会改哪些文件。
> ```

这篇文档解决一个问题：

**Codex App 里插件入口是灰色的，或者你在 `/plugins` 里找不到想要的插件，应该怎么手动配置。**

最短答案：改这个文件。

```text
~/.codex/config.toml
```

## 第一步：打开配置文件

配置文件位置：

```text
~/.codex/config.toml
```

如果你不想自己找文件，让 Codex / Claude Code 帮你打开：

```text
请打开 ~/.codex/config.toml，帮我检查 Codex 插件配置。
```

如果文件不存在，让 agent 帮你创建一个。

## 第二步：加入插件配置

把下面这段加到 `~/.codex/config.toml` 里：

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

保存文件。

## 第三步：重启 Codex App

修改配置后，必须完整退出 Codex App，再重新打开。

不要只关闭窗口。

在 macOS 上，可以在 Dock 里右键 Codex，选择退出；或者在菜单栏里退出 Codex。

重新打开后，进入一个项目，点击输入框旁边的插件菜单。

如果能看到这些项目，说明配置生效：

- Browser / 浏览器
- Chrome
- Computer Use / 电脑
- HyperFrames

## 第四步：直接调用插件

插件出现后，不需要再去点左侧灰色入口。

直接在输入框里调用。

### 让 Codex 操作真实 Chrome

```text
@Chrome 打开 X，帮我读这条帖子
```

适合需要登录态的网站，比如 X、GitHub、Gmail、Stripe、Google Cloud Console。

### 让 Codex 操作桌面

```text
@Computer 打开系统设置，检查屏幕录制权限
```

适合系统设置、桌面应用、权限检查。

### 让 Codex 做视频和动效

```text
@HyperFrames 做一个 10 秒产品介绍视频
```

适合 HTML 视频、产品演示、动效 composition。

### 让 Codex 测本地网页

```text
@Browser 打开 http://localhost:3000，测试登录流程
```

适合本地项目、localhost、页面截图、表单流程测试。

## 为什么不是 `/plugins`

如果你能通过 Codex App 或 Codex CLI 的 `/plugins` 正常安装，那当然可以用官方入口。

但你看到这篇文章，通常说明你已经遇到其中一种情况：

- Codex App 左侧插件入口是灰色的。
- `/plugins` 里找不到你要的插件。
- HyperFrames 这类插件已经在本地缓存里，但没有显示出来。
- 插件显示和实际配置状态不一致。

这种情况下，最直接的排查点就是 `~/.codex/config.toml`。

## HyperFrames 最容易写错

HyperFrames 的配置是：

```toml
[plugins."hyperframes@openai-curated"]
enabled = true
```

不要写成：

```toml
[plugins."hyperframes@plugins"]
enabled = true
```

原因是配置里要写 marketplace 名称，不是本地文件夹名。

这里应该使用的 marketplace 名称是：

```text
openai-curated
```

## Chrome 需要 Extension 和 native host

Chrome 需要两样东西：

1. Codex Chrome Extension。
2. Codex native host。

Codex Chrome Extension 地址：

```text
https://chromewebstore.google.com/detail/codex/hehggadaopoacecdllhhajmbjkdcmajg
```

你可以把 native host 理解成 Codex 和 Chrome 之间的本机桥接。

如果没有这座桥，Codex 可能看得到 Chrome 插件，但真正调用 `@Chrome` 时还是连不上。

如果 Chrome Web Store 提示该扩展在当前地区不可用，先切换可访问地区 / 网络环境，再安装扩展。不要把“商店里搜不到”理解成插件不存在。

如果 `@Chrome` 连不上，让 agent 帮你检查：

```text
请帮我检查 Codex Chrome Extension 和 native host 是否正常。不要读取我的 Cookie、密码或浏览器隐私数据。
```

## Chrome 使用注意事项

使用 `@Chrome` 前，先确认 Chrome 浏览器里的 Codex 扩展处于连接正常状态。

调用方式示例：

```text
@Chrome 打开 Salesforce，根据这些笔记更新客户记录
```

Codex 使用 Chrome 插件时，通常会在后台打开专用标签组。它可以读取页面、填写表单、点击按钮、多标签验证。

遇到敏感操作时，比如提交表单、下载文件、访问个人信息，agent 应该暂停并让你确认。

如果文件上传 / 下载失败，打开：

```text
chrome://extensions/
```

找到 Codex 扩展，进入 Details / 详细信息，开启：

```text
Allow access to file URLs
```

也就是允许访问文件网址。

当前这条路径面向 Google Chrome。不要默认把 Edge、Arc 或其他 Chromium 浏览器当成同等可用。

## Computer Use 需要系统权限

如果 `@Computer` 能出现，但不能操作屏幕，通常是 macOS 权限没开。

去这里检查：

```text
System Settings -> Privacy & Security -> Screen Recording
System Settings -> Privacy & Security -> Accessibility
```

给 Codex 或 Codex Computer Use 相关项授权后，重启 Codex App。

## 最后才检查旧浏览器自动化工具

如果配置正确、Codex App 已重启、Chrome extension 和 native host 也正常，但 `@Chrome` 还是卡住，再检查旧浏览器自动化工具。

先让 agent 查看有没有旧进程：

```bash
ps -axo pid,ppid,comm,args | rg -i 'agent-browser|browser-use|\\.agent-browser|\\.browser-use'
```

旧状态可能出现在：

```text
~/.agent-browser
~/.browser-use
```

这类工具不一定每个人都有。如果你曾经安装过旧的浏览器自动化工具，比如 `agent-browser`、`browser-use` 或类似工具，再检查对应进程和状态目录。

确认不再需要对应旧工具后，再清理。

不要一上来就删不认识的目录。

## 完成后检查

按顺序确认三件事：

1. `~/.codex/config.toml` 里已经有插件配置。
2. Codex App 已经完整退出并重新打开。
3. 输入框旁边的插件菜单能看到 Browser、Chrome、Computer Use 或 HyperFrames。
