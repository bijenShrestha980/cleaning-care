"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

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
import { User } from "lucide-react";
import GoogleMapComponent from "@/components/map";

const SiteAdminForm = () => {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const formSchema = z.object({
    title: z.string(),
    address: z.string(),
    email: z.string().email(),
    contact: z.string(),
    logo: z.custom<File>((v) => v instanceof File, {
      message: "Logo is required",
    }),
    profile: z.custom<File>((v) => v instanceof File, {
      message: "Profile immage is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      email: "",
      contact: "",
      logo: undefined,
      profile: undefined,
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
          name="title"
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
          name="address"
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
        <FormField
          control={form.control}
          name="email"
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
        <div className="grid grid-cols-1 gap-4 w-full select-none">
          <FormField
            control={form.control}
            name="contact"
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
            name="contact"
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
          name="logo"
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
          name="profile"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Admin profile
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
                          setProfilePreview(
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
          name="contact"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Location</FormLabel>
              <FormControl>
                <GoogleMapComponent />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span />
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

export default SiteAdminForm;
