import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { SocialLinks } from "@/components/admin/data/schema";

const postSocialLinks = async (data: SocialLinks) => {
  const response = await axios.post("/social-links", data);
  return response.data;
};

export const useCreateSocialLinks = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["social-links"],
    mutationFn: postSocialLinks,
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
