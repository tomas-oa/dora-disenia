import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import clsx from "clsx";
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import localFont from "next/font/local";

import { BASE_URL, NODE_ENV } from "@/constants";
import { PosthogContextProvider } from "@/hooks/use-posthog";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const coolvetica = localFont({
  variable: "--font-coolvetica",
  src: [
    {
      path: "./fonts/CoolveticaBk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CoolveticaRg-Regular.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DORA DISEÑA",
    template: "%s • DORA DISEÑA",
  },
  description:
    "Diseñadora con experiencia en diseño gráfico, editorial, branding e ilustración, egresada de la UC. Especialista en soluciones visuales efectivas.",
  openGraph: {
    title: "DORA DISEÑA",
    description:
      "Diseñadora con experiencia en diseño gráfico, editorial, branding e ilustración, egresada de la UC. Especialista en soluciones visuales efectivas.",
    url: BASE_URL,
    siteName: "DORA DISEÑA",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "DORA DISEÑA",
      },
    ],
    locale: "es",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DORA DISEÑA",
    description:
      "Diseñadora con experiencia en diseño gráfico, editorial, branding e ilustración, egresada de la UC. Especialista en soluciones visuales efectivas.",
    images: [`${BASE_URL}/opengraph-image.png`],
  },
};

const POSTHOG_DISABLED = NODE_ENV === "development";
const DEBUG_SCREEN_ENABLED = NODE_ENV === "development";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      dir="ltr"
      className={clsx(
        hostGrotesk.variable,
        coolvetica.variable,
        "scroll-smooth bg-dora-white font-sans antialiased motion-reduce:scroll-auto",
      )}
    >
      <body
        className={clsx(
          DEBUG_SCREEN_ENABLED && "debug-screens",
          "flex min-h-svh flex-col",
          "selection:bg-fuchsia-300 selection:text-fuchsia-900",
          "[&_main]:md:mt-8 [&_section]:scroll-mt-[57px]",
        )}
      >
        <PosthogContextProvider disabled={POSTHOG_DISABLED}>
          {children}
          <Analytics />
        </PosthogContextProvider>
      </body>
    </html>
  );
}
