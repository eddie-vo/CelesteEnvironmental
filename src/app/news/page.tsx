import { Suspense } from "react";
import { NewsContent } from "./NewsContent";

export const metadata = {
  title: "News & Articles",
  description: "All environmental reporting from Celeste Hedequist.",
};

export default function NewsPage() {
  return (
    <div className="pt-10 lg:pt-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          News & Articles
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          All reporting
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Investigations and field reporting across climate policy, energy,
          biodiversity, and the circular economy.
        </p>
      </div>
      <Suspense>
        <NewsContent />
      </Suspense>
    </div>
  );
}
