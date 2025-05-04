import Image from "next/image";
import Link from "next/link";

import { clsx } from "clsx";

import {
  HREF_BEHANCE,
  HREF_GITHUB,
  HREF_LINKEDIN,
  HREF_MAIL,
  TAGS,
} from "@/constants";

import contact_background_desktop from "@/public/contact/background_desktop.svg";
import contact_background_mobile from "@/public/contact/background_mobile.svg";
import contact_gradient_desktop from "@/public/contact/gradient_desktop.png";
import contact_gradient_mobile from "@/public/contact/gradient_mobile.png";

import footer_dev from "@/public/footer/dev.svg";
import footer_dora_logo from "@/public/footer/dora_logo.svg";
import footer_smiley from "@/public/footer/smiley.svg";

export default function RootPage() {
  return (
    <main className={clsx("grid grid-cols-1")}>
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
              {Object.entries(TAGS).map(([key, value]) => (
                <div
                  key={key}
                  className={clsx("size-full", value["className"])}
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
