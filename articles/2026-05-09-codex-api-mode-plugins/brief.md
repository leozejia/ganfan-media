# Brief

## Audience

People using Codex App with API login who want plugins such as Browser, Chrome, Computer Use, or HyperFrames to work.

## Promise

After reading the X post, readers should have the shortest working answer: edit `~/.codex/config.toml`, add the plugin entries, fully restart Codex App, then call plugins from the input box. No abstract explanation first.

## X Core Point

The hook can mention hot plugin names, but the post must be self-contained: here is the config block, here is the restart step, here is how to verify. SorryCode carries the long explanation and edge cases.

## SorryCode Action

SorryCode should be a long-lived manual plugin configuration guide. It should start with an agent-first tip, then show where `~/.codex/config.toml` is, what to paste, how to restart, how to verify, and only then cover `/plugins`, HyperFrames naming, Chrome extension/native host, Chrome usage notes, permissions, and stale browser automation tools.

## Image Decision

Image needed. The hook depends on a visible contrast: "left sidebar plugin entry is grey" versus "the Codex input box can show available plugins after setup." Use one X Article cover and one optional body image, not multiple tutorial screenshots. Visual decisions live in `visual.md`; selected delivery assets live under `assets/`.
