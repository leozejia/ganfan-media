# Visual

## Image Decision

Image required for X Article publishing.

The visual job is to make the plugin-state contrast visible before the reader
opens the article: a sidebar plugin entry can look unavailable, while the Codex
input box can expose available plugin actions after setup.

## Pattern

Internal candidate: proof screenshot / tutorial proof.

This is not yet a public Open Visual Grammar pattern. Treat it as an
article-level visual decision, not reusable public grammar.

## Visual Score

```text
Viewer: Codex App API-login user trying to enable plugins
Job: Show that the visible sidebar state is not the whole plugin story
Pattern: internal proof screenshot candidate
First read: plugin unavailable vs plugin available after setup
Tension: grey sidebar entry vs working input-box tools
Metaphor: direct UI contrast
Composition: one cover hook plus optional inline proof image
Density: medium
Temperature: practical
Runtime: generated cover plus final deterministic export
Forbidden: fake credentials, private config paths, unreadable UI clutter
```

## Targets

- X Article cover: `assets/cover.png`, `1500x600`
- Optional body image: `assets/inline-01.png`

## Selected Assets

- `assets/cover.png`
- `assets/inline-01.png`

## Run Policy

New visual runs must use:

```text
_work/visual-runs/<run-id>/
```
