import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { RequestCallback } from "@/components/admin/data/schema";

const getAllRequestCallbacks = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-all-request-callback?${createQueryParams(query || {})}`
  );
  return response.data as RequestCallback[];
};

const getRequestCallbacks = async (query?: QueryParams) => {
  const response = await axios.get(
    `/request-callback?${createQueryParams(query || {})}`
  );
  return response.data as RequestCallback[];
};

// const getRequestCallback = async (id: number) => {
//   const response = await axios.get(`/request-callback/${id}`);
//   return response.data as RequestCallback;
// };

export const useAllRequestCallbacks = (query?: QueryParams) =>
  useQuery({
    queryKey: ["request-callback", query],
    queryFn: () => getAllRequestCallbacks(query || {}),
  });

export const useRequestCallbacks = (query?: QueryParams) =>
  useQuery({
    queryKey: ["request-callback", query],
    queryFn: () => getRequestCallbacks(query || {}),
  });

// export const useRequestCallback = (id: number) =>
//   useQuery({
//     queryKey: ["request-callback", id],
//     queryFn: () => getRequestCallback(id),
//   });
