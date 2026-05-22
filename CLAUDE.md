# CLAUDE.md — Shunya Web

Read this at the start of every session before doing anything.

## Deployment Process — ALWAYS follow this order

1. `git add <files>`
2. `git commit -m "..."`
3. `git push origin main`
4. Vercel auto-deploys from the GitHub push

**Never run `vercel --prod` directly.** GitHub must always reflect what is live.

## Key URLs

| | |
|---|---|
| Live site | https://shunya.so |
| GitHub repo | https://github.com/koushiknarendar/shunya |
| Vercel project | https://vercel.com/koushik-narendars-projects/shunya |
| Local dev server | `python3 -m http.server 8743` from this folder |

## Tech Stack

- **Static HTML** — no build step, files served as-is
- **CSS** — `_next/static/css/` contains the original Next.js CSS (hashed filenames); `globals.css` is a concatenated copy for convenience
- **Fonts** — served from `/_next/static/media/` (Bricolage Grotesque, Inter, Manrope)
- **Deployment** — Vercel, config in `vercel.json`; build command runs `node generate-sitemap.js`

## Folder Structure

```
web/
├── _next/static/       # Original Next.js assets (CSS, fonts, media)
├── 15ca-15cb/          # 15CA/15CB article pages + resources hub
│   ├── global.css      # Concatenated Next.js CSS for standalone pages
│   ├── shared.css      # Article + resources hub overrides
│   ├── resources.html  # Hub page listing all 15 guides
│   └── *.html          # Individual article pages (15 total)
├── blogs/              # Blog article pages
├── image/              # Site images
├── index.html          # Homepage
├── globals.css         # Root-level concatenated CSS
├── vercel.json         # Vercel config (cleanUrls, rewrites, cache headers)
└── generate-sitemap.js # Runs at build time to produce sitemap.xml
```

## Critical: Font Variables

CSS variables `--font-bricolage`, `--font-inter`, `--font-manrope` are scoped to specific classes — **not `:root`**. Every standalone HTML page must have this on `<body>` or fonts will fall back to system defaults:

```html
<body class="__variable_a4bae9 __variable_f367f3 __variable_73ee6c">
```

## Critical: Footer Structure

Every page needs two things in the footer to match the design:

1. **Logo size class** — the SVG inside `footer_logo_wrapper__OqUbC` must have `class="footer_sh_logo___qZrA"` (constrains to `8.625rem × 2.5rem`). Without it, the SVG stretches full-width.

2. **Decorative bottom section** — `<div class="footer_bottom_section__raaIC">` must appear before `</footer>`. Copy from `resources.html` or `index.html` if missing.

## Design Tokens

| Token | Value |
|---|---|
| Background | `#0a0a0b` |
| Card gradient | `linear-gradient(180deg, #0C1F31, #060F19)` |
| Card border | `1px solid #313235` |
| Primary blue | `#146eff` |
| Body text | `#82848e` |
| Heading text | `#bcd9f5` |
| Purple glow | `text-shadow: 0 0 50px #9747ff` |

## Performance — Image Rules (apply to every new page/change)

All images added to this site must follow these rules before committing.

### Format: always WebP
Convert every new PNG/JPG to WebP using Pillow before adding to the repo:

```python
from PIL import Image
img = Image.open('input.jpg')       # or .png
img.save('output.webp', 'WEBP', quality=85, method=6)
# Use quality=80 for large background images (bg-*)
# Use quality=85 for photos and UI images
```

Keep the original file too (it stays in the repo as fallback), but the HTML/CSS must reference the `.webp` version.

### `sizes` attribute — never use `100vw` for small elements
| Element type | Correct `sizes` |
|---|---|
| Avatar circles (≤ 3rem) | `"48px"` |
| Logo images | `"(max-width:780px) 200px, 120px"` |
| Full-width hero/banner images | `"100vw"` |
| Content images (max ~900px wide) | `"(max-width:768px) 100vw, 900px"` |

### `loading` and `fetchpriority`
- Add `loading="eager" fetchpriority="high"` to the **LCP image** (first visible above-the-fold image).
- All other images default to `loading="lazy" decoding="async"`.

### CSS background images
Use `.webp` in all `background-image: url()` declarations:
```css
background-image: url('image/bg3.webp');   /* not bg3.jpg */
```

### Common typo to avoid
`sizes="(max-wdith:…)"` is wrong — always spell it `max-width`.

### Conversion reference (actual savings achieved May 2026)
| File | Before | After | Saved |
|---|---|---|---|
| user avatars (PNG) | 219–331 KB | 11–31 KB | ~93% |
| journey photo (PNG) | 452 KB | 30 KB | 94% |
| bg3.jpg (hero bg) | 5.1 MB | 133 KB | 98% |
| bg2.jpg (CTA bg) | 2.6 MB | 100 KB | 97% |

---

## Hero Headline Pattern (thin + thick)

```html
<h1>thin text here<br/><span class="hero-bold">THICK TEXT</span></h1>
```

```css
h1 { font-weight: 300; color: #bcd9f5; }
.hero-bold { font-weight: 600; color: #fff; text-shadow: 0 0 50px #9747ff; }
```
