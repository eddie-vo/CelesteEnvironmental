/**
 * Sanity schema references for when the Studio is added.
 * These mirror the TypeScript types in src/lib/types.ts and the mock data shape.
 *
 * Suggested Studio setup later:
 *   npx sanity@latest init --env
 *   then place schemas under sanity/schemaTypes/
 */

export const postSchemaReference = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: "required" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", type: "text", rows: 3 },
    { name: "mainImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
    { name: "publishedAt", type: "datetime" },
    { name: "readingTime", type: "number" },
    { name: "featured", type: "boolean" },
    { name: "categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] },
    { name: "author", type: "reference", to: [{ type: "author" }] },
    { name: "body", type: "array", of: [{ type: "block" }] },
  ],
};

export const categorySchemaReference = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "description", type: "text" },
  ],
};

export const authorSchemaReference = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "role", type: "string" },
    { name: "bio", type: "text" },
    { name: "image", type: "image" },
  ],
};
