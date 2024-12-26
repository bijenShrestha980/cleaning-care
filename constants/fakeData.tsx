import { Faq, Type } from "@/components/admin/data/schema";

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

export { typeData, faqData };
