import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPostDate,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/data";
import { PostBody } from "@/components/PostBody";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import {
  articleNode,
  brandTitle,
  breadcrumbNode,
  jsonLdGraph,
  pageMetadata,
  postOgImages,
  webPageNode,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return pageMetadata({
    title: brandTitle(post.seoTitle || post.title),
    description: post.seoDescription || post.excerpt,
    path: `/articles/${post.slug}`,
    type: "article",
    images: postOgImages(post),
    noIndex: post.noIndex,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt ?? post.publishedAt,
      section: post.categories?.[0]?.title,
      tags: post.categories?.map((c) => c.title),
    },
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const category = post.categories?.[0];
  const path = `/articles/${post.slug}`;

  return (
    <article className="pb-20">
      <JsonLd
        data={jsonLdGraph(
          articleNode(post),
          webPageNode({
            path,
            name: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt,
            image: post.mainImage?.url,
            extra: {
              mainEntity: { "@id": `${absoluteUrl(path)}#article` },
              datePublished: post.publishedAt,
              dateModified: post._updatedAt ?? post.publishedAt,
            },
          }),
          breadcrumbNode([
            { name: "News & Articles", path: "/news" },
            ...(category
              ? [{ name: category.title, path: `/topics/${category.slug}` }]
              : []),
            { name: post.title, path },
          ]),
        )}
      />
      <header className="mx-auto max-w-3xl px-5 pt-12 lg:px-8 lg:pt-16">
        {category && (
          <Link
            href={`/topics/${category.slug}`}
            className="mb-5 inline-flex rounded-full bg-sage px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-forest transition-colors hover:bg-sage-deep"
          >
            {category.title}
          </Link>
        )}
        <h1 className="animate-fade-up font-serif text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="animate-fade-up delay-1 mt-5 text-lg leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <p className="animate-fade-up delay-2 mt-6 text-sm text-muted">
          By{" "}
          <Link
            href="/about"
            rel="author"
            className="font-medium text-foreground hover:text-forest"
          >
            {post.author?.name ?? "Celeste Hedequist"}
          </Link>{" "}
          ·{" "}
          <time dateTime={post.publishedAt}>
            {formatPostDate(post.publishedAt)}
          </time>{" "}
          · {post.readingTime} min read
        </p>
      </header>

      {post.mainImage?.url && (
        <div className="animate-fade-up delay-3 mx-auto mt-10 max-w-5xl px-5 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.mainImage.url}
              alt={post.mainImage.alt || post.title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="mt-12">
        <PostBody value={post.body} />
      </div>

      {post.author && (
        <div className="mx-auto mt-14 max-w-2xl border-t border-border px-5 pt-10 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Written by
          </p>
          <div className="mt-4 flex items-start gap-4">
            {post.author.image && (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={post.author.image}
                  alt={post.author.imageAlt || post.author.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <Link
                href="/about"
                className="font-serif text-lg font-bold hover:text-forest"
              >
                {post.author.name}
              </Link>
              {post.author.role && (
                <p className="text-sm text-muted">{post.author.role}</p>
              )}
              {post.author.bio && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
