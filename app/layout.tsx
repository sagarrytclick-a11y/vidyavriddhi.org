import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import JsonLd from "./components/json-ld";
import { defaultDescription, defaultTitle, keywords } from "./lib/seo";
import { siteGraph } from "./lib/structured-data";
import { siteConfig } from "./site-config";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Search Console / Bing Webmaster ownership proofs. Both are optional: set
 * `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` or
 * `NEXT_PUBLIC_BING_SITE_VERIFICATION` in the host environment and the meta tag
 * appears; leave them unset and no empty tag is shipped.
 */
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Education marketing",
  alternates: { canonical: "/" },
  // Images come from the `opengraph-image` / `twitter-image` file conventions,
  // so they are not declared here.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: siteConfig.url,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification:
    googleVerification || bingVerification
      ? {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { "msvalidate.01": bingVerification } }
            : {}),
        }
      : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  // Tints the browser UI on mobile to the brand navy.
  themeColor: "#16375e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      // `globals.css` sets `scroll-behavior: smooth`. Next needs to know that
      // so it can temporarily use instant scrolling while restoring scroll
      // position during a route transition.
      data-scroll-behavior="smooth"
      // Browser extensions (and theme/consent scripts) inject attributes into
      // <html>/<body> before React hydrates. Without this, React treats the
      // extra attribute as a hydration mismatch and re-renders the whole
      // subtree on the client. With it, React keeps whatever is already in the
      // DOM instead of warning and rebuilding.
      suppressHydrationWarning
      className={`${openSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* Keyboard users can jump past the header straight to the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        <JsonLd data={siteGraph} />

        {children}
      </body>
    </html>
  );
}
