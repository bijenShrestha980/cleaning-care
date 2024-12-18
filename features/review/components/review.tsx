import { Star } from "lucide-react";
import { CustomImage } from "@/components/ui/custom-image";
import { fetchReviews } from "../api/use-reviews";

const Review = async () => {
  const reviews = await fetchReviews();

  // Shuffle the reviews array and take the first 4 items
  const shuffledReviews = reviews?.result?.reviews.sort(
    () => 0.5 - Math.random()
  );
  const randomReviews = shuffledReviews.slice(0, 4);

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
      <div className="grid lg:grid-cols-2 items-center gap-8 md:gap-[72px]">
        {randomReviews.map((review, index) => (
          <div key={index} className="px-4 w-full flex flex-row gap-2 md:gap-4">
            <CustomImage
              src={review.profile_photo_url}
              alt={review.author_name}
              containerClassName="w-[64px] h-[64px] shrink-0"
              fill
              sizes="64px"
              className="object-cover object-center rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h5 className="text-primary text-base md:text-xl font-semibold line-clamp-1">
                {review.author_name}
              </h5>
              <p className="text-primary line-clamp-4">{review.text}</p>
              <div className="flex gap-1">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
