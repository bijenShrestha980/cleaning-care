"use client";
import { useEffect, useRef, useState } from "react";
import { Circle, Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { banner1 } from "@/constants/images";
import { CustomImage } from "./ui/custom-image";
import Error from "./ui/error";
import { Skeleton } from "./ui/skeleton";
import { useAllHeroSection } from "@/features/hero-sections/api/use-hero-sections";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const {
    data: heroSectionData,
    isPending: heroSectionIsPending,
    isError: heroSectionIsError,
  } = useAllHeroSection();

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (heroSectionIsPending) {
    return <Skeleton className="w-full min-h-[630px] lg:min-h-[780px]" />;
  }
  if (heroSectionIsError) {
    return <Error />;
  }
  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="h-full w-full relative"
    >
      <CarouselContent>
        {heroSectionData.map((item, index) => (
          <CarouselItem
            className="min-h-[630px] lg:min-h-[740px] w-full relative"
            key={index}
          >
            {heroSectionIsPending ? (
              <Skeleton className="h-[200px] md:h-[740px] w-full -z-20" />
            ) : (
              <>
                <CustomImage
                  src={item?.hero_image_url ? item.hero_image_url : banner1}
                  alt={item.title}
                  fill
                  priority={true}
                  sizes="calc(100vw + 16px)"
                  containerClassName="h-[740px] w-full absolute top-0 -z-20"
                  className="h-[740px] w-full object-cover object-center"
                />
                <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
              </>
            )}

            <div className="max-w-[316px] md:max-w-[816px] absolute top-[187px] left-[40px] sm:left-[55px]">
              {heroSectionIsPending ? (
                <Skeleton className="h-[72px] w-[200px] mb-3" />
              ) : (
                <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[72px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
                  {item.title}
                </h1>
              )}
              {heroSectionIsPending ? (
                <Skeleton className="h-[32px] md:w-[400px] mb-9" />
              ) : (
                <p className="text-primary-foreground text-md md:text-2xl mb-9">
                  {item.description}
                </p>
              )}

              <div className="mb-9">
                <QuoteDialogue />
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="flex items-center gap-1 pb-[4px]">
                  <Star
                    width={16}
                    height={16}
                    strokeWidth={1}
                    stroke="#F0B419"
                    fill="#F0B419"
                  />
                  <Star
                    width={16}
                    height={16}
                    strokeWidth={1}
                    stroke="#F0B419"
                    fill="#F0B419"
                  />
                  <Star
                    width={16}
                    height={16}
                    strokeWidth={1}
                    stroke="#F0B419"
                    fill="#F0B419"
                  />
                  <Star
                    width={16}
                    height={16}
                    strokeWidth={1}
                    stroke="#F0B419"
                    fill="#F0B419"
                  />
                  <Star
                    width={16}
                    height={16}
                    strokeWidth={1}
                    stroke="#F0B419"
                    fill="#F0B419"
                  />
                </span>
                <span className="flex items-center gap-[9px]">
                  <p className="text-primary-foreground text-base font-normal">
                    {/* {(Math.random() * (4.9 - 3.5) + 3.5).toFixed(1)} / 5 */}
                    5 / 5
                  </p>
                  <p className="text-primary-foreground text-base font-normal">
                    ({Math.floor(Math.random() * (50 - 20 + 1)) + 20}k Reviews)
                  </p>
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-center items-center gap-[10px] absolute bottom-4">
        {heroSectionData.length > 1 &&
          heroSectionData.map((_, index) => (
            <Circle
              key={index}
              size={10}
              stroke="#ffffff3d"
              fill={current === index + 1 ? "#fff" : "#ffffff3d"}
            />
          ))}
        {/* Slide {current} of {count} */}
      </div>
    </Carousel>
  );
};

export default Banner;
