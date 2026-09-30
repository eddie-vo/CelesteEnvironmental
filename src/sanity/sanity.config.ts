import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7369p9av";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "celeste-environmental",
  title: "Celeste Hedequist Environmental",
  projectId,
  dataset,
  basePath: "/",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Posts")
              .child(S.documentTypeList("post").title("Posts")),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("Authors")
              .child(S.documentTypeList("author").title("Authors")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
