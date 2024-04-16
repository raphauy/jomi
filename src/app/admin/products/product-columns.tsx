"use client";

import { Button } from "@/components/ui/button";
import { ProductDAO } from "@/services/product-services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { DeleteProductDialog, ProductDialog } from "./product-dialogs";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<ProductDAO>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (<p></p>)
    },
    cell: ({ row }) => {
      const data = row.original;
      const firstImage = data.images[0].url;
      return (
        <div className="flex items-center justify-center h-20 w-20 rounded-full">  
          <Image src={firstImage} alt="product-image" width={128} height={128} />  
        </div>
      );
    }
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
  },

  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Category
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      const description = `Do you want to delete Product ${data.name}?`;

      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/products/${data.id}`} >
            <Button variant="ghost">
              <Pencil />
            </Button>
          </Link>
          <DeleteProductDialog description={description} id={data.id} />
        </div>
      );
    },
  },
];
