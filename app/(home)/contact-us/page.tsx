import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import CustomerReview from "@/features/fundamentals/components/contact-us-section";
import RequestCallbackForm from "@/features/request-callback/components/request-callback-form";
import { fetchAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import { banner1 } from "@/constants/images";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  breadcrumbSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBusinessInfo } from "@/lib/seo/business";

export const metadata: Metadata = buildMetadata({
  title: "Contact Cleaning Care",
  description:
    "Get in touch with Cleaning Care — call, email or request a callback for a free cleaning quote. Servicing residential and commercial customers across Australia.",
  path: "/contact-us",
});

const ContactUs = async () => {
  const [fundamentalData, business] = await Promise.all([
    fetchAllFundamental(),
    getBusinessInfo(),
  ]);
  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={banner1}
          alt="Contact Cleaning Care — Australian cleaning services"
          fill
          priority={true}
          sizes="calc(100vw + 16px)"
          containerClassName="h-[530px]"
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
            Contact Cleaning Care
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            Get in touch — we reply within one business hour
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="success"
              size="lg"
              className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              asChild
            >
              <a
                href={`tel:${fundamentalData.contact_number1}`}
                aria-label={`Call Cleaning Care on ${fundamentalData.contact_number1}`}
              >
                Call for Inquiries
              </a>
            </Button>
            <p className="text-white hidden sm:block">or</p>
            <Button
              variant="success"
              size="lg"
              className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              asChild
            >
              <a
                href={`mailto:${fundamentalData.email1}`}
                aria-label={`Email Cleaning Care at ${fundamentalData.email1}`}
              >
                Send an email
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-10 flex flex-col items-center">
        <p className="mt-6 md:mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic">
          We&rsquo;re here to help with all your cleaning needs. Whether you have
          questions about our services, need a quote, or want to schedule a
          cleaning, feel free to reach out to us. Our friendly team is ready to
          assist you.
        </p>
        <Divider />
        <CustomerReview />
        <Divider />
        <RequestCallbackForm />
      </div>
      <JsonLd
        data={[
          localBusinessSchema(business),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact Us", url: "/contact-us" },
          ]),
        ]}
      />
    </main>
  );
};

export default ContactUs;
