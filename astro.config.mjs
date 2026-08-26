import { fileURLToPath } from "node:url";

import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.doradisena.cl",
  trailingSlash: "ignore",
  output: "server",
  session: false,
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
  },
});
