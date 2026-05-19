---
layout: post
title: "Codex Goals Turn AI Coding Into A Long Running Loop"
description: "Codex Goals let coding agents keep a durable objective alive, but long running loops need sharper scopes, budgets, and review gates."
date: 2026-05-19 14:02:38 +0900
categories: [ai]
tags: [CodexGoals, OpenAICodex, AICoding, AgenticCoding, DeveloperWorkflow]
image: codex-goals-long-running-loop/codex-goals-long-running-loop-1.webp
lang: en
published: true
---

Codex Goals is the feature that makes AI coding feel less like a chat window and more like a work loop with a memory.

That sounds small until you think about how coding agents usually fail in real teams. They do not only fail because the model wrote the wrong diff. They fail because the task lost shape. The agent forgot the actual objective, wandered into a nice-looking side quest, asked for approval at the wrong time, or kept solving the last prompt instead of the real job.

OpenAI's new [Codex Goals documentation](https://developers.openai.com/codex/use-cases/follow-goals) is basically a product answer to that problem. You give Codex a durable goal, connect it to a repo, and let the agent keep steering work against that objective instead of treating every turn like a fresh little errand.

And honestly? That is the part of agentic coding I have been waiting for. Not because it is magically safer. Because it makes the messy part visible.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-1-400.webp 400w,
            /static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-1-800.webp 800w,
            /static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-1.webp"
    alt="Codex Goals long running coding agents shown as bright task loops across pull requests tests and review gates"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## Codex Goals Changes The Shape Of The Task

### The prompt stops being the whole contract

Most AI coding sessions still feel like a stack of sticky notes. Fix this test. Refactor that component. Explain this file. Try again. Use the other branch. No, not that file. Please stop editing the generated client.

That works for small jobs. It gets weird when the job has a real product shape.

A durable goal changes the center of gravity. Instead of asking the agent to complete one isolated command, you are giving it an objective that can survive multiple turns, checks, and interruptions. The goal becomes the thing the agent keeps comparing against.

That matters because real engineering work is not linear. You start with "make signup faster" and discover a stale cache. You fix the cache and find a flaky integration test. You touch the test and realize the docs lie. A chat-only agent can handle pieces of that. A goal-following agent has a better chance of noticing that the cache fix, the test update, and the doc patch are all part of the same work item.

I do not think this removes the need for good prompts. It just demotes the prompt from "entire contract" to "current instruction inside a bigger contract." That is healthier.

The funny thing is that this also makes bad goals more dangerous. If the objective is vague, the agent now has permission to be vague for longer.

```text
weak goal:
Improve the dashboard.

better goal:
Reduce the dashboard initial load time below 1.5s on the existing seeded dataset,
without changing the visible table behavior or removing any current filters.
```

The second one is boring. Boring is good here. Agents need boring boundaries.

### Long running does not mean unsupervised

The phrase "long running" can make people imagine an agent disappearing into a repo for two days and coming back with a heroic pull request. Sometimes that will happen. Sometimes it will come back with a confident mess.

So the interesting question is not "can Codex keep going?" It is "what should be allowed to keep going?"

OpenAI's broader guidance on [running Codex safely](https://openai.com/index/running-codex-safely/) keeps pointing at isolation, limited permissions, review, and human approval. That is the right framing. The goal loop is useful only if the loop has gates.

Here is the policy shape I would start with:

| Work type | Goal loop risk |
|---|---|
| Docs cleanup | Low if scope is explicit |
| Test repair | Medium because tests can be made weaker |
| UI refactor | Medium because screenshots matter |
| Auth or billing changes | High until proven otherwise |
| Database migrations | High by default |

That table is not fancy. It is the conversation teams need before they let agent goals run through normal repo permissions.

## The Developer Workflow Gets More Honest

### Codex mobile was the warning sign

This connects directly to the thing I wrote about yesterday in [Codex mobile making desk coding optional](/ai/2026/05/18/codex-mobile-desk-coding.html). The phone feature was not really about typing code on a tiny keyboard. It was about approvals, continuity, and the fact that agent work now waits on humans at weird times.

