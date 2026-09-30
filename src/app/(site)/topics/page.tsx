import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/data";
import { studioUrl } from "@/lib/sanity/studio";
import { absoluteUrl } from "@/lib/site";
import {
  brandTitle,
  breadcrumbNode,
  jsonLdGraph,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const title = brandTitle("Environmental Reporting Topics");
const description =
  "Browse Celeste Hedequist's environmental reporting by topic — ecology and conservation, climate, public health, and the places where they meet.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/topics",
});

export default async function TopicsPage() {
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getAllPosts(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            type: "CollectionPage",
            path: "/topics",
            name: title,
            description,
            extra: {
              hasPart: categories.map((c) => ({
                "@type": "CollectionPage",
                name: c.title,
                url: absoluteUrl(`/topics/${c.slug}`),
              })),
            },
          }),
          breadcrumbNode([{ name: "Topics", path: "/topics" }]),
        )}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Topics
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
        Explore by beat
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Each topic gathers reporting around a single question about how we live
        with a changing planet.
      </p>

      {categories.length === 0 ? (
        <p className="mt-12 text-muted">
          No topics yet. Create categories in{" "}
          <a
            href={studioUrl}
            className="text-forest underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sanity Studio
          </a>
          .
        </p>
      ) : (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = posts.filter((p) =>
              p.categories?.some((c) => c.slug === category.slug),
            ).length;
            return (
              <li key={category._id}>
                <Link
                  href={`/topics/${category.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all hover:border-forest/25 hover:shadow-[0_8px_30px_rgba(26,48,33,0.06)]"
                >
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-forest">
                    {count} {count === 1 ? "story" : "stories"}
                  </span>
                  <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight transition-colors group-hover:text-forest">
                    {category.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-forest">
                    View topic →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
