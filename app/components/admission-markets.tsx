import CountUp from "./count-up";
import MarketBars, { type Market } from "./market-bars";
import Reveal from "./reveal";

const markets: Market[] = [
  { name: "Uttar Pradesh", share: "17%", width: 100 },
  { name: "Delhi", share: "13%", width: 76 },
  { name: "Maharashtra", share: "11%", width: 65 },
  { name: "Gujarat", share: "9.5%", width: 56 },
  { name: "Rajasthan", share: "9.5%", width: 56 },
];

export default function AdmissionMarkets() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Admission markets we cover
          </h2>

          <p className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600" style={{ animationDelay: "90ms" }}>
            Vidya Vridhi connects institutions with students across Tier 1, Tier 2
            and Tier 3 cities throughout India.
          </p>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="reveal" style={{ animationDelay: "160ms" }}>
              <h3 className="text-2xl font-extrabold text-brand-navy">
                Top Admission Markets
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                Peak-season traffic is led by key education markets across North,
                West and Central India.
              </p>

              <MarketBars markets={markets} />
            </div>

            <div
              className="reveal rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-600 p-10 text-center shadow-xl shadow-brand-orange/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-orange/30 sm:p-14"
              style={{ animationDelay: "260ms" }}
            >
              <CountUp
                value={60}
                suffix="%"
                className="block text-6xl font-black tracking-tight text-white sm:text-7xl"
              />
              <p className="mt-3 text-lg font-bold text-white">
                of peak-season traffic
              </p>
              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/85">
                comes from Uttar Pradesh, Delhi, Maharashtra, Gujarat and Rajasthan
                during the key admission months.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
