import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { author } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Celeste",
  description: "About environmental correspondent Celeste Hedequist.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[5/6]">
          <Image
            src={
              author.image ??
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
            }
            alt={author.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="animate-fade-up delay-1 lg:pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            About Celeste
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {author.name}
          </h1>
          {author.role && (
            <p className="mt-3 text-lg font-medium text-forest">{author.role}</p>
          )}
          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-muted">
            <p>{author.bio}</p>
            <p>
              This site collects long-form investigations and field reporting —
              work that sits with the communities living through climate change,
              not just the headlines that briefly name them.
            </p>
            <p>
              Tips, corrections, and conversation are always welcome. The best
              stories often start with a note from someone who saw something the
              rest of us missed.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-hover"
            >
              Get in touch
            </Link>
            <Link
              href="/news"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-forest/30"
            >
              Read the reporting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
