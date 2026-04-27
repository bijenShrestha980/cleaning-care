import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import ServicesSection from "@/features/services/components/services-section";
import WhyChooseUsSection from "@/features/why-choose-us-heading/components/why-choose-us-section";
import RequestCallbackForm from "@/features/request-callback/components/request-callback-form";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";
import { fetchReviews } from "@/features/review/api/use-reviews";
import { Faq } from "@/components/seo/faq";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  breadcrumbSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBusinessInfo } from "@/lib/seo/business";
import {
  LOCATIONS,
  getLocation,
  locationPath,
} from "@/lib/seo/locations";
import { getFaqsForLocation } from "@/lib/seo/faqs";

type Props = {
  params: { city: string };
};

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocation(params.city);
  if (!location) return buildMetadata({ path: locationPath(params.city) });
  return buildMetadata({
    title: `Cleaning Services in ${location.city}, ${location.state}`,
    description: `Professional house, end-of-lease, carpet and commercial cleaning in ${location.city}, ${location.stateName}. Fully insured local cleaners. Free quote in 60 seconds.`,
    path: locationPath(location.slug),
    keywords: [
      `cleaning services ${location.city.toLowerCase()}`,
      `house cleaning ${location.city.toLowerCase()}`,
      `end of lease cleaning ${location.city.toLowerCase()}`,
      `commercial cleaning ${location.city.toLowerCase()}`,
      `carpet cleaning ${location.city.toLowerCase()}`,
      `cleaners in ${location.city.toLowerCase()}`,
      `${location.state.toLowerCase()} cleaning`,
    ],
  });
}

const CleaningServicesCity = async ({ params }: Props) => {
  const location = getLocation(params.city);
  if (!location) notFound();

  const [reviews, business] = await Promise.all([
    fetchReviews().catch(() => null),
    getBusinessInfo(),
  ]);

  const ratingValue = reviews?.result?.rating
    ? Number(reviews.result.rating)
    : undefined;
  const reviewCount = reviews?.result?.user_ratings_total
    ? Number(reviews.result.user_ratings_total)
    : undefined;

  const faqs = getFaqsForLocation(location.city);
  const breadcrumb = [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/" },
    {
      name: `${location.city} Cleaning Services`,
      url: locationPath(location.slug),
    },
  ];

  const otherLocations = LOCATIONS.filter((l) => l.slug !== location.slug);

  return (
    <main className="-translate-y-[104px]">
      <section
        className="min-h-[420px] md:min-h-[560px] w-full relative bg-gradient-to-br from-[#8CC540] via-[#6BAA2C] to-[#4F8520]"
        aria-labelledby="city-hero"
      >
        <div className="w-full h-full px-5 md:px-10 py-20 md:py-28 flex flex-col items-center text-center text-primary-foreground">
          <p className="uppercase tracking-widest text-sm md:text-base mb-4 opacity-90">
            {location.stateName}
          </p>
          <h1
            id="city-hero"
            className="font-extrabold text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-4 max-w-[900px]"
          >
            Professional Cleaning Services in {location.city}
          </h1>
          <p className="text-md md:text-2xl mb-8 max-w-[820px] opacity-95">
            {location.intro}
          </p>
          {ratingValue && reviewCount ? (
            <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    width={18}
                    height={18}
                    strokeWidth={1}
                    stroke="#F0B419"
                    fill="#F0B419"
                  />
                ))}
              </span>
              <span className="text-base">
                {ratingValue.toFixed(1)} / 5 from {reviewCount} Google reviews
              </span>
            </div>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-3">
            <QuoteDialogue />
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-xl bg-transparent text-primary-foreground border-primary-foreground hover:bg-white hover:text-primary"
              asChild
            >
              <a
                href={`tel:${business.phone}`}
                aria-label={`Call our ${location.city} team`}
              >
                Call our {location.city} team
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumb} />

      <div className="p-5 md:p-10 flex flex-col items-center">
        <section
          className="w-full max-w-[1078px] mt-4 md:mt-8"
          aria-labelledby="city-intro"
        >
          <h2
            id="city-intro"
            className="text-primary text-3xl md:text-[42px] font-semibold mb-4 text-center"
          >
            Trusted local cleaners across {location.city}
          </h2>
          <p className="text-[#191919] opacity-70 text-base md:text-xl text-center">
            Whether you need a one-off detail clean, a regular weekly house
            clean, or an end-of-lease bond clean signed off by your real-estate
            agent, our {location.city} team delivers consistent, fully insured
            cleaning across {location.stateName}. Every cleaner is
            police-checked, reference-verified and trained against our
            standardised checklist.
          </p>
        </section>

        <Divider />

        <section
          className="w-full max-w-[1200px] flex flex-col items-center"
          aria-labelledby="city-suburbs"
        >
          <h2
            id="city-suburbs"
            className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center"
          >
            Suburbs we cover in {location.city}
          </h2>
          <p className="text-[#191919] opacity-60 text-base md:text-xl text-center mb-6 max-w-[820px]">
            We service every postcode in the {location.city} metro area. Some of
            the most-requested suburbs include:
          </p>
          <ul className="flex flex-wrap justify-center gap-2 max-w-[900px]">
            {location.popularSuburbs.map((suburb) => (
              <li
                key={suburb}
                className="px-4 py-2 rounded-full bg-[#F2FAFF] text-primary text-sm md:text-base"
              >
                {suburb}
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        <section
          className="w-full flex flex-col items-center"
          aria-labelledby="city-services"
        >
          <h2
            id="city-services"
            className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center"
          >
            Cleaning services available in {location.city}
          </h2>
          <p className="text-[#191919] opacity-60 text-base md:text-xl text-center mb-8 max-w-[820px]">
            Pick the service you need — every clean is delivered by our
            in-house, vetted {location.city} team.
          </p>
          <ServicesSection />
        </section>

        <Divider />
        <WhyChooseUsSection />
        <Divider />

        <Faq
          heading={`Cleaning in ${location.city} — FAQs`}
          subheading="What to expect from your local team"
          items={faqs}
        />

        <Divider />

        <section
          className="w-full max-w-[1200px]"
          aria-labelledby="other-areas"
        >
          <h2
            id="other-areas"
            className="text-primary text-2xl md:text-3xl font-semibold mb-4 text-center"
          >
            Other service areas
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {otherLocations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={locationPath(l.slug)}
                  className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm md:text-base"
                >
                  Cleaning Services {l.city}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Divider />
        <RequestCallbackForm />
      </div>

      <JsonLd
        data={[
          localBusinessSchema(business, {
            location,
            aggregateRating:
              ratingValue && reviewCount
                ? { ratingValue, reviewCount }
                : undefined,
          }),
          breadcrumbSchema(breadcrumb),
        ]}
      />
    </main>
  );
};

export default CleaningServicesCity;
