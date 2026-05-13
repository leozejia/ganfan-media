# Codex 换 provider 后，旧 session 找不到了怎么办

很多人切过 API provider、base URL，或者换过一键配置后，会遇到一个很烦的问题：Codex 还能用，但之前做了一半的 session 不见了。

先别急着重开。很多情况下，旧 session 还在本机的 Codex 状态库里，只是你在当前入口里没看到。

直接跑：

```bash
npx --yes codex-history@latest list
```

它会列出本机最近的 Codex sessions，并给出类似这样的恢复命令：

```bash
codex resume SESSION_ID
```

复制这条命令运行，就能回到那个历史 session。

如果 session 很多，可以直接用选择器：

```bash
npx --yes codex-history@latest resume --pick
```

如果记得项目名或关键词：

```bash
npx --yes codex-history@latest resume --pick --query sorrycode
```

如果只想找某个项目目录下的 session：

```bash
npx --yes codex-history@latest resume --pick --cwd labs/sorrycode
```

它做的事情很简单：只读你本机的 `~/.codex` 状态库，找到 session id，然后调用本机 Codex CLI：

```bash
codex resume SESSION_ID
```

找不到时再加 debug：

```bash
npx --yes codex-history@latest list --debug
```

开源仓库：
https://github.com/leozejia/codex-history

完整教程我放在 SorryCode，重点讲换 provider 后如何找回历史 sessions：

https://sorrycode.com/docs/tools/codex-history