Codex Goals pushes the same idea from the other side.

If mobile is the remote control, goals are the task contract. One lets you steer from wherever you are. The other gives the agent something stable to steer toward.

That combination is useful. It is also a little uncomfortable.

The old coding-agent workflow had a natural brake: the session died, the terminal waited, the prompt ran out of context, or the developer got bored. Durable goals reduce that brake. Good. But brakes exist for a reason.

I would not give every repo task a goal. I would use goals for work where persistence is actually valuable:

- tracking down a cross-file regression
- finishing a migration with tests and docs
- keeping a cleanup branch aligned with one architectural rule
- repeatedly checking a product constraint while editing code
- watching for a class of bug across related modules

I would avoid goals for fuzzy product wishes. "Make onboarding better" is not a goal. It is a meeting.

### The review burden moves earlier

Here is the thing nobody gets to dodge: better agents do not delete review work. They move review work upstream.

If a human gives a lazy goal, the agent may spend more time doing lazy work. If a team gives a goal without budget limits, the agent may burn time polishing edges nobody asked for. If a repo has weak tests, the agent may optimize for the wrong green check.

That means goal writing becomes engineering work.

Not prompt theater. Engineering.

You are defining scope, constraints, done criteria, permissions, and expected evidence. If that sounds like a ticket, yeah. That is the point. The best Codex Goal probably looks more like a tight engineering ticket than a clever prompt.

Try this shape:

```text
Goal:
Move the billing invoice export from the legacy worker to the new queue.

Constraints:
- Do not change invoice CSV columns.
- Do not touch payment capture code.
- Keep the old worker behind a rollback flag.

Evidence:
- Add or update unit tests for export formatting.
- Run the existing billing worker integration test.
- Include a short migration note in the PR description.
```

That is not glamorous. It is exactly what a long-running agent needs.

{% include pre-version.html %}

## Codex Goals Needs Budgets As Much As Context

### Context is not the scarce resource anymore

Developers love talking about context windows. I get it. Bigger context is visible. You can measure it. You can brag about it.

But once goals become durable, the scarce resource is not only context. It is budget.

Budget means time, tokens, file changes, blast radius, approval count, and reviewer attention. A goal that can run for a long time needs a way to know when to stop, when to ask, and when to admit that the task is too large.

This is where I want product teams to be more strict.

If a goal touches more than five files, ask for a plan. If it wants to edit generated code, stop. If it changes tests without changing product code, flag it. If it keeps retrying the same failure, summarize and ask for a human decision. If it discovers a second bug, create a follow-up instead of smuggling it into the same branch.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-2-400.webp 400w,
            /static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-2-800.webp 800w,
            /static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/codex-goals-long-running-loop/codex-goals-long-running-loop-2.webp"
    alt="Codex Goals workflow showing bright approval checkpoints budget limits and test evidence around a coding agent loop"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### The best goals are narrow and stubborn

I like goals that are narrow and stubborn.

Narrow means the agent knows what not to touch. Stubborn means it keeps checking the same outcome instead of drifting toward whichever fix looks easiest.

For example, "make tests pass" is wide and weak. It invites the agent to delete assertions, skip suites, or change expectations until the dashboard turns green. "Restore the failing checkout tax calculation test without changing tax rounding behavior" is much better. The agent still has room to investigate, but it cannot pretend the actual product rule disappeared.

That is the mental shift.

Codex Goals is not just a convenience feature. It is a pressure test for how well a team can describe work. Teams with crisp tickets, reliable tests, small ownership boundaries, and review discipline will get more out of it. Teams with vague Jira blobs and flaky CI will mostly get longer-running confusion.

I am still optimistic.

The reason is simple: durable goals match the way developers already think. We do not wake up wanting one perfect prompt. We wake up wanting a messy piece of work to keep moving without losing the thread.

Codex Goals is a step toward that. The next question is whether teams treat the goal as a serious engineering object or just another box where they paste wishes.

I know which version I would trust in production.
