---
name: ganfan-distribution-agent
description: Execute GanFan / SorryCode publishing automation. Use for WeChat rendering/publishing, WeChat API draft creation, X Article inspection, X Article browser publishing, or any task that touches fragile platform distribution. This is the authoritative skill for publishing commands, browser profile rules, and distribution evidence.
---

# GanFan Distribution Agent

## Role

This skill owns the fragile publishing layer.

Use it when the task involves:

- rendering WeChat HTML;
- saving a WeChat draft through browser automation;
- creating a WeChat draft through API mode;
- inspecting or publishing an X Article;
- choosing the correct automation Chrome profile;
- proving whether something was saved, previewed, or published.

Content production lives in `docs/workflows/media-operations-workflow.md`. Image production lives in `ganfan-article-illustrator`.

## Current local truth

- WeChat HTML render:

```bash
npm run render:wechat -- <sorrycode.md> [--theme <default|grace|simple|modern|magazine>] [--output <path>]
```

- WeChat browser publishing:

```bash
npm run publish:wechat -- --markdown <sorrycode.md> [--theme <default|grace|simple|modern|magazine>] [--color <hex>] [--submit]
```

- WeChat API draft:

```bash
npm run publish:wechat:api -- <article.md|article.html> [--theme <default|grace|simple|modern|magazine>] [--color <hex>]
```

- X Article browser publishing:

```bash
npm run publish:x:article -- <sorrycode.md> [--cover <path>] [--title <text>] [--submit]
```

- X Article structure inspection:

```bash
npm run inspect:x:article -- <sorrycode.md> [--html-only] [--save-html <path>]
```

## Profiles

- WeChat preferences: `channels/profiles/wechat.yaml`
- X preferences: `channels/profiles/x.yaml`
- Local WeChat secrets: `channels/profiles/wechat.local.env`

Never commit `.local.env` or browser session secrets.

## Browser rule

X and WeChat use one dedicated Chrome profile with remote debugging enabled. Do not assume the operator's daily Chrome can be controlled.

Default profile:

```text
.runtime/opencli/browser-profile
```

Default behavior:

1. attach to an existing remote-debugging Chrome if it is already running;
2. otherwise launch Chrome with the dedicated publishing profile and `--remote-debugging-port=56888`;
3. leave the browser open after automation so the operator can inspect.

Daily Chrome usually runs without remote debugging, and recent Chrome builds may not expose the debug port reliably when launched against the normal default profile. Use a dedicated publishing profile unless the operator explicitly accepts that risk.

Use `GANFAN_SHARED_CHROME_PROFILE_PATH`, `channels/profiles/x.yaml`, or `channels/profiles/wechat.yaml` only when the operator explicitly wants a different publishing profile.

## Evidence rule

Do not claim “published”, “draft saved”, or “preview ready” without evidence from logs or the platform UI.

Record the command and result in the package `publish.md`.

## References

Read only what is needed:

- `references/wechat-runtime.md` for WeChat automation details.
- `references/x-article-runtime.md` for X Article automation details.
- `references/platform-routing.md` for platform ownership.
