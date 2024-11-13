import Banner from "@/components/banner";
import Divider from "@/components/ui/divider";
import { CustomImage } from "@/components/ui/custom-image";
import CustomerReview from "@/components/customer-review";
import RequestCallbackForm from "@/features/request-callback/components/request-callback-form";
import ServicesSection from "@/features/services/components/services-section";
import WhyChooseUsSection from "@/features/why-choose-us-heading/components/why-choose-us-section";
import { banner1 } from "@/constants/images";
import Review from "@/features/review/components/review";

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
        <Review />
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
