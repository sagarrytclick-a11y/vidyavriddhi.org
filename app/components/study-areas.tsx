import Reveal from "./reveal";

const areas = [
  {
    number: "01",
    title: "Universities & Colleges",
    description:
      "Present undergraduate and postgraduate options to students comparing institutions and courses.",
  },
  {
    number: "02",
    title: "Healthcare Education",
    description:
      "Build awareness for medical, nursing, pharmacy and allied-health study pathways.",
  },
  {
    number: "03",
    title: "Management & Professional Courses",
    description:
      "Reach learners exploring business, management and career-focused qualifications.",
  },
  {
    number: "04",
    title: "Study Abroad",
    description:
      "Share relevant international study options with students researching destinations and programs.",
  },
  {
    number: "05",
    title: "EdTech & Online Learning",
    description:
      "Introduce online degrees, professional learning and exam-preparation offerings to digital learners.",
  },
];

export default function StudyAreas() {
  return (
    <section id="study-areas" className="scroll-mt-24 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Study areas and institutions we support
          </h2>

          <p
            className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600"
            style={{ animationDelay: "90ms" }}
          >
            Shape the message and channel mix around the course, student decision
            cycle, location and intake calendar.
          </p>

          {/* `gap-px` over a tinted background keeps the dividers correct at
              1, 2 and 5 columns. */}
          <div className="mt-10 grid gap-px overflow-hidden border-y border-slate-200 bg-slate-200 md:grid-cols-2 lg:mt-12 lg:grid-cols-5">
            {areas.map((area, index) => (
              <div
                key={area.number}
                style={{ animationDelay: `${160 + index * 90}ms` }}
                className="reveal group bg-white px-6 py-10 text-center transition-colors duration-300 hover:bg-brand-cream/70 lg:px-7"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-brand-orange text-sm font-bold text-brand-orange transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white">
                  {area.number}
                </span>
                <h3 className="mt-6 text-sm font-extrabold leading-snug text-brand-navy transition-colors duration-300 group-hover:text-brand-orange">
                  {area.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {area.description}
                </p>
              </div>
            ))}
            {/* At 2 columns the fifth item leaves one empty cell, which would
                otherwise show the tinted container as a grey block. */}
            <div aria-hidden="true" className="hidden bg-white md:block lg:hidden" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
