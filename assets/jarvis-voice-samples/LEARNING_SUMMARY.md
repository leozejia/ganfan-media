# 跨语言语音克隆学习总结

## 课题背景

**目标**: 使用 Qwen3-TTS 技术，将英文 Jarvis 音色克隆到中文语音输出

**挑战**: 跨语言音色克隆涉及不同音素体系、韵律特征和声学特性

---

## 一、技术原理

### 1.1 Qwen3-TTS 架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Qwen3-TTS-0.6B-Base                       │
│                    (Voice Cloning Model)                     │
├─────────────────────────────────────────────────────────────┤
│  输入层                                                      │
│    ├── 参考音频 (3-10s) → Speech Tokenizer (12Hz)           │
│    │                    └── 离散码本: audio_codes            │
│    └── 参考文本 → 音素编码                                   │
│                                                                │
│  特征提取层                                                   │
│    ├── Speaker Encoder → x-vector (说话人嵌入)              │
│    │   └── 采样率: 16kHz                                    │
│    └── Prosody Encoder → 韵律特征                            │
│                                                                │
│  生成层 (Dual-Track LM)                                      │
│    ├── 主轨道: 语义内容生成                                   │
│    ├── 副轨道: 声学特征生成                                   │
│    └── 流式输出: <97ms 首包延迟                              │
│                                                                │
│  声码器层                                                    │
│    └── Neural Vocoder → WAV 音频                            │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 克隆模式

| 模式 | 输入 | 输出特征 | 适用场景 |
|------|------|----------|----------|
| **ICL** | 音频 + 文本 + 说话人嵌入 | 保留韵律、语调、语速 | 高质量克隆 |
| **x-vector Only** | 仅说话人嵌入 | 仅保留音色 | 快速克隆 |

---

## 二、实验记录

### 2.1 素材准备

| 阶段 | 素材 | 处理 | 结果 |
|------|------|------|------|
| 初始 | MyInstants 下载 | 原始 12.2s | 质量差 |
| 优化 | 音频分析 → 提取段 | 3.4s 纯净 | 质量提升 |

**音频质量分析**:
```
原始素材:
- 采样率: 16kHz ✅
- 最大振幅: 0.14 ❌ (过低)
- 静音比例: 64.6% ❌ (过多)

优化后:
- 时长: 3.42s ✅
- 最大振幅: 0.95 ✅
- 静音比例: <1% ✅
```

### 2.2 克隆实验

| 实验 | 输入 | 输出 | 结果 |
|------|------|------|------|
| #1 | Jarvis 英文 → 英文 | jarvis_clone_english.wav | ✅ 成功 |
| #2 | Jarvis 英文 → 中文 | jarvis_chinese_crosslingual.wav | ✅ 成功 |

**关键发现**:
- 跨语言克隆在 Qwen3-TTS-0.6B-Base 上可行
- 需要优化素材质量 (音量、静音、时长)
- 参考文本与目标语言不匹配时仍能工作

---

## 三、跨语言克隆技术要点

### 3.1 技术挑战

| 挑战 | 说明 | 解决方案 |
|------|------|----------|
| **音素差异** | 英文音素 ≠ 中文音素 | 使用统一音素表或音素无关的表示 |
| **韵律差异** | 英文语调 vs 中文声调 | 分离韵律和音色特征 |
| **时长差异** | 不同语言音节时长不同 | 时长预测模型独立 |

### 3.2 Qwen3-TTS 的跨语言机制

```
参考音频 (英文)
    ↓
Speech Tokenizer (语言无关的声学表示)
    ↓
Speaker Encoder (提取音色特征 x-vector)
    ↓
语言无关的说话人嵌入
    ↓
目标文本 (中文) + 说话人嵌入
    ↓
Dual-Track LM 生成
    ↓
中文语音 + Jarvis 音色
```

**核心洞察**: 
- Speech Tokenizer 将音频编码为**语言无关的声学码本**
- Speaker Encoder 提取**说话人身份特征** (与语言无关)
- 生成时结合**目标语言文本** + **源语言说话人特征**

---

## 四、关键学习成果

### 4.1 素材质量至关重要

```python
# 优化流程
1. 提取非静音段
   librosa.effects.split(wav, top_db=20)

2. 归一化音量
   wav = wav / max(abs(wav)) * 0.95

3. 控制时长 (3-10s)
   segment = wav[start:end]
```

### 4.2 克隆命令

```bash
# 英文克隆
qwen-tts-clone "Welcome back, sir." \
  jarvis_clean.wav \
  output.wav \
  "Welcome home sir"

# 跨语言克隆 (英文音色 → 中文)
qwen-tts-clone "你好，先生。系统已全面启动。" \
  jarvis_clean.wav \
  output_chinese.wav \
  "Welcome home sir"
```

### 4.3 部署架构

```
~/.openclaw/tools/
├── qwen-tts/                    # 0.6B-CustomVoice
│   └── qwen-tts-generate
└── qwen-tts-base/               # 0.6B-Base (克隆)
    └── qwen-tts-clone

~/Projects/ganfan-nexus/
└── mantle/media_substrate/
    └── assets/jarvis-voice-samples/
        ├── jarvis_clean_3.4s.wav      # 优化素材
        ├── jarvis_clone_optimized.wav  # 英文克隆
        └── jarvis_chinese_crosslingual.wav  # 中文克隆
```

---

## 五、VocalEap 产品应用

### 5.1 技术可行性

