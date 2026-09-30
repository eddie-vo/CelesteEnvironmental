# Celeste Hedequist Environmental

Independent environmental journalism site built with Next.js (App Router), Tailwind CSS, Sanity CMS, and Cloudflare Workers (OpenNext).

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity Studio (editors)

Studio is **hosted separately** from the public site (keeps the Cloudflare Worker bundle under size limits).

- **Production editors:** [https://celeste-environmental.sanity.studio](https://celeste-environmental.sanity.studio)
- **Local Studio dev:** `npm run studio` (runs on port 3333)
- **Deploy Studio updates:** `npm run studio:deploy`

## Environment variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=7369p9av
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SANITY_STUDIO_URL=https://celeste-environmental.sanity.studio
```

Set in `.env.local` before `npm run deploy`, and in Cloudflare Workers → Settings → Variables.

## Sanity CORS

In [sanity.io/manage](https://www.sanity.io/manage) → project `7369p9av` → API → CORS origins, allow:

- `http://localhost:3000`
- `http://localhost:3333` (local Studio)
- `https://celesteenvironmental.eddievo.workers.dev`
- `https://celeste-environmental.sanity.studio`

## Editor workflow

1. Open the hosted Studio URL and sign in with your Sanity account.
2. Create an **Author**, then **Categories**, then **Posts**.
3. Mark one post as **Featured investigation** for the homepage hero.
4. Fill the **SEO** tab on posts for custom titles/descriptions/social images.
5. Publish — the public site revalidates about every 60 seconds.

## Deploy public site to Cloudflare Workers

```bash
npm run deploy
```

Live URL: `https://celesteenvironmental.eddievo.workers.dev`

## Scripts

- `npm run dev` — local Next.js site
- `npm run studio` — local Sanity Studio (port 3333)
- `npm run studio:deploy` — deploy hosted Studio
- `npm run build` — production Next build
- `npm run preview` — OpenNext local Workers preview
- `npm run deploy` — build and deploy public site to Cloudflare Workers
- `npm run lint` — ESLint
