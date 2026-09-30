import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-serif text-2xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-serif text-xl font-bold tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-forest/30 pl-5 text-muted italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-forest underline underline-offset-2 hover:no-underline"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlForImage(value).width(1200).auto("format").url();
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={value.alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PostBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return (
      <p className="text-muted">This story does not have body content yet.</p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 text-[1.1rem] leading-[1.75] text-foreground/90 lg:px-8">
      <PortableText value={value} components={components} />
    </div>
  );
}
