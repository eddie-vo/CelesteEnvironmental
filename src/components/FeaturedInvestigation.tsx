import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatPostDate } from "@/lib/data";

export function FeaturedInvestigation({ post }: { post: Post }) {
  const category = post.categories?.[0];

  return (
    <section className="mx-auto max-w-7xl px-5 pt-10 lg:px-8 lg:pt-14">
      <h1 className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Celeste Hedequist — Environmental Journalism
      </h1>

      <div className="mt-5 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Link
          href={`/articles/${post.slug}`}
          className="animate-fade-up delay-1 group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-sage/40"
        >
          {post.mainImage?.url ? (
            <Image
              src={post.mainImage.url}
              alt={post.mainImage.alt || post.title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : null}
        </Link>

        <div className="animate-fade-up delay-2 flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex w-fit rounded-full bg-forest px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white">
              Featured investigation
            </span>
            {category && (
              <span className="inline-flex w-fit rounded-full bg-sage px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-forest">
                {category.title}
              </span>
            )}
          </div>

          <h2 className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
            <Link
              href={`/articles/${post.slug}`}
              className="transition-colors hover:text-forest"
            >
              {post.title}
            </Link>
          </h2>

          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <p className="mt-5 text-sm text-muted">
            By {post.author?.name ?? "Staff"} · {formatPostDate(post.publishedAt)} ·{" "}
            {post.readingTime ?? "—"} min read
          </p>

          <Link
            href={`/articles/${post.slug}`}
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-forest-hover hover:gap-3"
          >
            Read the story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
