# GanFan Media

GanFan Media is the operating workspace for GanFan / SorryCode content production,
source collection, publication packaging, and multi-channel distribution.

## What Lives Here

- `publications/` — one folder per article or campaign package.
- `workflows/` — reusable content, illustration, and distribution skills.
- `publishing/` — non-secret platform profiles and publishing preferences.
- `ganfan-knowledge-vault/` — migrated knowledge vault and long-term source notes.
- `assets/` — reusable media assets.
- `sources/` — shared raw source collections not tied to one publication yet.
- `ops/` — operational notes, account/process runbooks without secrets.
- `docs/` — architecture and governance notes for this media workspace.

## Default Article Flow

1. Collect source material in `publications/YYYY-MM-DD-topic/00-source/`.
2. Write the angle and promise in `01-brief/brief.md`.
3. Produce the canonical draft in `02-draft/article.md`.
4. Adapt channel versions in `03-channels/`.
5. Record publishing status in `05-publish/publish-log.md`.

## Migration Note

This repository replaces the previous media substrate under
`ganfan-nexus/mantle/media_substrate`. New media work should start here.
