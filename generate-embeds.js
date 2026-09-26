// Builds embeddable versions of every /tools calculator and adds an "Embed this
// calculator" box to each tools page.
//
//   embed/<slug>.html  — bare calculator (noindex, canonical -> /tools/<slug>) meant for <iframe>
//   tools/<slug>.html  — gets a copy-paste snippet whose visible attribution link is the backlink
//
// Idempotent: embed pages are regenerated every run; the tools-page box is inserted once
// (marker id="embed-calculator") and its height/snippet refreshed on re-run.
// Runs at build time; output is also committed so local previews work.
const fs = require("fs");
const path = require("path");

const WEB = __dirname;
const TOOLS = path.join(WEB, "tools");
const OUT = path.join(WEB, "embed");
const BASE = "https://shunya.so";
const heights = fs.existsSync(path.join(TOOLS, "embed-heights.json"))
  ? JSON.parse(fs.readFileSync(path.join(TOOLS, "embed-heights.json"), "utf8"))
  : {};
const DEFAULT_HEIGHT = 560;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Returns the balanced <div class="calc-card"> ... </div> block.
function extractCard(html) {
  const start = html.indexOf('<div class="calc-card">');
  if (start < 0) return null;
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) return html.slice(start, m.index + 6);
  }
  return null;
}

const CSS = `
html,body{margin:0;background:transparent}
body{padding:12px}
.embed-wrap{max-width:720px;margin:0 auto}
.embed-title{font-family:var(--font-bricolage);font-weight:600;font-size:1.15rem;color:#bcd9f5;margin:0 0 .75rem}
.embed-wrap .calc-card{margin-bottom:.75rem;padding:1.25rem;gap:1.25rem}
.embed-credit{font-family:var(--font-inter);font-size:.8125rem;color:#82848e;text-align:center;margin:0}
.embed-credit a{color:#146eff;text-decoration:none;font-weight:600}
.embed-credit a:hover{text-decoration:underline}
html[data-theme=light] body{background:#fff}
html[data-theme=light] .embed-title{color:#0b2540}
html[data-theme=light] .embed-wrap .calc-card{background:#f5f8ff;border-color:#d9e3f5}
html[data-theme=light] .calc-field label{color:#0b2540}
html[data-theme=light] .calc-field input[type=number],html[data-theme=light] .calc-field input[type=text],html[data-theme=light] .calc-field select{background:#fff;border-color:#c9d6ee;color:#0b2540}
html[data-theme=light] .calc-field .radio-group label{background:#fff;border-color:#c9d6ee;color:#3b4a63}
html[data-theme=light] .calc-field .radio-group label:has(input:checked){background:rgba(20,110,255,.08);color:#0b2540}
html[data-theme=light] .calc-results{background:#eaf1ff;border-color:#c9d9f7}
html[data-theme=light] .calc-result-row .rvalue,html[data-theme=light] .calc-result-hero .rvalue{color:#0b2540;text-shadow:none}
html[data-theme=light] .calc-result-row .rlabel,html[data-theme=light] .calc-result-hero .rlabel,html[data-theme=light] .calc-field .hint,html[data-theme=light] .calc-note,html[data-theme=light] .embed-credit{color:#5b6b85}
html[data-theme=light] .calc-result-hero{border-bottom-color:#c9d9f7}
`;

function snippet(slug, name) {
  const h = heights[slug] || DEFAULT_HEIGHT;
  return `<iframe src="${BASE}/embed/${slug}" title="${name} by Shunya" width="100%" height="${h}" style="border:0;max-width:720px" loading="lazy"></iframe>
<p style="font-size:13px;margin:4px 0 0">Free <a href="${BASE}/tools/${slug}">${name}</a> by <a href="${BASE}">Shunya</a></p>`;
}

function embedBox(slug, name) {
  return `<section class="embed-box" id="embed-calculator" aria-labelledby="embed-h">
      <h2 id="embed-h">Embed this calculator on your website</h2>
      <p>Free to use on blogs, company sites and client portals. Copy the code below and paste it into your page. Please keep the small attribution link underneath — it's what keeps this free. Add <code>?theme=light</code> to the address for a light background.</p>
      <textarea id="embed-code" readonly rows="4" onclick="this.select()">${esc(snippet(slug, name))}</textarea>
      <button type="button" class="embed-copy" onclick="var t=document.getElementById('embed-code');t.select();navigator.clipboard&amp;&amp;navigator.clipboard.writeText(t.value);this.textContent='Copied!';setTimeout(()=>this.textContent='Copy code',1800)">Copy code</button>
    </section>
    `;
}

fs.mkdirSync(OUT, { recursive: true });
let made = 0, boxed = 0;
const warnings = [];

