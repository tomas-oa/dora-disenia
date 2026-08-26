import { useState } from "preact/hooks";
import { clsx } from "clsx";

type FormValues = {
  name: string;
  email: string;
  content: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  content: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().split(/\s+/).length < 2) {
    errors.name = "Escribe tu nombre y apellido.";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Escribe un correo válido.";
  }

  if (values.content.trim().split(/\s+/).filter(Boolean).length < 2) {
    errors.content = "Cuéntame un poco más.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Email request failed");

      setValues(initialValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} class="flex flex-col gap-4">
      <fieldset disabled={status === "submitting"} class="grid grid-cols-1 gap-2">
        <label class="flex flex-col gap-0.5">
          <span class="sr-only">Nombre</span>
          <input
            type="text"
            class="input"
            placeholder="Nombre"
            value={values.name}
            onInput={(event) => updateField("name", event.currentTarget.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span class="text-xs text-red-500">{errors.name}</span>}
        </label>

        <label class="flex flex-col gap-0.5">
          <span class="sr-only">Correo electrónico</span>
          <input
            type="email"
            class="input"
            placeholder="Correo electrónico"
            value={values.email}
            onInput={(event) => updateField("email", event.currentTarget.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span class="text-xs text-red-500">{errors.email}</span>}
        </label>

        <label class="flex flex-col gap-0.5">
          <span class="sr-only">Mensaje</span>
          <textarea
            rows={5}
            class="input resize-none"
            placeholder="Mensaje"
            value={values.content}
            onInput={(event) => updateField("content", event.currentTarget.value)}
            aria-invalid={Boolean(errors.content)}
          />
          {errors.content && <span class="text-xs text-red-500">{errors.content}</span>}
        </label>
      </fieldset>

      <div class="flex flex-col items-center justify-start gap-x-4 gap-y-2 lg:items-end">
        <button type="submit" disabled={status === "submitting"} class={clsx("w-fit button gap-1")}>
          {status === "submitting"
            ? "Enviando..."
            : status === "success"
              ? "Mensaje enviado ✓"
              : status === "error"
                ? "No se pudo enviar"
                : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}
