import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";

const readNotification = async ({
  data,
  id,
}: {
  data: any;
  id: number | string;
}) => {
  const response = await axios.post(`/notifications/${id}/read`, data);
  return response.data;
};

export const useReadNotification = () => {
  return useMutation({
    mutationKey: ["notifications"],
    mutationFn: readNotification,
    onSuccess: async (data) => {
      if (data?.error || data?.success === false) {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      } else {
        // toast({
        //   title: "Success",
        //   description: "Invoice generated successfully",
        // });
        // router.push("/cleaning-care-admin/dashboard/quote");
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
