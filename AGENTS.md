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

## Default Operating Strategy

- X builds trust; SorryCode lowers action cost.
- Each X article must teach one real thing before it points to SorryCode.
- SorryCode carries copy-ready commands, beginner steps, troubleshooting, and Skills installation.
- Use one low-pressure CTA per article; do not turn every post into an ad.
- Images are optional. Use them only as a cover hook or when a screenshot helps the user act.
- When an article needs generated visuals, use `sorrycode-image2` and save outputs under the publication folder.

## Standard Publication Layout

Create one folder per article under `publications/`:

```text
publications/YYYY-MM-DD-topic-slug/
├── brief.md       # audience, angle, promise, factual boundary
├── sources/       # original notes, links, screenshots, transcripts
├── drafts/        # channel-ready drafts
│   ├── x.md
│   └── sorrycode.md
├── assets/        # optional cover, screenshots, generated images
├── outputs/       # rendered channel artifacts
└── publish.md     # status, links, metrics, feedback
```

## Lightweight Workflow

Default workflow docs live in:

- `docs/strategy/sorrycode-content-funnel-v1.md`
- `docs/workflows/lightweight-article-workflow.md`

Use the standard publication layout for all ordinary media work. If a project needs
deep research, WeChat rendering, or automation, design that package explicitly
instead of reviving the old numbered article layout.

## Workflow Assets

- `skills/` contains reusable agent skills and automation workflows.
- `distribution/profiles/` contains non-secret platform preferences.
- `ganfan-knowledge-vault/` contains the migrated knowledge vault content and templates.
- `assets/` contains reusable media files.

## Distribution Rules

- `brief.md` defines the audience, angle, funnel target, and factual boundary.
- `sources/` preserves raw material and private notes; drafts must not invent claims outside these sources.
- `drafts/x.md` and `drafts/sorrycode.md` are the channel-ready outputs.
- Every shipped item needs a `publish.md` with target channel, status, URL if available, and follow-up notes.
- For X/Twitter, prefer concise threads with one clear claim per post.
- For SorryCode, prefer concrete beginner value, direct steps, and links to relevant docs.

## Git Rules

- Commit coherent operational units: one workflow migration, one article package, or one publishing automation change.
- Do not commit generated caches, dependency folders, local browser profiles, or secret files.
- Before publishing, check `git status --short` and review any unexpected binary or credential-like files.
