import { butlerBlack, butlerBold, butlerLight, butlerMedium, butlerRegular, helveticaBlack, helveticaLight, helveticaMedium, helveticaRoman } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function QuienesSomos() {
  return (
    <section className={cn(helveticaLight.className, "")} id="quienes-somos">
      <div className="flex flex-col md:flex-row">
        <Image src="/botella_v2.png" alt="Quiénes somos" width={600} height={300} className="max-w-md md:max-w-lg xl:max-w-xl" />
        <div className="flex-1 items-center flex flex-col justify-center">
          <div>
            <h2 className={cn(helveticaMedium.className, "text-4xl mt-8 md:mt-0")}>QUIÉNES SOMOS</h2>

            <p className="max-w-[384px] leading-5">
              Contamos con más de <span className="font-bold">30 años de experiencia </span>
              comercializando insumos de alta calidad para <span className="font-bold">vinos, espumantes, viñedos, 
              cervezas, aceites, licores y más.</span> Nuestras marcas representadas trabajan 
              buscando la excelencia, con altos niveles de calidad, alta inversión en I+D y 
              abrazadas a procesos, prácticas y productos amigables con el medio ambiente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
