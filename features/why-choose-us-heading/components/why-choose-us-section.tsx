"use client";
import { Skeleton } from "@/components/ui/skeleton";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import { useAllWhyChooseUs } from "../api/use-why-choose-us";

const WhyChooseUsSection = () => {
  const {
    data: whyChooseUs,
    isPending: whyChooseUsIsPending,
    isError: whyChooseUsIsError,
  } = useAllWhyChooseUs();

  if (whyChooseUs?.find((item) => item.type === "chooseus")) {
    return (
      <>
        <section className="flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
              {whyChooseUs?.find((item) => item.type === "chooseus")?.title}
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
              {
                whyChooseUs?.find((item) => item.type === "chooseus")
                  ?.short_description
              }
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-56 gap-y-12 md:gap-y-20">
            {whyChooseUsIsPending
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    className="h-[148px] w-full sm:w-[285px] mb-3"
                    key={index}
                  />
                ))
              : whyChooseUs
                  ?.find((item) => item.type === "chooseus")
                  ?.features?.map((item, index) => (
                    <div
                      key={index}
                      className="sm:w-[285px] flex flex-col items-center gap-3"
                    >
                      <CustomImage
                        src={`${process.env.url}/storage/${item.icon}`}
                        alt="Residential Cleaning"
                        fill
                        sizes="64px"
                        containerClassName="w-[64px] h-[64px]"
                        className="w-[64px] h-[64px] rounded-full object-cover object-center"
                      />
                      <h5 className="text-primary text-lg md:text-2xl font-medium text-center">
                        {item.feature_title}
                      </h5>
                      <p className="text-base md:text-lg text-primary opacity-50 text-center">
                        {item.feature_short_description}
                      </p>
                    </div>
                  ))}
          </div>
        </section>
        <Divider />
      </>
    );
  }
};

export default WhyChooseUsSection;
