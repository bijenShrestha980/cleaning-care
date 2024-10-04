"use client";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import Divider from "@/components/ui/divider";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/components/ui/error";
import { banner1 } from "@/constants/images";
import { useService } from "@/features/services/api/use-service";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";

const howToBook = [
  {
    title: "Explore Our Service or Contact Us",
    description:
      "Visit our website to explore our wide range of cleaning services, including residential, commercial, and specialized cleaning options like kitchen, oven, and BBQ cleaning. Choose the service that best fits your needs.",
  },
  {
    title: "Get a Free Quote",
    description:
      "Once you’ve identified the service you need, provide us with some details about your cleaning requirements, including the size of the area, specific cleaning tasks, and any special requests. We’ll offer you a free, no-obligation quote tailored to your needs.",
  },
  {
    title: "Schedule Your Cleaning",
    description:
      "Choose a convenient date and time for your cleaning service. We offer flexible scheduling options to fit your busy lifestyle, including weekdays, weekends, and evenings.",
  },
  {
    title: "Enjoy a Spotless Space",
    description:
      "Relax and enjoy the peace of mind that comes with a professionally cleaned home or business. Our skilled cleaners will ensure every detail is taken care of, leaving your space fresh and pristine.",
  },
];

const Service = ({ params }: { params: { id: number } }) => {
  const { data: serviceData, isPending, isError } = useService(params.id);

  if (isError) {
    return <Error />;
  }
  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        {isPending ? (
          <Skeleton className="h-[200px] md:h-[530px] w-full -z-20" />
        ) : (
          <Image
            src={serviceData?.banner_image_url || banner1}
            alt={"banner"}
            priority={true}
            sizes="calc(100vw + 16px)"
            layout="fill"
            className="h-full w-full absolute top-0 object-cover object-center -z-20"
          />
        )}
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          {isPending ? (
            <Skeleton className="h-[72px] w-full md:w-[700px] mb-3" />
          ) : (
            <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
              {serviceData?.service_name}
            </h1>
          )}
          {isPending ? (
            <Skeleton className="h-[32px] w-full md:w-[500px] mb-9" />
          ) : (
            <p className="text-primary-foreground text-md md:text-2xl mb-9">
              {serviceData?.short_description}
            </p>
          )}
          <QuoteDialogue
            service_category_id={
              serviceData?.service_category_id
                ? Number(serviceData.service_category_id)
                : undefined
            }
          />
        </div>
      </div>
      <div className="p-5 md:p-10 flex flex-col items-center">
        {isPending ? (
          <div className="mt-14 flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                className="h-[28px] w-full md:w-[400px] lg:w-[1078px]"
                key={index}
              />
            ))}
          </div>
        ) : (
          <p className="mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic">
            {serviceData?.long_description}
          </p>
        )}
        <Divider />
        <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full flex flex-col gap-3">
            {isPending ? (
              <Skeleton className="h-[72px] w-full md:w-[700px]" />
            ) : (
              <h4 className="text-primary text-3xl md:text-[42px] font-semibold">
                {serviceData?.section_one_title}
              </h4>
            )}
            {isPending ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="h-[20px] w-full" key={index} />
              ))
            ) : (
              <p className="text-[#191919] opacity-60 text-base md:text-xl">
                {serviceData?.section_one_description}
              </p>
            )}
          </div>
          {isPending ? (
            <Skeleton className="h-[460px] w-full lg:w-[521px]" />
          ) : (
            <Image
              src={serviceData?.section_one_image_url || ""}
              alt="logo"
              width={521}
              height={460}
              className="w-full lg:w-[524px] h-full lg:h-[460px] object-cover rounded-3xl"
            />
          )}
        </section>
        <Divider />
        {/* Overview of Services */}
        <section className="flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            {isPending ? (
              <Skeleton className="h-[36px] w-full md:w-[400px] mb-3" />
            ) : (
              <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
                {serviceData?.section_two_title}
              </h4>
            )}
            {isPending ? (
              <Skeleton className="h-[20px] w-full" />
            ) : (
              <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
                {serviceData?.section_two_description}
              </p>
            )}
          </div>
          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-12">
            {isPending
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton className="h-[369px] w-[252px] mb-3" key={index} />
                ))
              : serviceData?.serviceitems &&
                serviceData?.serviceitems.map((service, index) => (
                  <div
                    key={index}
                    className="w-[252px] p-2 flex flex-col items-center gap-2 md:gap-4"
                  >
                    <Image
                      src={service.icon_url || banner1}
                      alt="Residential Cleaning"
                      width={149}
                      height={149}
                      className="rounded-full w-[149px] h-[149px] object-cover object-center"
                    />
                    <h5 className="text-[#191919] opacity-60 text-base md:text-xl font-semibold text-center">
                      {service.item_name}
                    </h5>
                    <p className="text-sm md:text-base text-[#191919] opacity-60 text-center">
                      {service.short_description}
                    </p>
                  </div>
                ))}
          </div>
        </section>
        <Divider />
        <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              How to Book Our Cleaning Service
            </h4>
            <p className="text-base md:text-xl text-[#191919] opacity-60">
              Curious about how our cleaning service operates? It’s
              straightforward! Our expert cleaners, renowned for their attention
              to detail, guarantee a home free of dust and cobwebs every time.
              With our comprehensive vacuuming, no corner is overlooked,
              effectively eliminating those troublesome dust bunnies. As for
              your floors, we ensure they are left gleaming and immaculate. We
              recognize the importance of keeping a tidy home, especially in
              high-traffic areas like floors and corners. That’s why scheduling
              regular cleaning with us ensures these spaces remain in excellent
              condition, without any stress or hassle on your part.
            </p>
          </div>
          <div className="w-full shrink-1 bg-[#F2FAFF] px-4 py-5">
            {howToBook.map((book, index) => (
              <div className="flex gap-3 mb-6" key={index}>
                <CheckCheck stroke="#8CC540" size={36} />
                <div className="w-full ">
                  <h5 className="text-[#191919] text-base md:text-xl font-semibold mb-2">
                    {book.title}
                  </h5>
                  <p className="text-[#191919] text-sm md:text-base">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Service;
