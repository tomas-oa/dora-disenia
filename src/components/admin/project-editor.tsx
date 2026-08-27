import { useRef, useState } from "preact/hooks";
import { z } from "astro/zod";

import { adminProjectSchema } from "@/src/lib/cms/project-form";
import {
  MEDIA_PRESENTATION_OPTIONS,
  PROJECT_COLOR_OPTIONS,
  type ProjectMedia,
  type ProjectTag,
  type PublicProject,
} from "@/src/lib/cms/types";

type Props = {
  project: PublicProject;
  tags: ProjectTag[];
  projectId: string;
  apiPath: string;
  publicProjectUrl: string;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";
type UploadRole = "cover" | "gallery";

const uploadSchema = z
  .object({
    file: z.custom<File>(
      (value) => typeof File !== "undefined" && value instanceof File && value.size > 0,
      "Elige un archivo primero.",
    ),
    role: z.enum(["cover", "gallery"]),
    className: z.enum(
      MEDIA_PRESENTATION_OPTIONS.map((option) => option.value) as [
        ProjectMedia["className"],
        ...ProjectMedia["className"][],
      ],
    ),
    alt: z.string().trim(),
  })
  .superRefine((value, context) => {
    if (value.role === "cover" && !value.file.type.startsWith("image/")) {
      context.addIssue({
        code: "custom",
        path: ["file"],
        message: "La portada debe ser una imagen.",
      });
    }
  });

const uploadedMediaSchema = z.object({
  id: z.string(),
  objectKey: z.string(),
  publicUrl: z.string(),
  mediaType: z.enum(["image", "video"]),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
});

function readImageDimensions(file: File) {
  return new Promise<{ width: number | null; height: number | null }>((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve({ width: null, height: null });
      return;
    }
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: null, height: null });
    };
    image.src = objectUrl;
  });
}

function responseError(value: unknown, fallback: string) {
  if (value && typeof value === "object" && "error" in value && typeof value.error === "string") {
    return value.error;
  }
  return fallback;
}

