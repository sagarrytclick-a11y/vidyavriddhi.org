import { siteConfig } from "../site-config";

/**
 * Search-engine copy and defaults.
 *
 * Kept separate from `site-config.ts`, which mirrors the PHP business identity.
 * This file holds the wording that only search engines and social cards read.
 */

/**
 * Home page title. The primary keyword sits at the front because search
 * engines give the opening words the most weight; the brand still closes it.
 * 59 characters, so it survives a Google SERP without truncation.
 */
export const defaultTitle =
  "Student Lead Generation for Education Brands | Vidya Vridhi";

/** ~148 characters — long enough to sell, short enough not to be cut off. */
export const defaultDescription =
  "Vidya Vridhi plans student lead generation for education brands in India — website enquiries, SEO, Google Ads and Meta campaigns in one measurable funnel.";

/**
 * Google ignores `keywords`, but Bing, Yandex and most site auditors still read
 * it, and it doubles as our keyword map. Kept to real intents we actually serve.
 */
export const keywords = [
  "student lead generation",
  "student lead generation agency India",
  "education marketing agency",
  "admission lead generation",
  "student enrolment marketing",
  "lead generation for colleges and universities",
  "education lead generation company",
  "Google Ads for education brands",
  "SEO for universities and colleges",
  "higher education digital marketing",
  "study abroad lead generation",
  "education marketing agency Noida",
];

/** Long-form positioning, used where search engines want a description. */
export const organizationDescription =
  "Vidya Vridhi is an education marketing and student lead-generation platform for universities, colleges, healthcare and professional-course institutions. It brings website enquiry capture, organic search, Google Ads, Meta campaigns and education-partner sources into one planned, source-aware student acquisition funnel.";

/**
 * What the business is knowledgeable about — read by Google's Knowledge Graph
 * and by AI answer engines when they summarise the organisation.
 */
export const knowsAbout = [
  "student lead generation",
  "education marketing",
  "higher education admissions",
  "Google Ads",
  "Meta advertising",
  "search engine optimisation",
  "lead routing and follow-up",
  "marketing performance reporting",
];

/**
 * States shown in the "Admission markets" section, mirrored here so
 * `structured-data.ts` can declare the service area without importing any
 * component. Update both if the markets change.
 */
export const serviceAreaStates = [
  "Uttar Pradesh",
  "Delhi",
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
];

/** `?utm_source=...` friendly absolute URL builder. */
export function absolute(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
