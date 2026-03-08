#!/usr/bin/env node
// Blog post image generator for chardet AI GPL->MIT license laundering post
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const slug = 'chardet-ai-gpl-mit-license-laundering';
const outDir = path.join('C:/Users/mun01/workspace/moony01.github.io/static/img/posts', slug);
fs.mkdirSync(outDir, { recursive: true });

// ─── Hero Image: License Laundering Machine ─────────────────────────────────
const heroSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8faff;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#fff8f0;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c4dff;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#448aff;stop-opacity:0.9"/>
    </linearGradient>
    <linearGradient id="gplGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#d32f2f;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#b71c1c;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="mitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2e7d32;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1b5e20;stop-opacity:1"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="2" dy="4" stdDeviation="6" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bg)"/>

  <!-- Subtle grid -->
  ${Array.from({length: 20}, (_, i) => `<line x1="${i*64}" y1="0" x2="${i*64}" y2="675" stroke="#e8ecf0" stroke-width="0.4" opacity="0.5"/>`).join('')}
  ${Array.from({length: 12}, (_, i) => `<line x1="0" y1="${i*64}" x2="1200" y2="${i*64}" stroke="#e8ecf0" stroke-width="0.4" opacity="0.5"/>`).join('')}

  <!-- === LEFT SIDE: GPL Document === -->
  <g filter="url(#shadow)">
    <rect x="60" y="120" width="200" height="280" rx="8" fill="white" stroke="#e0e0e0" stroke-width="1.5"/>
    <rect x="60" y="120" width="200" height="50" rx="8" fill="url(#gplGrad)"/>
    <rect x="60" y="162" width="200" height="8" fill="url(#gplGrad)" rx="0"/>
    <text x="160" y="152" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">LGPL v2.1</text>
  </g>

  <!-- Code lines on GPL doc -->
  <rect x="80" y="185" width="140" height="8" rx="3" fill="#ffcdd2" opacity="0.8"/>
  <rect x="80" y="200" width="100" height="8" rx="3" fill="#ffcdd2" opacity="0.6"/>
  <rect x="80" y="215" width="160" height="8" rx="3" fill="#ffcdd2" opacity="0.8"/>
  <rect x="80" y="230" width="120" height="8" rx="3" fill="#ffcdd2" opacity="0.6"/>
  <rect x="80" y="245" width="150" height="8" rx="3" fill="#ffcdd2" opacity="0.8"/>
  <rect x="80" y="260" width="90" height="8" rx="3" fill="#ffcdd2" opacity="0.6"/>
  <rect x="80" y="275" width="130" height="8" rx="3" fill="#ffcdd2" opacity="0.8"/>
  <rect x="80" y="290" width="110" height="8" rx="3" fill="#ffcdd2" opacity="0.6"/>

  <!-- Copyleft symbol -->
  <circle cx="160" cy="355" r="18" fill="none" stroke="#d32f2f" stroke-width="3"/>
  <text x="160" y="363" font-family="Arial,sans-serif" font-size="22" fill="#d32f2f" text-anchor="middle">&#x1F12F;</text>
  <text x="160" y="340" font-family="monospace" font-size="10" fill="#d32f2f" text-anchor="middle">chardet v6</text>

  <!-- Label -->
  <text x="160" y="430" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#d32f2f" text-anchor="middle">Copyleft</text>
  <text x="160" y="448" font-family="Arial,sans-serif" font-size="11" fill="#888" text-anchor="middle">"Share alike"</text>

  <!-- === ARROW INTO AI === -->
  <line x1="270" y1="260" x2="400" y2="260" stroke="#7c4dff" stroke-width="3" stroke-dasharray="10,5"/>
  <polygon points="400,260 385,250 385,270" fill="#7c4dff"/>
  <text x="335" y="245" font-family="monospace" font-size="10" fill="#7c4dff" text-anchor="middle">input</text>

  <!-- === CENTER: AI "Laundering" Machine === -->
  <g filter="url(#shadow)">
    <rect x="410" y="130" width="320" height="300" rx="20" fill="url(#aiGlow)"/>
  </g>

  <!-- Machine interior glow -->
  <rect x="425" y="145" width="290" height="270" rx="14" fill="white" opacity="0.12"/>

  <!-- AI Brain icon -->
  <circle cx="570" cy="220" r="50" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
  <circle cx="570" cy="220" r="35" fill="none" stroke="white" stroke-width="1.5" opacity="0.4"/>
  <!-- Neural nodes -->
  <circle cx="570" cy="185" r="8" fill="white" opacity="0.9"/>
  <circle cx="605" cy="205" r="8" fill="white" opacity="0.9"/>
  <circle cx="605" cy="235" r="8" fill="white" opacity="0.9"/>
  <circle cx="570" cy="255" r="8" fill="white" opacity="0.9"/>
  <circle cx="535" cy="235" r="8" fill="white" opacity="0.9"/>
  <circle cx="535" cy="205" r="8" fill="white" opacity="0.9"/>
  <circle cx="570" cy="220" r="10" fill="white" opacity="1"/>
  <!-- Neural connections -->
  <line x1="570" y1="185" x2="605" y2="205" stroke="white" stroke-width="1.5" opacity="0.6"/>
  <line x1="605" y1="205" x2="605" y2="235" stroke="white" stroke-width="1.5" opacity="0.6"/>
  <line x1="605" y1="235" x2="570" y2="255" stroke="white" stroke-width="1.5" opacity="0.6"/>
  <line x1="570" y1="255" x2="535" y2="235" stroke="white" stroke-width="1.5" opacity="0.6"/>
  <line x1="535" y1="235" x2="535" y2="205" stroke="white" stroke-width="1.5" opacity="0.6"/>
  <line x1="535" y1="205" x2="570" y2="185" stroke="white" stroke-width="1.5" opacity="0.6"/>

  <!-- Machine labels -->
  <text x="570" y="224" font-family="monospace" font-size="11" font-weight="bold" fill="#311b92" text-anchor="middle">LLM</text>
  <text x="570" y="310" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">AI Rewrite</text>
  <text x="570" y="332" font-family="monospace" font-size="11" fill="white" text-anchor="middle" opacity="0.8">"ground-up rewrite"</text>

  <!-- Washing bubbles -->
  <circle cx="450" cy="180" r="12" fill="white" opacity="0.15"/>
  <circle cx="690" cy="200" r="10" fill="white" opacity="0.12"/>
  <circle cx="460" cy="380" r="14" fill="white" opacity="0.1"/>
  <circle cx="680" cy="350" r="8" fill="white" opacity="0.15"/>
  <circle cx="500" cy="160" r="6" fill="white" opacity="0.2"/>
  <circle cx="640" cy="400" r="11" fill="white" opacity="0.12"/>

  <!-- Recycling/washing arrows inside -->
  <path d="M 520 370 A 30 30 0 0 1 550 360" fill="none" stroke="white" stroke-width="2" opacity="0.4"/>
  <path d="M 590 360 A 30 30 0 0 1 620 370" fill="none" stroke="white" stroke-width="2" opacity="0.4"/>

  <!-- === ARROW OUT OF AI === -->
  <line x1="740" y1="260" x2="870" y2="260" stroke="#2e7d32" stroke-width="3" stroke-dasharray="10,5"/>
  <polygon points="870,260 855,250 855,270" fill="#2e7d32"/>
  <text x="805" y="245" font-family="monospace" font-size="10" fill="#2e7d32" text-anchor="middle">output</text>

  <!-- === RIGHT SIDE: MIT Document === -->
  <g filter="url(#shadow)">
    <rect x="880" y="120" width="200" height="280" rx="8" fill="white" stroke="#e0e0e0" stroke-width="1.5"/>
    <rect x="880" y="120" width="200" height="50" rx="8" fill="url(#mitGrad)"/>
    <rect x="880" y="162" width="200" height="8" fill="url(#mitGrad)" rx="0"/>
    <text x="980" y="152" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">MIT License</text>
  </g>

  <!-- Code lines on MIT doc -->
  <rect x="900" y="185" width="140" height="8" rx="3" fill="#c8e6c9" opacity="0.8"/>
  <rect x="900" y="200" width="100" height="8" rx="3" fill="#c8e6c9" opacity="0.6"/>
  <rect x="900" y="215" width="160" height="8" rx="3" fill="#c8e6c9" opacity="0.8"/>
  <rect x="900" y="230" width="120" height="8" rx="3" fill="#c8e6c9" opacity="0.6"/>
  <rect x="900" y="245" width="150" height="8" rx="3" fill="#c8e6c9" opacity="0.8"/>
  <rect x="900" y="260" width="90" height="8" rx="3" fill="#c8e6c9" opacity="0.6"/>
  <rect x="900" y="275" width="130" height="8" rx="3" fill="#c8e6c9" opacity="0.8"/>
  <rect x="900" y="290" width="110" height="8" rx="3" fill="#c8e6c9" opacity="0.6"/>

  <!-- Checkmark -->
  <circle cx="980" cy="350" r="18" fill="#2e7d32" opacity="0.1"/>
  <text x="980" y="340" font-family="monospace" font-size="10" fill="#2e7d32" text-anchor="middle">chardet v7</text>
  <text x="980" y="358" font-family="Arial,sans-serif" font-size="20" fill="#2e7d32" text-anchor="middle">&#x2713;</text>

  <!-- Label -->
  <text x="980" y="430" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#2e7d32" text-anchor="middle">Permissive</text>
  <text x="980" y="448" font-family="Arial,sans-serif" font-size="11" fill="#888" text-anchor="middle">"Do anything"</text>

  <!-- === WARNING BANNER === -->
  <rect x="150" y="490" width="900" height="60" rx="10" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
  <text x="185" y="525" font-family="Arial,sans-serif" font-size="22" fill="#e65100">&#x26A0;</text>
  <text x="600" y="518" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="#e65100" text-anchor="middle">138,000,000 monthly downloads affected</text>
  <text x="600" y="540" font-family="monospace" font-size="12" fill="#bf360c" text-anchor="middle">pip, requests, urllib3 — your project probably depends on chardet</text>

  <!-- Bottom bar -->
  <rect x="0" y="630" width="1200" height="45" fill="#311b92" opacity="0.06"/>
  <text x="600" y="658" font-family="Arial,sans-serif" font-size="13" fill="#37474f" text-anchor="middle" opacity="0.7">chardet v7.0.0 — AI-Powered License Transformation (March 2026)</text>
