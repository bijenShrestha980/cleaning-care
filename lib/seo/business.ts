import { fetchAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import { SITE } from "./config";

export type BusinessInfo = {
  name: string;
  legalName: string;
  url: string;
  logo: string;
  description: string;
  phone: string;
  phoneAlt?: string;
  email: string;
  emailAlt?: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: "AU";
  abn?: string;
  geo?: { latitude: number; longitude: number };
  openingHours: string[];
  priceRange: string;
  sameAs: string[];
  areaServed: string[];
};

const BUSINESS_FALLBACK: BusinessInfo = {
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/images/logo-color.png`,
  description: SITE.defaultDescription,
  phone: "+61000000000",
  email: "info@cleaningcare.au",
  streetAddress: "",
  addressLocality: "Sydney",
  addressRegion: "NSW",
  postalCode: "2000",
  addressCountry: "AU",
  abn: undefined,
  geo: undefined,
  openingHours: [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-15:00",
  ],
  priceRange: "$$",
  sameAs: [],
  areaServed: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Canberra",
    "Gold Coast",
    "Newcastle",
    "Wollongong",
    "Hobart",
  ],
};

const parseOpeningHours = (openDay?: string, openTime?: string): string[] => {
  if (!openDay || !openTime) return [];
  const [start, end] = openTime.split("-").map((s) => s.trim());
  if (!start || !end) return [];
  const days = openDay
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);
  if (days.length === 0) return [];
  const range = days.length > 1 ? `${days[0]}-${days[days.length - 1]}` : days[0];
  return [`${range} ${start}-${end}`];
};

const splitAuAddress = (
  raw?: string
): Pick<
  BusinessInfo,
  "streetAddress" | "addressLocality" | "addressRegion" | "postalCode"
> => {
  if (!raw) {
    return {
      streetAddress: BUSINESS_FALLBACK.streetAddress,
      addressLocality: BUSINESS_FALLBACK.addressLocality,
      addressRegion: BUSINESS_FALLBACK.addressRegion,
      postalCode: BUSINESS_FALLBACK.postalCode,
    };
  }
  const stateMatch = raw.match(/\b(NSW|VIC|QLD|WA|SA|TAS|ACT|NT)\b/i);
  const postcodeMatch = raw.match(/\b(\d{4})\b/);
  return {
    streetAddress: raw,
    addressLocality: BUSINESS_FALLBACK.addressLocality,
    addressRegion: stateMatch ? stateMatch[1].toUpperCase() : BUSINESS_FALLBACK.addressRegion,
    postalCode: postcodeMatch ? postcodeMatch[1] : BUSINESS_FALLBACK.postalCode,
  };
};

export const getBusinessInfo = async (): Promise<BusinessInfo> => {
  try {
    const data = await fetchAllFundamental();
    const hoursPrimary = parseOpeningHours(data.open_day, data.open_time);
    const hoursSecondary = parseOpeningHours(data.s_open_day, data.s_open_time);
    const address = splitAuAddress(data.site_address);
    return {
      ...BUSINESS_FALLBACK,
      name: data.site_title || BUSINESS_FALLBACK.name,
      logo: data.image_url ? String(data.image_url) : BUSINESS_FALLBACK.logo,
      phone: data.contact_number1 || BUSINESS_FALLBACK.phone,
      phoneAlt: data.contact_number2 || undefined,
      email: data.email1 || BUSINESS_FALLBACK.email,
      emailAlt: data.email2 || undefined,
      ...address,
      openingHours:
        [...hoursPrimary, ...hoursSecondary].length > 0
          ? [...hoursPrimary, ...hoursSecondary]
          : BUSINESS_FALLBACK.openingHours,
    };
  } catch {
    return BUSINESS_FALLBACK;
  }
};

export const getBusinessInfoSync = (): BusinessInfo => BUSINESS_FALLBACK;
