import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { axios, axiosLocal } from "@/lib/axios";

interface LoginDTO {
  email: string;
  password: string;
}

const login = async (credentials: LoginDTO) => {
  const response = await axios.post("/login", credentials);
  return response.data;
};

const createSession = async (data: any) => {
  const response = await axiosLocal.post("/session", {
    data,
  });
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.error) {
        toast({
          title: "Sign in failed",
          description: data?.error,
          variant: "destructive",
        });
      } else {
        try {
          await createSession(data.token);
          router.push("/cleaning-care-admin/dashboard");
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    onError: (error) => {
      console.log("first", error);
      toast({
        title: "Sign in failed",
        description: error?.message,
        variant: "destructive",
      });
    },
  });
};
