"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown, Trash2, User } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { serviceSchema } from "../data/schema";
import { user_1 } from "@/constants/images";

const categories = [
  {
    value: "bedroom",
    label: "Bedroom",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "bathroom",
    label: "Bathroom",
  },
  {
    value: "living-room",
    label: "Living Room",
  },
  {
    value: "dining-room",
    label: "Dining Room",
  },
  {
    value: "laundry",
    label: "Laundry",
  },
  {
    value: "garage",
    label: "Garage",
  },
  {
    value: "office",
    label: "Office",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "industrial",
    label: "Industrial",
  },
  {
    value: "other",
    label: "Other",
  },
];

const ServiceForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [featurePreview, setFeaturePreview] = useState<string[]>([]);

  const formSchema = serviceSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      detail: "",
      description: "",
      status: "active",
      categories: undefined,
      sectionOne: {
        title: "",
        description: "",
        image: undefined,
      },
      sectionTwo: {
        title: "",
        description: "",
        features: [
          {
            title: "",
            description: "",
            image: undefined,
          },
        ],
      },
      sectionThree: {
        title: "",
        description: "",
        features: [
          {
            title: "",
            description: "",
          },
        ],
      },
    },
  });

  const {
    fields: sectionTwoFields,
    append: sectionTwoAppend,
    remove: sectionTwoRemove,
  } = useFieldArray({
    name: "sectionTwo.features",
    control: form.control,
  });

  const {
    fields: sectionThreeFields,
    append: sectionThreeAppend,
    remove: sectionThreeRemove,
  } = useFieldArray({
    name: "sectionThree.features",
    control: form.control,
  });

  const handleSelect = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/admin/dashboard/service/service-list");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
          name="status"
          render={({ field }) => (
            <FormItem>
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
        <div className="space-y-2">
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
                  {selectedCategories.length > 0
                    ? selectedCategories
                        .map(
                          (item) =>
                            categories.find(
                              (category) => category.value === item
                            )?.label
                        )
                        .join(", ")
                    : "Select category..."}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="md:w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={() => handleSelect(category.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCategories.includes(category.value)
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
        <span />
        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
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
          name="description"
          render={({ field }) => (
            <FormItem>
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
          name="sectionOne.title"
          render={({ field }) => (
            <FormItem>
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
          name="sectionOne.image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Section One Image
                  </FormLabel>

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
          name="sectionOne.description"
          render={({ field }) => (
            <FormItem>
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
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="sectionTwo.title"
            render={({ field }) => (
              <FormItem>
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
            name="sectionTwo.description"
            render={({ field }) => (
              <FormItem>
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
          <div className="col-span-1 pt-4">
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
                    title: "",
                    description: "",
                    image: user_1,
                  })
                }
              >
                Add Feature
              </Button>
            </div>
            {sectionTwoFields.map((field, index) => (
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
                  name={`sectionTwo.features.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
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
                  name={`sectionTwo.features.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
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
                  name={`sectionTwo.features.${index}.image`}
                  render={({ field: { ref, name, onBlur, onChange } }) => (
                    <FormItem className="col-span-2">
                      <div className="flex flex-col sm:flex-row gap-12">
                        <span>
                          <FormLabel className="font-normal text-sm">
                            Feature Image
                          </FormLabel>

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
                                  setFeaturePreview(
                                    file
                                      ? [
                                          ...featurePreview,
                                          URL.createObjectURL(file),
                                        ]
                                      : []
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
                          {featurePreview[index] ? (
                            <Image
                              src={featurePreview[index]}
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
              </div>
            ))}
          </div>
        </div>
        <Separator className="col-span-2 my-4" />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="sectionThree.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-sm">
                  Section Three Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="How to Book Our Cleaning Service"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sectionThree.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-sm">
                  Section Three Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Curious about how our cleaning service operates? It’s straightforward! Our expert..."
                    {...field}
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-1 pt-4">
            <div className="flex justify-between mb-4">
              <FormLabel className="font-semibold text-sm active:scale-95">
                Section Three Features
              </FormLabel>
              <Button
                type="button"
                animation={"scale_both"}
                size={"sm"}
                onClick={() =>
                  sectionThreeAppend({ title: "", description: "" })
                }
              >
                Add Feature
              </Button>
            </div>
            {sectionThreeFields.map((field, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-4 mb-4 pb-4 ${
                  index !== sectionThreeFields.length - 1 ? "border-b" : ""
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
                        className="w-fit"
                        variant={"outline"}
                        animation={"scale_in"}
                        onClick={() => sectionThreeRemove(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
                <FormField
                  control={form.control}
                  name={`sectionThree.features.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-sm">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Explore Our Service or Contact Us"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sectionThree.features.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-sm">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Visit our website ..."
                          {...field}
                          rows={6}
                        />
                      </FormControl>
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

        <div className="flex justify-end gap-4">
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

export default ServiceForm;
