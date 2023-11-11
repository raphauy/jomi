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
    <Image
        src={`/${categoria.image}`}
        alt="Aceite"
        layout="fill"
        objectFit="cover"
        className="z-0 rounded-3xl"
    />

    <h2 className={cn(helveticaLight.className, "text-lg text-white uppercase z-10 pb-4 w-44 leading-5")}>
        Insumos <br />
        para {categoria.name.split(" ").pop()}
    </h2>
    </div>
  )
}
