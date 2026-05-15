# GanFan Media

GanFan Media is the operating workspace for GanFan / SorryCode content packages, source collection, article assets, and multi-channel distribution.

## Start Here

Agents and operators should start from:

```text
docs/workflows/media-operations-workflow.md
```

The root `AGENTS.md` defines repository-level operating rules.

## What Lives Here

- `articles/` — one folder per article or campaign package.
- `skills/ganfan-distribution-agent/` — WeChat and X Article publishing automation.
- `skills/ganfan-article-illustrator/` — image planning, generation coordination, and channel exports.
- `skills/source-research/` — factual source collection and public/private boundaries.
- `channels/` — publishing profiles and platform defaults.
- `marketing/` — long-lived SEO, GEO, and AI visibility strategy for operations.
- `ganfan-knowledge-vault/` — migrated knowledge vault and long-term source material.
- `assets/` — reusable media assets.
- `docs/` — strategy, workflow, and migration notes.

## Default Flow

1. Create `articles/YYYY-MM-DD-topic-slug/`.
2. Write `brief.md`.
3. Preserve source facts in `sources.md`.
4. Write channel-ready drafts in `x.md` and `sorrycode.md`.
5. Use `ganfan-article-illustrator` only if image assets are useful or required; visual decisions go in `visual.md`, selected delivery files go in `assets/`, and process files go in `_work/visual-runs/`.
6. Use `ganfan-distribution-agent` for WeChat or X Article publishing.
7. Record status and links in `publish.md`.
8. Run `scripts/validate-visual-structure.sh` before committing visual workflow changes.
