#!/usr/bin/env node
// Pings IndexNow (Bing -> ChatGPT search, Copilot) with the pages changed by the latest commit.
// Used by .github/workflows/indexnow.yml after each push to main; also runnable by hand:
//   node .github/scripts/indexnow.js --changed      # HTML files changed in HEAD
//   node .github/scripts/indexnow.js --all          # every URL in the live sitemap
//   node .github/scripts/indexnow.js <url> [<url>]  # specific URLs
const { execSync } = require('node:child_process');

const KEY = 'a045248ffa90ab8ed61d67e2187c9552';
const HOST = 'shunya.so';
const SKIP = /^(thank-you|ccfs-2026|start-registration|_next|api)/;

async function main() {
  const args = process.argv.slice(2);
  let urls = args.filter((a) => a.startsWith('http'));
  if (args.includes('--all')) {
    const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } else if (args.includes('--changed')) {
    const files = execSync('git diff --name-only --diff-filter=AM HEAD~1 HEAD', { encoding: 'utf8' }).split('\n').filter(Boolean);
    urls = files
      .filter((f) => f.endsWith('.html') && !SKIP.test(f))
      .map((f) => (f === 'index.html' ? `https://${HOST}/` : `https://${HOST}/${f.replace(/\.html$/, '')}`));
    if (files.some((f) => f === 'sitemap.xml' || f === 'llms.txt')) urls.push(`https://${HOST}/sitemap.xml`);
  }
  urls = [...new Set(urls)];
  if (!urls.length) return console.log('IndexNow: no changed pages to submit.');
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const res = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: batch }),
    });
    console.log(`IndexNow: submitted ${batch.length} URLs -> HTTP ${res.status}`);
    if (res.status >= 400) process.exitCode = 1;
  }
}
main();
