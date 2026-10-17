import Link from "next/link";
import Logo from "./logo";
import { footerNav, legalNav, siteConfig } from "../site-config";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <span className="inline-flex rounded-xl bg-white px-3 py-2">
              <Logo sizes="90px" className="h-9 w-auto" />
            </span>
            <p className="mt-4 text-sm font-semibold text-white">
              {siteConfig.tagline}
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
              Website, SEO, Google Ads, Meta and education-partner enquiries in
              one student acquisition plan.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-white">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand-orange" />
                <a
                  href={siteConfig.phoneTel}
                  className="transition-colors hover:text-brand-orange"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-brand-orange" />
                <a
                  href={siteConfig.emailLink}
                  className="break-all transition-colors hover:text-brand-orange"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span className="text-xs leading-relaxed text-slate-400">
                  {siteConfig.address}
                </span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={siteConfig.whatsapp}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-xs font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={siteConfig.phoneTel}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[11px] leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-300">Disclaimer:</span>{" "}
            Vidya Vridhi is an independent education marketing and student
            lead-generation platform, not affiliated with or an official
            representative of any university, college, examination body or
            government authority referenced on this website. Admission decisions
            rest solely with the respective institutions.
          </p>

          <div className="mt-4 flex flex-col gap-2 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {siteConfig.copyrightYear} {siteConfig.name}. All rights
              reserved.
            </p>
            <p>
              Information is general; campaign and admission outcomes are not
              guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
