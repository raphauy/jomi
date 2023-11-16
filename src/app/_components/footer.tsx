import { Button } from "@/components/ui/button";
import { helveticaMedium } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin, Mail, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section id="contacto" className={cn("bg-black text-white flex flex-col items-center p-2 w-full text-left z-0", helveticaMedium.className)}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:w-[1000px]">
        <div className="py-5 flex flex-col text-sm">
          <p className="mb-3">CONTACTO</p>
          <p className="leading-4 mb-3">
            Oficinas: Las Américas Business Center,<br />
            Avda, de las Américas 8200
          </p>
          <p className="leading-4 mb-3">
            Ruta 67 km 24.200<br />
            POLO LOGISTICO LAS PIEDRAS,<br />
            Nave 9
          </p>
          <p className="border-t my-1 w-32" />
          <Link href="mailto:administracion@jomirepresentaciones.com.uy" target="_blank" className="flex">
            <p className="pt-0.5 flex"><Mail className="pr-1 -ml-0.5 h-4 " />administracion@jomirepresentaciones.com.uy</p>
          </Link>
          <div className="flex">
            <Smartphone className="pr-1 -ml-0.5 h-4" />
            <p className="pt-0.5">091 835 717</p>
          </div>
          <div className="flex mt-4 -ml-1 gap-4 items-center">
            <Link href="https://www.facebook.com/profile.php?id=61553034430863" target="_blank">
              <Facebook className="h-6" />
            </Link>
            <Link href="https://www.instagram.com/jomi.representaciones/" target="_blank">
              <Instagram className="h-6" />
            </Link>
            <Link href="https://www.linkedin.com/company/jomi-representaciones/" target="_blank">
              <Linkedin className="h-6" />
            </Link>
          </div>

        </div>
        <div className="flex gap-10 items-center">
          <Link href="https://www.google.com/maps?ll=-34.85989,-56.030445&z=17&t=m&hl=es&gl=UY&mapclient=embed&q=Av.+de+las+Americas+8200+15000+Ciudad+de+la+Costa,+Departamento+de+Canelones" target="_blank">
            <Image src="/mapa1.png" width={200} height={200} alt="mapa" />
          </Link>
          <Link href="https://www.google.com/maps?ll=-34.710312,-56.207812&z=15&t=m&hl=es&gl=UY&mapclient=embed&cid=9778506773203738258" target="_blank">
            <Image src="/mapa2.png" width={200} height={200} alt="mapa" />
          </Link>
        </div>

      </div>
        <div className="flex justify-center items-center">
          <p>Desarrollado por</p>
          <Link href="https://tinta.wine" target="_blank">
            <Button variant="link" className="text-white text-base p-1">
              tinta.wine
            </Button>
          </Link>
        </div>

    </section>
  )
}
