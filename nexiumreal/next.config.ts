import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
