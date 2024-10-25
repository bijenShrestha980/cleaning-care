"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDeleteRequestCallback } from "@/features/request-callback/api/use-delete-request-callback";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RequestCallbackTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const requestCallback = row.original as any;
  const { mutate: deleteRequestCallback, isPending: deleteIsPending } =
    useDeleteRequestCallback(requestCallback.id);

  if (deleteIsPending) {
    return <Skeleton className="h-8 w-[82px]" />;
  }
  if (requestCallback) {
    return (
      <Button
        variant={"outline"}
        size={"sm"}
        className="flex justify-between items-center gap-1"
        onClick={() => deleteRequestCallback(requestCallback.id)}
      >
        <Trash2 size={16} />
        Delete
      </Button>
    );
  }
}
