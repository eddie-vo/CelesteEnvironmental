import { getAllCategories, getFeaturedPost, getLatestPosts } from "@/lib/data";
import { FeaturedInvestigation } from "@/components/FeaturedInvestigation";
import { HomeLatestSection } from "@/components/HomeLatestSection";

export default function HomePage() {
  const featured = getFeaturedPost();
  const latest = getLatestPosts(6, true);
  const categories = getAllCategories();

  if (!featured) {
    return null;
  }

  return (
    <>
      <FeaturedInvestigation post={featured} />
      <HomeLatestSection categories={categories} posts={latest} />
    </>
  );
}
