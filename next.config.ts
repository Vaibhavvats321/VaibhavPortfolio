import type { NextConfig } from "next";

import { basePath } from "./src/config/deployment";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  cacheComponents: process.env.NODE_ENV !== "production",
  partialPrefetching: process.env.NODE_ENV !== "production",
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
