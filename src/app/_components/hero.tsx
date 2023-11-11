import { butlerBlack, butlerBold, butlerRegular, helveticaRoman } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {

  return (
    <section className={cn(butlerBlack.className, "fondo-cheers relative w-full h-screen text-white flex items-center justify-center text-center bg-cover")} >

      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="z-0">
        <h1 className={cn(butlerRegular.className, "text-6xl")}>
          Distribuidores y representantes de <br className="hidden lg:block" /> 
          marcas <span className={cn(butlerBold.className)}>líderes a nivel mundial</span>
        </h1>
        <a href="#quienes-somos" data-te-smooth-scroll-init>
          <h2 className={cn(helveticaRoman.className, "text-lg text-white flex justify-center mt-4")}>Conocé más sobre nosotros <ChevronRight className="h-5 mt-[3px]"/> </h2>
        </a>
      </div>
      
    </section>
  )
}
