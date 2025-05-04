import "./globals.css";
import clsx from "clsx";

import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import localFont from "next/font/local";

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
	title: "Dora Diseña",
	description: "Dora Diseña",
};

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
					"debug-screens flex min-h-svh flex-col",
					"selection:bg-fuchsia-300 selection:text-fuchsia-900",
				)}
			>
				{children}
			</body>
		</html>
	);
}
