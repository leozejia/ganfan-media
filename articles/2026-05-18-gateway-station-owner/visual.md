# Visual Plan: 重生之我做中转站站长：我会怎么赚你的糊涂钱

Status: selected and exported.

## Image Decision

Use one X Article cover. The cover should stop the feed with a concrete billing
warning, not a generic AI routing metaphor.

## Asset Job

```text
Target channel: X Article cover
Target file: assets/cover.png
Target size: 1500x600
Primary draft: x.md
Supporting source rule: use sources.md only for public/private boundary and
forbidden claims
```

## Selected Pattern

Open Visual Grammar route:

```text
Artifact kind: image-cover
Registry: /Users/zejiawu/Projects/Project-Atlas/labs/open-visual-grammar/registry/image-cover.md
Pattern: big-character-poster
```

Reason: the article is a public warning with a sharp correction. The first read
needs a blunt sentence and one evidence object: the bill.

## Visual Score

```text
Reader pain: paying for a familiar model name, official-looking label, or cheap
multiplier without knowing what actually ran or how the balance was calculated.
False belief: if usage records show model name, usage, and cost, there is no
dark space left.
Correction: the dark space is the mapping behind the model name, the
self-attached "official" label, the hidden base price behind the multiplier,
and sometimes the data trade behind free/cheap access.
Stakes: the user cannot prove they were overcharged or routed to a substitute if
the platform hides the decisive layer.
Cover sentence: 专赚你看不懂账单的钱
Concrete evidence: bill, scratched multiplier, rewritten base price.
Visual action: the operator is caught rewriting the hidden base price while the
reader sees only a low multiplier.
Why it bites: it shows the scam happening on the object the reader thinks is
proof.
```

## Run Record

```text
Run directory: _work/visual-runs/2026-05-19-x-cover-dark-gateway-cards/
Selected candidate: candidate-01-bill-base-price
Source file: _work/visual-runs/2026-05-19-x-cover-dark-gateway-cards/candidate-01-bill-base-price/image.png
Source dimensions: 1488x592
Final asset: assets/cover.png
Final dimensions: 1500x600
Export command: skills/ganfan-article-illustrator/scripts/resize_cover.sh <source> assets/cover.png x-article-cover
```

## Candidate Notes

- `candidate-01-bill-base-price`: selected. Most directly matches the title and
  the hidden base-price section.
- `candidate-02-model-mask`: rejected for this article. Strong model-substitution
  angle, but less tied to the billing hook.
- `candidate-03-free-data`: rejected for this article. Better fit for a future
  data-risk piece.

## Selected Assets

```text
assets/cover.png
```

## Forbidden

- named provider logos;
- real Claude / OpenAI / Anthropic marks;
- fake SorryCode branding;
- fake UI screenshot;
- direct accusation against a named platform;
- QR code, watermark, signature, random small text.

## Run Policy

Runtime prompts, failed generations, diagnostics, and temporary exports stay
under:

```text
_work/visual-runs/<run-id>/
```

Only selected delivery files belong in:

```text
assets/
```
