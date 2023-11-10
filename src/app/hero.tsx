import { butlerBlack, butlerBold, butlerLight, butlerRegular, helveticaBlack, helveticaRoman } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F4ZBraQhmUf
 */
export default function HeroSection() {
  return (
    <section
      className={cn(butlerBlack.className, "relative w-full h-screen flex items-center justify-center text-center bg-cover")}
      style={{
        backgroundImage: "url(/cheers.jpg?height=1080&width=1920)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="z-0">
        <h1 className={cn("text-5xl font-bold text-white mb-4 bg-fontFamily-helveticaIt-0")}>Distribuidores y representantes de <br className="hidden lg:block" /> marcas líderes a nivel mundial</h1>
        <h2 className={cn(helveticaRoman.className, "text-2xl text-white")}>Conoce más sobre nosotros</h2>
      </div>
    </section>
  )
}
