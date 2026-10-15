import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Validates at compile time the `href` values used in links and navigations. */
  typedRoutes: true,
};

export default nextConfig;
