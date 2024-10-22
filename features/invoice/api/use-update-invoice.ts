import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { Invoice } from "@/components/admin/data/schema";

const postInvoice = async ({
  data,
  id,
}: {
  data: Invoice;
  id: number | string;
}) => {
  const response = await axios.post(`/update-invoice/${id}`, data);
  return response.data;
};

const postInvoiceSearch = async ({
  data,
  id,
}: {
  data: Invoice;
  id: number | string;
}) => {
  const response = await axios.post(`/invoices/search`, data);
  return response.data;
};

export const useUpdateInvoice = (id: number | string | undefined) => {
  return useMutation({
    mutationKey: ["invoice", id],
    mutationFn: postInvoice,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Invoice updated successfully",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        //@ts-ignore
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });
};

export const useInvoiceSearch = (id: number | string | undefined) => {
  return useMutation({
    mutationKey: ["invoice", id],
    mutationFn: postInvoiceSearch,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Invoice sent successfully",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        //@ts-ignore
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });
};
