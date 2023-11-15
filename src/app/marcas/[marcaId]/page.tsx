import { Button } from "@/components/ui/button"
import { helveticaLight, helveticaMedium } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { getMarcaDAO, getMarcasDAO } from "@/services/marca-services"
import Image from "next/image"
import Link from "next/link"
import SliderComponent from "./slider"

type Props = {
    params: {
        marcaId: string
    }
}

export default async function MarcaPage({ params }: Props) {
    const marca= await getMarcaDAO(params.marcaId)

    const marcas= await getMarcasDAO()
    // remove marca from marcas
    const index= marcas.findIndex((m) => m.id === marca.id)
    marcas.splice(index, 1)

    return (
        <div className="flex flex-col gap-20 min-h-[500px] items-center">

            <div className="w-full flex justify-center items-center mt-2 gap-2">
                <div className="relative h-60 w-60 min-w-[240px]">      
                    <Image src={`/logos/${marca.image}`} alt="Aceite" fill className="border rounded-xl border-gray-300 bg-white" />
                </div>
                <div className={cn(helveticaLight.className, "max-w-md")}>
                    <h1 className={cn(helveticaMedium.className, "text-3xl sm:text-4xl mb-2")}>{marca.name}</h1>
                    <h2 className="leading-5 text-lg">{marca.description}</h2>
                    <Link href={marca.href || "#"} target="_blank">
                        <Button className="mt-4 font-bold w-40" size="sm">SITIO WEB</Button>
                    </Link>
                </div>
            </div>
            <SliderComponent marcas={marcas} />
        </div>
    )
}
