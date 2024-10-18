"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

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
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import {
  BankAccountDetails,
  bankAccountDetailsSchema,
} from "@/components/admin/data/schema";
import { useBankAccountDetails } from "../api/use-bank";
import { useCreateBankAccountDetails } from "../api/use-create-bank";
import Link from "next/link";
import { useDeleteBankAccountDetails } from "../api/use-delete-bank";
import { use, useEffect } from "react";

const BankFormComp = () => {
  const { data: bankData, isPending, isError } = useBankAccountDetails();

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return <BankForm bank={bankData} />;
};

const BankForm = ({ bank }: { bank: BankAccountDetails }) => {
  const { mutate: createBankAccountDetails, isPending: createIsPending } =
    useCreateBankAccountDetails();
  const {
    mutate: deleteBankAccountDetails,
    isPending: deleteIsPending,
    isSuccess: deleteIsSuccess,
  } = useDeleteBankAccountDetails();

  const formSchema = bankAccountDetailsSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank_name: bank?.bank_name || "",
      account_number: bank?.account_number || "",
      account_bsb: bank?.account_bsb || "",
    },
  });

  useEffect(() => {
    if (deleteIsSuccess) {
      form.reset(
        {
          bank_name: "",
          account_number: "",
          account_bsb: "",
        },
        {
          keepValues: false,
          keepDefaultValues: false,
        }
      );
    }
  }, [deleteIsSuccess, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("bank_name", values.bank_name);
    formData.append("account_number", values.account_number);
    formData.append("account_bsb", values.account_bsb);
    createBankAccountDetails(formData as any);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_number"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Account Number
              </FormLabel>
              <FormControl>
                <Input placeholder="Account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_bsb"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Account BSB</FormLabel>
              <FormControl>
                <Input placeholder="Account BSB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
          {bank?.id && (
            <Button
              variant={"ghost"}
              animation={"scale_in"}
              className="w-[86px]"
              disabled={createIsPending || deleteIsPending}
              type="button"
              onClick={() => bank.id && deleteBankAccountDetails(bank.id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
          )}
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

export default BankFormComp;
