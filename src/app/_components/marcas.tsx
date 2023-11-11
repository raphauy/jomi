import { helveticaMedium } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import CategoryBox from "./category-box";
import { getCategorysDAO } from "@/services/category-services";
import { getMarcaDAO, getMarcasDAO } from "@/services/marca-services";
import MarcaBox from "./marca-box";

export default async function Marcas() {

  const marcas= await getMarcasDAO()
  return (
    <section id="marcas" className="bg-white py-8 flex flex-col items-center justify-center min-h-[600px]">
      <h2 className={cn(helveticaMedium.className, "text-4xl mb-5")}>MARCAS REPRESENTADAS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 max-w-5xl">
        {
          marcas.map((marca) => (
            <MarcaBox key={marca.id} marca={marca} />
          ))
        }
      </div>
    </section>
  )
}
