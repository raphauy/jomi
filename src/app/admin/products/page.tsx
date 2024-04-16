import { getProductsDAO } from "@/services/product-services";
import { ProductDialog } from "./product-dialogs";
import { DataTable } from "./product-table";
import { columns } from "./product-columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getCategorysDAO } from "@/services/category-services";

export default async function UsersPage() {
  const data = await getProductsDAO();
  const categories= await getCategorysDAO();
  const categoryNames = categories.map((category) => category.name);

  return (
    <div className="w-full">
      <div className="flex justify-end mx-auto my-2">
        <Link href={`/admin/products/new`} >
          <Button className="gap-2">
            <PlusCircle className="h-5 w-5" /> Crear Producto
          </Button>
        </Link>
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Product" categoryNames={categoryNames} />
      </div>
    </div>
  );
}
