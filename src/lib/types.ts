/** Content types shaped to match a future Sanity schema. */

export type Author = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  image?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type PostImage = {
  url: string;
  alt: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: PostImage;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  categories: Category[];
  author: Author;
  /** Plain paragraphs for now; swap for Portable Text when Sanity is wired. */
  body: string[];
};
