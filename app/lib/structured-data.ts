import { siteConfig } from "../site-config";
import {
  knowsAbout,
  organizationDescription,
  serviceAreaStates,
} from "./seo";

/**
 * JSON-LD builders. Plain data only — no component imports — so the site-wide
 * graph can live in `layout.tsx` without pulling page components into every
 * route's bundle.
 */

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const businessId = `${siteConfig.url}/#localbusiness`;

const logoImage = {
  "@type": "ImageObject",
  url: `${siteConfig.url}${siteConfig.logo}`,
  width: 500,
  height: 200,
} as const;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.addressParts.street,
  addressLocality: siteConfig.addressParts.locality,
  addressRegion: siteConfig.addressParts.region,
  postalCode: siteConfig.addressParts.postalCode,
  addressCountry: siteConfig.addressParts.country,
} as const;

const areaServed = [
  { "@type": "Country", name: "India" },
  ...serviceAreaStates.map((name) => ({ "@type": "State", name })),
];

/** Organization + WebSite + the local business record. Rendered site-wide. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      // The logo reads "A unit of JP Technologies".
      parentOrganization: { "@type": "Organization", name: "JP Technologies" },
      url: siteConfig.url,
      logo: logoImage,
      image: logoImage.url,
      slogan: siteConfig.tagline,
      description: organizationDescription,
      email: siteConfig.email,
      telephone: siteConfig.phoneDisplay,
      address: postalAddress,
      areaServed,
      knowsAbout,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.phoneDisplay,
          email: siteConfig.email,
          contactType: "sales",
          areaServed: siteConfig.addressParts.country,
          availableLanguage: ["en", "hi"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      description: organizationDescription,
      inLanguage: "en-IN",
      publisher: { "@id": organizationId },
    },
    {
      // `ProfessionalService` is schema.org's LocalBusiness subtype for
      // service businesses, which is what a marketing agency is.
      "@type": "ProfessionalService",
      "@id": businessId,
      name: `${siteConfig.name} — ${siteConfig.tagline}`,
      url: siteConfig.url,
      image: logoImage.url,
      slogan: siteConfig.tagline,
      description: organizationDescription,
      email: siteConfig.email,
      telephone: siteConfig.phoneDisplay,
      address: postalAddress,
      areaServed,
      knowsAbout,
      parentOrganization: { "@id": organizationId },
    },
  ],
};

/**
 * Home page graph: the FAQ accordion and the channel catalog, so the page can
 * earn FAQ and Service listings instead of just a brand record.
 */
export function homeGraph({
  faqs,
  services,
}: {
  faqs: ReadonlyArray<{ question: string; answer: string }>;
  services: ReadonlyArray<{ title: string; description: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#student-lead-generation`,
        name: "Student lead generation for education brands",
        serviceType: "Student lead generation and education marketing",
        description: organizationDescription,
        url: siteConfig.url,
        provider: { "@id": organizationId },
        areaServed,
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Student enquiry channels",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
    ],
  };
}

/** Breadcrumbs for the legal pages, matching the visible trail. */
export function breadcrumbGraph({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}${path}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteConfig.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: `${siteConfig.url}${path}`,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}${path}#webpage`,
        url: `${siteConfig.url}${path}`,
        name,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "en-IN",
        breadcrumb: { "@id": `${siteConfig.url}${path}#breadcrumb` },
      },
    ],
  };
}
