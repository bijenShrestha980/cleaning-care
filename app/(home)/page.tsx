import Image from "next/image";
import Banner from "@/components/banner";
import Divider from "@/components/ui/divider";
import CustomerReview from "@/components/customer-review";
import RequestCallbackForm from "@/features/request-callback/components/request-callback-form";
import ServicesSection from "@/features/services/components/services-section";
import WhyChooseUsSection from "@/features/why-choose-us-heading/components/why-choose-us-section";
import { banner1 } from "@/constants/images";

const services = [
  {
    img: banner1,
    title: "Residential Cleaning",
    description:
      "Our professional residential cleaning services ensure your home is spotless and comfortable. From kitchens to bedrooms, we’ve got you covered.",
  },
  {
    img: banner1,
    title: "Residential Cleaning",
    description:
      "Our professional residential cleaning services ensure your home is spotless and comfortable. From kitchens to bedrooms, we’ve got you covered.",
  },
  {
    img: banner1,
    title: "Residential Cleaning",
    description:
      "Our professional residential cleaning services ensure your home is spotless and comfortable. From kitchens to bedrooms, we’ve got you covered.",
  },
];

export default function Home() {
  return (
    <main className="-translate-y-[104px]">
      <Banner />
      <div className="p-5 md:p-10">
        <Divider />
        {/* Overview of Services */}
        <section className="flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
              Overview of Services
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
              An overview section highlighting the main services offered by the
              cleaning company, including icons/images and descriptions for each
              service.
            </p>
          </div>
          <ServicesSection />
        </section>
        <Divider />
        {/* Why Choose Us */}
        <WhyChooseUsSection />
        {/* Customer Review */}
        <section className="flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
              Customer Reviews
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
              Read what our satisfied customers have to say about our cleaning
              services.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 items-center gap-[72px]">
            {services.map((service, index) => (
              <div
                key={index}
                className="px-4 flex flex-row items-center gap-4"
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  className="w-[64px] h-[64px] object-cover object-center rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h5 className="text-primary text-base md:text-xl font-semibold">
                    {service.title}
                  </h5>
                  <p className="text-primary line-clamp-4">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Divider />
        {/* Customer Review */}
        <CustomerReview />
        <Divider />
        {/* Request a Callback */}
        <RequestCallbackForm />
      </div>
    </main>
  );
}
