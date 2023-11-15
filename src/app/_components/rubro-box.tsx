import { helveticaLight } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { CategoryDAO } from "@/services/category-services";
import { RubroDAO } from "@/services/rubro-services";
import Image from "next/image";
import Link from "next/link";

type Props = {
    rubro: RubroDAO
}

export default function RubroBox({ rubro }: Props) {
  return (
    <Link href={`/rubros/${rubro.id}`}>
      <div className="relative w-full h-72 flex items-end justify-center text-center">
        <Image
            src={`/${rubro.image}`}
            alt="Aceite"
            fill
            className="z-0 rounded-3xl"
        />

        <h2 className={cn(helveticaLight.className, "text-lg text-white uppercase z-10 pb-4 w-44 leading-5")}>
            Insumos <br />
            para {rubro.name}
        </h2>
      </div>
    </Link>
  )
}
