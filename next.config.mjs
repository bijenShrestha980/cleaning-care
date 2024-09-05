/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    map: process.env.MapboxAccessToken,
  },
};

export default nextConfig;
