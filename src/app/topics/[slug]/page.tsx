import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getAllPosts,
  getCategoryBySlug,
} from "@/lib/data";
import { ArticleGrid } from "@/components/ArticleGrid";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Topic not found" };
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getAllPosts().filter((p) =>
    p.categories.some((c) => c.slug === slug),
  );

  return (
    <div className="pt-10 lg:pt-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Topic
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          {category.title}
        </h1>
        {category.description && (
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {category.description}
          </p>
        )}
      </div>
      <ArticleGrid
        posts={posts}
        title="In this topic"
        archiveHref="/archive"
      />
    </div>
  );
}
