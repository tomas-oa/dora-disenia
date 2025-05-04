import Image from "next/image";
import Link from "next/link";

import { clsx } from "clsx";

import {
  HREF_BEHANCE,
  HREF_GITHUB,
  HREF_LINKEDIN,
  HREF_MAIL,
  PROJECTS,
  TAGS,
} from "@/constants";

import arrow from "@/public/arrow.svg";
import sticker from "@/public/sticker.svg";

import hero_logo_desktop from "@/public/hero/logo_desktop.svg";
import hero_logo_mobile from "@/public/hero/logo_mobile.svg";

import lets_work_mobile from "@/public/lets_work.png";

import contact_background_desktop from "@/public/contact/background_desktop.svg";
import contact_background_mobile from "@/public/contact/background_mobile.svg";
import contact_gradient_desktop from "@/public/contact/gradient_desktop.png";
import contact_gradient_mobile from "@/public/contact/gradient_mobile.png";

import footer_dev from "@/public/footer/dev.svg";
import footer_dora_logo from "@/public/footer/dora_logo.svg";
import footer_smiley from "@/public/footer/smiley.svg";

const TAGS_ITERABLE = Object.values(TAGS);

export default function RootPage() {
  return (
    <main className={clsx("flex flex-col")}>
      <section
        id="inicio"
        className={clsx("md:grid md:grid-cols-5 md:overflow-hidden")}
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
              src={lets_work_mobile}
              alt="lets work"
              draggable={false}
              className="size-full object-cover object-center"
              priority
            />

            <Image
              src={sticker}
              alt="sticker"
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
              "flex flex-col items-center justify-center gap-3",
              "xl:flex-row xl:justify-center",
            )}
          >
            <Link
              href="#proyectos"
              className={clsx(
                "max-w-48 w-full rounded-full bg-black px-2 py-2 text-center text-lg text-white",
                "lg:w-fit lg:px-7 lg:py-2.5 lg:text-nowrap lg:max-w-64",
              )}
            >
              Explorar proyectos
            </Link>

            <a
              download
              href={"/cv.pdf"}
              className={clsx(
                "max-w-48 w-full rounded-full bg-dora-blue px-2 py-2 text-center text-lg text-white",
                "lg:w-fit lg:px-7 lg:py-2.5 lg:text-nowrap lg:max-w-64",
              )}
            >
              Descarga mi CV
            </a>
          </div>
        </div>
      </section>

      <section
        id="proyectos"
        className={clsx("flex flex-col divide-y divide-black border-y")}
      >
        {PROJECTS.map((project) => (
          <Link
            href={`/proyectos/${project["slug"]}`}
            key={project["slug"]}
            className={clsx(
              "flex flex-col divide-y divide-black",
              "lg:divide-none lg:flex-row lg:justify-between",
            )}
          >
            <div
              className={clsx(
                "flex flex-row items-center justify-between px-container py-7",
                "lg:w-full",
              )}
            >
              <div className={clsx("flex flex-row items-center gap-5")}>
                <div
                  className={clsx(
                    project["color"],
                    "aspect-square size-5 border",
                  )}
                />

                <h2
                  className={clsx(
                    "w-3/4 text-balance font-display font-medium text-3xl text-black leading-6",
                    "sm:w-full",
                    "lg:text-4xl/8",
                  )}
                >
                  {project["title"]}
                </h2>
              </div>

              <div
                className={clsx("flex flex-col items-end gap-1", "lg:hidden")}
              >
                {project?.["tags"].map((tag) => (
                  <p
                    key={tag["key"]}
                    className={clsx("flex font-light text-black leading-4")}
                  >
                    {tag["label"]}
                  </p>
                ))}
              </div>
            </div>

            <div
              className={clsx(
                "hidden",
                "lg:px-container lg:py-7 lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-16 lg:w-full",
              )}
            >
              <p
                className={clsx("flex font-light text-black text-xl leading-4")}
              >
                {project["tags"].map((tag) => tag["label"]).join(", ")}
              </p>

              <Image
                src={arrow}
                alt="arrow"
                className={clsx("size-10 aspect-square rotate-180")}
              />
            </div>

            <Image
              className={clsx("lg:hidden")}
              src={project["storage"]["cover"]}
              alt={project["title"]}
            />
          </Link>
        ))}
      </section>

      <section
        id="trabajemos"
        className={clsx("relative flex h-150 flex-col", "lg:hidden")}
      >
        <Image
          width={1280}
          height={720}
          src={lets_work_mobile}
          alt="lets work"
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

      <section
        id="contacto"
        className={clsx(
          "relative flex flex-col items-center justify-center p-container",
        )}
      >
        <Image
          src={contact_background_mobile}
          alt="contact"
          draggable={false}
          className={clsx(
            "absolute size-full object-cover object-center",
            "lg:hidden",
          )}
        />

        <Image
          src={contact_background_desktop}
          alt="contact"
          draggable={false}
          className={clsx(
            "hidden",
            "lg:block lg:absolute lg:size-full lg:object-cover lg:object-center",
          )}
        />

        <div
          className={clsx(
            "z-10 flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-black",
            "lg:max-w-5xl",
          )}
        >
          <header
            className={clsx(
              "rounded-t-xl border-black border-b bg-dora-blue px-4",
              "sm:px-6 sm:py-1",
            )}
          >
            <h3
              className={clsx(
                "font-display font-medium text-2xl text-white",
                "sm:text-4xl",
                "lg:text-5xl",
              )}
            >
              Contáctame
            </h3>
          </header>

          <form
            className={clsx(
              "flex flex-col gap-y-4 bg-dora-white px-6 py-4",
              "sm:gap-y-3 sm:px-8 sm:py-6",
              "lg:flex-row lg:gap-x-2",
            )}
          >
            <div className={clsx("relative", "lg:aspect-video")}>
              <Image
                className={clsx("size-full border border-black", "lg:hidden")}
                src={contact_gradient_mobile}
                alt="gradient"
                draggable={false}
              />

              <Image
                src={contact_gradient_desktop}
                alt="gradient"
                draggable={false}
                className={clsx(
                  "hidden",
                  "lg:max-w-lg lg:border lg:border-black lg:block lg:size-full",
                )}
              />

              <Link
                href={HREF_MAIL}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "flex w-fit flex-row items-center gap-2 underline",
                  "absolute top-4 left-8",
                )}
              >
                <div
                  className={clsx("size-3 rounded-full border border-black")}
                />

                <h3 className={clsx("font-light text-lg/2")}>Correo</h3>
              </Link>

              <Link
                href={HREF_BEHANCE}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "flex w-fit flex-col items-center gap-2 underline",
                  "absolute top-12 left-2/3",
                )}
              >
                <div
                  className={clsx("size-3 rounded-full border border-black")}
                />

                <h3 className={clsx("font-light text-lg/2")}>Behance</h3>
              </Link>

              <Link
                href={HREF_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "flex w-fit flex-col items-center gap-2 underline",
                  "absolute bottom-6 left-1/3",
                )}
              >
                <div
                  className={clsx("size-3 rounded-full border border-black")}
                />

                <h3 className={clsx("font-light text-lg/2")}>LinkedIn</h3>
              </Link>
            </div>

            <div
              className={clsx(
                "hidden",
                "lg:w-16 lg:grid lg:grid-rows-5 lg:border-x lg:divide-y lg:divide-black lg:border-b",
              )}
            >
              {TAGS_ITERABLE.map((tag) => (
                <div
                  key={tag["key"]}
                  className={clsx("size-full", tag["className"])}
                />
              ))}
            </div>

            <div className={clsx("flex flex-col w-full gap-2", "lg:ml-6")}>
              <input
                type="text"
                placeholder="Nombre"
                className={clsx(
                  "rounded-sm border border-zinc-400 bg-zinc-300 px-3 py-2 text-zinc-600",
                )}
              />

              <input
                type="email"
                placeholder="Correo"
                className={clsx(
                  "rounded-sm border border-zinc-400 bg-zinc-300 px-3 py-2 text-zinc-600",
                )}
              />

              <textarea
                rows={5}
                placeholder="Mensaje"
                className={clsx(
                  "resize-none rounded-sm border border-zinc-400 bg-zinc-300 px-3 py-2 text-zinc-600",
                )}
              />

              <button
                type="submit"
                className={clsx(
                  "w-fit self-center rounded-full bg-dora-blue px-7 py-1 text-center text-lg text-white",
                  "sm:text-xl",
                  "lg:self-end	",
                )}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer
        id="footer"
        className={clsx(
          "flex flex-col justify-between gap-12 bg-black p-container",
          "md:flex-row md:items-center md:justify-between md:gap-0 md:py-8",
        )}
      >
        <div
          className={clsx("flex flex-col items-center gap-2", "md:flex-row")}
        >
          <Image
            src={footer_smiley}
            className={clsx(
              "size-32 object-contain object-center",
              "md:size-24",
            )}
            alt="smiley"
            draggable={false}
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

        <div
          className={clsx("flex flex-row items-center justify-around gap-20")}
        >
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

            <pre
              className={clsx("text-pretty text-center font-mono text-white")}
            >
              tomas-oa
            </pre>
          </Link>
        </div>
      </footer>
    </main>
  );
}
