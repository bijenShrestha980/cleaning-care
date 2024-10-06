"use client";
import React from "react";
import GoogleMapComponent from "./map";
import { useAllFundamentals } from "@/features/fundamentals/api/use-fundamental";
import { Skeleton } from "./ui/skeleton";
import Error from "./ui/error";

const CustomerReview = () => {
  const {
    data: fundamentalData,
    isPending: fundamentalIsPending,
    isError: fundamentalIsError,
  } = useAllFundamentals();

  if (fundamentalIsError) {
    return <Error />;
  }
  return (
    <section className="flex flex-col items-center w-full">
      <div className="mb-12 max-w-[765px] flex flex-col items-center">
        <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
          Contact Us
        </h4>
        <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
          Reach us with the following details
        </p>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-[72px] w-full">
        {fundamentalIsPending ? (
          <div className="h-[400px] w-full">
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <div>
            <GoogleMapComponent
              value={
                typeof fundamentalData?.google_map === "string"
                  ? JSON.parse(fundamentalData?.google_map)
                  : fundamentalData?.google_map
              }
            />
          </div>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Office hours
            </p>
            {fundamentalIsPending ? (
              <div className="h-[28px] w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.open_day.split(",").join("-")}
                </p>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.open_time.split(",").join(" - ")}
                </p>
              </>
            )}
          </div>
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Office Address
            </p>
            {fundamentalIsPending ? (
              <div className="h-[28px] w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <p className="text-md md:text-xl text-primary">
                {fundamentalData?.site_address}
              </p>
            )}
          </div>
          <div className="w-full">
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Email
            </p>
            {fundamentalIsPending ? (
              <div className="h-[28px] w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.email1}
                </p>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.email2}
                </p>
              </>
            )}
          </div>
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Get in Touch
            </p>
            {fundamentalIsPending ? (
              <div className="h-[28px] w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.contact_number1}
                </p>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.contact_number2}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
