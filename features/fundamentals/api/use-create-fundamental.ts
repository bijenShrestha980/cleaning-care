import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { SiteAdmin } from "@/components/admin/data/schema";

const postFundamental = async (data: SiteAdmin) => {
  const response = await axios.post("/fundamental-section", data);
  return response.data;
};

export const useCreateFundamental = () => {
  return useMutation({
    mutationKey: ["fundamental"],
    mutationFn: postFundamental,
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
          description: "Changes saved successfully",
          variant: "default",
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
