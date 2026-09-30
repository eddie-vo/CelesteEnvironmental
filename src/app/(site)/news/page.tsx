import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/data";
import {
  brandTitle,
  breadcrumbNode,
  itemListNode,
  jsonLdGraph,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { NewsContent } from "./NewsContent";

const title = brandTitle("Environmental News & Articles");
const description =
  "Every environmental investigation and field report by Celeste Hedequist — ecology, conservation, climate policy, and public health, newest first.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getAllPosts();

  return (
    <div className="pt-10 lg:pt-14">
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            type: "CollectionPage",
            path: "/news",
            name: title,
            description,
            extra: { mainEntity: itemListNode(posts) },
          }),
          breadcrumbNode([{ name: "News & Articles", path: "/news" }]),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          News & Articles
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          All reporting
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Investigations and field reporting across climate policy, energy,
          biodiversity, and the circular economy.
        </p>
      </div>
      <Suspense>
        <NewsContent posts={posts} />
      </Suspense>
    </div>
  );
}
