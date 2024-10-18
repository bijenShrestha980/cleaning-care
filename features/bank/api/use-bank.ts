import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { BankAccountDetails } from "@/components/admin/data/schema";

const getBankAccountDetails = async (query?: QueryParams) => {
  const response = await axios.get(
    `/bank-account-details?${createQueryParams(query || {})}`
  );
  return response.data as BankAccountDetails;
};

export const useBankAccountDetails = (query?: QueryParams) =>
  useQuery({
    queryKey: ["bank-account-details", query],
    queryFn: () => getBankAccountDetails(query || {}),
  });
