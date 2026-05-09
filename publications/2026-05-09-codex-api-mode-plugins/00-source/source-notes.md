# Source Notes

## Source

- Local source: `/Users/zejiawu/Projects/Project-Atlas/labs/mypromptist/docs/operations/codex-plugins.md`
- Updated: 2026-05-09

## Problem

Codex App can log in through API mode, but users may think plugins are unavailable or broken. The actual problem is usually setup path and stale local automation state.

## Verified Core Points

- Browser, Chrome, Computer Use, and HyperFrames are different plugins / capabilities.
- Browser is for Codex in-app browser and local web QA.
- Chrome is for the user's real Chrome profile and logged-in web pages.
- Computer Use is for native macOS UI actions.
- HyperFrames is for HTML-based video composition and motion design.
- Chrome should be installed through Codex plugin setup flow, not just by opening Chrome Web Store.
- Chrome plugin needs the Codex Chrome Extension and native host.
- Codex App may need a full quit / reopen after plugin changes.
- Curated plugins such as HyperFrames need the correct marketplace name in config. In this local setup the key is `hyperframes@openai-curated`.
- If `@Chrome` hangs after correct extension/native host setup, stale old `agent-browser` daemons or `~/.agent-browser` state can interfere.

## Public Boundary

Can mention:

- API mode can still use plugins.
- Use Codex plugin setup flow.
- Restart Codex App after enabling plugins.
- Check stale old browser automation only if Chrome still hangs.

Avoid:

- Overexplaining private local paths unless in SorryCode details.
- Presenting region fallback / Chrome policy as first-line public advice.
- Claiming official behavior not verified by public docs.

## X Core Message

If you use Codex App in API mode and plugins look unavailable, don't treat API login as the limitation. Install Browser / Chrome / Computer Use from Codex's plugin flow, restart Codex App, and use `@Chrome` only after Chrome extension + native host are installed. If it still hangs, clean stale old agent-browser state.
