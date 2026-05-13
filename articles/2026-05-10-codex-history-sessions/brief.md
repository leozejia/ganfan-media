# Brief

## Audience

Codex CLI users who switched API providers, base URLs, or runtime setups and suddenly cannot find old sessions in the normal Codex history / resume flow.

## Reader Problem

The user does not care about session databases, providers, or analytics. The immediate problem is: an old Codex session seems gone, but the work context may still be stored locally. They need a short path to find the session id and run `codex resume`.

## X Promise

Give the shortest usable answer: run `npx --yes codex-history@latest list`, find the session id, then run `codex resume SESSION_ID`. Mention `resume --pick` for users who want a picker.

## SorryCode Action

Publish a beginner-first tutorial for recovering local Codex sessions. Start from the lost-session scenario, then show the two-step recovery path. Put filters, provider counts, debug, fork, and safety model after the core path.

## Factual Boundary

Facts verified from local repository `/Users/zejiawu/Projects/Project-Atlas/labs/codex-history` on 2026-05-10:

- npm package name: `codex-history`
- current npm version: `0.1.0`
- Node engine: `>=20`
- CLI entry: `codex-history`
- no install needed: `npx --yes codex-history@latest list`
- reads local Codex SQLite state databases under `~/.codex` by default
- supports `--query`, `--cwd`, `--provider`, `--limit`, `providers`, `resume`, `fork`, `--pick`, `--db`, `--debug`, `CODEX_STATE_DB`, `CODEX_HOME`, `CODEX_BIN`
- `resume` calls local Codex CLI as `codex resume SESSION_ID`
- `fork` calls local Codex CLI as `codex fork SESSION_ID`
- safety boundary: reads Codex local state, does not write Codex SQLite database

## Public Boundary

Do not expose private local session ids from this machine. Use placeholders such as `SESSION_ID` in public docs.

## Channels

- X article or post
- SorryCode tutorial / tools page

## Image Decision

No image required for the first version. This tutorial is command-first. If a cover is needed later, use one `assets/cover.png` only.
