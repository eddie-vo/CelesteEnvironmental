import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "7369p9av",
    dataset: "production",
  },
  studioHost: "celeste-environmental",
  deployment: {
    appId: "eibx0ig39cw7qx3zpnzm1f2t",
  },
  project: {
    basePath: "/",
  },
});
