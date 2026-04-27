export const SITE = {
  url: "https://cleaningcare.au",
  name: "Cleaning Care",
  legalName: "Cleaning Care Pty Ltd",
  tagline: "Caring for Cleanliness, Caring for You",
  defaultTitle:
    "Cleaning Care | Professional Cleaning Services Across Australia",
  defaultDescription:
    "Trusted residential, commercial, end-of-lease and carpet cleaning services across Australia. 5-star rated, fully insured, satisfaction guaranteed. Get a free quote in 60 seconds.",
  defaultLocale: "en_AU",
  twitter: "@cleaningcare",
  themeColor: "#8CC540",
  defaultKeywords: [
    "cleaning services australia",
    "house cleaning",
    "commercial cleaning",
    "end of lease cleaning",
    "carpet cleaning",
    "office cleaning",
    "domestic cleaning",
    "professional cleaners",
    "cleaning company near me",
  ],
} as const;

export type SiteConfig = typeof SITE;

export const absoluteUrl = (path: string): string => {
  if (!path) return SITE.url;
  if (/^https?:\/\//.test(path)) return path;
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${cleaned}`;
};
