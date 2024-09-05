import {
  Category,
  Faq,
  HeroSection,
  Testimonial,
  Type,
} from "@/components/admin/data/schema";
import { user_1, user_2, user_3, user_4 } from "./images";

const heroSectionData: HeroSection[] = [
  {
    service: "Service 1",
    description: "We provide best parcel and dispatch service",
    order: "1",
    catStatus: "active",
  },
];

const categoryData: Category[] = [
  {
    category: "Bedroom",
    status: "active",
  },
  {
    category: "Bathrom",
    status: "active",
  },
  {
    category: "Kitchen",
    status: "inactive",
  },
];

const typeData: Type[] = [
  {
    type: "Bed & Bath",
    status: "active",
    types: [
      {
        category: "Bedroom",
        count: 3,
      },
      {
        category: "Bathroom",
        count: 2,
      },
    ],
  },
  {
    type: "Kitchen & Barbeque",
    status: "active",
    types: [
      {
        category: "Bedroom",
        count: 1,
      },
    ],
  },
  {
    type: "Apartment",
    status: "inactive",
    types: [
      {
        category: "Bedroom",
        count: 1,
      },
    ],
  },
  {
    type: "Unit",
    status: "active",
    types: [
      {
        category: "Bedroom",
        count: 1,
      },
    ],
  },
];

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Niggy Lois, Founder chairman",
    image: user_1,
    testimonial:
      "Coat-genix is filling the huge gap between seller and customer.",
  },
  {
    id: 2,
    name: "Niggy Lois, Founder chairman",
    image: user_2,
    testimonial:
      "Coat-genix is filling the huge gap between seller and customer.",
  },
  {
    id: 3,
    name: "Niggy Lois, Founder chairman",
    image: user_3,
    testimonial:
      "Coat-genix is filling the huge gap between seller and customer.",
  },
  {
    id: 4,
    name: "Niggy Lois, Founder chairman",
    image: user_4,
    testimonial:
      "Coat-genix is filling the huge gap between seller and customer.",
  },
];

const faqData: Faq[] = [
  {
    category: "General",
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    status: "active",
  },
  {
    category: "General",
    question: "What is the refund policy?",
    answer:
      "We offer a 30-day money-back guarantee if you’re not satisfied with our product. We’ll refund your money without any questions.",
    status: "active",
  },
  {
    category: "General",
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You can also upgrade or downgrade your subscription at any time.",
    status: "inactive",
  },
];

export { heroSectionData, categoryData, typeData, testimonialData, faqData };
