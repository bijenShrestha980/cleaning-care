"use client";

import { ColumnDef } from "@tanstack/react-table";

import { RequestCallback } from "../data/schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { RequestCallbackTableRowActions } from "./request-callback-table-row-actions";

export const requestCallbackColumns: ColumnDef<RequestCallback>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("first_name")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("last_name")}</span>
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
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80%] items-center">
          <span>{row.getValue("phone")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quote Status" />
    ),
    cell: ({ row }) => {
      return <RequestCallbackTableRowActions row={row} />;
    },
  },
];
