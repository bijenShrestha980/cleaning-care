import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { BankAccountDetails } from "@/components/admin/data/schema";

const postBankAccountDetails = async (data: BankAccountDetails) => {
  const response = await axios.post("/bank-account-details", data);
  return response.data;
};

export const useCreateBankAccountDetails = () => {
  return useMutation({
    mutationKey: ["bank-account-details"],
    mutationFn: postBankAccountDetails,
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
