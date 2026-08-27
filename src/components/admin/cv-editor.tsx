import { useRef, useState } from "preact/hooks";

type Props = {
  apiPath: string;
  cvUrl: string;
  sizeBytes: number | null;
};

function formatSize(sizeBytes: number | null) {
  if (sizeBytes === null) return "tamaño desconocido";
  return `${(sizeBytes / 1024).toFixed(0)} KB`;
}

export default function CvEditor({ apiPath, cvUrl, sizeBytes }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [currentUrl, setCurrentUrl] = useState(cvUrl);
  const [currentSize, setCurrentSize] = useState(sizeBytes);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function uploadCv() {
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setMessage("Elige un PDF primero.");
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setMessage("El archivo debe ser un PDF.");
      return;
    }

    setSaving(true);
    setMessage("Subiendo…");
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await fetch(`${apiPath}/cv`, { method: "POST", body: data });
      const body = (await response.json()) as {
        error?: string;
        publicUrl: string;
        sizeBytes: number;
      };
      if (!response.ok) throw new Error(body.error ?? "No se pudo actualizar el CV.");
      setCurrentUrl(body.publicUrl);
      setCurrentSize(body.sizeBytes);
      setMessage("CV actualizado.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo actualizar el CV.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section class="flex flex-col gap-3 border border-black p-4">
      <div>
        <h2 class="font-display text-2xl">CV</h2>
        <p class="mt-1 text-sm">Reemplaza el PDF que aparece en los botones de descarga.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <a href={currentUrl} target="_blank" rel="noreferrer" class="underline">
          Ver CV actual ↗
        </a>
        <span>{formatSize(currentSize)}</span>
      </div>
      <div class="flex flex-wrap items-end gap-3">
        <label class="flex min-w-64 flex-1 flex-col gap-0.5">
          Nuevo archivo
          <input ref={fileInput} type="file" accept="application/pdf,.pdf" class="input" />
        </label>
        <button
          type="button"
          disabled={saving}
          class="rounded-full border border-black px-5 py-2 disabled:opacity-50"
          onClick={uploadCv}
        >
          {saving ? "Subiendo…" : "Actualizar CV"}
        </button>
      </div>
      <output class="text-sm" aria-live="polite">
        {message}
      </output>
    </section>
  );
}
