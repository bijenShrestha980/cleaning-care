import { StaticImageData } from "next/image";
import { z } from "zod";
import validator from "validator";
import { features } from "process";

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const quoteStatusSchema = z.enum([
  "received_from_user",
  "quote_sent_to_user",
  "work_in_progress",
  "completed",
  "invoice_sent",
  "payment_complete",
]);

export const heroSectionSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  order: z.coerce
    .number() // Force it to be a number
    .int() // Make sure it's an integer
    .gte(1) // Greater than or equal to the smallest 5 digit int
    .lte(10), // Less than or equal to the largest 5 digit int,
  status: z.enum(["active", "inactive"]),
  hero_image: z
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
    )
    .nullable(),
  hero_image_url: z.string().optional(),
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
        .max(9999, {
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
        price: z.string(),
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
    )
    .nullable(),
  banner_image_url: z.string().optional(),
  section_one_image_url: z.string().optional(),
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
    )
    .nullable(),
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
        )
        .nullable(),
      icon_url: z.string().optional(),
    })
  ),
  serviceitems: z
    .array(
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
        icon_url: z.string().optional(),
      })
    )
    .optional(),
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
  id: z.number().optional(),
  full_name: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  phone_number: z.string().refine(validator.isMobilePhone),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  postal_code: z.string(),
  quote: z.string().min(1, {
    message: "Quote is required",
  }),
  service_category_ids: z.array(z.number()).optional(),
  status: z
    .enum([
      "received_from_user",
      "quote_sent_to_user",
      "work_in_progress",
      "completed",
      "invoice_sent",
      "payment_complete",
    ])
    .optional(),
  senduserquoteservice: z
    .array(
      z.object({
        id: z.number(),
        service_category_id: z.number(),
        send_user_quote_id: z.number(),
        servicecategory: z.object({
          id: z.number(),
          servicecategoryitems: z.array(
            z.object({
              service_category_id: z.number(),
              item_name: z.string(),
              price: z.string(),
            })
          ),
        }),
      })
    )
    .optional(),
});

const categorySchema = z.object({
  service_category_item_id: z.array(z.number()),
  price: z.array(z.string()),
});

export const quoteToUserSchema = z.object({
  send_user_quote_id: z.number().min(1, {
    message: "Quote id is required",
  }),
  service_category_id: z.array(z.number()),
  categories: z.record(z.string(), categorySchema),
});

export const siteAdminSchema = z.object({
  site_title: z.string().min(1, { message: "Site title is required" }),
  site_address: z.string().min(1, { message: "Site address is required" }),
  email1: z.string().email(),
  email2: z.union([z.literal(""), z.string().email()]),
  contact_number1: z.string().refine(validator.isMobilePhone, {
    message: "Invalid contact number",
  }),
  contact_number2: z.union([
    z.literal(""),
    z
      .string()
      .refine(validator.isMobilePhone, { message: "Invalid contact number" }),
  ]),
  open_day: z.string(),
  open_time: z.string(),
  image_url: z.string().optional(),
  site_logo: z.union([
    z
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
    z.string(),
  ]),
  copyright: z.string().min(1, { message: "Copy right is required" }),
  google_map: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  term_condition: z.string().optional(),
  privacy_policy: z.string().optional(),
  license: z.string().optional(),
});

export const socialLinksSchema = z.object({
  facebook: z.string().url(),
  instagram: z.string().url(),
  twitter: z.string().url(),
  youtube: z.string().url(),
});

export const changePasswordSchema = z
  .object({
    current_password: z
      .string({
        required_error: "Current Password is required",
      })
      .min(1, {
        message: "Current Password is required",
      })
      .max(100),
    new_password: z
      .string({
        required_error: "New Password is required",
      })
      .min(1, {
        message: "New Password is required",
      })
      .max(100)
      .refine(
        (value) =>
          /^(?=.*\d)(?=.*[!@#$%^&_*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
        {
          message:
            "New Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      ),
    new_password_confirmation: z
      .string({
        required_error: "Confirm Password is required",
      })
      .max(100),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const requestCallbackSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
});

export const aboutUsSchema = z.object({
  id: z.number().optional(),
  heading: z.string().min(1, { message: "Heading is required" }),
  about: z.string().min(1, { message: "About is required" }),
  short_description: z
    .string()
    .min(1, { message: "Short description is required" }),
  description: z.string().min(1, { message: "Description is required" }),
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
    )
    .nullable(),
  banner_image_url: z.string().optional(),
  story_title: z.string().min(1, { message: "Story title is required" }),
  story_description: z
    .string()
    .min(1, { message: "Story description is required" }),
  story_image: z
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
    )
    .nullable(),
  story_image_url: z.string().optional(),
  team_title: z.string().min(1, { message: "Team title is required" }),
  team_description: z
    .string()
    .min(1, { message: "Team description is required" }),
  team_image: z
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
    )
    .nullable(),
  team_image_url: z.string().optional(),
  mission_title: z.string().min(1, { message: "Mission title is required" }),
  mission_description: z
    .string()
    .min(1, { message: "Mission description is required" }),
  mission_image: z
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
    )
    .nullable(),
  mission_image_url: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export const whyChooseUsFeaturesSchema = z.object({
  id: z.number().optional(),
  why_choose_us_id: z.string(),
  feature_title: z.string().min(1, { message: "Title is required" }),
  feature_short_description: z
    .string()
    .min(1, { message: "Short description is required" }),
  icon: z
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
    )
    .nullable(),
  icon_url: z.string().optional(),
});

export const whyChooseUsSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  short_description: z
    .string()
    .min(1, { message: "Short description is required" }),
  type: z.enum(["chooseus", "values", "bookservice"]),
  features: z.array(whyChooseUsFeaturesSchema).optional(),
});

export const bankAccountDetailsSchema = z.object({
  id: z.number().optional(),
  bank_name: z.string().min(1, { message: "Bank name is required" }),
  account_number: z.string().min(1, { message: "Account number is required" }),
  account_bsb: z.string().min(1, { message: "Account bsb is required" }),
});

export type QuoteStatus = z.infer<typeof quoteStatusSchema>;

export type HeroSection = z.infer<typeof heroSectionSchema>;

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

export type Type = z.infer<typeof typeSchema>;

export type Service = z.infer<typeof serviceSchema>;

export type Testimonial = z.infer<typeof testimonialSchema>;

export type Faq = z.infer<typeof faqSchema>;

export type Quote = z.infer<typeof quoteSchema>;

export type QuoteToUser = z.infer<typeof quoteToUserSchema>;

export type SiteAdmin = z.infer<typeof siteAdminSchema>;

export type SocialLinks = z.infer<typeof socialLinksSchema>;

export type ChangePassword = z.infer<typeof changePasswordSchema>;

export type RequestCallback = z.infer<typeof requestCallbackSchema>;

export type AboutUs = z.infer<typeof aboutUsSchema>;

export type WhyChooseUs = z.infer<typeof whyChooseUsSchema>;

export type WhyChooseUsFeatures = z.infer<typeof whyChooseUsFeaturesSchema>;

export type BankAccountDetails = z.infer<typeof bankAccountDetailsSchema>;
