"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Quote,
  quoteToUserSchema,
  ServiceCategory,
} from "../../../components/admin/data/schema";
import { useCreateQuoteToUser } from "../api/use-create-user-quote";
import { useDeleteQuote } from "../api/use-delete-user-quote";
import QuoteStatus from "./quote-status";

const QuotActionForm = ({
  quote,
  serviceCategoriesData,
}: {
  quote: Quote;
  serviceCategoriesData: ServiceCategory[];
}) => {
  const [totalCost, setTotalCost] = useState<number>(0);
  const {
    mutate: createQuote,
    isPending: createIsPending,
    isSuccess: createIsSuccess,
  } = useCreateQuoteToUser();
  const { mutate: deleteQuote, isPending: deleteIsPending } = useDeleteQuote();

  const formSchema = quoteToUserSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      send_user_quote_id: quote.id,
      service_category_id: quote.senduserquoteservice?.map(
        (service) => service.service_category_id
      ),
      categories: {},
    },
  });

  useEffect(() => {
    let total = 0;
    serviceCategoriesData.map((category) =>
      quote.senduserquoteservice?.map((service) =>
        service.service_category_id === category.id
          ? category.servicecategoryitems?.map(
              (item) => (total += Number(item.price))
            )
          : null
      )
    );
    setTotalCost(total);
  }, [serviceCategoriesData, quote.senduserquoteservice]);

  useEffect(() => {
    const transformedData = quote.senduserquoteservice?.reduce(
      (
        acc: Record<
          number,
          { service_category_item_id: number[]; price: string[] }
        >,
        service
      ) => {
        const serviceCategoryId = service.service_category_id;
        const serviceCategoryItemIds =
          service.servicecategory.servicecategoryitems.map((item) => item?.id);
        const prices = service.servicecategory.servicecategoryitems.map(
          (item) => item.price
        );

        acc[serviceCategoryId] = {
          service_category_item_id: serviceCategoryItemIds,
          price: prices,
        };

        return acc;
      },
      {}
    );

    if (transformedData) {
      form.setValue("categories", transformedData);
    }
  }, [form, quote]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createQuote(values as any);
    // console.log(values);
  }

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4 w-full">
        <div className="p-4 bg-primary-foreground rounded-lg border border-dashed">
          <h5 className="font-semibold mb-4">Client Information</h5>
          <div className="flex flex-col gap-3">
            <span className="flex w-full bg-slate-100 rounded-md p-3">
              <p className="w-1/5">Name</p>
              <span className="font-semibold w-4/5 text-end lg:text-start">
                {quote.full_name}
              </span>
            </span>
            <span className="flex w-full bg-slate-100 rounded-md p-3">
              <p className="w-1/5">Email</p>
              <span className="font-semibold w-4/5 text-end lg:text-start">
                {quote.email}
              </span>
            </span>
            <span className="flex w-full bg-slate-100 rounded-md p-3">
              <p className="w-1/5">Phone: </p>
              <span className="font-semibold w-4/5 text-end lg:text-start">
                {quote.phone_number ? quote.phone_number : "---"}
              </span>
            </span>
            <span className="flex w-full bg-slate-100 rounded-md p-3">
              <p className="w-1/5">Address</p>
              <span className="font-semibold w-4/5 text-end lg:text-start">
                {quote.address}
              </span>
            </span>
            <span className="flex w-full bg-slate-100 rounded-md p-3">
              <p className="w-1/5">Postal code</p>
              <span className="font-semibold w-4/5 text-end lg:text-start">
                {quote.postal_code ? quote.postal_code : "---"}
              </span>
            </span>
            <span className="flex flex-col md:flex-row w-full bg-slate-100 rounded-md p-3">
              <p className="w-1/5">Message:</p>
              <span className="w-4/5">{quote.quote}</span>
            </span>
          </div>
        </div>
        <div className="p-4 bg-primary-foreground rounded-lg border border-dashed w-full flex flex-col justify-between items-end">
          <div className="w-full">
            <div className="flex flex-col xl:flex-row justify-between gap-2 mb-4">
              <h5 className="font-semibold">Service Information</h5>

              <div className="flex gap-2">
                <QuoteStatus quote={quote} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {serviceCategoriesData.map((category, index) =>
                quote.senduserquoteservice?.map((service, _) =>
                  service.service_category_id === category.id ? (
                    <span
                      className="w-full bg-slate-100 rounded-md shadow-md p-3"
                      key={index}
                    >
                      <p className="font-semibold mb-2">
                        {category.category_name}
                      </p>
                      <div className="flex flex-col gap-2">
                        {category.servicecategoryitems?.map((item, index) => (
                          <span
                            key={index}
                            className="flex justify-between w-full bg-slate-200 p-2 rounded-md"
                          >
                            <p className="w-1/5">{item.item_name}</p>
                            <span className="w-4/5 text-end">
                              $ {item.price}
                            </span>
                          </span>
                        ))}
                      </div>
                    </span>
                  ) : null
                )
              )}
            </div>
          </div>
          <span className="flex items-center gap-2 mt-4">
            Total cost :<h4>$ {totalCost}</h4>
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-4 w-full select-none"
        >
          <span />
          <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
            {quote.id && (
              <Button
                variant={"ghost"}
                animation={"scale_in"}
                className="w-full md:w-[86px]"
                disabled={createIsPending || deleteIsPending}
                type="button"
                onClick={() => quote.id && deleteQuote(quote.id)}
              >
                {deleteIsPending ? (
                  <LoaderCircle
                    className="animate-spin"
                    width={20}
                    height={20}
                  />
                ) : (
                  "Delete"
                )}
              </Button>
            )}
            <Link href="/admin/dashboard/quote" className="w-full sm:w-[86px]">
              <Button
                variant={"outline"}
                animation={"scale_in"}
                className="w-full md:w-[86px]"
                disabled={createIsPending || deleteIsPending}
              >
                Cancle
              </Button>
            </Link>
            {quote.status === "received_from_user" && (
              <Button
                type="submit"
                animation={"scale_in"}
                className="w-full md:w-[86px]"
                disabled={createIsPending || deleteIsPending}
              >
                {createIsPending ? (
                  <LoaderCircle
                    className="animate-spin"
                    width={20}
                    height={20}
                  />
                ) : (
                  "Proceed"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuotActionForm;
