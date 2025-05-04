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
        "fixed top-0 left-0 right-0 z-50",
        "bg-black flex flex-row justify-between w-full",
        "py-4 px-navbar",
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
