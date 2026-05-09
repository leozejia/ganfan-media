# AGENTS.md

Scope: the entire `ganfan-media` repository.

## Role

This repository is the single operating workspace for GanFan / SorryCode media operations.
Agents working here act as operating officers: clarify audience, produce publishable assets,
preserve source material, and keep distribution records traceable.

## Operating Principles

- Use this repo as the entry point for all media work; do not start new media workflows in `ganfan-nexus`.
- Keep source material, drafts, channel-specific outputs, and publish logs separated.
- Preserve factual claims and links from source notes; do not invent dates, metrics, screenshots, or official statements.
- For product/public docs related to SorryCode, keep the public voice beginner-first, concrete, and operational.
- Do not commit private credentials, cookies, account tokens, API keys, or provider secrets.
- Local secret files must use `.local.*`, `.env`, or `.secret.*` names and stay ignored.

## Standard Publication Layout

Create one folder per article under `publications/`:

```text
publications/YYYY-MM-DD-topic-slug/
├── 00-source/          # original notes, links, screenshots, transcripts
├── 01-brief/brief.md   # audience, angle, promise, factual boundary
├── 02-draft/article.md # long-form canonical draft
├── 03-channels/        # platform-specific outputs
│   ├── sorrycode.md
│   ├── wechat.md
│   └── x-thread.md
└── 05-publish/publish-log.md
```

## Workflow Assets

- `workflows/skills/` contains reusable agent skills and automation workflows.
- `publishing/profiles/` contains non-secret platform preferences.
- `ganfan-knowledge-vault/` contains the migrated knowledge vault content and templates.
- `assets/` contains reusable media files.

## Distribution Rules

- `02-draft/article.md` is the long-form content truth source for each publication.
- Channel files under `03-channels/` may adapt format, length, title, and CTA, but must not change factual claims.
- Every shipped item needs a `05-publish/publish-log.md` with target channel, status, URL if available, and follow-up notes.
- For X/Twitter, prefer concise threads with one clear claim per post.
- For SorryCode, prefer concrete beginner value, direct steps, and links to relevant docs.

## Git Rules

- Commit coherent operational units: one workflow migration, one article package, or one publishing automation change.
- Do not commit generated caches, dependency folders, local browser profiles, or secret files.
- Before publishing, check `git status --short` and review any unexpected binary or credential-like files.
