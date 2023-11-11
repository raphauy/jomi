import { helveticaLight } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { CategoryDAO } from "@/services/category-services";
import { MarcaDAO } from "@/services/marca-services";
import Image from "next/image";

type Props = {
    marca: MarcaDAO
}

export default function MarcaBox({ marca }: Props) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative h-32 w-32 flex items-center justify-center">      
        <Image
            src={`/logos/${marca.image}`}
            alt="Aceite"
            layout="fill" // Ajusta la imagen para que llene el contenedor
            objectFit="cover" // Mantiene las proporciones de la imagen
            className="border rounded-xl"
        />
      </div>
    </div>
  )
}
