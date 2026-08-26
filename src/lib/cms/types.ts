export const PROJECT_COLOR_OPTIONS = [
  { value: "bg-dora-pink", label: "Rosa" },
  { value: "bg-dora-orange", label: "Naranja" },
  { value: "bg-dora-sky", label: "Celeste" },
  { value: "bg-dora-green", label: "Verde" },
  { value: "bg-dora-violet", label: "Violeta" },
  { value: "bg-dora-yellow", label: "Amarillo" },
] as const;

export type ProjectColor = (typeof PROJECT_COLOR_OPTIONS)[number]["value"];

export const MEDIA_PRESENTATION_OPTIONS = [
  { value: "", label: "Predeterminado" },
  { value: "object-top", label: "Encuadre arriba" },
  { value: "object-center", label: "Encuadre centro" },
  { value: "object-bottom", label: "Encuadre abajo" },
  { value: "scale-120", label: "Ampliar 120%" },
  { value: "scale-140", label: "Ampliar 140%" },
] as const;

export type MediaPresentation = (typeof MEDIA_PRESENTATION_OPTIONS)[number]["value"];

export type ProjectTag = {
  key: string;
  label: string;
  className: string;
};

export type ProjectMedia = {
  id: string;
  src: string;
  alt: string;
  className: string;
  mediaType: "image" | "video";
  role: "cover" | "gallery";
  sortOrder: number;
  objectKey: string;
  publicUrl: string;
  mimeType: string | null;
  sizeBytes: number | null;
  width: number | null;
  height: number | null;
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  status: "draft" | "published";
  color: string;
  content: {
    diggest: string;
    summary: string;
  };
  tags: ProjectTag[];
  storage: {
    cover: string;
    coverMedia: ProjectMedia | null;
    images: ProjectMedia[];
  };
};
