import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import WhyChooseUsValuesSection from "@/features/why-choose-us-heading/components/why-choose-us-values-section";
import WhyChooseUsServiceSection from "@/features/why-choose-us-heading/components/why-choose-us-service-section";
import { fetchAboutUs } from "@/features/about-us/api/use-about-us";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchAboutUs();
    return buildMetadata({
      title: "About Cleaning Care",
      description:
        data?.short_description ||
        "Learn about Cleaning Care — Australia's trusted cleaning company. Our story, mission and the values that drive every clean we deliver.",
      path: "/about-us",
      image: data?.banner_image_url,
    });
  } catch {
    return buildMetadata({
      title: "About Cleaning Care",
      description:
        "Learn about Cleaning Care — Australia's trusted cleaning company. Our story, mission and the values that drive every clean we deliver.",
      path: "/about-us",
    });
  }
}

const AboutUs = async () => {
  const aboutUsData = await fetchAboutUs();
  const heading = aboutUsData?.heading || "About Cleaning Care";

  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={aboutUsData?.banner_image_url || ""}
          alt={`${heading} — Cleaning Care`}
          fill
          priority={true}
          sizes="calc(100vw + 16px)"
          containerClassName="h-[530px]"
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
            {heading}
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            {aboutUsData?.short_description}
          </p>
          <Link href="/contact-us" aria-label="Contact Cleaning Care for inquiries">
            <Button
              variant="success"
              size="lg"
              className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
            >
              Call for Inquiries
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-5 md:p-10 flex flex-col items-center">
        <p className="mt-6 md:mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic">
          {aboutUsData?.description}
        </p>
        <Divider />
        <section
          className="w-full flex items-end lg:items-start justify-between gap-4 lg:gap-16"
          aria-labelledby="about-story"
        >
          <div className="w-full">
            <h2
              id="about-story"
              className="text-primary text-3xl md:text-[42px] font-semibold mb-3"
            >
              {aboutUsData?.story_title}
            </h2>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {aboutUsData?.story_description}
            </p>
          </div>
          <CustomImage
            src={aboutUsData?.story_image_url || ""}
            alt={aboutUsData?.story_title || "Our story"}
            fill
            sizes="376px"
            containerClassName="w-full md:w-[376px] h-full md:h-[277px] hidden md:block"
            className="w-full h-full object-contain rounded-xl"
          />
        </section>
        <Divider />
        <section
          className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-16"
          aria-labelledby="about-mission"
        >
          <CustomImage
            src={aboutUsData?.mission_image_url || ""}
            alt={aboutUsData?.mission_title || "Our mission"}
            fill
            sizes="581px"
            containerClassName="lg:w-[581px] lg:h-[431px]"
            className="lg:w-[581px] lg:h-[431px] object-cover rounded-xl"
          />

          <div className="w-full">
            <h2
              id="about-mission"
              className="text-primary text-3xl md:text-[42px] font-semibold mb-3"
            >
              {aboutUsData?.mission_title}
            </h2>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {aboutUsData?.mission_description}
            </p>
          </div>
        </section>
        <Divider />
        <WhyChooseUsValuesSection />
        <section
          className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-16"
          aria-labelledby="about-team"
        >
          <CustomImage
            src={aboutUsData?.team_image_url || ""}
            alt={aboutUsData?.team_title || "Our team"}
            fill
            sizes="606px"
            loading="lazy"
            containerClassName="lg:w-[606px] lg:h-[543px]"
            className="w-full lg:max-w-[606px] h-full lg:max-h-[543px] object-cover rounded-xl"
          />

          <div className="w-full">
            <h2
              id="about-team"
              className="text-primary text-3xl md:text-[42px] font-semibold mb-3"
            >
              {aboutUsData?.team_title}
            </h2>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {aboutUsData?.team_description}
            </p>
          </div>
        </section>
        <Divider />
        <WhyChooseUsServiceSection />
      </div>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about-us" },
        ])}
      />
    </main>
  );
};

export default AboutUs;
