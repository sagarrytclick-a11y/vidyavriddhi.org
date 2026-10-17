"use client";

import { useEffect, useRef } from "react";

export type Market = {
  name: string;
  share: string;
  width: number;
};

/**
 * Horizontal bars that grow to their percentage when scrolled into view.
 *
 * The bars are server-rendered at full width so the chart is readable without
 * JavaScript; the client collapses them and animates the growth on intersect.
 * Widths are written straight to the DOM, so no React re-render per frame.
 */
export default function MarketBars({ markets }: { markets: Market[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bars = Array.from(
      el.querySelectorAll<HTMLElement>("[data-bar]"),
    );

    for (const bar of bars) {
      bar.style.transitionProperty = "width";
      bar.style.transitionDuration = "1000ms";
      bar.style.transitionTimingFunction = "ease-out";
      bar.style.width = "0%";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        for (const bar of bars) {
          bar.style.width = `${bar.dataset.width}%`;
        }
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className="mt-10 space-y-6">
      {markets.map((market, index) => (
        <li key={market.name} className="group">
          <div className="flex items-center justify-between text-sm font-bold text-brand-navy">
            <span className="transition-colors group-hover:text-brand-orange">
              {market.name}
            </span>
            <span>{market.share}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <span
              data-bar
              data-width={market.width}
              className="block h-full rounded-full bg-gradient-to-r from-brand-orange to-amber-400"
              style={{
                width: `${market.width}%`,
                transitionDelay: `${index * 90}ms`,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
