---
layout: post
title: "Next JS Security Bugs Make Middleware Trust Too Risky"
description: "Next JS security patches cover RSC DoS, middleware bypass, SSRF, and XSS. What developers should patch and stop trusting."
date: 2026-05-09 14:01:37 +0900
categories: [security]
tags: [NextJS, React, RSC, WebSecurity, Middleware]
image: react-nextjs-security-patch/react-nextjs-security-patch-1.webp
lang: en
published: true
---

Next JS security had a rough week, and honestly, this one feels less like "run npm update" and more like "please stop treating middleware as a magic wall."

React Server Components already had a weird security year after React2Shell and the follow-up DoS fixes. Now Cloudflare says multiple new React and Next.js vulnerabilities landed together: denial of service, middleware and proxy bypasses, SSRF, XSS, cache poisoning, and Image Optimization API trouble. Vercel's GitHub advisories put several of the Next.js issues in the High bucket. The patched versions are clear enough: Next.js 15.5.16 or 16.2.5, and React server packages at 19.0.6, 19.1.7, or 19.2.6.

That is the easy part. The uncomfortable part is what the bugs say about how we design App Router apps. A lot of teams have been putting auth logic, tenant checks, bot filters, and internal-routing assumptions into middleware because it feels central and clean. This week is a reminder that a central-looking check is only central if every transport path actually goes through it.

{% include pre-version.html %}

I am not saying panic. I am saying patch first, then re-read your own route boundaries with much less trust than yesterday.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-1-400.webp 400w,
            /static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-1-800.webp 800w,
            /static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-1.webp"
    alt="Next JS security dashboard showing React Server Components patches and middleware boundary checks"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## Next JS Security Is Now About Route Shape

### The boring version is still urgent

The Cloudflare changelog is the page I would send to a team lead first because it does not bury the practical advice. Multiple vulnerabilities were disclosed by React and Vercel. Cloudflare recommends immediate updates. It also lists patched React server package versions and patched Next.js versions. That is exactly the kind of advisory I like: fewer vibes, more version numbers.

The DoS item is familiar by now. React Server Components deserialize server-side payloads, and specially crafted requests can make unpatched environments spend too much CPU or memory. That is not flashy like RCE, but availability is production security. If one request class can chew through a server process, your incident channel does not care that confidentiality stayed intact.

The newer Next.js advisories are more interesting to me because they poke at assumptions around App Router transport variants. One advisory says segment-prefetch routes could bypass middleware or proxy checks in affected configurations. Another says dynamic route parameter injection could bypass middleware. There are also advisories around SSRF through WebSocket upgrades, connection exhaustion in Cache Components, XSS via CSP nonces, XSS in `beforeInteractive` scripts, and Image Optimization API DoS.

That sounds like a grab bag. I think it is more coherent than it looks. The pattern is that modern framework features create more request shapes than developers casually hold in their head.

### Middleware is a checkpoint, not your whole policy

Middleware is attractive because it feels like one clean place to put policy. You can read cookies, check a session, rewrite a path, block a suspicious request, and keep route code tidy. I get the appeal. I use that pattern too.

But middleware gets dangerous when the rest of the app stops enforcing the same rule. If a page, route handler, server action, or data loader assumes "middleware already handled auth," then every alternate path becomes a security question. Segment-prefetch, data routes, RSC payloads, image routes, WebSocket upgrades, internationalized paths, cached responses, and internal headers all become part of your trust boundary.

That is the part nobody wants to put in the architecture diagram.

I keep thinking about the [Ubuntu DDoS and security update outage](/security/2026/05/04/ubuntu-ddos-security-updates.html) from earlier this week. Different stack, same lesson: developer infrastructure is security infrastructure once teams depend on it in production. Next.js route machinery is not just framework plumbing anymore. It is where auth, caching, rendering, and data access collide.

## The Patch List Is Shorter Than The Audit List

### Update Next.js and React server packages first

The first move is still boring, and boring is good here.

```bash
npm ls next react-server-dom-webpack react-server-dom-parcel react-server-dom-turbopack
npm view next version
npm outdated next react-server-dom-webpack react-server-dom-parcel react-server-dom-turbopack
```

If you are on Next.js 15, get to 15.5.16 or newer. If you are on Next.js 16, get to 16.2.5 or newer. If your framework or bundler pulls in React Server Components packages directly, check the React server package versions too. Cloudflare lists 19.0.6, 19.1.7, and 19.2.6 as patched React package lines for the newly disclosed set.

One thing I would not do is assume a green Dependabot PR means the whole estate is clean. Monorepos hide old Next apps. Internal templates lag behind. Docker images pin lockfiles. Edge adapters and deployment plugins can carry their own assumptions. That is where security updates become archeology.

