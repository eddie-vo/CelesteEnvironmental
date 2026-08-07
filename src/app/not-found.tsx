import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center lg:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-muted">
        That story or page isn&apos;t here. Try the archive or head home.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-hover"
        >
          Home
        </Link>
        <Link
          href="/archive"
          className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold hover:border-forest/30"
        >
          Archive
        </Link>
      </div>
    </div>
  );
}
