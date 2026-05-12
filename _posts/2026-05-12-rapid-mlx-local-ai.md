---
layout: post
title: "Rapid MLX Makes Local AI On Macs Too Fast To Ignore"
description: "Rapid MLX makes local AI on Mac feel serious again with MLX speed, tool calls, and OpenAI compatible coding-agent workflows."
date: 2026-05-12 14:05:00 +0900
categories: [ai]
tags: [RapidMLX, LocalAI, AppleSilicon, MLX, CodingAgents]
image: rapid-mlx-local-ai/rapid-mlx-local-ai-1.png
lang: en
published: true
---

Rapid MLX is the first local AI on Mac project this week that made me stop treating local inference like a hobby lane.

I know that sounds dramatic. Local AI has had plenty of hype already. We have Ollama, LM Studio, mlx-lm, llama.cpp, tiny wrappers, native menu bar apps, random weekend projects, and enough benchmark charts to make a Mac Studio owner feel financially responsible. But Rapid-MLX hits a slightly different nerve because it is not only saying "run a model locally." It is saying "point your coding tools at this OpenAI-compatible server and keep working."

That is a much more useful claim.

The project surfaced at the top of GeekNews today as an Apple Silicon-focused local AI engine. The [Rapid-MLX GitHub repo](https://github.com/raullenchai/Rapid-MLX) is not shy about its pitch: local models on Mac, no cloud, no API cost, OpenAI-compatible endpoints, tool calling, prompt caching, reasoning separation, and compatibility with coding tools like Cursor, Aider, OpenCode, and Claude-style flows. The headline benchmark claims are spicy too: Qwen3.5-4B at 160 tokens per second on a 16 GB MacBook Air, Nemotron Nano 30B at 141 tokens per second on 32 GB machines, and larger MoE models on high-memory Mac Studios.

I am not going to pretend I verified those numbers on my desk today. I have not. But the direction is believable because the rest of the Mac local AI stack has been moving the same way.

{% include pre-version.html %}

![Rapid MLX local AI on Mac shown as bright Apple Silicon inference nodes powering coding agents](/static/img/posts/rapid-mlx-local-ai/rapid-mlx-local-ai-1.png){: .wd100}

## Rapid MLX Is Riding A Real MLX Wave

### This is not just another wrapper

The reason Rapid MLX feels worth watching is timing. Apple has been pushing MLX as the native path for efficient machine learning on Apple Silicon. Apple's own open source page describes [MLX](https://opensource.apple.com/projects/mlx/) as an array framework designed around the unified memory architecture of Apple Silicon, with Python, Swift, C, and C++ bindings.

That matters because local AI on Mac used to feel like a compromise. You could run small models locally, sure. But once the prompt got long, or the model needed tool calls, or you tried to keep a real coding session alive for an afternoon, the tradeoffs got loud. Slow first token. Weird memory cliffs. Tool calls that worked in one model and broke in another. Context that felt cheap until you actually used it.

Ollama moving into the same lane made this harder to dismiss. On March 30, Ollama said its Apple Silicon preview was [powered by MLX](https://ollama.com/blog/mlx), specifically to speed up coding agents like Claude Code, OpenCode, and Codex. Their published comparison showed prefill going from 1154 to 1810 tokens per second and decode from 58 to 112 tokens per second in the tested setup. Ars Technica and MacRumors both covered the move as a serious speed bump for local models on Macs, not just a niche framework footnote.

So Rapid MLX is not appearing in empty space. It is showing up right as the Mac local AI story is changing from "can I run this?" to "can I run this fast enough to use every day?"

## The Interesting Part Is Tool Calling

### Speed is only the entry ticket

Here is the thing I care about more than the tokens-per-second number: tool calling.

Local chat is nice. Local coding agents are different. Once an agent starts reading files, proposing patches, running tests, and keeping a multi-turn plan alive, the model has to speak a protocol consistently. A lot of small local setups fall apart here. The model answers in prose when the harness expects JSON. It emits half a tool call. It gets confused after two rounds. It works for a demo and then fails in the exact boring way that makes you go back to a cloud model.

Rapid MLX is explicitly built around that pain. The repo talks about OpenAI-compatible tool calls, multiple parser formats, automatic recovery when quantized models produce broken output, and a Model-Harness Index that scores tool calling, HumanEval, and MMLU together. That is the right shape of evaluation for this moment.

I would rather have a slightly slower local model that can reliably call tools than a blazing-fast model that makes my agent harness babysit malformed JSON all day.

That is also why the local AI story connects directly to the proxy-risk story. I wrote yesterday about [cheap Claude API proxies and developer prompt risk](/security/2026/05/11/cheap-claude-api-risk.html), and the uncomfortable point was simple: the endpoint decides who sees your repository context. A local endpoint changes that threat model. It does not magically make the code good. It does not remove review. But it removes a whole class of "unknown middleman gets my prompts" problems.

For teams with sensitive code, that alone is enough to make local inference worth another look.

## The Mac Is Turning Into A Developer AI Box

### This changes who gets to experiment

Apple also gave the ecosystem a useful signal at ICLR 2026. In its research preview, Apple said it would demo local LLM inference on an M5 Max MacBook Pro using MLX, mlx-lm, and open model weights inside Xcode's development environment. That is not a product launch, but it is still a strong clue about where Apple wants developer workflows to go.

The interesting part is not that a very expensive Mac can run a model. We already knew high-memory Macs were weirdly good at local inference. The interesting part is that the stack is becoming more ordinary.

Try running this shape of workflow:

```bash
brew install raullenchai/rapid-mlx/rapid-mlx
rapid-mlx serve qwen3.5-4b
```

Then point an OpenAI-compatible client at:

```text
http://localhost:8000/v1
```

That is the line between hobby and workflow. If I need to patch five SDKs and manually copy prompts into a web UI, I will use it once and forget it. If my existing client can swap base URLs, I might actually leave it running.

This is where local AI on Mac could become boring in the best possible way. Not a science project. Not a weekend benchmark. Just another backend choice.

## The Catch Is Still Memory And Expectations

### Local does not mean free production quality

The bad version of this conversation is easy: "Cloud models are dead, run everything on your laptop." No. That is not where we are.

Memory still matters. Ollama's own MLX preview told users to bring more than 32 GB of unified memory for the bigger coding model path. Rapid MLX lists different model tiers by Mac class, which is helpful because it keeps expectations grounded. A 16 GB MacBook Air can do useful local work, but it is not a magic frontier server. A 128 GB Mac Studio Ultra is a different animal.

There is also a quality question. Quantized local models can be fast and surprisingly capable, but for hard architecture work, subtle security reasoning, and unfamiliar codebases, I still expect frontier cloud models to win a lot of the time. My practical split would be boring:

| Workload | Local AI On Mac | Cloud Model |
|---|---|---|
| Small edits and repetitive refactors | Strong fit | Often overkill |
| Private repo summarization | Strong fit | Risk depends on policy |
| Long architecture review | Useful first pass | Still likely stronger |
| Security-sensitive code generation | Safer endpoint | Better reasoning may matter |
| Massive context ingestion | Hardware dependent | Usually easier |

That is not a knock on Rapid MLX. That is the actual product question. Local AI wins when latency, privacy, cost, and availability matter enough to accept model limits. Cloud AI wins when raw capability matters more than control.

The fun part is that the boundary keeps moving.

{% include pre-version.html %}

![Rapid MLX coding agent workflow with local Mac inference cache tool calls and cloud fallback options](/static/img/posts/rapid-mlx-local-ai/rapid-mlx-local-ai-2.png){: .wd100}

## Why This One Feels Different

### Developers do not need another chatbot

What developers need is a controllable execution path.

That means a local server that speaks APIs existing tools already understand. It means prompt cache behavior that makes long sessions less painful. It means tool calls that survive quantization. It means a clear answer to "what model fits on my machine?" It means a setup path that does not require turning your laptop into a research cluster.

Rapid MLX appears to be aiming right at that layer. Not the model itself. Not the editor. The inference and compatibility layer in between.

That is a good place to be in 2026. Coding agents are getting more common, but every team is still wrestling with the same practical mess: cost, privacy, latency, review quality, vendor lock-in, and whether the model can survive real tool use. A fast local endpoint will not solve all of that. But it gives developers another lever.

I would not migrate a team because of one benchmark table. I would test it like infrastructure:

```bash
time rapid-mlx serve qwen3.5-4b
```

Then run the same small agent tasks through a cloud model and the local server:

```text
1. summarize this repo
2. find one low-risk bug
3. propose a patch
4. run the test command
5. explain what changed
```

If the local path gets through that without tool-call drama, then it earns a permanent slot in the toolbox.

Not as a replacement for everything. As the default for work that should never have needed a remote API call in the first place.

That is why Rapid MLX is worth a closer look. The hot take is not "Macs beat the cloud." The real take is simpler: local AI on Mac is getting fast enough, compatible enough, and agent-aware enough that developers can finally treat it like infrastructure instead of a toy.
