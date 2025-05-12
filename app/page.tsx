import { clsx } from "clsx";

import { SectionContact } from "@/components/sections/contact";
import { SectionFooter } from "@/components/sections/footer";
import { SectionHero } from "@/components/sections/hero";
import { SectionLetsWork } from "@/components/sections/lets-work";
import { SectionProjects } from "@/components/sections/projects";
import { Navbar } from "@/components/ui/navbar";

export default function RootPage() {
  return (
    <>
      <Navbar showLogo={false} />
      <main className={clsx("flex flex-col")}>
        <SectionHero />
        <SectionProjects />
        <SectionLetsWork />
        <SectionContact />
        <SectionFooter />
      </main>
    </>
  );
}
