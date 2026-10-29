// @ts-check
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import { defineConfig } from "astro/config";

const site = process.env.SITE_URL || "https://example.com";

// https://astro.build/config
export default defineConfig({
  site,
  base: process.env.BASE_PATH || "/",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
  },
  build: {
    assets: "_assets",
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          ca: "ca",
        },
      },
    }),
    mdx(),
  ],
});
