import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatPostDate } from "@/lib/data";

export function ArticleCard({ post }: { post: Post }) {
  const category = post.categories?.[0];

  return (
    <article className="group flex flex-col">
      <Link
        href={`/articles/${post.slug}`}
        className="relative block aspect-[16/11] overflow-hidden rounded-2xl bg-sage/40"
      >
        {post.mainImage?.url ? (
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : null}
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        {category && (
          <span className="mb-2 inline-flex w-fit rounded-full bg-sage px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-forest">
            {category.title}
          </span>
        )}

        <h3 className="font-serif text-xl font-bold leading-snug tracking-tight">
          <Link
            href={`/articles/${post.slug}`}
            className="transition-colors hover:text-forest"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <p className="mt-3 text-xs text-muted">
          {formatPostDate(post.publishedAt)} · {post.readingTime} min read
        </p>
      </div>
    </article>
  );
}
