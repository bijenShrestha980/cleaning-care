"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ChangePasswordForm = () => {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const formSchema = z
    .object({
      oldPassword: z
        .string({
          required_error: "Old Password is required",
        })
        .min(1, {
          message: "Old Password is required",
        })
        .max(100),
      password: z
        .string({
          required_error: "New Password is required",
        })
        .min(1, {
          message: "New Password is required",
        })
        .max(100)
        .refine(
          (value) =>
            /^(?=.*\d)(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
              value
            ),
          {
            message:
              "New Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
          }
        ),
      confirmPassword: z
        .string({
          required_error: "Confirm Password is required",
        })
        .max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-1 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">
                Old password
              </FormLabel>
              <FormControl>
                <div className="w-full md:w-[527px] relative">
                  <Input
                    placeholder="Old password"
                    {...field}
                    type={showOldPassword ? "text" : "password"}
                  />
                  {showOldPassword ? (
                    <EyeIcon
                      height={16}
                      width={16}
                      color="#596579"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setShowOldPassword(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      height={16}
                      width={16}
                      color="#596579"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setShowOldPassword(true)}
                    />
                  )}
                </div>
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
              <FormLabel className="font-normal text-sm">
                New password
              </FormLabel>
              <FormControl>
                <div className="w-full md:w-[527px] relative">
                  <Input
                    placeholder="New password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                  {showPassword ? (
                    <EyeIcon
                      height={16}
                      width={16}
                      color="#596579"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      height={16}
                      width={16}
                      color="#596579"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">
                Confirm password
              </FormLabel>
              <FormControl>
                <div className="w-full md:w-[527px] relative">
                  <Input
                    placeholder="Confirm password"
                    className="w-full mb-[12px]"
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  {showConfirmPassword ? (
                    <EyeIcon
                      height={16}
                      width={16}
                      color="#596579"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setConfirmShowPassword(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      height={16}
                      width={16}
                      color="#596579"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer custom-transition hover:scale-105 active:scale-95"
                      onClick={() => setConfirmShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span />

        <div className="flex justify-end gap-4">
          <Button type="submit" animation={"scale_in"}>
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
