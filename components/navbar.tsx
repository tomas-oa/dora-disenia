import { ICON_ARROW_DOWN } from "@/constants";
import dora_logo from "@/public/navbar/logo_dora.svg";

import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export function Navbar({
  showLogo = true,
  className,
  ...props
}: { showLogo?: boolean } & React.ComponentProps<"nav">) {
  return (
    <nav
      className={clsx(
        "hidden",
        "md:fixed md:top-0 md:inset-x-0 md:z-50",
        "md:bg-black md:flex md:flex-row md:justify-between md:w-full",
        "md:py-4 md:px-navbar",
        className,
      )}
      {...props}
    >
      <Link className={clsx(!showLogo && "invisible")} href="/">
        <Image
          draggable={false}
          src={dora_logo}
          alt="dora logo"
          className={clsx("invert w-22")}
        />
      </Link>

      <article
        className={clsx("flex flex-row gap-12 md:gap-28 text-dora-white")}
      >
        <Link href="/#proyectos">Proyectos</Link>

        <Link href="/#contacto">Contacto</Link>

        <a download href={"/cv.pdf"}>
          CV <span className={clsx("inline-block")}>{ICON_ARROW_DOWN}</span>
        </a>
      </article>
    </nav>
  );
}
