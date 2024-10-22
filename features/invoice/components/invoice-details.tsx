"use client";
import { DataTable } from "@/components/ui/data-table";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { invoiceColumns } from "@/components/admin/module/invoice-columns";
import { useAllInvoice } from "../api/use-invoice";

const InvoiceDetails = () => {
  const {
    data: invoiceData,
    isPending: invoiceIsPending,
    isError: invoiceIsError,
  } = useAllInvoice();

  if (invoiceIsPending) {
    return <Loading />;
  }
  if (invoiceIsError) {
    return <Error />;
  }
  return <DataTable data={invoiceData} columns={invoiceColumns} />;
};

export default InvoiceDetails;
