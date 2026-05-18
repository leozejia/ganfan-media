# Visual Plan: AI 明明没写几个字，为什么账单这么贵？

Status: generated

## Asset Job

Target channel:

```text
X Article cover
```

Target file:

```text
assets/cover.png
```

Target size:

```text
1500x600
```

Primary draft:

```text
articles/2026-05-16-ai-billing-five-fields/x.md
```

Source inclusion rule:

```text
Use the X draft first. Add `brief.md` for audience/conflict. Add `sources.md`
only for factual boundary and forbidden claims.
```

## Initial Visual Direction

The cover should make the false focus visible: the reader stares at a short
visible reply, while three underlying meters show `input`, `output`, and
`cache`.

Candidate Open Visual Grammar patterns:

- `big-character-poster`
- `narrative-journal-infographic`
- `pixel-retro`

## Selected Pattern

```text
big-character-poster
```

Reason: the article has one sharp public correction: a short visible reply does
not mean low model consumption.

## Visual Score

```text
Artifact kind: image-cover
Runtime: image-generation
Pattern: big-character-poster
Primary source: x.md
Reader pain: the bill or usage rises even when the AI did not visibly write much
False belief: AI cost is proportional to visible reply length
Correction: model consumption maps back to input, output, and cache
First read: 账单不是看回复长短
Concrete evidence: receipt roll split into INPUT / OUTPUT / CACHE
Visual action: a short chat bubble is attached to a much longer receipt
Density: low-medium
Temperature: warm-hot editorial warning
Forbidden: provider logos, exact pricing numbers, fake UI screenshots, generic AI robot
```

## Run

```text
_work/visual-runs/2026-05-17-x-cover-billing-basics/
```

Candidates:

```text
candidate-01: rejected, source returned 1536x1024 and would crop poorly
candidate-02-retry: usable but weaker conceptually
candidate-03: selected
```

## Selected Assets

```text
assets/cover.png
```

Final size:

```text
1500x600
```
