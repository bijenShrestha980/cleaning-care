import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { AboutUs } from "@/components/admin/data/schema";

const putAboutUs = async ({
  data,
  id,
}: {
  data: AboutUs;
  id: number | string;
}) => {
  const response = await axios.post(`/about-us/${id}`, data);
  return response.data;
};

export const useUpdateAboutUs = (id: number | string | undefined) => {
  return useMutation({
    mutationKey: ["about-us", id],
    mutationFn: putAboutUs,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Changes saved successfully",
          variant: "default",
        });
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
