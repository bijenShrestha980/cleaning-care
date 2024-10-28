/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.cleaningcare.au",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
  env: {
    url: process.env.BASE_URL,
    session_secret: process.env.SESSION_SECRET,
    google_api_key: process.env.GOOGLE_API_KEY,
  },
};

export default nextConfig;
