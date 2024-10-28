import { useQuery } from "@tanstack/react-query";
import { axios, clearSessionCache } from "@/lib/axios";

const getLogout = async () => {
  const response = await axios.get("/logout");
  clearSessionCache();
  return response.data;
};

export const useLogout = () =>
  useQuery({
    queryKey: ["logout"],
    queryFn: () => getLogout(),
    enabled: false,
  });
