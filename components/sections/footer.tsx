import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import footer_dev from "@/public/footer/dev.svg";
import footer_dora_logo from "@/public/footer/dora_logo.svg";
import footer_smiley from "@/public/footer/smiley.svg";

import { HREF_GITHUB } from "@/utils/links";

export function SectionFooter() {
  return (
    <footer
      id="footer"
      className={clsx(
        "flex flex-col justify-between gap-12 bg-black p-container",
        "md:flex-row md:items-center md:justify-between md:gap-0 md:py-8",
      )}
    >
      <div className={clsx("flex flex-col items-center gap-2", "md:flex-row")}>
        <Image
          src={footer_smiley}
          alt="smiley"
          draggable={false}
          className={clsx("size-32 object-contain object-center", "md:size-24")}
        />

        <p
          className={clsx(
            "mx-auto w-1/2 text-pretty text-center font-display text-2xl/6 text-white",
            "md:w-full md:mx-0 md:text-left",
          )}
        >
          Gracias <br className={clsx("hidden", "md:block")} /> por ver mi
          portafolio
        </p>
      </div>

      <div className={clsx("flex flex-row items-center justify-around gap-20")}>
        <Link
          href={"/"}
          className={clsx("flex flex-col items-center justify-between")}
        >
          <Image
            className={clsx("aspect-auto w-32")}
            src={footer_dora_logo}
            alt="logo"
            draggable={false}
          />
        </Link>

        <Link
          href={HREF_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx("flex flex-col items-center justify-between")}
        >
          <Image
            className={clsx("aspect-auto w-14 animate-bounce")}
            src={footer_dev}
            alt="tomas oa"
            draggable={false}
          />

          <pre className={clsx("text-pretty text-center font-mono text-white")}>
            tomas-oa
          </pre>
        </Link>
      </div>
    </footer>
  );
}
