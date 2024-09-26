import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { ServiceCategory } from "@/components/admin/data/schema";

const getAllServiceCategory = async (query?: QueryParams) => {
  const response = await axios.get(
    `/service-category?${createQueryParams(query || {})}`
  );
  return response.data as ServiceCategory[];
};

const getServiceCategory = async (id: number) => {
  const response = (await axios.get(`/show-category/${id}`)) as ServiceCategory;
  return response;
};

export const useAllServiceCategory = (query?: QueryParams) =>
  useQuery({
    queryKey: ["service-category", query],
    queryFn: () => getAllServiceCategory(query || {}),
  });

export const useServiceCategory = (id: number) =>
  useQuery({
    queryKey: ["service-category", id],
    queryFn: () => getServiceCategory(id),
  });
