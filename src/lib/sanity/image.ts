import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export function imageUrl(
  source: SanityImageSource | null | undefined,
  width = 1200,
): string | undefined {
  if (!source) return undefined;
  try {
    return urlForImage(source).width(width).auto("format").url();
  } catch {
    return undefined;
  }
}

/** Hotspot-aware crop to exact dimensions, as JPEG for social and search crawlers. */
export function croppedImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height: number,
): string | undefined {
  if (!source) return undefined;
  try {
    return urlForImage(source)
      .width(width)
      .height(height)
      .fit("crop")
      .format("jpg")
      .quality(82)
      .url();
  } catch {
    return undefined;
  }
}
