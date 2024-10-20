import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { WhyChooseUs } from "@/components/admin/data/schema";

const getAllWhyChooseUs = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-why-choose-us?${createQueryParams(query || {})}`
  );
  return response.data as WhyChooseUs[];
};

const getWhyChooseUs = async (query?: QueryParams) => {
  const response = await axios.get(
    `/why-choose-us?${createQueryParams(query || {})}`
  );
  return response.data as WhyChooseUs[];
};

const getWhyChooseUsById = async (id: number) => {
  const response = await axios.get(`/why-choose-us/${id}`);
  return response.data as WhyChooseUs;
};

export const useAllWhyChooseUs = (query?: QueryParams) =>
  useQuery({
    queryKey: ["why-choose-us", query],
    queryFn: () => getAllWhyChooseUs(query || {}),
  });

export const useWhyChooseUs = (query?: QueryParams) =>
  useQuery({
    queryKey: ["why-choose-us", query],
    queryFn: () => getWhyChooseUs(query || {}),
  });

export const useWhyChooseUsById = (id: number) =>
  useQuery({
    queryKey: ["why-choose-us", id],
    queryFn: () => getWhyChooseUsById(id),
  });
