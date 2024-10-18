import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { AboutUs } from "@/components/admin/data/schema";

const postAboutUs = async (data: AboutUs) => {
  const response = await axios.post("/about-us", data);
  return response.data;
};

export const useCreateAboutUs = () => {
  return useMutation({
    mutationKey: ["about-us"],
    mutationFn: postAboutUs,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
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
