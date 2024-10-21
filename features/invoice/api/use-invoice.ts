import { useQuery } from "@tanstack/react-query";
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
