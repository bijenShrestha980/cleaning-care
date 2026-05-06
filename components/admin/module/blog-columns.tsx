"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { LoaderCircle, Trash2 } from "lucide-react";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Blog } from "../data/schema";
import BlogStatusDialog from "@/features/blogs/components/blog-status-dialog";
import { useDeleteBlog } from "@/features/blogs/api/use-delete-blog";

const BlogDeleteAction = ({ id }: { id: number | string }) => {
  const { mutate: deleteBlog, isPending } = useDeleteBlog();
  return (
    <button
      type="button"
      className="flex items-center gap-1 font-normal text-[13px] text-red-600 disabled:opacity-50"
      disabled={isPending}
      onClick={() => deleteBlog(id)}
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" width={14} height={14} />
      ) : (
        <Trash2 size={14} />
      )}
      Delete
    </button>
  );
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  disapproved: "Disapproved",
};

const STATUS_CLASS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  disapproved: "bg-red-100 text-red-800",
};

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[60%] items-center">
        <span className="line-clamp-1">{row.getValue("title")}</span>
      </div>
    ),
  },
  {
    accessorKey: "author_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("author_name")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) || "pending";
      return (
        <div
          className={`flex font-medium items-center px-2 py-[2px] rounded-md w-fit ${STATUS_CLASS[status] ?? ""}`}
        >
          <span>{STATUS_LABEL[status] ?? status}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      const slug = row.original.slug;
      const id = row.original.id;
      return (
        <div className="flex items-center gap-3">
          {slug && (
            <Link
              className="font-normal text-[13px] text-[#5065F6]"
              href={`/cleaning-care-admin/dashboard/blog/blog-list/${slug}`}
            >
              View
            </Link>
          )}
          {id !== undefined && <BlogDeleteAction id={id} />}
          {id !== undefined && (
            <BlogStatusDialog
              id={id}
              currentStatus={
                (row.getValue("status") as
                  | "pending"
                  | "approved"
                  | "disapproved") || "pending"
              }
              currentFeedback={row.original.admin_feedback}
            />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