export default function ProjectEditor({
  project,
  tags: tagOptions,
  projectId,
  apiPath,
  publicProjectUrl,
}: Props) {
  const [mediaItems, setMediaItems] = useState<ProjectMedia[]>([
    ...(project.storage.coverMedia ? [project.storage.coverMedia] : []),
    ...project.storage.images,
  ]);
  const [selectedColor, setSelectedColor] = useState(project.color);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadFields, setUploadFields] = useState({
    role: "gallery" as UploadRole,
    className: "",
    alt: project.title,
  });
  const draggedMediaId = useRef<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  function updateMedia(id: string, update: Partial<ProjectMedia>) {
    setMediaItems((items) => items.map((item) => (item.id === id ? { ...item, ...update } : item)));
    setSaveStatus("idle");
    setSaveMessage("");
  }

  function updateMediaRole(id: string, role: ProjectMedia["role"]) {
    setMediaItems((items) =>
      items.map((item) => ({
        ...item,
        role: item.id === id ? role : role === "cover" ? "gallery" : item.role,
      })),
    );
    setSaveStatus("idle");
    setSaveMessage("");
  }

  function moveMedia(id: string, direction: -1 | 1) {
    setMediaItems((items) => {
      const currentIndex = items.findIndex((item) => item.id === id);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= items.length) return items;
      const nextItems = [...items];
      const [item] = nextItems.splice(currentIndex, 1);
      nextItems.splice(nextIndex, 0, item);
      return nextItems;
    });
    setSaveStatus("idle");
    setSaveMessage("");
  }

  async function uploadMedia() {
    const file = fileInput.current?.files?.[0];
    const parsedUpload = uploadSchema.safeParse({ file, ...uploadFields });
    if (!parsedUpload.success) {
      setUploadMessage(parsedUpload.error.issues[0]?.message ?? "Revisa los datos del archivo.");
      return;
    }

    const {
      file: validFile,
      role: validRole,
      className: validClassName,
      alt: validAlt,
    } = parsedUpload.data;
    const dimensions = await readImageDimensions(validFile);
    const data = new FormData();
    data.append("file", validFile);
    data.append("projectId", projectId);
    data.append("role", validRole);
    data.append("className", validClassName);
    data.append("alt", validAlt);
    if (dimensions.width && dimensions.height) {
      data.append("width", String(dimensions.width));
      data.append("height", String(dimensions.height));
    }
    setUploadMessage("Subiendo…");

    try {
      const response = await fetch(`${apiPath}/media`, { method: "POST", body: data });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(responseError(body, "No se pudo subir el archivo."));
      const result = uploadedMediaSchema.safeParse(body);
      if (!result.success) throw new Error("Respuesta inválida del servidor.");

      const newMedia: ProjectMedia = {
        ...result.data,
        src: result.data.publicUrl,
        alt: validAlt,
        className: validClassName,
        role: validRole,
        sortOrder: mediaItems.length,
        mimeType: validFile.type || null,
        sizeBytes: validFile.size,
      };
      setMediaItems((items) => [
        ...items.map((item) =>
          validRole === "cover" ? { ...item, role: "gallery" as const } : item,
        ),
        newMedia,
      ]);
      setUploadMessage("Archivo añadido. Revisa sus datos y guarda los cambios.");
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "No se pudo subir el archivo.");
    }
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const result = adminProjectSchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      colorClass: formData.get("colorClass"),
      digest: formData.get("digest"),
      summary: formData.get("summary"),
      status: formData.get("status"),
      tags: formData.getAll("tags").flatMap((key) => {
        const tag = tagOptions.find((option) => option.key === key);
        return tag ? [tag] : [];
      }),
      media: mediaItems.map((item, sortOrder) => ({ ...item, sortOrder })),
    });
    if (!result.success) {
      setSaveStatus("error");
      setSaveMessage(result.error.issues[0]?.message ?? "Revisa los datos del proyecto.");
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("Guardando…");
    try {
      const response = await fetch(`${apiPath}/projects/${projectId}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(responseError(body, "No se pudo guardar."));
      setSaveStatus("saved");
      setSaveMessage("Cambios guardados.");
    } catch (error) {
      setSaveStatus("error");
      setSaveMessage(error instanceof Error ? error.message : "No se pudo guardar.");
    }
  }

  return (
    <form id="project-editor" class="flex flex-col gap-6" onSubmit={submit}>
      <fieldset disabled={saveStatus === "saving"} class="flex flex-col gap-4">
        <div>
          <h1 class="font-display text-4xl">Editar proyecto</h1>
          <p class="mt-1 text-sm">Los cambios se reflejan en el portafolio al guardar.</p>
        </div>
        <label class="flex flex-col gap-0.5">
          Título
          <input name="title" required defaultValue={project.title} class="input" />
        </label>
        <label class="flex flex-col gap-0.5">
          Dirección web
          <input
            name="slug"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            defaultValue={project.slug}
            class="input"
          />
          <span class="text-xs">Solo minúsculas, números y guiones.</span>
        </label>
        <label class="flex flex-col gap-0.5">
          Color del proyecto
          <div class="relative">
            <span
              class={`${selectedColor} pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 rounded-full border border-black/20`}
              aria-hidden="true"
            />
            <select
              name="colorClass"
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.currentTarget.value)}
              class={`input w-full pl-10 ${selectedColor}`}
            >
              {PROJECT_COLOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} class={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <span class="text-xs">Se usa como color de fondo en la portada del proyecto.</span>
        </label>
        <label class="flex flex-col gap-0.5">
          Descripción corta
          <textarea
            name="digest"
            rows={3}
            class="input resize-none"
            defaultValue={project.content.diggest}
          />
          <span class="text-xs">Aparece junto al título.</span>
        </label>
        <label class="flex flex-col gap-0.5">
          Descripción completa
          <textarea
            name="summary"
            rows={9}
            class="input resize-none"
            defaultValue={project.content.summary}
          />
          <span class="text-xs">Aparece en la sección de resumen.</span>
        </label>
        <label class="flex flex-col gap-0.5">
          Estado de publicación
          <select name="status" class="input" defaultValue={project.status}>
            <option value="draft">Borrador — solo visible en vista previa</option>
            <option value="published">Publicado — visible en el portafolio</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="flex flex-col gap-3 border border-black p-4">
        <legend class="font-display px-1">Categorías</legend>
        <p class="text-sm">Elige las categorías que describen este proyecto.</p>
        <div class="grid gap-2 sm:grid-cols-2">
          {tagOptions.map((tag) => (
            <label
              key={tag.key}
              class="flex items-center gap-2 rounded-sm border border-zinc-300 p-3 transition hover:border-zinc-400"
            >
              <input
                type="checkbox"
                name="tags"
                value={tag.key}
                defaultChecked={project.tags.some((selectedTag) => selectedTag.key === tag.key)}
              />
              <span>{tag.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset class="flex flex-col gap-4 border border-black p-4">
        <legend class="font-display px-1">Imágenes y videos</legend>
        <p class="text-sm">
          Arrastra una pieza para cambiar el orden. También puedes usar los botones subir y bajar.
          Los cambios se aplican al guardar.
        </p>
        <div class="flex flex-col gap-3">
          {mediaItems.map((item) => (
            <article
              key={item.id}
              draggable
              class="flex gap-3 border border-black p-3"
              onDragStart={() => {
                draggedMediaId.current = item.id;
              }}
              onDragEnd={() => {
                draggedMediaId.current = null;
              }}
              onDragOver={(event) => {
                event.preventDefault();
                const draggedId = draggedMediaId.current;
                if (!draggedId || draggedId === item.id) return;
                const target = event.currentTarget;
                const after =
                  event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
                setMediaItems((items) => {
                  const draggedIndex = items.findIndex((media) => media.id === draggedId);
                  const targetIndex = items.findIndex((media) => media.id === item.id);
                  if (draggedIndex < 0 || targetIndex < 0) return items;
                  const nextItems = [...items];
                  const [dragged] = nextItems.splice(draggedIndex, 1);
                  const insertionIndex =
                    nextItems.findIndex((media) => media.id === item.id) + (after ? 1 : 0);
                  nextItems.splice(insertionIndex, 0, dragged);
                  return nextItems;
                });
              }}
            >
              <button
                type="button"
                class="cursor-grab self-start text-xl leading-none"
                aria-label="Arrastrar para reordenar"
              >
                ⠿
              </button>
              <div class="size-24 shrink-0 overflow-hidden border border-black bg-black">
                {item.mediaType === "video" ? (
                  <video
                    src={item.publicUrl}
                    muted
                    playsinline
                    preload="metadata"
                    class="size-full object-cover"
                  />
                ) : (
                  <img src={item.publicUrl} alt="" class="size-full object-cover" loading="lazy" />
                )}
              </div>
              <div class="flex min-w-0 flex-1 flex-col gap-3">
                <div class="flex flex-wrap gap-3">
                  <label class="flex min-w-36 flex-1 flex-col gap-0.5">
                    Uso
                    <select
                      class="input"
                      value={item.role}
                      onChange={(event) =>
                        updateMediaRole(item.id, event.currentTarget.value as ProjectMedia["role"])
                      }
                    >
                      <option value="gallery">Galería</option>
                      <option value="cover" disabled={item.mediaType === "video"}>
                        Portada
                      </option>
                    </select>
                  </label>
                  <label class="flex min-w-48 flex-1 flex-col gap-0.5">
                    Presentación
                    <select
                      class="input"
                      value={item.className}
                      onChange={(event) =>
                        updateMedia(item.id, {
                          className: event.currentTarget.value as ProjectMedia["className"],
                        })
                      }
                    >
                      {MEDIA_PRESENTATION_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label class="flex flex-col gap-0.5">
                  Texto alternativo
                  <input
                    value={item.alt}
                    class="input"
                    onInput={(event) => updateMedia(item.id, { alt: event.currentTarget.value })}
                  />
                  <span class="text-xs">
                    Describe la pieza para personas que usan lector de pantalla.
                  </span>
                </label>
                <div class="flex flex-wrap items-center gap-3 text-sm">
                  <button type="button" class="underline" onClick={() => moveMedia(item.id, -1)}>
                    Subir
                  </button>
                  <button type="button" class="underline" onClick={() => moveMedia(item.id, 1)}>
                    Bajar
                  </button>
                  <button
                    type="button"
                    class="ml-auto text-red-700 underline"
                    onClick={() => {
                      setMediaItems((items) => items.filter((media) => media.id !== item.id));
                      setSaveStatus("idle");
                      setSaveMessage("");
                      setUploadMessage("Pieza retirada. Guarda los cambios para confirmar.");
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div class="border-t border-black pt-4">
          <h2 class="font-display text-xl">Añadir una pieza</h2>
          <p class="mt-1 text-sm">Sube una imagen o video nuevo. Después podrás editarlo arriba.</p>
          <div class="mt-3 grid gap-3 sm:grid-cols-2">
            <label class="flex flex-col gap-0.5">
              Archivo
              <input ref={fileInput} type="file" accept="image/*,video/*" class="input" />
            </label>
            <label class="flex flex-col gap-0.5">
              Uso
              <select
                id="media-role"
                class="input"
                value={uploadFields.role}
                onChange={(event) =>
                  setUploadFields((fields) => ({
                    ...fields,
                    role: event.currentTarget.value as UploadRole,
                  }))
                }
              >
                <option value="gallery">Galería</option>
                <option value="cover">Portada</option>
              </select>
            </label>
            <label class="flex flex-col gap-0.5">
              Presentación
              <select
                id="media-class"
                class="input"
                value={uploadFields.className}
                onChange={(event) =>
                  setUploadFields((fields) => ({ ...fields, className: event.currentTarget.value }))
                }
              >
                {MEDIA_PRESENTATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label class="flex flex-col gap-0.5">
              Texto alternativo
              <input
                id="media-alt"
                value={uploadFields.alt}
                class="input"
                onInput={(event) =>
                  setUploadFields((fields) => ({ ...fields, alt: event.currentTarget.value }))
                }
              />
            </label>
          </div>
          <button
            type="button"
            class="mt-4 rounded-full border border-black px-5 py-2"
            onClick={uploadMedia}
          >
            Añadir archivo
          </button>
          <output class="mt-2 block text-sm" aria-live="polite">
            {uploadMessage}
          </output>
        </div>
      </fieldset>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-black pt-5">
        <a href={publicProjectUrl} class="underline">
          Abrir versión pública
        </a>
        <button class="rounded-full bg-black px-6 py-3 text-white" type="submit">
          {saveStatus === "saving" ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
      <output class="text-sm" aria-live="polite">
        {saveMessage}
      </output>
    </form>
  );
}
