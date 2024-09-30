import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { Service } from "@/components/admin/data/schema";

const getAllService = async (query?: QueryParams) => {
  const response = await axios.get(
    `/service?${createQueryParams(query || {})}`
  );
  return response.data as Service[];
};

const getService = async (id: number) => {
  const response = (await axios.get(`/show/${id}`)) as Service;
  return response;
};

export const useAllService = (query?: QueryParams) =>
  useQuery({
    queryKey: ["service", query],
    queryFn: () => getAllService(query || {}),
  });

export const useService = (id: number) =>
  useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id),
  });
