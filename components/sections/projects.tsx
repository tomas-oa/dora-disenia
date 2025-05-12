"use client";

import clsx from "clsx";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import arrow from "@/public/arrow.svg";

import { PUBLISHED_PROJECTS } from "@/constants";

export function SectionProjects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<{
    slug: string;
    cover: StaticImageData;
    title: string;
  } | null>(null);

  // Preload all project images
  useEffect(() => {
    for (const project of PUBLISHED_PROJECTS) {
      const img = new window.Image();
      img.src = project.storage.cover.src;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e["clientX"], y: e["clientY"] });
    });
  }, []);

  return (
    <section
      id="proyectos"
      className={clsx("flex flex-col divide-y divide-black border-y")}
      onMouseMove={handleMouseMove}
    >
      {hoveredProject && (
        <div
          className={clsx(
            "max-lg:hidden",
            "pointer-events-none border-none divide-none",
            "fixed z-50 transition-all duration-300 ease-out overflow-visible",
          )}
          style={{
            left: mousePosition["x"] + 10,
            top: mousePosition["y"] + 10,
          }}
        >
          <Image
            src={hoveredProject["cover"]}
            alt={`Foto de ${hoveredProject["title"]}`}
            draggable={false}
            className={clsx(
              "rounded-lg shadow-2xl",
              "transition-transform duration-300 ease-out transform",
              "lg:w-96 lg:h-auto",
            )}
            priority
          />
        </div>
      )}

      {PUBLISHED_PROJECTS.map((project) => (
        <Link
          href={`/proyectos/${project["slug"]}`}
          key={project["slug"]}
          className={clsx(
            "flex flex-col divide-y divide-black",
            "lg:divide-none lg:flex-row lg:justify-between",
          )}
          onMouseEnter={() =>
            setHoveredProject({
              slug: project["slug"],
              cover: project["storage"]["cover"],
              title: project["title"],
            })
          }
          onMouseLeave={() => setHoveredProject(null)}
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
