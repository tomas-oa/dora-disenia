import una_ventana_para_el_arte_1 from "@/public/una-ventana-para-el-arte/1.png";
import una_ventana_para_el_arte_2 from "@/public/una-ventana-para-el-arte/2.png";
import una_ventana_para_el_arte_3 from "@/public/una-ventana-para-el-arte/3.png";
import una_ventana_para_el_arte_4 from "@/public/una-ventana-para-el-arte/4.png";
import una_ventana_para_el_arte_5 from "@/public/una-ventana-para-el-arte/5.png";
import una_ventana_para_el_arte_6 from "@/public/una-ventana-para-el-arte/6.png";
import una_ventana_para_el_arte_7 from "@/public/una-ventana-para-el-arte/7.png";
import una_ventana_para_el_arte_8 from "@/public/una-ventana-para-el-arte/8.png";
import una_ventana_para_el_arte_cover from "@/public/una-ventana-para-el-arte/cover.png";

import kombucha_loyca_1 from "@/public/kombucha-loyca/1.png";
import kombucha_loyca_2 from "@/public/kombucha-loyca/2.png";
import kombucha_loyca_3 from "@/public/kombucha-loyca/3.png";
import kombucha_loyca_4 from "@/public/kombucha-loyca/4.png";
import kombucha_loyca_cover from "@/public/kombucha-loyca/cover.png";

import frankenstein_1 from "@/public/frankenstein/1.png";
const frankenstein_2 = "/frankenstein/2.mp4";
import frankenstein_3 from "@/public/frankenstein/3.png";
import frankenstein_4 from "@/public/frankenstein/4.gif";
import frankenstein_5 from "@/public/frankenstein/5.png";
import frankenstein_cover from "@/public/frankenstein/cover.png";

import chao_reunionitis_1 from "@/public/chao-reunionitis/1.png";
import chao_reunionitis_2 from "@/public/chao-reunionitis/2.png";
import chao_reunionitis_3 from "@/public/chao-reunionitis/3.png";
import chao_reunionitis_4 from "@/public/chao-reunionitis/4.png";
import chao_reunionitis_5 from "@/public/chao-reunionitis/5.png";
import chao_reunionitis_6 from "@/public/chao-reunionitis/6.png";
import chao_reunionitis_7 from "@/public/chao-reunionitis/7.png";
import chao_reunionitis_8 from "@/public/chao-reunionitis/8.png";
import chao_reunionitis_cover from "@/public/chao-reunionitis/cover.png";

import hicigrafia_1 from "@/public/hicigrafia/1.png";
import hicigrafia_2 from "@/public/hicigrafia/2.png";
import hicigrafia_3 from "@/public/hicigrafia/3.png";
import hicigrafia_4 from "@/public/hicigrafia/4.png";
import hicigrafia_5 from "@/public/hicigrafia/5.png";
import hicigrafia_6 from "@/public/hicigrafia/6.png";
import hicigrafia_7 from "@/public/hicigrafia/7.png";
import hicigrafia_cover from "@/public/hicigrafia/cover.png";

export const NODE_ENV = /*#__PURE__*/ process.env.NODE_ENV || "development";

export const ICON_ARROW_DOWN = /*#__PURE__*/ "↓";

export function NOW() {
  return new Date();
}

const TAGS = /*#__PURE__*/ {
  design: {
    key: "design",
    label: "Diseño integral",
    className: "bg-black text-white",
  },
  graphic: {
    key: "graphic",
    label: "Gráfico",
    className: "bg-dora-sky text-black",
  },
  editorial: {
    key: "editorial",
    label: "Editorial",
    className: "bg-dora-pink text-black",
  },
  branding: {
    key: "branding",
    label: "Branding",
    className: "bg-dora-red text-black",
  },
  illustration: {
    key: "illustration",
    label: "Ilustración",
    className: "bg-dora-yellow text-black",
  },
} as const;

export const TAGS_ITERABLE = /*#__PURE__*/ Object.values(TAGS);

