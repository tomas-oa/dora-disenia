"use server";

import type { FormContactSchema } from "@/components/forms/contact-fieldset";
import { NODE_ENV } from "@/constants";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const productionEmailTo = process.env.PRODUCTION_EMAIL_TO as string;
const developmentEmailTo = process.env.DEVELOPMENT_EMAIL_TO as string;

const to = NODE_ENV === "development" ? developmentEmailTo : productionEmailTo;

export async function sendEmail(data: FormContactSchema) {
  try {
    const { name, email, content } = data;

    await resend.emails.send({
      from: "Dorila Morila <contacto@doradisena.art>",
      to,
      subject: `${name} contactó a través de la web`,
      text: `
Nombre: ${name}
Correo electrónico: ${email}
Mensaje: ${content}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
