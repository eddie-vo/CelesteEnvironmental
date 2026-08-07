import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Celeste Hedequist Environmental — Home"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest transition-transform duration-300 group-hover:scale-105">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3c-1.5 4-5 6.5-8 7.5 3.5 1 6.2 3.8 7.2 7.5.8-3.2 3.2-5.8 6.8-7C14.5 9.5 12.8 6.2 12 3Z"
            fill="white"
          />
          <path
            d="M12 10.5v8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-[1.05rem] font-bold tracking-tight text-foreground">
          Celeste Hedequist
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
          Environmental
        </span>
      </span>
    </Link>
  );
}
