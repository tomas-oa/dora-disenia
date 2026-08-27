import { fileURLToPath } from "node:url";

import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.doradisena.cl",
  trailingSlash: "ignore",
  output: "server",
  session: false,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "coolvetica",
      cssVariable: "--font-coolvetica",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/CoolveticaBk-Regular.ttf"],
          },
          {
            weight: 500,
            style: "normal",
            src: ["./src/assets/fonts/CoolveticaRg-Regular.ttf"],
          },
        ],
      },
    },
  ],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "tap",
  },
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
