import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { croppedImageUrl } from "./sanity/image";
import { absoluteUrl, cleanPersonName, siteConfig } from "./site";
import type { Author, Post } from "./types";

type OgImage = { url: string; width?: number; height?: number; alt?: string };

type PageSeo = {
  /** Full document title, used verbatim. Use `brandTitle()` to append the name. */
  title: string;
  description: string;
  path: string;
  images?: OgImage[];
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
};

export function brandTitle(title: string): string {
  return `${title} | ${siteConfig.shortName}`;
}

/** Trims to a search-snippet-friendly length on a word boundary. */
export function clampDescription(text: string | undefined, max = 158): string {
  const clean = (text ?? siteConfig.description).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function pageMetadata(seo: PageSeo): Metadata {
  const images = seo.images?.length ? seo.images : [siteConfig.ogImage];
  const description = clampDescription(seo.description);
  const shared = {
    url: seo.path,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: seo.title,
    description,
    images,
  };

  let openGraph: Metadata["openGraph"];
  if (seo.type === "article") {
    openGraph = {
      ...shared,
      type: "article",
      publishedTime: seo.article?.publishedTime,
      modifiedTime: seo.article?.modifiedTime,
      authors: [absoluteUrl("/about")],
      section: seo.article?.section,
      tags: seo.article?.tags,
    };
  } else if (seo.type === "profile") {
    openGraph = {
      ...shared,
      type: "profile",
      firstName: "Celeste",
      lastName: "Hedequist",
    };
  } else {
    openGraph = { ...shared, type: "website" };
  }

  return {
    title: { absolute: seo.title },
    description,
    alternates: { canonical: seo.path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description,
      images: images.map((i) => ({ url: i.url, alt: i.alt })),
    },
    ...(seo.noIndex && {
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    }),
  };
}

/** 1200×630 social card from a post's OG/main image, falling back to the site card. */
export function postOgImages(post: Post): OgImage[] {
  const url = croppedImageUrl(post.ogImageSource, 1200, 630);
  if (!url) return [siteConfig.ogImage];
  return [
    { url, width: 1200, height: 630, alt: post.mainImage?.alt || post.title },
  ];
}

// ---------------------------------------------------------------------------
// JSON-LD (schema.org). Nodes reference each other by stable @id so search
// engines resolve a single Person / Organization / WebSite entity site-wide.
// ---------------------------------------------------------------------------

type Node = Record<string, unknown>;

export const schemaIds = {
  person: absoluteUrl("/#person"),
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
};

export function jsonLdGraph(...nodes: (Node | null | undefined | false)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

function unique(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => !!v))];
}

export function personNode(author?: Author): Node {
  const p = siteConfig.person;
  const sameAs = unique([...(author?.sameAs ?? []), ...p.sameAs]);
  return {
    "@type": "Person",
    "@id": schemaIds.person,
    name: cleanPersonName(author?.name),
    givenName: "Celeste",
    familyName: "Hedequist",
    honorificSuffix: p.honorificSuffix,
    url: absoluteUrl("/about"),
    image: {
      "@type": "ImageObject",
      "@id": absoluteUrl("/#personimage"),
      url: absoluteUrl(author?.image ?? p.image),
      caption: p.name,
    },
    jobTitle: author?.role || p.jobTitle,
    description: author?.bio || p.description,
    knowsAbout: author?.knowsAbout?.length ? author.knowsAbout : p.knowsAbout,
    worksFor: { "@id": schemaIds.organization },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": schemaIds.organization,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      "@id": absoluteUrl("/#logo"),
      url: absoluteUrl(siteConfig.logo.url),
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
      caption: siteConfig.name,
    },
    image: { "@id": absoluteUrl("/#logo") },
    founder: { "@id": schemaIds.person },
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "Celeste Hedequist MPH"],
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": schemaIds.organization },
    author: { "@id": schemaIds.person },
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbNode(trail: Crumb[]): Node {
  const items = [{ name: "Home", path: "/" }, ...trail];
  const last = items[items.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(last.path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type WebPageInput = {
  type?: "WebPage" | "CollectionPage" | "ProfilePage" | "ContactPage" | "AboutPage";
  path: string;
  name: string;
  description: string;
  breadcrumb?: boolean;
  image?: string;
  extra?: Node;
};

export function webPageNode({
  type = "WebPage",
  path,
  name,
  description,
  breadcrumb = true,
  image,
  extra,
}: WebPageInput): Node {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description: clampDescription(description),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": schemaIds.website },
    about: { "@id": schemaIds.person },
    ...(image && {
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) },
    }),
    ...(breadcrumb && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    ...extra,
  };
}

export function itemListNode(posts: Post[]): Node {
  return {
    "@type": "ItemList",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/articles/${post.slug}`),
      name: post.title,
    })),
  };
}

function wordCount(blocks: PortableTextBlock[] | undefined): number {
  if (!blocks) return 0;
  return blocks
    .flatMap((block) =>
      Array.isArray(block.children)
        ? block.children.map((c) => ("text" in c ? String(c.text) : ""))
        : [],
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function authorRef(author: Author | undefined): Node {
  const name = cleanPersonName(author?.name);
  if (name === siteConfig.person.name) {
    return {
      "@type": "Person",
      "@id": schemaIds.person,
      name,
      url: absoluteUrl("/about"),
    };
  }
  return { "@type": "Person", name };
}

export function articleNode(post: Post): Node {
  const url = absoluteUrl(`/articles/${post.slug}`);
  const images = unique([
    croppedImageUrl(post.ogImageSource, 1200, 675),
    croppedImageUrl(post.ogImageSource, 1200, 900),
    croppedImageUrl(post.ogImageSource, 1200, 1200),
  ]);
  const categories = post.categories?.map((c) => c.title) ?? [];
  const words = wordCount(post.body);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: post.title,
    description: clampDescription(post.seoDescription || post.excerpt),
    image: images.length ? images : post.mainImage?.url,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    author: [authorRef(post.author)],
    publisher: { "@id": schemaIds.organization },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: { "@id": schemaIds.website },
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    ...(categories[0] && { articleSection: categories[0] }),
    keywords: unique([...categories, siteConfig.person.name]).join(", "),
    ...(words > 0 && { wordCount: words }),
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
  };
}
