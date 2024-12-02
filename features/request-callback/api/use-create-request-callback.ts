import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { RequestCallback } from "@/components/admin/data/schema";

const postRequestCallback = async (data: RequestCallback) => {
  const response = (await axios.post("/request-callback", data)) as any;
  return response;
};

export const useCreateRequestCallback = () => {
  return useMutation({
    mutationKey: ["request-callback"],
    mutationFn: postRequestCallback,
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
          description: data?.message,
          variant: "default",
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
