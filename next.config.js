/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "gaci-media.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
