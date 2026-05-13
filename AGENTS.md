# AGENTS.md

Scope: the entire `ganfan-media` repository.

## Role

This repository is the operating workspace for GanFan / SorryCode media operations.
Agents working here act as operating officers: clarify audience, preserve source material,
produce publishable assets, and keep distribution records traceable.

## Entry Point

Start every media task from:

```text
docs/workflows/media-operations-workflow.md
```

Do not use a separate content-production skill. The workflow document is the content-production source of truth.

## Operating Principles

- Use this repo as the entry point for media work; do not start new workflows in `ganfan-nexus`.
- Keep source material, drafts, assets, outputs, and publish logs separated.
- Preserve factual claims and links from source notes; do not invent dates, metrics, screenshots, or official statements.
- For SorryCode public docs, keep the voice beginner-first, agent-first, concrete, and operational.
- Do not commit private credentials, cookies, account tokens, API keys, or provider secrets.
- Local secret files must use `.local.*`, `.env`, or `.secret.*` names and stay ignored.

## Active Workflow Skills

- `ganfan-distribution-agent`: the highest-value automation layer. Use for WeChat rendering/publishing and X Article publishing.
- `ganfan-article-illustrator`: use for X covers, WeChat covers, SorryCode hero images, tutorial screenshots, generated posters, and final image exports.
- `source-research`: use when a package needs verifiable source notes, links, screenshots, current facts, or public/private boundaries.
- `ganfan-the-marveling-explorer`: use only for GanFan personal X voice or technical-humanistic essays, not default SorryCode tutorials.

Community skills are not kept as active workflow skills; install them only when a specific task needs them.

## Standard Article Layout

Create one folder per article or campaign under `articles/`:

```text
articles/YYYY-MM-DD-topic-slug/
├── brief.md
├── sources.md
├── x.md
├── sorrycode.md
├── assets/
│   ├── cover.png
│   └── inline-01.png
├── _work/
│   └── images/
├── outputs/
│   └── wechat/
└── publish.md
```

## Article Rules

- `brief.md` defines audience, angle, funnel target, channels, image need, and factual boundary.
- `sources.md` preserves raw material and private notes; drafts must not invent claims outside sources.
- `x.md` and `sorrycode.md` are channel-ready outputs.
- `assets/` stores only usable article assets, usually `cover.png` and optional body images such as `inline-01.png`.
- `_work/` stores prompts, diagnostics, failed generations, temporary exports, and other process files.
- `publish.md` records target channel, status, URL if available, automation command, metrics, and follow-up notes.
- For X, teach one real thing before linking to SorryCode.
- For SorryCode, provide concrete beginner value, direct steps, and relevant docs/Skills entry points.

## Image Rules

- Do not guess cover dimensions from memory.
- Use `ganfan-article-illustrator/references/channel-image-sizes.md` for channel sizes.
- Generate source images through `sorrycode-image2` when needed.
- Export final files with exact channel presets before publishing.
- Images are optional; use them only as a cover hook or when screenshots help the user act.

## Git Rules

- Commit coherent operational units: one workflow migration, one article package, or one publishing automation change.
- Do not commit generated caches, dependency folders, local browser profiles, or secret files.
- Before publishing or committing, check `git status --short` and review unexpected binary or credential-like files.
