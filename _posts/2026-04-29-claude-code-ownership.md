---
layout: post
title: "Claude Code Wrote It - And You Still Might Not Own It"
description: "Claude Code can ship the feature fast, but copyright still depends on human authorship. Here is where Anthropic terms and US guidance leave risk."
date: 2026-04-29 19:03:02 +0900
categories: [ai]
tags: [ClaudeCode, Copyright, Anthropic, AICoding, SoftwareIP]
image: claude-code-ownership/claude-code-ownership-1.webp
lang: en
published: true
---

Claude Code ownership is suddenly one of those questions that sounds silly for five seconds and then ruins your whole coffee. My first reaction was basically: come on, this is just another tool. Then I read the actual legal guidance again, looked at Anthropic's commercial language, and checked the latest court opinion people keep citing. The answer is not "Anthropic owns your repo." It is also not the comforting version a lot of teams seem to be assuming.

The weird part is that three different conversations are getting mashed together. One is contract. One is copyright. One is practical shipping risk. Those are not the same thing. If you treat them like the same thing, you end up with a policy that sounds confident and falls apart the first time legal asks who actually authored the code inside a generated migration, refactor, or test harness.

That is why this topic blew up. Developers are shipping more code through agents every week, and the default instinct is still to talk about ownership like we are arguing over a Word document. That shortcut does not really hold once an agent is writing chunks of implementation, reviewing diffs, and sometimes deciding structure before you even touch the file. If you missed the earlier phase of the hype cycle, this feels like the next chapter after the [Claude Code AGI argument](/ai/2026/02/24/claude-code-agi-claim.html): first everyone argued about capability, and now everyone is staring at the legal bill.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/claude-code-ownership/claude-code-ownership-1-400.webp 400w,
            /static/img/posts/claude-code-ownership/claude-code-ownership-1-800.webp 800w,
            /static/img/posts/claude-code-ownership/claude-code-ownership-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/claude-code-ownership/claude-code-ownership-1.webp"
    alt="Bright Claude Code ownership illustration showing a developer, AI agent, and copyright papers in a modern workspace"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## Why This Is Trending Right Now

### The community signal is not subtle anymore

This was not one random law blog post floating into the void. The ownership question showed up on Hacker News discussion boards and on GeekNews at basically the same moment. That matters because those two audiences are different. Hacker News pushes reach and argument volume. GeekNews usually tells you whether Korean developers think the issue is operationally real or just internet noise. When both grab it on the same day, I stop treating it like a niche legal curiosity.

### AI coding moved faster than policy language

The product story is simple: Claude Code can now do enough real work that companies are letting it touch production paths, migrations, test suites, and internal tooling. Anthropic itself frames Claude Code as an agentic coding system that reads a codebase, makes changes across files, runs tests, and delivers committed code. That is way beyond autocomplete. The legal language most teams still rely on was written for a world where AI was assistance around the edges, not a system that can draft the entire patch and wait for you to review it.

## The Contract Story Is Actually Pretty Clear

### Anthropic says customers retain rights to outputs

Anthropic's commercial announcement is not ambiguous about its intent. The company says customers retain ownership rights over outputs they generate through the service, and it pairs that with copyright indemnity language for authorized use. From a commercial terms perspective, that is the reassuring half of the story. If your company is buying Claude for work, Anthropic is not trying to slide into your repo and claim your feature branch.

### But contract rights are not the same as copyrightability

This is the part people keep flattening. A contract can allocate rights between parties. It cannot magically make something copyrightable if copyright law would not recognize authorship in the first place. So when someone says "Anthropic says I own the output," the follow-up question is obvious: own what, exactly? A fully copyrightable software work? A bundle of contractual rights? Something useful in practice but weak if tested in court? Those are materially different positions.

That gap is why the conversation feels uncomfortable. The commercial promise sounds clean. The underlying legal terrain does not.

## What US Copyright Guidance Actually Says

### Human authorship is still the center of gravity

The US Copyright Office has been pretty consistent here. Its AI registration guidance says copyright protects material that is the product of human creativity, and its January 2025 report on copyrightability doubles down on that human authorship framing. The office is not saying "AI use kills copyright." It is saying the analysis turns on where the meaningful human creative contribution actually is.

That distinction is more practical than it sounds. If you use Claude Code to brainstorm, restructure, or accelerate code you are substantially shaping, you are in one bucket. If the agent mostly generated the implementation and your role was closer to selecting, accepting, and lightly editing, you may be in a much weaker one. The guidance is annoyingly fact specific, which is also why any one-line hot take on X is probably overselling certainty.

