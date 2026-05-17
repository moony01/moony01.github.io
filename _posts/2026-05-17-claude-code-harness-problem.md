---
layout: post
title: "Claude Code Large Repos Need More Than A Bigger Model"
description: "Claude Code large codebases now depend on harness setup, live navigation, LSP, hooks, skills, and verification more than model hype."
date: 2026-05-17 14:02:48 +0900
categories: [ai]
tags: [ClaudeCode, AICoding, AgenticCoding, LargeCodebases, Harness]
image: claude-code-harness-problem/claude-code-harness-problem-1.webp
lang: en
published: true
---

Claude Code large codebases are having a weird moment right now.

Anthropic just published a fresh post on [how Claude Code works in large codebases](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start), and the interesting part is not "Claude can grep files." We already knew that. The interesting part is that Anthropic is basically saying the quiet thing out loud: the model is only one slice of the product. The harness around it is where the real work starts.

That landed right after the April [Claude Code quality postmortem](https://www.anthropic.com/engineering/april-23-postmortem), where three product-layer changes made Claude Code feel worse for a lot of users even though the API and model weights were not the problem. So yeah, this is not just a best-practices blog post. It is a warning label for every team that thinks buying the bigger model is the same thing as having an AI engineering system.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/claude-code-harness-problem/claude-code-harness-problem-1-400.webp 400w,
            /static/img/posts/claude-code-harness-problem/claude-code-harness-problem-1-800.webp 800w,
            /static/img/posts/claude-code-harness-problem/claude-code-harness-problem-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/claude-code-harness-problem/claude-code-harness-problem-1.webp"
    alt="Claude Code large codebases shown as bright live repository maps, hooks, tests, and agent workflows"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## Claude Code Large Codebases Are Not A Prompting Problem

### The live repo claim is useful but not magic

Anthropic's claim is clear enough: Claude Code works from the live codebase on the developer machine. It reads files, uses grep, follows references, and does not require a hosted index of the whole repository. That is a real design choice, and I get why they are proud of it.

The stale-index problem is painful. Anyone who has used a code search system against a fast-moving monorepo has seen it. The tool finds a function that was renamed yesterday. It shows a module that was deleted in the last sprint. It returns the same old call site forever because the index is always one deploy behind reality.

Live navigation avoids that class of failure. Good.

But the tradeoff is just as real. A live repo is also messy, huge, inconsistent, half-documented, and full of names that made sense only to one person in 2019. If Claude does not know where to begin, it can burn context reading the wrong files with amazing confidence. That is not a model failure exactly. That is a navigation failure.

This is why the post feels important. It shifts the conversation from "which model wins SWE-bench this week?" to "can your repo explain itself well enough for an agent to operate inside it?"

### Bigger context does not save bad maps

I keep seeing teams treat context windows like warehouse space. If the model gets more tokens, they assume they can shove more repo into it and call the problem solved.

That works for a demo. It gets ugly in production.

A large codebase does not only need more room. It needs better shape. It needs entry points. It needs conventions that are discoverable. It needs tests that fail for the right reason. It needs docs that say "this service owns billing state" instead of dumping 3,000 lines of historical trivia into a root instruction file.

I liked the way the Reddit discussion around the Anthropic post pushed back here. A few developers basically said: yes, Claude can use grep, but grep is only as good as knowing what to grep. That matches my experience. An agent can search fast and still search sideways.

If I ask for "the account lockout path" and the repo calls it `risk_hold`, `auth_friction`, and `trust_state` in three different services, the model needs more than text search. It needs symbols, ownership, architecture notes, and a way to check whether it is touching the right boundary.

## The Harness Is The Product Now

### Anthropic named the boring pieces

The strongest line in the new post is the harness point. Anthropic lists the actual pieces: `CLAUDE.md`, hooks, skills, plugins, MCP servers, LSP integration, and subagents. That list sounds like tool plumbing, because it is. It is also where most of the difference lives.

I think this is the part teams underestimate.

`CLAUDE.md` is not a scrapbook. It is a routing layer. Hooks are not decorations. They are deterministic guardrails. Skills are not prompt snippets. They are a way to load domain knowledge only when it matters. Plugins are not just packaging. They are how a team stops good local setup from staying trapped on one senior engineer's laptop.

And LSP matters more than most AI hype posts admit. Symbol-level navigation is the difference between "grep found a method with the same name" and "this call resolves to that definition." In a small TypeScript app, maybe grep is fine. In a mixed C++, Java, Python, and legacy PHP codebase, text search alone is a tax you pay on every task.

This is where I would connect it to the earlier [MCP guide](/ai/2026/01/25/mcp-model-context-protocol-guide.html) on this blog. MCP looked abstract at first because everyone wanted a cute demo. In real codebases, the boring version is the one that matters: give the agent structured access to docs, tickets, service ownership, deploy state, feature flags, and observability without making it scrape human dashboards.

### The postmortem made the same point by accident

The April postmortem is the other half of this story.

Anthropic said three separate product-layer changes hurt Claude Code quality for different groups of users. One change lowered default reasoning effort to reduce latency. One cache optimization accidentally cleared reasoning every turn after an idle session. One system prompt change to reduce verbosity caused a measurable coding-quality drop and got reverted.

That is the part I cannot stop thinking about.

The model weights were not the headline issue. The wrapper changed the effective intelligence of the tool.

That should make every engineering lead a little uncomfortable. We are all building workflows on top of hosted agent products whose behavior depends on defaults, prompts, caches, context policies, tool schemas, permission modes, UI decisions, rate limits, and release flags. Your team can write perfect instructions and still get a different agent tomorrow because the vendor tuned the harness.

I am not saying "do not use it." I use these tools constantly. I am saying the operational surface is bigger than the chat box.

## What I Would Actually Change In A Real Repo

### Start with repo navigation, not agent personality

If a team asked me what to do Monday morning, I would not start by arguing over Opus versus Sonnet versus Codex. I would start with repo legibility.

Try running this kind of audit against your own codebase:

```bash
find . -name 'CLAUDE.md' -o -name 'AGENTS.md' -o -name 'README.md'
rg -n "owner|service|boundary|deploy|rollback|migration|feature flag" docs src
rg -n "TODO|FIXME|deprecated|do not use|legacy" src
```

That is not fancy. It tells you whether an agent has a map or a junk drawer.

For a serious repo, I want a short root instruction file with pointers, not a novel. I want subdirectory notes where the weirdness lives. I want a "how to verify changes here" section for each major module. I want build and test commands that do not require tribal memory. I want generated files and dangerous directories clearly marked. I want migration rules explicit enough that an agent cannot quietly invent a second pattern.

None of that is glamorous. All of it compounds.

### Make verification cheaper than supervision

The best agent workflow is not "watch the model like a hawk." That is just expensive pair programming with more anxiety.

The best workflow is: give the agent enough context, let it work, and make verification cheap enough that it can catch itself before you review. Tests. Type checks. Linters. Screenshot diffs. API contract checks. SQL migration dry runs. Static analysis. Local reproduction scripts. Anything that turns "looks plausible" into "passed or failed."

This is where I get impatient with AI coding demos. The demo ends when the app renders. Real work starts when the agent has to modify the billing path, keep backward compatibility, migrate data, update docs, pass CI, and not break a customer import job that runs once a night.

If your verification is weak, the agent becomes a very fast generator of review burden. If your verification is strong, the same agent starts to feel like a real contributor.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/claude-code-harness-problem/claude-code-harness-problem-2-400.webp 400w,
            /static/img/posts/claude-code-harness-problem/claude-code-harness-problem-2-800.webp 800w,
            /static/img/posts/claude-code-harness-problem/claude-code-harness-problem-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/claude-code-harness-problem/claude-code-harness-problem-2.webp"
    alt="Claude Code harness workflow connecting LSP, MCP servers, hooks, tests, and repository context"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## The New Senior Skill Is Agent Operations

### Someone has to own the harness

The Anthropic post mentions an emerging "agent manager" style role. I do not love the title, but I believe the job is real.

Somebody has to decide what goes in root context and what stays out. Somebody has to maintain hooks. Somebody has to make LSP and MCP integrations reliable. Somebody has to review system prompts, skills, permission modes, and subagent defaults the same way we review CI pipelines. Somebody has to notice when the tool starts burning tokens or repeating itself after a vendor release.

That is not prompt engineering in the old, silly sense. It is operations.

It looks closer to DevEx, platform engineering, and staff-level codebase hygiene than to writing clever magic words. The work is partly technical and partly social. You need conventions that teams will actually follow. You need docs that stay current. You need a feedback loop when agents make the same mistake twice. You need a way to distribute improvements so every developer benefits, not only the person who spent Sunday tuning their local setup.

This is also why the "AI will remove senior engineers" take keeps aging badly. The more capable these tools get, the more valuable it becomes to understand architecture, boundaries, verification, rollout risk, and organizational memory. The junior-level act of typing code is easier to automate. The senior-level act of making a codebase navigable, testable, and safe for agents is suddenly more important.

### My bet for the next few months

My bet is that the winning teams will not be the ones with the spiciest model subscription. They will be the ones that turn their codebase into a good operating environment for agents.

They will keep context files lean. They will expose structured tools before asking agents to scrape dashboards. They will wire verification into the loop. They will treat prompt and harness changes as production changes. They will measure boring things like failed tool calls, repeated edits, reverted patches, stale docs, and time-to-green after an agent starts a task.

That sounds less exciting than "AI writes the whole app." Honestly, good. I trust boring systems more.

Claude Code large codebases are not proving that prompts are dead or that models do not matter. They are proving that agentic coding is becoming normal engineering. Once that happens, the old rules come back in a new costume: keep the system observable, make the path of least resistance the safe one, and never confuse a powerful tool with an operating model.

That is the real story here.
