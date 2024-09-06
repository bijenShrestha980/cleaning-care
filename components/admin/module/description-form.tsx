"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { User } from "lucide-react";

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

const DescriptionForm = () => {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const formSchema = z.object({
    heading: z.string(),
    description: z.string(),
    image: z.custom<File>((v) => v instanceof File).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      description: "",
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Heading</FormLabel>
              <FormControl>
                <Input placeholder="Heading" {...field} />
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

        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Site logo
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-[50px] h-[50px] rounded-lg hidden sm:flex items-center justify-center bg-[#ecedee] overflow-hidden">
                      <User className="text-[#596579] h-6 w-6" />
                    </div>
                    <FormControl>
                      <Input
                        type="file"
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(e.target.files?.[0]);
                          setLogoPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                        // className="w-fit"
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <FormLabel className="font-normal text-sm">
                    Image (Preview)
                  </FormLabel>
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="logo"
                      width={64}
                      height={64}
                      className="mt-2 rounded-sm w-[64px] h-[64px] object-cover object-center"
                    />
                  ) : (
                    <User
                      size={64}
                      className="mt-2 rounded-sm w-[64px] h-[64px] object-cover object-center"
                    />
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <span />
        <span />
        <div className="flex flex-wrap justify-end gap-4">
          <Button variant={"ghost"} animation={"scale_in"} className="w-[86px]">
            Delete
          </Button>
          <Button
            variant={"outline"}
            animation={"scale_in"}
            className="w-[86px]"
          >
            Cancle
          </Button>
          <Button type="submit" animation={"scale_in"} className="w-[86px]">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DescriptionForm;
