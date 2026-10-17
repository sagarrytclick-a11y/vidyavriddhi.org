import type { MetadataRoute } from "next";
import { defaultDescription } from "./lib/seo";
import { siteConfig } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: defaultDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16375e",
    lang: "en-IN",
    dir: "ltr",
    categories: ["business", "education", "marketing"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      /*
       * Add a square 192×192 and 512×512 PNG (and a 180×180 apple-touch-icon)
       * exported from the logo mark for a proper install prompt:
       *
       *   { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
       *   { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
       *   { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
       */
    ],
  };
}
