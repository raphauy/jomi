import { getMensajesDAO } from "@/services/mensaje-services";
import { MensajeDialog } from "./mensaje-dialogs";
import { DataTable } from "./mensaje-table";
import { columns } from "./mensaje-columns";

export default async function UsersPage() {
  const data = await getMensajesDAO();

  return (
    <div className="w-full">
      <div className="flex justify-end mx-auto my-2">
        <MensajeDialog />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Mensaje" />
      </div>
    </div>
  );
}
