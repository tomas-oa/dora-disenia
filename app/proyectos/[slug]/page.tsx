import Image from "next/image";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { PROJECTS } from "@/constants";
import clsx from "clsx";

interface Props {
  params: Promise<{
    slug: (typeof PROJECTS)[number]["slug"];
  }>;
}

export default async function Projects({ params }: Props) {
  const { slug } = await params;
  const PROJECT = PROJECTS.find((project) => project.slug === slug);

  if (!PROJECT) {
    notFound();
  }

  return (
    <>
      <Navbar showLogo />

      <main
        className={clsx(
          "grid grid-cols-1 p-container gap-8",
          "lg:grid-cols-none lg:flex lg:flex-row lg:px-10 lg:pt-14 lg:pb-18 lg:gap-4",
          "lg:h-screen lg:overflow-y-auto lg:snap-y lg:snap-mandatory",
          "xl:p-container xl:gap-8",
        )}
      >
        <section
          className={clsx(
            "flex flex-col gap-8",
            "lg:w-1/4 lg:sticky lg:top-0 lg:justify-between",
          )}
        >
          <h1
            className={clsx(
              "font-display font-medium text-5xl/9 max-w-2xs",
              "md:text-6xl/11 md:max-w-xs",
              "lg:text-4xl/7 lg:max-w-sm",
              "xl:text-5xl/9 xl:max-w-md",
            )}
          >
            {PROJECT["title"]}
          </h1>

          <div
            className={clsx(
              "flex flex-col gap-2",
              "lg:flex-col-reverse lg:gap-4",
            )}
          >
            <div
              className={clsx(
                "flex flex-row justify-between items-end",
                "lg:justify-start lg:gap-2",
              )}
            >
              <div
                className={clsx(
                  "flex h-fit flex-row divide-x divide-black border border-black",
                )}
              >
                {PROJECT["tags"].map((tag) => (
                  <div
                    key={tag["key"]}
                    className={clsx(
                      tag["className"],
                      "aspect-square size-4",
                      "xl:size-5",
                    )}
                  />
                ))}

                <div
                  className={clsx(
                    "aspect-square size-4 border border-black bg-black",
                    "xl:size-5",
                  )}
                />
              </div>

              <p
                className={clsx(
                  "font-light text-black text-sm leading-4",
                  "xl:text-base/5",
                )}
              >
                {PROJECT["tags"].map((tag) => tag["label"]).join(", ")}
              </p>
            </div>

            <Image
              src={PROJECT["storage"]["cover"]}
              alt={PROJECT["title"]}
              placeholder="blur"
              draggable={false}
              className={clsx("border border-black", "lg:hidden")}
            />

            <p
              className={clsx(
                "font-light text-black text-lg leading-5 mt-2 text-pretty",
                "sm:text-xl",
                "lg:mt-0",
                "xl:text-2xl/6",
              )}
            >
              {PROJECT["content"]["diggest"]}
            </p>
          </div>
        </section>

        <div
          className={clsx("lg:w-3/4 lg:flex lg:flex-col lg:gap-8", "xl:gap-2")}
        >
          <article
            className={clsx(
              "flex flex-col gap-2",
              "lg:grid lg:flex-none lg:gap-6 lg:grid-cols-3",
              "lg:snap-start lg:scroll-mt-20",
            )}
          >
            <h3
              className={clsx(
                "font-display font-medium text-lg leading-4 col-span-1",
                "sm:text-xl",
                "lg:text-end",
                "xl:text-2xl/6",
              )}
            >
              Resumen
            </h3>

            <p
              className={clsx(
                "text-sm/4 mb-8",
                "hyphens-auto whitespace-pre-line",
                "lg:col-span-2",
                "lg:columns-2 lg:gap-6",
              )}
            >
              {PROJECT["content"]["summary"]}
            </p>
          </article>

          <section
            className={clsx("flex flex-col border divide-y divide-black")}
          >
            <Image
              src={PROJECT["storage"]["cover"]}
              alt={PROJECT["title"]}
              placeholder="blur"
              draggable={false}
              className={clsx(
                "hidden",
                "lg:block lg:snap-start lg:scroll-mt-[24.5px] lg:aspect-[16/11] lg:object-center lg:object-cover",
              )}
            />

            {PROJECT["storage"]["images"].map((image, index) => (
              <div
                key={`${PROJECT["title"]}-${index}`}
                className={clsx(
                  "overflow-hidden snap-start scroll-mt-[24.5px]",
                )}
              >
                {typeof image["src"] === "string" &&
                image["src"].toString().endsWith(".mp4") ? (
                  <video
                    src={image["src"]}
                    autoPlay
                    muted
                    loop
                    className={clsx(image["className"], "bg-black size-full")}
                  />
                ) : (
                  <Image
                    src={image["src"]}
                    alt={image["alt"]}
                    placeholder={
                      image["src"].toString().endsWith(".png")
                        ? "blur"
                        : "empty"
                    }
                    draggable={false}
                    className={clsx(
                      "aspect-[16/11] object-cover",
                      image["className"],
                    )}
                  />
                )}
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