### The recent court opinion did not open a shortcut

The D.C. Circuit opinion in *Thaler v. Perlmutter* reinforces the same direction. The opinion makes clear that the human authorship requirement does not block protection for works made with AI assistance. But it also does not let non-human systems become the author. That is the key. Courts are not rejecting software created with AI tools across the board. They are keeping the author slot human and asking whether the human contribution is genuinely creative enough to count.

For developers, that means the real risk is not "AI code is illegal." The real risk is overestimating how much authorship a human can claim when most of the substantive implementation came from the model.

{% include pre-version.html %}

## Where Teams Start Getting Burned

### Internal policy usually assumes review equals authorship

I do not think that assumption is safe anymore. Plenty of teams now run a workflow that looks like this: prompt the agent, let it draft everything, skim the diff, fix a few lines, run tests, ship. That is solid operational practice for speed. It is not obviously solid evidence of meaningful authorship if you later need to explain who created what.

The same thing shows up in due diligence. Founders love saying "our engineers reviewed all AI output." Okay, but what does that mean in a repo with dozens of auto-generated patches a week? Review is valuable. Review is not automatically authorship. A lawyer, investor, or acquirer is going to separate those concepts faster than most engineering teams expect.

### Open source compliance does not disappear either

Even if you put the authorship question aside, there is still the much uglier compliance layer. If AI-generated code reproduces licensed patterns too closely, your real headache may be provenance and license obligations rather than ownership in the abstract. This is one reason I still think teams using agent-heavy workflows need better traceability around prompts, accepted diffs, and manual edits. Not because process theater is fun, but because the alternative is trying to reconstruct decision history after the scary email arrives.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/claude-code-ownership/claude-code-ownership-2-400.webp 400w,
            /static/img/posts/claude-code-ownership/claude-code-ownership-2-800.webp 800w,
            /static/img/posts/claude-code-ownership/claude-code-ownership-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/claude-code-ownership/claude-code-ownership-2.webp"
    alt="Bright AI code ownership diagram comparing Anthropic output rights, human authorship rules, and software shipping risk"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## What I Would Change This Week

### Stop using one word for three different risks

If your team says "ownership" as a blanket term, split it immediately:

1. Contract rights with the model vendor
2. Copyrightability of the resulting code
3. Compliance and provenance risk when shipping it

Those are separate review lanes. They should not live in one lazy sentence in your AI policy.

### Keep a thin authorship trail for high-value changes

I am not saying every tiny patch needs a legal diary. I am saying anything business critical should leave a simple trail that shows where the human contribution happened. That can be a prompt log, commit note, review summary, or architecture note tied to the change. The point is not bureaucracy. The point is being able to show that the human was directing and shaping the work, not just rubber-stamping it.

Here is the kind of lightweight checklist I would actually use:

```bash
# For any important AI-assisted patch
# 1. Save the original task prompt
# 2. Note the files the human intentionally directed
# 3. Record the major manual edits after generation
# 4. Keep review comments for non-trivial design changes
# 5. Flag any copied-looking output for license review
```

### Update employment and contractor language before this gets awkward

This is the most boring recommendation in the post and probably the most useful. If your company is serious about AI-assisted development, your IP assignment and engineering policy should say what happens to AI-assisted work product, what disclosure is required, and what traceability standard you expect. Otherwise engineers, legal, and leadership are all operating on vibes.

## The Part Nobody Likes Saying Out Loud

### Shipping confidence is outrunning legal confidence

That is the real story. Teams are already comfortable letting Claude Code write meaningful parts of production systems. But the legal confidence behind those workflows is still partial and contextual. The contract story is ahead of the copyright story because vendors can write terms faster than courts or regulators can answer edge cases. That does not make the tools unusable. It just means the clean marketing sentence is doing more work than it should.

My current read is pretty simple. If Claude Code helps you express and implement decisions you are materially shaping, you probably have a much stronger position. If Claude Code is mostly producing the implementation while you supervise the output like a QA layer, your ownership story gets thinner fast. The code may still be valuable. It may still be shippable. But those are not the same thing as a clean authorship claim.

So yes, Claude Code can write the feature. The uncomfortable question is whether your process proves that you did enough of the creative work to own the result in the way your company thinks it does. That is the question worth asking before the next merger checklist, enterprise deal, or internal audit asks it for you.
