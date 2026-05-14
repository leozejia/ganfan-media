# Media Operations Workflow

Updated: 2026-05-09

This is the default workflow for GanFan / SorryCode media work. Use this document as the content-production entry point. Do not use a separate content-production skill.

## Operating model

The repository has three active operating layers:

1. `AGENTS.md` defines how every agent should enter the workspace.
2. This workflow defines how to produce article packages.
3. `ganfan-distribution-agent` handles fragile publishing automation.

Images are executed by `ganfan-article-illustrator`. Reusable visual method
lives in `/Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar`.
Facts are handled by `source-research`. Personal X style can use
`ganfan-the-marveling-explorer` when explicitly appropriate.

## Package layout

Create one folder per article or campaign:

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

## Workflow

### 1. Brief

Write the decision surface before drafting.

`brief.md` should state:

- audience;
- reader problem;
- X promise;
- SorryCode action;
- factual boundary;
- public/private boundary;
- required channels;
- whether image assets are needed.

### 2. Sources

Preserve facts and raw notes in `sources.md`.

Use `source-research` when the package needs external verification, current facts, links, screenshots, or source attribution.

Record:

- original links or local source paths;
- access date when browsing;
- verified facts;
- unverified claims;
- internal-only context that must not appear publicly.

#### X / browser field research

Use X as discussion-field research, not as the default factual authority.

When a topic benefits from X:

- use Chrome or Computer Use in read-only mode to inspect public timelines, search results, lists, and article posts;
- do not like, repost, reply, publish, follow, DM, or change account state during research;
- do not inspect cookies, local storage, DMs, browser profiles, or private account data;
- record the post URL, handle, access date, and what the post supports in `sources.md`;
- separate "public discussion signal" from verified facts;
- use official docs, public repos, release notes, or original source pages for technical claims whenever possible.

If the Chrome plugin path is unavailable and Computer Use is used as a fallback, record that in the source notes.

### 3. Drafts

Write channel-ready drafts directly.

`x.md`:

- teach one real thing;
- include enough core steps to be useful without clicking away;
- keep one low-pressure SorryCode CTA;
- avoid summary-heavy AI phrasing.

`sorrycode.md`:

- start with the concrete action path;
- include a copy-Markdown Tips block only when the doc is suitable for an agent to execute, configure, edit files, or inspect the local environment;
- skip the agent Tips block for docs where the user should make a simple manual decision, copy a session id, read a concept, or choose from an interactive picker;
- include copy-ready commands and verification steps;
- put background and edge cases after the action path;
- do not expose internal accounts, private routing, or unpublished operational details.

Use `ganfan-the-marveling-explorer` only for personal-IP X writing or technical-humanistic essays. Do not use it as the default SorryCode tutorial voice.

### 4. Assets

Images are optional. Use `ganfan-article-illustrator` when the package needs:

- X cover;
- WeChat cover;
- SorryCode docs hero;
- tutorial screenshot;
- generated poster or article visual.

The illustrator skill owns channel size decisions, article asset paths,
visual-score compilation, `sorrycode-image2` generation, and final cropped
exports. Stable visual canons belong in Open Visual Grammar, not in per-article
prompt files.

Do not guess image ratio in article drafts.

Keep `assets/` as the asset surface:

- use `assets/cover.png` when the package needs one default cover;
- use explicit names only when channels need different crops, such as `assets/cover-x-article.png` and `assets/cover-wechat.png`;
- use `assets/inline-01.png`, `assets/inline-02.png` for body images;
- put visual scores, runtime prompts, API diagnostics, rejected images, and temporary exports under `_work/images/`;
- drafts and publish logs should reference `assets/`, not `_work/`.

### 5. Publish

Use `publish.md` as the source of truth for publishing status.

Record:

- target channel;
- current status;
- command used, if automation ran;
- URL after article;
- metrics and feedback;
- follow-up tasks.

Use `ganfan-distribution-agent` for WeChat and X Article publishing. This is the highest-friction automation layer and should remain skill-driven.

## Active skills

| Skill | Role |
| --- | --- |
| `ganfan-distribution-agent` | Publish and render via tested WeChat / X automation paths. |
| `ganfan-article-illustrator` | Plan, generate, and export article visuals. |
| `source-research` | Collect verifiable facts and source boundaries. |
| `ganfan-the-marveling-explorer` | Apply GanFan personal X writing style when explicitly useful. |

Community skills are not part of the default workflow; install or vendor them only when a specific task needs them.

## Image size policy

Do not decide dimensions from memory. `ganfan-article-illustrator/references/channel-image-sizes.md` is the operational size table.

Current defaults:

- X Article cover: `1500x600` (`5:2`).
- X single-image post / X card cover: `1200x675`.
- WeChat cover: `900x383`.
- WeChat share thumbnail: `500x500`.
- SorryCode docs hero: `1200x675`.

Generate a larger source image when useful, then crop/export to the exact channel size.
