"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Service } from "../data/schema";
import { statuses } from "@/constants/table-data";
import { Badge } from "@/components/ui/badge";

export const serviceColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "service_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("service_name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "categories",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Categories" />
  //   ),
  //   cell: ({ row }) => {
  //     console.log(row.getValue("categories"));
  //     return (
  //       <div className="flex items-center gap-1">
  //         {/* @ts-ignore */}
  //         {row.getValue("categories")?.map((category) => (
  //           <Badge key={category.value} variant={"outline"}>
  //             {category.label}
  //           </Badge>
  //         ))}
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
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
          href={`/admin/dashboard/service/service-list/${row.original.id}`}
        >
          View
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
