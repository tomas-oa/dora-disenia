import { useRef, useState } from "preact/hooks";

import type { PublicProject } from "@/src/lib/cms/types";

type Project = Pick<PublicProject, "id" | "title" | "slug" | "published">;

type Props = {
  projects: Project[];
  adminPath: string;
  apiPath: string;
};

export default function ProjectList({ projects: initialProjects, adminPath, apiPath }: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [status, setStatus] = useState("");
  const projectsRef = useRef(initialProjects);
  const draggedProjectId = useRef<string | null>(null);

  function updateProjects(nextProjects: Project[]) {
    projectsRef.current = nextProjects;
    setProjects(nextProjects);
  }

  async function saveOrder(nextProjects = projectsRef.current) {
    setStatus("Guardando orden…");
    try {
      const response = await fetch(`${apiPath}/projects/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectIds: nextProjects.map(({ id }) => id) }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "No se pudo guardar el orden.");
      setStatus("Orden guardado.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo guardar el orden.");
    }
  }

  function moveProject(id: string, direction: -1 | 1) {
    const index = projectsRef.current.findIndex((project) => project.id === id);
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= projectsRef.current.length) return;

    const nextProjects = [...projectsRef.current];
    [nextProjects[index], nextProjects[nextIndex]] = [nextProjects[nextIndex], nextProjects[index]];
    updateProjects(nextProjects);
    void saveOrder(nextProjects);
  }

  function reorderProject(targetId: string, after: boolean) {
    const sourceId = draggedProjectId.current;
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = projectsRef.current.findIndex((project) => project.id === sourceId);
    const nextProjects = [...projectsRef.current];
    const [source] = nextProjects.splice(sourceIndex, 1);
    const targetIndex = nextProjects.findIndex((project) => project.id === targetId);
    nextProjects.splice(targetIndex + (after ? 1 : 0), 0, source);
    updateProjects(nextProjects);
  }

  return (
    <>
      <section id="project-list" class="flex flex-col divide-y divide-black border-y">
        {projects.map((project) => (
          <article
            key={project.id}
            draggable
            class="flex items-center gap-3 py-5"
            onDragStart={() => {
              draggedProjectId.current = project.id;
            }}
            onDragEnd={() => {
              draggedProjectId.current = null;
              void saveOrder();
            }}
            onDragOver={(event) => {
              event.preventDefault();
              const after =
                event.clientY >
                event.currentTarget.getBoundingClientRect().top +
                  event.currentTarget.offsetHeight / 2;
              reorderProject(project.id, after);
            }}
          >
            <button
              type="button"
              class="cursor-grab text-xl leading-none"
              aria-label="Arrastrar para reordenar"
            >
              ⠿
            </button>
            <a
              href={`${adminPath}/projects/${project.id}`}
              class="flex min-w-0 flex-1 items-center justify-between gap-4"
            >
              <span>
                <strong class="font-display text-2xl">{project.title}</strong>
                <span class="ml-3 text-sm">/{project.slug}</span>
              </span>
              <span class={project.published ? "text-green-700" : "text-zinc-500"}>
                {project.published ? "Publicado" : "Borrador"}
              </span>
            </a>
            <div class="flex gap-2 text-sm">
              <button type="button" class="underline" onClick={() => moveProject(project.id, -1)}>
                Subir
              </button>
              <button type="button" class="underline" onClick={() => moveProject(project.id, 1)}>
                Bajar
              </button>
            </div>
          </article>
        ))}
      </section>
      <output class="text-sm" aria-live="polite">
        {status}
      </output>
    </>
  );
}
