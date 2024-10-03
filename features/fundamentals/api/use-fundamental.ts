import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { SiteAdmin } from "@/components/admin/data/schema";

const getAllFundamental = async (query?: QueryParams) => {
  const response = await axios.get(
    `/fundamental-section?${createQueryParams(query || {})}`
  );
  return response.data as SiteAdmin[];
};

export const useAllFundamental = (query?: QueryParams) =>
  useQuery({
    queryKey: ["fundamental", query],
    queryFn: () => getAllFundamental(query || {}),
  });
