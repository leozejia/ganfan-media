# Tuzi Runtime Reference

仅在以下场景读取本文件：

- 修改图像 provider 或模型选择
- 排查生图失败、鉴权失败、返回空结果
- 核对当前 runtime 支持的尺寸能力

正常 Stage 3 配图执行时，不要默认加载本文件。

## API 契约

- Endpoint: `https://api.tu-zi.com/v1/images/generations`
- Method: `POST`
- Header:
  - `Content-Type: application/json`
  - `Authorization: Bearer {TUZI_API_KEY}`

## API Key 读取优先级

1. 环境变量 `TUZI_API_KEY`
2. `$HOME/.openclaw/.env`
3. `${GANFAN_NEXUS_HOME}/.env.local`
4. 项目级 `.env`

## 推荐模型

- 默认/推荐：`gemini-3.1-flash-image-preview`
- 2K：`gemini-3-pro-image-preview-2k`
- 4K：`gemini-3-pro-image-preview-4k`

## 常见尺寸

这些是 provider 能力层的常见尺寸，不是 workflow 常规交互项：

- 宽幅头图：`16:9`
- 常规正文配图：`4:3`
- 竖版封面：`3:4`
- 详情图：`4:5`
- 全景横图：`1:8`
- 竖长图：`8:1`

## 常见故障

- 把域名写成 `tuzi.ai`：错误，必须是 `tu-zi.com`
- 没有鉴权：优先检查 `TUZI_API_KEY` 与本地 `.env` 读取路径
- 结果带文字、水印、logo：先检查负面提示和风格 YAML，再决定是否重试
