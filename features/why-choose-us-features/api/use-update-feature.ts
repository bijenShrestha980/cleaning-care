import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { WhyChooseUsFeatures } from "@/components/admin/data/schema";

const postWhyChooseUsFeatures = async ({
  data,
  id,
}: {
  data: WhyChooseUsFeatures;
  id: number | string;
}) => {
  const response = await axios.post(`/why-choose-us-features/${id}`, data);
  return response.data;
};

export const useUpdateWhyChooseUsFeatures = (
  id: number | string | undefined
) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["why-choose-us-features", id],
    mutationFn: postWhyChooseUsFeatures,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/why-choose-us-features");
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
