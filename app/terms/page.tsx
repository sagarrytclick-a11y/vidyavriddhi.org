import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/legal-page";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply to using the Vidya Vriddhi website and submitting a student enquiry or campaign request.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "article",
    title: "Terms & Conditions",
    description:
      "The terms that apply to using the Vidya Vriddhi website and submitting a student enquiry or campaign request.",
    url: "/terms",
  },
};

const sections: LegalSection[] = [
  {
    heading: "1. Accepting these terms",
    paragraphs: [
      "By accessing or using this website, or by submitting an enquiry form, you agree to these Terms & Conditions. If you do not agree with them, please do not use the website.",
    ],
  },
  {
    heading: "2. About Vidya Vriddhi",
    paragraphs: [
      `${siteConfig.name} is an education marketing and student lead-generation platform operated as a unit of JP Technologies, with its office at ${siteConfig.address}`,
      "We are an independent platform. We are not affiliated with, and do not act as an official representative of, any university, college, examination body or government authority referenced on this website. Admission decisions rest solely with the respective institutions.",
    ],
  },
  {
    heading: "3. Use of the website",
    bullets: [
      "Use the website only for lawful purposes and in a way that does not restrict or interfere with anyone else's use of it.",
      "Do not attempt to gain unauthorised access to the website, its servers or any connected systems.",
      "Do not scrape, copy or republish site content for commercial purposes without our written permission.",
      "Do not submit false, misleading or third-party details without authorisation.",
    ],
  },
  {
    heading: "4. Enquiries you submit",
    paragraphs: [
      "Information you send through the enquiry and campaign-planning forms must be accurate and your own, or submitted with the permission of the person or institution it relates to. We use it to prepare a plan and follow up, as described in our Privacy Policy.",
    ],
  },
  {
    heading: "5. No guarantee of enquiries, admissions or results",
    paragraphs: [
      "We plan and run marketing activity that is intended to build visibility, traffic and enquiry flow. Enquiry volumes, lead quality, admission outcomes, rankings, conversions and campaign results vary and are not guaranteed.",
      "Any figures, examples, statistics or market data shown on this website are indicative and provided for general information only. They are not a promise of performance.",
    ],
  },
  {
    heading: "6. Fees and engagements",
    paragraphs: [
      "Nothing on this website is an offer or a binding quotation. Scope of work, deliverables, timelines and fees for any engagement are agreed separately in writing before work begins.",
    ],
  },
  {
    heading: "7. Intellectual property",
    paragraphs: [
      "The website design, text, graphics, layout and the Vidya Vriddhi name and logo are owned by, or licensed to, Vidya Vriddhi and may not be reproduced without permission. Client and partner logos remain the property of their respective owners and are used to identify the organisations we work with.",
    ],
  },
  {
    heading: "8. Third-party links and content",
    paragraphs: [
      "The website may link to third-party websites. We do not control those sites and are not responsible for their content, accuracy, availability or privacy practices.",
    ],
  },
  {
    heading: "9. Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, Vidya Vriddhi is not liable for any indirect, incidental or consequential loss, or for any loss of profit, business, goodwill or data, arising from your use of this website or from any campaign or admission outcome. Nothing in these terms limits liability that cannot lawfully be limited.",
    ],
  },
  {
    heading: "10. Changes to the website and these terms",
    paragraphs: [
      "We may change, suspend or withdraw any part of the website, and may update these terms from time to time. The version published on this page is the version that applies.",
    ],
  },
  {
    heading: "11. Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and the courts at Gautam Buddh Nagar, Uttar Pradesh have exclusive jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "12. Contact",
    paragraphs: [
      `For questions about these terms, write to ${siteConfig.email} or call ${siteConfig.phoneDisplay}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="17 October 2026"
      intro="These terms govern your use of the Vidya Vriddhi website and any enquiry or campaign request you submit through it. Please read them together with our Privacy Policy and Cookie Policy."
      sections={sections}
      path="/terms"
    />
  );
}
