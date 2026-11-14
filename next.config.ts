import type { NextConfig } from "next";

const CANONICAL_HOST = "celestehedequistenv.com";

const nextConfig: NextConfig = {
  // Send every non-canonical host (workers.dev, www) to the custom domain so
  // search engines index one copy of each page.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "celesteenvironmental.eddievo.workers.dev" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
