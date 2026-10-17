import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // nodemailer should be loaded from node_modules at runtime rather than
  // bundled into the server output.
  serverExternalPackages: ["nodemailer"],

  // Stop advertising the framework version in the response headers.
  poweredByHeader: false,

  images: {
    // AVIF first (much smaller), WebP for everything that cannot decode it.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Optimised images are content-addressed by URL, so a long TTL is safe and
    // keeps repeat visits off the image optimiser.
    minimumCacheTTL: 2678400, // 31 days
  },

  experimental: {
    agentFeedback: true,
    // The site ships one small stylesheet; inlining it removes a
    // render-blocking round trip before first paint.
    inlineCss: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers: no ranking factor by themselves, but they keep
          // the site from being flagged or framed, and they are what an audit
          // of a production marketing site expects to see.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
