import Reveal from "./reveal";

const steps = [
  {
    number: "01",
    title: "Map the Intake",
    description:
      "Set the priority courses, locations, audience and application timeline.",
  },
  {
    number: "02",
    title: "Choose the Channels",
    description:
      "Select a practical mix of website, SEO, Google, Meta and partner sources.",
  },
  {
    number: "03",
    title: "Prepare the Journey",
    description:
      "Align landing pages, campaign messages and enquiry forms with the offer.",
  },
  {
    number: "04",
    title: "Capture Enquiries",
    description:
      "Bring responses into an agreed workflow with their source and course context.",
  },
  {
    number: "05",
    title: "Review and Refine",
    description:
      "Use channel activity and admissions feedback to guide the next adjustments.",
  },
];

export default function Process() {
  return (
    <section className="bg-brand-navy py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            A clear path from plan to follow-up
          </h2>

          <p className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-300" style={{ animationDelay: "90ms" }}>
            Start with the intake priorities, then connect discovery, campaign
            activity and enquiry follow-up into one workflow.
          </p>

          <div className="relative mt-12">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-white/20 lg:block"
            />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  style={{ animationDelay: `${160 + index * 110}ms` }}
                  className="reveal group relative text-center"
                >
                  <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-brand-orange bg-brand-navy text-sm font-bold text-brand-orange transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-base font-bold text-white transition-colors duration-300 group-hover:text-brand-orange">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
