import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { WhyChooseUs } from "@/components/admin/data/schema";

const postWhyChooseUs = async ({
  data,
  id,
}: {
  data: WhyChooseUs;
  id: number | string;
}) => {
  const response = await axios.post(`/why-choose-us/${id}`, data);
  return response.data;
};

export const useUpdateWhyChooseUs = (id: number | string | undefined) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["why-choose-us", id],
    mutationFn: postWhyChooseUs,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/why-choose-us/heading");
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
