import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAuthor } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import {
  breadcrumbNode,
  jsonLdGraph,
  pageMetadata,
  schemaIds,
  webPageNode,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ENTITY, NETWORK, PROFILES } from "@/lib/network";

const title = "About Celeste Hedequist, MPH — Environmental Journalist";
const description =
  "Meet Celeste Hedequist, MPH — an environmental journalist reporting on ecology, conservation, climate, and public health. Her background, focus, and how to reach her.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/about",
  type: "profile",
  images: [
    {
      url: siteConfig.ogImage.url,
      width: siteConfig.ogImage.width,
      height: siteConfig.ogImage.height,
      alt: "Portrait of Celeste Hedequist",
    },
  ],
});

export default async function AboutPage() {
  const author = await getAuthor();

  const name = author?.name ?? siteConfig.person.name;
  const role = author?.role ?? siteConfig.person.jobTitle;
  const bio = author?.bio ?? siteConfig.person.description;
  const image = author?.image ?? siteConfig.person.image;
  const imageAlt = author?.imageAlt || "Portrait of Celeste Hedequist";

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            type: "ProfilePage",
            path: "/about",
            name: title,
            description,
            image,
            extra: { mainEntity: { "@id": schemaIds.person } },
          }),
          breadcrumbNode([{ name: "About Celeste Hedequist", path: "/about" }]),
        )}
      />
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[5/6]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        <div className="animate-fade-up delay-1 lg:pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            About Celeste Hedequist
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {name}
          </h1>
          {role && (
            <p className="mt-3 text-lg font-medium text-forest">{role}</p>
          )}
          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-muted">
            <p>{bio}</p>
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
          <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              More from Celeste Hedequist
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {NETWORK.filter((s) => s.url !== siteConfig.url).map((s) => (
                <li key={s.url}>
                  <a href={`${s.url}/`} className="font-semibold text-foreground hover:text-forest">
                    {s.name}
                  </a>
                  <span className="block text-muted">{s.blurb}</span>
                </li>
              ))}
              <li>
                <a href={ENTITY.home} className="font-semibold text-foreground hover:text-forest">
                  Celeste Hedequist&apos;s main profile
                </a>
              </li>
            </ul>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              {PROFILES.map((pr) => (
                <a key={pr.href} href={pr.href} rel="me noopener" target="_blank" className="hover:text-forest">
                  {pr.label}
                </a>
              ))}
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
