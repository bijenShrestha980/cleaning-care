import React from "react";
import GoogleMapComponent from "./map";

const CustomerReview = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="mb-12 max-w-[765px] flex flex-col items-center">
        <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
          Contact Us
        </h4>
        <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
          Reach us with the following details
        </p>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-[72px] w-full">
        <div>
          <GoogleMapComponent />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Office hours
            </p>
            <p className="etxt-md md:text-xl text-primary">Monday - Friday</p>
            <p className="etxt-md md:text-xl text-primary">8:00 am - 6:00 pm</p>
          </div>
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Office Address
            </p>
            <p className="etxt-md md:text-xl text-primary">
              123 Clean St, Sydney, NSW 2000, Australia
            </p>
          </div>
          <div className="w-full">
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Email
            </p>
            <p className="etxt-md md:text-xl text-primary">
              contact@cleaningcompany.com
            </p>
          </div>
          <div>
            <p className="font-semibold text-base text-primary opacity-50 uppercase">
              Get in Touch
            </p>
            <p className="etxt-md md:text-xl text-primary">+61 1234 5678</p>
            <p className="etxt-md md:text-xl text-primary">+61 1234 5678</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
