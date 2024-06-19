import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  site: "https://blog.rex-tsou.com",
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  },
  output: "static", // or "server" to be SSR
  adapter: netlify(),
});
