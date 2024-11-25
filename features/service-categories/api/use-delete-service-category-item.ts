import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteServiceCategoryItem = async (id: number | string) => {
  const response = await axios.delete(`/service-category-item/${id}`);
  return response.data;
};

export const useDeleteServiceCategoryItem = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["all-categories"],
    mutationFn: deleteServiceCategoryItem,
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
        router.push("/cleaning-care-admin/dashboard/service/categories");
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
