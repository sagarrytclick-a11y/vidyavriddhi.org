import Link from "next/link";
import JsonLd from "./json-ld";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { breadcrumbGraph } from "../lib/structured-data";
import { siteConfig } from "../site-config";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export default function LegalPage({
  title,
  eyebrow,
  updated,
  intro,
  sections,
  path,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  /** Canonical route of the page, e.g. "/privacy" — used for breadcrumbs. */
  path: string;
}) {
  return (
    <>
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 bg-white focus:outline-none">
        {/* Header block: 48/64 px of air, matching the homepage sections, but
            only a small tail below so it does not double up with the body's top
            padding (the two used to add up to ~120 px of dead space). */}
        <div className="border-b border-slate-100 bg-gradient-to-b from-brand-cream to-white pt-12 pb-6 sm:pt-16 sm:pb-8">
          <div className="mx-auto max-w-3xl px-6">
            {/* Visible trail, mirrored 1:1 by the BreadcrumbList JSON-LD. */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-brand-orange"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">
                  /
                </li>
                <li aria-current="page" className="text-brand-navy">
                  {title}
                </li>
              </ol>
            </nav>

            <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-orange sm:text-xs sm:tracking-[0.25em]">
              <span className="h-0.5 w-8 bg-brand-orange" />
              {eyebrow}
            </p>
            <h1 className="mt-5 text-2xl font-black leading-tight tracking-tight text-brand-navy sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Last updated: {updated}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-6 pb-12 sm:pt-8 sm:pb-14">
          <p className="text-base leading-relaxed text-slate-600">{intro}</p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-10 sm:mt-11">
              <h2 className="text-lg font-extrabold text-brand-navy sm:text-xl">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-sm leading-relaxed text-slate-600"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-14 rounded-2xl border border-slate-200/80 bg-brand-mist p-6 sm:p-8">
            <h2 className="text-base font-extrabold text-brand-navy">
              Questions about this policy?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Write to{" "}
              <a
                href={siteConfig.emailLink}
                className="font-semibold text-brand-orange underline"
              >
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a
                href={siteConfig.phoneTel}
                className="font-semibold text-brand-orange underline"
              >
                {siteConfig.phoneDisplay}
              </a>
              . {siteConfig.name}, {siteConfig.address}
            </p>
          </div>
        </div>
      </main>

      <JsonLd data={breadcrumbGraph({ path, name: title })} />

      <SiteFooter />
    </>
  );
}
