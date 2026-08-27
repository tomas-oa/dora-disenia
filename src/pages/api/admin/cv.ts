import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { siteAssets } from "@/src/lib/cms/schema";

export const prerender = false;

const maxCvSizeBytes = 10 * 1024 * 1024;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File))
    return Response.json({ error: "Archivo requerido" }, { status: 400 });
  if (file.size === 0 || file.size > maxCvSizeBytes)
    return Response.json({ error: "El CV debe pesar menos de 10 MB" }, { status: 413 });
  if ((await file.slice(0, 5).text()) !== "%PDF-")
    return Response.json({ error: "El archivo debe ser un PDF válido" }, { status: 415 });

  const id = crypto.randomUUID();
  const objectKey = `site/cv/${id}.pdf`;
  const baseUrl = env.MEDIA_BASE_URL.replace(/\/$/, "");
  const publicUrl = baseUrl ? `${baseUrl}/${objectKey}` : `/media/${objectKey}`;
  const now = new Date();
  const db = drizzle(env.DB);

  await env.MEDIA.put(objectKey, file, {
    httpMetadata: {
      contentType: "application/pdf",
      contentDisposition: 'attachment; filename="cv.pdf"',
    },
    customMetadata: { assetKey: "cv" },
  });

  try {
    const existing = await db
      .select({ key: siteAssets.key })
      .from(siteAssets)
      .where(eq(siteAssets.key, "cv"))
      .get();
    if (existing) {
      await db
        .update(siteAssets)
        .set({
          objectKey,
          publicUrl,
          mimeType: "application/pdf",
          sizeBytes: file.size,
          updatedAt: now,
        })
        .where(eq(siteAssets.key, "cv"));
    } else {
      await db.insert(siteAssets).values({
        key: "cv",
        objectKey,
        publicUrl,
        mimeType: "application/pdf",
        sizeBytes: file.size,
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch (error) {
    await env.MEDIA.delete(objectKey);
    throw error;
  }

  return Response.json({ objectKey, publicUrl, sizeBytes: file.size }, { status: 201 });
};
