import { getAllPosts } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getAllPosts()).filter((p) => !p.noIndex).slice(0, 50);
  const feedUrl = absoluteUrl("/feed.xml");

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/articles/${post.slug}`);
      const categories = (post.categories ?? [])
        .map((c) => `<category>${escapeXml(c.title)}</category>`)
        .join("");
      const image = post.mainImage?.url
        ? `<enclosure url="${escapeXml(post.mainImage.url)}" type="image/jpeg" length="0"/>`
        : "";
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate><dc:creator>${escapeXml(siteConfig.person.name)}</dc:creator><description>${escapeXml(post.excerpt ?? "")}</description>${categories}${image}</item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>${escapeXml(siteConfig.name)}</title>
<link>${absoluteUrl("/")}</link>
<description>${escapeXml(siteConfig.description)}</description>
<language>${siteConfig.language.toLowerCase()}</language>
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${posts[0] ? `<lastBuildDate>${new Date(posts[0]._updatedAt ?? posts[0].publishedAt).toUTCString()}</lastBuildDate>` : ""}
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
