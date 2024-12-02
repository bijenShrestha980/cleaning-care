export const fetchReviews = async () => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ32vJVYoYBS4RHUYoT8Olij4&fields=reviews,user_ratings_total&key=${process.env.google_api_key}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data as {
    result: {
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
