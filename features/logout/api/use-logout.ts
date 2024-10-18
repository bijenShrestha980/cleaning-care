import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getLogout = async () => {
  const response = await axios.get("/logout");
  return response.data;
};

export const useLogout = () =>
  useQuery({
    queryKey: ["logout"],
    queryFn: () => getLogout(),
    enabled: false,
  });
