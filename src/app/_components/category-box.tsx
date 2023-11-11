import { helveticaLight } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    categoria: string
}

export default function CategoryBox({ categoria }: Props) {
  return (
    <div className="relative w-full h-96 flex items-end justify-center text-center">
    {/* Imagen de fondo */}
    <Image
        src={`/${categoria}.jpg`}
        alt="Aceite"
        layout="fill" // Ajusta la imagen para que llene el contenedor
        objectFit="cover" // Mantiene las proporciones de la imagen
        className="z-0 rounded-3xl" // Pone la imagen detrás del contenido
    />

    <h2 className={cn(helveticaLight.className, "text-lg text-white uppercase z-10 pb-4")}>
        Insumos <br />
        para {categoria}
    </h2>
    </div>
  )
}
