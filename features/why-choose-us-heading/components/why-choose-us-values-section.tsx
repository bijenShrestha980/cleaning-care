import Divider from "@/components/ui/divider";
import { WhyChooseUs } from "@/components/admin/data/schema";

const getWhyChooseUs = async () => {
  const response = await fetch(`${process.env.url}/api/get-why-choose-us`, {
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data.data as WhyChooseUs[];
};

const WhyChooseUsValuesSection = async () => {
  const whyChooseUs = await getWhyChooseUs();

  const colors = ["#8CC540", "#F0B419", "#F06292", "#4FC3F7"];

  if (whyChooseUs?.find((item) => item.type === "values")) {
    return (
      <>
        <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              {whyChooseUs?.find((item) => item.type === "values")?.title}
            </h4>
            <p className="text-base md:text-xl text-[#191919] opacity-60">
              {
                whyChooseUs?.find((item) => item.type === "values")
                  ?.short_description
              }
            </p>
          </div>
          <div className="w-full shrink-1 grid sm:grid-cols-2 gap-4 md:gap-12">
            {whyChooseUs
              ?.find((item) => item.type === "values")
              ?.features?.map((item, index) => (
                <div
                  className="w-full h-full p-4 rounded-xl"
                  style={{ backgroundColor: colors[index % colors.length] }}
                  key={index}
                >
                  <p className="font-semibold text-secondary-foreground text-xl leading-6 mb-2 uppercase">
                    {item.feature_title}
                  </p>
                  <p className="text-secondary-foreground text-sm leading-4">
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

export default WhyChooseUsValuesSection;
