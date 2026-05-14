# Visibility Indexing Checklist

Updated: 2026-05-14

Use this checklist for every public site, docs area, launch page, or major evergreen content hub.

## Before Launch

- Confirm the canonical domain and canonical URL pattern.
- Confirm the public name and one-line positioning.
- Confirm private details are not present in source pages, examples, screenshots, or metadata.
- Confirm each important page has a clear title, H1, description, and visible summary.
- Confirm the page can be read without client-only rendering failures.
- Confirm links from the main site, docs, and relevant articles point to the canonical URL.

## Site Files

- Add or review `robots.txt`.
- Add or review `sitemap.xml`.
- Add `llms.txt` when the site has durable docs, projects, or structured knowledge.
- Consider `llms-full.txt` only when there is enough stable content to summarize.
- Add Markdown alternatives only when they serve the same content humans can see.
- Avoid crawler-only pages or User-Agent-specific content.

## Search Submission

- Verify the domain in Google Search Console.
- Submit `sitemap.xml` in Google Search Console.
- Inspect the most important URLs and request indexing when needed.
- Verify the domain in Bing Webmaster Tools.
- Submit `sitemap.xml` in Bing Webmaster Tools.
- Configure IndexNow when supported by the site stack.
- Record the verification method and owner account in the private operations notes, not in public docs.

## AI Visibility Checks

Run these after launch and again after crawlers have had time to refresh.

- Ask ChatGPT what the project/site is and check whether it cites or describes the canonical page.
- Ask Perplexity the same query and inspect cited sources.
- Ask Claude to summarize the canonical URL and verify it can read the page.
- Search Google and Bing for the exact project name plus the category.
- Search for old names and deprecated URLs to see whether stale surfaces still dominate.
- Record wrong answers as content/source gaps.

## Recurring Maintenance

Monthly:

- review sitemap coverage;
- review high-value pages that are discovered but not indexed;
- check whether `robots.txt` still matches the current content policy;
- check whether `llms.txt` links are current;
- refresh project knowledge pages after product positioning changes;
- log repeated AI answer errors and assign source-page fixes.

After renames or domain changes:

- keep redirects in place;
- update canonical links;
- update `llms.txt`;
- update project knowledge pages;
- update third-party profile links where possible;
- query old and new names in search and AI answer tools.

