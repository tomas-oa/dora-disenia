import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { Resend } from "resend";

export const prerender = false;

type ContactPayload = {
  name: string;
  email: string;
  content: string;
};

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;

  const payload = value as Record<string, unknown>;
  return (
    typeof payload.name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.content === "string" &&
    payload.name.trim().length > 1 &&
    payload.email.includes("@") &&
    payload.content.trim().length > 1
  );
}

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json().catch(() => null);

  if (!isContactPayload(payload)) {
    return Response.json({ error: "Invalid contact payload" }, { status: 400 });
  }

  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from: "Dora Diseña <contacto@doradisena.art>",
    to: env.PRODUCTION_EMAIL_TO,
    subject: `${payload.name} contactó a través de la web`,
    text: `Nombre: ${payload.name}\nCorreo electrónico: ${payload.email}\nMensaje: ${payload.content}`,
  });

  if (error) {
    return Response.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return Response.json({ success: true });
};
