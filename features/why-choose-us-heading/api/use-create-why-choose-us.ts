import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { WhyChooseUs } from "@/components/admin/data/schema";

const postWhyChooseUs = async (data: WhyChooseUs) => {
  const response = await axios.post("/why-choose-us", data);
  return response.data;
};

export const useCreateWhyChooseUs = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["why-choose-us"],
    mutationFn: postWhyChooseUs,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
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
