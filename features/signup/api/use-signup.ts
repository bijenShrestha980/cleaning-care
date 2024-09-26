import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { axios } from "@/lib/axios";

interface SignupDTO {
  email: string;
  password: string;
}

const signup = async (credentials: SignupDTO) => {
  axios.post("/posts", credentials).then((res) => {
    return res.data as unknown as number;
  });
};

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data, "data");
      // router.replace("/");
    },
    onError: (error) => {
      console.log("first", error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
