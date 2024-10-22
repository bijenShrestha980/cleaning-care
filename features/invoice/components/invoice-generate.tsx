"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ChevronsUpDown, ClockArrowUp, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

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

const InvoiceGenerate = ({
  id,
  invoice,
}: {
  id: number;
  invoice?: { discount?: number; due_date?: string };
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { isSuccess: invoiceIsSuccess, refetch } = useInvoiceSend(id);

  const {
    mutate: createInvoice,
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
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createIsSuccess]);

  useEffect(() => {
    if (invoiceIsSuccess) {
      toast.success("Invoice sent successfully");
    }
  }, [invoiceIsSuccess]);

  useEffect(() => {
    if (updateIsSuccess) {
      setIsDialogOpen(false);
      location.reload();
    }
  }, [updateIsSuccess]);

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
                    Discount
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
              disabled={createIsPending || updateIsPending}
            >
              {createIsPending ? (
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