import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const deleteBlog = async (id: number | string) => {
  const response = await axios.delete(`/blogs/${id}`);
  return response.data ?? response;
};

export const useDeleteBlog = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["all-blogs"],
    mutationFn: deleteBlog,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blogs"] });
        toast({ title: "Deleted Successfully", variant: "default" });
        router.push("/cleaning-care-admin/dashboard/blog/blog-list");
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
