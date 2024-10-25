import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteRequestCallback = async (id: number | string) => {
  const response = await axios.delete(`/delete-request-callback/${id}`);
  return response.data;
};

export const useDeleteRequestCallback = (id: any) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["request-callback"],
    mutationFn: deleteRequestCallback,
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
        router.push("/admin/dashboard/request-callback");
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
