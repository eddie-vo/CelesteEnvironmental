import type { Metadata } from "next";
import { getAllPosts } from "@/lib/data";
import { ArticleGrid } from "@/components/ArticleGrid";

export const metadata: Metadata = {
  title: "Archive",
  description: "The full archive of Celeste Hedequist Environmental reporting.",
};

export default function ArchivePage() {
  const posts = getAllPosts();

  return (
    <div className="pt-10 lg:pt-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Archive
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          Full archive
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Every published story, newest first.
        </p>
      </div>
      <ArticleGrid posts={posts} title={`${posts.length} stories`} archiveHref={undefined} />
    </div>
  );
}
