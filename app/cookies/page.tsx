import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/legal-page";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Vidya Vriddhi uses cookies and similar technologies, and how you can control them.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    type: "article",
    title: "Cookie Policy",
    description:
      "How Vidya Vriddhi uses cookies and similar technologies, and how you can control them.",
    url: "/cookies",
  },
};

const sections: LegalSection[] = [
  {
    heading: "1. What are cookies?",
    paragraphs: [
      "Cookies are small text files placed on your device when you visit a website. They help a site remember your actions and preferences over time, and they allow the site owner and its partners to understand how the site is being used.",
      "This policy also covers similar technologies such as pixels, tags and local storage, which we refer to together as cookies.",
    ],
  },
  {
    heading: "2. How we use cookies",
    paragraphs: [
      "We keep our use of cookies deliberately limited, and we group them into four categories:",
    ],
    bullets: [
      "Strictly necessary: required for the website to load, to submit an enquiry form securely and to remember your cookie choices. These cannot be switched off.",
      "Preferences: remember choices such as your region or a dismissed message, so you do not have to repeat them.",
      "Analytics: help us understand which pages, courses and campaigns lead to enquiries, by measuring visits and interactions in aggregate.",
      "Advertising and measurement: set by advertising platforms such as Google and Meta so we can measure campaign performance and show relevant ads to people researching courses.",
    ],
  },
  {
    heading: "3. Third-party cookies",
    paragraphs: [
      "Some cookies are set by services we use rather than by us. These may include analytics providers, advertising platforms, embedded media and form or hosting providers. Their use of the information they collect is governed by their own privacy and cookie policies.",
    ],
  },
  {
    heading: "4. Managing cookies",
    paragraphs: [
      "You can control or delete cookies through your browser settings, and you can clear cookies already stored on your device at any time. You can also limit personalised advertising through your Google and Meta ad settings.",
      "Blocking some cookies, particularly strictly necessary ones, may stop parts of the website — such as the enquiry form — from working properly.",
    ],
  },
  {
    heading: "5. Do Not Track and consent",
    paragraphs: [
      "Where required by applicable law, we ask for your consent before setting non-essential cookies and you can withdraw that consent at any time. Browser \"Do Not Track\" signals are handled in line with the options available in the browsers we support.",
    ],
  },
  {
    heading: "6. Changes to this policy",
    paragraphs: [
      "If we change the cookies we use or how we use them, we will update this page. The date at the top shows when it was last revised.",
    ],
  },
  {
    heading: "7. Contact",
    paragraphs: [
      `For questions about our use of cookies, write to ${siteConfig.email} or call ${siteConfig.phoneDisplay}.`,
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="17 October 2026"
      intro="This policy explains how Vidya Vriddhi uses cookies and similar technologies on this website, what they are used for, and how you can control them. It should be read alongside our Privacy Policy."
      sections={sections}
      path="/cookies"
    />
  );
}
