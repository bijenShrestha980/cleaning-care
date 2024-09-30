import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { Service } from "@/components/admin/data/schema";

const postService = async ({
  data,
  id,
}: {
  data: Service;
  id: number | string;
}) => {
  const response = await axios.post(`/service/${id}`, data);
  return response.data;
};

export const useUpdateService = (id: number | string | undefined) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["service", id],
    mutationFn: postService,
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
      toast({
        title: "Error",
        //@ts-ignore
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    },
  });
};
