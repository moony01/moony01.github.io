---
layout: post
title: "Copilot Now Signs Your VS Code Commits Whether You Like It Or Not"
description: "VS Code 1.118 now adds Copilot as a Git co-author by default. Here is what changed, why developers are pushing back, and how to turn it off."
date: 2026-04-30 19:02:16 +0900
categories: [github]
tags: [VSCode, GitHubCopilot, Git, CommitHistory, AICoding]
image: vscode-copilot-coauthor/vscode-copilot-coauthor-1.png
lang: en
published: true
---

VS Code Copilot co-author settings are suddenly one of those tiny release-note details that can wreck your mood for the rest of the day. I saw the change in the VS Code 1.118 notes and had the exact same reaction a lot of people had online: wait, you turned that on by default?

The feature itself is simple. When Copilot changes your files through chat or agent workflows, VS Code now appends a `Co-authored-by: Copilot <copilot@github.com>` trailer to the commit message by default. Technically, this is not the biggest change in the 1.118 release. Practically, it is the one that touches how your work gets recorded, reviewed, audited, and interpreted later.

That is why this spread fast across the official release notes, GeekNews, Linux Do, and Reddit in basically the same window. People are not just arguing about a string in a commit footer. They are arguing about authorship signals, consent, team policy, and whether AI tooling gets to quietly redefine what a normal commit looks like.

I also think this lands differently because Git history is not cosmetic. Commit messages end up in reviews, release notes, compliance tooling, blame sessions, dashboards, and management reports. Once a default starts writing metadata into that layer, it stops being a cute assistant feature and starts becoming workflow policy.

{% include pre-version.html %}

![VS Code commit panel showing Copilot added as a Git co-author on a bright repository history view](/static/img/posts/vscode-copilot-coauthor/vscode-copilot-coauthor-1.png){: .wd100}

## What Actually Changed

### VS Code 1.118 turned AI co-authoring on for chat and agent work

The official April 2026 release notes are blunt about it. VS Code now enables Git AI co-authoring by default for chat and agent workflows, and Copilot gets added as a co-author when it makes changes to your files. The related settings reference shows the actual default behind the curtain: `git.addAICoAuthor` now defaults to `chatAndAgent`, not `off`.

That distinction matters more than it sounds like it should. This is not a vague "maybe the assistant helped" badge. It is structured commit metadata. Once it is in the commit message, it is available to any downstream tooling that parses trailers. Internal dashboards can count it. Repo policies can key off it. People scanning history can use it as a trust shortcut, fair or not.

### The default is narrower than full inline completion but broader than most people expected

The good news, if you want to call it that, is that the default is not `all`. According to the settings docs, `all` would append the trailer for every AI-generated change, including inline completions. The shipping default is `chatAndAgent`, which targets Copilot Chat and agent mode changes. So Microsoft did not choose the most aggressive option.

Still, "not the most aggressive option" is a very different thing from "opt-in." That gap is exactly where the backlash is coming from. A lot of developers are perfectly fine with attribution when they explicitly ask an agent to take a task and write half the patch. They are much less fine with the editor deciding that attribution should be automatic unless they go hunt down a setting.

If you have been following the broader Copilot monetization shift, this feels like the same pattern in miniature. The earlier [Copilot billing change](/github/2026/04/28/copilot-ai-credits-trap.html) already showed GitHub moving agent usage from fuzzy convenience into explicit operational accounting. This new co-author default feels like the metadata version of that move.

## Why Developers Are Pushing Back So Hard

### Commit history is an operational record, not a product growth surface

This is the part I think product teams sometimes underrate. Git commits are not just for vibes. They are an operational record. Teams use commit trailers for sign-offs, issue linking, release automation, compliance, ownership mapping, and incident forensics. So when a tool starts writing an AI trailer by default, people do not read it as a neutral transparency feature. They read it as a change to the record itself.

That is why the community reactions are not mild. On Reddit, several developers complained that Copilot was marking commits even when the contribution felt trivial or nonexistent. On Linux Do, the reaction was less angry and more alert, basically a public "heads up" that this is now happening in 1.118 and you may want to turn it off before your next commit.

### The authorship question gets messy fast

