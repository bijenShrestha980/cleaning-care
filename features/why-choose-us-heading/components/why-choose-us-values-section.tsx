import Divider from "@/components/ui/divider";
import { WhyChooseUs } from "@/components/admin/data/schema";
import { Leaf, Lightbulb, Shield, Sparkles } from "lucide-react";

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

  const colors = [
    {
      form: "from-lime-500/90",
      to: "to-green-600",
      icon: <Shield className="h-6 w-6 text-white" />,
    },
    {
      form: "from-orange-500/90",
      to: "to-orange-500/90",
      icon: <Sparkles className="h-6 w-6 text-white" />,
    },
    {
      form: "from-pink-500/90",
      to: "to-rose-600",
      icon: <Lightbulb className="h-6 w-6 text-white" />,
    },
    {
      form: "from-sky-500/90",
      to: "to-blue-600",
      icon: <Leaf className="h-6 w-6 text-white" />,
    },
  ];

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
          <div className="w-full shrink-1 grid sm:grid-cols-2 gap-4">
            {whyChooseUs
              ?.find((item) => item.type === "values")
              ?.features?.map((item, index) => (
                <>
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl bg-gradient-to-br p-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1
                    ${colors[index % colors.length].form}
                    ${colors[index % colors.length].to}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-white/20 p-2">
                        {colors[index % colors.length].icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl text-white mb-2">
                          {item.feature_title}
                        </h3>
                        <p className="text-white/90">
                          {item.feature_short_description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/[0.03]" />
                  </div>
                </>
              ))}
          </div>
        </section>
        <Divider />
      </>
    );
  }
};

export default WhyChooseUsValuesSection;
