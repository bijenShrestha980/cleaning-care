"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ChevronsUpDown, ClockArrowUp, LoaderCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import { invoiceSchema } from "@/components/admin/data/schema";
import { useCreateInvoice } from "../api/use-create-invoice";
import { useInvoiceSend } from "../api/use-invoice";
import { useUpdateInvoice } from "../api/use-update-invoice";
import { toast } from "@/hooks/use-toast";

const InvoiceGenerate = ({
  id,
  invoice,
}: {
  id: number;
  invoice?: { discount?: number; due_date?: string };
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sendInvoice, setSendInvoice] = useState(false);
  const queryClient = useQueryClient();

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

  const formSchema = invoiceSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      discount: invoice?.discount || 0,
      due_date: invoice?.due_date || undefined,
    },
  });

  useEffect(() => {
    if (createIsSuccess) {
      setSendInvoice(true);
    }
  }, [createIsSuccess]);

  useEffect(() => {
    if (sendInvoice && createInvoiceData?.invoice?.id) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendInvoice]);

  useEffect(() => {
    if (invoiceIsSuccess && sendInvoice) {
      setSendInvoice(false);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Invoice sent successfully",
      });
      location.reload();
    }
  }, [invoiceIsSuccess, sendInvoice]);

  useEffect(() => {
    if (updateIsSuccess) {
      setIsDialogOpen(false);
      location.reload();
    }
  }, [updateIsSuccess]);

  // useEffect(() => {
  //   if (invoiceIsError) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to send invoice to user",
  //       variant: "destructive",
  //     });
  //   }
  // }, [invoiceIsError]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (invoice) {
      updateInvoice({ data: values, id: id });
    } else {
      createInvoice({ data: values, id: id });
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
      <DialogContent className="max-h-dvh md:max-h-[750px] overflow-y-scroll no-scrollbar">
        <DialogHeader className="items-center">
          <DialogTitle className="text-3xl font-semibold font-inter">
            Generate Invoice
          </DialogTitle>
          <DialogDescription className="text-base font-normal font-inter">
            Please set the due date and discount percentage
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full grid grid-cols-1 space-y-4 select-none font-montserratSans"
          >
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel className="text-md text-[#191919]">
                    Due Date
                  </FormLabel> */}

                  <FormControl className="p-0 datepicker w-full">
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-medium text-sm text-[#191919]">
                    Discount %
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
            <Button
              type="submit"
              animation={"scale_in"}
              className="w-full h-[46px]"
              disabled={createIsPending || updateIsPending || invoiceIsFetching}
            >
              {createIsPending || invoiceIsFetching ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Generate invoice"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGenerate;
