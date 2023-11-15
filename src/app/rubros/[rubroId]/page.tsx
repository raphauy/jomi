import { butlerBlack, butlerBold, butlerRegular, helveticaLight, helveticaMedium, helveticaRoman } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { getRubroDAO, getRubrosDAO } from "@/services/rubro-services"
import SliderRubros from "./slider-rubros"
import SliderCategorias from "./slider-categorias"
import { getCategoriesByRubroDAO, getCategorysDAO } from "@/services/category-services"

type Props = {
    params: {
        rubroId: string
    }
}
export default async function RubroPage({ params }: Props) {
    const rubro= await getRubroDAO(params.rubroId)
    if (!rubro) return (<div>Rubro Not found</div>)

    const categorias= await getCategoriesByRubroDAO(params.rubroId)
    console.log(categorias);
    

    return (
        <section className={cn(helveticaLight.className, "fondo-cheers relative w-full h-screen pt-20 text-white flex flex-col items-center gap-10 text-center bg-cover")} >

            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="z-0 py-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl">
                    INSUMOS <br/> 
                    PARA <span className={cn(butlerRegular.className)}>{rubro.name.toUpperCase()}</span>
                </h1>
            </div>

            <SliderCategorias categorias={categorias} />
        
      </section>
    )
}
