import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
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
        // if (id !== undefined) {
        //   queryClient.invalidateQueries(["service-category", id]);
        // }
        router.push("/cleaning-care-admin/dashboard/service/categories");
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        //@ts-ignore
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });
};
