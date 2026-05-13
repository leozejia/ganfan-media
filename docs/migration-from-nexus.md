# Migration From GanFan Nexus

Updated: 2026-05-09

## Decision

`ganfan-media` is now the standalone operating repository for media work.
The old `ganfan-nexus/mantle/media_substrate` path is retired.

## Migrated Capabilities

- Content production skills from `skills/`
- Distribution automation from `skills/ganfan-distribution-agent/`
- Publishing profiles from `channels/profiles/`
- Reusable media assets from `assets/`
- Knowledge vault material from `ganfan-knowledge-vault/`

## New Entry Point

Agents and operators should start in:

```text
/Users/zejiawu/Projects/Project-Atlas/ganfan-media
```

## Follow-Up

- Connect the new repository to GitHub.
- Keep future article packages under `articles/`.
- Do not add new media files back to `ganfan-nexus/mantle/media_substrate`.
