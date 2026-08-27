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
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "doradisena.cl", pathname: "/media/**" },
      { protocol: "https", hostname: "www.doradisena.cl", pathname: "/media/**" },
      { protocol: "https", hostname: "**.doradisena.cl", pathname: "/media/**" },
      { protocol: "http", hostname: "doradisena.cl", pathname: "/media/**" },
      { protocol: "http", hostname: "www.doradisena.cl", pathname: "/media/**" },
      { protocol: "http", hostname: "**.doradisena.cl", pathname: "/media/**" },
      { protocol: "http", hostname: "localhost", pathname: "/media/**" },
      { protocol: "http", hostname: "127.0.0.1", pathname: "/media/**" },
    ],
  },
  adapter: cloudflare({
    imageService: { build: "compile", runtime: "cloudflare-binding" },
  }),
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
