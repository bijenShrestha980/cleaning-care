import { useQuery } from "@tanstack/react-query";
import download from "downloadjs";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { Invoice } from "@/components/admin/data/schema";

const getAllInvoice = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-all-invoices?${createQueryParams(query || {})}`
  );
  return response.data as Invoice[];
};

const getInvoiceById = async (id: number) => {
  const response = await axios.get(`/get-invoices/${id}`);
  return response.data as Invoice;
};

const getInvoiceSend = async (id: number) => {
  const response = await axios.get(`/invoices/${id}/send`);
  return response.data as Invoice;
};

const getInvoiceDownload = async (id: number) => {
  const response = (await axios.get(`/invoices/${id}/download`)) as Blob;
  download(response, `invoice_${id}.pdf`, "application/pdf");
};

export const useAllInvoice = (query?: QueryParams) =>
  useQuery({
    queryKey: ["invoice", query],
    queryFn: () => getAllInvoice(query || {}),
  });

export const useInvoiceById = (id: number) =>
  useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
  });

export const useInvoiceSend = (id: number) =>
  useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceSend(id),
    enabled: false,
  });

export const useInvoiceDownload = (id: number) =>
  useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceDownload(id),
    enabled: false,
  });
