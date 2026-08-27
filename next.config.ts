import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis", "@shopify/polaris-icons"],
  },
};

export default nextConfig;
