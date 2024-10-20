import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { AboutUs } from "@/components/admin/data/schema";

const getAllAboutUs = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-about-us?${createQueryParams(query || {})}`
  );
  return response.data as AboutUs;
};

const getAboutUs = async (query?: QueryParams) => {
  const response = await axios.get(
    `/about-us?${createQueryParams(query || {})}`
  );
  return response.data as AboutUs[];
};

export const useAllAboutUs = (query?: QueryParams) =>
  useQuery({
    queryKey: ["about-us", query],
    queryFn: () => getAllAboutUs(query || {}),
  });

export const useAboutUs = (query?: QueryParams) =>
  useQuery({
    queryKey: ["about-us", query],
    queryFn: () => getAboutUs(query || {}),
  });
