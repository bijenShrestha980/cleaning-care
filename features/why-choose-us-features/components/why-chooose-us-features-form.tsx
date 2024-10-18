"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { LoaderCircle, User } from "lucide-react";

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
import {
  WhyChooseUsFeatures,
  whyChooseUsFeaturesSchema,
} from "@/components/admin/data/schema";
import { useUpdateWhyChooseUsFeatures } from "../api/use-update-feature";
import { useDeleteWhyChooseUsFeatures } from "../api/use-delete-feature";
import { useCreateWhyChooseUsFeatures } from "../api/use-create-feature";

const FeaturesForm = ({
  whyChooseUs,
  id,
}: {
  whyChooseUs?: WhyChooseUsFeatures;
  id?: string | number;
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    whyChooseUs?.icon_url || null
  );
  const { mutate: createWhyChooseUsFeatures, isPending: createIsPending } =
    useCreateWhyChooseUsFeatures();
  const { mutate: updateWhyChooseUsFeatures, isPending: updateIsPending } =
    useUpdateWhyChooseUsFeatures(id);
  const { mutate: deleteWhyChooseUsFeatures, isPending: deleteIsPending } =
    useDeleteWhyChooseUsFeatures();

  const formSchema = whyChooseUsFeaturesSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feature_title: whyChooseUs?.feature_title || "",
      feature_short_description: whyChooseUs?.feature_short_description || "",
      icon: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    // Object.entries(values).forEach(([key, value]) => {
    //   formData.append(key, value as any);
    // });
    formData.append("feature_title", values.feature_title);
    formData.append(
      "feature_short_description",
      values.feature_short_description
    );
    values.icon && formData.append("icon", values.icon);
    if (id) {
      updateWhyChooseUsFeatures({ data: formData as any, id });
    } else {
      createWhyChooseUsFeatures(formData as any);
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
          name="feature_title"
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
          name="icon"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">Icon</FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                        className="w-fit"
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
        <FormField
          control={form.control}
          name="feature_short_description"
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
              className="w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
              onClick={() => deleteWhyChooseUsFeatures(id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
          )}
          <Link
            href="/admin/dashboard/why-choose-us"
            className="w-full sm:w-[86px]"
          >
            <Button
              variant={"outline"}
              animation={"scale_in"}
              className="w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
            >
              Cancle
            </Button>
          </Link>
          <Button
            type="submit"
            animation={"scale_in"}
            className="w-[86px]"
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

export default FeaturesForm;
