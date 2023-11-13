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
      <div className="relative h-40 w-40 flex items-center justify-center">      
        <Image
            src={`/logos/${marca.image}`}
            alt="Aceite"
            fill
            className="border rounded-xl"
        />
      </div>
    </div>
  )
}
