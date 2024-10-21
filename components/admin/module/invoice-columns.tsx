"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Invoice } from "../data/schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { confirmations, quoteStatuses } from "@/constants/table-data";
import { QuoteTableRowActions } from "./quote-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("id")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "invoice_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("invoice_number")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("due_date")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "send_user_quote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.original.send_user_quote?.email ?? "N/A";
      return (
        <div className="flex w-[80%] items-center">
          <span>{email}</span>
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
          href={`/admin/dashboard/invoice/${row.original.id}`}
        >
          View
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
