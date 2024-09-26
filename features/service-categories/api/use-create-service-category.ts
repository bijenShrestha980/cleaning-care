import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { ServiceCategory } from "@/components/admin/data/schema";

const postServiceCategory = async (data: ServiceCategory) => {
  const response = await axios.post("/service-category", data);
  return response.data;
};

export const useCreateServiceCategory = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["service-category"],
    mutationFn: postServiceCategory,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/service/service-list");
      }
    },
    onError: (error) => {
      console.log("first", error);
      //@ts-ignore
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    },
  });
};
