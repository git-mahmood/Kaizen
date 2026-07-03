/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: "/Kaizen",
  assetPrefix: "/Kaizen/",
};

module.exports = nextConfig;
