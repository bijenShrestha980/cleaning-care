import Link from "next/link";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import WhyChooseUsValuesSection from "@/features/why-choose-us-heading/components/why-choose-us-values-section";
import WhyChooseUsServiceSection from "@/features/why-choose-us-heading/components/why-choose-us-service-section";
import { fetchAboutUs } from "@/features/about-us/api/use-about-us";

const AboutUs = async () => {
  const aboutUsData = await fetchAboutUs();

  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={aboutUsData?.banner_image_url || ""}
          alt={"banner"}
          fill
          priority={true}
          sizes="calc(100vw + 16px)"
          containerClassName="h-[530px]"
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
            {aboutUsData?.heading}
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            {aboutUsData?.short_description}
          </p>
          <Link href="/contact-us">
            <Button variant="success" size="lg">
              Call for Inquires
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-5 md:p-10 flex flex-col items-center">
        <p className="mt-6 md:mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic">
          {aboutUsData?.description}
        </p>
        <Divider />
        <section className="w-full flex items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              {aboutUsData?.story_title}
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {aboutUsData?.story_description}
            </p>
          </div>
          <CustomImage
            src={aboutUsData?.story_image_url || ""}
            alt="logo"
            fill
            sizes="376px"
            containerClassName="w-full md:w-[376px] h-full md:h-[277px] hidden md:block"
            className="w-full h-full object-contain"
          />
        </section>
        <Divider />
        <section className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-16">
          <CustomImage
            src={aboutUsData?.mission_image_url || ""}
            alt="our mission image"
            fill
            sizes="581px"
            containerClassName="lg:w-[581px] lg:h-[431px]"
            className="lg:w-[581px] lg:h-[431px] object-cover"
          />

          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              {aboutUsData?.mission_title}
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {aboutUsData?.mission_description}
            </p>
          </div>
        </section>
        <Divider />
        <WhyChooseUsValuesSection />
        <section className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-16">
          <CustomImage
            src={aboutUsData?.team_image_url || ""}
            alt="our team image"
            fill
            sizes="606px"
            containerClassName="lg:w-[606px] lg:h-[543px]"
            className="w-full lg:max-w-[606px] h-full lg:max-h-[543px] object-cover"
          />

          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              {aboutUsData?.team_title}
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {aboutUsData?.team_description}
            </p>
          </div>
        </section>
        <Divider />
        <WhyChooseUsServiceSection />
      </div>
    </main>
  );
};

export default AboutUs;
