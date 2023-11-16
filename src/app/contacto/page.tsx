import { helveticaLight } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { MensajeForm } from "../admin/mensajes/mensaje-forms";
import Footer from "../_components/footer";

export default function ContactoPage() {
  return (
    <section className={cn(helveticaLight.className, "fondo-cheers relative w-full h-screen pt-20 text-white flex flex-col items-center gap-10 text-center bg-cover")} >

      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="z-0 py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl">CONTACTO</h1>
      </div>

      <div className="bg-jomi-gris w-full flex z-0 flex-col items-center gap-20 text-black text-left py-10">
        <MensajeForm />
      </div>
      <Footer />

    </section>
  )
}
