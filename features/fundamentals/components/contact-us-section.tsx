"use client";
import React from "react";
import GoogleMapComponent from "../../../components/map";
import { useAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import { Skeleton } from "../../../components/ui/skeleton";
import Error from "../../../components/ui/error";
import { convertTimeFormat } from "@/lib/convert-time-format";
import { convertDaysRange } from "@/lib/convert-days-range";

const ContactUsSection = () => {
  const {
    data: fundamentalData,
    isPending: fundamentalIsPending,
    isError: fundamentalIsError,
  } = useAllFundamental();

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
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d405526.5552027223!2d149.08495203508016!3d-35.18127231476792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e05188a55c96bdf%3A0x3e8aa5c34f28461d!2sCleaningCare!5e0!3m2!1sen!2snp!4v1731787450069!5m2!1sen!2snp"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
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
                  {fundamentalData?.open_day
                    ? convertDaysRange(fundamentalData?.open_day)
                    : "Closed"}
                </p>
                <p className="text-md md:text-xl text-primary pb-4">
                  {convertTimeFormat(fundamentalData?.open_time)}
                </p>
                {fundamentalData?.s_open_day && (
                  <>
                    <p className="text-md md:text-xl text-primary">
                      {fundamentalData?.s_open_day?.split(",").join("-")}
                    </p>
                    <p className="text-md md:text-xl text-primary">
                      {convertTimeFormat(fundamentalData?.s_open_time)}
                    </p>
                  </>
                )}
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

export default ContactUsSection;