✅ **确认**: Qwen3-TTS-0.6B-Base 支持跨语言音色克隆
- 英文 Jarvis 音色 → 中文语音: 可行
- 本地部署 (Mac MPS): 可行
- 实时生成延迟: <100ms (首包)

### 5.2 产品建议

| 功能 | 实现方式 | 优先级 |
|------|----------|--------|
| 英文 Jarvis 语音 | 直接使用克隆 | P0 |
| 中文 Jarvis 语音 | 跨语言克隆 | P0 |
| 用户自定义音色 | 上传音频 → 克隆 | P1 |
| 实时语音合成 | 流式生成 | P2 |

### 5.3 后续优化方向

1. **素材质量**: 获取更纯净的 Jarvis 电影原声
2. **微调模型**: 使用更多 Jarvis 样本微调 Base 模型
3. **韵律控制**: 实现细粒度的语调、语速控制
4. **多语言扩展**: 支持日文、韩文等更多语言

---

## 六、资源清单

### 代码
- 克隆工具: `~/.openclaw/tools/qwen-tts-base/qwen-tts-clone`
- Python API: `qwen_tts.Qwen3TTSModel`

### 素材
- 优化 Jarvis 样本: `jarvis_clean_3.4s.wav` (3.42s, 16kHz)
- 英文克隆结果: `jarvis_clone_optimized.wav`
- 中文克隆结果: `jarvis_chinese_crosslingual.wav`

### 文档
- 技术报告: `ganfan-nexus/infra/tts/README.md`
- 学习总结: `ganfan-nexus/mantle/media_substrate/assets/jarvis-voice-samples/README.md`

---

## 七、关键结论

1. **跨语言音色克隆可行**: Qwen3-TTS-0.6B-Base 成功实现英文音色 → 中文语音
2. **素材质量决定效果**: 音量、静音、时长需严格控制
3. **本地部署可行**: Mac MPS 4GB 显存即可运行
4. **VocalEap 技术路径清晰**: 可直接应用此技术实现 Jarvis 中文语音

---

*学习日期: 2026-02-17*
*课题: 跨语言语音克隆技术调研*
*应用产品: VocalEap*

---

## 八、关键问题修复记录

### 修复 1: 参考文本泄漏问题

**现象**: 每次输出开头都有 "Welcome home sir"

**原因**: ICL 模式下参考文本被模型记忆并混入输出

**解决方案**: 使用 `x_vector_only_mode=True`

```python
prompt = model.create_voice_clone_prompt(
    ref_audio=ref_audio,
    ref_text=ref_text,
    x_vector_only_mode=True  # 只提取音色，忽略参考文本内容
)
```

### 修复 2: 音频时长过短

**现象**: 短文本 → 短音频（仅几秒）

**规律**: 约 2.5-3 个中文字符/秒

**解决方案**: 增加文本量
- 80 中文字符 → 约 30 秒音频
- 示例文本（29.76秒）:
  > "阿里开源，一场被误读的基础设施战争。当我在Hugging Face上看到这组数据的时候，说实话，我愣了一下。四百一十二个模型，六万九千个关注者，一百八十二人的专职团队。这是Qwen在开源社区的现状。作为对比参考，Meta的Llama系列大概一百五十个模型，Mistral约五十个。这不是一个量级的竞争。但这不是重点。重点是我突然意识到：所有人都在讨论Qwen的模型参数，却几乎没有人问一个更本质的问题。"

### 修复 3: 克隆脚本更新

**更新内容**:
1. 集成 `x_vector_only_mode=True` 避免参考文本泄漏
2. 自动检测中文并设置 `language="Chinese"`
3. 支持长文本生成（30秒+）

**更新后的脚本**: `~/.openclaw/tools/qwen-tts-base/qwen-tts-clone`

---

## 九、VocalEap 文章朗读工作流

```python
# 完整工作流示例

def vocal_eap_tts_pipeline(article_text, voice_sample):
    """
    VocalEap TTS 流水线
    
    Args:
        article_text: 文章全文
        voice_sample: 参考音色样本路径
    
    Returns:
        合并后的音频文件路径
    """
    # 1. 文本分段 (每段约80字/30秒)
    segments = split_text(article_text, max_chars=80)
    
    # 2. 逐段生成语音
    audio_files = []
    for i, segment in enumerate(segments):
        output_file = f"/tmp/segment_{i}.wav"
        qwen_tts_clone(
            text=segment,
            ref_audio=voice_sample,
            output_path=output_file,
            ref_text="Welcome home sir"  # 参考文本不影响输出
        )
        audio_files.append(output_file)
    
    # 3. 合并音频
    final_output = "/tmp/full_article.wav"
    concat_audio(audio_files, final_output)
    
    return final_output

# 使用示例
article = "阿里开源，一场被误读的基础设施战争..."
jarvis_voice = "~/Projects/ganfan-nexus/mantle/media_substrate/assets/jarvis-voice-samples/jarvis_clean_3.4s.wav"

output_audio = vocal_eap_tts_pipeline(article, jarvis_voice)
```

---

## 十、新增资源

### 新增素材
- **长文本朗读**: `jarvis_30s_long_reading.wav` (29.76秒)
  - 80字中文 → 约30秒音频
  - 验证了长文本生成可行性

### 更新文档
- **修复后的克隆脚本**: `~/.openclaw/tools/qwen-tts-base/qwen-tts-clone`
- **知识库文档**: 本文档 (LEARNING_SUMMARY.md)

---

*更新日期: 2026-02-17*
*更新内容: 修复参考文本泄漏问题 + 长文本支持*
*核心突破: x_vector_only_mode 模式 + 30秒音频生成*
