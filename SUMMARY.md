# Project Summary

**Celeste Hedequist Environmental** is an independent environmental journalism website.

## Stack
- **Next.js 16 (App Router)** with React 19 and TypeScript
- **Tailwind CSS v4** for styling
- **Sanity CMS** for content (authors, categories, posts with SEO fields)
- **Cloudflare Workers** hosting via OpenNext (`@opennextjs/cloudflare`)

## Structure
- `src/app/(site)/` — public pages: home, articles, topics, news, archive, about, contact, subscribe
- `src/app/` — metadata routes: `sitemap`, `robots`, `manifest`, `feed.xml` (RSS), `llms.txt`
- `src/components/` — UI pieces (header, footer, article cards/grid, featured investigation, category filter, Portable Text body, JSON-LD)
- `src/sanity/` — Studio config and schema types (`author`, `category`, `post`)
- `src/lib/` — site config and Sanity client/image helpers

## Content workflow
Editors use a separately hosted Sanity Studio (keeps the Worker bundle small).
They create authors, categories and posts, can mark one post as the homepage
"Featured investigation", and publish; the site revalidates about every 60 seconds.

## Key scripts
- `npm run dev` — local dev server (port 3000)
- `npm run studio` / `studio:deploy` — run or deploy Sanity Studio
- `npm run deploy` — build and deploy to Cloudflare Workers
