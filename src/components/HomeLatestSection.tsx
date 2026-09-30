"use client";

import { useMemo, useState } from "react";
import type { Category, Post } from "@/lib/types";
import { CategoryFilter } from "./CategoryFilter";
import { ArticleGrid } from "./ArticleGrid";

type Props = {
  categories: Category[];
  posts: Post[];
};

export function HomeLatestSection({ categories, posts }: Props) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.categories?.some((c) => c.slug === active));
  }, [active, posts]);

  return (
    <>
      <div className="mt-14 lg:mt-20">
        <CategoryFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
      </div>
      <ArticleGrid
        posts={filtered}
        emptyMessage="No stories match this topic yet. Try another filter."
      />
    </>
  );
}
