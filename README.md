# Celeste Hedequist Environmental

Independent environmental journalism site built with Next.js (App Router) and Tailwind CSS. Content is currently served from a typed mock data layer shaped for a future Sanity CMS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

- Home with featured investigation, category filter, and latest reporting grid
- News & Articles, Topics, Archive, About, Contact, Subscribe
- Individual article pages at `/articles/[slug]`
- Shared header/footer matching the editorial design system

## Content & Sanity

Mock posts live in `src/lib/data.ts` with types in `src/lib/types.ts`. Schema notes for Post, Category, and Author are in `src/lib/sanity/schema-reference.ts`.

To connect Sanity later:

1. Create a Sanity project and Studio
2. Install `next-sanity` and `@sanity/image-url`
3. Add project ID / dataset env vars
4. Swap the accessors in `src/lib/data.ts` for GROQ queries via `src/lib/sanity/client.ts`

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
