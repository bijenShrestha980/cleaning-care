"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Quote } from "../data/schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { confirmations, quoteStatuses } from "@/constants/table-data";
import { QuoteTableRowActions } from "./quote-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const quoteColumns: ColumnDef<Quote>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100%] items-center">
          <span>#{row.getValue("id")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100%] items-center">
          <span>{row.getValue("full_name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "address",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Address" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex w-[80%] items-center">
  //         <span>{row.getValue("address")}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "quoteStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quote Status" />
    ),
    cell: ({ row }) => {
      return <QuoteTableRowActions row={row} />;
    },
  },
  {
    accessorKey: "confirmation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Confirmation" />
    ),
    cell: ({ row }) => {
      const confirmation = confirmations.find(
        (status) => status.value === row.getValue("confirmation")
      );

      if (!confirmation) {
        return null;
      }
      return (
        <Badge variant={"outline"}>
          {confirmation.icon && <confirmation.icon className="mr-2 h-3 w-3" />}
          <span>{confirmation.label}</span>
        </Badge>
      );
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
          href={`/admin/dashboard/quote/${row.original.id}`}
        >
          View
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
