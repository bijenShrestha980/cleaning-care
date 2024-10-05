import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { RequestCallback } from "@/components/admin/data/schema";

const postRequestCallback = async ({
  data,
  id,
}: {
  data: RequestCallback;
  id: number | string;
}) => {
  const response = await axios.post(`/request-callback/${id}`, data);
  return response.data;
};

export const useUpdateRequestCallback = (id: number | string | undefined) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["request-callback", id],
    mutationFn: postRequestCallback,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/request-callback");
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
