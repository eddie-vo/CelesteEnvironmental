import type { Author, Category, Post } from "./types";

export const author: Author = {
  _id: "author-celeste",
  name: "Celeste Hedequist",
  slug: "celeste-hedequist",
  role: "Environmental Correspondent",
  bio: "Celeste Hedequist reports on climate policy, renewable energy, and the ecosystems that bind them together. Her work has appeared across national outlets and focuses on the people and places reshaping how we live with a changing planet.",
  image: "/images/celeste-hedequist.jpg",
};

export const categories: Category[] = [
  {
    _id: "cat-climate",
    title: "Climate Policy",
    slug: "climate-policy",
    description: "Laws, treaties, and the politics of a warming world.",
  },
  {
    _id: "cat-renewable",
    title: "Renewable Energy",
    slug: "renewable-energy",
    description: "Wind, solar, storage, and the grid transition.",
  },
  {
    _id: "cat-biodiversity",
    title: "Biodiversity",
    slug: "biodiversity",
    description: "Wildlife, habitats, and the fight to keep ecosystems intact.",
  },
  {
    _id: "cat-circular",
    title: "Circular Economy",
    slug: "circular-economy",
    description: "Waste, materials, and redesigning how products live on.",
  },
  {
    _id: "cat-greentech",
    title: "Green Tech",
    slug: "green-tech",
    description: "Innovation at the intersection of climate and technology.",
  },
];

