export type FaqItem = { question: string; answer: string };

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "What cleaning services does Cleaning Care offer in Australia?",
    answer:
      "We provide residential house cleaning, commercial and office cleaning, end-of-lease (bond) cleaning, carpet steam cleaning, deep spring cleans and one-off detail cleans across all major Australian metros.",
  },
  {
    question: "Are your cleaners insured and police-checked?",
    answer:
      "Yes. Every Cleaning Care team member is fully insured, police-checked and trained in our standardised cleaning checklist before being matched with a customer.",
  },
  {
    question: "How quickly can I book a cleaner?",
    answer:
      "Most standard residential and end-of-lease cleans can be scheduled within 24-48 hours. Use our online quote form to get a price in under 60 seconds.",
  },
  {
    question: "Do you offer a satisfaction guarantee?",
    answer:
      "Yes. If something has been missed, let us know within 72 hours of the clean and we will return at no extra cost to make it right.",
  },
  {
    question: "What areas in Australia do you service?",
    answer:
      "We currently service Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, the Gold Coast, Newcastle, Wollongong and Hobart, plus their surrounding suburbs.",
  },
  {
    question: "How are your prices calculated?",
    answer:
      "Pricing is based on property size, the type of clean, the level of detail required and any add-ons such as oven cleaning, carpet steaming or window washing. Quotes are always free and obligation-free.",
  },
];

export const getFaqsForService = (serviceSlug: string): FaqItem[] => {
  const slug = serviceSlug.toLowerCase();
  if (slug.includes("end-of-lease") || slug.includes("bond")) {
    return [
      {
        question: "Do you guarantee bond return on end-of-lease cleans?",
        answer:
          "Our end-of-lease checklist follows the standard Australian real-estate exit clean specification. If your agent flags anything within 72 hours, we return free of charge.",
      },
      {
        question: "What is included in an end-of-lease clean?",
        answer:
          "Full kitchen (including oven, range hood and inside cupboards), bathrooms, all floors vacuumed and mopped, walls spot-cleaned, window tracks, light fittings, skirting boards and balconies.",
      },
      {
        question: "Can you steam-clean carpets at the same time?",
        answer:
          "Yes — carpet steam cleaning is a common add-on for end-of-lease cleans and is often required by the lease agreement.",
      },
      ...HOMEPAGE_FAQS.slice(1, 3),
    ];
  }
  if (slug.includes("carpet")) {
    return [
      {
        question: "How long does carpet cleaning take to dry?",
        answer:
          "Most carpets are touch-dry within 2-4 hours and fully dry within 6-12 hours, depending on humidity and ventilation.",
      },
      {
        question: "Do you treat stains and odours?",
        answer:
          "Yes. We pre-treat visible stains and high-traffic areas, and we offer deodorising treatments for pet odours on request.",
      },
      ...HOMEPAGE_FAQS.slice(1, 3),
    ];
  }
  if (slug.includes("commercial") || slug.includes("office")) {
    return [
      {
        question: "Can you clean outside business hours?",
        answer:
          "Yes — early-morning, evening and weekend cleans are standard for our commercial clients to avoid disrupting your team.",
      },
      {
        question: "Do you offer recurring contracts?",
        answer:
          "We offer daily, weekly and fortnightly contracted cleaning with a fixed point-of-contact and consistent cleaning team.",
      },
      ...HOMEPAGE_FAQS.slice(1, 3),
    ];
  }
  return HOMEPAGE_FAQS.slice(0, 4);
};

export const getFaqsForLocation = (city: string): FaqItem[] => [
  {
    question: `Do you service all suburbs of ${city}?`,
    answer: `Yes — our ${city} team covers the CBD, inner suburbs and the wider metropolitan area. Enter your postcode in the quote form to confirm coverage and pricing.`,
  },
  {
    question: `How quickly can I get a cleaner in ${city}?`,
    answer: `Most ${city} bookings are confirmed within 24 hours. Same-day cleans are sometimes available subject to team availability.`,
  },
  {
    question: `Are your ${city} cleaners local?`,
    answer: `Yes. We hire and train cleaners locally in ${city} — every team member is police-checked, insured and reference-verified before being matched with a customer.`,
  },
  ...HOMEPAGE_FAQS.slice(1, 3),
];
