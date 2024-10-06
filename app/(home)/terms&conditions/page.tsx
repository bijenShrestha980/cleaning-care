"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { banner1 } from "@/constants/images";
import CustomEditor from "@/components/editor";
import { useFundamentals } from "@/features/fundamentals/api/use-fundamental";

const TermsConditions = () => {
  const {
    data: fundamentalData,
    isPending: fundamentalIsPending,
    isError: fundamentalIsError,
  } = useFundamentals();

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
            Terms & Conditions
          </h1>
          <p className="text-primary-foreground text-md md:text-2xl mb-9">
            Get in Touch
          </p>
          <Link href={"/contact-us"}>
            <Button variant="success" size="lg">
              Call for Inquires
            </Button>
          </Link>
        </div>
      </div>
      {fundamentalIsError ? (
        <Error />
      ) : fundamentalIsPending ? (
        <Loading />
      ) : (
        <div className="p-5 md:p-10">
          <CustomEditor
            value={fundamentalData[0]?.term_condition}
            readOnly={true}
            theme={"bubble"}
          />
        </div>
      )}
    </main>
  );
};

export default TermsConditions;
