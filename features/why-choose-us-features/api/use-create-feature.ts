import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { WhyChooseUsFeatures } from "@/components/admin/data/schema";

const postWhyChooseUsFeatures = async (data: WhyChooseUsFeatures) => {
  const response = await axios.post("/why-choose-us-features", data);
  return response.data;
};

export const useCreateWhyChooseUsFeatures = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["why-choose-us-features"],
    mutationFn: postWhyChooseUsFeatures,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/why-choose-us");
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
