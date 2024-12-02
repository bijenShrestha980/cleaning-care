import { CustomImage } from "@/components/ui/custom-image";
import { fetchAllServices } from "../api/use-service";

const ServicesSection = async () => {
  const services = await fetchAllServices();

  return (
    <div className="w-full flex flex-wrap justify-center">
      {services &&
        services.slice(0, 3).map((service, index) => (
          <div
            key={index}
            className="w-full md:w-[470px] p-2 md:p-4 lg:p-6 flex flex-col items-center gap-4 lg:gap-6"
          >
            <CustomImage
              src={service?.banner_image_url || ""}
              alt="Residential Cleaning"
              fill
              sizes="225px"
              containerClassName="w-[175px] h-[175px] lg:w-[225px] lg:h-[225px]"
              className="rounded-full w-full h-full object-cover object-center"
            />
            <h5 className="text-primary text-lg md:text-2xl font-medium text-center line-clamp-2">
              {service.service_name}
            </h5>
            <p className="text-base md:text-lg text-primary opacity-50 text-center line-clamp-4">
              {service.short_description}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ServicesSection;