There is also a social layer here that nobody agrees on. Some people genuinely want AI attribution. They think it is useful signal. If an agent wrote most of a patch, why hide that? Others think the entire concept is category error because a model is a tool, not an author, and commit trailers should reflect accountable humans, not infrastructure.

Honestly, I get both instincts. If I review a repo and see heavy AI co-author usage, that does tell me something about how code is being produced. But I still do not want that signal introduced through a default that many users will only discover after the commit already exists. Transparency is good. Surprise metadata is not.

{% include pre-version.html %}

There is also a reputational angle that people are not saying quietly anymore. Some developers worry the trailer becomes a scarlet letter in commit history. Others worry the opposite: management may start using these trailers as a crude KPI for "AI adoption" and pressure teams to generate more of them. Neither outcome is especially healthy, and both become more likely once the default starts collecting the signal automatically.

## Why Microsoft Probably Wants This Signal

### It creates measurable evidence of agent usage

If I step back from the annoyance for a second, the strategic logic is obvious. AI companies want attribution trails because attribution trails create measurable usage. Structured metadata is far easier to count than fuzzy self-reporting. You can aggregate it by repo, by team, by workflow, by time period, or by feature surface.

That has value for enterprise reporting, internal product decisions, and maybe even policy enforcement later. It also helps Microsoft make a stronger case that Copilot is not just open in a side panel but actually participating in software delivery. Once commit history carries that marker, the product can point to durable artifacts instead of chat session logs.

### Some teams will actually want the trailer

To be fair, not every team will hate this. Some security and platform teams will like having a visible indicator for AI-assisted commits. Some engineering managers will treat it as a review cue. Some companies will want differential testing or extra scrutiny when a patch is heavily agent-generated. The trailer can support those workflows.

My problem is not that the feature exists. The problem is the power order. A team-level or org-level policy that says "we require AI attribution" is one thing. A product default that silently decides the convention for everyone is another. The first is governance. The second is product steering.

![Developer reviewing VS Code settings where git addAICoAuthor is set to chatAndAgent beside a commit preview](/static/img/posts/vscode-copilot-coauthor/vscode-copilot-coauthor-2.png){: .wd100}

## What I Would Do Right Now

### Change the setting before it surprises your next commit

If you do not want Copilot appended as a co-author for chat or agent changes, the immediate fix is simple:

```json
{
  "git.addAICoAuthor": "off"
}
```

If you like the idea in principle but want tighter scope, keep an eye on the other values the docs mention. `chatAndAgent` is the current default. `all` is wider. `off` is cleanest if you want commit authorship policy handled explicitly somewhere else.

### Decide this as a team, not as individual cleanup work

The bigger fix is policy, not settings sync. Teams should decide whether AI co-author trailers are meaningful, optional, required, or banned. If nobody makes that call, you end up with mixed histories where half the commits carry the marker because people updated VS Code this week and the other half do not because someone is still on the previous version or commits from the CLI.

That kind of inconsistency is useless for governance and annoying for humans. A five-minute team decision is worth more than twenty personal preference debates in pull request comments.

### Ask for consent first, then keep the feature

This is the product change I would make if I owned it. Keep the trailer feature. It has legitimate uses. But the first time Copilot is about to add itself as a co-author, ask. Show a one-time prompt. Explain the scopes. Let the user pick `off`, `chatAndAgent`, or `all`. That gets you transparency without ambush.

Right now the feature feels like the editor made a governance decision on behalf of the repo. That is why the reaction is sharper than Microsoft probably expected. It is not just about credit. It is about who gets to decide what the record says.

## The Setting Is Small The Signal Is Not

This is one of those release-note changes that sounds tiny until you follow where it flows. A commit trailer can become a compliance signal, a management metric, a review shortcut, a social stigma, or a useful transparency layer depending on the team staring at it. That is exactly why defaults matter here more than they do in some random UI toggle.

So yes, Copilot adding itself as a co-author can be useful. I am not even against the idea. I just do not buy the idea that this should quietly show up as the new normal in VS Code and let everyone discover it after their history already changed.

That is the real story to me. Not "AI got credit." More like: a mainstream editor just moved one more piece of software process from user choice into default AI policy. Once you notice that pattern, this setting stops looking small.
