/**
 * The Celeste Hedequist site network. All three sites describe the same
 * person with the same schema.org @id, and point to one "entity home"
 * (celestehedequist.com/about/) so search engines treat them as one entity.
 * Keep this file identical in every repo.
 */
export const ENTITY = {
  name: "Celeste Hedequist",
  id: "https://celestehedequist.com/#person",
  home: "https://celestehedequist.com/about/",
  image: "https://celestehedequist.com/wp-content/uploads/2023/12/IMG_1110-768x1024.jpeg",
  description:
    "Celeste Hedequist is a Boston native, mother of four and writer with a Master of Public Health from Columbia University. She writes about family travel, raising curious kids and the environment.",
  alumniOf: { name: "Columbia University", url: "https://www.columbia.edu/" },
  homeLocation: "Boston, Massachusetts",
  knowsAbout: ["Family travel", "Travel planning", "Parenting", "Service learning", "Environmental conservation", "Public health"],
};

export const NETWORK = [
  {
    key: "travel",
    url: "https://celestehedequist.com",
    name: "Celeste Hedequist – Family Travel Journal",
    label: "Travel journal",
    blurb: "Destination guides, itineraries and travel tips.",
  },
  {
    key: "family",
    url: "https://celestehedequist.net",
    name: "Celeste Hedequist – Family, Kids & Travel",
    label: "Family & kids",
    blurb: "Raising curious kids, service projects and family life.",
  },
  {
    key: "environment",
    url: "https://celestehedequistenv.com",
    name: "Celeste Hedequist – Environmental Journalism",
    label: "Environmental journalism",
    blurb: "Ecology, conservation, climate and public health.",
  },
] as const;

export const PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/celestehedequist" },
  { label: "Instagram", href: "https://www.instagram.com/celeste_hedequist/" },
  { label: "Instagram (travel)", href: "https://www.instagram.com/hedequist.travel/" },
  { label: "Pinterest", href: "https://www.pinterest.com/celestehedequist/" },
  { label: "About.me", href: "https://about.me/celestehedequist" },
  { label: "Behance", href: "https://www.behance.net/CelesteHedequist" },
  { label: "Vimeo", href: "https://vimeo.com/celestehedequist" },
];

/** Every URL that represents the same person (for schema.org sameAs). */
export const SAME_AS = [...NETWORK.map((s) => `${s.url}/`), ...PROFILES.map((p) => p.href)];
