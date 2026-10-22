# vidyavriddhi.org — SEO & performance notes

Written alongside the SEO/performance pass on the Next.js site. It records what
is already wired up in code, what still has to happen at deploy time, and the
content work that actually moves rankings.

Verified on the production build (`npm run build && npx next start`) with
Lighthouse: **SEO 100 · Best Practices 100 · Accessibility 97**.

---

## 1. What is implemented in code

### Metadata (`app/layout.tsx`, `app/lib/seo.ts`)

| Item | Where |
| --- | --- |
| Keyword-first title, 59 chars, brand template `%s \| Vidya Vriddhi` | `layout.tsx` + `lib/seo.ts` |
| ~148-character meta description | `lib/seo.ts` |
| `keywords`, `authors`, `creator`, `publisher`, `category`, `applicationName` | `layout.tsx` |
| `robots` + `googlebot` with `max-image-preview:large`, `max-snippet:-1` | `layout.tsx` |
| Canonical on every page (home `/`, legal pages own paths) | `layout.tsx`, `*/page.tsx` |
| `lang="en-IN"`, `theme-color #16375e`, `color-scheme` | `layout.tsx` |
| Search Console / Bing verification (env-gated, adds nothing when unset) | `layout.tsx` + `.env.example` |
| Per-page `openGraph` title/description/url on legal pages | `app/{privacy,terms,cookies}/page.tsx` |

### Social cards

- `app/opengraph-image.tsx` generates a real **1200×630 PNG** at build time
  (brand navy, orange rule, inlined wordmark) instead of sharing a 500×200
  logo — the old card was cropped and unreadable in WhatsApp/LinkedIn.
- `app/twitter-image.tsx` re-exports the same renderer, so both never drift.
- Verified: valid PNG signature, 1200×630, `og:image:width/height/type/alt` all
  emitted, `og:locale en_IN`.

### Structured data (`app/lib/structured-data.ts`, `components/json-ld.tsx`)

Two JSON-LD graphs, built from the same data the page renders:

- **Site-wide** (layout): `Organization` (logo, slogan, address, contactPoint,
  `knowsAbout`, `areaServed` India + 5 states, `parentOrganization`
  JP Technologies), `WebSite` (`inLanguage: en-IN`, publisher link),
  `ProfessionalService` (LocalBusiness subtype: NAP, service area).
- **Home page**: `FAQPage` built from `faqs` in `components/faq.tsx`, and
  `Service` + `OfferCatalog` built from `channels` in `components/channels.tsx`.
- **Legal pages**: `BreadcrumbList` + `WebPage`, matching a visible breadcrumb
  trail added to `components/legal-page.tsx`.

> Google restricted FAQ *rich results* to government/health sites in 2023, so
> the `FAQPage` block will not add stars/snippets for us. It is still valid
> markup, it feeds AI answer engines, and it costs nothing.

### Crawling

- `app/sitemap.ts` — all four URLs with `lastmod`, `changefreq`, `priority`.
- `app/robots.ts` — allows everything, disallows `/api/`, declares `Host` +
  `Sitemap`.
- `app/manifest.ts` — installable web manifest (name, `en-IN`, theme colour).
- `app/not-found.tsx` — styled 404 with a real `h1`, links back into the site,
  and Next's automatic `noindex`.
- Removed `public/clinets/README.txt` from `/public` (it was publicly served
  and mentioned PHP internals) → moved to `docs/client-logos.txt`.

### Accessibility (indirect ranking/quality signal)

- "Skip to main content" link in the layout; `<main id="main" tabIndex={-1}>`
  on every page.
- Breadcrumb `nav[aria-label]`, `aria-current="page"`, existing form labels and
  `aria-invalid` states.

---

## 2. Performance changes

