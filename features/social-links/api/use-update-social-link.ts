import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { SocialLinks } from "@/components/admin/data/schema";

const postSocialLinks = async ({
  data,
  id,
}: {
  data: SocialLinks;
  id: number | string;
}) => {
  const response = await axios.post(`/social-links/${id}`, data);
  return response.data;
};

export const useUpdateSocialLinks = (id: number | string | undefined) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["social-links", id],
    mutationFn: postSocialLinks,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        router.push("/cleaning-care-admin/dashboard/settings/fundamental");
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
