import { CheckCheck } from "lucide-react";
import { fetchWhyChooseUs } from "../api/use-why-choose-us";

const WhyChooseUsServiceSection = async () => {
  const whyChooseUs = await fetchWhyChooseUs();

  return (
    <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
      {(whyChooseUs?.find((item) => item.type === "chooseus")?.features
        ?.length ?? 0) > 0 && (
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
      )}
      {(whyChooseUs?.find((item) => item.type === "bookservice")?.features
        ?.length ?? 0) > 0 && (
        <div className="w-full shrink-1 bg-[#F2FAFF] px-4 py-5">
          {whyChooseUs
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
      )}
    </section>
  );
};

export default WhyChooseUsServiceSection;
