# Visual Plan: 重生之我开中转站

Status: selected and exported.

## Image Decision

Use one X Article cover. The cover should make the "easy money" story collapse
into late-night maintenance reality.

## Asset Job

```text
Target channel: X Article cover
Target file: assets/cover.png
Target size: 1500x600
Primary draft: x.md
Supporting source rule: use sources.md only for public/private boundary and
safe operational categories
```

## Selected Pattern

Open Visual Grammar route:

```text
Artifact kind: image-cover
Registry: /Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/registry/image-cover.md
Pattern: big-character-poster
```

Reason: the article is a public correction to the "open a gateway and print
money" narrative. It needs a blunt first read and a concrete operational object,
not a neutral tech diagram.

## Visual Score

```text
Reader pain: believing an AI gateway is simple arbitrage: deploy a panel,
connect upstream accounts, sell balance, collect spread.
False belief: opening a gateway is easy money if setup is easy.
Correction: setup is the easy part; the real cost is ongoing maintenance across
upstream changes, stream behavior, model compatibility, billing explanations,
deployment guardrails, docs, installation friction, and user support.
Stakes: non-technical operators can promise a service they cannot maintain, and
users pay for the instability when things break.
Cover sentence: 钱还没赚到，先通宵救火
Concrete evidence: 3 a.m. clock, incident ticket, emergency checklist, smoking
server box, buried income receipt.
Visual action: the supposed income receipt is buried by incident notes and
firefighting marks.
Why it bites: it makes "开站容易，维护难" visible before any technical detail.
```

## Run Record

```text
Run directory: _work/visual-runs/2026-05-20-x-cover-firefighting-cards/
Selected candidate: candidate-01-night-firefight
Source file: _work/visual-runs/2026-05-20-x-cover-firefighting-cards/candidate-01-night-firefight/image.png
Source dimensions: 1488x592
Final asset: assets/cover.png
Final dimensions: 1500x600
Export command: skills/ganfan-article-illustrator/scripts/resize_cover.sh <source> assets/cover.png x-article-cover
```

## Candidate Notes

- `candidate-01-night-firefight`: selected. Best match for the title and the
  "money before maintenance" reversal.
- `candidate-02-money-button`: rejected for this article. Strong marketing
  rebuttal, but less tied to the current title.
- `candidate-03-upstream-bomb`: rejected for this article. Useful technical
  angle, but narrower and less emotional.

## Selected Assets

```text
assets/cover.png
```

## Forbidden

- fake provider logos;
- private screenshots;
- real user logs;
- exact internal incident data;
- generic AI robot imagery;
- fake SorryCode branding;
- QR code, watermark, signature, random unreadable microtext.

## Run Policy

Runtime prompts and rejected generations stay under:

```text
_work/visual-runs/<run-id>/
```

Selected delivery assets go under:

```text
assets/
```
