import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["media.giphy.com", "media1.giphy.com"],
  },
};

export default nextConfig;
