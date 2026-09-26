// Generates llms.txt (curated index) and llms-full.txt (every indexable page with
// its description) from the HTML in this folder, so AI assistants always see the
// current site. Runs at build time after generate-sitemap.js.
const fs = require("fs");
const path = require("path");

const BASE = "https://shunya.so";
const WEB = __dirname;

// Service pages, in priority order. `desc` overrides the page's own meta description
// where the hand-written line carries facts (price, timeline) worth keeping.
const SERVICES = [
  { slug: "company-registration", name: "Company Registration", desc: "Register a Private Limited Company, LLP or OPC in India online — end-to-end CA-assisted process." },
  { slug: "gst-registration", name: "GST Registration", desc: "Get GST registered online with a CA — GSTIN delivered in 5–7 working days, ₹1,499 one-time." },
  { slug: "gst-return-filing", name: "GST Return Filing", desc: "Monthly GST return filing (GSTR-1, GSTR-3B, GSTR-9) by a CA, filed before every due date, ₹799/month." },
  { slug: "15ca-15cb", name: "Form 15CA/15CB (now Form 145/146) Filing", desc: "Form 15CA and 15CB — renamed Form 145 and Form 146 from 1 April 2026 — filed by a CA for foreign remittance payments, no office visit required." },
  { slug: "lower-tds-certificate-nri", name: "Lower TDS Certificate for NRIs", desc: "Lower or Nil TDS Certificate — Form 13, now renamed Form 128 — for NRI property sales, rent or interest income. Capital gains computed and filed by a CA, from ₹4,999." },
  { slug: "fssai-registration", name: "FSSAI Registration & License", desc: "FSSAI Basic Registration, State License or Central License filed on FoSCoS, with the 2026 turnover limits and perpetual validity built in. From ₹1,499." },
  { slug: "gst-lut", name: "GST LUT Filing", desc: "GST Letter of Undertaking (Form RFD-11) so you can export without paying IGST upfront. CA-assisted, ARN same day. From ₹499." },
  { slug: "company-closure", name: "Company Closure", desc: "Close a private limited company, LLP or OPC in India with an MCA-registered CA. Pick your entity type; strike-off filing and ROC follow-up handled online. From ₹5,999." },
  { slug: "company-closure-private-limited", name: "Private Limited Company Closure", desc: "Close a private limited company via Form STK-2 strike-off under Section 248(2) of the Companies Act. Typical total ₹7,999 – ₹15,999 depending on the case; exact quote before you pay." },
  { slug: "company-closure-llp", name: "LLP Closure", desc: "Close an LLP via Form 24 strike-off under Rule 37 of the LLP Rules 2009. Typical total ₹5,999 – ₹11,999 depending on the case; exact quote before you pay." },
  { slug: "company-closure-opc", name: "OPC Closure", desc: "Close a One Person Company via Form STK-2 strike-off, with a single-signatory resolution, bond and affidavit. Typical total ₹7,999 – ₹12,999 depending on the case; exact quote before you pay." },
  { slug: "itr-filing", name: "ITR Filing" },
  { slug: "tax-audit-44ab", name: "Tax Audit (Section 44AB)" },
  { slug: "gst-refund-filing", name: "GST Refund Filing" },
  { slug: "gstr-9-gstr-9c-filing", name: "GSTR-9 & GSTR-9C Annual Return Filing" },
  { slug: "startup-india", name: "Startup India (DPIIT) Registration", desc: "DPIIT recognition under the Startup India scheme." },
  { slug: "tools", name: "Free Business, Tax & Loan Calculators", desc: "About 50 free calculators — GST, TDS, advance tax, EMI, SIP/SWP, CAGR, business setup cost and more." },
  { slug: "consultation", name: "Free Consultation", desc: "Book a call with a CA to discuss your compliance needs." },
  { slug: "how-it-works", name: "How It Works", desc: "Step-by-step walkthrough of the Shunya process." },
];

