import { PlusIcon } from "./icons";
import Reveal from "./reveal";

/**
 * Exported so `app/page.tsx` can build the FAQPage structured data from the
 * exact same copy the accordion renders.
 */
export const faqs = [
  {
    question: "Which channels can bring student enquiries?",
    answer:
      "Most education brands see a mix from website enquiry forms, organic search, Google Ads, Meta campaigns and partner or referral sources. We plan the combination around your courses, locations and intake goals.",
  },
  {
    question: "Can the plan focus on a particular course or location?",
    answer:
      "Yes. Campaigns are usually structured around a priority course, campus or city, so the message, landing page and audience all line up with the intake you want to fill.",
  },
  {
    question: "What does a channel plan cover?",
    answer:
      "It covers who you want to reach, which channels to use, the landing pages and enquiry forms involved, how enquiries are routed, and which reports show what is contributing.",
  },
  {
    question: "Are enquiries or admissions guaranteed?",
    answer:
      "No. We work on building visibility, traffic and enquiry flow, but admission decisions rest solely with the institution and outcomes are not guaranteed.",
  },
  {
    question: "How do you decide which channels to use?",
    answer:
      "We start with your intake priorities, budget and timeline, then look at where your audience already searches and how previous activity performed before recommending a channel mix.",
  },
];

export default function Faq() {
  return (
    <section id="questions" className="scroll-mt-24 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Student lead generation questions, answered
          </h2>

          <p className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600" style={{ animationDelay: "90ms" }}>
            A few useful details about channels, campaign planning and student
            enquiry expectations.
          </p>

          <div className="mx-auto mt-10 max-w-3xl border-t border-slate-200">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                style={{ animationDelay: `${160 + index * 70}ms` }}
                className="reveal group border-b border-slate-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
                  <span className="text-base font-bold text-brand-navy transition-colors duration-300 group-hover:text-brand-orange">
                    {faq.question}
                  </span>
                  <PlusIcon className="h-5 w-5 shrink-0 text-brand-orange transition-transform duration-300 group-hover:scale-110 group-open:rotate-45" />
                </summary>
                <p className="pb-6 pr-10 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
