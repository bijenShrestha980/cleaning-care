import type { Metadata } from "next";
import Banner from "@/components/banner";
import Divider from "@/components/ui/divider";
import ContactUs from "@/features/fundamentals/components/contact-us-section";
import RequestCallbackForm from "@/features/request-callback/components/request-callback-form";
import ServicesSection from "@/features/services/components/services-section";
import WhyChooseUsSection from "@/features/why-choose-us-heading/components/why-choose-us-section";
import Review from "@/features/review/components/review";
import { Faq } from "@/components/seo/faq";
import { fetchReviews } from "@/features/review/api/use-reviews";
import { fetchHeroSection } from "@/features/hero-sections/api/use-hero-sections";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo/schema";
import { getBusinessInfo } from "@/lib/seo/business";
import { HOMEPAGE_FAQS } from "@/lib/seo/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Care | Professional Cleaning Services Across Australia",
  description:
    "Cleaning Care delivers trusted residential, commercial, end-of-lease and carpet cleaning across Australia. 5-star rated, fully insured cleaners. Free quote in 60 seconds.",
  path: "/",
});

const Home = async () => {
  const [heroSection, reviews, business] = await Promise.all([
    fetchHeroSection(),
    fetchReviews(),
    getBusinessInfo(),
  ]);

  const ratingValue = reviews?.result?.rating
    ? Number(reviews.result.rating)
    : undefined;
  const reviewCount = reviews?.result?.user_ratings_total
    ? Number(reviews.result.user_ratings_total)
    : undefined;

  return (
    <main className="-translate-y-[104px]">
      <Banner
        heroSectionData={heroSection}
        user_ratings_total={reviews.result?.user_ratings_total}
      />
      <div className="p-5 md:p-10">
        <Divider />
        <section
          className="flex flex-col items-center"
          aria-labelledby="services-overview"
        >
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h2
              id="services-overview"
              className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center line-clamp-2"
            >
              Our Cleaning Services
            </h2>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center line-clamp-4">
              From weekly house cleans and end-of-lease bond cleans to
              commercial office cleaning and carpet steam cleaning — fully
              insured, police-checked teams across every major Australian metro.
            </p>
          </div>
          <ServicesSection />
        </section>
        <Divider />
        <WhyChooseUsSection />
        <Review reviews={reviews?.result?.reviews} />
        <Divider />
        <ContactUs />
        <Divider />
        <Faq
          heading="Cleaning Services FAQs"
          subheading="Everything you need to know before booking"
          items={HOMEPAGE_FAQS}
        />
        <Divider />
        <RequestCallbackForm />
      </div>
      <JsonLd
        data={[
          localBusinessSchema(business, {
            aggregateRating:
              ratingValue && reviewCount
                ? { ratingValue, reviewCount }
                : undefined,
          }),
          breadcrumbSchema([{ name: "Home", url: "/" }]),
        ]}
      />
    </main>
  );
};

export default Home;
