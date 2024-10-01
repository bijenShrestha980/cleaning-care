"use client";

import { useRouter } from "next/navigation";
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
import { quoteData } from "@/constants/fakeData";
import { serviceCategorySchema } from "../data/schema";

const QuotForm = () => {
  const router = useRouter();

  const formSchema = serviceCategorySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
      status: "active",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/admin/dashboard/quote");
  }

  return (
    <div className="grid gap-4">
      {quoteData.map((data, index) => (
        <div key={index} className="grid md:grid-cols-2 gap-4 w-full">
          <div className="p-4 bg-primary-foreground rounded-lg border border-dashed">
            <h5 className="font-semibold mb-4">Client Information</h5>
            <div className="flex flex-col gap-2">
              <span className="flex w-full">
                <p className="w-1/5">Name</p>
                <span className="font-semibold w-4/5 text-end sm:text-start">
                  {data.firstName}
                  &nbsp;
                  {data.lastName}
                </span>
              </span>
              <span className="flex w-full">
                <p className="w-1/5">Email</p>
                <span className="font-semibold w-4/5 text-end sm:text-start">
                  {data.email}
                </span>
              </span>
              <span className="flex w-full">
                <p className="w-1/5">Phone: </p>
                <span className="font-semibold w-4/5 text-end sm:text-start">
                  {data.phone}
                </span>
              </span>
              <span className="flex w-full">
                <p className="w-1/5">Address</p>
                <span className="font-semibold w-4/5 text-end sm:text-start">
                  {data.address}
                </span>
              </span>
              <span className="flex w-full">
                <p className="w-1/5">Postal code</p>
                <span className="font-semibold w-4/5 text-end sm:text-start">
                  {data.postalCode}
                </span>
              </span>
              <span className="flex flex-col md:flex-row w-full">
                <p className="w-1/5">Message:</p>
                <span className="w-4/5">{data.message}</span>
              </span>
            </div>
          </div>
          <div className="p-4 bg-primary-foreground rounded-lg border border-dashed w-full flex flex-col justify-between items-end">
            <div className="w-full">
              <div className="flex justify-between mb-4">
                <h5 className="font-semibold">Service Information</h5>
                <Badge variant={"outline"}>Pending</Badge>
              </div>
              <div className="flex flex-col gap-2">
                {data.categories.map((category, index) => (
                  <span
                    className="flex justify-between w-full bg-slate-200 p-3"
                    key={index}
                  >
                    <p>
                      {category.label} ❌ {category.value}
                    </p>
                    <p className="font-semibold">$ 80</p>
                  </span>
                ))}
              </div>
            </div>
            <span className="flex items-center gap-2 mt-2">
              Total cost :<h4>$ 140</h4>
            </span>
          </div>
        </div>
      ))}
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

export default QuotForm;
