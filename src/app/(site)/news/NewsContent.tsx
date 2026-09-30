"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Post } from "@/lib/types";
import { ArticleGrid } from "@/components/ArticleGrid";

export function NewsContent({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const query = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categories?.some((c) => c.title.toLowerCase().includes(query))
      );
    });
  }, [posts, query]);

  return (
    <ArticleGrid
      posts={filtered}
      title={query ? `${filtered.length} matched` : "Stories"}
      archiveHref={undefined}
      emptyMessage={
        query
          ? "No stories matched that search. Try another phrase."
          : "No stories yet. Publish posts in Sanity Studio."
      }
    />
  );
}
