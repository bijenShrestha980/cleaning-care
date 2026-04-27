import Link from "next/link";
import { CustomImage } from "@/components/ui/custom-image";
import { fetchAllServices } from "../api/use-service";

const ServicesSection = async () => {
  const services = await fetchAllServices();

  return (
    <div className="w-full flex flex-wrap justify-center">
      {services.map((service, index) => {
        const href = service.service_slug ? `/${service.service_slug}` : "#";
        const name = service.service_name || "Cleaning service";
        return (
          <Link
            key={index}
            href={href}
            aria-label={`Learn more about ${name}`}
            className="w-full md:w-[470px] p-2 md:p-4 lg:p-6 flex flex-col items-center gap-4 lg:gap-6 cursor-pointer relative"
          >
            <CustomImage
              src={service?.banner_image_url || ""}
              alt={name}
              fill
              loading="lazy"
              sizes="225px"
              containerClassName="w-[175px] h-[175px] lg:w-[225px] lg:h-[225px]"
              className="rounded-full w-full h-full object-cover object-center"
            />
            <h3 className="text-primary text-lg md:text-2xl font-medium text-center line-clamp-2">
              {name}
            </h3>
            <div className="h-[160px]">
              <p className="w-full md:w-[470px] py-5 px-4 rounded-xl text-base md:text-lg text-primary opacity-50 text-center z-10 line-clamp-4 group-hover:absolute left-0 group-hover:line-clamp-none group-hover:bg-[#F2FAFF] transition-all duration-300">
                {service.short_description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ServicesSection;
