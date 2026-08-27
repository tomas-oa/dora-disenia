import { z } from "astro/zod";

import {
  MEDIA_PRESENTATION_OPTIONS,
  PROJECT_COLOR_OPTIONS,
  type ProjectMedia,
} from "@/src/lib/cms/types";

type ProjectColor = (typeof PROJECT_COLOR_OPTIONS)[number]["value"];

const projectColorValues = PROJECT_COLOR_OPTIONS.map((option) => option.value) as [
  ProjectColor,
  ...ProjectColor[],
];
const mediaPresentationValues = MEDIA_PRESENTATION_OPTIONS.map((option) => option.value) as [
  ProjectMedia["className"],
  ...ProjectMedia["className"][],
];

export const adminProjectTagSchema = z.object({
  key: z.string(),
  label: z.string(),
  className: z.string(),
});

export const adminProjectMediaSchema = z.object({
  id: z.string().min(1),
  src: z.string(),
  alt: z.string(),
  className: z.enum(mediaPresentationValues),
  mediaType: z.enum(["image", "video"]),
  role: z.enum(["cover", "gallery"]),
  sortOrder: z.number().int().nonnegative(),
  objectKey: z.string().min(1),
  publicUrl: z.string(),
  mimeType: z.string().nullable(),
  sizeBytes: z.number().int().nonnegative().nullable(),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
}) satisfies z.ZodType<ProjectMedia>;

export const adminProjectSchema = z
  .object({
    title: z.string().trim().min(1, "Escribe un título."),
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa solo minúsculas, números y guiones."),
    colorClass: z.enum(projectColorValues),
    digest: z.string(),
    summary: z.string(),
    status: z.enum(["draft", "published"]),
    tags: z.array(adminProjectTagSchema),
    media: z.array(adminProjectMediaSchema),
  })
  .superRefine((value, context) => {
    const covers = value.media.filter((item) => item.role === "cover");
    if (covers.length !== 1 || covers[0]?.mediaType !== "image") {
      context.addIssue({
        code: "custom",
        path: ["media"],
        message: "Elige exactamente una pieza de imagen como portada.",
      });
    }
  });

export type AdminProjectInput = z.infer<typeof adminProjectSchema>;
