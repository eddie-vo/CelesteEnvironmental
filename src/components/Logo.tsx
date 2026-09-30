import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Celeste Hedequist Environmental — Home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-leaf.png"
        alt=""
        width={44}
        height={41}
        className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11"
      />
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-[1.05rem] font-bold tracking-tight text-forest">
          Celeste Hedequist
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-forest/80">
          Environmental
        </span>
      </span>
    </Link>
  );
}
