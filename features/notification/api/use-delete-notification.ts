import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteNotification = async (id: number | string) => {
  const response = (await axios.delete(`/notifications/${id}`)) as any;
  return response;
};

export const useDeleteNotification = () => {
  return useMutation({
    mutationKey: ["notifications"],
    mutationFn: deleteNotification,
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
