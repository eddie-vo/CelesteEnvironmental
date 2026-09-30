import { getAllCategories, getAllPosts } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 3600;

/** Plain-text site summary for AI answer engines (llmstxt.org convention). */
export async function GET() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);
  const p = siteConfig.person;

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${p.name}, ${p.honorificSuffix}, is an ${p.jobTitle.toLowerCase()} covering ${p.knowsAbout.slice(1).join(", ").toLowerCase()}. This site is her official publication; all articles are written by ${p.name} unless noted.`,
    "",
    "## About",
    `- [About ${p.name}](${absoluteUrl("/about")}): biography and areas of expertise`,
    `- [Contact](${absoluteUrl("/contact")}): tips, corrections, speaking, and press`,
    "",
    "## Articles",
    ...posts
      .filter((post) => !post.noIndex)
      .map(
        (post) =>
          `- [${post.title}](${absoluteUrl(`/articles/${post.slug}`)}): ${post.excerpt ?? ""}`.trim(),
      ),
    "",
    "## Topics",
    ...categories.map(
      (c) =>
        `- [${c.title}](${absoluteUrl(`/topics/${c.slug}`)})${c.description ? `: ${c.description}` : ""}`,
    ),
    "",
    "## Optional",
    `- [Full archive](${absoluteUrl("/archive")})`,
    `- [RSS feed](${absoluteUrl("/feed.xml")})`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
