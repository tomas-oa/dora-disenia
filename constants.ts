export const HREF_MAIL = "mailto:isidoramorenoesquivel@gmail.com";
export const HREF_LINKEDIN = "https://www.linkedin.com/in/isidoramoreno/";
export const HREF_BEHANCE = "https://www.behance.net/doradisenadora";
export const HREF_CV = "/cv.pdf";
export const HREF_GITHUB = "https://github.com/tomas-oa";

export function NOW() {
	return new Date();
}

export const TAGS = {
	design: {
		label: "Diseño integral",
		className: "bg-black text-white",
	},
	graphic: {
		label: "Gráfico",
		className: "bg-dora-sky text-black",
	},
	editorial: {
		label: "Editorial",
		className: "bg-dora-pink text-black",
	},
	branding: {
		label: "Branding",
		className: "bg-dora-red text-black",
	},
	illustration: {
		label: "Ilustración",
		className: "bg-dora-yellow text-black",
	},
} as const;
