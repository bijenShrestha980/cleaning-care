import { useRouter } from "next/navigation";
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
  const response = (await axios.post(`/invoices/${id}/generate`, data)) as {
    invoice: Invoice;
    success: boolean;
    message: string;
    error: boolean;
  };
  return response;
};

const postInvoiceSearch = async (data: Invoice) => {
  const response = await axios.post("/invoices/search", data);
  return response.data;
};

export const useCreateInvoice = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["invoice", "user-quote"],
    mutationFn: postInvoice,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Invoice generated successfully",
        });
        router.push("/cleaning-care-admin/dashboard/quote");
      }
    },
    onError: (error) => {
      console.log("first", error);
      toast({
        title: "Error",
        //@ts-ignore
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCreateInvoiceToUser = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["user-quote"],
    mutationFn: postInvoiceSearch,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Invoice sent to user successfully",
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
