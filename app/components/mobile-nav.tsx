"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav, siteConfig } from "../site-config";
import { MenuIcon, PhoneIcon, WhatsAppIcon, XIcon } from "./icons";

/**
 * Hamburger menu for small screens. The panel hangs off the sticky header so
 * it stays attached while scrolling.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-brand-navy transition-colors hover:border-brand-orange hover:bg-brand-cream hover:text-brand-orange lg:hidden"
      >
        {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav"
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-slate-100 bg-white shadow-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-xl px-4 py-3 text-base font-semibold text-brand-navy transition-colors hover:bg-brand-cream hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <a
              href={siteConfig.phoneTel}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              <PhoneIcon className="h-4 w-4 text-brand-orange" />
              {siteConfig.phoneDisplay}
            </a>

            <a
              href={siteConfig.whatsapp}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>

            <Link
              href="/#plan"
              onClick={close}
              className="rounded-full bg-brand-orange px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-colors hover:bg-brand-orange-600"
            >
              Plan a Campaign
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
