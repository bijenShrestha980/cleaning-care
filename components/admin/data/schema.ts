import { StaticImageData } from "next/image";
import { z } from "zod";

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

export type Testimonial = z.infer<typeof testimonialSchema>;

export type Faq = z.infer<typeof faqSchema>;
