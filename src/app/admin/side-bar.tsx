"use client"

import Logged from "@/components/header/logged";
import { cn } from "@/lib/utils";
import { BookA, Copyright, LayoutDashboard, MailOpen, MessageCircle, Newspaper, Settings, Shapes, ShoppingCart, Tag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data= [
  {
    href: "/admin",
    icon: LayoutDashboard,
    text: "Dashboard"
  },
  {
    href: "divider", icon: User
  },
  {
    href: "/admin/users",
    icon: User,
    text: "Usuarios"
  },
  {
    href: "divider", icon: User
  },  
  {
    href: "/admin/rubros",
    icon: Shapes,
    text: "Rubros"
  },
  {
    href: "/admin/categorys",
    icon: Shapes,
    text: "Categorías"
  },
  {
    href: "/admin/products",
    icon: ShoppingCart,
    text: "Productos"
  },
  {
    href: "divider", icon: User
  },  
  {
    href: "/admin/marcas",
    icon: Copyright,
    text: "Marcas"
  },
  {
    href: "divider", icon: User
  },  
  {
    href: "/admin/mensajes",
    icon: MailOpen,
    text: "Mensajes"
  },
]


export default function SideBar() {

  const path= usePathname()

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black"
  const selectedClasses= "font-bold text-osom-color dark:border-r-white"


  return (
    <div className="flex flex-col justify-between border-r border-r-osom-color/50">
      <div className="flex flex-col gap-3 py-4 mt-3 ">
        {data.map(({ href, icon: Icon, text }, index) => {
          if (href === "divider") return divider()
          
          const selected= path.endsWith(href)
          const classes= cn(commonClasses, selected && selectedClasses)
          return (
            <Link href={href} key={index} className={classes}>
              <Icon size={23} />
              <p className="hidden sm:block lg:w-36">{text}</p>                  
            </Link>
          )
        })}

        {/* <Link href="/admin" className={dashboard}>
          <LayoutDashboard size={23} />
          <p className={pClasses}>Dashboard</p>                  
        </Link> */}

        {divider()}




      </div>
      <div className="mb-4">
        {divider()}
        
        <Link href="/admin/config" className="flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200 dark:hover:text-black">
          <Settings />
          <p className="hidden sm:block lg:w-36">Config</p>                  
        </Link>
      </div>
    </div>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-osom-color/50" />
}
