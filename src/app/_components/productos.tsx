import { helveticaMedium } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import CategoryBox from "./category-box";
import { getCategorysDAO } from "@/services/category-services";

export default async function Productos() {

  const categories= await getCategorysDAO()
  return (
    <section id="productos" className={cn("bg-black text-white pt-16 min-h-[600px] flex items-center justify-center pb-10")}>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex-1 items-center flex flex-col justify-center">
          <div>
            <h2 className={cn(helveticaMedium.className, "text-4xl mt-8 text-center mb-10 md:mt-0")}>PRODUCTOS</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {
                categories.map((categoria) => (
                  <CategoryBox key={categoria.id} categoria={categoria} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
