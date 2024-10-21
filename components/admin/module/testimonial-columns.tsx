"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { labels } from "@/constants/table-data";
import { Testimonial } from "../data/schema";
import { CustomImage } from "@/components/ui/custom-image";

export const testimonialColumns: ColumnDef<Testimonial>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.name);

      return (
        <div className="flex space-x-2">
          {row.original.image && (
            <CustomImage
              src={row.original.image}
              alt="Art Image"
              fill
              containerClassName="w-[50px] h-[50px] rounded-md"
              className="w-12 h-12 object-cover object-center rounded-md"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.name);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{1}</Badge>}
          <span className="max-w-[500px] truncate font-normal text-[13px]">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "testimonial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Testimonial" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.testimonial
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{1}</Badge>}
          <span className="max-w-[500px] truncate font-normal text-[13px]">
            {row.getValue("testimonial")}
          </span>
        </div>
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
          href={`/admin/dashboard/settings/testimonial/view-testimonial`}
        >
          View
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
