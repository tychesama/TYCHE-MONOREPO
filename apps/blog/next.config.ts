import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.giphy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media1.giphy.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;