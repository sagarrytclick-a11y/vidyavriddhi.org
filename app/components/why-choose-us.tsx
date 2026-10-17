import Reveal from "./reveal";

const reasons = [
  {
    number: "01",
    title: "Built for Education Journeys",
    description:
      "Campaign messages reflect how learners compare courses, campuses and study options.",
  },
  {
    number: "02",
    title: "More Than One Entry Point",
    description:
      "Combine website capture, organic search, paid search, social and relevant partner sources.",
  },
  {
    number: "03",
    title: "Clear Source Context",
    description:
      "Keep campaign and channel context alongside enquiries for more informed follow-up.",
  },
  {
    number: "04",
    title: "A Mix That Can Adapt",
    description:
      "Adjust channel focus to suit your program, geography, intake schedule and budget.",
  },
  {
    number: "05",
    title: "One Connected Journey",
    description:
      "Bring discovery, campaign pages and enquiry handling into a coordinated experience.",
  },
  {
    number: "06",
    title: "Useful Performance Reviews",
    description:
      "Review channel activity with your admissions goals and decide what to improve next.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-mist py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Why education brands choose Vidya Vridhi
          </h2>

          <p className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600" style={{ animationDelay: "90ms" }}>
            Vidya Vridhi brings student discovery and enquiry capture into a
            channel plan your team can act on.
          </p>

          <div className="mt-12 grid gap-x-16 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <div
                key={reason.number}
                style={{ animationDelay: `${160 + index * 80}ms` }}
                className="reveal group flex gap-5 border-b border-slate-200 py-7 transition-colors duration-300 hover:border-brand-orange/50"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-orange/10 text-xs font-bold text-brand-orange transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white">
                  {reason.number}
                </span>
                <div className="transition-transform duration-300 group-hover:translate-x-1">
                  <h3 className="text-base font-bold text-brand-navy transition-colors duration-300 group-hover:text-brand-orange">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
