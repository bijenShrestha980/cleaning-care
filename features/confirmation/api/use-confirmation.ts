import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getAcceptConfirmation = async (id: number | string) => {
  const response = (await axios.get(`/accept-confirmation/${id}`)) as any;
  return response;
};

const getDeclinedConfirmation = async (id: number | string) => {
  const response = (await axios.get(`/decline-confirmation/${id}`)) as any;
  return response;
};

export const useAcceptConfirmation = (id: number | string) =>
  useQuery({
    queryKey: ["confirmation"],
    queryFn: () => getAcceptConfirmation(id),
    enabled: false,
  });

export const useDeclinedConfirmation = (id: number | string) =>
  useQuery({
    queryKey: ["confirmation"],
    queryFn: () => getDeclinedConfirmation(id),
    enabled: false,
  });
