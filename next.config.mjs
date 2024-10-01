/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    map: process.env.MapboxAccessToken,
    url: process.env.BASE_URL,
    api_dev: process.env.API_BASE_URL_DEVELOPMENT,
    api_prod: process.env.API_BASE_URL_PRODUCTION,
    session_secret: process.env.SESSION_SECRET,
    google_api_key: process.env.GOOGLE_API_KEY,
  },
};

export default nextConfig;
