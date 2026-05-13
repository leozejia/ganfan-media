# SorryCode Content Funnel v1

Updated: 2026-05-09

## Core strategy

SorryCode content should not feel like an ad. Each public piece should solve one real problem first, then make SorryCode the lowest-friction next step.

Principle: X builds trust; SorryCode lowers action cost.

## X / Twitter

X should teach one concrete thing before asking for a click.

Use X for:

- a sharp hook from a real user problem;
- the key judgment or shortest working path;
- one low-pressure pointer to the full SorryCode guide.

Avoid:

- long troubleshooting trees;
- too many commands;
- multiple CTAs;
- generic summaries;
- images that do not help the click or the action.

## SorryCode

SorryCode should carry the complete action path.

Use SorryCode for:

- copy-ready commands;
- beginner steps;
- troubleshooting;
- Skills installation and agent-first instructions;
- long-lived public documentation.

For agent-executable tutorial docs, start with a Tips block:

```text
如果你不想看细节，点击右上角「复制 Markdown」，把全文发给你的 agent，比如 Codex 或 Claude Code，让它帮你检查并配置。
```

Then provide a copy-ready instruction users can paste into their agent.

Do not add this block when the tutorial is primarily a human action path, such as choosing an item from an interactive picker, copying a session id, reading a concept, or making a judgment call. In those cases, start directly with the problem and the command.

## Content columns

- 小白踩坑：real user problems and fixes.
- Agent 工作台：Codex, Claude Code, Apps, VSCode, Browser, Chrome, Computer Use, HyperFrames.
- Skills 实战：what a skill does, how to install it, how to ask the agent to use it.
- 新手村任务：generate first image, make first PPT, write a webpage, build a small game, read a project.
- 案例复盘：community problems turned into reusable public guidance.

## Image strategy

Images are optional. Use them only when they improve click-through or help the user act.

Default X visual strategy is a big-character poster: one strong Chinese title, one visual metaphor, high readability. It should not look like a generic SaaS UI collage.

Use `ganfan-article-illustrator` for all article image planning and export. The illustrator owns channel sizes and should consult `references/channel-image-sizes.md`.

## Success standard

A piece works when:

1. X readers learn something useful without feeling baited.
2. Users who want to act naturally continue to SorryCode.
3. SorryCode reduces the number of steps a beginner must understand.
4. The article becomes reusable public documentation.
