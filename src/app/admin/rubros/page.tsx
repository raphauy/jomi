import { getRubrosDAO } from "@/services/rubro-services";
import { RubroDialog } from "./rubro-dialogs";
import { DataTable } from "./rubro-table";
import { columns } from "./rubro-columns";

export default async function UsersPage() {
  const data = await getRubrosDAO();

  return (
    <div className="w-full">
      <div className="flex justify-end mx-auto my-2">
        <RubroDialog />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Rubro" />
      </div>
    </div>
  );
}
