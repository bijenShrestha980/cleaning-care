import { StaticImageData } from "next/image";
import { z } from "zod";

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const heroSectionSchema = z.object({
  service: z.string(),
  description: z.string(),
  order: z.string(),
  catStatus: z.enum(["active", "inactive"]),
  image: z.custom<File>((v) => v instanceof File).optional(),
});

export const serviceCategorySchema = z.object({
  id: z.number().optional(),
  category_name: z
    .string()
    .min(2, { message: "Category name is required." })
    .trim(),
  status: z.enum(["active", "inactive"]),
  items: z.array(
    z.object({
      item_name: z
        .string()
        .min(2, { message: "Item name is required." })
        .trim(),
      price: z
        .number()
        .min(1, {
          message: "Price is required",
        })
        .max(1000000, {
          message: "Price is too high",
        }),
      status: z.enum(["active", "inactive"]),
    })
  ),
  servicecategoryitems: z
    .array(
      z.object({
        item_name: z
          .string()
          .min(2, { message: "Item name is required." })
          .trim(),
        price: z
          .number()
          .min(1, {
            message: "Price is required",
          })
          .max(1000000, {
            message: "Price is too high",
          }),
        status: z.enum(["active", "inactive"]),
      })
    )
    .optional(),
});

export const typeSchema = z.object({
  type: z.string(),
  status: z.enum(["active", "inactive"]),
  types: z.array(z.object({ category: z.string(), count: z.number().min(1) })),
});

export const serviceSchema = z.object({
  id: z.number().optional(),
  service_name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, {
      message: "Name is required",
    }),
  short_description: z
    .string({
      required_error: "Detail is required",
    })
    .min(1, {
      message: "Detail is required",
    }),
  long_description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, {
      message: "Description is required",
    }),
  service_category_id: z.string().min(1, {
    message: "Category is required",
  }),
  status: z.enum(["active", "inactive"]),
  banner_image: z
    .union([
      z.instanceof(File, {
        message: "Image is required",
      }),
      z.string().optional(),
    ])
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (file) =>
        file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    ),
  // categories: z.array(z.object({ value: z.string(), label: z.string() })),
  section_one_title: z.string().min(1, {
    message: "Title is required",
  }),
  section_one_description: z.string().min(1, {
    message: "Description is required",
  }),
  section_one_image: z
    .instanceof(File, {
      message: "Image is required",
    })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    ),
  section_two_title: z.string().min(1, {
    message: "Title is required",
  }),
  section_two_description: z.string().min(1, {
    message: "Description is required",
  }),
  service_items: z.array(
    z.strictObject({
      item_name: z.string().min(1, {
        message: "Name is required",
      }),
      short_description: z.string().min(1, {
        message: "Description is required",
      }),
      icon: z
        .instanceof(File, {
          message: "Image is required",
        })
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
            ", "
          )}.`
        )
        .nullable(),
    })
  ),
  // sectionThree: z
  //   .strictObject({
  //     title: z.string(),
  //     description: z.string(),
  //     features: z.array(
  //       z.strictObject({
  //         title: z.string(),
  //         description: z.string(),
  //       })
  //     ),
  //   })
  //   .optional(),
});

export const testimonialSchema = z.object({
  id: z.number() || z.string(),
  name: z.string(),
  testimonial: z.string(),
  image: z.custom<StaticImageData>((v) => v instanceof File) || z.string(),
});

export const faqSchema = z.object({
  category: z.string(),
  question: z.string(),
  answer: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export const quoteSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  postalCode: z.string(),
  message: z.string(),
  categories: z.array(
    z.object({ label: z.string(), value: z.number().min(1) })
  ),
  quoteStatus: z.enum([
    "pending",
    "processing",
    "accepted",
    "in-progress",
    "rejected",
    "completed",
  ]),
});

export type HeroSection = z.infer<typeof heroSectionSchema>;

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

export type Type = z.infer<typeof typeSchema>;

export type Service = z.infer<typeof serviceSchema>;

export type Testimonial = z.infer<typeof testimonialSchema>;

export type Faq = z.infer<typeof faqSchema>;

export type Quote = z.infer<typeof quoteSchema>;
