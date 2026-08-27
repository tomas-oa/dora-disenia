import { useState } from "preact/hooks";
import { clsx } from "clsx";
import { z } from "astro/zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre y apellido."),
  email: z.email("Escribe un correo válido."),
  content: z.string().trim().min(10, "Cuéntame un poco más."),
});

type FormValues = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleInput() {
    setErrors({});
    setStatus("idle");
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const result = contactFormSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(([field, messages]) => [
            field,
            messages?.[0],
          ]),
        ) as FormErrors,
      );
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Email request failed");

      form.reset();
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
            name="name"
            class="input"
            placeholder="Nombre"
            onInput={handleInput}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span class="text-xs text-red-500">{errors.name}</span>}
        </label>

        <label class="flex flex-col gap-0.5">
          <span class="sr-only">Correo electrónico</span>
          <input
            type="email"
            name="email"
            class="input"
            placeholder="Correo electrónico"
            onInput={handleInput}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span class="text-xs text-red-500">{errors.email}</span>}
        </label>

        <label class="flex flex-col gap-0.5">
          <span class="sr-only">Mensaje</span>
          <textarea
            rows={5}
            name="content"
            class="input resize-none"
            placeholder="Mensaje"
            onInput={handleInput}
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
