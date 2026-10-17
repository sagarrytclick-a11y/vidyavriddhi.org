import Link from "next/link";
import Logo from "./logo";
import MobileNav from "./mobile-nav";
import { mainNav, siteConfig } from "../site-config";
import { PhoneIcon } from "./icons";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link href="/" aria-label="Vidya Vriddhi home" className="shrink-0">
          <Logo priority className="h-10 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-navy/80 transition-colors hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.phoneTel}
            aria-label={`Call Vidya Vriddhi on ${siteConfig.phoneDisplay}`}
            className="hidden h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand-orange transition-all duration-300 hover:scale-105 hover:border-brand-orange hover:bg-brand-cream sm:grid"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <Link
            href="/#plan"
            className="hidden rounded-full bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-orange-600 hover:shadow-xl hover:shadow-brand-orange/40 sm:inline-block lg:px-6"
          >
            Plan a Campaign
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
