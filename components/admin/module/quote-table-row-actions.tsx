"use client";

import { Row } from "@tanstack/react-table";

import * as React from "react";
import QuoteStatus from "@/features/quote/components/quote-status";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function QuoteTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const quote = row.original as any;

  if (quote) {
    return <QuoteStatus quote={quote} />;
  }
}
