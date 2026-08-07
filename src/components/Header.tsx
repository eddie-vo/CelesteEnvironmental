"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News & Articles" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About Celeste" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-[0.925rem] font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-sage text-forest"
                  : "text-foreground/80 hover:text-forest"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-sage/60 hover:text-forest"
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>

          <Link
            href="/subscribe"
            className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-hover sm:inline-flex"
          >
            Subscribe
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="animate-fade-in border-t border-border bg-surface px-5 py-4 lg:px-8">
          <form action="/news" method="get" className="mx-auto flex max-w-7xl gap-3">
            <input
              type="search"
              name="q"
              placeholder="Search reporting…"
              autoFocus
              className="w-full rounded-full border border-border bg-background px-5 py-2.5 text-sm outline-none ring-forest/30 focus:ring-2"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-hover"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <nav
          className="animate-fade-in border-t border-border bg-surface px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-full px-4 py-2.5 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-sage text-forest"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/subscribe"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full bg-forest px-4 py-2.5 text-center text-base font-semibold text-white"
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
