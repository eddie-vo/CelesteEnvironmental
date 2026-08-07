"use client";

import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
};

export function CategoryFilter({ categories, active, onChange }: Props) {
  const options = [{ slug: "all", title: "All" }, ...categories];

  return (
    <div className="border-y border-border">
      <div className="mx-auto flex max-w-7xl justify-center overflow-x-auto px-5 py-5 lg:px-8">
        <div className="flex min-w-max items-center gap-2.5" role="tablist" aria-label="Filter by topic">
          {options.map((option) => {
            const isActive = active === option.slug;
            return (
              <button
                key={option.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(option.slug)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-forest text-white"
                    : "border border-border bg-surface text-foreground/80 hover:border-forest/30 hover:text-forest"
                }`}
              >
                {option.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
