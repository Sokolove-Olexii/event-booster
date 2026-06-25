import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: "/event-booster",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
