import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { ServiceCategory } from "@/components/admin/data/schema";

const getAllServiceCategories = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-service-category?${createQueryParams(query || {})}`
  );
  return response.data as ServiceCategory[];
};

const getServiceCategories = async (query?: QueryParams) => {
  const response = await axios.get(
    `/service-category?${createQueryParams(query || {})}`
  );
  return response.data as ServiceCategory[];
};

const getServiceCategory = async (id: number) => {
  const response = await axios.get(`/service-category/${id}`);
  return response.data as ServiceCategory;
};

export const useAllServiceCategories = (query?: QueryParams) =>
  useQuery({
    queryKey: ["service-category", query],
    queryFn: () => getAllServiceCategories(query || {}),
  });

export const useServiceCategories = (query?: QueryParams) =>
  useQuery({
    queryKey: ["service-category", query],
    queryFn: () => getServiceCategories(query || {}),
  });

export const useServiceCategory = (id: number) =>
  useQuery({
    queryKey: ["service-category", id],
    queryFn: () => getServiceCategory(id),
  });
