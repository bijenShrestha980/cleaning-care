"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
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
import { typeSchema } from "../data/schema";

const TypeForm = () => {
  const router = useRouter();

  const formSchema = typeSchema;

  type Type = z.infer<typeof formSchema>["types"][number];

  const typesInitial: Type[] = [{ category: "bedroom", count: 1 }];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      status: "active",
      types: typesInitial,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "types",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/admin/dashboard/service/types");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">
                Category name
              </FormLabel>
              <FormControl>
                <Input placeholder="Bed & Bath" {...field} />
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
        <div>
          <div className="flex justify-between">
            <FormLabel className="font-normal text-sm active:scale-95">
              Category
            </FormLabel>
            <Button
              type="button"
              animation={"scale_both"}
              size={"sm"}
              onClick={() => append({ category: "", count: 1 })}
            >
              Add Category
            </Button>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex justify-between items-center gap-4 my-4"
            >
              <FormField
                control={form.control}
                name={`types.${index}.category`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-[#A7B2C3] focus:bg-transparent [&>svg]:opacity-100 [&>svg]:text-[#5065F6]">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="bedroom"
                            className="text-[#374253] focus:bg-grey-40"
                          >
                            Bedroom
                          </SelectItem>
                          <SelectItem
                            value="bathroom"
                            className="text-[#374253] focus:bg-grey-40"
                          >
                            Bathroom
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-fit flex gap-4 justify-end items-center">
                <FormField
                  control={form.control}
                  name={`types.${index}.count`}
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex items-center">
                      <Button
                        className="rounded-full p-1 h-7 w-7"
                        type="button"
                        animation={"scale_both"}
                        onClick={() =>
                          field.value > 1 &&
                          form.setValue(`types.${index}.count`, field.value - 1)
                        }
                      >
                        <Minus size={16} />
                      </Button>
                      <FormControl>
                        <Input
                          placeholder="1"
                          {...field}
                          disabled
                          className="w-14 border-none bg-transparent text-primary disabled:opacity-100 text-xl font-semibold text-center p-0 shadow-none"
                        />
                      </FormControl>
                      <Button
                        className="rounded-full p-1 h-7 w-7"
                        type="button"
                        animation={"scale_both"}
                        onClick={() =>
                          field.value > 0 &&
                          field.value < 10 &&
                          form.setValue(`types.${index}.count`, field.value + 1)
                        }
                      >
                        <Plus size={16} />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"outline"}
                  animation={"scale_in"}
                  onClick={() => remove(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
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

export default TypeForm;
