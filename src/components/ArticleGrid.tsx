import Link from "next/link";
import type { Post } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

type Props = {
  posts: Post[];
  title?: string;
  archiveHref?: string;
  emptyMessage?: string;
};

export function ArticleGrid({
  posts,
  title = "Latest reporting",
  archiveHref = "/archive",
  emptyMessage = "No stories in this topic yet.",
}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-[2rem]">
          {title}
        </h2>
        {archiveHref && (
          <Link
            href={archiveHref}
            className="shrink-0 text-sm font-medium text-foreground/70 transition-colors hover:text-forest"
          >
            View the full archive
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="py-16 text-center text-muted">{emptyMessage}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {posts.map((post, i) => (
            <div
              key={post._id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
