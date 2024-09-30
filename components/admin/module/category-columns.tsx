"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { statuses } from "@/constants/table-data";
import { ServiceCategory } from "../data/schema";

export const categoryColumns: ColumnDef<ServiceCategory>[] = [
  {
    accessorKey: "category_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("category_name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "servicecategoryitems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {row
            .getValue("servicecategoryitems")
            // @ts-ignore
            ?.slice(0, 3)
            .map((category: { item_name: string }) => (
              <Badge key={category.item_name} variant={"outline"}>
                {category.item_name}
              </Badge>
            ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex font-medium items-center bg-primary text-primary-foreground px-2 py-[2px] rounded-md w-fit">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <Link
          className="font-normal text-[13px] text-[#5065F6]"
          href={`/admin/dashboard/service/categories/${row.original.id}`}
        >
          View
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
