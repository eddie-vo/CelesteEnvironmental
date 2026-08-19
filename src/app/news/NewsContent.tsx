"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getAllPosts } from "@/lib/data";
import { ArticleGrid } from "@/components/ArticleGrid";

export function NewsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const query = q.trim().toLowerCase();

  const posts = useMemo(() => {
    return getAllPosts().filter((post) => {
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categories.some((c) => c.title.toLowerCase().includes(query))
      );
    });
  }, [query]);

  return (
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
  );
}
