"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useLogin } from "@/feature/auth/api/use-login";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // const { mutate: login, data, isPending, context } = useLogin();

  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, {
        message: "Password is required",
      })
      .max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // login(values);
    router.push("/admin/dashboard");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full md:w-[332px] select-none"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full relative">
                  <Input
                    placeholder="Password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className=" mb-[16px]"
                  />
                  {showPassword ? (
                    <EyeIcon
                      height={16}
                      width={16}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      height={16}
                      width={16}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          className="BodyText-Medium flex justify-center pt-4 pb-2"
          href="forgot-password"
        >
          Forgot Password?
        </Link>
        <Button
          type="submit"
          // variant={"secondary"}
          animation={"scale_in"}
          size={"lg"}
          className="w-full"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
