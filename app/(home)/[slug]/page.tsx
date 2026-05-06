import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";
import ServiceItemCard from "@/features/services/components/service-item-card";
import WhyChooseUsServiceSection from "@/features/why-choose-us-heading/components/why-choose-us-service-section";
import {
  fetchAllServices,
  fetchServiceByCategorySlug,
} from "@/features/services/api/use-service";
import { Faq } from "@/components/seo/faq";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBusinessInfo } from "@/lib/seo/business";
import { getFaqsForService } from "@/lib/seo/faqs";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  try {
    const services = await fetchAllServices();
    return services
      .filter((s) => s.service_slug)
      .map((s) => ({ slug: s.service_slug as string }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const service = await fetchServiceByCategorySlug(params.slug);
    if (!service) return buildMetadata({ path: `/${params.slug}` });
    const items =
      service.serviceitems
        ?.map((item) => item.item_name)
        .filter(Boolean)
        .slice(0, 8) ?? [];
    return buildMetadata({
      title: `${service.service_name} | Cleaning Services Australia`,
      description:
        service.short_description ||
        `Professional ${service.service_name} services across Australia by fully insured, police-checked cleaners.`,
      path: `/${params.slug}`,
      image: service.banner_image_url,
      imageAlt: service.service_name,
      keywords: service.service_name
        ? [
            service.service_name,
            `${service.service_name} australia`,
            `${service.service_name} near me`,
            ...items,
          ]
        : items,
    });
  } catch {
    return buildMetadata({ path: `/${params.slug}` });
  }
}

const Services = async ({ params }: Props) => {
  const [serviceData, business] = await Promise.all([
    fetchServiceByCategorySlug(params.slug).catch(() => null),
    getBusinessInfo(),
  ]);

  if (!serviceData) notFound();

  const serviceName = serviceData.service_name ?? "Cleaning Service";
  const faqs = getFaqsForService(params.slug);

  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={serviceData?.banner_image_url || ""}
          alt={`${serviceName} — banner`}
          priority={true}
          containerClassName="h-[530px]"
          sizes="calc(100vw + 16px)"
          fill
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3 line-clamp-2">
            {serviceName}
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9 line-clamp-3">
            {serviceData?.short_description}
          </p>
          <QuoteDialogue
            service_category_id={
              serviceData?.service_category_id
                ? Number(serviceData.service_category_id)
                : undefined
            }
          />
        </div>
      </div>
      <div className="w-full p-5 md:p-10 flex flex-col items-center">
        <p className="mt-6 md:mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic line-clamp-4">
          {serviceData?.long_description}
        </p>
        <Divider />
        <section
          className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16"
          aria-labelledby="service-section-one"
        >
          <div className="w-full flex flex-col gap-3">
            <h2
              id="service-section-one"
              className="text-primary text-3xl md:text-[42px] font-semibold"
            >
              {serviceData?.section_one_title}
            </h2>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {serviceData?.section_one_description}
            </p>
          </div>
          <CustomImage
            src={serviceData?.section_one_image_url || ""}
            alt={`${serviceName} — ${serviceData?.section_one_title ?? "details"}`}
            fill
            sizes="(max-width: 1024px) 100vw, 524px"
            containerClassName="w-full lg:w-[524px] h-full lg:h-[460px]"
            className="w-full h-full object-cover rounded-xl"
          />
        </section>
        <Divider />
        <section
          className="w-full flex flex-col items-center"
          aria-labelledby="service-section-two"
        >
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h2
              id="service-section-two"
              className="text-primary text-3xl md:text-[42px] leading-none font-semibold mb-3 text-center"
            >
              {serviceData?.section_two_title}
            </h2>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center line-clamp-3">
              {serviceData?.section_two_description}
            </p>
          </div>
          <div className="w-full flex flex-wrap items-stretch justify-center gap-5 md:gap-8">
            {serviceData?.serviceitems &&
              serviceData?.serviceitems.map((service, index) => (
                <ServiceItemCard
                  key={index}
                  iconUrl={service.icon_url}
                  itemName={service.item_name}
                  shortDescription={service.short_description}
                  fallbackAlt={`${serviceName} option ${index + 1}`}
                />
              ))}
          </div>
        </section>
        <Divider />
        <WhyChooseUsServiceSection />
        <Divider />
        <Faq
          heading={`${serviceName} — FAQs`}
          subheading="Common questions about this service"
          items={faqs}
        />
      </div>
      <JsonLd
        data={[
          serviceSchema(serviceData, business),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/" },
            { name: serviceName, url: `/${params.slug}` },
          ]),
        ]}
      />
    </main>
  );
};

export default Services;