So yes, update the app. Then search the fleet.

```bash
rg '"next":|"react-server-dom-' package.json pnpm-lock.yaml package-lock.json yarn.lock
rg 'middleware|proxy|authorized|auth\\(|getServerSession|cookies\\(' app pages src
```

The second command is intentionally noisy. You want noisy for the first pass. The goal is to find places where authorization might be split across middleware and downstream code. If the only real check lives in middleware, that route deserves scrutiny.

{% include pre-version.html %}

### WAF coverage helps, but it is not a release plan

Cloudflare says existing managed WAF rules already cover the newly disclosed Server Components DoS pattern, and those rules are enabled by default for customers using the managed ruleset, including free-plan customers using the free managed ruleset. That is good. I like free mitigations.

But the same changelog is careful about the limit. Several disclosed vulnerabilities are not safe or practical to block globally at the WAF layer. Some may need custom rules. Some would risk breaking application behavior if Cloudflare pushed a managed rule for everyone. That is exactly what I would expect. A WAF can detect generic attack patterns. It cannot reliably understand every app's authorization model.

That is why "we are behind Cloudflare" is not an answer to this advisory. It is a layer. Keep it. Tune it. Check that managed rules are enabled. But still patch the framework.

## The Real Fix Is Moving Critical Checks Downstream

### Auth should survive alternate paths

Here is the thing I would change after this patch cycle: every protected route should still be protected if middleware silently disappears.

That sounds extreme until you phrase it differently. Middleware should be acceleration and routing policy. Route handlers and server-side data access should enforce authorization where the sensitive data is actually read or mutated. If your route returns private customer data, that route should know who the customer is. If your server action changes billing state, that action should check the actor and tenant. If your loader fetches an admin-only report, the loader should fail closed.

You can still use middleware. I am not arguing for deleting it. I am arguing against making it the only locked door in a house with eight weird entrances.

The same applies to cache keys. If auth state, tenant ID, locale, preview mode, request headers, or route variants affect the response, then caching has to be part of the security review. A cache poisoning bug is often not about a clever trick. It is about one request shape being treated as equivalent to another when it absolutely is not.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-2-400.webp 400w,
            /static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-2-800.webp 800w,
            /static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/react-nextjs-security-patch/react-nextjs-security-patch-2.webp"
    alt="React Server Components request variants flowing through Next JS middleware and route level authorization"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### Test the paths people do not click

The annoying part of App Router security is that the browser is not the whole client anymore. Prefetch does work. RSC fetches do work. Image optimization does work. Server actions do work. WebSocket upgrade paths do work. Bots and attackers do not have to click your UI in the same way a user does.

So I would add tests that hit the boring surfaces directly:

```ts
const protectedUrls = [
  "/dashboard",
  "/dashboard?_rsc=test",
  "/en/dashboard",
  "/api/account",
  "/_next/image?url=%2Fprivate.png&w=640&q=75",
];

for (const url of protectedUrls) {
  test(`anonymous request is blocked for ${url}`, async ({ request }) => {
    const response = await request.get(url);
    expect([401, 403, 307, 308]).toContain(response.status());
  });
}
```

Do not copy that list blindly. Your app has its own route shape. The point is to test policy at the HTTP boundary, not just at the React component boundary. If a route is protected, prove it stays protected through the variants your framework generates.

I would also add a rule to code review: middleware-only auth is allowed only for low-risk gating, not for data authorization. That is a blunt rule, but blunt rules are useful when a pattern keeps getting misused because it feels too convenient.

## Why This One Will Stick Around

### React Server Components changed the security model

React Server Components are not doomed. Next.js is not doomed. I am still building with both. But RSC did move more logic across the client-server boundary, and security bugs around boundaries tend to come in clusters. The React team said something similar after earlier disclosures: when a critical CVE lands, researchers probe nearby code paths and variant techniques. That is normal. It is also exhausting.

The mistake would be treating each advisory as a tiny isolated patch note. A DoS here, a middleware bypass there, an XSS over there. The larger story is that the framework is doing more work on the server, and developers need to reason about more generated behavior.

I actually think this is healthy in the long run. Frameworks get better when ugly edges get found, patched, documented, and turned into boring defaults. But the transition period is rough. The teams that survive it well are the ones that patch quickly and simplify their own trust boundaries instead of waiting for the framework to make every risky pattern impossible.

My read: Next JS security just became a route-audit problem, not a version-bump problem. The version bump is mandatory. The audit is where you stop the next advisory from becoming your incident.
