# TOOLS.md

- Local runtime truth: `ganfan-nexus/docs/operations/hermes-agent/README.md`, `ganfan-nexus/.runtime/hermes/profiles/marketing/`, `ganfan-nexus/.runtime/opencli/browser-profile/`
- Runtime decides tool and skill availability; this file records only local operating preferences.
- Prefer existing skills, workflows, and content assets before ad-hoc wrappers or copy-paste scripts.
- For webpage research, prefer native `web_fetch`; use browser automation only when interaction, login, screenshot, dynamic DOM, or fetch failure requires it.
- Long-form drafting should use explicit writing subagents instead of silent model swaps inside the main thread.
- Subagents inherit only `AGENTS.md` and `TOOLS.md`; pass missing campaign or product context explicitly.