| Change | Effect |
| --- | --- |
| `sizes` on the logo (`components/logo.tsx`) | The header logo was being fetched at **w=1080** (Next assumed it filled the viewport) for a ~100 px mark; now **w=256**. 13.5 KB → 7.4 KB, and it is the LCP element. |
| `images.formats: ["image/avif","image/webp"]` | AVIF first. Client logo example: 191 KB source PNG → 19.9 KB AVIF. |
| `experimental.inlineCss: true` | The site's CSS is inlined in `<head>`: **zero render-blocking stylesheet requests** (verified: one `<style>`, no `link[rel=stylesheet]` in the production HTML). |
| `images.minimumCacheTTL: 31 days` | Optimised images are content-addressed by URL, so repeat visits skip the optimiser. |
| `poweredByHeader: false` | No `x-powered-by` version disclosure. |
| Security headers (`headers()` in `next.config.ts`) | `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS. |
| `public/clinets/README.txt` removed | Small, but it was a stray publicly-served text file. |
| Zod loaded on interaction (`components/campaign-form.tsx`) | The shared enquiry schema pulls in Zod — a **104 KB raw / 29.8 KB compressed** chunk. It is now a dynamic `import()` warmed on the first field focus, so it is no longer part of the initial payload: **initial JS 176 KB → 146.5 KB compressed (−17 %)**, and the blocking time of the main thread dropped from 115 ms to ~1 ms in a Chromium trace. |

### Measuring this site correctly

**Measure the production build (`npm run build && npm start`), never `next dev`.**
A Lighthouse run against the dev server reports a huge TBT (4–5 s) that has
nothing to do with the shipped site: dev ships unminified React, the dev overlay,
HMR and Turbopack clients. Same machine, same page, Chromium renderer trace:

| | dev (`next dev`) | prod (`next start`) |
| --- | --- | --- |
| script chunks requested | 20 | 8 |
| total main-thread scripting in the traced window | 1050 ms | 303 ms |
| long tasks > 50 ms | 3 | 1 |
| blocking time | **570 ms** | **1–115 ms** |

Request budget of the production home page (verified in the browser):

| Type | Requests | Compressed |
| --- | --- | --- |
| JavaScript (initial) | 8 | 146.5 KB |
| Fonts (Open Sans, latin, preloaded… see note) | 1 | 42 KB |
| Images (logo, AVIF) | 1 | 3 KB |
| CSS | 0 (inlined) | — |
| HTML | — | 23.8 KB brotli (322.9 KB raw) |

`favicon.ico`, `robots.txt`, `sitemap.xml`, the manifest and the OG/Twitter PNG
are not part of the render path. The document is large *raw* because the App
Router also serialises the RSC flight payload; brotli brings it to 23.8 KB.

Lighthouse (this harness) only scores accessibility/SEO/best-practices:
**SEO 100, Best Practices 100, Accessibility 97** (the only failing audit is
`color-contrast` on the brand orange — see §5). Run PageSpeed Insights against
the live URL after deploy for a field-data performance number.

### Two Next.js quirks found while measuring

- **`experimental.inlineCss` duplicates the CSS into the RSC flight payload.**
  The production HTML contains the 45.5 KB stylesheet once in `<style>` **and
  twice more inside `self.__next_f.push(...)`** (`@font-face` appears 11× in the
  style block and 22× in script bodies). Raw HTML grows from ~205 KB to ~323 KB
  (brotli 19.1 KB → 23.8 KB). It is still the better trade: no render-blocking
  request, and the payload compresses away. Re-check after upgrading Next.
- **No font preload link is emitted.** The build marks `subsets: ["latin"]` as
  the preloadable file (`…-s.p.…woff2`) and the docs state that a preload link is
  injected when `preload` is true (the default), but the head contains no
  `<link rel="preload" as="font">` — checked in the dev HTML, the production HTML
  and the prerendered `.next/server/app/index.html`. The font still starts very
  early because the inlined CSS that references it sits ~1 KB into `<head>`, so
  the practical cost is small.

---

## 3. At deploy time (this is where ranking actually starts)

1. **Point the domain and force HTTPS.** `vidyavriddhi.org` must serve the site
   over HTTPS with no `www` duplication — pick one host and 301 the other.
   Canonicals, OG URLs and the sitemap all use `https://vidyavriddhi.org`.
