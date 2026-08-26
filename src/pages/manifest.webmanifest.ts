import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return Response.json({
    name: "Dora Diseña",
    short_name: "Dora Diseña",
    description: "Diseño gráfico, editorial, branding e ilustración.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf7",
    theme_color: "#fffcf7",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  });
};
