# Vidya Vridhi

The website for Vidya Vridhi, an education marketing agency. It includes the
company website, client and service information, legal pages, SEO metadata, and
a campaign enquiry form that sends submissions by email.

## Requirements

- Node.js 20.9 or newer
- npm (the repository includes `package-lock.json`)

## Run locally

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page can be edited
in `app/page.tsx`; shared page components are in `app/components/`.

## Environment configuration

Copy `.env.example` to `.env.local`, then fill in the values needed for your
environment. Do not commit `.env.local` or real credentials.

```bash
cp .env.example .env.local
```

The enquiry form uses SMTP via Nodemailer. Configure these variables for email
delivery:

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` | SMTP server hostname, for example `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port; defaults to `465` if unset |
| `SMTP_SECURE` | Set to `true` for implicit TLS; if unset, port `465` enables it |
| `SMTP_USER` | SMTP account username |
| `SMTP_PASS` | SMTP password or provider app password |
| `MAIL_FROM` | Optional sender shown on notification emails; defaults to `SMTP_USER` |
| `ENQUIRY_TO` | Optional comma-separated recipient list; defaults to the notification address in `app/site-config.ts` |
| `ENQUIRY_CC` | Optional comma-separated copy recipients |

For Gmail, use an app password and an address permitted to send from the
configured account. Set `ENQUIRY_TO` to a monitored inbox before launch; the
fallback address in the source configuration should be verified.

Search ownership checks are optional. Set either or both values when verifying
the deployed site:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification token |

When SMTP is not configured, enquiry submissions cannot be emailed and the
API responds with an error. The endpoint is `POST /api/enquiry`.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build; run `npm run build` first |

There is currently no test script in `package.json`.

For a production-like local run:

```bash
npm run build
npm start
```

## Project structure

```text
app/
	api/enquiry/       Enquiry form API route and email delivery
	components/        Home page sections and shared UI
	lib/               Enquiry validation, SEO, and structured data
	privacy/           Privacy policy page
	terms/             Terms and conditions page
	cookies/            Cookie policy page
	page.tsx           Home page
	site-config.ts     Business identity, contact details, and navigation
docs/                Supporting project notes and client-logo references
public/              Static assets served from the site root
```

Update business contact information and the canonical website URL in
`app/site-config.ts`. Review `SEO.md` for the current SEO implementation,
deployment checklist, and outstanding launch items.

## Deployment

Deploy as a Node.js Next.js application. Set production environment variables
in the hosting provider's environment settings; local `.env.local` values are
not deployed automatically. Before launch, verify the contact details in
`app/site-config.ts`, configure and test SMTP delivery, and point the canonical
domain at the deployment over HTTPS. Then submit the generated sitemap at
`/sitemap.xml` to search webmaster tools.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for hosting options and platform-specific instructions.
