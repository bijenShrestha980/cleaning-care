"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Trash2,
  User,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { CustomImage } from "@/components/ui/custom-image";
import { Service, serviceSchema } from "@/components/admin/data/schema";
import { useCreateService } from "@/features/services/api/use-create-service";
import { useUpdateService } from "@/features/services/api/use-update-service";
import { useDeleteService } from "@/features/services/api/use-delete-service";
import { useServiceCategories } from "@/features/service-categories/api/use-service-categories";
import { cn } from "@/lib/utils";

const ServiceForm = ({
  service,
  id,
}: {
  service?: Service;
  id?: string | number;
}) => {
  const {
    service_name,
    short_description,
    long_description,
    status,
    banner_image_url,
    service_category_id,
    section_one_title,
    section_one_description,
    section_one_image_url,
    section_two_title,
    section_two_description,
    service_items,
  } = service || {};
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<
    {
      value: string;
      label: string;
      id?: string;
    }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    banner_image_url || null
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(
    section_one_image_url || null
  );
  const [featurePreview, setFeaturePreview] = useState<
    (string | undefined)[] | undefined
  >(service_items?.map((item) => item.icon_url) || []);

  const { mutate: createService, isPending: createIsPending } =
    useCreateService();
  const { mutate: updateService, isPending: updateIsPending } =
    useUpdateService(id);
  const { mutate: deleteStyle, isPending: deleteIsPending } =
    useDeleteService();
  const {
    data: serviceCategoriesData,
    isPending: serviceCategoriesIsPending,
    isError: serviceCategoriesIsError,
  } = useServiceCategories();

  const formSchema = serviceSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_name: service_name || "",
      short_description: short_description || "",
      long_description: long_description || "",
      status: status || "active",
      banner_image: null,
      service_category_id: service_category_id || undefined,
      section_one_title: section_one_title || "",
      section_one_description: section_one_description || "",
      section_one_image: null,
      section_two_title: section_two_title || "",
      section_two_description: section_two_description || "",
      service_items: service_items?.map((item) => ({
        item_name: item.item_name,
        short_description: item.short_description,
        icon: null,
      })) || [
        {
          item_name: "",
          short_description: "",
          icon: null,
        },
      ],
      // sectionThree: {
      //   title: "",
      //   description: "",
      //   features: [
      //     {
      //       title: "",
      //       description: "",
      //     },
      //   ],
      // },
    },
  });

  const {
    fields: sectionTwoFields,
    append: sectionTwoAppend,
    remove: sectionTwoRemove,
  } = useFieldArray({
    name: "service_items",
    control: form.control,
  });

  // const {
  //   fields: sectionThreeFields,
  //   append: sectionThreeAppend,
  //   remove: sectionThreeRemove,
  // } = useFieldArray({
  //   name: "sectionThree.features",
  //   control: form.control,
  // });

  useEffect(() => {
    const data: { value: string; label: string; id?: string }[] = [];
    if (
      serviceCategoriesData &&
      !serviceCategoriesIsPending &&
      !serviceCategoriesIsError
    ) {
      serviceCategoriesData.map((category) =>
        data.push({
          value: category.category_name,
          label: category.category_name,
          id: category.id?.toLocaleString(),
        })
      );
    }
    setCategories(data);
  }, [
    serviceCategoriesData,
    serviceCategoriesIsPending,
    serviceCategoriesIsError,
  ]);

  const handleSelect = (value: string) => {
    setSelectedCategories(value);
    setOpen(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("id", id?.toString() || "");
    formData.append("service_name", values.service_name);
    formData.append("short_description", values.short_description);
    formData.append("long_description", values.long_description);
    formData.append("status", values.status);
    formData.append("service_category_id", values.service_category_id);
    if (values.banner_image) {
      formData.append("banner_image", values.banner_image);
    }
    formData.append("section_one_title", values.section_one_title);
    formData.append("section_one_description", values.section_one_description);
    if (values.section_one_image) {
      formData.append("section_one_image", values.section_one_image);
    }
    formData.append("section_two_title", values.section_two_title);
    formData.append("section_two_description", values.section_two_description);
    values.service_items.map((item, index) => {
      formData.append(`service_items[${index}][item_name]`, item.item_name);
      formData.append(
        `service_items[${index}][short_description]`,
        item.short_description
      );
      if (item.icon) {
        formData.append(`service_items[${index}][icon]`, item.icon);
      }
    });

    if (id) {
      updateService({
        data: formData as any,
        id,
      });
    } else {
      createService(formData as any);
    }
  };

  useEffect(() => {
    if (form.getValues("service_category_id")) {
      categories.map((category) => {
        if (category.id == form.getValues("service_category_id")) {
          setSelectedCategories(category.value);
        }
      });
    }
  }, [categories, form]);

  if (serviceCategoriesIsPending) {
    return <Loading />;
  }
  if (serviceCategoriesIsError) {
    return <Error />;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="service_name"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Service name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Sparkling every corners, for happy surrounding"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="banner_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Banner image
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                          setBannerPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                        className="w-full"
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <Label className="font-normal text-sm">Image (Preview)</Label>
                  {bannerPreview ? (
                    <CustomImage
                      src={bannerPreview}
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
        <FormField
          control={form.control}
          name="service_category_id"
          render={({ field: { onChange } }) => (
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Categories</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-fit px-3 py-3 justify-between"
                  >
                    <div className="w-fit overflow-hidden">
                      {selectedCategories
                        ? categories.find(
                            (category) => category.value === selectedCategories
                          )?.label
                        : "Select category..."}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="md:w-[292px] xl:w-[452px] 2xl:w-[580px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            // value={category.value}
                            onSelect={() => {
                              if (category.id) {
                                handleSelect(category.value);
                                onChange(category.id);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCategories === category.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-[#A7B2C3] focus:bg-transparent [&>svg]:opacity-100 [&>svg]:text-[#5065F6]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="active"
                      className="text-[#374253] focus:bg-grey-40"
                    >
                      Active
                    </SelectItem>
                    <SelectItem
                      value="inactive"
                      className="text-[#374253] focus:bg-grey-40"
                    >
                      Inactive
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
              <FormLabel className="font-normal text-sm">
                Short Detail
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Houses/Apartment/Unit Cleaning"
                  {...field}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="long_description"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="“Your kitchen is the heart of your home, where meals are prepared and memories are made. At Cleaning Care, we offer comprehensive kitchen cleaning services designed to keep your kitchen spotless, hygienic, and welcoming.”"
                  {...field}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="col-span-2 my-4" />
        <FormField
          control={form.control}
          name="section_one_title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Section One Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Why hire us for Houses/Apartment/Unit Cleaning?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="section_one_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Section One Image
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                        className="w-full"
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <Label className="font-normal text-sm">Image (Preview)</Label>
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
        <FormField
          control={form.control}
          name="section_one_description"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Section One Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Our team of experienced professionals is skilled in handling all types of kitchen cleaning tasks with precision and care, ensuring your space is spotless and hygienic..."
                  {...field}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-span-2 my-4" />
        <div className="space-y-2 col-span-2 sm:col-span-1">
          <FormField
            control={form.control}
            name="section_two_title"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel className="font-normal text-sm">
                  Section Two Section Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Our Service Include" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span />
          <FormField
            control={form.control}
            name="section_two_description"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel className="font-normal text-sm">
                  Section Two Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This section outlines the services included in your selected package, detailing what will be provided and the benefits you will receive."
                    {...field}
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-3 pt-4">
            <div className="flex justify-between mb-4">
              <FormLabel className="font-semibold text-sm active:scale-95">
                Section Two Features
              </FormLabel>
              <Button
                type="button"
                animation={"scale_both"}
                size={"sm"}
                onClick={() =>
                  sectionTwoAppend({
                    item_name: "",
                    short_description: "",
                    icon: null,
                  })
                }
              >
                Add Feature
              </Button>
            </div>
            {sectionTwoFields.map((_, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-4 mb-4 pb-4 ${
                  index !== sectionTwoFields.length - 1 ? "border-b" : ""
                }`}
              >
                {index !== 0 && (
                  <>
                    <span />
                    <div
                      className="
                  w-full flex gap-4 justify-end
                "
                    >
                      <Button
                        type="button"
                        className="w-fit"
                        variant={"outline"}
                        animation={"scale_in"}
                        onClick={() => sectionTwoRemove(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
                <FormField
                  control={form.control}
                  name={`service_items.${index}.item_name`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel className="font-normal text-sm">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Surface Cleaning" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`service_items.${index}.short_description`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel className="font-normal text-sm">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="We thoroughly clean and sanitize all countertops, cabinets, and shelves to remove dirt, grease, and grime."
                          {...field}
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`service_items.${index}.icon`}
                  render={({ field: { ref, name, onBlur, onChange } }) => (
                    <FormItem className="col-span-2">
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-12">
                        <span>
                          <FormLabel className="font-normal text-sm">
                            Feature Image
                          </FormLabel>

                          <div className="flex items-center gap-3 mt-2">
                            <div className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                                  featurePreview &&
                                    setFeaturePreview(
                                      file
                                        ? [
                                            ...featurePreview,
                                            URL.createObjectURL(file),
                                          ]
                                        : []
                                    );
                                }}
                                className="w-full"
                              />
                            </FormControl>
                          </div>
                        </span>
                        <div className="flex flex-col items-center">
                          <Label className="font-normal text-sm">
                            Image (Preview)
                          </Label>
                          {featurePreview && featurePreview[index] ? (
                            <CustomImage
                              src={featurePreview[index]}
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
              </div>
            ))}
          </div>
        </div>

        <span />
        <span />

        <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
          {id && (
            <Button
              variant={"ghost"}
              animation={"scale_in"}
              className="w-full md:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
              onClick={() => deleteStyle(id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
          )}
          <Link
            href="/cleaning-care-admin/dashboard/service/service-list"
            className="w-full sm:w-[86px]"
          >
            <Button
              variant={"outline"}
              animation={"scale_in"}
              className="w-full sm:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            animation={"scale_in"}
            className="w-full sm:w-[86px]"
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

export default ServiceForm;
