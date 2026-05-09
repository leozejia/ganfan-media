# Codex App API 登录后，插件不能用怎么办

如果你用 API 登录 Codex App，发现 Browser、Chrome、Computer Use、HyperFrames 这些插件不能用，先别急着重装 Codex。

API 模式通常不是核心限制。更常见的问题是插件安装路径不对、Codex App 没有完整重启，或者旧的浏览器自动化工具还留着后台状态。

## 先分清插件用途

| 插件 | 用来做什么 | 适合场景 |
| --- | --- | --- |
| Browser | Codex 自带浏览器 | 本地网页测试、截图、表单流程 |
| Chrome | 连接你真实的 Google Chrome | Stripe、Google Cloud、Gmail、需要登录态的网站 |
| Computer Use | 操作 macOS 桌面 UI | 系统设置、原生应用、权限检查 |
| HyperFrames | HTML 视频和动效 | 产品视频、网页转视频、GSAP 动效 |

默认判断：

- 本地网页测试，用 Browser。
- 需要真实登录态，用 Chrome。
- 需要操作桌面，用 Computer Use。
- 需要做视频动效，用 HyperFrames。

## 最稳安装方式

最稳的路径是从 Codex App 里安装插件。

1. 打开 Codex App。
2. 打开插件菜单。
3. 安装或启用：
   - Browser
   - Chrome
   - Computer Use
4. 点击 Chrome，走它自己的 setup / repair 流程。
5. 点击 Computer Use，按提示授权 Screen Recording 和 Accessibility。
6. 完整退出 Codex App，再重新打开。

Chrome 这一步很关键。Chrome 不是只装一个 Chrome Web Store 扩展就行，它还需要 Codex 插件 setup 流程创建 native host。少了 native host，Codex 可能看得到 Chrome 插件，但 `@Chrome` 仍然连不上。

## CLI 里怎么打开插件菜单

如果你在 Codex CLI 里操作，可以先进入 Codex：

```bash
codex
```

然后在 Codex 会话里输入：

```text
/plugins
```

打开插件菜单后，启用 Browser、Chrome、Computer Use。启用完成后，重新开一个 Codex 会话。

## 本地配置长什么样

插件启用状态会写在：

```text
~/.codex/config.toml
```

常见条目类似：

```toml
[plugins."browser-use@openai-bundled"]
enabled = true

[plugins."chrome@openai-bundled"]
enabled = true

[plugins."computer-use@openai-bundled"]
enabled = true
```

如果是 HyperFrames 这类 curated marketplace 插件，重点是 marketplace 名称要写对。我们本地验证过的形式是：

```toml
[plugins."hyperframes@openai-curated"]
enabled = true
```

不要写成：

```toml
[plugins."hyperframes@plugins"]
enabled = true
```

插件目录叫什么，不等于 marketplace 名称叫什么。要看 marketplace JSON 里的 `name`。

## Chrome 连不上时检查什么

Chrome 需要三件事：

1. Google Chrome 已安装。
2. Codex Chrome Extension 已安装并启用。
3. Codex native host manifest 已存在。

如果 Chrome 插件出现在 Codex App 里，但 `@Chrome` 还是连不上，先回到 Codex App 的 Chrome 插件 setup / repair 流程，不要手动乱改 native host。

## 如果 `@Chrome` 还是卡住

如果 extension 和 native host 都正常，但 Codex App 连接 Chrome 时仍然卡住，可以检查旧的 `agent-browser`。

先看有没有旧进程：

```bash
ps -axo pid,ppid,comm,args | rg -i 'agent-browser|\.agent-browser'
```

旧状态常见位置：

```text
~/.agent-browser
```

旧全局 skill 可能在：

```text
~/.agents/skills/agent-browser
~/.agents/skills/webapp-testing
~/.codex/skills/agent-browser
~/.codex/skills/webapp-testing
```

确认不再需要旧工具后，可以清理：

```bash
pkill -f 'agent-browser-darwin-arm64' 2>/dev/null || true
rm -rf "$HOME/.codex/skills/agent-browser"
rm -rf "$HOME/.codex/skills/webapp-testing"
rm -rf "$HOME/.agents/skills/agent-browser"
rm -rf "$HOME/.agents/skills/webapp-testing"
rm -rf "$HOME/.agent-browser"
```

如果之前通过 `npx` 跑过 `agent-browser`，它可能还会在 `~/.npm/_npx` 留缓存。只删除实际包含 `agent-browser` 的那个缓存目录，不要直接删整个 `_npx`。

清理后按这个顺序重启：

1. 完整退出 Chrome。
2. 完整退出 Codex App。
3. 先打开 Chrome。
4. 再打开 Codex App。
5. 新开一个 Codex 会话，重新试 `@Chrome`。

## Computer Use 权限

Computer Use 需要 macOS 权限。

如果它能显示但不能操作，去这里检查：

```text
System Settings -> Privacy & Security -> Screen Recording
System Settings -> Privacy & Security -> Accessibility
```

给 Codex 或 Codex Computer Use 相关项授权后，重启 Codex App。

## 常用调用方式

```text
@Browser open http://localhost:3000 and test the login flow.
```

```text
@Chrome open Gmail and check the latest email from Stripe.
```

```text
@Computer open System Settings and check whether Screen Recording is enabled.
```

## 记住这句话

API 登录不是插件不能用的原因。

先走 Codex App 的插件安装流程，再完整重启；如果 Chrome 还卡，再检查旧 browser automation 状态。
