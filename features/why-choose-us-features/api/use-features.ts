import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { WhyChooseUsFeatures } from "@/components/admin/data/schema";

const getAllWhyChooseUsFeatures = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-why-choose-us-features?${createQueryParams(query || {})}`
  );
  return response.data as WhyChooseUsFeatures[];
};

const getWhyChooseUsFeatures = async (query?: QueryParams) => {
  const response = await axios.get(
    `/why-choose-us-features?${createQueryParams(query || {})}`
  );
  return response.data as WhyChooseUsFeatures[];
};

const getWhyChooseUsFeaturesById = async (id: number) => {
  const response = await axios.get(`/why-choose-us-features/${id}`);
  return response.data as WhyChooseUsFeatures;
};

export const useAllWhyChooseUsFeatures = (query?: QueryParams) =>
  useQuery({
    queryKey: ["why-choose-us-features", query],
    queryFn: () => getAllWhyChooseUsFeatures(query || {}),
  });

export const useWhyChooseUsFeatures = (query?: QueryParams) =>
  useQuery({
    queryKey: ["why-choose-us-features", query],
    queryFn: () => getWhyChooseUsFeatures(query || {}),
  });

export const useWhyChooseUsFeaturesById = (id: number) =>
  useQuery({
    queryKey: ["why-choose-us-features", id],
    queryFn: () => getWhyChooseUsFeaturesById(id),
  });
