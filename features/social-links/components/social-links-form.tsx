"use client";

import { LoaderCircle } from "lucide-react";
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
import { socialLinksSchema } from "@/components/admin/data/schema";
import { useCreateSocialLinks } from "@/features/social-links/api/use-create-social-link";
import { useAllSocialLinks } from "@/features/social-links/api/use-social-link";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

const SocialLinksForm = () => {
  const {
    data: socialLinks,
    isPending: socialLinksIsPending,
    isError: socialLinksIsError,
  } = useAllSocialLinks();

  if (socialLinksIsPending) {
    return <Loading />;
  }
  if (socialLinksIsError) {
    return <Error />;
  }
  return (
    <FormComponent
      facebook={socialLinks[0]?.facebook}
      instagram={socialLinks[0]?.instagram}
      twitter={socialLinks[0]?.twitter}
      youtube={socialLinks[0]?.youtube}
    />
  );
};

const FormComponent = ({
  facebook,
  instagram,
  twitter,
  youtube,
}: {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}) => {
  const { mutate: createSocialLinks, isPending: createIsPending } =
    useCreateSocialLinks();

  const formSchema = socialLinksSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: facebook || "",
      instagram: instagram || "",
      twitter: twitter || "",
      youtube: youtube || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createSocialLinks(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
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
            <FormItem className="col-span-2 md:col-span-1">
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
          name="twitter"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel className="font-normal text-sm">Twitter</FormLabel>
              <FormControl>
                <Input placeholder="Twitter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel className="font-normal text-sm">Youtube</FormLabel>
              <FormControl>
                <Input placeholder="Youtube" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span />

        <div className="col-span-2 flex justify-end gap-4">
          <Button
            type="submit"
            animation={"scale_in"}
            disabled={createIsPending}
            className="w-full md:w-fit"
          >
            {createIsPending ? (
              <LoaderCircle className="animate-spin" width={20} height={20} />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialLinksForm;
