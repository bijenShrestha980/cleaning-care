import { StaticImageData } from "next/image";
import { z } from "zod";

export const heroSectionSchema = z.object({
  service: z.string(),
  description: z.string(),
  order: z.string(),
  catStatus: z.enum(["active", "inactive"]),
  image: z.custom<File>((v) => v instanceof File).optional(),
});

export const categorySchema = z.object({
  category: z
    .string({
      required_error: "Category is required",
    })
    .min(1, {
      message: "Category is required",
    }),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1)
    .max(1000000),
  status: z.enum(["active", "inactive"]),
});

export const typeSchema = z.object({
  type: z.string(),
  status: z.enum(["active", "inactive"]),
  types: z.array(z.object({ category: z.string(), count: z.number().min(1) })),
});

export const serviceSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, {
      message: "Name is required",
    }),
  detail: z
    .string({
      required_error: "Detail is required",
    })
    .min(1, {
      message: "Detail is required",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, {
      message: "Description is required",
    }),
  status: z.enum(["active", "inactive"]),
  categories: z.array(z.object({ value: z.string(), label: z.string() })),
  sectionOne: z
    .strictObject({
      title: z.string(),
      description: z.string(),
      image: z.custom<StaticImageData>((v) => v instanceof File) || z.string(),
    })
    .optional(),
  sectionTwo: z
    .strictObject({
      title: z.string(),
      description: z.string(),
      features: z.array(
        z.strictObject({
          title: z.string(),
          description: z.string(),
          image:
            z.custom<StaticImageData>((v) => v instanceof File) || z.string(),
        })
      ),
    })
    .optional(),
  sectionThree: z
    .strictObject({
      title: z.string(),
      description: z.string(),
      features: z.array(
        z.strictObject({
          title: z.string(),
          description: z.string(),
        })
      ),
    })
    .optional(),
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

export type Category = z.infer<typeof categorySchema>;

export type Type = z.infer<typeof typeSchema>;

export type Service = z.infer<typeof serviceSchema>;

export type Testimonial = z.infer<typeof testimonialSchema>;

export type Faq = z.infer<typeof faqSchema>;

export type Quote = z.infer<typeof quoteSchema>;
