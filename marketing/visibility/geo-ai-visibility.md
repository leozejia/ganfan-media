# GEO / AI Visibility Strategy

Updated: 2026-05-14

Source inspiration: Tw93, "你不知道的 GEO：AI 可见性的原理、实践与取舍", X Article, 2026-05-01.

## Thesis

GEO is not a new shortcut for traffic. For GanFan / SorryCode, it is an operations discipline:

1. make existing public content discoverable;
2. make each page self-explanatory to search and AI retrieval systems;
3. make project facts easy to cite without guessing;
4. measure whether outside answers describe us correctly.

This belongs in media operations because the work is mostly content structure, source-of-truth maintenance, indexing hygiene, and recurring answer-quality checks.

## What We Optimize For

- Accurate brand and product descriptions in ChatGPT, Claude, Perplexity, Google, Bing, and similar answer surfaces.
- Search-indexed public pages with clear titles, canonical URLs, and useful snippets.
- AI-readable overview files such as `llms.txt`, backed by normal human-readable pages.
- Project pages that contain enough context to be cited independently.
- Third-party mentions that point to the right canonical pages.

## What We Do Not Optimize For

- Producing garbage pages to chase AI citation volume.
- Hiding prompts in HTML comments.
- Returning different content to crawlers and humans by User-Agent.
- Adding non-standard AI meta tags that no major platform officially supports.
- Treating JSON-LD as a magic layer when the same facts are absent from visible page content.
- Spending a week on GEO changes before the product/docs themselves are strong.

## Baseline Stack

Every important public site should have:

- `robots.txt` with crawler categories reviewed explicitly.
- `sitemap.xml` submitted to Google Search Console and Bing Webmaster Tools.
- IndexNow configured where the stack supports it.
- `llms.txt` at the root when the site has durable docs or project pages.
- Human-readable overview pages that explain what the site/project is.
- Project-specific knowledge pages for core products.
- Canonical URLs that avoid duplicate or ambiguous versions of the same content.

## Crawler Policy

Separate crawler intent instead of treating all AI crawlers as one switch.

Allow search/retrieval crawlers when visibility is desired:

- `OAI-SearchBot`
- `Claude-SearchBot`
- `PerplexityBot`

Allow user-triggered crawlers when users paste our URLs into AI tools:

- `ChatGPT-User`
- `Claude-User`
- `Perplexity-User`
- `Google-Agent`

Block or restrict training crawlers only when the public-content policy calls for it:

- `GPTBot`
- `ClaudeBot`
- `Meta-ExternalAgent`
- `CCBot`

Treat opt-out signals separately:

- `Google-Extended`
- `Applebot-Extended`

Review noisy or undeclared crawlers case by case, especially if logs show load or scraping problems.

## `llms.txt` Policy

Use `llms.txt` as a concise Markdown map, not as a marketing brochure.

It should answer:

- What is this site?
- Who maintains it?
- What are the key canonical pages?
- Which docs or project pages should AI systems read first?
- Which related GanFan / SorryCode sites should be connected?

For larger knowledge surfaces, consider `llms-full.txt` as a fuller readable digest. Keep it useful and bounded; the point is not to dump the whole site.

## Project Knowledge Pages

Each core project needs a self-contained page. A model should not have to infer the product from a changelog, README fragment, or article archive.

Minimum content:

- one-line positioning;
- who it is for;
- problems it solves;
- core features;
- common use cases;
- comparison or differentiation;
- install, usage, or next action;
- canonical docs and evidence links;
- last updated date.

Prefer natural URLs such as `/projects/sorrycode` or `/docs/runtime/codex` over opaque IDs.

## Measurement

Measure answer quality, not only clicks.

Monthly checks should ask:

- Can Google and Bing find the canonical page?
- Does ChatGPT describe the project accurately when asked directly?
- Does Perplexity cite the right page?
- Does Claude summarize the URL correctly when the user provides it?
- Are outdated names, domains, or old product claims still appearing?
- Which missing source page would reduce hallucination the most?

Record recurring problems as page fixes, not prompt hacks.

