"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, User } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomImage } from "@/components/ui/custom-image";
import CustomEditor from "@/components/editor";
import { Blog, blogSchema } from "@/components/admin/data/schema";
import { useCreateBlog } from "@/features/blogs/api/use-create-blog";
import { useUpdateBlog } from "@/features/blogs/api/use-update-blog";
import { useDeleteBlog } from "@/features/blogs/api/use-delete-blog";
import { quillModules } from "@/constants/quill-module";

const BlogForm = ({ blog, id }: { blog?: Blog; id?: string | number }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    blog?.image_url || null,
  );
  const [authorImagePreview, setAuthorImagePreview] = useState<string | null>(
    blog?.author_image_url || null,
  );

  const { mutate: createBlog, isPending: createIsPending } = useCreateBlog();
  const { mutate: updateBlog, isPending: updateIsPending } = useUpdateBlog(id);
  const { mutate: deleteBlog, isPending: deleteIsPending } = useDeleteBlog();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      slug: blog?.slug || "",
      short_description: blog?.short_description || "",
      content: blog?.content || "",
      author_name: blog?.author_name || "",
      author_email: blog?.author_email || "",
      author_phone: blog?.author_phone || "",
      address: blog?.address || "",
      category: blog?.category || "",
      tags: blog?.tags || "",
      url: blog?.url || "",
      image: blog?.image_url || undefined,
      image_url: blog?.image_url,
      author_image: blog?.author_image_url || null,
      author_image_url: blog?.author_image_url,
      meta_title: blog?.meta_title || "",
      meta_description: blog?.meta_description || "",
      meta_keywords: blog?.meta_keywords || "",
      meta_robots: blog?.meta_robots || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    const formData = new FormData();
    if (id) formData.append("id", id.toString());
    formData.append("title", values.title);
    if (values.slug) formData.append("slug", values.slug);
    formData.append("short_description", values.short_description);
    formData.append("content", values.content);
    formData.append("author_name", values.author_name);
    formData.append("author_email", values.author_email);
    if (values.author_phone)
      formData.append("author_phone", values.author_phone);
    if (values.address) formData.append("address", values.address);
    if (values.category) formData.append("category", values.category);
    if (values.tags) formData.append("tags", values.tags);
    if (values.url) formData.append("url", values.url);
    if (values.meta_title) formData.append("meta_title", values.meta_title);
    if (values.meta_description)
      formData.append("meta_description", values.meta_description);
    if (values.meta_keywords)
      formData.append("meta_keywords", values.meta_keywords);
    if (values.meta_robots) formData.append("meta_robots", values.meta_robots);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    } else if (id && typeof values.image === "string" && values.image) {
      formData.append("image", values.image);
    }
    if (values.author_image instanceof File) {
      formData.append("author_image", values.author_image);
    } else if (
      id &&
      typeof values.author_image === "string" &&
      values.author_image
    ) {
      formData.append("author_image", values.author_image);
    }

    if (id) {
      updateBlog({ data: formData, id });
    } else {
      createBlog(formData);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 w-full select-none pb-24"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Title</FormLabel>
              <FormControl>
                <Input placeholder="A great cleaning tip..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Slug (optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="auto-generated if blank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Featured image
                  </FormLabel>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ecedee] overflow-hidden">
                      <User className="text-[#596579] h-6 w-6" />
                    </div>
                    <FormControl>
                      <Input
                        type="file"
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                          setImagePreview(
                            file ? URL.createObjectURL(file) : null,
                          );
                        }}
                        className="w-full"
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <Label className="font-normal text-sm">Image (Preview)</Label>
                  {imagePreview ? (
                    <CustomImage
                      src={imagePreview}
                      alt="featured"
                      fill
                      sizes="64px"
                      containerClassName="w-[64px] h-[64px]"
                      className="mt-2 rounded-sm w-[64px] h-[64px] object-cover object-center"
                    />
                  ) : (
                    <User
                      size={64}
                      className="mt-2 rounded-sm w-[64px] h-[64px] object-cover object-center"
                    />
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                Short description
              </FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Summary..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">Content</FormLabel>
              <FormControl>
                <div className="bg-white">
                  <CustomEditor
                    theme="snow"
                    value={field.value || ""}
                    onChange={field.onChange}
                    modules={quillModules}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="col-span-2 my-4" />
        <p className="col-span-2 font-medium">Author</p>

        <FormField
          control={form.control}
          name="author_name"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Author name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author_email"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Author email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="jane@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author_phone"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Author phone (optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="+61..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Address (optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="City, State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Author image (optional)
                  </FormLabel>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ecedee] overflow-hidden">
                      <User className="text-[#596579] h-6 w-6" />
                    </div>
                    <FormControl>
                      <Input
                        type="file"
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                          setAuthorImagePreview(
                            file ? URL.createObjectURL(file) : null,
                          );
                        }}
                        className="w-full"
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <Label className="font-normal text-sm">Image (Preview)</Label>
                  {authorImagePreview ? (
                    <CustomImage
                      src={authorImagePreview}
                      alt="author"
                      fill
                      sizes="64px"
                      containerClassName="w-[64px] h-[64px]"
                      className="mt-2 rounded-sm w-[64px] h-[64px] object-cover object-center"
                    />
                  ) : (
                    <User
                      size={64}
                      className="mt-2 rounded-sm w-[64px] h-[64px] object-cover object-center"
                    />
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="col-span-2 my-4" />
        <p className="col-span-2 font-medium">Taxonomy & link</p>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Category (optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="Tips, News..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Tags (comma separated)
              </FormLabel>
              <FormControl>
                <Input placeholder="cleaning, kitchen, tips" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                External URL (optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="col-span-2 my-4" />
        <p className="col-span-2 font-medium">SEO</p>

        <FormField
          control={form.control}
          name="meta_title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Meta title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta_robots"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Meta robots</FormLabel>
              <FormControl>
                <Input placeholder="index, follow" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta_description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                Meta description
              </FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta_keywords"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                Meta keywords
              </FormLabel>
              <FormControl>
                <Input placeholder="keyword1, keyword2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
          {id && (
            <Button
              variant={"ghost"}
              animation={"scale_in"}
              className="w-full md:w-[86px]"
              disabled={createIsPending || updateIsPending || deleteIsPending}
              type="button"
              onClick={() => deleteBlog(id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
          )}
          <Link
            href="/cleaning-care-admin/dashboard/blog/blog-list"
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

export default BlogForm;
