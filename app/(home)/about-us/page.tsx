import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { logoColor } from "@/constants/icons";
import { banner1, mission, team } from "@/constants/images";

const values = [
  {
    title: "Quality",
    description:
      "We take pride in delivering top-notch cleaning services that exceed expectations.",
    color: "#8CC540",
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty and transparency, building long-lasting relationships with our clients.",
    color: "#F0B419",
  },
  {
    title: "Innovation",
    description:
      "We continuously seek innovative solutions to improve our services and enhance customer satisfaction.",
    color: "#F06292",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to reducing our environmental impact through eco-friendly practices.",
    color: "#4FC3F7",
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

const AboutUs = () => {
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
            About Us
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            Our story of the professional cleaning services you can trust
          </p>
          <Button variant="success" size="lg">
            Call for Inquires
          </Button>
        </div>
      </div>
      <div className="p-5 md:p-10 flex flex-col items-center">
        <p className="mt-14 font-medium text-base md:text-xl text-[#191919] opacity-60 text-center max-w-[1078px] font-montserratItalic">
          We’re here to help with all your cleaning needs. Whether you have
          questions about our services, need a quote, or want to schedule a
          cleaning, feel free to reach out to us. Our friendly team is ready to
          assist you.
        </p>
        <Divider />
        <section className="w-full flex items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              Our Story
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              Welcome to Cleaning Care, your trusted partner in professional
              cleaning services. Founded in 2024, our journey began with a
              simple mission: to provide high-quality cleaning solutions that
              meet the diverse needs of both residential and commercial clients.
              Based in Australia, we have grown from a small team to a reputable
              company, known for our attention to detail and commitment to
              excellence.
            </p>
          </div>
          <Image
            src={logoColor}
            alt="logo"
            width={376}
            height={277}
            className="w-full lg:w-[376px] h-full lg:h-[277px] object-contain hidden md:block"
          />
        </section>
        <Divider />
        <section className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-16">
          <Image
            src={mission}
            alt="our mission image"
            width={581}
            height={431}
            className="lg:w-[581px] lg:h-[431px] object-cover"
          />
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              Our Mission
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              Welcome to Cleaning Care, your trusted partner in professional
              cleaning services. Founded in 2024, our journey began with a
              simple mission: to provide high-quality cleaning solutions that
              meet the diverse needs of both residential and commercial clients.
              Based in Australia, we have grown from a small team to a reputable
              company, known for our attention to detail and commitment to
              excellence.
            </p>
          </div>
        </section>
        <Divider />
        <section className="w-full flex flex-col xl:flex-row items-end lg:items-start justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              Our Values
            </h4>
            <p className="text-base md:text-xl text-[#191919] opacity-60">
              Our team is comprised of experienced and trained professionals who
              are passionate about cleaning. Each member is carefully selected
              and undergoes rigorous training to ensure they meet our high
              standards. We believe that a clean environment contributes to
              overall well-being and productivity, and our team is dedicated to
              making that a reality for every client.
            </p>
          </div>
          <div className="w-full shrink-1 grid sm:grid-cols-2 gap-4 md:gap-12">
            {values.map((value, index) => (
              <div
                className="w-full h-full p-4 rounded-xl"
                style={{ backgroundColor: value.color }}
                key={index}
              >
                <p className="font-semibold text-secondary-foreground text-xl leading-6 mb-2 uppercase">
                  {value.title}
                </p>
                <p className="text-secondary-foreground text-sm leading-4">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <Divider />
        <section className="w-full flex flex-col lg:flex-row justify-between gap-6 md:gap-16">
          <Image
            src={team}
            alt="our team image"
            width={606}
            height={543}
            className="w-full lg:max-w-[606px] h-full lg:max-h-[543px] object-cover"
          />
          <div className="w-full">
            <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3">
              Our Team
            </h4>
            <p className="text-[#191919] opacity-60 text-base md:text-xl">
              Our team is comprised of experienced and trained professionals who
              are passionate about cleaning. Each member is carefully selected
              and undergoes rigorous training to ensure they meet our high
              standards. We believe that a clean environment contributes to
              overall well-being and productivity, and our team is dedicated to
              making that a reality for every client.
            </p>
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

export default AboutUs;
