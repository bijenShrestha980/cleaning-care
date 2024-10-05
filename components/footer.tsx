import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { banner1 } from "@/constants/images";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";

const Footer = () => {
  return (
    <footer>
      <div className="w-full relative">
        <Image src={banner1} alt="footer" fill className="-z-20 object-cover" />
        <div className="w-full h-full absolute top-0 -z-10 bg-[#06060680]" />
        <div className="p-8 md:p-12 flex justify-center">
          <div className="max-w-[684px] flex flex-col items-center">
            <h1 className="font-semibold text-primary-foreground text-3xl md:text-[54px] leading-[30px] md:leading-[65px] text-center font-bricolageGrotesqueSans mb-2">
              Book the cleaning service now online!
            </h1>
            <p className="text-primary-foreground text-base md:text-xl text-center mb-2">
              Using our simple booking form you can have your clean booked in
              under 60 seconds.
            </p>
            <div className="mb-4">
              <QuoteDialogue />
            </div>
            <p className="font-semibold text-primary-foreground text-2xl ms:text-4xl text-center leading-[30px] md:leading-[43px]">
              Or call our friendly team
            </p>
            <p className="text-primary-foreground text-base md:text-xl text-center mb-2">
              If you have any questions, feel free to call our customer service
              team.
            </p>
            <Link href="/contact-us">
              <Button variant="outline" size="lg">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-full lg:h-[114px] bg-[#8CC540] px-[40px] md:px-[80px] py-[50px]">
        <Separator className="w-full mb-6" />
        <div className="h-full lg:h-5 flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-sm">
            <Link
              href={"/terms&conditions"}
              className="underline text-primary-foreground"
            >
              Terms & Conditions
            </Link>
            <Separator orientation="vertical" className="hidden sm:block" />
            <Link
              href={"/license"}
              className="underline text-primary-foreground"
            >
              License
            </Link>
            <Separator orientation="vertical" className="hidden sm:block" />
            <Link
              href={"/privacy"}
              className="underline text-primary-foreground"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-sm">
            <p className="text-primary-foreground">
              © 2024 All Rights Reserved
            </p>
            <Separator orientation="vertical" className="hidden sm:block" />
            <p className="text-primary-foreground">Cleaning Care</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
