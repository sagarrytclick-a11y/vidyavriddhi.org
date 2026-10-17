import {
  ArrowRightIcon,
  ChartIcon,
  HeadsetIcon,
  MegaphoneIcon,
  SearchIcon,
  TargetIcon,
  UsersIcon,
} from "./icons";
import Reveal from "./reveal";

/**
 * Exported so `app/page.tsx` can describe the same services in JSON-LD.
 */
export const channels = [
  {
    title: "Website Enquiry Capture",
    icon: UsersIcon,
    description:
      "Improve the path from course research to enquiry with focused landing pages and clear forms.",
  },
  {
    title: "Google Ads Campaigns",
    icon: MegaphoneIcon,
    description:
      "Reach students searching for courses and admissions with campaigns shaped around your intake.",
  },
  {
    title: "SEO & Content Discovery",
    icon: SearchIcon,
    description:
      "Build organic visibility with useful course information that supports students during research.",
  },
  {
    title: "Meta Lead Campaigns",
    icon: TargetIcon,
    description:
      "Introduce programs to relevant audiences across Facebook and Instagram placements.",
  },
  {
    title: "Lead Routing & Follow-up",
    icon: ChartIcon,
    description:
      "Organize incoming enquiries so admissions teams can respond with context and consistency.",
  },
  {
    title: "Source Tracking & Insights",
    icon: HeadsetIcon,
    description:
      "Review channel and campaign activity to understand what is contributing to enquiries.",
  },
];

export default function Channels() {
  return (
    <section id="what-we-do" className="scroll-mt-24 bg-brand-mist py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Student enquiry channels we manage
          </h2>

          <p
            className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600"
            style={{ animationDelay: "90ms" }}
          >
            Bring organic discovery, paid campaigns and on-site conversion into a
            coordinated plan for your admissions team.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ title, icon: Icon, description }, index) => (
              <a
                key={title}
                href="#plan"
                style={{ animationDelay: `${160 + index * 80}ms` }}
                className="reveal group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-navy hover:bg-brand-navy hover:shadow-2xl hover:shadow-brand-navy/25"
              >
                {/* Accent bar that grows in from the top centre on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 scale-x-0 rounded-b-full bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
                />

                <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-orange/10 text-brand-orange transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-brand-navy transition-colors duration-300 group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-300">
                  {description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-brand-orange">
                  Explore
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
