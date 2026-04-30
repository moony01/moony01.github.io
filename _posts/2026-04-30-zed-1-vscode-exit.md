---
layout: post
title: "Zed 1.0 Finally Makes the VS Code Exit Feel Real"
description: "Zed 1.0 is out with Rust speed, native Git, and AI agent support. Here is why the first real VS Code alternative suddenly feels practical."
date: 2026-04-30 12:04:27 +0900
categories: [others]
tags: [Zed, Rust, VSCode, CodeEditor, AIAgents]
image: zed-1-vscode-exit/zed-1-vscode-exit-1.png
lang: en
published: true
---

Zed 1.0 landed on April 29, 2026, and this is the first time I have looked at a new editor release and thought: okay, this might actually move people. Not because developers suddenly got tired of VS Code this week. That fatigue has been sitting there for a while. It is more that Zed finally crossed the line from "promising fast thing" to "serious daily-driver candidate" at exactly the moment a lot of people are rethinking what they want from an editor.

That timing matters. Editors do not win on benchmarks alone. They win when a big enough group of developers feels that the old default has become a little too heavy, a little too busy, or a little too shaped by somebody else's priorities. Zed 1.0 showed up with a clean answer to that mood: Rust core, GPU-first UI, native Git work, collaborative editing, and an AI story that is built in instead of stapled on after the fact.

I also think the 1.0 label hits differently than people admit. Plenty of us tried Zed months ago, liked the speed, then bounced because one missing detail broke the spell. A real milestone release is not just marketing. It is a signal that the missing-feature roulette is supposed to be less random now. That is why this launch picked up on Zed's own channels, on Phoronix, on Reddit, and on GeekNews basically at the same time.

{% include pre-version.html %}

One more reason this feels bigger than a normal release note dump: the editor conversation is weird again. AI features are everywhere, but a lot of developers are not actually asking for more floating side panels and more chat chrome. They want flow. They want fast file movement. They want Git operations that do not feel bolted onto a browser app. That is the lane Zed is trying to own.

![Zed 1.0 workspace replacing VS Code with bright Rust powered editor panels and agent sidebars](/static/img/posts/zed-1-vscode-exit/zed-1-vscode-exit-1.png){: .wd100}

## Why Zed 1.0 Feels Different This Time

### The missing feature threshold looks much healthier now

The official launch post is pretty blunt about what 1.0 is supposed to mean. Not "done." Not "perfect." More like: most developers should be able to move in without immediately hitting a wall. That is a better 1.0 definition than the polished corporate version, because it matches how editors are actually judged. Nobody cares whether an editor is philosophically complete. They care whether it breaks their day.

Zed seems to understand that now. The 1.0 release notes are not trying to sell one magic killer feature. They read like a long list of friction sanding. Bookmarks landed. Git got a `view commit` action. Vim flicker got fixed. JavaScript and TypeScript outline bugs got fixed. True-color terminal rendering got fixed. WSL-related extension path handling got fixed. That is the kind of boring maturity work that makes people retry a product.

### The release landed into perfect editor-war timing

This part is almost unfair for the competition. VS Code is still the default for a reason. The extension ecosystem is massive, the workflows are familiar, and entire teams are built around it. But the goodwill reservoir is not infinite. The more every editor pitch turns into an AI pitch, the more some developers start looking around for the tool that still feels like a tool first.

That is where Zed has a real opening. It can present itself as both modern and suspicious of bloat. That sounds contradictory, but right now it is exactly what a lot of people want. If you already work in terminal-heavy loops like the [Android CLI agent workflow](/others/2026/04/23/android-cli-agent-workflow.html), the editor does not need to become your second operating system. It needs to stay fast, predictable, and out of the way until you need depth.

## The Real Pitch Is Not Just Speed

### Rust and GPU rendering are doing branding work and practical work

The obvious headline is performance. Zed's launch post leans hard into the story that Atom taught the team where web-stack editors hit a ceiling, and that Zed was rebuilt more like a video game than a web page. That line is sticky for a reason. Developers are tired of hearing "lightweight" from tools that still feel like a browser full of plugins pretending to be native.

But the interesting bit is not just that Zed is written in Rust. It is that the whole product identity is organized around owning more of the stack. Their GPUI approach, GPU-centric rendering model, and refusal to inherit Electron baggage all feed the same emotional pitch: this thing is not borrowing its shape from the old editor world. Whether that alone makes it better is debatable. Whether it makes people curious is not.

Phoronix picked up the launch almost immediately, and that is a useful signal in itself. When Linux-focused technical media notices an editor 1.0 the same day and emphasizes cross-platform support, collaborative editing, Git integration, AI support, and Rust implementation, that usually means the product has escaped pure niche hype and crossed into broader developer-tool relevance.

