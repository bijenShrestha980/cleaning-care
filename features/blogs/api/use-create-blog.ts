import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";

const postBlog = async (data: FormData) => {
  const response = await axios.post("/store-blogs", data);
  return response.data ?? response;
};

export const useCreateBlog = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["blog"],
    mutationFn: postBlog,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["blogs"] });
        toast({ title: "Blog created successfully" });
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
