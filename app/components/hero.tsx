import CampaignForm from "./campaign-form";

const bullets = [
  "Website and SEO enquiries",
  "Google and Meta campaigns",
  "Source-aware reporting",
];

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-cream to-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-8 pt-12 lg:grid-cols-2 lg:items-start lg:gap-14 lg:pb-10 lg:pt-16">
        {/* Copy */}
        <div>
          <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-orange sm:text-xs sm:tracking-[0.25em]">
            <span className="h-0.5 w-10 bg-brand-orange" />
            Student enquiries for education brands
          </p>

          <h1 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight text-brand-navy sm:text-4xl lg:text-5xl xl:text-6xl">
            Student lead generation across every key channel.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Bring website enquiries, organic search, Google Ads and Meta
            campaigns into one education-focused plan. Vidya Vridhi helps
            institutions attract prospective students, capture their interest and
            see which channels are contributing.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#plan"
              className="rounded-full bg-brand-orange px-8 py-4 text-center text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-orange-600 hover:shadow-xl hover:shadow-brand-orange/40"
            >
              Plan My Lead Campaign
            </a>
            <a
              href="#our-clients"
              className="rounded-full border border-brand-navy/20 px-8 py-4 text-center text-base font-bold text-brand-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-navy/40 hover:bg-white hover:shadow-lg hover:shadow-brand-navy/5"
            >
              See Our Clients
            </a>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 text-sm font-medium text-slate-700"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <CampaignForm />
      </div>
    </section>
  );
}
