import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/legal-page";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Vidya Vriddhi collects, uses and protects the information submitted through our student lead generation website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "article",
    title: "Privacy Policy",
    description:
      "How Vidya Vriddhi collects, uses and protects the information submitted through our student lead generation website.",
    url: "/privacy",
  },
};

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    paragraphs: [
      `${siteConfig.name} is an education marketing and student lead-generation platform operated as a unit of JP Technologies, with its office at ${siteConfig.address}`,
      "We are an independent marketing platform. We are not affiliated with, or an official representative of, any university, college, examination body or government authority referenced on this website.",
    ],
  },
  {
    heading: "2. Information we collect",
    paragraphs: [
      "We collect the information you choose to give us, plus a limited amount of technical information gathered automatically when you use the website.",
    ],
    bullets: [
      "Enquiry details you submit: full name, mobile number, work email address and institution or company name.",
      "The content of any message, brief or form response you send us, including course, intake, location and budget details.",
      "Technical data: IP address, browser type, device type, referring page, pages viewed and time on page.",
      "Cookies and similar technologies, as described in our Cookie Policy.",
    ],
  },
  {
    heading: "3. How we use your information",
    bullets: [
      "To respond to your enquiry and prepare a channel or campaign plan for you.",
      "To contact you by phone, email or WhatsApp about the request you submitted.",
      "To share relevant enquiries with the education institution or partner best placed to address them.",
      "To operate, secure and improve the website and understand which pages and campaigns are useful.",
      "To meet legal, accounting and record-keeping obligations.",
    ],
  },
  {
    heading: "4. Consent and legal basis",
    paragraphs: [
      "When you submit the enquiry form you confirm that you agree to be contacted about that enquiry. You can withdraw consent at any time by writing to us, and we will stop contacting you for marketing purposes.",
      "Where you provide details on behalf of an institution, you confirm that you are authorised to share those details with us.",
    ],
  },
  {
    heading: "5. Sharing your information",
    paragraphs: [
      "We do not sell your personal information. We share it only where it is needed to deliver the service you asked for:",
    ],
    bullets: [
      "Education institutions and partner organisations relevant to your enquiry.",
      "Service providers who host our website, run our campaigns or send our emails, under confidentiality obligations.",
      "Authorities, where we are legally required to disclose information.",
    ],
  },
  {
    heading: "6. Cookies and tracking",
    paragraphs: [
      "We use cookies and similar technologies for essential functionality, analytics and advertising measurement. Details of the categories we use and how to control them are set out in our Cookie Policy.",
    ],
  },
  {
    heading: "7. How long we keep your information",
    paragraphs: [
      "We keep enquiry records for as long as needed to handle your request and to maintain reasonable marketing and accounting records. When information is no longer needed, we delete or anonymise it.",
    ],
  },
  {
    heading: "8. Your rights",
    bullets: [
      "Ask for a copy of the personal information we hold about you.",
      "Ask us to correct information that is inaccurate or out of date.",
      "Ask us to delete your information, where we are not required to keep it.",
      "Withdraw consent to being contacted, at any time.",
      "Object to or restrict certain processing, including marketing.",
    ],
  },
  {
    heading: "9. Security",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect the information we hold against unauthorised access, loss or misuse. No method of transmission or storage over the internet is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "10. Students under 18",
    paragraphs: [
      "Our website is intended for institution and admissions teams. If you are under 18 and want to enquire about a course, please have a parent or guardian contact us on your behalf.",
    ],
  },
  {
    heading: "11. Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last revised, and the current version always applies to information we hold.",
    ],
  },
  {
    heading: "12. Contact us",
    paragraphs: [
      `For any question about this policy, or to exercise your rights, write to ${siteConfig.email} or call ${siteConfig.phoneDisplay}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="17 October 2026"
      intro="This policy explains what information Vidya Vriddhi collects through this website, why we collect it, how we use and share it, and the choices you have. It applies to enquiries submitted through our forms and to general use of the site."
      sections={sections}
      path="/privacy"
    />
  );
}
