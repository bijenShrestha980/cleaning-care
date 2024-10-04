"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Quote,
  quoteSchema,
  ServiceCategory,
} from "../../../components/admin/data/schema";
import { quoteStatuses } from "@/constants/table-data";
import { useEffect, useState } from "react";

const QuotActionForm = ({
  quote,
  serviceCategoriesData,
}: {
  quote: Quote;
  serviceCategoriesData: ServiceCategory[];
}) => {
  const [totalCost, setTotalCost] = useState<number>(0);
  const formSchema = quoteSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: quote?.id,
      status: quote?.status || "received_from_user",
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
              <h5 className="font-semibold">Service Information</h5>
              {quoteStatuses.map((status) =>
                status.value === quote.status ? (
                  <Badge
                    key={status.value}
                    variant={"outline"}
                    className="w-fit"
                  >
                    {status.icon && (
                      <status.icon className="mr-2 h-4 w-4 text-primary" />
                    )}
                    {status.label}
                  </Badge>
                ) : null
              )}
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
          <span className="flex items-center gap-2 mt-2">
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
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              animation={"scale_in"}
              className="w-[86px]"
            >
              Cancle
            </Button>
            <Button type="submit" animation={"scale_in"} className="w-[86px]">
              Proceed
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuotActionForm;
