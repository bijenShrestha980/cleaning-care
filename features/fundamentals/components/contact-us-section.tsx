import React from "react";
import IframeMap from "@/components/iframe-map";
import { convertTimeFormat } from "@/lib/convert-time-format";
import { convertDaysRange } from "@/lib/convert-days-range";
import { fetchAllFundamental } from "../api/use-fundamental";

const ContactUsSection = async () => {
  const fundamentalData = await fetchAllFundamental();
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
        <IframeMap iframeHtml={JSON.parse(fundamentalData?.google_map)} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Office hours
            </p>
            <p className="text-md md:text-xl text-primary">
              {fundamentalData.open_day
                ? convertDaysRange(
                    fundamentalData?.open_day
                      .split(",")
                      .filter((day: string) => day !== "Sat")
                      .join(",")
                  )
                : "Closed"}
            </p>
            <p className="text-md md:text-xl text-primary pb-4">
              {fundamentalData?.open_time &&
                convertTimeFormat(fundamentalData?.open_time)}
            </p>
            {fundamentalData?.s_open_day && (
              <>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.s_open_day?.split(",").join("-")}
                </p>
                <p className="text-md md:text-xl text-primary">
                  {fundamentalData?.s_open_time &&
                    convertTimeFormat(fundamentalData?.s_open_time)}
                </p>
              </>
            )}
          </div>
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Office Address
            </p>
            <p className="text-md md:text-xl text-primary">
              {fundamentalData.site_address}
            </p>
          </div>
          <div className="w-full">
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Email
            </p>
            <>
              <p className="text-md md:text-xl text-primary">
                {fundamentalData?.email1}
              </p>
              <p className="text-md md:text-xl text-primary">
                {fundamentalData?.email2}
              </p>
            </>
          </div>
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Get in Touch
            </p>
            <p className="text-md md:text-xl text-primary">
              {fundamentalData?.contact_number1}
            </p>
            <p className="text-md md:text-xl text-primary">
              {fundamentalData?.contact_number2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
