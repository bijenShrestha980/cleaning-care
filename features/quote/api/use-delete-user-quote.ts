import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteQuote = async (id: number | string) => {
  const response = (await axios.delete(`/delete-usersent-quote/${id}`)) as any;
  return response;
};

export const useDeleteQuote = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["user-quote"],
    mutationFn: deleteQuote,
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
          description: data?.message,
          variant: "default",
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