for (const file of fs.readdirSync(TOOLS).filter((f) => f.endsWith(".html"))) {
  const slug = file.replace(/\.html$/, "");
  const src = fs.readFileSync(path.join(TOOLS, file), "utf8");
  const card = extractCard(src);
  // the calculator is the LAST bare <script> in the page (the first is GTM in <head>)
  const sStart = src.lastIndexOf("<script>");
  const sEnd = src.indexOf("</script>", sStart);
  const script = sStart >= 0 && sEnd > sStart ? src.slice(sStart + 8, sEnd) : null;
  const h1 = (src.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1];
  if (!card || !script || !h1) { warnings.push(`${slug}: skipped (card/script/h1 not found)`); continue; }
  const name = h1.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

  // every element the script looks up must exist inside the card
  const ids = [...script.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map((m) => m[1]);
  const missing = [...new Set(ids)].filter((id) => !card.includes(`id="${id}"`));
  // e.g. a schedule table that lives in the article: give the script a hidden stub so it doesn't throw
  const stubs = missing.map((id) => `<div id="${id}" hidden></div>`).join("");
  if (missing.length) console.log(`note: ${slug}: stubbed ids outside the card: ${missing.join(", ")}`);

  const head = src.slice(0, src.indexOf("</head>"));
  const links = [...head.matchAll(/<link rel="(?:stylesheet|preload)"[^>]*>/g)].map((m) => "  " + m[0]).join("\n");
  const desc = (head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";

  const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,follow">
  <title>${esc(name)} — embeddable calculator | Shunya</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${BASE}/tools/${slug}">
${links}
  <style>${CSS}</style>
  <script>try{if(/[?&]theme=light/.test(location.search))document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>
</head>
<body class="__variable_a4bae9 __variable_f367f3 __variable_73ee6c">
<div class="embed-wrap">
  <h1 class="embed-title">${esc(name)}</h1>
  ${card}${stubs}
  <p class="embed-credit">Free <a href="${BASE}/tools/${slug}" target="_blank" rel="noopener">${esc(name)}</a> by <a href="${BASE}" target="_blank" rel="noopener">Shunya</a> · <a href="${BASE}/tools" target="_blank" rel="noopener">More free tools</a></p>
</div>
<script>${script}</script>
<script>(function(){function s(){try{parent.postMessage({shunyaEmbed:${JSON.stringify(slug)},height:Math.ceil(document.querySelector(".embed-wrap").getBoundingClientRect().bottom+12)},'*')}catch(e){}}addEventListener('load',s);addEventListener('input',function(){setTimeout(s,50)});addEventListener('change',function(){setTimeout(s,50)})})()</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, file), page);
  made++;

  // tools page: insert or refresh the embed box
  let out = src;
  const box = embedBox(slug, name);
  if (out.includes('id="embed-calculator"')) {
    out = out.replace(/<section class="embed-box" id="embed-calculator"[\s\S]*?<\/section>\s*/, box);
  } else if (out.includes('<section class="related"')) {
    out = out.replace('<section class="related"', box + '<section class="related"');
  } else {
    warnings.push(`${slug}: no related section to anchor the embed box`);
  }
  if (out !== src) { fs.writeFileSync(path.join(TOOLS, file), out); boxed++; }
}

// styles for the box live in tools/shared.css
const cssFile = path.join(TOOLS, "shared.css");
let css = fs.readFileSync(cssFile, "utf8");
if (!css.includes(".embed-box")) {
  css += `
/* ─── Embed box ─── */
.embed-box { margin: 2.5rem 0; padding: 1.5rem; border: 1px solid #313235; border-radius: 1rem; background: linear-gradient(180deg, #0C1F31, #060F19); }
.embed-box h2 { margin-top: 0; }
.embed-box p { margin-bottom: 1rem; }
.embed-box code { background: rgba(255,255,255,0.08); padding: 0.1rem 0.35rem; border-radius: 0.3rem; font-size: 0.85em; }
.embed-box textarea { width: 100%; background: #060F19; border: 1px solid #313235; border-radius: 0.6rem; color: #d4e8f8; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.8125rem; line-height: 1.5; padding: 0.8rem 0.9rem; resize: vertical; }
.embed-box .embed-copy { margin-top: 0.75rem; background: #146eff; color: #fff; border: 0; border-radius: 2rem; padding: 0.6rem 1.4rem; font-weight: 600; font-size: 0.9rem; cursor: pointer; }
.embed-box .embed-copy:hover { background: #2a7fff; }
`;
  fs.writeFileSync(cssFile, css);
}

console.log(`embeds: ${made} pages generated, ${boxed} tools pages updated`);
warnings.forEach((w) => console.warn("WARN", w));
