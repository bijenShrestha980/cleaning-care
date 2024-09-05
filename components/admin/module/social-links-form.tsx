"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const SocialLinksForm = () => {
  const router = useRouter();

  const formSchema = z.object({
    facebook: z.string().url(),
    instagram: z.string().url(),
    tiktok: z.string().url(),
    youtube: z.string().url(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "",
      instagram: "",
      tiktok: "",
      youtube: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">Facebook</FormLabel>
              <FormControl>
                <Input placeholder="Facebook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">Instagram</FormLabel>
              <FormControl>
                <Input placeholder="Instagram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktok"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">Tiktok</FormLabel>
              <FormControl>
                <Input placeholder="Tiktok" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-sm">Youtube</FormLabel>
              <FormControl>
                <Input placeholder="Youtube" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span />

        <div className="flex justify-end gap-4">
          <Button type="submit" animation={"scale_in"}>
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialLinksForm;
