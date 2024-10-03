import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { HeroSection } from "@/components/admin/data/schema";

const getAllHeroSection = async (query?: QueryParams) => {
  const response = await axios.get(
    `/hero-sections?${createQueryParams(query || {})}`
  );
  return response.data as HeroSection[];
};

const getHeroSection = async (id: number) => {
  const response = await axios.get(`/hero-sections/${id}`);
  return response.data as HeroSection;
};

export const useAllHeroSection = (query?: QueryParams) =>
  useQuery({
    queryKey: ["hero-sections", query],
    queryFn: () => getAllHeroSection(query || {}),
  });

export const useHeroSection = (id: number) =>
  useQuery({
    queryKey: ["hero-sections", id],
    queryFn: () => getHeroSection(id),
  });
