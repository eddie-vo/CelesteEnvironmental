import type { Metadata } from "next";
import { getAllCategories, getFeaturedPost, getLatestPosts } from "@/lib/data";
import { studioUrl } from "@/lib/sanity/studio";
import { siteConfig } from "@/lib/site";
import { itemListNode, jsonLdGraph, pageMetadata, webPageNode } from "@/lib/seo";
import { FeaturedInvestigation } from "@/components/FeaturedInvestigation";
import { HomeLatestSection } from "@/components/HomeLatestSection";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const [featured, recent, categories] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(7, false),
    getAllCategories(),
  ]);

  const latest = recent.filter((p) => p._id !== featured?._id).slice(0, 6);

  if (!featured) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center lg:px-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          No stories yet
        </h1>
        <p className="mt-4 text-muted">
          Publish your first post in{" "}
          <a
            href={studioUrl}
            className="font-medium text-forest underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sanity Studio
          </a>{" "}
          to populate this site.
        </p>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            path: "/",
            name: siteConfig.title,
            description: siteConfig.description,
            breadcrumb: false,
            image: featured.mainImage?.url,
            extra: { mainEntity: itemListNode([featured, ...latest]) },
          }),
        )}
      />
      <FeaturedInvestigation post={featured} />
      {latest.length > 0 && (
        <HomeLatestSection categories={categories} posts={latest} />
      )}
    </>
  );
}
