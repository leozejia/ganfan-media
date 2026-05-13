---
name: source-research
description: Collect verifiable facts for GanFan / SorryCode article packages. Use when an article, thread, tutorial, or public doc needs source notes, links, screenshots, or fact boundaries before drafting. This skill only produces source material and factual boundaries; it must not write the angle, opinion, or final article.
---

# Source Research

## Role

Use this skill to build the factual base for a article package.

The output is a source file, not a draft. Keep judgment and writing decisions for the workflow owner.

## Inputs

- Article folder path.
- Topic or question to verify.
- Known links, screenshots, local files, or user notes.
- Public/private boundary if the material includes internal context.

## Output

Write one of these files under the article folder:

```text
sources.md
fact-pack.md
```

Use `references/fact-pack-template.md` when the topic has multiple sources or claims.

## Workflow

1. Read `brief.md` if it exists.
2. Collect facts from the provided materials first.
3. Use available browsing/search tools only when freshness or source attribution matters.
4. Prefer primary sources: official docs, repos, release notes, product pages, standards, or the original author.
5. Record source URL, access date, and what each source supports.
6. Separate verified facts, unverified claims, and private/internal material.
7. Run the checklist in `references/source-quality-checklist.md` before finishing.

## Boundaries

- Do not decide the article angle.
- Do not write marketing copy.
- Do not turn private notes into public claims.
- Do not cite a source for something it does not directly support.
- Do not bind the workflow to one browser tool; use whatever browsing or local-reading capability is available.
