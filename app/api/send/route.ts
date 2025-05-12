import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Dorila Morila <dora@doradisena.art>",
      to: "isidoramorenoesquivel@gmail.com",
      subject: "Nuevo mensaje de contacto",
      text: "alo amor estoy probando esto si te llegó este correo es porque están funcionando los mails desde tu web",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
