"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhyChooseUs, whyChooseUsSchema } from "@/components/admin/data/schema";
import { useCreateWhyChooseUs } from "../api/use-create-why-choose-us";
import { useUpdateWhyChooseUs } from "../api/use-update-why-choose-us";
import { useDeleteWhyChooseUs } from "../api/use-delete-why-choose-us";

const WhyChooseUsForm = ({
  whyChooseUs,
  id,
}: {
  whyChooseUs?: WhyChooseUs;
  id?: string | number;
}) => {
  const { mutate: createWhyChooseUs, isPending: createIsPending } =
    useCreateWhyChooseUs();
  const { mutate: updateWhyChooseUs, isPending: updateIsPending } =
    useUpdateWhyChooseUs(id);
  const { mutate: deleteWhyChooseUs, isPending: deleteIsPending } =
    useDeleteWhyChooseUs();

  const formSchema = whyChooseUsSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: whyChooseUs?.title || "",
      short_description: whyChooseUs?.short_description || "",
      type: whyChooseUs?.type || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (id) {
      updateWhyChooseUs({ data: values, id });
    } else {
      createWhyChooseUs(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-[#A7B2C3] focus:bg-transparent [&>svg]:opacity-100 [&>svg]:text-[#5065F6]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="chooseus"
                      className="text-[#374253] focus:bg-grey-40"
                    >
                      Choose us
                    </SelectItem>
                    <SelectItem
                      value="values"
                      className="text-[#374253] focus:bg-grey-40"
                    >
                      Values
                    </SelectItem>
                    <SelectItem
                      value="bookservice"
                      className="text-[#374253] focus:bg-grey-40"
                    >
                      Book service
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="border-[#A7B2C3] focus:bg-grey-30"
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
          {id && (
            <Button
              variant={"ghost"}
              animation={"scale_in"}
              className="w-full md:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
              onClick={() => deleteWhyChooseUs(id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
          )}
          <Link
            href="/admin/dashboard/why-choose-us/heading"
            className="w-full md:w-[86px]"
          >
            <Button
              variant={"outline"}
              animation={"scale_in"}
              className="w-full md:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            animation={"scale_in"}
            className="w-full md:w-[86px]"
            disabled={createIsPending || updateIsPending || deleteIsPending}
          >
            {createIsPending || updateIsPending ? (
              <LoaderCircle className="animate-spin" width={20} height={20} />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WhyChooseUsForm;
