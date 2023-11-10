import { getMarcasDAO } from "@/services/marca-services";
import { MarcaDialog } from "./marca-dialogs";
import { DataTable } from "./marca-table";
import { columns } from "./marca-columns";

export default async function UsersPage() {
  const data = await getMarcasDAO();

  return (
    <div className="w-full">
      <div className="flex justify-end mx-auto my-2">
        <MarcaDialog />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Marca" />
      </div>
    </div>
  );
}
