"use client";

import { Button } from "@/components/ui/button";
import { MensajeDAO } from "@/services/mensaje-services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteMensajeDialog, MensajeDialog } from "./mensaje-dialogs";

export const columns: ColumnDef<MensajeDAO>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  {
    accessorKey: "contenido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contenido
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  // {
  //   accessorKey: "role",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" className="pl-0 dark:text-white"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Rol
  //         <ArrowUpDown className="w-4 h-4 ml-1" />
  //       </Button>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      const description = `Do you want to delete Mensaje ${data.nombre}?`;

      return (
        <div className="flex items-center justify-end gap-2">
          <MensajeDialog id={data.id} />
          <DeleteMensajeDialog description={description} id={data.id} />
        </div>
      );
    },
  },
];
