# Source Notes

## Source

- Local source: `/Users/zejiawu/Projects/Project-Atlas/labs/mypromptist/docs/operations/codex-plugins.md`
- Updated: 2026-05-09

## Problem

Codex App can log in through API mode, but the left-sidebar plugin entry may appear disabled / grey. Users may incorrectly conclude that API login cannot use plugins. The useful correction is that Codex remains the main runtime, and plugins can still be wired as capabilities that appear in the input box after the correct install / config path and a full restart.

## Verified Core Points

- Browser, Chrome, Computer Use, and HyperFrames are different plugins / capabilities.
- Codex is the main actor in the story; plugins are capability extensions, not the product itself.
- In API login / gateway login mode, the GUI plugin button can look unavailable, but that should not be framed as "plugins cannot work."
- If a user is reading this fix page, assume the GUI path is already unavailable for them.
- `codex` CLI `/plugins` is not the reliable path for this scenario; the public fix should point to editing `~/.codex/config.toml`.
- The public article should start with an agent-first tip: copy Markdown and ask Codex / Claude Code to read the doc and update local config.
- Browser is for Codex in-app browser and local web QA.
- Chrome is for the user's real Chrome profile and logged-in web pages.
- Computer Use is for native macOS UI actions.
- HyperFrames is for HTML-based video composition and motion design.
- Chrome should be installed through Codex plugin setup flow, not just by opening Chrome Web Store.
- Chrome plugin needs the Codex Chrome Extension and native host.
- Codex Chrome Extension URL: `https://chromewebstore.google.com/detail/codex/hehggadaopoacecdllhhajmbjkdcmajg`.
- Chrome Web Store availability can vary by region / network. Public docs should warn users that "not found" or "not available in this region" does not mean the extension does not exist.
- Codex App may need a full quit / reopen after plugin changes.
- Curated plugins such as HyperFrames need the correct marketplace name in config. In this local setup the key is `hyperframes@openai-curated`.
- Before using Chrome, users should confirm the Codex Chrome Extension is connected.
- Chrome plugin may open a dedicated tab group and can read pages, fill forms, click, and validate across tabs.
- Sensitive actions such as form submission, downloads, or access to personal information should require user confirmation.
- If file upload / download fails, users may need to enable file URL access for the Codex extension in `chrome://extensions/`.
- Current public guidance should target Google Chrome, not assume Edge / Arc / other Chromium browsers are equivalent.
- If `@Chrome` hangs after correct extension/native host setup, stale browser automation tools can interfere. Do not present `agent-browser` as universal; it is one local historical example. Other users may have `browser-use` or other tools.

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

If Codex App plugin setup is unavailable or misleading, the shortest public answer is: edit `~/.codex/config.toml`, add the plugin blocks, fully restart Codex App, and verify from the input box plugin menu. X should include this core operation directly so it does not feel like a bait link. SorryCode should hold the detailed tutorial and troubleshooting.

## Reference Post Pattern

The reference X article by `@Pluvio9yte` works because it is tutorial-first and visually concrete:

- the title names the exact object: `Codex X Chrome 插件配置`
- the first visual is a product-style banner, not a decorative AI image
- the body moves through install, usage, and notes
- screenshots prove where to click and what success looks like

For our article, the sharper hook is the visible conflict between "plugin entry is grey" and "manual config makes plugins appear." The durable SorryCode article should not make Chrome / HyperFrames / Computer Use the long-term thesis; they are current examples. The long-term thesis is manual Codex plugin configuration.
