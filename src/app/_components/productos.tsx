import { butlerBlack, butlerBold, butlerLight, butlerMedium, butlerRegular, helveticaBlack, helveticaLight, helveticaMedium, helveticaRoman } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CategoryBox from "./category-box";

export default function Productos() {
  return (
    <section className={cn("bg-black text-white pt-16")}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 items-center flex flex-col justify-center">
          <div>
            <h2 className={cn(helveticaMedium.className, "text-4xl mt-8 md:mt-0")}>PRODUCTOS</h2>
            <CategoryBox categoria="aceite" />
          </div>
        </div>
      </div>
    </section>
  )
}
