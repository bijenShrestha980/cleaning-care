import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteWhyChooseUs = async (id: number | string) => {
  const response = await axios.delete(`/why-choose-us/${id}`);
  return response.data;
};

export const useDeleteWhyChooseUs = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["why-choose-us"],
    mutationFn: deleteWhyChooseUs,
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
        router.push("/cleaning-care-admin/dashboard/why-choose-us/heading");
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
