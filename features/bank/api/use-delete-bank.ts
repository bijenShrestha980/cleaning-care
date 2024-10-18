import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteBankAccountDetails = async (id: number | string) => {
  const response = await axios.delete(`/bank-account-details/${id}`);
  return response.data;
};

export const useDeleteBankAccountDetails = () => {
  return useMutation({
    mutationKey: ["bank-account-details"],
    mutationFn: deleteBankAccountDetails,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Deleted Successfully",
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
