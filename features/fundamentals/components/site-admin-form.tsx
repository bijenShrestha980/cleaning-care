"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, User } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import GoogleMapComponent from "@/components/map";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import CustomEditor from "@/components/editor";
import { SiteAdmin, siteAdminSchema } from "@/components/admin/data/schema";
import { Separator } from "@/components/ui/separator";
import { CustomImage } from "@/components/ui/custom-image";
import { useCreateFundamental } from "@/features/fundamentals/api/use-create-fundamental";
import { useAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import { quillModules } from "@/constants/quill-module";

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
      site_title={fundamentals?.site_title}
      site_address={fundamentals?.site_address}
      email1={fundamentals?.email1}
      email2={fundamentals?.email2}
      contact_number1={fundamentals?.contact_number1}
      contact_number2={fundamentals?.contact_number2}
      open_day={fundamentals?.open_day}
      open_time={fundamentals?.open_time}
      site_logo={null}
      image_url={fundamentals?.image_url}
      copyright={fundamentals?.copyright}
      google_map={
        typeof fundamentals?.google_map === "string"
          ? JSON.parse(fundamentals?.google_map)
          : fundamentals?.google_map
      }
      term_condition={fundamentals?.term_condition}
      privacy_policy={fundamentals?.privacy_policy}
      license={fundamentals?.license}
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
  const [time, setTime] = useState<string[]>(["09:00", "18:00"]);
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
      open_time: open_time || "09:00,18:00",
      site_logo: null,
      copyright: copyright || "",
      google_map: google_map || {
        lat: 43.734952570403,
        lng: -79.39714192370195,
      },
      term_condition: term_condition || "",
      privacy_policy: privacy_policy || "",
      license: license || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("site_title", values.site_title);
    formData.append("site_address", values.site_address);
    formData.append("email1", values.email1);
    values.email2 && formData.append("email2", values.email2);
    formData.append("contact_number1", values.contact_number1);
    values.contact_number2 &&
      formData.append("contact_number2", values.contact_number2);
    values.open_day && formData.append("open_day", values.open_day);
    values.open_time && formData.append("open_time", values.open_time);
    values.site_logo && formData.append("site_logo", values.site_logo);
    formData.append("copyright", values.copyright);
    formData.append("google_map", JSON.stringify(values.google_map));
    values.term_condition &&
      formData.append("term_condition", values.term_condition);
    values.privacy_policy &&
      formData.append("privacy_policy", values.privacy_policy);
    values.license && formData.append("license", values.license);

    createFundamental(formData as any);
  }

  useEffect(() => {
    form.setValue("open_time", time.join(","));
  }, [form, time]);

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
          name="copyright"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Copyright</FormLabel>
              <FormControl>
                <Input placeholder="Copyright" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    <CustomImage
                      src={logoPreview}
                      alt="logo"
                      fill
                      sizes="64px"
                      containerClassName="w-[64px] h-[64px]"
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
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <FormField
            control={form.control}
            name="open_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-sm">Time</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type="time"
                      className="w-fit select-none"
                      defaultValue={form.getValues("open_time").split(",")[0]}
                      onChange={(e) => setTime([e.target.value, time[1]])}
                    />
                    <Input
                      type="time"
                      className="w-fit select-none"
                      defaultValue={form.getValues("open_time").split(",")[1]}
                      onChange={(e) => setTime([time[0], e.target.value])}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="open_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-sm">Day</FormLabel>
                <FormControl className="justify-start">
                  <ToggleGroup
                    size={"lg"}
                    variant={"outline"}
                    type="multiple"
                    onValueChange={(value) =>
                      form.setValue("open_day", value.join(","))
                    }
                    value={field.value.split(",")}
                  >
                    <ToggleGroupItem
                      value="Sun"
                      aria-label="Sun"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Sun
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Mon"
                      aria-label="Mon"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Mon
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Tue"
                      aria-label="Tue"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Tue
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Wed"
                      aria-label="Wed"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Wed
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Thu"
                      aria-label="Thu"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Thu
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Fri"
                      aria-label="Fri"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Fri
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="Sat"
                      aria-label="Sat"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      Sat
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="google_map"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Location</FormLabel>
              <FormControl>
                <GoogleMapComponent
                  onChange={(value) => form.setValue("google_map", value)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span />

        <Separator className="col-span-2 mt-4" />
        <FormField
          control={form.control}
          name="term_condition"
          render={({ field }) => (
            <FormItem className="col-span-2 h-fit">
              <FormLabel className="font-normal text-sm">
                Term & Condition
              </FormLabel>
              <FormControl>
                <CustomEditor
                  placeholder="Term & Condition"
                  {...field}
                  theme="snow"
                  modules={quillModules}
                  style={{
                    height: "300px",
                    marginBottom: "40px",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-span-2 mt-4" />
        <FormField
          control={form.control}
          name="privacy_policy"
          render={({ field }) => (
            <FormItem className="col-span-2 h-fit">
              <FormLabel className="font-normal text-sm">
                Privacy policy
              </FormLabel>
              <FormControl>
                <CustomEditor
                  placeholder="Privacy policy"
                  {...field}
                  theme="snow"
                  modules={quillModules}
                  style={{
                    height: "300px",
                    marginBottom: "40px",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-span-2 mt-4" />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem className="col-span-2 h-fit">
              <FormLabel className="font-normal text-sm">License</FormLabel>
              <FormControl>
                <CustomEditor
                  placeholder="License"
                  {...field}
                  theme="snow"
                  modules={quillModules}
                  style={{
                    height: "300px",
                    marginBottom: "40px",
                  }}
                />
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
