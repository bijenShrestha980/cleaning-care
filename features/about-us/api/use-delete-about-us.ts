import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteAboutUs = async (id: number | string) => {
  const response = await axios.delete(`/about-us/${id}`);
  return response.data;
};

export const useDeleteAboutUs = () => {
  return useMutation({
    mutationKey: ["about-us"],
    mutationFn: deleteAboutUs,
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
