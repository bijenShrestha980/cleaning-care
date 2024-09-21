"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
// const CustomEditor = dynamic(() => import("@/components/editor"), {
//   ssr: false,
// });

const AboutForm = () => {
  const router = useRouter();

  const formSchema = z.object({
    heading: z.string({ required_error: "Heading is required" }),
    detail: z.string({ required_error: "Detail is required" }),
    description: z.string({ required_error: "Description is required" }),
    content: z.string({
      required_error: "Content is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: undefined,
      description: undefined,
      content: undefined,
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
          name="heading"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Heading</FormLabel>
              <FormControl>
                <Input placeholder="Heading here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Detail</FormLabel>
              <FormControl>
                <Textarea placeholder="Detail here" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description here" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Content</FormLabel>
              <FormControl>
                {/* <CustomEditor placeholder="Content here" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" animation={"scale_in"} className="w-[86px]">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AboutForm;
