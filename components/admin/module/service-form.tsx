"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown, Minus, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { serviceSchema } from "../data/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
      feature: {
        title: "",
        description: "",
        features: undefined,
      },
      sectionTwo: {
        title: "",
        description: "",
        features: undefined,
      },
    },
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
