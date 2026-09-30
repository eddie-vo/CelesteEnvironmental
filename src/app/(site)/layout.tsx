import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getAuthor } from "@/lib/data";
import {
  jsonLdGraph,
  organizationNode,
  personNode,
  websiteNode,
} from "@/lib/seo";

/**
 * Revalidate public pages every 60s so newly published Sanity posts
 * appear without a full redeploy.
 */
export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const author = await getAuthor();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(organizationNode(), websiteNode(), personNode(author))}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
