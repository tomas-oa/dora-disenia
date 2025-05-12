import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dora Diseña",
    short_name: "Dora Diseña",
    description: `Me especializo en desarrollar soluciones visuales que refuercen la identidad y la comunicación de cada
proyecto. Entiendo el diseño como una disciplina en constante evolución, por lo que busco mejorar y aprender
continuamente. Soy adaptable, comunicativa y me integro con facilidad en entornos creativos e interdisciplinarios,
colaborando de manera efectiva con equipos y clientes. Mi objetivo es seguir creciendo profesionalmente, ampliar
mis competencias técnicas y aportar valor a cada proyecto en el que participe.`,
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf7",
    theme_color: "#fffcf7",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
