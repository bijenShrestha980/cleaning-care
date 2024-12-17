"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { requestCallbackSchema } from "@/components/admin/data/schema";
import { useCreateRequestCallback } from "../api/use-create-request-callback";

const RequestCallbackForm = () => {
  const {
    mutate: createRequestCallBack,
    isPending: createIsPending,
    isSuccess: createIsSuccess,
  } = useCreateRequestCallback();

  const formSchema = requestCallbackSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "+61",
    },
  });

  useEffect(() => {
    createIsSuccess && form.reset();
  }, [createIsSuccess, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createRequestCallBack(values);
  }

  return (
    <section className="w-full flex flex-col items-center">
      <div className="md-6 md:mb-12 max-w-[765px] flex flex-col items-center">
        <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-2 md:mb-3 text-center">
          Request a Callback
        </h4>
        <p className="text-primary text-base md:text-xl text-center">
          Fill up the form and our team will reach out ASAP.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:max-w-[900px] pt-6 md:pt-0 space-y-8 flex flex-col justify-center"
        >
          <div className="gap-4 grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#191919]">First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#191919]">Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#191919]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#191919]">Phone no.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant={"success"}
            size={"lg"}
            disabled={createIsPending}
            className="w-full h-[46px] rounded-xl"
          >
            {createIsPending ? (
              <LoaderCircle className="animate-spin" width={20} height={20} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default RequestCallbackForm;
