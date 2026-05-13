# Visual Style Registry

Updated: 2026-05-09

Use this registry before writing a cover or image prompt.

## Active styles

| Style | File | Use when |
| --- | --- | --- |
| Big-character poster | `big-character-poster.md` | X hooks, tutorial covers, hot tools, failure fixes, sharp concepts. Default for SorryCode/X cover hooks. |
| Screenshot-led tutorial | `screenshot-led-tutorial.md` | A user needs to see where to click, what is grey, what success looks like, or what UI state changed. |
| Editorial illustration | `editorial-illustration.md` | Long essays, personal-IP articles, abstract technology narratives, or visual metaphors without heavy text. |
| Minimal poster | `minimal-poster.md` | Calm premium covers, simple conceptual docs, or cases where one object and strong whitespace are enough. |

## Default decision

- For X/SorryCode tutorial hooks: start with `big-character-poster.md`.
- For operational tutorials with UI proof: use `screenshot-led-tutorial.md`.
- For GanFan personal essays: use `editorial-illustration.md` or `minimal-poster.md`.
- If exact Chinese typography matters and generation fails, generate a background and apply deterministic typography later.

## Archived styles

Older YAML styles live in `archive/`. They are reference material only. Do not route to them by default unless the operator explicitly asks for that older style.
