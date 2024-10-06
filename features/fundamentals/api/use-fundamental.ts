import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { SiteAdmin } from "@/components/admin/data/schema";

const getFundamentals = async (query?: QueryParams) => {
  const response = await axios.get(
    `/fundamental-section?${createQueryParams(query || {})}`
  );
  return response.data as SiteAdmin[];
};

const getAllFundamental = async (query?: QueryParams) => {
  const response = (await axios.get(
    `/get-fundamental?${createQueryParams(query || {})}`
  )) as SiteAdmin;
  return response;
};

export const useFundamentals = (query?: QueryParams) =>
  useQuery({
    queryKey: ["fundamental", query],
    queryFn: () => getFundamentals(query || {}),
  });

export const useAllFundamentals = (query?: QueryParams) =>
  useQuery({
    queryKey: ["fundamental", query],
    queryFn: () => getAllFundamental(query || {}),
  });
