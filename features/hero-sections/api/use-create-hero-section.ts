import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";
import { HeroSection } from "@/components/admin/data/schema";

const postHeroSection = async (data: HeroSection) => {
  const response = await axios.post("/hero-sections", data);
  return response.data;
};

export const useCreateHeroSection = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["hero-sections"],
    mutationFn: postHeroSection,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        router.push("/admin/dashboard/settings/landing-page");
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
