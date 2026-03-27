import type { NextConfig } from "next";

import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: "gahenax-ai-solutions",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
