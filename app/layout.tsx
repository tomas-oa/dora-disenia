import "./globals.css";
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
    "Portafolio de Isidora Moreno, diseñadora con experiencia en diseño gráfico, editorial, branding e ilustración. Creativa y versátil desde Chile.",
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
        </PosthogContextProvider>
      </body>
    </html>
  );
}
