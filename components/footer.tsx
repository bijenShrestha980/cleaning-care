import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { banner1 } from "@/constants/images";
import { CustomImage } from "./ui/custom-image";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";
import { fetchAllFundamental } from "@/features/fundamentals/api/use-fundamental";

const Footer = async () => {
  const fundamentalData = await fetchAllFundamental().catch(() => null);
  const phones = [
    fundamentalData?.contact_number1,
    fundamentalData?.contact_number2,
  ].filter(Boolean) as string[];
  const emails = [fundamentalData?.email1, fundamentalData?.email2].filter(
    Boolean,
  ) as string[];

  return (
    <footer>
      <div className="w-full relative">
        <CustomImage
          src={banner1}
          alt="footer"
          fill
          loading="lazy"
          sizes="100vw"
          containerClassName="h-[541px] -z-20 absolute top-0 w-full"
          className=" object-cover"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-[#06060680]" />
        <div className="p-8 md:p-12 flex justify-center">
          <div className="max-w-[684px] flex flex-col items-center">
            <h2 className="font-semibold text-primary-foreground text-3xl md:text-[54px] leading-[30px] md:leading-[65px] text-center font-bricolageGrotesqueSans mb-2">
              Book the cleaning service now online!
            </h2>
            <p className="text-primary-foreground text-base md:text-xl text-center mb-2">
              Using our simple booking form you can have your clean booked in
              under 60 seconds.
            </p>
            <div className="my-4">
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
              <Button
                variant="outline"
                size="lg"
                className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
              >
                Contact us
              </Button>
            </Link>
            {(phones.length > 0 || emails.length > 0) && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-primary-foreground">
                {phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 text-base md:text-lg hover:underline"
                    aria-label={`Call ${phone}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {phone}
                  </a>
                ))}
                {emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-base md:text-lg hover:underline break-all"
                    aria-label={`Email ${email}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    {email}
                  </a>
                ))}
              </div>
            )}
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