### Native Git and collaboration are more important than the shiny AI bits

I know the AI-native angle gets the loudest headlines, but the features I keep coming back to are the less glamorous ones. Git inside the editor matters. Debugging matters. SSH remoting matters. Multi-platform support matters. These are the features that stop the "cool side editor" from being permanently stuck in side-project territory.

The release notes reinforce that. Yes, Zed added more model support and keeps pushing agent integration, but the week-one credibility boost comes from all the everyday paper cuts that got smaller. That is why I do not read this as "another AI editor launch." I read it as a traditional editor maturity milestone that happens to include an AI opinion.

## The AI Native Story Is Both the Hook and the Risk

### Parallel agents sound great when they stay subordinate

Zed's launch message is very explicit here. It wants to be an AI-native editor. It talks about parallel agents, edit predictions, and the Agent Client Protocol opening the product to multiple agent providers. On paper, that is a strong position. Editors that pretend AI is optional decoration are kidding themselves a bit. The tooling stack really is shifting.

{% include pre-version.html %}

What I like is that Zed is trying to frame AI as something that belongs inside a high-performance local tool, not something that should replace the tool. That is a much saner pitch than the endless "just tell the agent what app you want" nonsense. Developers still need a place to inspect diffs, reason about structure, and recover from bad suggestions without feeling trapped inside a chat product.

That balance is exactly why this launch is interesting to me.

![Zed 1.0 Git workflow with commit view bookmarks and AI agent tasks on a bright desktop](/static/img/posts/zed-1-vscode-exit/zed-1-vscode-exit-2.png){: .wd100}

### The backlash is real, and Zed is not escaping it

At the same time, the Reddit reaction makes it clear that the AI story is also the sharpest edge. Some people are excited that Zed can work with multiple agents. Some are asking whether the AI can be fully disabled before they will even try it. Others are still annoyed that the product's marketing spends too much time talking about agents instead of editor basics.

That tension is not a small footnote. It is the whole 2026 editor market compressed into one launch. If you overplay AI, you scare off the people who want a better editor. If you underplay AI, you look dated five minutes later. Zed is trying to walk the middle path: yes, it is AI-native; no, it does not have to become an AI circus when you just want to edit code.

Honestly, that may be the smartest part of the launch. Even commenters in the Rust thread who do not want AI at all were still talking about trying Zed because the core editing experience has gotten good enough to justify it. That is a much stronger signal than "people like the demo."

## What Still Stops It From Killing VS Code

### Ecosystem gravity is still brutal

This is the boring truth every challenger has to survive. A fast editor can win individuals long before it wins teams. VS Code has too much extension gravity, too much habit gravity, and too much company-process gravity to get displaced by one good release. Zed 1.0 makes the switch feel plausible. It does not make the switch cheap.

If your workflow depends on obscure extensions, deeply specific remote setups, or team-wide conventions built around the old default, the cost of moving is still real. A lot of editor migrations die there. Not because the new tool is worse, but because the old one is embedded in too many tiny routines that nobody writes down.

### Some people still see a very unfinished 1.0

The other limit is expectation management. A 1.0 launch attracts the toughest audience: people who intentionally waited. Those users are not grading on a startup curve anymore. They are comparing against the editor they already know, with all of its ugly strengths. That is why the Reddit threads are full of both celebration and nitpicking. One person calls Zed the best editor they have used. Another points at Linux or WSL gaps and says 1.0 still feels early.

Both reactions can be true. The launch can be a real milestone and still not be enough for your stack today. That does not weaken the story. It actually makes it more believable. The products that matter usually have this exact shape at the point where they start becoming unavoidable.

## So Would I Switch Right Now

### If flow is your main complaint, probably yes

If you are tired of editor drag, tired of Electron-shaped friction, or tired of AI features being shoved into a UI that already felt crowded, Zed 1.0 looks very easy to justify as a serious trial. The official story is strong, the release notes back it up, and the community reaction looks like more than launch-day politeness. That combination does not happen by accident.

### If your whole world lives in extensions, maybe not yet

If your daily work relies on a very particular plugin stack, I would still treat this as a staged move instead of a dramatic uninstall moment. Try it for solo work first. Try it for terminal-heavy projects. Try it in the parts of your week where performance and focus matter more than ecosystem completeness.

That is still a big shift, though. A year ago, that advice would have sounded generous. Today it sounds practical. And that is the real news. Zed 1.0 did not just ship another fast Rust editor. It made the idea of actually leaving the default feel a lot less theoretical.
