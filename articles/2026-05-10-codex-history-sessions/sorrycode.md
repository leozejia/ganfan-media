# Codex 换 provider 后，旧 session 找不到了怎么办

你切过 API provider、base URL，或者重新跑过一键配置后，可能会遇到一个问题：Codex 还能启动，但之前做了一半的 session 找不到了。

这时候先不要重开项目。很多 session 还在本机，只是当前入口没有把它们显示出来。`codex-history` 解决的就是这件事：找到本机 Codex 历史 session，然后继续 `resume`。

## 两步找回旧 session

第一步，列出本机历史 sessions：

```bash
npx --yes codex-history@latest list
```

这里的 `npx` 是临时运行 npm 上的工具包，不会把它安装进你的项目。`--yes` 是跳过 npm 的确认提示。`list` 是明确告诉工具列出历史会话。

你会看到最近的 Codex sessions。输出里会带上 session id、项目路径、provider、标题，还会给出可以直接复制的命令：

```bash
codex resume SESSION_ID
```

第二步，复制这条命令运行：

```bash
codex resume SESSION_ID
```

`SESSION_ID` 换成你在列表里看到的真实 id。

## 不想复制 id，就直接选

如果你只是想从列表里选一个恢复，用这个：

```bash
npx --yes codex-history@latest resume --pick
```

它会打开一个选择器。选中目标 session，按 Enter，工具会自动调用：

```bash
codex resume SESSION_ID
```

## session 太多时怎么找

按关键词搜标题、路径、第一条用户消息或 session id：

```bash
npx --yes codex-history@latest list --query sorrycode
```

搜索后直接恢复：

```bash
npx --yes codex-history@latest resume --pick --query sorrycode
```

按项目路径筛选：

```bash
npx --yes codex-history@latest resume --pick --cwd labs/sorrycode
```

按 provider 筛选：

```bash
npx --yes codex-history@latest resume --pick --provider openai
```

如果你是因为切换 provider 后找不到历史 session，先看有哪些 provider 出现在本机历史里：

```bash
npx --yes codex-history@latest providers
```

## 找不到时打开 debug

如果列表是空的，或者你怀疑它读错了 Codex 状态库，运行：

```bash
npx --yes codex-history@latest list --debug
```

它会打印当前选中的数据库、扫描到的候选数据库，以及每个数据库是否兼容。默认会从这里找：

```text
~/.codex
```

如果你知道状态库在哪，可以手动指定：

```bash
npx --yes codex-history@latest list --db ~/.codex/state_5.sqlite
```

也可以用环境变量：

```bash
CODEX_STATE_DB=~/.codex/state_5.sqlite npx --yes codex-history@latest list
```

## fork 是什么

`resume` 是回到原来的 session。

`fork` 是从一个历史 session 复制出一份新上下文继续做，适合你想保留原来的分支，同时试一个新方向：

```bash
npx --yes codex-history@latest fork --pick
```

它最后调用的是：

```bash
codex fork SESSION_ID
```

## 它不会做什么

`codex-history` 只读本机 Codex 状态库，不会写入 Codex 的 SQLite 数据库，也不会上传你的 session 内容。

它不能恢复远端已经不存在的东西，也不是 token 或费用统计工具。它只解决一个具体问题：本机明明有历史 session，但你现在找不到入口。

## 常用命令

```bash
# 列出最近 sessions
npx --yes codex-history@latest list

# 选择一个 session 恢复
npx --yes codex-history@latest resume --pick

# 按关键词搜索后恢复
npx --yes codex-history@latest resume --pick --query sorrycode

# 按项目路径搜索后恢复
npx --yes codex-history@latest resume --pick --cwd labs/sorrycode

# 查看 provider 分布
npx --yes codex-history@latest providers

# 查看数据库发现细节
npx --yes codex-history@latest list --debug
```

## 开源地址

```text
https://github.com/leozejia/codex-history
```

```text
https://www.npmjs.com/package/codex-history
```
