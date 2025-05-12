"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import arrow from "@/public/arrow.svg";

import { PUBLISHED_PROJECTS } from "@/constants";

export function SectionProjects() {
  return (
    <section
      id="proyectos"
      className={clsx("flex flex-col divide-y divide-black border-y")}
    >
      {PUBLISHED_PROJECTS.map((project) => (
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

            <div className={clsx("flex flex-col items-end gap-1", "lg:hidden")}>
              {project["tags"].map((tag) => (
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
            <p className={clsx("flex font-light text-black text-xl leading-4")}>
              {project["tags"].map((tag) => tag["label"]).join(", ")}
            </p>

            <Image
              draggable={false}
              src={arrow}
              alt="arrow"
              className={clsx("size-10 aspect-square rotate-180")}
            />
          </div>

          <Image
            className={clsx("lg:hidden")}
            src={project["storage"]["cover"]}
            alt={project["title"]}
            placeholder="blur"
            draggable={false}
          />
        </Link>
      ))}
    </section>
  );
}
