import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { quoteStatusSchema } from "@/components/admin/data/schema";
import { Quote } from "@/components/admin/data/schema";

const postUserQuote = async ({
  data,
  id,
}: {
  data: Quote;
  id: number | string;
}) => {
  const response = await axios.post(`/user-send-quote/${id}`, data);
  return response.data;
};

const postUserQuoteStatus = async ({
  data,
  id,
}: {
  data: {
    status: typeof quoteStatusSchema;
  };
  id: number | string;
}) => {
  const response = await axios.post(`/update-user-quote-status/${id}`, data);
  return response.data;
};

export const useUpdateUserQuote = (id: number | string | undefined) => {
  return useMutation({
    mutationKey: ["user-quote", id],
    mutationFn: postUserQuote,
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
          description: "Quote sent successfully",
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

export const useUpdateUserQuoteStatus = (id: number | string | undefined) => {
  return useMutation({
    mutationKey: ["user-quote", id],
    mutationFn: postUserQuoteStatus,
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
          description: "Quote sent successfully",
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
