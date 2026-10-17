/**
 * Business details for Vidya Vridhi.
 *
 * Mirrors the PHP `site_identity.php` so the Next.js site and any PHP tooling
 * agree on the same values. Everything contact-related on the site reads from
 * here, so there is one place to change.
 *
 * NOTE: `site_identity.php` marks the phone, email and address as PLACEHOLDERS
 * to be confirmed before going live — worth double-checking.
 */
const identity = {
  name: "Vidya Vridhi",
  tagline: "Where Demand Meets Delivery.",
  email: "Abhishek@vidyavriddhi.com",

  /** Digits only, exactly as stored in site_identity.php. */
  phone: "9839865347",
  whatsapp: "https://wa.me/919839865347",

  /** Live origin without a trailing slash; used for canonical, OG and sitemap. */
  url: "https://vidyavriddhi.org",

  address:
    "S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4, Noida, Uttar Pradesh 201301, India",
  addressParts: {
    street:
      "S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4",
    locality: "Noida",
    region: "Uttar Pradesh",
    postalCode: "201301",
    country: "IN",
  },

  logo: "/logo.png",
  notificationEmails: ["Abhishek@vidyavriddhi.com"],

  /**
   * Social profiles. These are all "#" placeholders in site_identity.php, so
   * the footer does not render them — nothing links to a dead page. Fill in
   * real profile URLs here when they exist.
   */
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    x: "#",
  },
} as const;

// Derived links, following the same rules as site_identity.php.
const phoneDigits = identity.phone.replace(/\D/g, "");

export const siteConfig = {
  ...identity,
  phoneDisplay: `(+91) ${identity.phone}`,
  phoneTel: `tel:+${phoneDigits.length > 10 ? phoneDigits : `91${phoneDigits}`}`,
  emailLink: `mailto:${identity.email}`,
  copyrightYear: 2026,
};

export const mainNav = [
  { label: "Who We Are", href: "/#who-we-are" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Our Clients", href: "/#our-clients" },
  { label: "Study Areas", href: "/#study-areas" },
  { label: "Questions", href: "/#questions" },
];

export const footerNav = [
  { label: "Who We Are", href: "/#who-we-are" },
  { label: "Solutions", href: "/#what-we-do" },
  { label: "Our Clients", href: "/#our-clients" },
  { label: "How It Works", href: "/#study-areas" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];
