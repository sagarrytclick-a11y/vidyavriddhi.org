import CountUp from "./count-up";
import Reveal from "./reveal";

const stats = [
  { value: 12, suffix: "+", label: "Years in higher education marketing" },
  { value: 150, suffix: "+", label: "Active education partners" },
  { value: 500, suffix: "+", label: "Successful campaigns executed" },
  { value: 100, suffix: "K+", label: "Verified leads generated monthly" },
];

export default function Metrics() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:pb-16 sm:pt-12">
        <h2 className="reveal text-center text-xs font-extrabold uppercase tracking-[0.3em] text-brand-orange">
          Our Expertise
        </h2>

        {/* `gap-px` over a tinted background draws the dividers at every
            breakpoint, whatever the column count is. */}
        <Reveal className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-200/80 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-navy/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${index * 110}ms` }}
              className="reveal group bg-white px-6 py-10 text-center transition-colors duration-300 hover:bg-brand-cream/60 sm:px-8"
            >
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="block text-4xl font-black tracking-tight text-brand-navy transition-all duration-300 group-hover:scale-105 group-hover:text-brand-orange sm:text-5xl"
              />
              <p className="mx-auto mt-3 max-w-[16rem] text-sm font-medium leading-relaxed text-slate-600">
                {stat.label}
              </p>
              <span className="mx-auto mt-5 block h-1 w-8 rounded-full bg-brand-orange transition-all duration-300 group-hover:w-14" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
