import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import lets_work_mobile from "@/public/lets_work.png";
import sticker from "@/public/sticker.svg";

export function SectionLetsWork() {
  return (
    <section
      id="trabajemos"
      className={clsx("relative flex h-150 flex-col", "lg:hidden")}
    >
      <Image
        width={1280}
        height={720}
        src={lets_work_mobile}
        alt="lets work"
        placeholder="blur"
        draggable={false}
        className={clsx(
          "absolute inset-0 size-full object-cover object-center",
        )}
      />

      <Image
        src={sticker}
        alt="sticker"
        width={96}
        height={96}
        draggable={false}
        className={clsx(
          "-translate-x-1/2 absolute left-1/2 size-24 translate-y-54 animate-spin",
        )}
      />

      <div
        className={clsx(
          "absolute inset-x-0 bottom-12 px-container",
          "flex flex-row items-center justify-center gap-3",
        )}
      >
        <Link
          href="#contacto"
          className={clsx(
            "z-10 w-fit max-w-56 text-nowrap rounded-full bg-zinc-500 px-7 py-2.5 text-center text-base text-white",
          )}
        >
          Contáctame {":)"}
        </Link>

        <a
          download
          href={"/cv.pdf"}
          className={clsx(
            "z-10 w-fit max-w-56 text-nowrap rounded-full bg-dora-blue px-7 py-2.5 text-center text-base text-white",
          )}
        >
          Descarga mi CV
        </a>
      </div>
    </section>
  );
}
