import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. Environmental Correspondent",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "sameAs",
      title: "Profile links",
      type: "array",
      of: [{ type: "url" }],
      description:
        "Official profiles for this person (LinkedIn, Muck Rack, ORCID, X, Instagram, university page…). Search engines use these to connect the site to Celeste Hedequist's identity.",
    }),
    defineField({
      name: "knowsAbout",
      title: "Areas of expertise",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        "Subjects this person is an authority on, e.g. Wildfire ecology, Public health.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", media: "image", subtitle: "role" },
  },
});
