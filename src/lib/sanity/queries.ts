import { groq } from "next-sanity";

const categoryFields = groq`{
  _id,
  title,
  "slug": slug.current,
  description,
  seoTitle,
  seoDescription
}`;

const authorFields = groq`{
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  "image": image.asset->url,
  "imageAlt": image.alt,
  sameAs,
  knowsAbout
}`;

const postCardFields = groq`{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  featured,
  "mainImage": {
    "url": mainImage.asset->url,
    "alt": mainImage.alt
  },
  "categories": categories[]->${categoryFields},
  "author": author->${authorFields},
  seoTitle,
  seoDescription,
  noIndex,
  "ogImageUrl": coalesce(ogImage.asset->url, mainImage.asset->url),
  "ogImageSource": coalesce(ogImage, mainImage)
}`;

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postCardFields}`;

export const featuredPostQuery = groq`*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc)[0] ${postCardFields}`;

export const latestPostsQuery = groq`*[_type == "post" && defined(slug.current) && featured != true] | order(publishedAt desc)[0...$limit] ${postCardFields}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  "slug": slug.current,
  "mainImage": {
    "url": mainImage.asset->url,
    "alt": mainImage.alt
  },
  "categories": categories[]->${categoryFields},
  "author": author->${authorFields},
  "ogImageUrl": coalesce(ogImage.asset->url, mainImage.asset->url),
  "ogImageSource": coalesce(ogImage, mainImage),
  body
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const allCategoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(title asc) ${categoryFields}`;

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0] ${categoryFields}`;

export const postsByCategoryQuery = groq`*[_type == "post" && defined(slug.current) && $slug in categories[]->slug.current] | order(publishedAt desc) ${postCardFields}`;

export const authorQuery = groq`*[_type == "author"] | order(_createdAt asc)[0] ${authorFields}`;
