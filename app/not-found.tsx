import Link from "next/link";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import { mainNav, siteConfig } from "./site-config";
import { ArrowRightIcon, PhoneIcon } from "./components/icons";

export const metadata = {
  title: "Page not found",
  description:
    "That page could not be found. Explore student lead generation services, our clients and study areas from the Vidya Vridhi home page.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 bg-white focus:outline-none">
        <div className="bg-gradient-to-b from-brand-cream to-white">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-orange">
              404
            </p>

            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              We couldn&apos;t find that page
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              The link may be broken, or the page may have moved. Everything about
              our student lead generation work starts from the home page.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="w-full rounded-full bg-brand-orange px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-orange-600 sm:w-auto"
              >
                Go to the home page
              </Link>
              <Link
                href="/#plan"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-navy/20 px-7 py-3.5 text-center text-sm font-bold text-brand-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-navy/40 hover:shadow-lg hover:shadow-brand-navy/5 sm:w-auto"
              >
                Plan a campaign
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-200 pt-8">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-brand-navy/80 transition-colors hover:text-brand-orange"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-sm text-slate-600">
              <PhoneIcon className="h-4 w-4 text-brand-orange" />
              Or call us on{" "}
              <a
                href={siteConfig.phoneTel}
                className="font-semibold text-brand-navy underline decoration-brand-orange/40 underline-offset-4 transition-colors hover:text-brand-orange"
              >
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
