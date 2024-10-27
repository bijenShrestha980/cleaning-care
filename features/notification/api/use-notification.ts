import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryParams } from "@/types";
import { createQueryParams } from "@/lib/create-query-params";

const getAllNotification = async () => {
  const response = await axios.get(`/all-notifications/read`);
  return response.data as any;
};

const getNotification = async (query?: QueryParams) => {
  const response = await axios.get(
    `/notifications?${createQueryParams(query || {})}`
  );
  return response.data.data as any;
};

export const useAllNotification = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotification(),
  });

export const useNotification = (query?: QueryParams) =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotification(query || {}),
    staleTime: 60 * 1000,
    // enabled: false,
  });
