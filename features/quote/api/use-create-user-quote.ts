import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { Quote } from "@/components/admin/data/schema";

const postQuote = async (data: Quote) => {
  const response = await axios.post("/user-send-quote", data);
  return response.data;
};

const postQuoteToUser = async (data: Quote) => {
  const response = await axios.post("/send-quote-to-user", data);
  return response.data;
};

export const useCreateQuote = () => {
  return useMutation({
    mutationKey: ["user-quote"],
    mutationFn: postQuote,
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
          description: "Quote sent successfully",
        });
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

export const useCreateQuoteToUser = () => {
  return useMutation({
    mutationKey: ["user-quote"],
    mutationFn: postQuoteToUser,
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
          description: "Quote sent to user successfully",
        });
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
