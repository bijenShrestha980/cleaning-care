import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { Quote } from "@/components/admin/data/schema";

const getAllQuote = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-usersent-quote?${createQueryParams(query || {})}`
  );
  return response.data as Quote[];
};

const getQuote = async (id: number) => {
  const response = await axios.get(`/get-usersent-quote/${id}`);
  return response.data as Quote;
};

export const useAllQuote = (query?: QueryParams) =>
  useQuery({
    queryKey: ["user-send-quote", query],
    queryFn: () => getAllQuote(query || {}),
  });

export const useQuote = (id: number) =>
  useQuery({
    queryKey: ["user-send-quote", id],
    queryFn: () => getQuote(id),
  });
