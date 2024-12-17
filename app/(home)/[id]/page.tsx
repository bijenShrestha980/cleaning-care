import type { Metadata, ResolvingMetadata } from "next";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";
import WhyChooseUsServiceSection from "@/features/why-choose-us-heading/components/why-choose-us-service-section";
import { fetchServiceByCategoryId } from "@/features/services/api/use-service";

type Props = {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const service = await fetchServiceByCategoryId(id);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: service.service_name,
    description: service.short_description,
    keywords: [
      service.service_name,
      service.serviceitems?.map((item) => item.item_name).join(", ") || "",
    ],
    openGraph: {
      images: [
        ...(service.banner_image_url
          ? [
              {
                url: service.banner_image_url,
                width: 1200,
                height: 630,
                alt: service.service_name,
              },
            ]
          : []),
        ...previousImages,
      ],
    },
  };
}

const Services = async ({ params }: { params: { id: number } }) => {
  const serviceData = await fetchServiceByCategoryId(params.id);
  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={serviceData?.banner_image_url || ""}
          alt={"banner"}
          priority={true}
          containerClassName="h-[530px]"
          sizes="calc(100vw + 16px)"
          fill
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3 line-clamp-2">
            {serviceData?.service_name}
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
        <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full flex flex-col gap-3">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold">
              {serviceData?.section_one_title}
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              {serviceData?.section_one_description}
            </p>
          </div>
          <CustomImage
            src={serviceData?.section_one_image_url || ""}
            alt="logo"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw (max-width: 1024px) 100vw"
            containerClassName="w-full lg:w-[524px] h-full lg:h-[460px]"
            className="w-full h-full object-cover rounded-xl"
          />
        </section>
        <Divider />
        {/* Overview of Services */}
        <section className="w-full flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h4 className="text-primary text-3xl md:text-[42px] leading-none font-semibold mb-3 text-center">
              {serviceData?.section_two_title}
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center line-clamp-3">
              {serviceData?.section_two_description}
            </p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-12">
            {serviceData?.serviceitems &&
              serviceData?.serviceitems.map((service, index) => (
                <div
                  key={index}
                  className="w-[252px] p-2 flex flex-col items-center gap-2 md:gap-4"
                >
                  <CustomImage
                    src={service.icon_url || ""}
                    alt="Residential Cleaning"
                    fill
                    sizes="252px"
                    containerClassName="w-[149px] h-[149px]"
                    className="rounded-full w-[149px] h-[149px] object-cover object-center"
                  />
                  <h5 className="text-[#191919] opacity-60 text-base md:text-xl font-semibold text-center">
                    {service.item_name}
                  </h5>
                  <p className="text-sm md:text-base text-[#191919] opacity-60 text-center line-clamp-5">
                    {service.short_description}
                  </p>
                </div>
              ))}
          </div>
        </section>
        <Divider />
        <WhyChooseUsServiceSection />
      </div>
    </main>
  );
};

export default Services;
