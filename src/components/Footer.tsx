import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Independent environmental journalism by Celeste Hedequist, MPH, on
            the policies, places, and people reshaping our relationship with
            the planet.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/news" className="hover:text-forest">
                News & Articles
              </Link>
            </li>
            <li>
              <Link href="/topics" className="hover:text-forest">
                Topics
              </Link>
            </li>
            <li>
              <Link href="/archive" className="hover:text-forest">
                Full archive
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            About
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-forest">
                About Celeste
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-forest">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/subscribe" className="hover:text-forest">
                Subscribe
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Newsletter
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Field notes and new investigations, delivered when they publish.
          </p>
          <Link
            href="/subscribe"
            className="mt-4 inline-flex rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-hover"
          >
            Join the list
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Celeste Hedequist Environmental</p>
          <p>Reporting with care for people and place.</p>
        </div>
      </div>
    </footer>
  );
}
