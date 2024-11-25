"use client";
import { Fragment, useEffect, useState } from "react";
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
import {
  GroupedItems,
  InvoiceItem,
  invoiceSchema,
} from "@/components/admin/data/schema";
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
import { useUpdateInvoice } from "../api/use-update-invoice";
import { cn } from "@/lib/utils";

const InvoiceGenerate = ({
  id,
  invoice,
  invoice_items,
}: {
  id: number;
  invoice?: { discount?: number; due_date?: string };
  invoice_items?: GroupedItems;
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
    mutate: updateInvoice,
    isPending: updateIsPending,
    isSuccess: updateIsSuccess,
  } = useUpdateInvoice(id);

  const formSchema = invoiceSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      discount: invoice?.discount || 0,
      due_date: invoice?.due_date || undefined,
      new_items: [],
      grouped_items: invoice_items || [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "grouped_items",
  });

  useEffect(() => {
    if (createIsSuccess) {
      router.push(
        `/cleaning-care-admin/dashboard/invoice/${createInvoiceData?.invoice?.id}`
      );
    }
  }, [createInvoiceData?.invoice?.id, createIsSuccess, router]);

  useEffect(() => {
    if (updateIsSuccess) {
      setIsDialogOpen(false);
      location.reload();
    }
  }, [updateIsSuccess]);

  // console.log(form.formState.errors);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const new_items: InvoiceItem[] = (values.grouped_items ?? [])
      .map((item: any) => {
        return item.items.map((i: any) => ({
          service_category_id: item.category_id,
          service_category_item_id: i.id,
          price: i.price,
          item_name: i.item_name,
          status: i.status ? i.status : "active",
        }));
      })
      .flat();
    const { grouped_items, ...restValues } = values;

    if (invoice) {
      updateInvoice({ data: { ...restValues, new_items: new_items }, id });
    } else {
      createInvoice({ data: values, id });
    }
  }

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
                                "justify-start text-left font-normal px-3 h-[46px]",
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
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                          onWheel={() =>
                            document.activeElement instanceof HTMLElement &&
                            document.activeElement.blur()
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {invoice_items && (
                <div className="border border-gray-200 rounded-md">
                  <div className="hidden sm:grid sm:grid-cols-3 bg-[#f8fafc] p-4">
                    <div className="sm:col-span-2 text-xs font-semibold uppercase">
                      S.N. Service
                    </div>
                    <div className="text-end text-xs font-semibold uppercase">
                      Price (AUD)
                    </div>
                  </div>

                  {fields.map((item, i) => {
                    return (
                      <div key={i}>
                        <div className="relative">
                          <div className="px-4 py-1 border-y bg-[#edf2f7] ">
                            <p className="text-lg font-semibold">
                              {item.category_name}
                            </p>
                          </div>
                          <Items index={i} form={form} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <Button
              type="submit"
              animation={"scale_in"}
              className="w-full h-[46px]"
              disabled={createIsPending || updateIsPending}
            >
              {createIsPending ? (
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

const Items = ({ index, form }: { index: number; form: any }) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: `grouped_items.${index}.items`,
  });
  return (
    <>
      <Button
        variant={"outline"}
        className="absolute top-[5px] right-[3px] h-7 w-[74px]"
        type="button"
        animation={"scale_both"}
        size={"sm"}
        onClick={() =>
          append({
            item_name: "",
            price: 0,
            status: "active",
            id: 0,
          })
        }
      >
        Add Item
      </Button>
      {fields.map((item, i) => (
        <Fragment key={i}>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end border-y px-4 py-2">
            <div className="col-span-full sm:col-span-2">
              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                &nbsp;&nbsp;&nbsp;Item name
              </h5>
              <FormField
                control={form.control}
                name={`grouped_items.${index}.items.${i}.item_name`}
                render={() => (
                  <FormItem className="space-y-0 flex items-center gap-2">
                    {"status" in item && item.status !== undefined ? (
                      <Button
                        type="button"
                        className="h-7 w-fit p-2"
                        variant={"outline"}
                        animation={"scale_in"}
                        onClick={() => remove(i)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    ) : (
                      <p className="font-medium text-gray-800">{i + 1}&nbsp;</p>
                    )}
                    <FormControl>
                      <Input
                        {...form.register(
                          `grouped_items.${index}.items.${i}.item_name`
                        )}
                        disabled={"status" in item && item.status === undefined}
                        className="border h-8 py-0 mt-0 w-auto font-medium shadow-none disabled:opacity-80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full sm:col-span-1">
              {"status" in item && item.status !== undefined && (
                <FormField
                  control={form.control}
                  name={`grouped_items.${index}.items.${i}.status`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || "active"}
                          disabled={
                            "status" in item && item.status === undefined
                          }
                        >
                          <SelectTrigger className="h-8 w-24 border-none shadow-none focus:bg-transparent [&>svg]:opacity-100 [&>svg]:text-[#5065F6]">
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
                />
              )}
            </div>
            <div className="col-span-full sm:col-span-1">
              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                &nbsp;&nbsp;&nbsp;Price (AUD)
              </h5>
              <FormField
                control={form.control}
                name={`grouped_items.${index}.items.${i}.price`}
                render={({ field }) => (
                  <FormItem className="flex sm:justify-end">
                    <FormControl>
                      <Input
                        {...form.register(
                          `grouped_items.${index}.items.${i}.price`
                        )}
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                        onWheel={() =>
                          document.activeElement instanceof HTMLElement &&
                          document.activeElement.blur()
                        }
                        className="sm:text-end border-none h-8 w-auto font-medium shadow-none disabled:text-gray-700 disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default InvoiceGenerate;
