import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/data";
import {
  brandTitle,
  breadcrumbNode,
  itemListNode,
  jsonLdGraph,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";
import type { Category } from "@/lib/types";
import { ArticleGrid } from "@/components/ArticleGrid";
import { JsonLd } from "@/components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

function topicSeo(category: Category) {
  return {
    title: brandTitle(category.seoTitle || category.title),
    description:
      category.seoDescription ||
      category.description ||
      `${category.title} reporting and investigations by environmental journalist Celeste Hedequist.`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Topic not found" };
  return pageMetadata({ ...topicSeo(category), path: `/topics/${slug}` });
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(slug);
  const { title, description } = topicSeo(category);
  const path = `/topics/${slug}`;

  return (
    <div className="pt-10 lg:pt-14">
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            type: "CollectionPage",
            path,
            name: title,
            description,
            extra: { mainEntity: itemListNode(posts) },
          }),
          breadcrumbNode([
            { name: "Topics", path: "/topics" },
            { name: category.title, path },
          ]),
        )}
      />
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
        emptyMessage="No stories in this topic yet."
      />
    </div>
  );
}
