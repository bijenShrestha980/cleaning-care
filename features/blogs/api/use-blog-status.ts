import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { BlogStatusUpdate } from "@/components/admin/data/schema";

const postBlogStatus = async ({
  id,
  data,
}: {
  id: number | string;
  data: BlogStatusUpdate;
}) => {
  const response = await axios.post(`/blogs-status/${id}`, data);
  return response.data ?? response;
};

export const useBlogStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["blog-status"],
    mutationFn: postBlogStatus,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blogs"] });
        await queryClient.invalidateQueries({ queryKey: ["blog"] });
        toast({ title: "Status updated successfully" });
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
