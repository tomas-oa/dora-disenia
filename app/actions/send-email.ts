"use server";

import type { FormContactSchema } from "@/components/forms/contact-fieldset";
import { NODE_ENV } from "@/constants";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const productionEmailTo = process.env.PRODUCTION_EMAIL_TO as string;
const developmentEmailTo = process.env.DEVELOPMENT_EMAIL_TO as string;

export async function sendEmail(data: FormContactSchema) {
  try {
    const { name, email, content } = data;

    const to =
      NODE_ENV === "development" ? developmentEmailTo : productionEmailTo;

    await resend.emails.send({
      from: "Dorila Morila <contacto@doradisena.art>",
      to,
      subject: `New contact form submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${content}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
