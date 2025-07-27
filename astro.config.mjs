import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  site: "https://rex-tsou.com",

  integrations: [
    sitemap(),
    mdx(),
    pagefind(),
  ],

  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  },

  // or "server" to be SSR
  output: "static",

  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },
});