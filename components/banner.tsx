"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Circle, Star } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { banner1 } from "@/constants/images";

const bannarData = [
  {
    image: banner1,
    title: "Caring for Cleanliness Caring for You",
    description:
      "Experience the joy of a spotless space with our professional cleaning services.",
    rating: 4.1,
    reviews: "14k",
  },
  {
    image: banner1,
    title: "Caring for Cleanliness Caring for You",
    description:
      "Experience the joy of a spotless space with our professional cleaning services.",
    rating: 4.1,
    reviews: "14k",
  },
  {
    image: banner1,
    title: "Caring for Cleanliness Caring for You",
    description:
      "Experience the joy of a spotless space with our professional cleaning services.",
    rating: 4.1,
    reviews: "14k",
  },
];

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      // plugins={[plugin.current]}
      className="h-full w-full relative"
    >
      <CarouselContent>
        {bannarData.map((item, index) => (
          <CarouselItem
            className="min-h-[630px] lg:min-h-[780px] w-full relative"
            key={index}
          >
            <Image
              src={item.image}
              alt={item.title}
              // width={1366}
              // height={740}
              priority={true}
              sizes="calc(100vw + 16px)"
              className="h-full w-full absolute top-0 object-cover object-center -z-20"
            />
            <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
            <div className="max-w-[316px] md:max-w-[816px] absolute top-[187px] left-[40px] sm:left-[55px]">
              <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[72px] leading-10 md:leading-[72px] font-bricolageGrotesque mb-3">
                {item.title}
              </h1>
              <p className="text-primary-foreground text-md md:text-2xl mb-9">
                {item.description}
              </p>
              <Button variant="success" size="lg" className="mb-9">
                Get service quote
              </Button>
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
                    {item.rating}/5
                  </p>
                  <p className="text-primary-foreground text-base font-normal">
                    ({item.reviews} Reviews)
                  </p>
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-center items-center gap-[10px] absolute bottom-4">
        {bannarData.length > 1 &&
          bannarData.map((_, index) => (
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