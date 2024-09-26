import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { ServiceCategory } from "@/components/admin/data/schema";

const postServiceCategory = async ({
  data,
  id,
}: {
  data: ServiceCategory;
  id: number | string;
}) => {
  const response = await axios.post(`/service-category/${id}`, data);
  return response.data;
};

export const useUpdateServiceCategory = (id: number | string | undefined) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["service-category", id],
    mutationFn: postServiceCategory,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/service/service-list");
      }
    },
    onError: (error) => {
      console.log("first", error);
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    },
  });
};
