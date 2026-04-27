export const fetchReviews = async () => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ32vJVYoYBS4RHUYoT8Olij4&fields=reviews,user_ratings_total,rating&key=${process.env.google_api_key}`,
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data as {
    result: {
      rating?: number;
      reviews: {
        author_name: string;
        profile_photo_url: string;
        text: string;
        rating: number;
      }[];
      user_ratings_total: number;
    };
  };
};
