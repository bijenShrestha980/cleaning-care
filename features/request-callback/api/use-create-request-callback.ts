import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { RequestCallback } from "@/components/admin/data/schema";

const postRequestCallback = async (data: RequestCallback) => {
  const response = await axios.post("/request-callback", data);
  return response.data;
};

export const useCreateRequestCallback = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["request-callback"],
    mutationFn: postRequestCallback,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
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
