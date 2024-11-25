"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, Trash2 } from "lucide-react";

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
import {
  ServiceCategory,
  serviceCategorySchema,
} from "@/components/admin/data/schema";
import { useCreateServiceCategory } from "@/features/service-categories/api/use-create-service-category";
import { useUpdateServiceCategory } from "@/features/service-categories/api/use-update-service-category";
import { useDeleteServiceCategory } from "@/features/service-categories/api/use-delete-service-category";
import { useDeleteServiceCategoryItem } from "../api/use-delete-service-category-item";
import { useEffect, useState } from "react";

const CategoryForm = ({
  serviceCategory,
  id,
}: {
  serviceCategory?: ServiceCategory;
  id?: string | number;
}) => {
  const { category_name, status, items } = serviceCategory || {};

  const { mutate: createServiceCategory, isPending: createIsPending } =
    useCreateServiceCategory();
  const { mutate: updateServiceCategory, isPending: updateIsPending } =
    useUpdateServiceCategory(id);
  const { mutate: deleteCategory, isPending: deleteIsPending } =
    useDeleteServiceCategory();
  const {
    mutate: deleteCategoryItem,
    isPending: deleteItemIsPending,
    isSuccess: deleteItemIsSuccess,
  } = useDeleteServiceCategoryItem();
  const [index, setIndex] = useState<number>();

  const formSchema = serviceCategorySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: category_name || "",
      status: status || "active",
      items: items || [
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

  useEffect(() => {
    if (deleteItemIsSuccess) {
      itemRemove(index);
    }
  }, [deleteItemIsSuccess, index, itemRemove]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (id) {
      updateServiceCategory({ data: values, id });
    } else {
      createServiceCategory(values);
    }
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
          {itemFields.map((item, index) => (
            <div
              key={index}
              className={`grid sm:grid-cols-2 gap-4 mb-4 pb-5 animate-in slide-in-from-top ${
                index !== itemFields.length - 1 ? "border-b" : ""
              }`}
            >
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
                  onClick={() =>
                    items &&
                    items[index].id !== undefined &&
                    (deleteCategoryItem(items[index].id), setIndex(index))
                  }
                  disabled={deleteItemIsPending}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`items.${index}.item_name`}
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="font-normal text-sm">
                      Item name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={`Item ${index + 1}`} {...field} />
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
        <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
          {id && (
            <Button
              variant={"ghost"}
              animation={"scale_in"}
              className="w-full md:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
              onClick={() => deleteCategory(id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
          )}
          <Link
            href="/cleaning-care-admin/dashboard/service/categories"
            className="w-full sm:w-[86px]"
          >
            <Button
              variant={"outline"}
              animation={"scale_in"}
              className="w-full sm:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            animation={"scale_in"}
            className="w-full sm:w-[86px]"
            disabled={createIsPending || updateIsPending || deleteIsPending}
          >
            {createIsPending || updateIsPending ? (
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

export default CategoryForm;
