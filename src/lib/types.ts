import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

/** Content types shaped to match Sanity schemas. */

export type Author = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  image?: string;
  imageAlt?: string;
  sameAs?: string[];
  knowsAbout?: string[];
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type PostImage = {
  url: string;
  alt: string;
};

export type Post = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: PostImage;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  categories?: Category[];
  author?: Author;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  ogImageSource?: SanityImageSource;
  noIndex?: boolean;
};
