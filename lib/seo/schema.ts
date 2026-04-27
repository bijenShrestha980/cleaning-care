import { SITE, absoluteUrl } from "./config";
import type { BusinessInfo } from "./business";
import type { Location } from "./locations";
import type { FaqItem } from "./faqs";

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.defaultDescription,
  inLanguage: "en-AU",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const organizationSchema = (b: BusinessInfo) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: b.name,
  legalName: b.legalName,
  url: b.url,
  logo: { "@type": "ImageObject", url: b.logo },
  description: b.description,
  email: b.email,
  telephone: b.phone,
  ...(b.abn ? { taxID: b.abn, vatID: b.abn } : {}),
  ...(b.sameAs.length > 0 ? { sameAs: b.sameAs } : {}),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: b.phone,
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: ["en"],
    },
  ],
});

export const localBusinessSchema = (
  b: BusinessInfo,
  opts?: {
    aggregateRating?: { ratingValue: number; reviewCount: number };
    location?: Location;
  }
) => {
  const id = opts?.location
    ? `${SITE.url}/cleaning-services-${opts.location.slug}#localbusiness`
    : `${SITE.url}/#localbusiness`;
  const name = opts?.location
    ? `${b.name} — ${opts.location.city}`
    : b.name;
  const locality = opts?.location?.city ?? b.addressLocality;
  const region = opts?.location?.state ?? b.addressRegion;
  const geo = opts?.location?.geo ?? b.geo;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": id,
    name,
    legalName: b.legalName,
    url: opts?.location ? absoluteUrl(`/cleaning-services-${opts.location.slug}`) : b.url,
    image: b.logo,
    logo: b.logo,
    description: b.description,
    telephone: b.phone,
    email: b.email,
    priceRange: b.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress || undefined,
      addressLocality: locality,
      addressRegion: region,
      postalCode: b.postalCode,
      addressCountry: b.addressCountry,
    },
    ...(geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: b.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      ...parseOpeningHours(hours),
    })),
    areaServed: opts?.location
      ? [
          {
            "@type": "City",
            name: opts.location.city,
            containedInPlace: { "@type": "AdministrativeArea", name: opts.location.stateName },
          },
        ]
      : b.areaServed.map((c) => ({ "@type": "City", name: c })),
    ...(opts?.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: opts.aggregateRating.ratingValue,
            reviewCount: opts.aggregateRating.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
};

const DAY_MAP: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

const parseOpeningHours = (entry: string) => {
  const [dayPart, timePart] = entry.split(" ");
  if (!dayPart || !timePart) return {};
  const [opens, closes] = timePart.split("-");
  const dayCodes = dayPart.includes("-")
    ? expandDayRange(dayPart)
    : [dayPart];
  return {
    dayOfWeek: dayCodes.map((c) => DAY_MAP[c] ?? c),
    opens,
    closes,
  };
};

const expandDayRange = (range: string): string[] => {
  const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const [start, end] = range.split("-");
  const startIdx = order.indexOf(start);
  const endIdx = order.indexOf(end);
  if (startIdx < 0 || endIdx < 0) return [start, end];
  return order.slice(startIdx, endIdx + 1);
};

export type ServiceForSchema = {
  service_name?: string;
  short_description?: string;
  long_description?: string;
  service_slug?: string;
  banner_image_url?: string;
  serviceitems?: Array<{ item_name?: string; short_description?: string }>;
};

export const serviceSchema = (
  service: ServiceForSchema,
  b: BusinessInfo
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": service.service_slug
    ? `${SITE.url}/${service.service_slug}#service`
    : `${SITE.url}/#service`,
  name: service.service_name ?? "Cleaning Service",
  description: service.long_description || service.short_description || "",
  serviceType: service.service_name ?? "Cleaning Service",
  url: service.service_slug ? absoluteUrl(`/${service.service_slug}`) : SITE.url,
  ...(service.banner_image_url ? { image: service.banner_image_url } : {}),
  provider: {
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: b.name,
    telephone: b.phone,
    email: b.email,
    url: b.url,
  },
  areaServed: b.areaServed.map((c) => ({ "@type": "City", name: c })),
  ...(service.serviceitems && service.serviceitems.length > 0
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.service_name ?? "Cleaning"} options`,
          itemListElement: service.serviceitems.map((item, idx) => ({
            "@type": "Offer",
            position: idx + 1,
            itemOffered: {
              "@type": "Service",
              name: item.item_name,
              description: item.short_description,
            },
          })),
        },
      }
    : {}),
});

export type BreadcrumbItem = { name: string; url: string };

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.url),
  })),
});

export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
});

export const aggregateRatingSchema = (
  ratingValue: number,
  reviewCount: number
) => ({
  "@type": "AggregateRating",
  ratingValue,
  reviewCount,
  bestRating: 5,
  worstRating: 1,
});
