/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose Vercel's server-side VERCEL_ENV to client components so the
  // Arabic feature flag (lib/featureFlags.ts) can read it in the browser.
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? "development",
  },
};

export default nextConfig;
