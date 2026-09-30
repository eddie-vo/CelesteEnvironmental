/** Canonical site identity used by metadata, JSON-LD, sitemap, and feeds. */

const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://celesteenvironmental.eddievo.workers.dev";

export const siteConfig = {
  url: rawUrl.replace(/\/+$/, ""),
  name: "Celeste Hedequist Environmental",
  shortName: "Celeste Hedequist",
  title: "Celeste Hedequist, MPH | Environmental Journalism",
  tagline: "Environmental journalism by Celeste Hedequist",
  description:
    "Celeste Hedequist, MPH — independent environmental journalism on ecology, conservation, climate, and public health. Long-form investigations and field reporting.",
  locale: "en_US",
  language: "en-US",
  themeColor: "#1a3021",
  backgroundColor: "#f6f6f4",
  logo: { url: "/images/logo-leaf.png", width: 345, height: 336 },
  ogImage: {
    url: "/images/og-default.jpg",
    width: 1200,
    height: 630,
    alt: "Celeste Hedequist — Environmental Journalism & Field Reporting",
  },
  keywords: [
    "Celeste Hedequist",
    "Celeste Hedequist MPH",
    "Celeste Hedequist Environmental",
    "environmental journalism",
    "ecology and conservation",
    "climate reporting",
    "environmental public health",
  ],
  person: {
    name: "Celeste Hedequist",
    honorificSuffix: "MPH",
    jobTitle: "Environmental Journalist",
    image: "/images/celeste-hedequist.jpg",
    description:
      "Celeste Hedequist, MPH, is an environmental journalist reporting on ecology, conservation, climate policy, and public health.",
    knowsAbout: [
      "Environmental journalism",
      "Ecology",
      "Conservation",
      "Wildfire ecology",
      "Climate policy",
      "Environmental health",
      "Public health",
    ],
    sameAs: [] as string[],
  },
} as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strips trailing credentials ("M.P.H", ", MPH") that Google asks to keep out of author names. */
export function cleanPersonName(name: string | undefined): string {
  if (!name) return siteConfig.person.name;
  return name
    .replace(/,?\s+(M\.?P\.?H\.?|Ph\.?D\.?|M\.?S\.?|M\.?A\.?)$/i, "")
    .trim();
}
