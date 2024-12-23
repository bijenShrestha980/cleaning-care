"use client";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CustomImage } from "@/components/ui/custom-image";

const Review = ({
  reviews,
}: {
  reviews: {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    text: string;
  }[];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

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
    <section className="flex flex-col items-center">
      <div className="mb-12 max-w-[765px] flex flex-col items-center">
        <h4 className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center">
          Customer Reviews
        </h4>
        <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
          Read what our satisfied customers have to say about our cleaning
          services.
        </p>
      </div>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        orientation="horizontal"
        className="h-full w-full relative cursor-pointer select-none"
      >
        <CarouselContent>
          {reviews?.map((review, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 lg:pl-8 flex flex-col items-center sm:items-start gap-2"
            >
              <CustomImage
                src={review.profile_photo_url}
                alt={review.author_name}
                containerClassName="w-[64px] h-[64px] shrink-0"
                fill
                sizes="64px"
                className="object-cover object-center rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h5 className="text-primary text-base md:text-xl text-center sm:text-start font-semibold line-clamp-1">
                  {review.author_name}
                </h5>
                <p className="text-center sm:text-start text-primary line-clamp-4">
                  {review.text}
                </p>
                <div className="flex justify-center sm:justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      size={15}
                      stroke="#fabb05"
                      key={index}
                      fill={index < review.rating ? "#fabb05" : "transparent"}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Review;
