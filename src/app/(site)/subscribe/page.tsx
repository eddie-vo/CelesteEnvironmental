import type { Metadata } from "next";
import {
  brandTitle,
  breadcrumbNode,
  jsonLdGraph,
  pageMetadata,
  webPageNode,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const title = brandTitle("Subscribe to Field Notes");
const description =
  "Subscribe to Celeste Hedequist's field notes — occasional letters with new environmental investigations and reporting notes, no daily noise.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/subscribe",
});

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-center lg:px-8 lg:py-24">
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            path: "/subscribe",
            name: title,
            description,
          }),
          breadcrumbNode([{ name: "Subscribe", path: "/subscribe" }]),
        )}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Newsletter
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
        Field notes, when they matter
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Occasional letters with new investigations and reporting notes — no
        daily noise, no filler.
      </p>

      <form
        className="mt-10 flex flex-col gap-3 sm:flex-row"
        action="#"
        method="post"
      >
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-full border border-border bg-surface px-5 py-3.5 text-base outline-none ring-forest/25 focus:ring-2"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-forest-hover"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-4 text-xs text-muted">
        Placeholder form — connect to Buttondown, Mailchimp, or Sanity later.
      </p>
    </div>
  );
}
