import { Button } from "@/components/ui/button"
import { butlerRegular, helveticaLight, helveticaMedium } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { getMarcaDAO, getMarcasDAO } from "@/services/marca-services"
import Image from "next/image"
import Link from "next/link"
import SliderComponent from "./slider-marcas"

type Props = {
    params: {
        marcaId: string
    }
}

export default async function MarcaPage({ params }: Props) {
    const marca= await getMarcaDAO(params.marcaId)

    const marcas= await getMarcasDAO()
    const index= marcas.findIndex((m) => m.id === marca.id)
    marcas.splice(index, 1)

    return (
        <section className={cn(helveticaLight.className, "fondo-cheers relative w-full h-screen pt-20 text-white flex flex-col items-center gap-10 text-center bg-cover")} >

            <div className="absolute inset-0 bg-black opacity-50" />

            <div className="z-0 py-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl">MARCAS REPRESENTADAS</h1>
            </div>

            <div className="bg-jomi-gris w-full flex z-0 flex-col items-center gap-20 text-black text-left py-10">
                <div className="w-full flex justify-center items-center mt-2 gap-8">
                    <div className="relative h-60 w-60 min-w-[240px]">      
                        <Image src={`/logos/${marca.image}`} alt="Aceite" fill className="border rounded-xl border-gray-300 bg-white" />
                    </div>
                    <div className={cn(helveticaLight.className, "max-w-md flex flex-col justify-between h-full pt-6 pb-2")}>
                        <div className="">
                            <h1 className={cn(helveticaMedium.className, "text-3xl sm:text-4xl mb-2")}>{marca.name.toUpperCase()}</h1>
                            <h2 className="leading-5 text-lg">{marca.description}</h2>
                        </div>
                        <Link href={marca.href || "#"} target="_blank">
                            <Button className="mt-4 font-bold w-40" size="sm">SITIO WEB</Button>
                        </Link>
                    </div>
                </div>
                <SliderComponent marcas={marcas} maxItems={4}/>
                <SliderComponent marcas={marcas} maxItems={2}/>
            </div>            
        </section>

    )
}
