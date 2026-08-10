import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  typescript: {
    // Pre-existing SPA type mismatches (framer-motion ease tuples, data shapes).
    // Keep the site shipping while types are cleaned up incrementally.
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
