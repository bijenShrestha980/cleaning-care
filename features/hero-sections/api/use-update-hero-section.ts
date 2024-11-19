import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { HeroSection } from "@/components/admin/data/schema";

const postHeroSection = async ({
  data,
  id,
}: {
  data: HeroSection;
  id: number | string;
}) => {
  const response = await axios.post(`/hero-sections/${id}`, data);
  return response.data;
};

export const useUpdateHeroSection = (id: number | string | undefined) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["hero-sections", id],
    mutationFn: postHeroSection,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        router.push("/cleaning-care-admin/dashboard/settings/landing-page");
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
