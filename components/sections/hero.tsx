import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import hero_logo_desktop from "@/public/hero/logo_desktop.svg";
import hero_logo_mobile from "@/public/hero/logo_mobile.svg";
import lets_work_mobile from "@/public/lets_work.png";
import sticker from "@/public/sticker.svg";

import { TAGS_ITERABLE } from "@/constants";

export function SectionHero() {
  return (
    <section
      id="inicio"
      className={clsx("md:grid md:grid-cols-5 md:overflow-hidden ")}
    >
      <div
        className={clsx(
          "flex flex-col gap-6 p-container",
          "md:gap-64 md:col-span-3 md:h-fit",
        )}
      >
        <Image
          alt="logo"
          src={hero_logo_mobile}
          draggable={false}
          className={clsx("w-9/12 mx-auto max-w-md", "md:hidden")}
        />

        <Image
          alt="logo"
          src={hero_logo_desktop}
          draggable={false}
          className={clsx("hidden", "md:block")}
        />

        <dl
          className={clsx(
            "mx-auto font-display font-normal text-2xl tracking-wide",
            "grid h-full max-w-2/3 grid-rows-5 -rotate-90",
            "md:max-w-full md:rotate-0 md:grid-rows-none md:grid-cols-5 md:w-full md:h-fit",
          )}
        >
          {TAGS_ITERABLE.map((tag) => (
            <div
              key={tag["key"]}
              className={clsx("contents", "md:flex md:flex-col md:gap-2")}
            >
              <dt
                className={clsx(
                  tag["className"],
                  "flex items-center justify-start py-2 pr-6 pl-4 border-black border-x border-b",
                  "sm:py-4",
                  "md:bg-dora-white md:border-none md:p-0 md:h-16 md:items-end md:pl-1",
                  "md:text-black md:font-display md:text-base md:leading-4",
                  "lg:text-xl lg:leading-5",
                )}
              >
                {tag["label"]}
              </dt>

              <dd
                className={clsx(
                  tag["className"],
                  "hidden",
                  "md:block md:h-6 md:w-full md:border-black md:border-y md:border-r",
                )}
              />
            </div>
          ))}
        </dl>

        <div
          className={clsx(
            "flex w-full flex-col items-center justify-between gap-3",
            "sm:flex-row sm:justify-center",
            "md:hidden",
          )}
        >
          <Link
            href="#proyectos"
            className={clsx(
              "w-full max-w-54 rounded-full bg-black px-7 py-2.5 text-center text-lg text-white",
            )}
          >
            Explorar proyectos
          </Link>

          <a
            download
            href={"/cv.pdf"}
            className={clsx(
              "w-full max-w-54 rounded-full bg-dora-blue px-7 py-2.5 text-center text-lg text-white",
            )}
          >
            Descarga mi CV
          </a>
        </div>
      </div>

      <div className={clsx("hidden", "md:relative md:block md:col-span-2")}>
        <div className="relative size-full">
          <Image
            placeholder="blur"
            src={lets_work_mobile}
            alt="lets work"
            draggable={false}
            className="size-full object-cover object-center"
          />

          <Image
            src={sticker}
            alt="sticker"
            draggable={false}
            className={clsx(
              "absolute",
              "size-26",
              "left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4",
              "animate-spin",
              "lg:size-32",
            )}
          />
        </div>

        <div
          className={clsx(
            "absolute inset-x-0 bottom-12 px-container",
            "flex flex-col items-center justify-center gap-4",
            "xl:flex-row xl:justify-center",
          )}
        >
          <Link
            href="#proyectos"
            className={clsx(
              "shadow-2xl drop-shadow-2xl max-w-48 w-full rounded-full bg-black px-2 py-2 text-center text-lg text-white",
              "lg:px-7 lg:py-2.5 lg:text-nowrap lg:max-w-52",
              "hover:scale-102 transition-transform duration-300",
            )}
          >
            Explorar proyectos
          </Link>

          <a
            download
            href={"/cv.pdf"}
            className={clsx(
              "shadow-2xl drop-shadow-2xl max-w-48 w-full rounded-full bg-dora-blue px-2 py-2 text-center text-lg text-white",
              "lg:px-7 lg:py-2.5 lg:text-nowrap lg:max-w-52",
              "hover:scale-102 transition-transform duration-300",
            )}
          >
            Descarga mi CV
          </a>
        </div>
      </div>
    </section>
  );
}
