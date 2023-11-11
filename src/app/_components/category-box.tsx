import { helveticaLight } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { CategoryDAO } from "@/services/category-services";
import Image from "next/image";

type Props = {
    categoria: CategoryDAO
}

export default function CategoryBox({ categoria }: Props) {
  return (
    <div className="relative w-full h-72 flex items-end justify-center text-center">
    {/* Imagen de fondo */}
    <Image
        src={`/${categoria.image}`}
        alt="Aceite"
        layout="fill" // Ajusta la imagen para que llene el contenedor
        objectFit="cover" // Mantiene las proporciones de la imagen
        className="z-0 rounded-3xl" // Pone la imagen detrás del contenido
    />

    <h2 className={cn(helveticaLight.className, "text-lg text-white uppercase z-10 pb-4 w-44")}>
        Insumos <br />
        para {categoria.name.split(" ").pop()}
    </h2>
    </div>
  )
}