2. **Set the env vars** in the host dashboard (`.env.local` does not deploy):
   SMTP + `ENQUIRY_TO` + `ENQUIRY_CC`, and
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
   See `.env.example`.
3. **Verify ownership** in [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters), then submit
   `https://vidyavriddhi.org/sitemap.xml`.
4. **Request indexing** of the home page in Search Console (URL inspection →
   Request indexing), and use Bing's IndexNow to speed up Bing/Yandex.
5. **Add the missing square icons.** `app/favicon.ico` exists, but a 180×180
   apple-touch-icon and 192/512 px PNGs (exported from the logo mark) are
   needed for the install prompt and some listings. Slot them into
   `app/manifest.ts` (the comment there shows the entries).
6. **Google Business Profile** for the Noida office — the single biggest win for
   local/"education marketing agency Noida" searches, and it needs the same
   name/address/phone as the site.
7. **Re-measure** with PageSpeed Insights (mobile) and keep an eye on Core Web
   Vitals + impressions in Search Console.

---

## 4. Content roadmap — the real ranking lever

One page can only rank for so much. The home page now targets *student lead
generation for education brands* and closely related terms. Ranking for
commercial keywords needs a page per intent, each linked from the home page
and from each other:

| Suggested URL | Target intent |
| --- | --- |
| `/student-lead-generation` | student lead generation agency, education lead generation |
| `/google-ads-for-education` | Google Ads for colleges/universities, admission ads |
| `/seo-for-education-brands` | SEO for universities, college SEO services |
| `/meta-ads-for-admissions` | Facebook/Instagram ads for admissions |
| `/study-abroad-lead-generation` | study abroad / MBBS abroad lead generation |
| `/education-marketing-agency-noida` | location intent + NAP + map |
| `/case-studies` (one per client) | proof, long-tail course/city queries, backlinks |
| `/blog/*` | "how to increase admissions", "cost per admission", intake-calendar guides |

Rules that matter: one primary keyword per page, that keyword in the `title`,
`h1`, first paragraph and a subheading; 700–1,500 words of genuinely useful
copy; internal links with descriptive anchor text (not "click here"); publish
consistently rather than in one burst.

Off-page: education-sector directories, client "featured partner" pages, guest
posts and PR — every one of those is a backlink the competitor set already has.

---

## 5. Open items / decisions

- **Contrast (only remaining accessibility failure, 0.97).** Brand orange
  `#f4701f` gives 2.9:1 on white and white-on-orange buttons also 2.9:1 (needs
  4.5:1); `bg-green-500` + white text fails too. Fixing it means darkening
  orange *for text and buttons* to about `#c2540f` (4.6:1) and darkening the
  green — a visible brand change, so it was left alone. Say the word and it is
  a few-line change in `app/globals.css` + the CTA/eyebrow classes.
- **Contact details are still placeholders.** `site_identity.php` marks the
  phone, email and address as to-be-confirmed, and they now appear in the
  footer, the legal pages *and* the Organization/LocalBusiness schema. NAP
  consistency is critical for local SEO — confirm them before launch and change
  them in one place: `app/site-config.ts`.
- **`public/clinets/admissioncampus.png` is the wrong logo.** Per
  `docs/client-logos.txt`, it is a duplicate of `education-times-abroad.png`,
  so the "Admission Campus" card currently shows the ETSA mark twice. Needs the
  real Admission Campus logo.
- **Social profiles** are all `#` in `site_identity.php`, so nothing is linked
  and no `sameAs` is emitted. Real profile URLs would help entity recognition.
- **No analytics.** Nothing is measured yet — GA4 (with consent) or a
  privacy-friendly option, plus Search Console, is needed to see what ranks.
