import fin from "@/public/aniversario/fin.jpeg"

import primera from "@/public/aniversario/primeras/primera.jpeg"
import espejo from "@/public/aniversario/primeras/espejo.jpeg"

import con_bimbo from "@/public/aniversario/chistosos/con-bimbo.jpeg"
import dora_gauguin from "@/public/aniversario/chistosos/dora-gauguin.jpeg"
import dora_white from "@/public/aniversario/chistosos/dora-white.jpeg"
import omero from "@/public/aniversario/chistosos/omero.jpeg"

import chawarmito from "@/public/aniversario/comidas/chawarmito.jpeg"
import menta_jengibre from "@/public/aniversario/comidas/menta-jengibre.jpeg"
import almuerzo from "@/public/aniversario/comidas/almuerzo.jpeg"
import enki from "@/public/aniversario/comidas/enki.jpeg"
import fajita from "@/public/aniversario/comidas/fajita.jpeg"

import fosteros from "@/public/aniversario/conciertos/fosteros.jpeg"
import gepeto from "@/public/aniversario/conciertos/gepeto.jpeg"

import _31_minutos from "@/public/aniversario/misc/31-minutos.jpeg"
import bimbo_hosp from "@/public/aniversario/misc/bimbo-hosp.jpeg"
import fantasilandia from "@/public/aniversario/misc/fantasilandia.jpeg"
import graduadora from "@/public/aniversario/misc/graduadora.jpeg"
import primero from "@/public/aniversario/misc/primero.jpeg"
import tu_calle from "@/public/aniversario/misc/tu-calle.jpeg"

import { clsx } from "clsx"
import Image from "next/image"

export default function AppAniversarioPage() {
  return (
    <section className={clsx("flex flex-col items-center justify-center gap-6 p-container scroll-smooth max-w-7xl mx-auto")}>
      <h1 className={clsx("text-2xl font-bold text-center")}>Feliz aniversario mi amor ❤️</h1>

      <p className={clsx("text-left text-base")}>
        Hola bebita mia, hace mucho tiempo que quería hacerte un regalo ñoñito, sé que solo son pixeles en una pantalla pero te juro que está hecho con todo mi amor.
      </p>

      <p className={clsx("text-left text-base")}>
        Aquí hay un poquito de todos los momentos hermosos que me haz dado durante estos dos años juntos. Gracias por hacerme feliz cada día, por entenderme, ser mi compañera y el amor de mi vida, en serio que no tienes idea de lo mucho que te amo y lo importante que eres en mi vida.
      </p>

      <p className={clsx("text-left text-base")}>Prometo cuidarte y amarte durante todas las primaveras.</p>

      <p className={clsx("text-3xl font-extrabold text-center")}>
        Te amo
      </p>

      <section id="misc">
        <h3 className={clsx("text-xl font-extrabold text-center")}>Nuestas primeras fotitos</h3>

        <div className={clsx("grid grid-cols-2 gap-4")}>
          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image 
              src={primera} 
              alt="primera" 
              className="size-full object-cover border border-black"
            />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">
              22 de Julio
            </figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image 
              src={espejo} 
              alt="espejo" 
              className="size-full object-cover border border-black"
            />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">
              Enamorados
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="conciertos">
        <h3 className={clsx("text-xl font-extrabold text-center")}>Nuestros conciertos juntos</h3>

        <div className={clsx("grid grid-cols-2 gap-4")}>
          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image 
              src={fosteros} 
              alt="fosteros" 
              className="size-full object-cover border border-black"
            />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">
              Fosteros
            </figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image 
              src={gepeto} 
              alt="gepeto" 
              className="size-full object-cover border border-black"
            />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">
              Gepeto
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="comidas" className={clsx("flex flex-col items-center justify-center")}>
        <h3 className={clsx("text-xl font-extrabold text-center")}>Las comidas saben mejor contigo ❤️</h3>

        <div className={clsx("grid grid-cols-2 gap-4")}>
          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={menta_jengibre} alt="menta jengibre" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Menta jengibre</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={chawarmito} alt="chawarmito" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Mucho amor</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={almuerzo} alt="almuerzo" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Almuerzito</figcaption>
          </figure>
          
          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={enki} alt="enki" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Sopaipillitas</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={fajita} alt="fajita" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Cualquier comida es un lujo contigo</figcaption>
          </figure>
        </div>
      </section>


      <section id="misc" className={clsx("flex flex-col items-center justify-center")}>
        <h3 className={clsx("text-xl font-extrabold text-center")}>Recuerdos varios</h3>

        <div className={clsx("grid grid-cols-2 gap-4")}>
          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={tu_calle} alt="tu calle" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Mi calle favorita</figcaption>  
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={bimbo_hosp} alt="bimbo hosp" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Cuidando a bimbito</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={graduadora} alt="graduadora" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Orgulloso de ti</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={fantasilandia} alt="fantasilandia" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Antes del raptor</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={_31_minutos} alt="31 minutos" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Bodoque en persona</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={primero} alt="primero" />

            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Hace un año</figcaption>
          </figure>
        </div>
      </section>

      <section id="chistosos" className={clsx("flex flex-col items-center justify-center")}>
        <h3 className={clsx("text-xl font-extrabold text-center")}>Sección chistosa</h3>

        <div className={clsx("grid grid-cols-2 gap-4")}>
          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={con_bimbo} alt="con bimbo" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Despertar a tu lado y con bimbito es lo mejor</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={dora_gauguin} alt="dora guauguin" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Dora Gauguin</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={dora_white} alt="dora white" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Dora White</figcaption>
          </figure>

          <figure className="flex flex-col overflow-hidden border border-black bg-black/10 p-1">
            <Image className="size-full object-cover border border-black" src={omero} alt="omero" />
            <figcaption className="flex items-center justify-center p-2 text-center font-light text-black text-xs">Omerito</figcaption>
          </figure>
        </div>
      </section>

      <p className={clsx("text-xl font-extrabold text-center")}>Gracias por aguantarme y quererme todo este tiempo. No hay día que no te piense y me enamore más de ti.</p>

      <Image className="size-full object-cover border border-black" src={fin} alt="fin" />

      <footer className={clsx("flex flex-col items-center justify-center text-center")}>
        <small>{new Date().getFullYear()} - &copy; Cler SpA. con ♡ - Todos los derechos reservados</small>
      </footer>
    </section>
  )
}