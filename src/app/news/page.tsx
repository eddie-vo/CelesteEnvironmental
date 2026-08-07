import type { Metadata } from "next";
import { getAllPosts } from "@/lib/data";
import { ArticleGrid } from "@/components/ArticleGrid";

export const metadata: Metadata = {
  title: "News & Articles",
  description: "All environmental reporting from Celeste Hedequist.",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function NewsPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";
  const posts = getAllPosts().filter((post) => {
    if (!query) return true;
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.categories.some((c) => c.title.toLowerCase().includes(query))
    );
  });

  return (
    <div className="pt-10 lg:pt-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          News & Articles
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          {query ? `Results for “${q}”` : "All reporting"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Investigations and field reporting across climate policy, energy,
          biodiversity, and the circular economy.
        </p>
      </div>
      <ArticleGrid
        posts={posts}
        title={query ? `${posts.length} matched` : "Stories"}
        archiveHref={undefined}
        emptyMessage={
          query
            ? "No stories matched that search. Try another phrase."
            : "No stories yet."
        }
      />
    </div>
  );
}
