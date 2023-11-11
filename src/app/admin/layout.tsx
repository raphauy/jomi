import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import SideBar from "./side-bar";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans"

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return redirect("/login")
  }

  if (currentUser?.role !== "admin") {
    return redirect("/unauthorized?message=You are not authorized to access this page")
  }

  return (
    <>
      <div className={cn(GeistSans.className, "flex flex-grow w-full bg-background text-muted-foreground")}>
        <SideBar />
        <div className="flex flex-col items-center flex-grow p-1">{children}</div>
      </div>
    </>
  )
}
