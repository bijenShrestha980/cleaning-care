"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { serviceCategorySchema } from "@/components/admin/data/schema";
import { Trash2 } from "lucide-react";

const CategoryForm = () => {
  const router = useRouter();

  const formSchema = serviceCategorySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
      status: "active",
      items: [
        {
          item_name: "",
          price: 0,
          status: "active",
        },
      ],
    },
  });

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    name: "items",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/admin/dashboard/service/categories");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Category name
              </FormLabel>
              <FormControl>
                <Input placeholder="Bedroom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
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
        <span />
        <div className="col-span-2 pt-4">
          <div className="flex justify-end mb-4">
            <Button
              type="button"
              animation={"scale_both"}
              size={"sm"}
              onClick={() =>
                itemAppend({
                  item_name: "",
                  price: 0,
                  status: "active",
                })
              }
            >
              Add Item
            </Button>
          </div>
          {itemFields.map((_, index) => (
            <div
              key={index}
              className={`grid sm:grid-cols-2 gap-4 mb-4 pb-5 ${
                index !== itemFields.length - 1 ? "border-b" : ""
              }`}
            >
              {index !== 0 && (
                <>
                  <span />
                  <div
                    className="
                  w-full flex gap-4 justify-end
                "
                  >
                    <Button
                      type="button"
                      className="w-fit"
                      variant={"outline"}
                      animation={"scale_in"}
                      onClick={() => itemRemove(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </>
              )}
              <FormField
                control={form.control}
                name={`items.${index}.item_name`}
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="font-normal text-sm">
                      Item name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Item 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.price`}
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="font-normal text-sm">
                      Price ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        {...field}
                        // type="number"
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
              <FormField
                control={form.control}
                name={`items.${index}.status`}
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="font-normal text-sm">
                      Status
                    </FormLabel>
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
            </div>
          ))}
        </div>

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

export default CategoryForm;
