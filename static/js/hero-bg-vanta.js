(function () {
  var output = document.getElementById('hero-code-output');
  if (!output) return;

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var linePool = [
    // moony01 studio — core config
    "const moony01 = new Studio({ theme: 'dark', lang: 'ko', mode: 'creative' });",
    "export const studioConfig = { author: 'moony01', site: 'moony01.github.io', since: 2022 };",
    "const { posts, categories, tags } = await moony01.fetchAll({ locale: 'ko' });",
    "moony01.on('deploy', (rev) => console.log(`[studio] shipped ${rev} to prod`));",
    "const draft = moony01.createPost({ title, category, tags, date: new Date() });",

    // async / fetch
    "const res = await fetch('/api/rankings?season=2026&limit=100', { signal });",
    "const { data, error } = await supabase.from('posts').select('id,title,slug,published_at');",
    "await cache.set(`post:${slug}`, JSON.stringify(payload), { ex: 3600 });",
    "const signal = new AbortController(); setTimeout(() => signal.abort(), 5000);",
    "if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);",
    "const [meta, body] = await Promise.all([fetchMeta(slug), fetchBody(slug)]);",

    // TypeScript types
    "type Post = { id: string; title: string; slug: string; category: Category };",
    "type VoteQuota = { guest: 30; member: 60; pro: 300 };",
    "interface StudioConfig { author: string; baseUrl: string; theme: 'light' | 'dark' };",
    "type DeployResult = { rev: string; ts: number; status: 'ok' | 'fail' };",
    "const quota: Record<Plan, number> = { guest: 30, member: 60, pro: 300 };",

    // 재귀함수
    "function fibonacci(n: number): number { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
    "const deepMerge = <T>(a: T, b: Partial<T>): T => ({ ...a, ...b });",
    "function flatten<T>(arr: (T | T[])[]): T[] { return arr.flatMap(x => Array.isArray(x) ? flatten(x) : x); }",
    "const treeMap = (node, fn) => ({ ...fn(node), children: node.children?.map(c => treeMap(c, fn)) });",
    "function memoize(fn) { const cache = {}; return (...args) => cache[args] ?? (cache[args] = fn(...args)); }",

    // 반복문 / 배열 고차함수
    "for (const post of posts) { await indexPost(post.slug, post.content); }",
    "const slugMap = posts.reduce((acc, p) => ({ ...acc, [p.slug]: p }), {});",
    "const published = posts.filter(p => p.status === 'published').sort((a,b) => b.date - a.date);",
    "for (let i = 0; i < retries; i++) { try { return await send(req); } catch { await sleep(2**i * 100); } }",
    "const tagCloud = tags.map(t => ({ tag: t, count: posts.filter(p => p.tags.includes(t)).length }));",
    "while (cursor) { const page = await fetch(`/api/posts?cursor=${cursor}`); cursor = page.next; }",

    // SQL
    "SELECT id, title, slug FROM posts WHERE status='published' ORDER BY published_at DESC LIMIT 10;",
    "INSERT INTO page_views (post_id, ua, ip_hash, viewed_at) VALUES ($1,$2,$3,NOW());",
    "SELECT category, COUNT(*) AS cnt FROM posts GROUP BY category ORDER BY cnt DESC;",

    // git / CI
    "git checkout -b feature/moony01-hero-typing && git push -u origin HEAD",
    "git add . && git commit -m 'feat(hero): replace linePool with moony01 code snippets'",
    "bundle exec jekyll build --future && echo 'build ok'",
    "docker compose up -d api db redis && docker compose logs -f api",

    // 기타 유틸
    "const slug = title.toLowerCase().replace(/[^\\w\uAC00-\uD7A3]+/g, '-').replace(/^-|-$/g, '');",
    "const readingTime = Math.ceil(content.split(/\\s+/).length / 200);",
    "return rows.filter(row => UUID_RE.test(row.id)).map(row => ({ ...row, url: `/post/${row.slug}` }));",
    "logger.info('[moony01] deploy complete', { rev, env: process.env.NODE_ENV, ts: Date.now() });",
  ];

  var timer = null;
  var screenLines = [];
  var activeIndex = 0;
  var activeTarget = '';
  var activeMode = 'type';
  var activePos = 0;
  var maxLines = 24;
  var maxChars = 100;

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function chooseLine() {
    return linePool[random(0, linePool.length - 1)];
  }

  function computeCapacity() {
    var cs = window.getComputedStyle(output);
    var lineHeight = parseFloat(cs.lineHeight) || 18;
    var fontSize = parseFloat(cs.fontSize) || 12;
    var width = output.clientWidth || 900;
    var height = output.clientHeight || 380;

    maxLines = Math.max(8, Math.floor(height / lineHeight));
    maxChars = Math.max(28, Math.floor(width / (fontSize * 0.62)));
  }

  function fitLine(text) {
    var line = String(text || '').replace(/\s+/g, ' ').trim();
    if (line.length <= maxChars) return line;
    return line.slice(0, maxChars);
  }

  function randomLineIndex() {
    return random(0, Math.max(0, maxLines - 1));
  }

  function chooseTargetFromCurrent(currentLine) {
    var candidate = fitLine(chooseLine());
    if (candidate === currentLine && maxChars > 24) {
      candidate = fitLine(chooseLine());
    }
    return candidate;
  }

  function render() {
    output.textContent = screenLines.join('\n');
  }

  function seedLines() {
    screenLines = [];
    for (var i = 0; i < maxLines; i += 1) {
      screenLines.push(fitLine(chooseLine()));
    }

    activeIndex = randomLineIndex();
    activeTarget = chooseTargetFromCurrent(screenLines[activeIndex] || '');
    activeMode = Math.random() < 0.34 ? 'erase' : 'type';
    activePos = activeMode === 'erase' ? (screenLines[activeIndex] || '').length : 0;

    if (activeMode === 'type') {
      screenLines[activeIndex] = '';
    }

    render();
  }

  function pickNextActive() {
    activeIndex = randomLineIndex();
    var current = screenLines[activeIndex] || '';

    if (Math.random() < 0.32 && current.length > 6) {
      activeMode = 'erase';
      activePos = current.length;
      activeTarget = current;
      return;
    }

    activeMode = 'type';
    activeTarget = chooseTargetFromCurrent(current);
    activePos = 0;
    screenLines[activeIndex] = '';
  }

  function tick() {
    var line = screenLines[activeIndex] || '';

    if (activeMode === 'type') {
      activePos += 1;
      screenLines[activeIndex] = activeTarget.slice(0, activePos);
      render();

      if (activePos >= activeTarget.length) {
        pickNextActive();
        timer = window.setTimeout(tick, random(90, 170));
        return;
      }

      timer = window.setTimeout(tick, random(11, 28));
      return;
    }

    if (!line.length) {
      pickNextActive();
      timer = window.setTimeout(tick, random(35, 80));
      return;
    }

    activePos = Math.max(0, activePos - 1);
    screenLines[activeIndex] = line.slice(0, activePos);
    render();

    if (activePos <= 0) {
      pickNextActive();
      timer = window.setTimeout(tick, random(32, 70));
      return;
    }

    timer = window.setTimeout(tick, random(5, 12));
  }

  computeCapacity();
  seedLines();

  if (reducedMotion) {
    return;
  }

  tick();

  var rafId = null;
  function onResize() {
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(function () {
      computeCapacity();
      if (!screenLines.length) {
        seedLines();
        return;
      }

      if (screenLines.length > maxLines) {
        screenLines = screenLines.slice(0, maxLines);
      }

      while (screenLines.length < maxLines) {
        screenLines.push(fitLine(chooseLine()));
      }

      for (var i = 0; i < screenLines.length; i += 1) {
        screenLines[i] = fitLine(screenLines[i]);
      }

      if (activeIndex > maxLines - 1) {
        activeIndex = randomLineIndex();
      }

      if (activeMode === 'type') {
        activeTarget = fitLine(activeTarget || chooseLine());
        activePos = Math.min(activePos, activeTarget.length);
        screenLines[activeIndex] = activeTarget.slice(0, activePos);
      } else {
        activePos = Math.min(activePos, (screenLines[activeIndex] || '').length);
        screenLines[activeIndex] = (screenLines[activeIndex] || '').slice(0, activePos);
      }

      render();
    });
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('beforeunload', function () {
    if (timer) window.clearTimeout(timer);
    window.removeEventListener('resize', onResize);
  });
})();
