import Image from "next/image";
import Reveal from "./reveal";

/**
 * Client logos live in /public/clinets (note: the folder name is spelled that
 * way in the project, so the paths below must match it).
 *
 * Leave `logo` empty and the card falls back to the client's initials.
 */
const clients = [
  {
    name: "Himalayan Education",
    logo: "/clinets/himalayan-education.png",
  },
  {
    name: "Apply MBBS",
    logo: "/clinets/apply-mbbs.png",
  },
  {
    name: "Education Times Abroad",
    logo: "/clinets/education-times-abroad.png",
  },
  {
    name: "Admission Campus",
    logo: "/clinets/admissioncampus.png",
  },
  {
    name: "Key2Global",
    logo: "/clinets/key2global.png",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function Clients() {
  return (
    <section id="our-clients" className="scroll-mt-24 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="reveal text-center text-2xl font-black uppercase tracking-tight text-brand-orange sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
            Our Clients
          </h2>

          <p
            className="reveal mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600"
            style={{ animationDelay: "90ms" }}
          >
            Education companies and institutions we work with to reach and enrol
            the right students.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {clients.map((client, index) => (
              <div
                key={client.name}
                style={{ animationDelay: `${160 + index * 90}ms` }}
                className="reveal group relative grid place-items-center gap-5 overflow-hidden rounded-xl border border-slate-200/80 bg-white px-6 py-9 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange/40 hover:shadow-xl hover:shadow-brand-navy/5"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-1 w-14 -translate-x-1/2 scale-x-0 rounded-b-full bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="relative h-20 w-full">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 90vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-brand-mist text-base font-black tracking-tight text-brand-navy transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white">
                      {initials(client.name)}
                    </span>
                  )}
                </div>
                <p className="text-center text-sm font-bold leading-snug text-brand-navy transition-colors duration-300 group-hover:text-brand-orange">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
