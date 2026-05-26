# Salam Transfers — Premium Private Transportation

Salam Transfers is a static, multilingual marketing and booking-bridge website for a premium private transportation service in Cancun, Playa del Carmen, Tulum, and the Riviera Maya. The site targets international travelers — with a specialization in Muslim-friendly travel (alcohol-free vehicles, prayer-stop coordination, and direct mosque transportation).

The site is built with vanilla HTML, CSS, and JavaScript. There is no framework, no build step, and no backend: bookings route through WhatsApp via dynamically generated, language-aware deep links.

---

## Features

- **Primary language: English.** Secondary: Spanish, French, Arabic (with full RTL support).
- **Browser-language auto-detection** on first visit, with manual override via the in-nav language switcher (persisted in `localStorage`).
- **Vercel-ready static deployment** with `vercel.json` (clean URLs, security headers, long-term cache for assets, no cache for HTML).
- **SEO + GEO optimized:** per-page meta, canonical, hreflang (en/es/fr/ar/x-default), Open Graph, Twitter Card, JSON-LD (`LocalBusiness`, `Service`, `HowTo`, `FAQPage`, `ContactPage`), sitemap.xml, robots.txt with explicit allow rules for major LLM crawlers (ChatGPT, Perplexity, Claude, Google-Extended, etc.).
- **Image optimization:** WebP with PNG fallback via `<picture>`, native lazy loading, explicit `width`/`height` to prevent CLS, `fetchpriority="high"` on hero images.
- **Favicon set:** ICO + 16/32/180/192/512 PNG, plus PWA `site.webmanifest`.
- **WhatsApp-first booking flow:** every call-to-action builds a language-aware, pre-filled WhatsApp deep link; `booking.html` is a redirect-only bridge.

---

## Pages

| URL              | Purpose                                                |
| ---------------- | ------------------------------------------------------ |
| `/`              | Homepage with hero, value props, services, timeline    |
| `/services`      | Detailed service descriptions and vehicle capacity     |
| `/routes-prices` | Fixed-rate price tables (airport, inter-resort, tours) |
| `/muslim-friendly` | Salat support, alcohol-free fleet, mosque guide      |
| `/how-it-works`  | 6-step booking process + policies                      |
| `/faq`           | 13 most asked questions (also exposed as JSON-LD FAQPage) |
| `/contact`       | Contact info + form                                    |
| `/booking`       | Redirects to WhatsApp with pre-filled message          |
| `/terms`, `/privacy`, `/cancellation` | Legal pages                       |

---

## Local Development

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open `http://localhost:3003`.

---

## Deployment (Vercel)

The repository is configured for zero-config deployment to Vercel:

1. Import the repo into Vercel (`https://vercel.com/new`).
2. Framework preset: **Other** (static).
3. Build command: *(none)*. Output directory: *(root)*.
4. Deploy.

`vercel.json` handles clean URLs, security headers, and per-asset cache policies.

Custom domain: point `salamtransfers.com` to Vercel and add the domain in the project settings. The canonical/sitemap URLs already use that hostname — update them if you deploy to a different domain.

---

## Repository

- GitHub: https://github.com/AIQROO/salam-transfers
- WhatsApp dispatcher: `+52 984 219 0001`
- Email: `salamtransfers@gmail.com`

---

## Structure

```
.
├── index.html               # Homepage
├── services.html
├── routes-prices.html
├── muslim-friendly.html
├── how-it-works.html
├── faq.html
├── contact.html
├── booking.html             # WhatsApp redirect bridge
├── terms.html
├── privacy.html
├── cancellation.html
├── 404.html
├── main.js                  # i18n engine, booking wizard, UI interactions
├── styles.css               # Design system
├── vercel.json              # Vercel deployment config
├── sitemap.xml
├── robots.txt
├── site.webmanifest         # PWA manifest
├── favicon.ico, favicon-16x16.png, favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png, android-chrome-512x512.png
├── Logo/
│   └── logo.png             # Optimized brand logo
└── assets/
    ├── *.png                # Original hero photos
    └── webp/                # WebP-encoded versions
```
