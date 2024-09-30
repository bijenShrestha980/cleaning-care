"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";

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
import { changePasswordSchema } from "@/components/admin/data/schema";
import { useCreateChangePassword } from "@/features/change-password/api/use-create-change-password";

const ChangePasswordForm = () => {
  const { mutate: createChangePassword, isPending: createIsPending } =
    useCreateChangePassword();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const formSchema = changePasswordSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createChangePassword(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-1 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">
                Current password
              </FormLabel>
              <FormControl>
                <div className="w-full md:w-[527px] relative">
                  <Input
                    placeholder="Current password"
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
          name="new_password"
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
          name="new_password_confirmation"
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
          <Button
            type="submit"
            animation={"scale_in"}
            disabled={createIsPending}
          >
            {createIsPending ? (
              <LoaderCircle className="animate-spin" width={20} height={20} />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
