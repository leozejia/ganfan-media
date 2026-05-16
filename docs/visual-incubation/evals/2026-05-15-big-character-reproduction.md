# Big Character Poster Reproduction Eval

Date: 2026-05-15

Run folder:

```text
articles/*/_work/visual-runs/2026-05-15-big-character-repro/
```

Review entry:

```text
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-15-big-character-repro/review.html
```

## Purpose

Test whether `open-visual-grammar` can reproduce the historical GanFan /
SorryCode big-character cover style across four past article topics.

This was not a model benchmark. It tested whether the visual method was
documented well enough for another agent to apply.

## Topics

- Codex API mode plugins: `灰掉的插件 / 不等于不能用`
- Codex History sessions: `丢了会话 / 不等于丢了记录`
- Claude Code GPT cost: `能跑 GPT / 不等于划算`
- Agent context token economics: `上下文不是越多越好`

Each topic produced three structural candidates. This later proved too rigid:
fixed labels pushed agents toward compliance instead of visual judgment.

## Result

The style direction partially passed.

The system reliably produced:

- large Chinese headline posters;
- low-to-medium density;
- one dominant title;
- fewer SaaS collage artifacts;
- exact `1500x600` review exports.

The content-expression layer did not pass.

The candidates looked closer to the intended style, but most did not reach the
strength of the historical covers. They often expressed a topic plus a metaphor
rather than a sharp cover-level argument.

## Best Performing Group

`Claude Code GPT Cost` was the strongest group.

Reason:

- the cover sentence is naturally sharp: `能跑 GPT / 不等于划算`;
- the pain is obvious: money can burn even when the setup works;
- the metaphor is near and active: a working bridge bends under cost;
- the false belief is easy to name: compatibility implies cost efficiency.

This topic survived weaker prompting because the argument was already strong.

## Weakness Found

The prompts compiled too directly from:

```text
topic -> title -> conflict pair -> metaphor -> composition model
```

The missing layer was:

```text
reader pain -> false belief -> correction -> visual action
```

Without that layer, agents can reproduce the surface style but not the cover
judgment.

There was also a context-boundary risk. A media package can contain multiple
publication drafts for one thesis: X, SorryCode, WeChat, XHS, and others. A
cover test must read the smallest material relevant to the asset being tested.
For an X-cover test, that means the X draft first. Supporting sources should be
added only when they change the audience, factual boundary, visual claim,
delivery constraint, or reuse target.

## Required Grammar Change

Open Visual Grammar now needs a `visual argument` gate before score and prompt:

```text
Raw topic:
Reader pain:
False belief:
Correction:
Stakes:
Cover sentence:
Visual action:
Why it bites:
```

`Visual action` must be a verb phrase. Objects are not enough.

Weak:

```text
archive drawer
context blocks
cost meter
grey plugin icon
```

Stronger:

```text
empty history surface peels back to reveal a local record
context stack becomes a weight pressing the title onto a ledger
working bridge bends under cost
grey status mask is cut open by a live input cursor
```

## Next Eval Rule

Before generating the next 12-card run, define the asset job for each topic and
extract the visual argument from the relevant channel draft.

For the current benchmark:

```text
Asset job: X cover
Primary draft: x.md
Supporting source rule: include only sources that change audience, factual boundary, visual claim, delivery constraint, or reuse target
```

Do not generate if the visual action is generic.

The next run should keep the same review structure, but each card should be
compiled from the channel-specific argument stack rather than from the package
title or full article bundle.

## Regression Note: Design Language Became SOP

A later input-contract subagent test on `Agent Context Token Economics` produced
three weak covers even though it followed the source contract.

The failure was not caused by reading the wrong source. It came from the prompt
compilation layer.

The subagent interpreted the method as an execution checklist:

```text
generate background -> avoid readable text -> apply title later -> satisfy three composition labels
```

Historical successful covers worked differently:

```text
finished editorial poster -> title as visual force -> concrete evidence object -> article-specific attitude
```

The next method revision should treat `big-character-poster` as a design
language and meta-prompt protocol, not a production SOP. The operator should
judge whether the result has attitude, concrete evidence, and article-specific
force instead of checking whether it satisfied fixed composition labels.

## Small Regression Pass: Design Language V2

Run folder:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-15-design-language-v2-subagent/
```

Review entry:

```text
articles/2026-05-12-agent-context-token-economics/_work/visual-runs/2026-05-15-design-language-v2-subagent/review.html
```

Scope:

- one article only: `Agent Context Token Economics`;
- asset job: X Article cover, `1500x600`;
- primary source: `x.md`;
- subagent executed the run independently;
- three candidates generated as complete poster candidates, not fixed
  pressure/collision/meter slots.

Operator judgment:

- this batch was clearly better;
- the method correction worked;
- design-language framing restored room for visual judgment;
- concrete evidence and complete-poster intent improved the output.

Conclusion:

The earlier failure was not a source-contract problem. It was a design-language
compilation problem. Treating `big-character-poster` as a design language and
meta-prompt protocol is the current correct direction.

Next step:

Run a second stability pass on two or three historical topics. Do not expand to
new visual jobs until big-character poster remains stable across multiple
article topics.

## Second Stability Pass: Historical Topics

Run folder:

```text
articles/{2026-05-09-codex-api-mode-plugins,2026-05-10-codex-history-sessions,2026-05-11-claude-code-gpt-cost}/_work/visual-runs/2026-05-15-big-character-stability/
```

Review entries:

```text
articles/2026-05-09-codex-api-mode-plugins/_work/visual-runs/2026-05-15-big-character-stability/review.html
articles/2026-05-10-codex-history-sessions/_work/visual-runs/2026-05-15-big-character-stability/review.html
articles/2026-05-11-claude-code-gpt-cost/_work/visual-runs/2026-05-15-big-character-stability/review.html
```

Scope:

- three historical article topics;
- X Article cover asset job;
- primary source: each article's `x.md`;
- three cards per article;
- subagents executed independently from the updated workflow and
  `big-character-poster` design language.

Operator judgment:

- overall framework is trending stable;
- the second pass is good enough to treat the framework as settled for current
  GanFan / SorryCode X cover work;
- `codex-history-sessions` had a size/crop issue, but the visual method itself
  still passed.

Conclusion:

`big-character-poster` can now be treated as `v1 stable` for GanFan / SorryCode
X Article covers.

This does not mean the aesthetic is frozen. It means the workflow contract is
stable:

```text
asset job -> smallest relevant source -> visual argument -> design language -> custom runtime prompt -> three candidates -> operator choice
```

Do not reopen the architecture because one generated card needs cropping. Treat
dimension mismatch as a runtime/export quality-gate issue.
