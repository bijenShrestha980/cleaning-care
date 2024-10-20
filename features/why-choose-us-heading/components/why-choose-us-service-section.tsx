"use client";
import { CheckCheck } from "lucide-react";
import { useAllWhyChooseUs } from "../api/use-why-choose-us";
import { Skeleton } from "@/components/ui/skeleton";

const WhyChooseUsServiceSection = () => {
  const {
    data: whyChooseUs,
    isPending: whyChooseUsIsPending,
    isError: whyChooseUsIsError,
  } = useAllWhyChooseUs();

  if (whyChooseUs?.find((item) => item.type === "bookservice")) {
    return (
      <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
        <div className="w-full">
          <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
            {whyChooseUs?.find((item) => item.type === "bookservice")?.title}
          </h4>
          <p className="text-base md:text-xl text-[#191919] opacity-60">
            {
              whyChooseUs?.find((item) => item.type === "bookservice")
                ?.short_description
            }
          </p>
        </div>
        <div className="w-full shrink-1 bg-[#F2FAFF] px-4 py-5">
          {whyChooseUsIsPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="h-[108px] w-full mb-3" key={index} />
              ))
            : whyChooseUs
                ?.find((item) => item.type === "bookservice")
                ?.features?.map((item, index) => (
                  <div className="flex gap-3 mb-6" key={index}>
                    <CheckCheck stroke="#8CC540" size={36} />
                    <div className="w-full ">
                      <h5 className="text-[#191919] text-base md:text-xl font-semibold mb-2">
                        {item.feature_title}
                      </h5>
                      <p className="text-[#191919] text-sm md:text-base">
                        {item.feature_short_description}
                      </p>
                    </div>
                  </div>
                ))}
        </div>
      </section>
    );
  }
};

export default WhyChooseUsServiceSection;
