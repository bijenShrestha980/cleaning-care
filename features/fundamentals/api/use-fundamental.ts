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
  const response = await axios.get(
    `/get-fundamental?${createQueryParams(query || {})}`
  );
  return response.data as SiteAdmin;
};

export const useFundamentals = (query?: QueryParams) =>
  useQuery({
    queryKey: ["fundamental", query],
    queryFn: () => getFundamentals(query || {}),
  });

export const useAllFundamental = (query?: QueryParams) =>
  useQuery({
    queryKey: ["fundamental", query],
    queryFn: () => getAllFundamental(query || {}),
  });

export const fetchAllFundamental = async () => {
  const response = await fetch(`${process.env.url}/api/get-fundamental`, {
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data.data as SiteAdmin;
};
