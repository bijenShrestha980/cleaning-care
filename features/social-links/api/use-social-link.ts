import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { SocialLinks } from "@/components/admin/data/schema";

const getAllSocialLinks = async (query?: QueryParams) => {
  const response = await axios.get(
    `/social-links?${createQueryParams(query || {})}`
  );
  return response.data as SocialLinks[];
};

export const useAllSocialLinks = (query?: QueryParams) =>
  useQuery({
    queryKey: ["social-links", query],
    queryFn: () => getAllSocialLinks(query || {}),
  });
