import Image from "next/image";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { banner1 } from "@/constants/images";
import { CheckCheck } from "lucide-react";

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

const Service = () => {
  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <Image
          src={banner1}
          alt={"banner"}
          // width={1366}
          // height={740}
          priority={true}
          sizes="calc(100vw + 16px)"
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
            Houses/Apartment/Unit Cleaning
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            Sparkling every corners, for happy surrounding
          </p>
          <Button variant="success" size="lg">
            Get service quote
          </Button>
        </div>
      </div>
      <div className="p-5 md:p-10 flex flex-col items-center">
        <p className="mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic">
          “Your kitchen is the heart of your home, where meals are prepared and
          memories are made. At Cleaning Care, we offer comprehensive kitchen
          cleaning services designed to keep your kitchen spotless, hygienic,
          and welcoming.”
        </p>
        <Divider />
        <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 max-w-[800px]">
              Why hire us for Houses/Apartment/Unit Cleaning?
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              Our team of experienced professionals is skilled in handling all
              types of kitchen cleaning tasks with precision and care, ensuring
              your space is spotless and hygienic. We prioritize your health and
              the environment by using eco-friendly, non-toxic cleaning products
              that are both effective and safe. Understanding the demands of a
              busy lifestyle, we offer flexible scheduling options to
              accommodate your needs. We are committed to delivering exceptional
              results and ensuring your complete satisfaction with our services,
              giving you peace of mind and a sparkling clean kitchen.
            </p>
          </div>
          <Image
            src={banner1}
            alt="logo"
            width={521}
            height={460}
            className="w-full lg:w-[524px] h-full lg:h-[460px] object-cover rounded-3xl"
          />
        </section>
        <Divider />
        {/* Overview of Services */}
        <section className="flex flex-col items-center">
          <div className="mb-12 max-w-[765px] flex flex-col items-center">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
              Our Service Include
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
              An overview section highlighting the main services offered by the
              cleaning company, including icons/images and descriptions for each
              service.
            </p>
          </div>
          <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="w-[252px] p-2 flex flex-col items-center gap-2 md:gap-4"
              >
                <Image
                  src={service.img}
                  alt="Residential Cleaning"
                  className="rounded-full w-[149px] h-[149px] object-cover object-center"
                />
                <h5 className="text-[#191919] opacity-60 text-base md:text-xl font-semibold text-center">
                  {service.title}
                </h5>
                <p className="text-sm md:text-base text-[#191919] opacity-60 text-center">
                  {service.description}
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
