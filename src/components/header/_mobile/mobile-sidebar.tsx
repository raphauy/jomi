import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition bg-black text-white p-2">
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white max-w-xs">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}