</svg>`;

// ─── Body Image: The Controversy Map ────────────────────────────────────────
const bodySVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fafbff;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#f5f8ff;stop-opacity:1"/>
    </linearGradient>
    <filter id="cardShadow">
      <feDropShadow dx="1" dy="3" stdDeviation="5" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(#bg2)"/>

  <!-- Grid -->
  ${Array.from({length: 20}, (_, i) => `<line x1="${i*64}" y1="0" x2="${i*64}" y2="675" stroke="#eef0f5" stroke-width="0.4" opacity="0.6"/>`).join('')}
  ${Array.from({length: 12}, (_, i) => `<line x1="0" y1="${i*64}" x2="1200" y2="${i*64}" stroke="#eef0f5" stroke-width="0.4" opacity="0.6"/>`).join('')}

  <!-- Title -->
  <text x="600" y="55" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#1a237e" text-anchor="middle">Clean Room vs AI Rewrite — The Legal Gap</text>

  <!-- === LEFT: Traditional Clean Room === -->
  <g filter="url(#cardShadow)">
    <rect x="40" y="80" width="350" height="480" rx="12" fill="white"/>
  </g>
  <rect x="40" y="80" width="350" height="50" rx="12" fill="#1565c0"/>
  <rect x="40" y="118" width="350" height="12" fill="#1565c0" rx="0"/>
  <text x="215" y="112" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Traditional Clean Room</text>

  <!-- Step 1 -->
  <circle cx="80" cy="170" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="80" y="175" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#1565c0" text-anchor="middle">1</text>
  <text x="110" y="175" font-family="Arial,sans-serif" font-size="13" fill="#333">Team A reads source code</text>

  <!-- Step 2 -->
  <circle cx="80" cy="220" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="80" y="225" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#1565c0" text-anchor="middle">2</text>
  <text x="110" y="225" font-family="Arial,sans-serif" font-size="13" fill="#333">Team A writes specification</text>

  <!-- Wall -->
  <rect x="70" y="255" width="290" height="35" rx="4" fill="#ffecb3" stroke="#ffa000" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="215" y="278" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#e65100" text-anchor="middle">INFORMATION BARRIER</text>

  <!-- Step 3 -->
  <circle cx="80" cy="320" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="80" y="325" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#1565c0" text-anchor="middle">3</text>
  <text x="110" y="318" font-family="Arial,sans-serif" font-size="13" fill="#333">Team B (never saw source)</text>
  <text x="110" y="336" font-family="Arial,sans-serif" font-size="12" fill="#666">implements from spec only</text>

  <!-- Step 4 -->
  <circle cx="80" cy="380" r="16" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
  <text x="80" y="385" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#1565c0" text-anchor="middle">4</text>
  <text x="110" y="385" font-family="Arial,sans-serif" font-size="13" fill="#333">Result: Independent work</text>

  <!-- Verdict -->
  <rect x="60" y="420" width="310" height="45" rx="8" fill="#e8f5e9" stroke="#43a047" stroke-width="1.5"/>
  <text x="215" y="448" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#2e7d32" text-anchor="middle">LEGALLY VALID</text>

  <!-- Arrow connectors -->
  <line x1="80" y1="186" x2="80" y2="204" stroke="#1565c0" stroke-width="1.5"/>
  <line x1="80" y1="236" x2="80" y2="255" stroke="#1565c0" stroke-width="1.5"/>
  <line x1="80" y1="290" x2="80" y2="304" stroke="#1565c0" stroke-width="1.5"/>
  <line x1="80" y1="336" x2="80" y2="364" stroke="#1565c0" stroke-width="1.5"/>

  <!-- === CENTER: VS === -->
  <circle cx="440" cy="320" r="30" fill="#f5f5f5" stroke="#ccc" stroke-width="2"/>
  <text x="440" y="328" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#888" text-anchor="middle">VS</text>

  <!-- === RIGHT: chardet v7 "Clean Room" === -->
  <g filter="url(#cardShadow)">
    <rect x="490" y="80" width="350" height="480" rx="12" fill="white"/>
  </g>
  <rect x="490" y="80" width="350" height="50" rx="12" fill="#d32f2f"/>
  <rect x="490" y="118" width="350" height="12" fill="#d32f2f" rx="0"/>
  <text x="665" y="112" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">chardet v7 "AI Clean Room"</text>

  <!-- Step 1 -->
  <circle cx="530" cy="170" r="16" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
  <text x="530" y="175" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#d32f2f" text-anchor="middle">1</text>
  <text x="560" y="175" font-family="Arial,sans-serif" font-size="13" fill="#333">Maintainer has LGPL source</text>

  <!-- Step 2 -->
  <circle cx="530" cy="220" r="16" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
  <text x="530" y="225" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#d32f2f" text-anchor="middle">2</text>
  <text x="560" y="218" font-family="Arial,sans-serif" font-size="13" fill="#333">Feeds source + tests</text>
  <text x="560" y="236" font-family="Arial,sans-serif" font-size="13" fill="#d32f2f" font-weight="bold">directly into Claude AI</text>

  <!-- NO Wall -->
  <rect x="520" y="255" width="290" height="35" rx="4" fill="#ffcdd2" stroke="#d32f2f" stroke-width="1.5"/>
  <text x="665" y="278" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#b71c1c" text-anchor="middle">NO INFORMATION BARRIER</text>

  <!-- Step 3 -->
  <circle cx="530" cy="320" r="16" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
  <text x="530" y="325" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#d32f2f" text-anchor="middle">3</text>
  <text x="560" y="318" font-family="Arial,sans-serif" font-size="13" fill="#333">Claude (trained on chardet)</text>
  <text x="560" y="336" font-family="Arial,sans-serif" font-size="12" fill="#666">rewrites with same structure</text>

  <!-- Step 4 -->
  <circle cx="530" cy="380" r="16" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
  <text x="530" y="385" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#d32f2f" text-anchor="middle">4</text>
  <text x="560" y="385" font-family="Arial,sans-serif" font-size="13" fill="#333">Result: Derivative work?</text>

  <!-- Verdict -->
  <rect x="510" y="420" width="310" height="45" rx="8" fill="#ffebee" stroke="#d32f2f" stroke-width="1.5"/>
  <text x="665" y="448" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#b71c1c" text-anchor="middle">LEGALLY DISPUTED</text>

  <!-- Arrow connectors -->
  <line x1="530" y1="186" x2="530" y2="204" stroke="#d32f2f" stroke-width="1.5"/>
  <line x1="530" y1="236" x2="530" y2="255" stroke="#d32f2f" stroke-width="1.5"/>
  <line x1="530" y1="290" x2="530" y2="304" stroke="#d32f2f" stroke-width="1.5"/>
  <line x1="530" y1="336" x2="530" y2="364" stroke="#d32f2f" stroke-width="1.5"/>

  <!-- === RIGHT SIDEBAR: Voices === -->
  <g filter="url(#cardShadow)">
    <rect x="870" y="90" width="300" height="130" rx="10" fill="white"/>
  </g>
  <circle cx="900" cy="125" r="18" fill="#e8eaf6" stroke="#3f51b5" stroke-width="1.5"/>
  <text x="900" y="130" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#3f51b5" text-anchor="middle">FSF</text>
  <text x="940" y="120" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#333">Free Software Foundation</text>
  <text x="940" y="140" font-family="Arial,sans-serif" font-size="11" fill="#555">"Nothing 'clean' about an LLM</text>
  <text x="940" y="155" font-family="Arial,sans-serif" font-size="11" fill="#555">which ingested the code it's</text>
  <text x="940" y="170" font-family="Arial,sans-serif" font-size="11" fill="#555">asked to reimplement"</text>
  <text x="940" y="200" font-family="Arial,sans-serif" font-size="10" fill="#888">— Zoe Kooyman, ED</text>

  <g filter="url(#cardShadow)">
    <rect x="870" y="240" width="300" height="130" rx="10" fill="white"/>
  </g>
  <circle cx="900" cy="275" r="18" fill="#fce4ec" stroke="#e91e63" stroke-width="1.5"/>
  <text x="900" y="280" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#e91e63" text-anchor="middle">BP</text>
  <text x="940" y="270" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#333">Bruce Perens</text>
  <text x="940" y="290" font-family="Arial,sans-serif" font-size="11" fill="#555">"AI will kill software</text>
  <text x="940" y="305" font-family="Arial,sans-serif" font-size="11" fill="#555">licensing entirely"</text>
  <text x="940" y="350" font-family="Arial,sans-serif" font-size="10" fill="#888">— Co-founder, Open Source Definition</text>

  <g filter="url(#cardShadow)">
    <rect x="870" y="390" width="300" height="130" rx="10" fill="white"/>
  </g>
  <circle cx="900" cy="425" r="18" fill="#e8f5e9" stroke="#4caf50" stroke-width="1.5"/>
  <text x="900" y="430" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#4caf50" text-anchor="middle">SW</text>
  <text x="940" y="420" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#333">Simon Willison</text>
  <text x="940" y="440" font-family="Arial,sans-serif" font-size="11" fill="#555">"Feeding code to an LLM and</text>
  <text x="940" y="455" font-family="Arial,sans-serif" font-size="11" fill="#555">saying 'rewrite this' is not a</text>
  <text x="940" y="470" font-family="Arial,sans-serif" font-size="11" fill="#555">clean room implementation"</text>
  <text x="940" y="500" font-family="Arial,sans-serif" font-size="10" fill="#888">— Developer, Datasette</text>

  <!-- Bottom bar -->
  <rect x="0" y="630" width="1200" height="45" fill="#1a237e" opacity="0.06"/>
  <text x="600" y="658" font-family="Arial,sans-serif" font-size="13" fill="#37474f" text-anchor="middle" opacity="0.7">The chardet v7 Controversy — Clean Room or License Laundering? (March 2026)</text>
</svg>`;

async function generateImages() {
  console.log('Generating hero image...');
  await sharp(Buffer.from(heroSVG))
    .png({ quality: 95 })
    .toFile(path.join(outDir, `${slug}-1.png`));
  console.log('Hero image saved:', path.join(outDir, `${slug}-1.png`));

  console.log('Generating body image...');
  await sharp(Buffer.from(bodySVG))
    .png({ quality: 95 })
    .toFile(path.join(outDir, `${slug}-2.png`));
  console.log('Body image saved:', path.join(outDir, `${slug}-2.png`));

  console.log('Done!');
}

generateImages().catch(console.error);
