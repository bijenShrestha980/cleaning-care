import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import {
  HeroSection,
  WhyChooseUsFeatures,
} from "@/components/admin/data/schema";

const getWhyChooseUsFeatures = async (query?: QueryParams) => {
  const response = await axios.get(
    `/why-choose-us-features?${createQueryParams(query || {})}`
  );
  return response.data as WhyChooseUsFeatures[];
};

// const getHeroSection = async (id: number) => {
//   const response = await axios.get(`/hero-section/${id}`);
//   return response.data as HeroSection;
// };

export const useWhyChooseUsFeatures = (query?: QueryParams) =>
  useQuery({
    queryKey: ["why-choose-us-features", query],
    queryFn: () => getWhyChooseUsFeatures(query || {}),
  });

// export const useHeroSection = (id: number) =>
//   useQuery({
//     queryKey: ["hero-sections", id],
//     queryFn: () => getHeroSection(id),
//   });