export const PROJECTS = /*#__PURE__*/ [
  {
    title: "Una ventana para el arte",
    published: true,
    slug: "una-ventana-para-el-arte",
    color: "bg-dora-pink",
    content: {
      diggest:
        "Sistema editorial para el Museo de Artes Visuales MAVI UC, que promueve una experiencia museográfica reflexiva e interactiva.",
      summary: `Impulsado por el Departamento de Educación e Inclusión del MAVI UC, este proyecto buscó transformar la experiencia de los visitantes mediante folletos que promovieran una interacción reflexiva con las obras.

Ante el desafío de producir un material atractivo, adaptable y eficiente, se implementó un sistema gráfico que preservaba la identidad visual del museo, pero con suficiente flexibilidad para adaptarse a la estética particular de cada exposición. Esta solución optimizó los procesos de diseño y distribución, consolidándose como un formato replicable que se materializó con tres exposiciones que utilizaron este modelo; sentando las bases para futuras ediciones.`,
    },
    tags: [
      {
        key: TAGS["editorial"]["key"],
        label: TAGS["editorial"]["label"],
        className: TAGS["editorial"]["className"],
      },
    ],
    storage: {
      cover: una_ventana_para_el_arte_cover,
      images: [
        {
          src: una_ventana_para_el_arte_1,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_2,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_3,
          alt: "Una ventana para el arte",
          className: "scale-120",
        },
        {
          src: una_ventana_para_el_arte_4,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_5,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_6,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_7,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_8,
          alt: "Una ventana para el arte",
          className: "",
        },
      ],
    },
  },
  {
    title: "Kombucha Loyca",
    published: true,
    slug: "kombucha-loyca",
    color: "bg-dora-orange",
    content: {
      diggest:
        "Rebranding para reposicionar una bebida artesanal en el mercado gastronómico contemporáneo.",
      summary: `Loyca impulsó un rebranding con el objetivo de aumentar su alcance en el mercado, reposicionando su kombucha más allá del nicho orgánico convencional, para consolidarse como una alternativa versátil y gourmet en el mercado gastronómico; orientándose a restaurantes, coctelería de autor y cafés de especialidad. 

El nuevo enfoque de identidad mantiene la esencia artesanal de Loyca, combinándola con un carácter contemporáneo, fresco y experimental. Este replanteamiento fortaleció la identidad de la marca, facilitando también su integración en nuevos contextos de consumo, aumentando su percepción de calidad, autenticidad y adaptabilidad.`,
    },
    tags: [
      {
        key: TAGS["branding"]["key"],
        label: TAGS["branding"]["label"],
        className: TAGS["branding"]["className"],
      },
    ],
    storage: {
      cover: kombucha_loyca_cover,
      images: [
        {
          src: kombucha_loyca_1,
          alt: "Kombucha Loyca",
          className: "",
        },
        {
          src: kombucha_loyca_2,
          alt: "Kombucha Loyca",
          className: "",
        },
        {
          src: kombucha_loyca_3,
          alt: "Kombucha Loyca",
          className: "",
        },
        {
          src: kombucha_loyca_4,
          alt: "Kombucha Loyca",
          className: "",
        },
      ],
    },
  },
  {
    title: "Frankenstein",
    published: true,
    slug: "frankenstein",
    color: "bg-dora-sky",
    content: {
      diggest:
        "Afiche cultural desarrollado como proyecto universitario para conmemorar los 200 años de Frankenstein.",
      summary: `Proyecto universitario de difusión cultural, desarrollado para conmemorar los más de 200 años de la publicación de Frankenstein (1818) y acercar su legado a nuevas generaciones.  El afiche se centra en reinterpretar una de las principales tensiones de la obra: la contraposición entre la bondad del monstruo y la maldad del ser humano.
Bajo este concepto, la propuesta invita a una lectura contemporánea de la obra, abordando los dilemas éticos y existenciales que plantea. La propuesta utiliza recursos visuales metafóricos para enriquecer la interpretación y promover una conexión crítica y emocional con el espectador contemporáneo.`,
    },
    tags: [
      {
        key: TAGS["graphic"]["key"],
        label: TAGS["graphic"]["label"],
        className: TAGS["graphic"]["className"],
      },
    ],
    storage: {
      cover: frankenstein_cover,
      images: [
        {
          src: frankenstein_1,
          alt: "Frankenstein",
          className: "",
        },
        {
          src: frankenstein_2,
          alt: "Frankenstein",
          className: "",
        },
        {
          src: frankenstein_3,
          alt: "Frankenstein",
          className: "",
        },
        {
          src: frankenstein_4,
          alt: "Frankenstein",
          className: "",
        },
        {
          src: frankenstein_5,
          alt: "Frankenstein",
          className: "",
        },
      ],
    },
  },
  {
    title: "Chao Reunionitis",
    published: true,
    slug: "chao-reunionitis",
    color: "bg-dora-green",
    content: {
      diggest:
        "Campaña gráfica interna para Teck, orientada a promover una gestión eficiente de las reuniones de trabajo.",
      summary: `Frente a la problemática del exceso de reuniones y su impacto en la productividad y el bienestar de los equipos, un equipo de liderazgo interno de Teck impulsó una campaña de sensibilización orientada a promover una gestión más eficiente del tiempo durante las reuniones de trabajo.

La campaña tomó como eje conceptual la "reunionitis", un término humorístico que permitió abordar el tema de forma cercana y amena, facilitando la identificación y reflexión de los colaboradores. A partir de este concepto se desarrollaron piezas gráficas ilustradas que, mediante el humor, transmitieron buenas prácticas para planificar y asistir a reuniones de manera más efectiva. La estrategia se complementó con acciones de difusión interna que reforzaron el mensaje en distintos espacios de trabajo, favoreciendo la adopción de comportamientos más eficientes.      `,
    },
    tags: [
      {
        key: TAGS["graphic"]["key"],
        label: TAGS["graphic"]["label"],
        className: TAGS["graphic"]["className"],
      },
      {
        key: TAGS["illustration"]["key"],
        label: TAGS["illustration"]["label"],
        className: TAGS["illustration"]["className"],
      },
    ],
    storage: {
      cover: chao_reunionitis_cover,
      images: [
        {
          src: chao_reunionitis_1,
          alt: "Chao Reunionitis",
          className: "object-bottom",
        },
        {
          src: chao_reunionitis_2,
          alt: "Chao Reunionitis",
          className: "object-top",
        },
        {
          src: chao_reunionitis_3,
          alt: "Chao Reunionitis",
          className: "object-bottom",
        },
        {
          src: chao_reunionitis_4,
          alt: "Chao Reunionitis",
          className: "object-top",
        },
        {
          src: chao_reunionitis_5,
          alt: "Chao Reunionitis",
          className: "object-center",
        },
        {
          src: chao_reunionitis_6,
          alt: "Chao Reunionitis",
          className: "object-center",
        },
        {
          src: chao_reunionitis_7,
          alt: "Chao Reunionitis",
          className: "object-center",
        },
        {
          src: chao_reunionitis_8,
          alt: "Chao Reunionitis",
          className: "object-center",
        },
      ],
    },
  },
  {
    title: "A solas, el jardín",
    published: false,
    slug: "a-solas-el-jardin",
    color: "bg-dora-violet",
    content: {
      diggest:
        "Publicación editorial ilustrada que aborda la soledad emocional en jóvenes a través de una metáfora visual y relatos personales.",
      summary: `Proyecto de título enfocado en la problemática de la soledad emocional en personas jóvenes, desarrollado a través de una publicación editorial ilustrada. El proyecto utiliza representaciones metafóricas de experiencias cotidianas para abrir espacios de interpretación e identificación personal, acompañadas de relatos anónimos que invitan a la reflexión y al ejercicio introspectivo.

La propuesta busca generar una experiencia de lectura sensible y auténtica, combinando una atmósfera visual introspectiva con el carácter crudo de las vivencias narradas. El desarrollo del proyecto implicó un extenso proceso de investigación, entrevistas personales, iteración de contenidos y validaciones cualitativas, con el objetivo de construir un dispositivo editorial capaz de dialogar de manera genuina con las emociones del lector.`,
    },
    tags: [
      {
        key: TAGS["editorial"]["key"],
        label: TAGS["editorial"]["label"],
        className: TAGS["editorial"]["className"],
      },
      {
        key: TAGS["illustration"]["key"],
        label: TAGS["illustration"]["label"],
        className: TAGS["illustration"]["className"],
      },
    ],
    storage: {
      cover: una_ventana_para_el_arte_cover,
      images: [
        {
          src: una_ventana_para_el_arte_1,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_2,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_3,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_4,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_5,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_6,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_7,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_8,
          alt: "Una ventana para el arte",
          className: "",
        },
      ],
    },
  },
  {
    title: "¿?",
    published: false,
    slug: "¿?",
    color: "bg-dora-pink",
    content: {
      diggest: "",
      summary: "",
    },
    tags: [
      {
        key: TAGS["editorial"]["key"],
        label: TAGS["editorial"]["label"],
        className: TAGS["editorial"]["className"],
      },
    ],
    storage: {
      cover: una_ventana_para_el_arte_cover,
      images: [
        {
          src: una_ventana_para_el_arte_1,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_2,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_3,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_4,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_5,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_6,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_7,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: una_ventana_para_el_arte_8,
          alt: "Una ventana para el arte",
          className: "",
        },
      ],
    },
  },
  {
    title: "Hicigrafía",
    published: true,
    slug: "hicigrafia",
    color: "bg-dora-yellow",
    content: {
      diggest:
        "Proyecto de ilustración centrado en la creación de un estilo gráfico propio.",
      summary:
        "Hicigrafía es un proyecto de ilustración nombrado a partir del seudónimo hicidora y nace de la búsqueda por desarrollar un estilo gráfico personal. Inspirado en ocurrencias propias y en la forma de ver lo cotidiano, propone un estilo cercano y expresivo que invita a imaginar un mundo más amable y alegre. El proyecto busca crear piezas gráficas que transmitan ternura y dejen espacio para que cada persona conecte con sus emociones y les dé su propia interpretación.",
    },
    tags: [
      {
        key: TAGS["illustration"]["key"],
        label: TAGS["illustration"]["label"],
        className: TAGS["illustration"]["className"],
      },
    ],
    storage: {
      cover: hicigrafia_cover,
      images: [
        {
          src: hicigrafia_1,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: hicigrafia_2,
          alt: "Una ventana para el arte",
          className: "",
        },
        {
          src: hicigrafia_3,
          alt: "Una ventana para el arte",
          className: "scale-140",
        },
        {
          src: hicigrafia_4,
          alt: "Una ventana para el arte",
          className: "scale-140",
        },
        {
          src: hicigrafia_5,
          alt: "Una ventana para el arte",
          className: "scale-140",
        },
        {
          src: hicigrafia_6,
          alt: "Una ventana para el arte",
          className: "scale-140",
        },
        {
          src: hicigrafia_7,
          alt: "Una ventana para el arte",
          className: "",
        },
      ],
    },
  },
] as const;

export const PUBLISHED_PROJECTS = /*#__PURE__*/ PROJECTS.filter(
  (project) => project["published"],
);

export const BASE_URL = /*#__PURE__*/ "https://www.doradisena.art";
