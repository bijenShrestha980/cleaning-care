"use client";
import { banner1 } from "@/constants/images";
import { useAllServices, useServices } from "../api/use-service";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
const servicess = [
  {
    img: banner1,
    title: "Residential Cleaning",
    description:
      "Our professional residential cleaning services ensure your home is spotless and comfortable. From kitchens to bedrooms, we’ve got you covered.",
  },
  {
    img: banner1,
    title: "Residential Cleaning",
    description:
      "Our professional residential cleaning services ensure your home is spotless and comfortable. From kitchens to bedrooms, we’ve got you covered.",
  },
  {
    img: banner1,
    title: "Residential Cleaning",
    description:
      "Our professional residential cleaning services ensure your home is spotless and comfortable. From kitchens to bedrooms, we’ve got you covered.",
  },
];
const ServicesSection = () => {
  const {
    data: services,
    isPending: servicesIsPending,
    isError: servicesIsError,
  } = useServices();

  console.log(servicess);
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {servicesIsPending
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-[365px] w-[470px] mb-3" key={index} />
          ))
        : services &&
          services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className="p-6 flex flex-col items-center gap-2 md:gap-4"
            >
              <Image
                src={service?.banner_image_url || banner1}
                alt="Residential Cleaning"
                width={225}
                height={225}
                className="rounded-full w-[225px] h-[225px] object-cover object-center"
              />
              <h5 className="text-primary text-lg md:text-2xl font-medium text-center">
                {service.service_name}
              </h5>
              <p className="text-base md:text-lg text-primary opacity-50 text-center">
                {service.short_description}
              </p>
            </div>
          ))}
    </div>
  );
};

export default ServicesSection;