// Clusters: folder -> heading. `all:false` lists only the hub in llms.txt (still fully in llms-full.txt).
const CLUSTERS = [
  { dir: "15ca-15cb", name: "Form 15CA/15CB (Form 145/146) Guides", all: true },
  { dir: "company-closure", name: "Company Closure Guides", all: true },
  { dir: "gst-registration", name: "GST Guides", all: true },
  { dir: "gst-refund-filing", name: "GST Refund Guides", all: true },
  { dir: "gstr-9-gstr-9c-filing", name: "GSTR-9 & GSTR-9C Guides", all: true },
  { dir: "gst-lut", name: "GST LUT Guides", all: true },
  { dir: "itr-filing", name: "ITR Filing Guides", all: true },
  { dir: "tax-audit-44ab", name: "Tax Audit (44AB) Guides", all: true },
  { dir: "lower-tds-certificate-nri", name: "Lower TDS Certificate (NRI) Guides", all: true },
  { dir: "fssai-registration", name: "FSSAI Registration & License Guides", all: true },
  { dir: "startup-india", name: "Startup India Guides", all: true },
  { dir: "company-registration", name: "Company Registration Guides (state-wise cost, entity types, documents)", all: false },
  { dir: "tools", name: "Calculators & Tools", all: false },
  { dir: "blogs", name: "Blog Articles", all: true },
];

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function meta(file) {
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1];
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || html.match(/<meta content="([^"]*)" name="description"/) || [])[1];
  if (!t) return null;
  return { title: decode(t).replace(/\s*[|–-]\s*Shunya\s*$/i, "").trim(), desc: d ? decode(d).trim() : "" };
}

const pageFile = (slug) => path.join(WEB, slug + ".html");
const link = (title, slug, desc) => `- [${title}](${BASE}/${slug}${desc ? `): ${desc}` : ")"}`;

function listDir(dir) {
  const d = path.join(WEB, dir);
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter((f) => f.endsWith(".html") && f !== "index.html")
    .map((f) => f.replace(/\.html$/, "")).sort()
    .map((s) => ({ slug: `${dir}/${s}`, ...meta(path.join(d, s + ".html")) }))
    .filter((p) => p.title);
}

const hubOf = (dir) => (fs.existsSync(pageFile(dir)) ? dir : fs.existsSync(path.join(WEB, dir, "resources.html")) ? `${dir}/resources` : null);

let out = `# Shunya

> Shunya (shunya.so) is an Indian CA (Chartered Accountant) services platform for company registration and compliance. CA-assisted, online, end to end: Private Limited / LLP / OPC registration, GST registration and returns, ITR and tax audit, Form 15CA/15CB (now Form 145/146) for foreign remittances, lower TDS certificates for NRIs, FSSAI, GST LUT and refunds, Startup India, and company closure. Each service has a plain-language guide cluster written for Indian founders and businesses; figures and rules are stated as of the "Last updated" date on each page.

## Core Services

`;
for (const s of SERVICES) {
  const m = meta(pageFile(s.slug));
  if (!m) continue;
  out += link(s.name, s.slug, s.desc || m.desc) + "\n";
}

for (const c of CLUSTERS) {
  const pages = listDir(c.dir);
  if (!pages.length) continue;
  out += `\n## ${c.name}\n\n`;
  if (c.all) for (const p of pages) if (!p.slug.endsWith("/resources")) out += link(p.title, p.slug) + "\n";
  const hub = hubOf(c.dir);
  if (hub) {
    const hm = meta(hub === c.dir ? pageFile(c.dir) : path.join(WEB, hub + ".html"));
    out += link(c.all ? `All ${c.name}` : `Browse all ${pages.length} pages: ${c.name}`, hub, c.all ? "" : hm && hm.desc) + "\n";
  }
}

out += `\n## About & Policies\n\n`;
for (const [n, s] of [["About Shunya", "about"], ["Privacy Policy", "privacy-policy"], ["Terms & Conditions", "terms-conditions"], ["Cancellation & Refund Policy", "cancellation-refund"]])
  if (fs.existsSync(pageFile(s))) out += link(n, s) + "\n";

out += `\n## Optional\n\n- [Full page index with descriptions](${BASE}/llms-full.txt)\n- [Sitemap](${BASE}/sitemap.xml)\n`;
fs.writeFileSync(path.join(WEB, "llms.txt"), out);

// llms-full.txt: every page, with description
let full = `# Shunya — full page index\n\n> Every indexable page on shunya.so with its title and summary. Curated overview: ${BASE}/llms.txt\n`;
for (const s of SERVICES) {
  const m = meta(pageFile(s.slug));
  if (m) full += `\n## ${m.title}\n${BASE}/${s.slug}\n${s.desc || m.desc}\n`;
}
let n = SERVICES.length;
for (const c of CLUSTERS) {
  const pages = listDir(c.dir);
  if (!pages.length) continue;
  full += `\n# ${c.name}\n`;
  for (const p of pages) { full += `\n## ${p.title}\n${BASE}/${p.slug}\n${p.desc}\n`; n++; }
}
fs.writeFileSync(path.join(WEB, "llms-full.txt"), full);
console.log(`llms.txt + llms-full.txt generated (${n} pages)`);
