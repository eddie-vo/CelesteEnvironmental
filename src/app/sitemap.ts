import type { MetadataRoute } from "next";
import { getAllCategories, getAllPosts } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);
  const indexable = posts.filter((p) => !p.noIndex);
  const latest = indexable[0]?._updatedAt ?? indexable[0]?.publishedAt;

  const staticPages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "daily" as const, lastModified: latest },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/news", priority: 0.8, changeFrequency: "daily" as const, lastModified: latest },
    { path: "/topics", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/archive", priority: 0.5, changeFrequency: "weekly" as const, lastModified: latest },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/subscribe", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(({ path, ...rest }) => ({
    url: absoluteUrl(path),
    ...rest,
    ...(path === "/about" && { images: [absoluteUrl(siteConfig.person.image)] }),
  }));

  const postPages: MetadataRoute.Sitemap = indexable.map((post) => ({
    url: absoluteUrl(`/articles/${post.slug}`),
    lastModified: post._updatedAt ?? post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
    ...(post.mainImage?.url && { images: [post.mainImage.url] }),
  }));

  const topicPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/topics/${category.slug}`),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...topicPages];
}
