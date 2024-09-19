import Image from "next/image";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import RequestCallbackForm from "@/components/request-callback-form";
import { banner1 } from "@/constants/images";
import CustomerReview from "@/components/customer-review";

const ContactUs = () => {
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
        <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesque mb-3">
            Contact Us
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            Get in Touch
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
        <CustomerReview />
        <Divider />
        <RequestCallbackForm />
      </div>
    </main>
  );
};

export default ContactUs;
