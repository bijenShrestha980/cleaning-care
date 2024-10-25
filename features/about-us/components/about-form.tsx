"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { CustomImage } from "@/components/ui/custom-image";
import { AboutUs, aboutUsSchema } from "@/components/admin/data/schema";
import { useAboutUs } from "../api/use-service-about-us";
import { useCreateAboutUs } from "../api/use-create-about-us";
import { useUpdateAboutUs } from "../api/use-update-about-us";

const AboutFormComp = () => {
  const { data: aboutUsData, isPending, isError } = useAboutUs();

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return <AboutForm aboutUs={aboutUsData[0]} />;
};

const AboutForm = ({ aboutUs }: { aboutUs: AboutUs }) => {
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    aboutUs?.banner_image_url || null
  );
  const [storyPreview, setStoryPreview] = useState<string | null>(
    aboutUs?.story_image_url || null
  );
  const [teamPreview, setTeamPreview] = useState<string | null>(
    aboutUs?.team_image_url || null
  );
  const [missionPreview, setMissionPreview] = useState<string | null>(
    aboutUs?.mission_image_url || null
  );
  const { mutate: createAboutUs, isPending: createIsPending } =
    useCreateAboutUs();
  const { mutate: updateAboutUs, isPending: updateIsPending } =
    useUpdateAboutUs(aboutUs.id);

  const formSchema = aboutUsSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: aboutUs?.heading || "",
      about: aboutUs?.about || "",
      short_description: aboutUs?.short_description || "",
      description: aboutUs?.description || "",
      status: aboutUs?.status || "active",
      banner_image: null,
      story_title: aboutUs?.story_title || "",
      story_description: aboutUs?.story_description || "",
      story_image: null,
      team_title: aboutUs?.team_title || "",
      team_description: aboutUs?.team_description || "",
      team_image: null,
      mission_title: aboutUs?.mission_title || "",
      mission_description: aboutUs?.mission_description || "",
      mission_image: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("heading", values.heading);
    formData.append("about", values.about);
    formData.append("short_description", values.short_description);
    formData.append("description", values.description);
    formData.append("status", values.status);
    values.banner_image && formData.append("banner_image", values.banner_image);
    formData.append("story_title", values.story_title);
    formData.append("story_description", values.story_description);
    values.story_image && formData.append("story_image", values.story_image);
    formData.append("team_title", values.team_title);
    formData.append("team_description", values.team_description);
    values.team_image && formData.append("team_image", values.team_image);
    formData.append("mission_title", values.mission_title);
    formData.append("mission_description", values.mission_description);
    values.mission_image &&
      formData.append("mission_image", values.mission_image);
    aboutUs?.id && formData.append("id", aboutUs?.id?.toString());
    if (aboutUs.id) {
      updateAboutUs({ data: formData as any, id: aboutUs.id });
    } else {
      createAboutUs(formData as any);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full select-none"
      >
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Heading</FormLabel>
              <FormControl>
                <Input placeholder="Heading here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">About</FormLabel>
              <FormControl>
                <Input placeholder="About" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Short Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short description here"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description here" {...field} rows={4} />
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
                    <SelectValue placeholder="Status" />
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
        <FormField
          control={form.control}
          name="banner_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 2xl:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Banner image
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-[50px] h-[50px] rounded-lg hidden sm:flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                          onChange(e.target.files?.[0]);
                          setBannerPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                        // className="w-fit"
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <FormLabel className="font-normal text-sm">
                    Image (Preview)
                  </FormLabel>
                  {bannerPreview ? (
                    <CustomImage
                      src={bannerPreview}
                      alt="logo"
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

        <Separator className="col-span-2 my-2" />
        <FormField
          control={form.control}
          name="story_title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Story title</FormLabel>
              <FormControl>
                <Input placeholder="Story title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="story_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Story image
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-[50px] h-[50px] rounded-lg hidden sm:flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                          onChange(e.target.files?.[0]);
                          setStoryPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <FormLabel className="font-normal text-sm">
                    Image (Preview)
                  </FormLabel>
                  {storyPreview ? (
                    <CustomImage
                      src={storyPreview}
                      alt="logo"
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
          name="story_description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                Story Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Story description here"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-span-2 my-2" />
        <FormField
          control={form.control}
          name="team_title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">Team title</FormLabel>
              <FormControl>
                <Input placeholder="Team title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Team image
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-[50px] h-[50px] rounded-lg hidden sm:flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                          onChange(e.target.files?.[0]);
                          setTeamPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <FormLabel className="font-normal text-sm">
                    Image (Preview)
                  </FormLabel>
                  {teamPreview ? (
                    <CustomImage
                      src={teamPreview}
                      alt="logo"
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
          name="team_description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                Team Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Team description here"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-span-2 my-2" />
        <FormField
          control={form.control}
          name="mission_title"
          render={({ field }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <FormLabel className="font-normal text-sm">
                Mission title
              </FormLabel>
              <FormControl>
                <Input placeholder="Team title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mission_image"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem className="col-span-2 sm:col-span-1">
              <div className="flex flex-col sm:flex-row gap-12">
                <span>
                  <FormLabel className="font-normal text-sm">
                    Mission image
                  </FormLabel>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-[50px] h-[50px] rounded-lg hidden sm:flex items-center justify-center bg-[#ecedee] overflow-hidden">
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
                          onChange(e.target.files?.[0]);
                          setMissionPreview(
                            file ? URL.createObjectURL(file) : null
                          );
                        }}
                      />
                    </FormControl>
                  </div>
                </span>
                <div className="flex flex-col items-center">
                  <FormLabel className="font-normal text-sm">
                    Image (Preview)
                  </FormLabel>
                  {missionPreview ? (
                    <CustomImage
                      src={missionPreview}
                      alt="logo"
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
          name="mission_description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="font-normal text-sm">
                Mission Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mission description here"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span />
        <div className="flex justify-center sm:justify-end gap-4 w-full fixed bottom-0 right-0 p-4 bg-slate-200 sm:bg-gradient-to-r xl:from-white xl:via-white xl:to-slate-200 from-white to-slate-200 rounded-t-md">
          <Button
            type="submit"
            animation={"scale_in"}
            disabled={createIsPending || updateIsPending}
            className="w-full sm:w-[86px]"
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

export default AboutFormComp;
