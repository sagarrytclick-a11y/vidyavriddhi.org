import { EyeIcon, TargetIcon } from "./icons";
import Reveal from "./reveal";

const cards = [
  {
    title: "Our Vision",
    icon: EyeIcon,
    description:
      "Make it easier for institutions to meet interested learners with timely, relevant information across the channels students already use to explore their next step.",
  },
  {
    title: "Our Mission",
    icon: TargetIcon,
    description:
      "Plan a channel mix, capture student enquiries and give admissions teams a clearer view of source and campaign activity, while adapting the approach to each course and audience.",
  },
];

export default function VisionMission() {
  return (
    <section id="who-we-are" className="scroll-mt-24 bg-brand-mist py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Student growth, built around your goals
          </h2>

          <p
            className="reveal mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-slate-600"
            style={{ animationDelay: "90ms" }}
          >
            Vidya Vridhi helps education teams bring prospective learners into one
            measurable acquisition journey. We combine website conversion paths,
            SEO-led discovery, Google Ads, Meta campaigns and relevant education
            partners around each program, location and intake.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {cards.map(({ title, icon: Icon, description }, index) => (
              <div
                key={title}
                style={{ animationDelay: `${180 + index * 120}ms` }}
                className="reveal group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-8 py-12 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-navy hover:bg-brand-navy hover:shadow-2xl hover:shadow-brand-navy/25"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 scale-x-0 rounded-b-full bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
                />

                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-brand-orange text-brand-orange transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="mt-7 text-xl font-extrabold uppercase tracking-wide text-brand-navy transition-colors duration-300 group-hover:text-white">
                  {title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
