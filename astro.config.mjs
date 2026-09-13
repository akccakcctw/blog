import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

import { rehypeR2Image } from "./src/plugins/rehype-r2-image.mjs";

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
    },
    rehypePlugins: [rehypeR2Image],
  },

  // or "server" to be SSR
  output: "static",

  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
  },
});