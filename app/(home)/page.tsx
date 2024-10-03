import Image from "next/image";
import Banner from "@/components/banner";
import Divider from "@/components/ui/divider";
import RequestCallbackForm from "@/components/request-callback-form";
import CustomerReview from "@/components/customer-review";
import { banner1 } from "@/constants/images";
import { dollar, leaf, like, shield, timer } from "@/constants/icons";
import ServicesSection from "@/features/services/components/services-section";

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

const chooseUs = [
  {
    icon: dollar,
    title: "Affordable Pricing",
    description: "No hidden fees.",
  },
  {
    icon: leaf,
    title: "Eco-Friendly Products",
    description: "Safe for your family and pets.",
  },
  {
    icon: timer,
    title: "Flexible Scheduling",
    description: "To suit your needs.",
  },
  {
    icon: shield,
    title: "Experienced Staff",
    description: "Ensuring high-quality service.",
  },
  {
    icon: like,
    title: "Satisfaction Guarantee",
    description: "With every cleaning.",
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
        <section className="flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
              Why Choose Us
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
              A section outlining the key benefits and trust signals of the
              cleaning company, including eco-friendly products, experienced
              staff, affordable pricing, flexible scheduling, and satisfaction
              guarantee.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {chooseUs.map((item, index) => (
              <div
                key={index}
                className="sm:w-[285px] flex flex-col items-center gap-3"
              >
                <Image
                  src={item.icon}
                  alt="Residential Cleaning"
                  className="w-[64px] h-[64px] object-cover object-center"
                />
                <h5 className="text-primary text-lg md:text-2xl font-medium text-center">
                  {item.title}
                </h5>
                <p className="text-base md:text-lg text-primary opacity-50 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <Divider />
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
