import type { Metadata } from "next";
import {
  brandTitle,
  breadcrumbNode,
  jsonLdGraph,
  pageMetadata,
  schemaIds,
  webPageNode,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const title = brandTitle("Contact");
const description =
  "Contact Celeste Hedequist, MPH, with story tips, corrections, speaking invitations, and press or media requests about environmental reporting.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
      <JsonLd
        data={jsonLdGraph(
          webPageNode({
            type: "ContactPage",
            path: "/contact",
            name: title,
            description,
            extra: { mainEntity: { "@id": schemaIds.person } },
          }),
          breadcrumbNode([{ name: "Contact", path: "/contact" }]),
        )}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Contact
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-4 text-lg text-muted">
        Tips, corrections, speaking inquiries, and press requests are welcome.
        This form is a front-end placeholder — wire it to your preferred
        endpoint when you&apos;re ready.
      </p>

      <form className="mt-10 space-y-5" action="#" method="post">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Name
            <input
              type="text"
              name="name"
              required
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none ring-forest/25 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none ring-forest/25 focus:ring-2"
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Subject
          <input
            type="text"
            name="subject"
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none ring-forest/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Message
          <textarea
            name="message"
            required
            rows={6}
            className="mt-2 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none ring-forest/25 focus:ring-2"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-hover"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
