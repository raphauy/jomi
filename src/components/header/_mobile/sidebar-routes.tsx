"use client";

import { Compass, Contact, Home } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: Home,
    label: "INICIO",
    href: "/",
  },
  {
    icon: Compass,
    label: "QUIÉNES SOMOS",
    href: "#quienes-somos",
  },
  {
    icon: Compass,
    label: "PRODUCTOS",
    href: "#productos",
  },
  {
    icon: Compass,
    label: "MARCAS",
    href: "#marcas",
  },
  {
    icon: Contact,
    label: "CONTACTO",
    href: "#contacto",
  },
];


export function SidebarRoutes() {

//  const publicMenu= 

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}