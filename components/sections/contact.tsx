import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import contact_background_desktop from "@/public/contact/background_desktop.svg";
import contact_background_mobile from "@/public/contact/background_mobile.svg";
import contact_gradient_desktop from "@/public/contact/gradient_desktop.png";
import contact_gradient_mobile from "@/public/contact/gradient_mobile.png";

import { ContactForm } from "@/components/forms/contact-form";
import { TAGS_ITERABLE } from "@/constants";
import {
  EXTERNAL_LINK_ATTRS,
  HREF_BEHANCE,
  HREF_LINKEDIN,
  HREF_MAIL,
} from "@/utils/links";

export function SectionContact() {
  return (
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
          "md:max-w-lg",
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
            )}
          >
            Contáctame
          </h3>
        </header>

        <div
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
              placeholder="blur"
              draggable={false}
            />

            <Image
              src={contact_gradient_desktop}
              alt="gradient"
              placeholder="blur"
              draggable={false}
              className={clsx(
                "hidden",
                "lg:max-w-md lg:h-full lg:border lg:border-black lg:block",
                "xl:max-w-lg",
              )}
            />

            <Link
              href={HREF_MAIL}
              {...EXTERNAL_LINK_ATTRS}
              className={clsx(
                "flex w-fit flex-row items-center gap-2",
                "absolute top-4 left-8",
              )}
            >
              <div
                className={clsx("size-3 rounded-full border border-black")}
              />

              <h3 className={clsx("font-light text-lg/2 underline")}>Correo</h3>
            </Link>

            <Link
              href={HREF_BEHANCE}
              {...EXTERNAL_LINK_ATTRS}
              className={clsx(
                "flex w-fit flex-col items-center gap-2",
                "absolute top-12 left-2/3",
              )}
            >
              <div
                className={clsx("size-3 rounded-full border border-black")}
              />

              <h3 className={clsx("font-light text-lg/2 underline")}>
                Behance
              </h3>
            </Link>

            <Link
              href={HREF_LINKEDIN}
              {...EXTERNAL_LINK_ATTRS}
              className={clsx(
                "flex w-fit flex-col items-center gap-2",
                "absolute bottom-6 left-1/3",
              )}
            >
              <div
                className={clsx("size-3 rounded-full border border-black")}
              />

              <h3 className={clsx("font-light text-lg/2 underline")}>
                LinkedIn
              </h3>
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
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
