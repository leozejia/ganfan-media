# Nexus Marketing Workspace Migration

Updated: 2026-05-09

## Decision

GanFan / SorryCode media operations now live in `ganfan-media`.
The latest Nexus marketing agent workspace has been copied into this repository so future operating work starts here.

## Migrated From Nexus

Source path:

```text
ganfan-nexus/org/agent-core/marketing/workspace
```

Destination paths:

```text
ganfan-media/workspace
ganfan-media/workflows/skills
```

## Operating Rule

- Use `workspace/` for the operating officer identity and local working context.
- Use `workflows/skills/` as the canonical reusable skills directory.
- Do not add new marketing or media skills back into `ganfan-nexus`.
