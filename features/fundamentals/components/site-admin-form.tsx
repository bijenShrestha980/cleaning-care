"use client";

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
import GoogleMapComponent from "@/components/map";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { SiteAdmin, siteAdminSchema } from "@/components/admin/data/schema";
import { useCreateFundamental } from "@/features/fundamentals/api/use-create-fundamental";
import { useAllFundamental } from "@/features/fundamentals/api/use-fundamental";

const SiteAdminComp = () => {
  const { data: fundamentals, isPending, isError } = useAllFundamental();

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <SiteAdminForm
      site_title={fundamentals[0]?.site_title}
      site_address={fundamentals[0]?.site_address}
      email1={fundamentals[0]?.email1}
      email2={fundamentals[0]?.email2}
      contact_number1={fundamentals[0]?.contact_number1}
      contact_number2={fundamentals[0]?.contact_number2}
      open_day={fundamentals[0]?.open_day}
      open_time={fundamentals[0]?.open_time}
      site_logo={null}
      image_url={fundamentals[0]?.image_url}
      copyright={fundamentals[0]?.copyright}
      google_map={fundamentals[0]?.google_map}
      term_condition={fundamentals[0]?.term_condition}
      privacy_policy={fundamentals[0]?.privacy_policy}
      license={fundamentals[0]?.license}
    />
  );
};

const SiteAdminForm = ({
  site_title,
  site_address,
  email1,
  email2,
  contact_number1,
  contact_number2,
  open_day,
  open_time,
  site_logo,
  image_url,
  copyright,
  google_map,
  term_condition,
  privacy_policy,
  license,
}: SiteAdmin) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    image_url || null
  );
  const { mutate: createFundamental, isPending: createIsPending } =
    useCreateFundamental();

  const formSchema = siteAdminSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      site_title: site_title || "",
      site_address: site_address || "",
      email1: email1 || "",
      email2: email2 || "",
      contact_number1: contact_number1 || "",
      contact_number2: contact_number2 || "",
      open_day: open_day || "",
      open_time: open_time || "",
      site_logo: null,
      copyright: copyright || "",
      google_map: google_map || "",
      term_condition: term_condition || "",
      privacy_policy: privacy_policy || "",
      license: license || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "site_logo") {
        formData.append(key, value as File);
      } else {
        formData.append(key, value as string);
      }
    });
    // @ts-ignore
    createFundamental(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="site_title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Site title</FormLabel>
              <FormControl>
                <Input placeholder="Site title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="site_address"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 w-full select-none">
          <FormField
            control={form.control}
            name="email1"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel className="font-normal text-sm">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email2"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full select-none">
          <FormField
            control={form.control}
            name="contact_number1"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel className="font-normal text-sm">
                  Contact for Customer
                </FormLabel>
                <FormControl>
                  <Input placeholder="Contact" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_number2"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <Input placeholder="Contact" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="site_logo"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
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
        <FormField
          control={form.control}
          name="google_map"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Location</FormLabel>
              <FormControl>
                <div
                  id="map"
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <GoogleMapComponent />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span />
        <span />

        <FormField
          control={form.control}
          name="copyright"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Copyright</FormLabel>
              <FormControl>
                <Textarea placeholder="Copyright" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="term_condition"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Term & Condition
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Term & Condition" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy_policy"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Privacy policy
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Privacy policy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">License</FormLabel>
              <FormControl>
                <Textarea placeholder="License" {...field} />
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
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SiteAdminComp;
