import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteHeroSection = async (id: number | string) => {
  const response = await axios.delete(`/hero-sections/${id}`);
  return response.data;
};

export const useDeleteHeroSection = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["hero-sections"],
    mutationFn: deleteHeroSection,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Deleted Successfully",
          variant: "default",
        });
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
