import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { Service } from "@/components/admin/data/schema";

const postService = async (data: Service) => {
  const response = await axios.post("/service", data);
  return response.data;
};

export const useCreateService = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["service"],
    mutationFn: postService,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        router.push("/cleaning-care-admin/dashboard/service/service-list");
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
