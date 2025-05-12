import type { MetadataRoute } from "next";

import { BASE_URL, NOW, PUBLISHED_PROJECTS } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: NOW(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...PUBLISHED_PROJECTS.map((project) => ({
      url: `${BASE_URL}/projects/${project["slug"]}`,
      lastModified: NOW(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      images: [],
    })),
  ];
}