const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export const posts: Post[] = [
  {
    _id: "post-1",
    title: "Grid-Scale Storage Is Quietly Rewriting the Math on Renewables",
    slug: "grid-scale-storage-rewriting-renewables",
    excerpt:
      "Battery farms and long-duration storage are turning intermittent wind and solar into firm power — and rewriting the economics that utilities once used to dismiss them.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80",
      alt: "Wind turbines on a misty ridge at dawn",
    },
    publishedAt: "2026-07-28",
    readingTime: 11,
    featured: true,
    categories: [bySlug["renewable-energy"]],
    author,
    body: [
      "For years, the case against wind and solar rested on a simple claim: the sun sets, the wind dies, and the lights go out. Grid-scale storage is making that argument obsolete — not with a single breakthrough, but with a quiet accumulation of projects that utilities can no longer ignore.",
      "Across the American West, battery parks the size of shopping centers are coming online beside solar fields. In Texas and California, operators are stacking short-duration lithium batteries with longer-duration technologies that can hold power for eight, ten, even twenty hours. The result is a different kind of renewable plant: one that can bid into evening peak markets with the reliability once reserved for gas peakers.",
      "The economics are shifting as fast as the technology. Levelized storage costs have fallen enough that several large utilities now model renewables-plus-storage as the cheapest path to meeting new demand — including the surge from data centers and electrified transport.",
      "Still, the transition is uneven. Permitting, interconnection queues, and supply chains for critical minerals remain bottlenecks. Communities near proposed facilities are asking harder questions about land use, fire risk, and who benefits when a megawatt of storage comes online.",
      "What is clear is that the old spreadsheet — the one that treated wind and solar as intermittent liabilities — no longer describes the system that is being built. Storage is rewriting the math, and the grid is starting to keep up.",
    ],
  },
  {
    _id: "post-2",
    title: "Inside the Climate Summit Where Diplomacy Met Hard Limits",
    slug: "climate-summit-diplomacy-hard-limits",
    excerpt:
      "Negotiators left with a fragile agreement on finance — and a clearer map of where ambition still collides with national interest.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80",
      alt: "Delegates in a glass-walled conference hall",
    },
    publishedAt: "2026-07-22",
    readingTime: 9,
    categories: [bySlug["climate-policy"]],
    author,
    body: [
      "The summit opened with familiar choreography: speeches about urgency, photo lines of leaders, and a draft text already thick with brackets. By the final night, the brackets had thinned — but the disagreements they marked had not disappeared.",
      "Finance dominated the rooms that mattered. Developing nations pressed for clearer timelines on adaptation funding; wealthy economies offered incremental increases paired with private-capital frameworks. The compromise language that emerged satisfied enough parties to avoid collapse, while leaving advocates frustrated by its caution.",
      "Outside the plenary, scientists briefed delegates on emissions pathways that leave little room for delay. Inside, the politics of coal, shipping, and agriculture proved harder to move than the science suggested they should be.",
      "The takeaway for observers is not that diplomacy failed, but that it is operating near its structural limits. Binding national interest to collective targets still requires tools the current process only partially provides.",
    ],
  },
  {
    _id: "post-3",
    title: "A Field Season on the Marsh Edge, Watching Habitats Slip Away",
    slug: "marsh-edge-habitats-slip-away",
    excerpt:
      "Along a vanishing coastline, researchers and residents are documenting what saltwater intrusion takes — and what might still be saved.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
      alt: "Field researcher with camera gear in a marsh landscape",
    },
    publishedAt: "2026-07-14",
    readingTime: 8,
    categories: [bySlug["biodiversity"]],
    author,
    body: [
      "At low tide the marsh smells of mud and sulfur. At high tide, the water reaches farther inland than the maps from a decade ago suggest it should. That creeping line is the story researchers are here to tell.",
      "Saltwater intrusion kills freshwater plants from the roots up. Birds that nested in freshwater reeds find fewer places to raise young. Fish nurseries shift. For communities that fish and hunt these edges, the change is not abstract — it shows up in catch, in seasons, in memory.",
      "Restoration projects are underway: living shorelines, sediment placement, and managed retreat where homes can no longer stay. None of them reverse the water. They buy time and, in the best cases, rebuild complexity into a system that has been simplified by levees and development.",
      "Spending a season here makes the stakes tactile. Every transect, every photograph, every conversation with a landowner becomes part of a record of a landscape in motion.",
    ],
  },
  {
    _id: "post-4",
    title: "What Happens After the Sorting Line: Recycling’s Unfinished Business",
    slug: "recycling-unfinished-business",
    excerpt:
      "Mountains of sorted plastic reveal how far materials recovery has come — and how much of the circular economy still depends on design.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=1200&q=80",
      alt: "Large pile of sorted plastic recyclables",
    },
    publishedAt: "2026-07-08",
    readingTime: 7,
    categories: [bySlug["circular-economy"]],
    author,
    body: [
      "The sorting facility hums like a factory and smells faintly of detergent and dust. Conveyors separate PET from HDPE, film from rigid, contamination from commodity. At the end of the line, bales wait for buyers who may or may not materialize.",
      "Recycling’s public story has long outpaced its private economics. Export markets tightened. Virgin plastic remained cheap. Municipal programs collected materials that processors could not profitably remake into something manufacturers wanted.",
      "A circular economy that works will not be built on sorting alone. It requires packaging designed for recovery, extended producer responsibility that funds real infrastructure, and demand for recycled content strong enough to close the loop.",
      "The piles are not proof of failure so much as a ledger of unfinished work — evidence of intention waiting for systems that match it.",
    ],
  },
  {
    _id: "post-5",
    title: "The Quiet Race to Build Cleaner Cement",
    slug: "quiet-race-cleaner-cement",
    excerpt:
      "Startups and incumbents are chasing low-carbon cement recipes that could cut one of industry’s hardest emissions problems.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      alt: "Construction site with concrete forms",
    },
    publishedAt: "2026-06-30",
    readingTime: 6,
    categories: [bySlug["green-tech"]],
    author,
    body: [
      "Cement is responsible for roughly eight percent of global CO₂ emissions. That number alone explains why a quiet race is underway in labs and pilot kilns from California to Scandinavia.",
      "Some approaches swap clinker for alternative binders. Others capture process emissions at the stack. A few rethink chemistry entirely, aiming for materials that cure with less heat and less limestone.",
      "Scale remains the hurdle. Buildings and infrastructure demand consistency, codes, and supply chains that favor the known. But procurement mandates and corporate net-zero pledges are creating early markets for lower-carbon mixes.",
      "If those markets hold, cleaner cement could move from pilot curiosity to commodity — one of the rare industrial shifts that would matter in every skyline.",
    ],
  },
  {
    _id: "post-6",
    title: "How Community Solar Is Rewiring Rural Energy Politics",
    slug: "community-solar-rural-energy-politics",
    excerpt:
      "Shared arrays are giving households without rooftops a stake in clean power — and changing who shows up at county hearings.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
      alt: "Solar panels in a rural field under blue sky",
    },
    publishedAt: "2026-06-21",
    readingTime: 8,
    categories: [bySlug["renewable-energy"], bySlug["climate-policy"]],
    author,
    body: [
      "On a leased pasture outside a county seat of twelve thousand people, rows of panels face south. Subscribers include renters, a church, and a small machine shop that never had a roof suitable for solar.",
      "Community solar’s appeal is practical: lower bills without owning equipment. Its politics are more interesting. Landowners earn leases. Neighbors debate viewsheds. Utilities negotiate interconnection and bill credits. Suddenly, energy policy has a local address.",
      "States with strong community-solar statutes are seeing enrollment grow among households that traditional rooftop programs never reached. Equity advocates see a tool; incumbents see a rate-design headache.",
      "Either way, the arrays are changing who has a financial interest in the clean-energy transition — and who shows up when the next ordinance is on the agenda.",
    ],
  },
  {
    _id: "post-7",
    title: "Tracking the Return of a River After Dam Removal",
    slug: "river-return-after-dam-removal",
    excerpt:
      "When the concrete came down, salmon, sediment, and a town’s sense of place began rewriting themselves in real time.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80",
      alt: "Fast-flowing river through forested banks",
    },
    publishedAt: "2026-06-12",
    readingTime: 10,
    categories: [bySlug["biodiversity"]],
    author,
    body: [
      "The first season after the dam came out, the river looked like a construction site that nature had claimed mid-project. Sediment pulsed downstream. Channels braided and rebraided. Biologists watched for fish that might — or might not — find the newly opened miles.",
      "They did. Not in textbook numbers at first, but enough to confirm that passage alone can restart ecological memory. Willows took hold on freshly deposited bars. Birds followed the insects that followed the plants.",
      "For the town upstream, the reservoir’s absence meant a different recreation economy and a different shoreline. Grief and curiosity sat side by side at community meetings.",
      "Dam removal is not a universal prescription. Where it works, it is a reminder that some of the most powerful climate and biodiversity interventions are acts of subtraction.",
    ],
  },
  {
    _id: "post-8",
    title: "The Policy Fight Over Who Pays for Adaptation",
    slug: "who-pays-for-adaptation",
    excerpt:
      "As flood maps expand and heat records fall, the question of funding resilient infrastructure is becoming the central climate fight at home.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1200&q=80",
      alt: "Flooded residential street after heavy rain",
    },
    publishedAt: "2026-06-03",
    readingTime: 9,
    categories: [bySlug["climate-policy"]],
    author,
    body: [
      "Adaptation used to be the quieter twin of mitigation — less glamorous, less global, easier to postpone. That era is ending. Insurance retreat, repeated flood claims, and deadly heat waves have made resilience a kitchen-table issue.",
      "The policy fight is over who pays. Federal grants, state bonds, local property taxes, and private capital each come with different winners and losers. Low-income neighborhoods that did the least to cause the crisis often face the highest exposure and the thinnest tax base.",
      "Some cities are experimenting with resilience districts and stormwater fees. Others are buying out homes in floodplains. Courts are beginning to hear cases that test whether governments can be held liable for foreseeable climate harms.",
      "Whatever model prevails, adaptation funding is no longer optional infrastructure. It is becoming the price of remaining in place.",
    ],
  },
];

/** Content accessors — swap implementations for Sanity GROQ later. */
export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPost(): Post | undefined {
  return getAllPosts().find((p) => p.featured) ?? getAllPosts()[0];
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string | null): Post[] {
  if (!categorySlug || categorySlug === "all") {
    return getAllPosts();
  }
  return getAllPosts().filter((p) =>
    p.categories.some((c) => c.slug === categorySlug),
  );
}

export function getLatestPosts(limit = 6, excludeFeatured = true): Post[] {
  return getAllPosts()
    .filter((p) => (excludeFeatured ? !p.featured : true))
    .slice(0, limit);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function formatPostDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
