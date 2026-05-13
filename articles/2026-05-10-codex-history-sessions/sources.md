# Sources

## Local Source

- `/Users/zejiawu/Projects/Project-Atlas/labs/codex-history/README.md`
- `/Users/zejiawu/Projects/Project-Atlas/labs/codex-history/README.zh-CN.md`
- `/Users/zejiawu/Projects/Project-Atlas/labs/codex-history/src/index.ts`
- `/Users/zejiawu/Projects/Project-Atlas/labs/codex-history/test/cli.test.js`
- Access date: 2026-05-10

## Public Source Checks

- GitHub repository: `https://github.com/leozejia/codex-history`
- npm package checked with `npm view codex-history name version description repository.url license --json`
- npm result on 2026-05-10: package exists, version `0.1.0`, license `MIT`

## Verified Facts

- `codex-history` is a local Codex CLI companion for listing, searching, resuming, and forking local sessions.
- It discovers compatible Codex state SQLite databases from `~/.codex` unless `--db`, `CODEX_STATE_DB`, or `CODEX_HOME` changes the source.
- It reads the `threads` table and requires columns including `id`, `updated_at`, `model_provider`, `cwd`, `title`, and `first_user_message`.
- The default list output includes recent sessions and prints ready-to-copy examples: `codex resume <id>` and `codex fork <id>`.
- `resume SESSION_ID` validates that the session id exists in the selected local database, then calls `codex resume SESSION_ID`.
- `fork SESSION_ID` validates the id, then calls `codex fork SESSION_ID`.
- `resume --pick` and `fork --pick` allow interactive selection. If only one match exists, the tool executes it directly.
- `--query`, `--cwd`, and `--provider` filter sessions.
- `providers` aggregates local sessions by model provider.
- `--debug` prints database discovery details, including selected database and candidate compatibility.
- Safety boundary: the tool reads local Codex state and does not write to Codex internal SQLite databases.

## Unverified / Avoid

- Do not claim it can restore remote-deleted sessions.
- Do not claim it works for Claude Code or non-Codex runtimes.
- Do not claim it fixes provider routing or account login.
- Do not publish real local session ids.
