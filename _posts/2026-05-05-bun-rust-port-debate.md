---
layout: post
title: "Bun Rust Port Exposes The AI Rewrite Problem"
description: "Bun Rust port work is suddenly public. Here is what the Zig to Rust experiment says about AI rewrites, review debt, and runtime trust."
date: 2026-05-05 15:07:03 +0900
categories: [javascript]
tags: [Bun, Rust, Zig, JavaScriptRuntime, AIRewrites]
image: bun-rust-port-debate/bun-rust-port-debate-1.webp
lang: en
published: true
---

Bun Rust port discourse hit the developer bloodstream today because it has the perfect mix of real code, language drama, AI anxiety, and "wait, are they actually doing this?" energy.

The short version: a public Bun branch named [`claude/phase-a-port`](https://github.com/oven-sh/bun/tree/claude/phase-a-port) is carrying Rust port work. When I checked it on May 5, Hacker News had "Bun is being ported from Zig to Rust" near the top of the front page with hundreds of points and comments. GeekNews surfaced the same story for Korean developers, and the Rust, Zig, and Bun subreddits immediately started arguing about whether this is an engineering experiment, a language migration, an AI stress test, or a giant review problem wearing a Rust hoodie.

Honestly? I get why it spread so fast.

Bun is not a toy repository. It is a JavaScript runtime, package manager, bundler, and test runner with serious mindshare. It was written primarily in Zig. It was acquired by [Anthropic in December 2025](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone?s=33), with Anthropic explicitly tying Bun to Claude Code infrastructure. So when a branch appears with `Cargo.toml`, a `docs/PORTING.md`, and a pile of `.rs` files beside `.zig` files, people are going to read more into it than "somebody tried a branch."

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/bun-rust-port-debate/bun-rust-port-debate-1-400.webp 400w,
            /static/img/posts/bun-rust-port-debate/bun-rust-port-debate-1-800.webp 800w,
            /static/img/posts/bun-rust-port-debate/bun-rust-port-debate-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/bun-rust-port-debate/bun-rust-port-debate-1.webp"
    alt="Bun Rust port debate shown as a bright JavaScript runtime migration map from Zig modules to Rust crates"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

The branch itself is the interesting artifact. The porting guide says Phase A is a draft translation of Zig files into Rust files beside the original Zig files, and that it does not need to compile yet. Phase B is supposed to make crates compile crate by crate. That is a very different signal from "we rewrote the whole runtime overnight and shipped it." It looks more like an aggressive experiment in translating structure first, correctness later.

That distinction matters, because the internet is very good at turning a branch into a roadmap.

{% include pre-version.html %}

## The Bun Rust Port Is Not Just A Language Story

### The timing makes it impossible to read neutrally

If this were a random weekend branch in a small project, it would be funny for a day and then everyone would move on. But Bun sits in the center of several live arguments.

First, the JavaScript tooling argument. Bun has been the fast, pragmatic, all-in-one counterweight to Node plus npm plus a stack of separate tools. Its identity is tied to speed, lower ceremony, and a very direct engineering style. "Written in Zig" was part of that identity, even for developers who never touched Zig.

Second, the AI coding argument. Anthropic did not acquire Bun in a vacuum. It said Bun was important infrastructure for Claude Code and future coding workflows. So a `claude/phase-a-port` branch immediately gets interpreted as an agentic coding experiment, even before anyone proves exactly how much of the code was model-generated.

Third, the open source governance argument. Zig now has a public [strict no LLM policy](https://ziglang.org/code-of-conduct/) for its official issue tracker, pull requests, and bug tracker comments. Loris Cro, Zig Software Foundation VP of Community, explained the rationale in a post about [contributor poker and AI](https://kristoff.it/blog/contributor-poker-and-ai/): the project invests in contributors, not just patches, and LLM-heavy drive-by work changes the economics of review.

Put those three arguments together and the Bun branch becomes more than code. It becomes a referendum people already wanted to have.

### The porting guide is more disciplined than the memes

The Reddit version of this story is mostly "760k lines, good luck reviewing that." I laughed too. But the actual `docs/PORTING.md` is not just chaos pasted into Markdown. It has rules about preserving structure, mapping Zig namespaces to Rust crates, avoiding async runtimes like Tokio, keeping Bun's event loop, marking `unsafe` blocks with safety comments, and leaving `TODO(port)` notes instead of guessing.

That is not a production-ready migration plan by itself, but it is not nothing.

The part that caught my eye is the explicit split between Phase A and Phase B. Phase A optimizes for a faithful draft. Phase B owns compilation, crate wiring, performance work, and review. That is exactly how I would expect a serious AI-assisted translation experiment to be framed if the team is honest about the messiness.

Still, the uncomfortable part remains: draft ports create review debt.

If an agent can create 20,000 or 200,000 lines of plausible Rust faster than humans can deeply inspect it, then the bottleneck did not disappear. It moved. Now the scarce resource is not typing code. It is proving that the code means the same thing, fails the same way, owns memory correctly, preserves performance invariants, and does not quietly turn old undefined behavior into new unsound Rust.

That is not a small job.

## Why Rewriting Zig To Rust Is Weirdly Hard

### Rust asks questions Zig may never have answered explicitly

People talk about Rust like you can translate into it and automatically collect safety. That is not how this works.

Zig and Rust both attract systems programmers, but they ask different questions. Zig gives you directness, manual control, comptime power, and a very explicit "you are responsible" feel. Rust asks you to encode ownership, borrowing, aliasing, mutability, and lifetime expectations in ways the compiler can check.

That is the whole trap in a bulk port.

If a Zig subsystem uses a pointer in a way that is locally obvious to the original author but not expressed in the type system, the Rust port has to decide what that pointer means. Is it owned? Borrowed? Shared? Arena-backed? Intrusive? FFI? Static? A back-reference? Maybe the answer is clear. Maybe it is not. Maybe the first draft uses `unsafe` and a safety comment that sounds convincing until a real maintainer reads it.

This is why I do not love the "Rust rewrite equals safety upgrade" framing. A careful Rust rewrite can absolutely improve safety. A mechanical Rust-shaped rewrite can also preserve the same bugs, add new aliasing mistakes, and bury them under a layer of confidence theater.

That is not Rust's fault. That is translation being hard.

### The boring checks are the real migration

If I were reviewing this kind of port, I would not start with vibe. I would start with inventory.

Try asking boring questions like these:

```bash
git clone https://github.com/oven-sh/bun.git
cd bun
git fetch origin claude/phase-a-port
git diff --stat main..origin/claude/phase-a-port
git diff --name-status main..origin/claude/phase-a-port | grep -E '\\.(rs|zig|toml|md)$' | head -80
```

Then I would map every ported subsystem to a test story. Does it have parity tests? Does it compile in isolation? Does the Rust version preserve JSC integration assumptions? Are allocator choices equivalent? Are crash paths tested? Are syscall and event loop assumptions still Bun assumptions, or did a convenient Rust abstraction sneak in?

That is where the work lives.

I wrote about this from the other side in the [Zed 1.0 VS Code exit](/others/2026/04/30/zed-1-vscode-exit.html) post. Rust can be a great product signal, but it is not a product strategy by itself. The thing users feel is whether the tool gets faster, more stable, and less annoying. The language choice only matters if it changes those outcomes.

{% include pre-version.html %}

## The AI Rewrite Problem Is Bigger Than Bun

### Agents make migration cheap enough to attempt badly

The part nobody wants to say too loudly is that AI agents make irresponsible rewrites more tempting.

Before agents, a full runtime port was expensive enough that the cost itself forced planning. You needed staffing, milestones, test strategy, and a long argument with management. Now you can create a branch, point an agent at a guide, and get a shocking amount of draft code before lunch.

That is amazing. It is also dangerous.

Cheap first drafts change engineering psychology. A team can suddenly "see" the rewrite, which makes it feel more real than it deserves. Managers can ask why the last 20 percent is taking so long when the first 80 percent appeared overnight. Reviewers can get buried under plausible code. Users can see a public branch and assume the current product is secretly deprecated.

This is the same shape as agentic coding in normal product work, just scaled up. The code arrives faster than the organization can absorb the responsibility for it.

### Open source maintainers are right to worry about review economics

This is where Zig's anti-LLM policy becomes relevant even if you disagree with it.

The important point is not "AI code is always bad." That is too broad and too emotionally satisfying. The important point is that maintainers have limited review energy. If a contributor cannot explain, defend, maintain, and revise the submitted work, the project may inherit a burden instead of gaining a contributor.

That is the "contributor poker" argument in plain English. You are not just betting on the patch. You are betting on the person who will stick around when the patch breaks something weird three months later.

For a company-owned project like Bun, the equation is different. Anthropic and the Bun team can burn compute, pay engineers, keep internal context, and decide whether a port is worth exploring. Fine. That is their repo.

But for the broader ecosystem, the lesson is sharper: AI can produce more code than open source can responsibly review. Projects need policies before that flood arrives, not after.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/bun-rust-port-debate/bun-rust-port-debate-2-400.webp 400w,
            /static/img/posts/bun-rust-port-debate/bun-rust-port-debate-2-800.webp 800w,
            /static/img/posts/bun-rust-port-debate/bun-rust-port-debate-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/bun-rust-port-debate/bun-rust-port-debate-2.webp"
    alt="Bun Rust port review workflow showing AI generated modules, human reviewers, tests, and runtime safety gates"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## What I Would Watch Next

### The branch needs boring proof, not louder takes

The useful question is not whether Zig people or Rust people win the argument. The useful question is whether the branch produces evidence.

I would watch for these signals:

| Signal | Why It Matters |
| --- | --- |
| Crate by crate compilation | Shows the port is moving past draft text |
| Parity tests against Zig behavior | Proves translation instead of imitation |
| Performance numbers on real Bun workloads | Keeps the rewrite honest |
| Unsafe audit notes | Separates Rust syntax from Rust guarantees |
| Maintainer explanation | Reduces rumor and roadmap confusion |

That last line matters more than people think. If the Bun team says "this is an experiment," users will process it differently. If they say "we are migrating core runtime pieces," users will process that differently too. Silence lets the loudest thread define the story.

### Production users should not panic, but they should pay attention

If you run Bun in production, I would not rip it out because a branch exists. That would be silly. The current released Bun is still the current released Bun. A draft Rust port branch does not mean your deploy pipeline changes tomorrow.

But I would pay attention to the direction.

If Bun keeps investing in Rust, that might eventually improve memory safety, hiring surface, ecosystem leverage, and maintainability. It might also create a long transition period where two implementations, two mental models, and two classes of bugs coexist. Both futures are plausible.

The part I actually like is that the experiment is visible. We can inspect the branch. We can read the guide. We can argue from artifacts instead of vibes. That is healthier than a closed rewrite appearing one day with a launch blog and a benchmark chart.

So yes, the Bun Rust port debate is spicy. It deserves the attention.

But the real story is not "Zig lost" or "Rust won" or "Claude rewrote a runtime." The real story is that AI has made large-scale rewrites feel newly reachable, and our review systems are not automatically ready for that world.

That is the problem worth taking seriously.
