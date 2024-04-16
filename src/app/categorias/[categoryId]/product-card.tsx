import { helveticaLight, helveticaMedium } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ExternalLink } from "lucide-react";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}
export function ProductCard({ id, title, description, image, href }: Props) {
  return (
    <div className="w-full flex justify-center mt-2 gap-8">
      <div className="relative h-60 w-60 min-w-[240px]">      
          <Image src={image} alt={title} fill className="border rounded-xl border-gray-300 bg-white" /> 
      </div>
      <div className={cn(helveticaLight.className, "max-w-md flex flex-col justify-between h-full pt-6 pb-2")}>
          <div className="">
              <h1 className={cn(helveticaMedium.className, "text-3xl sm:text-4xl mb-2")}>{title}</h1> 
              <h2 className="leading-6 text-lg whitespace-pre-line">{description}</h2>
          </div>
          <Link href={href || "#"} target="_blank">
              <Button className="mt-4 font-bold w-56 gap-3" size="sm"><p className="mt-1.5">MÁS INFORMACIÓN</p> <ExternalLink size={21} /></Button>  
          </Link>
      </div>
    </div>
  )
}
