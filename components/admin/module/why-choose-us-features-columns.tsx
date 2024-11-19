"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { WhyChooseUsFeatures } from "../data/schema";
import { CustomImage } from "@/components/ui/custom-image";
import { types } from "@/constants/table-data";

export const whyChooseUsFeaturesColumns: ColumnDef<WhyChooseUsFeatures>[] = [
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" />
    ),
    cell: ({ row }) => {
      return (
        <CustomImage
          src={`${process.env.url}/storage/${row.getValue("icon")}`}
          alt={row.getValue("feature_title")}
          fill
          containerClassName="w-[50px] h-[50px]"
          sizes="(max-width: 640px) 50px, (max-width: 768px) 50px, 50px (max-width: 1024px) 50px"
          className="rounded-md object-cover"
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "feature_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Feature title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("feature_title")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "feature_short_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal text-[13px] line-clamp-1">
            {row.getValue("feature_short_description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue("type"));

      if (!type) {
        return null;
      }
      return (
        <Badge variant={"outline"}>
          {type.icon && <type.icon className="mr-2 h-3 w-3" />}
          <span>{type.label}</span>
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
          href={`/cleaning-care-admin/dashboard/why-choose-us/features/${row.original.id}`}
        >
          View
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
