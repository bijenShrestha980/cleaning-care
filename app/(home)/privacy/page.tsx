import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/ui/custom-image";
import CustomEditor from "@/components/editor";
import { fetchAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import { banner1 } from "@/constants/images";

const Privacy = async () => {
  const fundamentalData = await fetchAllFundamental();

  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={banner1}
          alt={"banner"}
          fill
          priority={true}
          sizes="calc(100vw + 16px)"
          containerClassName="h-[530px]"
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
            Privacy
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            Get in Touch
          </p>
          <Link href={"/contact-us"}>
            <Button
              variant="success"
              size="lg"
              className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
            >
              Call for Inquires
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-5 md:p-10">
        <CustomEditor
          value={fundamentalData?.privacy_policy}
          readOnly={true}
          theme={"bubble"}
        />
      </div>
    </main>
  );
};

export default Privacy;
