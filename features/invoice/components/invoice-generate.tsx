"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  ChevronsUpDown,
  ClockArrowUp,
  LoaderCircle,
  Calendar as CalendarIcon,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { invoiceSchema, NewItem } from "@/components/admin/data/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateInvoice } from "../api/use-create-invoice";
import { useInvoiceSend } from "../api/use-invoice";
import { useUpdateInvoice } from "../api/use-update-invoice";
import { cn } from "@/lib/utils";

const InvoiceGenerate = ({
  id,
  invoice,
  invoice_items,
}: {
  id: number;
  invoice?: { discount?: number; due_date?: string };
  invoice_items?: {
    price: number;
    service_category_id: number;
    service_category_item_id: number;
    service_category_item: {
      price: string;
      item_name: string;
    };
    service_category: {
      id: number;
      category_name: string;
    };
  }[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const {
    mutate: createInvoice,
    data: createInvoiceData,
    isPending: createIsPending,
    isSuccess: createIsSuccess,
  } = useCreateInvoice();

  const {
    isSuccess: invoiceIsSuccess,
    refetch,
    isError: invoiceIsError,
    isFetching: invoiceIsFetching,
  } = useInvoiceSend(
    createInvoiceData?.invoice?.id ? createInvoiceData?.invoice?.id : null
  );

  const {
    mutate: updateInvoice,
    isPending: updateIsPending,
    isSuccess: updateIsSuccess,
  } = useUpdateInvoice(id);

  type InvoiceItem = {
    service_category_id: number;
    service_category_item_id: number;
    price: number;
    category_name: string;
    item_name: string;
  };

  const formSchema = invoiceSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      discount: invoice?.discount || 0,
      due_date: invoice?.due_date || undefined,
      new_items: invoice_items?.map((item) => ({
        service_category_id: item.service_category_id.toString(),
        service_category_item_id: item.service_category_item_id.toString(),
        price: item.price,
        status: "active",
        item_name: item.service_category_item.item_name,
      })),
    },
  });

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
    insert: itemInsert,
  } = useFieldArray({
    control: form.control,
    name: "new_items",
  });

  // console.log(form.);

  useEffect(() => {
    if (createIsSuccess) {
      router.push(`/admin/dashboard/invoice/${createInvoiceData?.invoice?.id}`);
    }
  }, [createInvoiceData?.invoice?.id, createIsSuccess, router]);

  useEffect(() => {
    if (updateIsSuccess) {
      setIsDialogOpen(false);
      location.reload();
    }
  }, [updateIsSuccess]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("first", values);
    // createInvoice({ data: values, id: id });
    if (invoice) {
      updateInvoice({ data: values, id: id });
    } else {
      createInvoice({ data: values, id: id });
    }
  }

  // Track unique service_category_id values
  const uniqueServiceCategoryItems = new Set<number>();

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => !isOpen && setIsDialogOpen(false)}
    >
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        {invoice ? (
          <Button className="flex gap-2">
            <ClockArrowUp size={16} />
            Update Invoice
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            Completed
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={`overflow-y-scroll no-scrollbar ${
          invoice ? "md:max-w-screen-2xl sm:h-[calc(100%-5rem)] h-full" : ""
        }`}
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-3xl font-semibold font-inter">
            {invoice ? "Update Invoice" : "Generate Invoice"}
          </DialogTitle>
          <DialogDescription className="text-base font-normal font-inter">
            Please set the due date and discount percentage
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between gap-4 select-none font-montserratSans"
          >
            <div
              className={`flex flex-col gap-4 ${invoice ? "" : "h-[330px]"}`}
            >
              <div
                className={`w-full ${
                  invoice
                    ? "flex flex-col md:flex-row items-center gap-4"
                    : "flex flex-col gap-4"
                }`}
              >
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="font-medium text-sm text-[#191919]">
                        Due Date
                      </FormLabel>

                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              size={"lg"}
                              className={cn(
                                "justify-start text-left font-normal bg-[#EDEDED] px-3 h-[46px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(format(date, "yyyy-MM-dd"));
                                }
                              }}
                              disabled={{ before: new Date() }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-sm text-[#191919]">
                        Discount (%)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter discount"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              field.onChange(0);
                            } else {
                              field.onChange(parseFloat(e.target.value));
                            }
                          }}
                          className="bg-[#EDEDED]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {invoice &&
                  itemFields.map((item, index) => {
                    const isUnique = !uniqueServiceCategoryItems.has(
                      parseInt(item.service_category_id)
                    );
                    uniqueServiceCategoryItems.add(
                      parseInt(item.service_category_id)
                    );
                    return (
                      <div
                        key={index}
                        className={`grid sm:grid-cols-2 gap-4 mb-4 pb-5 animate-in slide-in-from-top rounded-xl p-4 ${
                          item.service_category_item_id === "0"
                            ? "bg-slate-100"
                            : "bg-primary-foreground"
                        }`}
                      >
                        <div className="col-span-2 flex justify-between items-center">
                          {index === 0 ? (
                            <FormLabel className="text-md font-semibold text-[#191919]">
                              Services
                            </FormLabel>
                          ) : (
                            <span />
                          )}

                          <div className="w-full flex gap-4 justify-end">
                            {!isUnique && (
                              <Button
                                type="button"
                                className="w-fit"
                                variant={"outline"}
                                animation={"scale_in"}
                                onClick={() => itemRemove(index)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                            {isUnique && (
                              <Button
                                type="button"
                                animation={"scale_both"}
                                size={"sm"}
                                onClick={() =>
                                  itemAppend({
                                    item_name: "",
                                    price: 0,
                                    status: "active",
                                    service_category_id:
                                      item.service_category_id,
                                    service_category_item_id: "0",
                                  })
                                }
                              >
                                Add Item
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2 grid sm:grid-cols-1 gap-2">
                          <FormField
                            control={form.control}
                            name={`new_items.${index}.item_name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Item Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={
                                      item.service_category_item_id !== "0"
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`new_items.${index}.status`}
                            render={({ field }) => (
                              <FormItem className="col-span-2 sm:col-span-1">
                                <FormLabel className="font-normal text-sm">
                                  Status
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={
                                      item.service_category_item_id !== "0"
                                    }
                                  >
                                    <SelectTrigger className="border-[#A7B2C3] focus:bg-transparent [&>svg]:opacity-100 [&>svg]:text-[#5065F6]">
                                      <SelectValue placeholder="Status" />
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
                          />{" "}
                          <FormField
                            control={form.control}
                            name={`new_items.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    onChange={(e) => {
                                      if (e.target.value === "") {
                                        field.onChange(0);
                                      } else {
                                        field.onChange(
                                          parseFloat(e.target.value)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <Button
              type="submit"
              animation={"scale_in"}
              className="w-full h-[46px]"
              disabled={createIsPending || updateIsPending || invoiceIsFetching}
            >
              {createIsPending || invoiceIsFetching ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : invoice ? (
                "Update Invoice"
              ) : (
                "Generate Invoice"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGenerate;
