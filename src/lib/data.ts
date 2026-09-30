import { client } from "./sanity/client";
import {
  allCategoriesQuery,
  allPostsQuery,
  authorQuery,
  categoryBySlugQuery,
  featuredPostQuery,
  latestPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsByCategoryQuery,
} from "./sanity/queries";
import type { Author, Category, Post } from "./types";

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(allPostsQuery);
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const featured = await client.fetch<Post | null>(featuredPostQuery);
  if (featured) return featured;
  const posts = await getAllPosts();
  return posts[0];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });
  return post ?? undefined;
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch<string[]>(postSlugsQuery);
}

export async function getPostsByCategory(
  categorySlug: string | null,
): Promise<Post[]> {
  if (!categorySlug || categorySlug === "all") {
    return getAllPosts();
  }
  return client.fetch<Post[]>(postsByCategoryQuery, { slug: categorySlug });
}

export async function getLatestPosts(
  limit = 6,
  excludeFeatured = true,
): Promise<Post[]> {
  if (excludeFeatured) {
    return client.fetch<Post[]>(latestPostsQuery, { limit });
  }
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  const category = await client.fetch<Category | null>(categoryBySlugQuery, {
    slug,
  });
  return category ?? undefined;
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch<Category[]>(allCategoriesQuery);
}

export async function getAuthor(): Promise<Author | undefined> {
  const author = await client.fetch<Author | null>(authorQuery);
  return author ?? undefined;
}

export function formatPostDate(iso: string | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
