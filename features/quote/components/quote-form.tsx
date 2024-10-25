"use client";

import { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

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
import { quoteSchema } from "@/components/admin/data/schema";
import { useCreateQuote } from "@/features/quote/api/use-create-user-quote";
import { cn } from "@/lib/utils";

interface Category {
  id?: number;
  label: string;
  value: string;
}

const QuoteForm = ({
  categories,
  setIsDialogOpen,
  service_category_id,
}: {
  categories: Category[];
  setIsDialogOpen: (open: boolean) => void;
  service_category_id?: number;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    mutate: createQuote,
    isPending: createIsPending,
    isSuccess: createIsSuccess,
  } = useCreateQuote();

  const formSchema = quoteSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
      postal_code: "",
      quote: "",
      service_category_ids: service_category_id ? [service_category_id] : [],
    },
  });

  useEffect(() => {
    if (createIsSuccess) {
      form.reset();
      setIsDialogOpen(false);
    }
  }, [createIsSuccess, form, setIsDialogOpen]);

  useEffect(() => {
    if (service_category_id) {
      setSelectedCategories((prev) => [...prev, service_category_id]);
    }
  }, [service_category_id]);

  const handleSelect = (value: number) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories((prev) => prev.filter((v) => v !== value));
    } else {
      setSelectedCategories((prev) => [...prev, value]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    createQuote({
      ...values,
      ...(values.postal_code && { postal_code: values.postal_code }),
      ...(values.phone_number && { phone_number: values.phone_number }),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none font-montserratSans"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-medium text-sm text-[#191919]">
                Full name *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  {...field}
                  className="bg-[#EDEDED]"
                />
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
              <FormLabel className="font-medium text-sm text-[#191919]">
                Email *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  {...field}
                  className="bg-[#EDEDED]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-medium text-sm text-[#191919]">
                Phone no.
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone no."
                  {...field}
                  className="bg-[#EDEDED]"
                />
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
              <FormLabel className="font-medium text-sm text-[#191919]">
                Address *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter address"
                  {...field}
                  className="bg-[#EDEDED]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postal_code"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-medium text-sm text-[#191919]">
                Postal code
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter postal code"
                  {...field}
                  className="bg-[#EDEDED]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service_category_ids"
          render={({ field: { onChange } }) => (
            <div className="space-y-2 col-span-2">
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
                        ? categories
                            .filter(
                              (category) =>
                                category.id &&
                                category.id &&
                                selectedCategories.includes(category.id)
                            )
                            .map((category) => category.label)
                            .join(", ")
                        : "Select category..."}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="sm:w-[462px] p-0">
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
                                handleSelect(category.id);
                                onChange(
                                  selectedCategories.includes(category.id)
                                    ? selectedCategories.filter(
                                        (v) => v !== category.id
                                      )
                                    : [...selectedCategories, category.id]
                                );
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.id &&
                                  selectedCategories.includes(category.id)
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
          name="quote"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-medium text-sm text-[#191919]">
                Service Quote Requirement / Message *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter message"
                  {...field}
                  className="bg-[#EDEDED]"
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-end gap-4">
          <Button
            type="submit"
            variant={"success"}
            animation={"scale_in"}
            size={"lg"}
            disabled={createIsPending}
          >
            {createIsPending ? (
              <LoaderCircle className="animate-spin" width={20} height={20} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;
